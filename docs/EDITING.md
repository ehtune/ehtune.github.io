# Updating the website — a guide for editors

You never need to touch code. Everything you will change is either a **form** (Pages CMS) or a short
**text file** on GitHub. After you save, the site updates itself in about a minute.

There are two ways to edit. Use whichever you prefer.

---

## Way 1 — Web forms (Pages CMS)

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Open **ehtune / ehtune.github.io**.
3. Choose a section on the left (Events, News, Members…).
4. Click **Add an entry** (or open an existing one), fill in the form, click **Save**.

That's all. Photos and PDFs can be uploaded directly in the form.

---

## Way 2 — Directly on GitHub

Each folder in `src/content/` contains a file called `_TEMPLATE.md` with instructions inside;
the files in `src/data/` explain themselves in the notes at the top.

### Add a news item

1. Open https://github.com/ehtune/ehtune.github.io/tree/main/src/content/news
2. Open `_TEMPLATE.md`, select all its text and copy it.
3. Go back to the folder, click **Add file → Create new file**.
4. Name it with the date and a few words, e.g. `2026-11-03-new-book-by-maria-bianchi.md`.
5. Paste the template, replace the example values, delete the `#` comment lines if you like.
6. Click **Commit changes…** → **Commit changes**.

A news item looks like this:

```markdown
---
title: New book on wages in Renaissance Florence
date: 2026-11-03
category: Publication
summary: Maria Bianchi's new monograph is out with Cambridge University Press.
link: https://example.org/book
---

Longer text here. A blank line starts a new paragraph.
**Bold**, *italics*, [a link](https://example.org) and lists with "- " all work.
```

The category decides where it appears: `News`, `Publication` and `Award` go to **News**;
`Opportunity` and `Call for papers` also appear on the **Opportunities** page (add a `deadline:`).

### Add an event

Same steps, in `src/content/events/`. Name the file `YYYY-MM-DD-short-title.md`.

```markdown
---
title: The free port of Livorno, 1590–1860
type: Seminar
date: 2027-03-12
time: "15:00–16:30"
location: Department of Economics and Management, Pisa
institution: unipi
speakers:
  - Luca Verdi (University of Pisa)
summary: A seminar in the EH/tune series. Open to all.
---

Abstract of the paper.
```

The event appears under **Upcoming events** and on the homepage, and moves to **Past events**
automatically the day after it ends. For a multi-day event, add `endDate: 2027-03-13`.

### Add or remove a member

All members are in one file, `src/data/members.yml`. The site shows them in alphabetical order of
surname, so the order in the file does not matter.

1. Open `src/data/members.yml` and click the pencil ✎.
2. Copy one block of four lines and paste it at the end:

```yaml
  - surname: De Luca
    firstName: Giovanni
    institution: unipi
    url: https://www.unipi.it/people/giovanni-de-luca
```

3. Change the values and click **Commit changes…** → **Commit changes**.

* `institution` is one of: `unifi` (University of Florence), `unipi` (University of Pisa),
  `sns` (Scuola Normale Superiore), `sssa` (Sant'Anna School of Advanced Studies), `unisi` (University of Siena).
* `url` is the person's institutional or personal page. Write `url: ""` if there is none: the name is then shown without a link.
* To remove someone, delete their four lines.
* For many names at once, fill in the Excel template (`docs/members-template.xlsx`) and send it to whoever maintains the site.

### Add a research track or project

In `src/content/projects/`, copy `_TEMPLATE.md`. Set `status: Completed` when it ends.

### Add a publication

Open `src/data/publications.yml`, click the pencil ✎, copy one block (from `- authors:` to `url:`),
paste it underneath, change the values, commit.

### Change the homepage texts, the menu, the e-mail or the address

All in `src/data/site.yml`. Click the pencil ✎, edit the text after the colons, commit.

### Add an institution

In `src/data/institutions.yml`, copy one block and change it. Find the latitude and longitude by
right-clicking the building in Google Maps (the first number is `lat`, the second `lon`). `shortName` is the
abbreviation used in the members filter and on the map (e.g. UniFi).
The new institution appears on the homepage map automatically. If you use Pages CMS, also add
its id to the `institutionIds` list at the top of `.pages.yml`.

---

## Rules that prevent almost every problem

1. **Keep the two lines of three dashes** `---` at the top of Markdown files. The settings go between them, the text below.
2. **Indent with spaces, never tabs.** List items under a field start with two spaces and `- `.
3. **Dates are always `YYYY-MM-DD`**, e.g. `2027-03-12`.
4. **Put quotes around values that contain a colon**, e.g. `time: "14:30–16:00"` or `title: "Wages: a new view"`.
5. **File names**: lowercase, hyphens instead of spaces, ending in `.md`. Files starting with `_` are ignored.

## If something goes wrong

The live site never breaks: if a change contains a mistake, the update simply doesn't go through and
the previous version stays online.

1. Open the **Actions** tab of the repository. A red ✗ marks the failed update.
2. Click it, then click **build**. Near the bottom, a line starting with ✖ names the file and the field
   with the problem, e.g. `src/content/events/2027-03-12-seminar.md: date: Invalid date`.
3. Fix that file and commit again. The next run turns green and the site updates.

Every earlier version of every file is kept: open a file and click **History** to see or restore it.
