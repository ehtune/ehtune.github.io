# Design system and component blueprint

## Idea

Two materials from the history of the Tuscan economy give the site its identity:

* **Florentine architecture** — white plaster walls framed by grey *pietra serena* sandstone
  (Brunelleschi's San Lorenzo, Santo Spirito). This gives the calm, light page with grey structural lines.
* **The Tuscan account book** — Datini's ledgers in Prato, the books of the Monte dei Paschi: a ruled
  date column, a *red double rule* separating it from the entry, headings in red ink. This gives the
  one distinctive device, used for the event timeline and side panels.

Above them sits a single memorable element: the **map of Tuscany** in the homepage hero, with the
network drawn between its institutions — the network made literal. It is the only animation on the
site (the lines draw themselves once, and not at all for visitors who prefer reduced motion).

The structure follows the All-UC Group in Economic History site: name and tagline, *Our history*,
*Upcoming events* beside *In the news*; About with Director (here: Coordinator), Steering Committee,
Affiliates and Support Recognition (here: Supporters); Events with past events; Projects; Opportunities; Contact.

## Colour

| Token | Hex | Name and origin | Use |
|---|---|---|---|
| `intonaco` | `#F7F7F4` | plaster wall | page background |
| `carta` | `#FFFFFF` | paper | raised surfaces: hero, page headers, menus |
| `ink` | `#1F282B` | iron-gall ink | body text |
| `pietra` | `#5C676C` | pietra serena | secondary text (AA contrast on both backgrounds) |
| `pietra-200` | `#D5DADB` | pale sandstone | hairlines and borders |
| `cipresso` | `#22443A` | cypress | primary actions, links, footer (`cipresso-900`) |
| `cinabro` | `#A3311E` | cinnabar ledger ink | dates, the double rule, map markers, deadlines — used sparingly |

Defined once in `src/styles/global.css` (`@theme`), available as Tailwind classes such as `text-cipresso`, `bg-intonaco`, `border-cinabro`.

## Typography

| Role | Typeface | Why |
|---|---|---|
| Headings, dates, names | **Bodoni Moda** (variable, optical sizes) | Neoclassical Italian type of Giambattista Bodoni (Parma, 18th c.), contemporary with the archives economic historians read |
| Text and interface | **Titillium Web** | Sans-serif born at the Accademia di Belle Arti di Urbino; open and legible at small sizes |

Rules: sentence case everywhere (no all-caps labels); one display size (`text-display`) for the hero
and 404 page; body at 17 px with 1.6 line height; text columns limited to about 65–75 characters.
Fonts are self-hosted (no Google Fonts calls), which helps GDPR compliance on a university server.

## Layout

* Content width 76 rem (≈1216 px) with 20 px / 40 px side gutters (`.container-page`).
* A 12-column grid on large screens. Text sections use a **4 + 7 split**: Bodoni heading on the left,
  text on the right (Our history, Mission, About).
* Sections are separated by hairlines (`pietra-200`) and alternating `intonaco` / `carta` / tinted bands — not by boxes or shadows.
* Lists (events, news, projects, members) are rows divided by rules, as in a ledger or a catalogue, rather than cards.
* Every layout collapses to one column below 768 px; the menu becomes a disclosure list.

```
HOME (desktop)
┌───────────────────────────────────────────────────────────────┐
│ EH/tune | Tuscan University…     Home About▾ Research▾ News▾ Contact │  Header (sticky)
├──────────────────────────────┬────────────────────────────────┤
│ Tuscan University Network    │        ·  map of Tuscany  ·     │  Hero
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

## Components

| Component | File | Data source | Behaviour and notes |
|---|---|---|---|
| **BaseLayout** | `layouts/BaseLayout.astro` | `site.yml` | `<head>` (title, description, canonical, Open Graph, favicon), skip link, Header, `<main>`, Footer |
| **Header** | `components/Header.astro` | `site.yml → nav` | Sticky, translucent. Desktop: drop-down menus that open on hover *and* keyboard focus; the current section is underlined in cinabro. Mobile: native `<details>` menu, no JavaScript |
| **Logo** | `components/Logo.astro` | `site.yml → shortName, fullName` | Wordmark with the slash in ledger red; inverse variant for the footer |
| **Hero** | `components/Hero.astro` | `site.yml → fullName, mission`; `institutions.yml` | Title, mission, two actions, a sentence counting institutions and cities (computed) |
| **TuscanyMap** | `components/TuscanyMap.astro` | `institutions.yml` (lat/lon); `tuscany-map.json` | Real ISTAT boundary as one SVG path; graticule every 30′; nearby institutions merged into one marker; labels kept apart automatically with leader lines; markers link to the institutions list; full text alternative for screen readers |
| **EventLedger** (event timeline) | `components/EventLedger.astro` | `content/events` | Rows with day/month/year column, red double rule, type tag, date range, time, place, speakers, summary; whole row clickable; `compact` variant for the homepage; empty state |
| **NewsList** | `components/NewsList.astro` | `content/news` | Date, category tag (hidden for plain News), headline, summary, deadline in red |
| **ProjectList** | `components/ProjectList.astro` | `content/projects` | Title and summary on the left; status, period, leaders and institutions on the right |
| **MemberDirectory** (member grid) | `components/MemberDirectory.astro` | `content/members` | Groups in fixed order (Coordinator → Affiliates) with counts and anchors; sorted by `order` then surname (Italian collation); filter buttons by institution and live search, added only when JavaScript runs |
| **MemberEntry** | `components/MemberEntry.astro` | one member file | Photo or Bodoni initials; name, position, institution link, department, interests, e-mail/website; biography in a disclosure (shown in full for the coordinator) |
| **InstitutionList** | `components/InstitutionList.astro` | `institutions.yml` | Grouped by city, city names in Bodoni italic |
| **PageHeader** | `components/PageHeader.astro` | page props | Breadcrumb, title, introduction, optional slot for sub-navigation |
| **Footer** | `components/Footer.astro` | `site.yml` | Wordmark, tagline, address, e-mail, menu columns, social links, "Edit this site", map credit, last-updated date |

## Quality floor

* Contrast meets WCAG AA for all text; focus rings are visible (2 px cinabro outline).
* Everything works without JavaScript; the two small scripts (directory filter, contact form) only add convenience.
* `prefers-reduced-motion` disables the map animation.
* Pages are static HTML: fast, indexable, and portable to any server.
