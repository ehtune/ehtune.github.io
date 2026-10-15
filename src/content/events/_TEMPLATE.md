---
# HOW TO ADD AN EVENT
# 1. Copy this file into the same folder. Name it  YYYY-MM-DD-short-title.md
#    e.g.  2027-03-12-spring-seminar.md   (the name becomes the page address)
# 2. Fill in the fields; delete optional lines you don't need.
# 3. Write the description, programme or abstract below the second line of dashes.
# The event shows under "Upcoming events" until its date has passed, then moves to "Past events".

title: Title of the seminar or paper
# type — one of: Seminar | Workshop | Conference | Lecture | PhD workshop | Summer school | Other
type: Seminar
date: 2027-03-12            # YYYY-MM-DD
endDate: 2027-03-13         # optional, for events lasting more than one day
time: "14:30–16:30"         # optional — keep the quotes
location: Aula 5, Piazza San Francesco 7, Siena
institution: unisi          # optional — an id from src/data/institutions.yml
speakers:                   # optional
  - Name Surname (University)
summary: One or two sentences shown in the event list.
registration: https://example.org/register   # optional link
programme: /files/meetings/programme.pdf     # optional — upload the PDF to public/files/meetings/
cancelled: false            # optional — true if the event did not take place
---

Longer description, abstract or programme. You can use **bold**, *italics*, lists and [links](https://example.org).
