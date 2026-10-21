# Design system and component blueprint

## Idea

The identity comes from the network's own logo: the **deep blue** of its background, white lettering,
and the slanted **bar with six coloured dots**. Blue carries the structure (header, footer, the
history band, links and buttons); a **ledger red** carries the titles, dates and map markers; the six
dot colours appear as small accents — a dot strip under section titles, the large slanted bar in page
headers and on the homepage, the coloured band on top of the footer. **No green anywhere** (members' request, October 2026).

The single memorable element is the **map of Tuscany** in the homepage hero, with the network drawn
between its institutions: a pale-blue sea with coastal water-lines, white land with a soft blue
shadow, blue network lines and pulsing red markers. The lines draw themselves once and the markers
glow; neither moves for visitors who prefer reduced motion.

The structure follows the All-UC Group in Economic History site.

## Colour

| Token | Hex | Use |
|---|---|---|
| `blu` | `#17375E` | the logo blue: header, buttons, links, headings, history band (`blu-900` footer; `blu-50/100/300/500/700` tints) |
| `cinabro` | `#C4321E` | ledger red: page and hero titles, dates, map markers, city labels on cards |
| `corallo` | `#F94B2C` | the logo's bright red, used on blue (active menu underline, link underlines) |
| `dot-1 … dot-6` | `#8EC5CC #F94B2C #F5BE18 #9A8AAE #8BD1D9 #535F9E` | the six dots of the logo bar, top to bottom |
| `intonaco` / `carta` | `#F6F8FB` / `#FFFFFF` | page background / raised surfaces |
| `ink` / `pietra` | `#16212E` / `#56616E` | body text / secondary text |

Defined once in `src/styles/global.css` (`@theme`), available as Tailwind classes such as `text-blu`, `bg-blu-50`, `border-cinabro`.
Helpers: `.section-title` (title over the dot strip), `.dots-rule`, `.dots-band`; component `DotBar.astro` draws the slanted bar.

## Typography

One family throughout: **Titillium Web** (Accademia di Belle Arti di Urbino), the same open sans-serif
as the logo's lettering. Headings bold (700) in blue, the main page title in red; text at 17 px, 1.6
line height. (Bodoni Moda was dropped in October 2026: members found it hard to read and out of
keeping with the rest.) Fonts are self-hosted (no Google Fonts calls), which helps GDPR compliance.

## Layout

* Content width 76 rem (≈1216 px) with 20 px / 40 px side gutters (`.container-page`).
* A 12-column grid on large screens. Text sections use a **4 + 7 split**: heading on the left,
  text on the right (Our history, Mission, About).
* Sections are separated by hairlines (`pietra-200`) and alternating `intonaco` / `carta` / tinted bands — not by boxes or shadows.
* Lists (events, news, projects, members) are rows divided by rules, as in a ledger or a catalogue, rather than cards.
* Every layout collapses to one column below 768 px; the menu becomes a disclosure list.

```
HOME (desktop)
┌───────────────────────────────────────────────────────────────┐
│ EH/tune | Tuscany University…   Home About▾ Research▾ News▾ Contact │  Header (sticky)
├──────────────────────────────┬────────────────────────────────┤
│ Tuscany University Network   │        ·  map of Tuscany  ·     │  Hero
│ in Economic History          │   Lucca•──•Florence, Fiesole    │
│ mission…                     │   Pisa•     \                   │
│ [About the network] [Events] │              •Siena             │
├──────────────────────────────┴────────────────────────────────┤
│ Our history         │ two paragraphs…                          │
├─────────────────────────────────────┬─────────────────────────┤
│ Upcoming events                     │ In the news              │
│ 19 ║ PhD workshop                   │ 15 Oct 2026              │
│ Nov║ Autumn Workshop…               │ The network has…         │
├─────────────────────────────────────┴─────────────────────────┤
│ Research tracks: title + summary │ status, leads, institutions │
│ Participating institutions, by city                           │
├───────────────────────────────────────────────────────────────┤
│ Footer: wordmark, address, e-mail │ menu columns               │
└───────────────────────────────────────────────────────────────┘
```

## Pages of the About menu

About is split into separate pages (October 2026): **Mission and history** (`/about/`), **What we do** (`/about/what-we-do/`), **Partner institutions** (`/about/institutions/`, cards and map) and **Supporters** (`/about/supporters/`). **Members** is its own top-level menu item (`/members/`); the old address `/about/members/` forwards there, and `/members/?institution=unisi` opens the list filtered.

## Components

| Component | File | Data source | Behaviour and notes |
|---|---|---|---|
| **BaseLayout** | `layouts/BaseLayout.astro` | `site.yml` | `<head>` (title, description, canonical, Open Graph, favicon), skip link, Header, `<main>`, Footer |
| **Header** | `components/Header.astro` | `site.yml → nav` | Sticky blue bar with the original logo (white lettering, name underneath). Desktop: drop-down menus that open on hover *and* keyboard focus; the current section is underlined in the logo's bright red. Mobile: native `<details>` menu, no JavaScript |
| **Logo** | `components/Logo.astro`, `components/LogoMark.astro` | `data/logo.json`, `site.yml → fullName` | The network's logo (letterforms traced from the original, dotted bar redrawn) beside the full name; cypress-green version on light pages, white version on the green footer. Downloadable SVGs in `public/brand/` (light, dark, original navy) |
| **Hero** | `components/Hero.astro` | `site.yml → fullName, mission`; `institutions.yml` | Dot strip, red title, mission, two actions, a sentence counting institutions and cities (computed) |
| **TuscanyMap** | `components/TuscanyMap.astro` | `institutions.yml` (lat/lon); `tuscany-map.json` | Real ISTAT boundary as one SVG path; graticule every 30′; nearby institutions merged into one marker; labels kept apart automatically with leader lines; markers link to the institutions list; full text alternative for screen readers |
| **EventLedger** (event timeline) | `components/EventLedger.astro` | `content/events` | Rows with day/month/year column, red double rule, type tag, date range, time, place, speakers, summary; whole row clickable; `compact` variant for the homepage; empty state |
| **NewsList** | `components/NewsList.astro` | `content/news` | Date, category tag (hidden for plain News), headline, summary, deadline in red |
| **ProjectList** | `components/ProjectList.astro` | `content/projects` | Title and summary on the left; status, period, leaders and institutions on the right |
| **MemberDirectory** (member list) | `components/MemberDirectory.astro` | `data/members.yml` | All members in one alphabetical list (surname, Italian collation), grouped under red index letters like a register; name links to the personal page; institution below; letter index, filter by institution and live search added only when JavaScript runs |
| **InstitutionList** | `components/InstitutionList.astro` | `institutions.yml` | One card per institution: city, name, member count (hidden when zero), links |
| **PageHeader** | `components/PageHeader.astro` | page props | Pale-blue band: breadcrumb, red title, introduction, the slanted dotted bar at the right |
| **Footer** | `components/Footer.astro` | `site.yml` | Dark blue, with the six dot colours as a band along the top. Logo, tagline, address, e-mail, menu columns, social links, "Edit this site", map credit, last-updated date |

## Quality floor

* Contrast meets WCAG AA for all text; focus rings are visible (2 px cinabro outline).
* Everything works without JavaScript; the two small scripts (directory filter, contact form) only add convenience.
* `prefers-reduced-motion` disables the map animation.
* Pages are static HTML: fast, indexable, and portable to any server.
