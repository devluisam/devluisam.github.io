// Verifica o HTML gerado: links internos, âncoras, imagens, ids e acessibilidade básica.
//
//   npm run check              (só arquivos locais)
//   npm run check -- --external  (também testa os links externos)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkExternal = process.argv.includes('--external');

const listProjects = (dir) => fs.readdirSync(path.join(ROOT, dir)).map((d) => `${dir}/${d}/index.html`);
const pages = [
  'index.html', '404.html', ...listProjects('projetos'),
  'en/index.html', 'en/404.html', ...listProjects('en/projects'),
];
const problems = [];
const external = new Set();
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

function resolveLocal(url, fromPage) {
  const clean = url.split(/[?#]/)[0];
  if (!clean) return path.join(ROOT, fromPage);
  let f = clean.startsWith('/') ? path.join(ROOT, clean) : path.join(ROOT, path.dirname(fromPage), clean);
  if (clean.endsWith('/')) f = path.join(f, 'index.html');
  return f;
}

const htmlCache = new Map();
const idsOf = (file) => {
  if (!htmlCache.has(file)) htmlCache.set(file, fs.readFileSync(file, 'utf8'));
  return new Set([...htmlCache.get(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
};

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const err = (msg) => problems.push(`${page}: ${msg}`);

  // ids únicos
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  ids.filter((id, i) => ids.indexOf(id) !== i).forEach((id) => err(`id repetido "${id}"`));

  // um h1 por página
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(`${h1} elementos <h1> (esperado 1)`);

  // imagens: alt, dimensões e arquivo existente
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const src = attr(tag, 'src');
    if (attr(tag, 'alt') === undefined) err(`imagem sem alt: ${src}`);
    if (!attr(tag, 'width') || !attr(tag, 'height')) err(`imagem sem width/height: ${src}`);
    if (src && !src.startsWith('http') && !fs.existsSync(resolveLocal(src, page))) err(`imagem não encontrada: ${src}`);
    for (const part of (attr(tag, 'srcset') || '').split(',').map((s) => s.trim().split(' ')[0]).filter(Boolean)) {
      if (!fs.existsSync(resolveLocal(part, page))) err(`srcset não encontrado: ${part}`);
    }
  }

  // links e recursos
  for (const [tag] of html.matchAll(/<(?:a|link|script)\b[^>]*>/g)) {
    const url = attr(tag, 'href') ?? attr(tag, 'src');
    if (url === undefined) continue;
    if (tag.startsWith('<a') && (url === '' || url === '#')) { err(`link vazio: ${tag.slice(0, 80)}`); continue; }
    if (/^(mailto:|tel:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) {
      if (tag.startsWith('<a') && attr(tag, 'target') === '_blank' && !/noopener/.test(attr(tag, 'rel') || '')) err(`target=_blank sem rel=noopener: ${url}`);
      if (tag.startsWith('<a')) external.add(url.replace(/&amp;/g, '&'));
      continue;
    }
    const file = resolveLocal(url, page);
    if (!fs.existsSync(file)) { err(`link interno quebrado: ${url}`); continue; }
    const hash = url.includes('#') ? url.split('#')[1] : '';
    if (hash && file.endsWith('.html') && !idsOf(file).has(hash)) err(`âncora inexistente: ${url}`);
  }

  // botões precisam de nome acessível
  for (const [tag, inner] of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    if (!/aria-label="/.test(tag) && !inner.replace(/<[^>]+>/g, '').trim()) err('botão sem nome acessível');
  }

  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) err('meta description ausente ou curta');
  if (!/<link rel="canonical"/.test(html)) err('canonical ausente');
}

if (checkExternal) {
  console.log(`Testando ${external.size} links externos…`);
  await Promise.all([...external].map(async (url) => {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 (link-check)' } });
      // LinkedIn e Instagram costumam responder 999/429 para robôs: aviso, não erro
      if (res.status >= 400) console.log(`  ${[999, 429, 403].includes(res.status) ? 'aviso' : 'ERRO '} ${res.status} ${url}`);
      if (res.status >= 400 && ![999, 429, 403].includes(res.status)) problems.push(`link externo ${res.status}: ${url}`);
    } catch (e) {
      problems.push(`link externo falhou (${e.name}): ${url}`);
    }
  }));
}

if (problems.length) {
  console.error(`✗ ${problems.length} problema(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} páginas verificadas${checkExternal ? ` · ${external.size} links externos ok` : ''}`);
