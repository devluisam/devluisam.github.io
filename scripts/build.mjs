// Gera o site estático (português e inglês) a partir de data/.
//
//   npm run build
//
// Saída (na raiz do repositório, servida pelo GitHub Pages):
//   index.html · projetos/<slug>/ · 404.html            (português)
//   en/index.html · en/projects/<slug>/ · en/404.html   (inglês)
//   sitemap.xml · robots.txt
//
// Não edite esses arquivos à mão: eles são sobrescritos a cada build.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { site } from '../data/site.mjs';
import { categories, projects } from '../data/projects.mjs';
import { projectsEn } from '../data/projects.en.mjs';
import { languages, ui, categoryLabels, stackTerms } from '../data/i18n.mjs';
import { homePage, projectPage, notFoundPage } from './templates.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...p) => path.join(ROOT, ...p);

/* ---------- Validação dos dados ---------- */
const errors = [];
const catIds = new Set(categories.map((c) => c.id));
const slugs = new Set();
for (const p of projects) {
  const where = `projeto "${p.slug || p.name}"`;
  for (const k of ['slug', 'name', 'category', 'type', 'status', 'summary', 'intro']) if (!p[k]) errors.push(`${where}: campo "${k}" vazio`);
  if (slugs.has(p.slug)) errors.push(`${where}: slug repetido`);
  slugs.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) errors.push(`${where}: slug deve ter só letras minúsculas, números e hífen`);
  if (!catIds.has(p.category)) errors.push(`${where}: categoria "${p.category}" não existe em categories`);
  if (!['live', 'demo', 'repo', 'private'].includes(p.status)) errors.push(`${where}: status inválido "${p.status}"`);
  if (p.status === 'live' && !p.links?.live) errors.push(`${where}: status "live" sem links.live`);
  const en = projectsEn[p.slug];
  if (!en) errors.push(`${where}: falta a tradução em data/projects.en.mjs`);
  else {
    for (const k of ['type', 'summary', 'intro']) if (!en[k]) errors.push(`${where}: tradução sem "${k}"`);
    if ((en.images || []).length !== (p.images || []).length) errors.push(`${where}: tradução com ${(en.images || []).length} imagens, original tem ${(p.images || []).length}`);
    if (p.highlights?.length && en.highlights?.length !== p.highlights.length) errors.push(`${where}: tradução dos destaques incompleta`);
    if (p.study && !en.study) errors.push(`${where}: falta a tradução do estudo de caso`);
  }
  for (const img of p.images || []) {
    if (!img.alt) errors.push(`${where}: imagem "${img.file}" sem texto alternativo`);
    if (!fs.existsSync(rel('img', 'projetos', p.slug, `${img.file}.webp`))) errors.push(`${where}: img/projetos/${p.slug}/${img.file}.webp não encontrada (rode npm run images)`);
  }
}
if (errors.length) {
  console.error('✗ Dados inválidos:\n  - ' + errors.join('\n  - '));
  process.exit(1);
}

/* ---------- Ordem de exibição: destaques primeiro, depois a ordem do array ---------- */
const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

/* ---------- Dimensões das imagens (evita layout shift) ---------- */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (b.readUInt16BE(0) === 0xffd8) {
    let o = 2;
    while (o < b.length) {
      const marker = b.readUInt16BE(o);
      const len = b.readUInt16BE(o + 2);
      if (marker >= 0xffc0 && marker <= 0xffc3) return { h: b.readUInt16BE(o + 5), w: b.readUInt16BE(o + 7) };
      o += 2 + len;
    }
  }
  if (b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  throw new Error(`Formato de imagem não reconhecido: ${file}`);
}

/** Resolve uma imagem de projeto: caminhos, dimensões e srcset. */
function projectImage(slug, file) {
  const base = `/img/projetos/${slug}/${file}`;
  const full = rel('img', 'projetos', slug, `${file}.webp`);
  const { w, h } = imageSize(full);
  const smallFile = rel('img', 'projetos', slug, `${file}-800.webp`);
  const srcset = fs.existsSync(smallFile) ? `${base}-800.webp 800w, ${base}.webp ${w}w` : '';
  return { src: `${base}.webp`, w, h, srcset };
}

/* ---------- Cache busting dos assets ---------- */
const hash = (f) => crypto.createHash('md5').update(fs.readFileSync(rel(f))).digest('hex').slice(0, 8);
const assets = {
  css: `/assets/css/site.css?v=${hash('assets/css/site.css')}`,
  js: `/assets/js/site.js?v=${hash('assets/js/site.js')}`,
};

const portrait = (() => {
  const f = ['luis.webp'].map((n) => rel('img', 'sobre', n)).find((x) => fs.existsSync(x));
  return f ? { src: `/img/sobre/${path.basename(f)}`, ...imageSize(f) } : null;
})();

/** Projeto no idioma pedido (o português é a base; a tradução sobrescreve só os textos). */
function localize(p, code) {
  if (code === 'pt') return p;
  const tr = projectsEn[p.slug];
  return {
    ...p,
    ...tr,
    stack: (p.stack || []).map((s) => stackTerms[code]?.[s] ?? s),
    images: (p.images || []).map((img, i) => ({ ...img, ...tr.images?.[i] })),
    study: p.study ? { ...p.study, ...tr.study } : undefined,
  };
}

const projectHrefFor = (lang, slug) => `${lang.base}/${lang.projects}/${slug}/`;

/* ---------- Escrita ---------- */
const BANNER = '<!-- Gerado por scripts/build.mjs — edite data/ ou scripts/templates.mjs e rode `npm run build`. -->\n';
let written = 0;
function write(file, content) {
  fs.mkdirSync(path.dirname(rel(file)), { recursive: true });
  fs.writeFileSync(rel(file), content.startsWith('<!doctype') ? content.replace('\n', `\n${BANNER}`) : content);
  written++;
}

for (const lang of Object.values(languages)) {
  const ctx = {
    site,
    lang,
    langs: languages,
    t: ui[lang.code],
    categories: categories.map((c) => ({ ...c, label: categoryLabels[lang.code]?.[c.id] ?? c.label })),
    projects: ordered.map((p) => localize(p, lang.code)),
    projectImage,
    projectHref: (slug) => projectHrefFor(lang, slug),
    projectHrefFor,
    assets,
    year: new Date().getFullYear(),
    portrait,
  };
  write(`${lang.base.slice(1) ? `${lang.base.slice(1)}/` : ''}index.html`, homePage(ctx));
  ctx.projects.forEach((p, i) => {
    const prev = ctx.projects[(i - 1 + ctx.projects.length) % ctx.projects.length];
    const next = ctx.projects[(i + 1) % ctx.projects.length];
    write(`${projectHrefFor(lang, p.slug).slice(1)}index.html`, projectPage(ctx, p, { prev, next }));
  });
  write(`${lang.base.slice(1) ? `${lang.base.slice(1)}/` : ''}404.html`, notFoundPage(ctx));

  // remove páginas de projetos que saíram dos dados
  const projDir = rel(lang.base.slice(1), lang.projects);
  for (const d of fs.readdirSync(projDir)) {
    if (!slugs.has(d)) { fs.rmSync(path.join(projDir, d), { recursive: true }); console.log(`  removida a página antiga ${lang.base}/${lang.projects}/${d}/`); }
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.values(languages).flatMap((l) => [`${l.base}/`, ...ordered.map((p) => projectHrefFor(l, p.slug))]);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /scripts/\nDisallow: /data/\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`✓ ${written} arquivos gerados · ${ordered.length} projetos (${ordered.filter((p) => p.featured).length} em destaque) · ${Object.keys(languages).length} idiomas`);
