// Small helpers shared by the components.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Turns "/about/" into the right address whether the site lives at "/" or in a sub-folder. */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}

/** Is `href` the current page (or a parent section of it)? */
export function isActive(href: string, current: string): boolean {
  const clean = (p: string) => p.replace(/#.*$/, '').replace(/\/?$/, '/');
  const target = clean(url(href));
  const here = clean(current);
  if (target === clean(url('/'))) return here === target;
  return here.startsWith(target);
}

const LOCALE = 'en-GB';
const TZ = 'Europe/Rome';

export const fmt = {
  long: (d: Date) => d.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }),
  day: (d: Date) => d.toLocaleDateString(LOCALE, { day: 'numeric', timeZone: TZ }),
  month: (d: Date) => d.toLocaleDateString(LOCALE, { month: 'short', timeZone: TZ }),
  year: (d: Date) => d.toLocaleDateString(LOCALE, { year: 'numeric', timeZone: TZ }),
  iso: (d: Date) => d.toISOString().slice(0, 10),
};

/** "12–14 March 2027", "30 April – 2 May 2027" or "12 March 2027". */
export function dateRange(start: Date, end?: Date): string {
  if (!end || fmt.iso(end) === fmt.iso(start)) return fmt.long(start);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  if (sameMonth) return `${fmt.day(start)}–${fmt.long(end)}`;
  return `${start.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', timeZone: TZ })} – ${fmt.long(end)}`;
}

/** Initials for members without a photo: "Maria Bianchi" → "MB". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}

/** Today at midnight, Rome time — events on or after this date count as "upcoming". */
export function today(): Date {
  const s = new Date().toLocaleDateString('en-CA', { timeZone: TZ });
  return new Date(`${s}T00:00:00Z`);
}
