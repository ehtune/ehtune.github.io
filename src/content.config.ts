// Defines the three kinds of content that editors add as Markdown files:
//   src/content/events/    one file per seminar, workshop or conference
//   src/content/news/      one file per news item
//   src/content/projects/  one file per research track or project
// The rules below check each file; a missing or misspelled field stops the build with a clear message.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Optional fields may be left empty ("" or nothing) — the web editor sometimes writes them that way.
const optionalText = z.string().nullish().transform((v) => v || undefined);
const optionalDate = z.preprocess((v) => (v === '' || v === null ? undefined : v), z.coerce.date().optional());

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['Seminar', 'Workshop', 'Conference', 'Lecture', 'PhD workshop', 'Summer school', 'Other']),
    date: z.coerce.date(),
    endDate: optionalDate,
    time: optionalText, // e.g. "14:30–16:30"
    location: z.string(), // e.g. "Aula 5, Piazza San Francesco 7, Siena" or "Online"
    institution: optionalText, // optional id from src/data/institutions.yml
    speakers: z.array(z.string()).nullish().transform((v) => v ?? []),
    summary: z.string(),
    registration: optionalText, // link to a registration form
    programme: optionalText, // link to a PDF programme
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['News', 'Publication', 'Award', 'Opportunity', 'Call for papers']).default('News'),
    summary: z.string(),
    link: optionalText, // optional external link
    deadline: optionalDate, // for opportunities and calls
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Active', 'Completed']).default('Active'),
    period: optionalText, // e.g. "2025–2028"
    coordinators: z.array(z.string()).nullish().transform((v) => v ?? []),
    institutions: z.array(z.string()).nullish().transform((v) => v ?? []),
    funding: optionalText,
    summary: z.string(),
    website: optionalText,
    order: z.number().nullish().transform((v) => v ?? 100),
  }),
});

export const collections = { events, news, projects };
