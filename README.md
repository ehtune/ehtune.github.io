# EH/tune — website

Website of **EH/tune, the Tuscan University Network in Economic History**.
Live at **https://ehtune.github.io** · source at **https://github.com/ehtune/ehtune.github.io**

The site is built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), stored on GitHub and published automatically with GitHub Pages. All content lives in plain Markdown and YAML files, so updating it needs no programming.

| I want to… | Read |
|---|---|
| Add a news item, event, member or project | [docs/EDITING.md](docs/EDITING.md) |
| Set up the GitHub organization and publish the site (first time) | [docs/SETUP.md](docs/SETUP.md) |
| Move the site to a University of Siena server or a custom domain | [docs/MIGRATION.md](docs/MIGRATION.md) |
| Understand the design system and the components | [docs/DESIGN.md](docs/DESIGN.md) |

## Where everything is

```
ehtune.github.io/
├── src/
│   ├── content/                ← CONTENT EDITORS WORK HERE
│   │   ├── events/             one .md file per seminar, workshop, conference
│   │   ├── news/               one .md file per news item, opportunity or call
│   │   ├── members/            one .md file per person
│   │   └── projects/           one .md file per research track or project
│   │                           (each folder has a _TEMPLATE.md to copy)
│   ├── data/
│   │   ├── site.yml            ← texts on every page: mission, history, menu, e-mail, address
│   │   ├── institutions.yml    ← participating institutions (also placed on the map)
│   │   ├── publications.yml    ← list of publications
│   │   └── tuscany-map.json    map outline (generated; do not edit)
│   ├── components/             building blocks: Header, Hero, TuscanyMap, EventLedger, MemberDirectory…
│   ├── layouts/BaseLayout.astro  the frame shared by every page
│   ├── pages/                  one file per page address (index.astro = homepage)
│   ├── styles/global.css       colours, fonts and shared styles
│   └── content.config.ts       the fields each kind of content must have
├── public/                     files served as they are
│   ├── images/members/         member photos
│   └── files/                  PDFs (programmes, calls)
├── docs/                       these guides
├── .github/workflows/
│   ├── deploy.yml              publishes the site on every change and every night
│   └── export.yml              builds a .zip for another server (migration)
├── .pages.yml                  web forms for editors (Pages CMS)
└── astro.config.mjs            site address and build settings
```

## Working on the code (developers only)

Requires Node.js 22.12 or newer.

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # produces the finished site in dist/
npm run preview    # serves dist/ locally
```

## Credits

Map boundaries © ISTAT, released under CC BY 4.0 (via openpolis/geojson-italy).
Fonts: Bodoni Moda and Titillium Web (SIL Open Font License), bundled with the site.
