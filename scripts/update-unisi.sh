#!/bin/bash
# UPDATE THE SITE ON THE UNIVERSITY OF SIENA SERVER (https://eh-tune.unisi.it)
#
# Run on the server (SSH, UniSi VPN). It downloads the latest built site from the
# "unisi-site" branch on GitHub (made by the "Build for UniSi" workflow) and copies it
# into the web folder. Files the site no longer uses are removed; ISPConfig's own folders
# (error/, stats/) and anything else not installed by this script are never touched.
#
#   bash update-unisi.sh            → finds the web folder by itself (~/web or /web)
#   bash update-unisi.sh /path/web  → uses that folder
#
# If anything goes wrong while downloading, nothing on the server is changed.
set -euo pipefail

REPO="ehtune/ehtune.github.io"
BRANCH="unisi-site"
LIST="$HOME/.ehtune-installed-files"   # files installed last time (kept outside the web folder)

WEB="${1:-}"
if [ -z "$WEB" ]; then
  for d in "$HOME/web" /web; do
    if [ -d "$d" ]; then WEB="$d"; break; fi
  done
fi
if [ -z "$WEB" ] || [ ! -d "$WEB" ] || [ ! -w "$WEB" ]; then
  echo "Web folder not found or not writable (${WEB:-none}). Run: bash update-unisi.sh /path/to/web"
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP" "$TMP.new-list"' EXIT

echo "Downloading the site from GitHub…"
curl -fsSL "https://codeload.github.com/$REPO/tar.gz/refs/heads/$BRANCH" | tar -xz -C "$TMP" --strip-components=1
if [ ! -f "$TMP/index.html" ] || [ ! -f "$TMP/404.html" ]; then
  echo "The download looks incomplete. Nothing was changed."
  exit 1
fi

# Remove files installed last time that the new version no longer has.
(cd "$TMP" && find . -type f | sort) > "$TMP.new-list"
if [ -f "$LIST" ]; then
  removed=0
  while IFS= read -r f; do
    if ! grep -qxF -- "$f" "$TMP.new-list"; then rm -f -- "$WEB/$f"; removed=$((removed + 1)); fi
  done < "$LIST"
  [ "$removed" -gt 0 ] && echo "Removed $removed old file(s)."
fi

cp -a "$TMP"/. "$WEB"/
mv "$TMP.new-list" "$LIST"

echo "Done: $(wc -l < "$LIST") files installed in $WEB"
echo "Check https://eh-tune.unisi.it"
