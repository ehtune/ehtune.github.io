# Moving the site (University of Siena server or own domain)

The finished site is a folder of ordinary HTML, CSS and image files. It needs **no database, no PHP
and no server software** — any web server can host it (Apache, Nginx, IIS, a university CMS that
accepts static files, or an Aruba-style shared host). Fonts and the map are bundled, so the site makes
no calls to Google or other third parties.

The only thing that changes between servers is the **address**. The site handles it with two settings:

| Setting | Meaning | GitHub Pages (now) | Example at UniSi |
|---|---|---|---|
| `SITE_URL` | the domain | `https://ehtune.github.io` | `https://www.unisi.it` |
| `BASE_PATH` | the folder on that domain | `/` | `/ehtune` |

All internal links, images and the sitemap adapt automatically.

---

## Option A — The University hosts the files

Ask the IT office two questions:

1. *What will the address be?* (e.g. `https://www.unisi.it/ehtune/` or `https://ehtune.unisi.it/`)
2. *How do we deliver updates?* (upload by SFTP, a shared folder, or automatic deployment from GitHub)

Then:

1. On GitHub open **Actions → Export site for another server → Run workflow**.
2. Type the domain (e.g. `https://www.unisi.it`) and the folder (e.g. `/ehtune`, or `/` for a sub-domain like `ehtune.unisi.it`).
3. When the run finishes (about a minute), open it and download **ehtune-site** (a .zip).
4. Give the zip to IT: its contents go into the web folder for that address. Nothing else is needed.

**Keeping editing on GitHub after the move (recommended).** Editors keep using GitHub or Pages CMS
exactly as now. To publish, either repeat the export (simple, manual), or ask IT for SFTP credentials
and add an automatic upload step to `.github/workflows/deploy.yml` — any developer can do this in an
hour; the credentials are stored as encrypted repository *secrets*, never in the files.

Set the new address permanently in `astro.config.mjs` (replace `https://ehtune.github.io` and `/`)
once the University site is the official one. Then, in *Settings → Pages*, you can unpublish the GitHub
copy or leave it as a mirror.

**Server notes for IT.** Pages are served as `folder/index.html` (e.g. `/about/members/index.html`), so the
server must serve `index.html` for a directory request (the default in Apache and Nginx). A custom
`404.html` is included at the root of the export. Recommended: long cache headers for `/_astro/`
(the file names change whenever their content changes).

---

## Option B — Own domain (e.g. `ehtune.it`), still hosted free on GitHub

A domain of your own means the address never changes again, whoever hosts the files later.

1. Buy the domain (an `.it` domain costs about €10 per year) or ask the University for a sub-domain such as `ehtune.unisi.it`.
2. At the domain provider, create the DNS records listed in GitHub's guide:
   https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
3. Create a file `public/CNAME` containing just the domain, e.g. `www.ehtune.it`.
4. In `astro.config.mjs` change the default `SITE_URL` to `https://www.ehtune.it` (`BASE_PATH` stays `/`).
5. Commit, then in *Settings → Pages* enter the domain and tick **Enforce HTTPS**.

---

## Checklist after any move

- [ ] Home, Members and an event page open and look right
- [ ] Images appear
- [ ] Menu links stay inside the new address
- [ ] `sitemap-index.xml` shows the new address
- [ ] `repository:` in `src/data/site.yml` still points to the GitHub source
- [ ] Ask the old address to redirect to the new one, if possible
