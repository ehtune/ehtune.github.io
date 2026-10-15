// Safety net for hosting the site inside a sub-folder (e.g. https://www.unisi.it/ehtune/).
//
// Editors write links in Markdown as "/news/" or images as "/images/photo.jpg".
// When the site is built with a BASE_PATH, this step rewrites those root links in
// every generated HTML page so they keep working. With BASE_PATH "/" it does nothing.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

export default function prefixBase() {
  let base = '/';
  return {
    name: 'ehtune:prefix-base',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (!base || base === '/') return;
        const root = fileURLToPath(dir);
        // href="/x" or src="/x" — but not "//cdn", and not links that already start with the base.
        const re = new RegExp(`(\\s(?:href|src|action|poster)=["'])\\/(?!\\/)(?!${base.slice(1)}(?:\\/|["']))`, 'g');
        let count = 0;
        for await (const file of htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          const out = html.replace(re, (_m, attr) => {
            count++;
            return `${attr}${base}/`;
          });
          if (out !== html) await writeFile(file, out);
        }
        logger.info(`Prefixed ${count} root-relative links with "${base}".`);
      },
    },
  };
}
