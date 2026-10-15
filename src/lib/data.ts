// Reads the editable YAML files in src/data/ and checks them.
// If an editor makes a mistake, the build stops with a message that names the file and the field,
// and the live website simply keeps the previous version.
import { parse } from 'yaml';
import { z } from 'astro/zod';
import siteRaw from '../data/site.yml?raw';
import institutionsRaw from '../data/institutions.yml?raw';
import publicationsRaw from '../data/publications.yml?raw';
import membersRaw from '../data/members.yml?raw';

function load<T extends z.ZodTypeAny>(file: string, raw: string, schema: T): z.infer<T> {
  let data: unknown;
  try {
    data = parse(raw);
  } catch (e) {
    throw new Error(`\n\n✖ src/data/${file} is not valid YAML (check the indentation near the line shown):\n${(e as Error).message}\n`);
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  • ${i.path.join(' → ')}: ${i.message}`).join('\n');
    throw new Error(`\n\n✖ src/data/${file} has a problem:\n${issues}\n`);
  }
  return result.data;
}

const link = z.object({ label: z.string(), href: z.string() });
const navItem = link.extend({ children: z.array(link).optional() });

export const site = load(
  'site.yml',
  siteRaw,
  z.object({
    shortName: z.string(),
    fullName: z.string(),
    tagline: z.string(),
    description: z.string(),
    mission: z.string(),
    history: z.string(),
    goals: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    email: z.string(),
    address: z.array(z.string()).default([]),
    contactFormEndpoint: z.string().nullish().transform((v) => v || ''),
    social: z.array(z.object({ label: z.string(), url: z.string().url() })).nullish().transform((v) => v ?? []),
    supporters: z.array(z.object({ name: z.string(), url: z.string().optional() })).nullish().transform((v) => v ?? []),
    nav: z.array(navItem),
    repository: z.string().url().optional(),
  }),
);

const institutionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'use lowercase letters, numbers or hyphens only'),
  name: z.string(),
  shortName: z.string(),
  city: z.string(),
  department: z.string().optional(),
  url: z.string().url().optional(),
  lat: z.number(),
  lon: z.number(),
});
export type Institution = z.infer<typeof institutionSchema>;

export const institutions: Institution[] = load(
  'institutions.yml',
  institutionsRaw,
  z.object({ institutions: z.array(institutionSchema) }),
).institutions;

export function institutionById(id: string | undefined, context = ''): Institution | undefined {
  if (!id) return undefined;
  const found = institutions.find((i) => i.id === id);
  if (!found) {
    const known = institutions.map((i) => i.id).join(', ');
    throw new Error(`\n\n✖ ${context} refers to institution "${id}", which is not in src/data/institutions.yml.\n  Known ids: ${known}\n`);
  }
  return found;
}

export const publications = load(
  'publications.yml',
  publicationsRaw,
  z.object({
    publications: z
      .array(
        z.object({
          authors: z.string(),
          year: z.number().int(),
          title: z.string(),
          venue: z.string().optional(),
          type: z.enum(['Article', 'Working paper', 'Book', 'Chapter', 'Dataset']).default('Article'),
          url: z.string().nullish().transform((v) => v || ''),
        }),
      )
      .nullish()
      .transform((v) => v ?? []),
  }),
).publications.sort((a, b) => b.year - a.year);

// Members: one alphabetical list (surname, then first name, Italian alphabetical rules).
const memberSchema = z.object({
  surname: z.string().min(1),
  firstName: z.string().min(1),
  institution: z.string(),
  url: z.string().nullish().transform((v) => (v ? v.trim() : '')),
});
export type Member = z.infer<typeof memberSchema> & { name: string; inst: Institution };

const collator = new Intl.Collator('it', { sensitivity: 'base' });
export const members: Member[] = load(
  'members.yml',
  membersRaw,
  z.object({ members: z.array(memberSchema).nullish().transform((v) => v ?? []) }),
)
  .members.map((m, i) => ({
    ...m,
    name: `${m.firstName} ${m.surname}`,
    inst: institutionById(m.institution, `src/data/members.yml, member ${i + 1} (${m.firstName} ${m.surname})`)!,
  }))
  .sort((a, b) => collator.compare(a.surname, b.surname) || collator.compare(a.firstName, b.firstName));
