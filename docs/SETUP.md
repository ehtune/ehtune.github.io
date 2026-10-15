# First-time setup: GitHub organization, repository and publishing

Time needed: about 30 minutes. You do this once.

## Why an organization (and not your personal account)

A GitHub Pages site is published at `https://<account>.github.io`. If the repository lived in
your personal account, the address would be `https://alessandrobrioschi.github.io/…`.

By creating a free **organization** called `ehtune` and naming the repository `ehtune.github.io`, you get:

| What | Address |
|---|---|
| The website | **https://ehtune.github.io** |
| The network's GitHub page | **https://github.com/ehtune** |
| The source files | https://github.com/ehtune/ehtune.github.io |

Your personal name does not appear anywhere in these addresses. You stay in control as the
organization's owner, and you can add colleagues as co-owners so the site never depends on one person.

> "github/ehtune" is not a possible web address as such: GitHub's two forms are the two shown above.
> If you later want something like `www.ehtune.it`, see [MIGRATION.md](MIGRATION.md), option B.

## Step 1 — Create the organization

1. Sign in to GitHub as `alessandrobrioschi`.
2. Open https://github.com/organizations/plan and choose **Free**.
3. **Organization name:** `ehtune`. (Lowercase. If it is taken, use `eh-tune` and replace `ehtune` with `eh-tune` everywhere in this guide, in `astro.config.mjs` and in `src/data/site.yml`.)
4. **Contact e-mail:** the network's e-mail address.
5. "This organization belongs to": **My personal account**.
6. Skip inviting members for now, then finish.
7. Optional but recommended: on https://github.com/ehtune click **Edit**/**Settings** and add the
   network's full name, a short description, the website address and a logo.

## Step 2 — Create the repository

1. Go to https://github.com/organizations/ehtune/repositories/new
2. **Owner:** `ehtune`. **Repository name:** `ehtune.github.io` (exactly this — it is what makes the address work).
3. **Public** (free GitHub Pages requires a public repository).
4. Do **not** add a README, .gitignore or licence (the project already has them).
5. Click **Create repository**.

## Step 3 — Upload the project

Choose **one** of these.

**A. GitHub Desktop (easiest, no command line)**
> With this option **skip Step 2**: GitHub Desktop creates the repository for you. If you already created
> it on the website, use option B or C instead (or delete the empty repository first).
1. Install https://desktop.github.com and sign in with your GitHub account.
2. *File → Add local repository →* choose the unzipped `ehtune.github.io` folder. It says the folder is
   not a Git repository yet: click **create a repository**, keep the name `ehtune.github.io`, click **Create repository**.
3. Click **Publish repository**. Untick **Keep this code private**, choose **ehtune** under *Organization*, click **Publish**.
   (If `ehtune` is missing from the list: on github.com open *Settings → Applications → Authorized OAuth Apps →
   GitHub Desktop* and click **Grant** next to ehtune, then try again.)

**B. Command line**
```bash
cd ehtune.github.io
git init -b main
git add .
git commit -m "First version of the EH/tune website"
git remote add origin https://github.com/ehtune/ehtune.github.io.git
git push -u origin main
```

**C. In the browser** — on the empty repository page click *uploading an existing file* and drag in
the **contents** of the folder. On a Mac, press `Cmd + Shift + .` in Finder first, so that the hidden
`.github` folder and `.pages.yml` file are visible and get uploaded too. Do not upload `node_modules` or `dist` if present.

## Step 4 — Turn on GitHub Pages

1. In the repository: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab. The run started by your upload probably **failed (red ✗)** because Pages was
   not switched on yet — that is expected. Click **Deploy to GitHub Pages** in the left list → **Run workflow** → **Run workflow**.
4. After 1–3 minutes the run turns green. Visit **https://ehtune.github.io** — the site is live.
   (The very first publication can take a few extra minutes to appear; reload if you see a 404.)

From now on, every change saved on GitHub republishes the site automatically, and it also rebuilds every
night so that finished events move to "Past events" by themselves.

## Step 5 — Give colleagues access

* **Editors** (add news, events, members): *Organization → People → Invite member*, then in the
  repository *Settings → Collaborators and teams* give them **Write**. They can then edit in the
  browser (see [EDITING.md](EDITING.md)).
* **A second owner**: invite a trusted colleague as **Owner** of the organization, so the site survives
  any change of personnel.

## Step 6 — Turn on the web editor (optional, recommended)

1. Go to https://app.pagescms.org and **Sign in with GitHub**.
2. When asked, install the Pages CMS GitHub App on the **ehtune** organization (only on the `ehtune.github.io` repository).
3. Open the repository. The menu on the left shows Events, News, Members, Research & Projects,
   Publications, Institutions and Site settings — simple forms, no files.

## Step 7 — Replace the draft content

All sample members use Italian placeholder names (Mario Rossi, Maria Bianchi…) and sample events and
projects are marked `SAMPLE` or `PLACEHOLDER` in their files. Before announcing the site:

- [ ] `src/data/site.yml`: mission, history, goals, **e-mail** (currently `ehtune@example.org`), address, supporters
- [ ] `src/data/members.yml`: replace the placeholder names with the real members
- [ ] `src/content/events/`, `news/`, `projects/`: delete or rewrite the samples
- [ ] `src/data/publications.yml`: real publications
- [ ] `public/og-image.png`: the picture shown when the site is shared on social media
