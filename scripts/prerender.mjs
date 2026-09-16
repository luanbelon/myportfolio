import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFileSync as readFallbackFile } from 'node:fs';

const fallbackModulePath = new URL('../src/lib/fallbackProjects.js', import.meta.url);
const fallbackSource = readFallbackFile(fallbackModulePath, 'utf8');
const slugMatches = [...fallbackSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const serverEntry = join(distDir, 'server/entry-server.mjs');

const routes = [
  '/',
  '/trabalho',
  '/artigos',
  '/curriculo',
  ...slugMatches.map((slug) => `/trabalho/${slug}`),
];

const { renderPage } = await import(pathToFileURL(serverEntry).href);
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

function writeRouteHtml(route, html) {
  const outFile = route === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.slice(1), 'index.html');

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, 'utf8');
}

for (const route of routes) {
  const { appHtml, headTags } = renderPage(route, 'pt');
  let html = template;

  if (headTags) {
    html = html.replace('</head>', `${headTags}\n</head>`);
  }

  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${appHtml}</div>`,
  );

  writeRouteHtml(route, html);
  console.log(`prerendered ${route}`);
}
