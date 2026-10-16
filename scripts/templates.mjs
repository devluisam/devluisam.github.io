// Templates HTML do site (português e inglês).
// Textos fixos: data/i18n.mjs · Projetos: data/projects.mjs (+ projects.en.mjs) · Contatos: data/site.mjs

import { whatsappUrl } from '../data/site.mjs';

/* ─────────────────────────── utilitários ─────────────────────────── */

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s = '') => String(s).replace(/<[^>]+>/g, '');
const ext = 'target="_blank" rel="noopener"';
const pad = (n) => String(n).padStart(2, '0');

/** Divide um texto em palavras mascaradas para a revelação do título. */
function words(parts, start = 0) {
  let i = start;
  return parts
    .map(([text, cls]) => {
      const html = text.split(' ').filter(Boolean)
        .map((w) => `<span class="w"><span${cls ? ` class="${cls}"` : ''} style="--i:${i++}">${w}</span></span>`).join(' ');
      // trecho destacado com mais de uma palavra não se separa entre linhas
      return cls && text.trim().includes(' ') ? `<span class="nowrap">${html}</span>` : html;
    })
    .join(' ');
}

const icon = {
  arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"/></svg>',
  right: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>',
  left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5"/></svg>',
  down: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9"/></svg>',
  up: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 13.5v-11M3.5 7 8 2.5 12.5 7"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
};

/** Botão com ícone animado. variant: primary | ghost | light */
function button({ href, label, variant = 'primary', size = '', external = false, ico = 'arrow', magnetic = true }) {
  const i = icon[ico];
  const down = ico === 'down' ? ' down' : '';
  return `<a class="btn btn-${variant}${size ? ` btn-${size}` : ''}${down}" href="${esc(href)}"${external ? ` ${ext}` : ''}${magnetic ? ' data-magnetic' : ''}><span class="btn-label">${label}</span><span class="btn-icon${down}">${i}${i}</span></a>`;
}

const isLive = (p) => Boolean(p.links?.live);
const statusLabel = (t, p) => {
  if (p.model) return isLive(p) ? t.status.modelLive : t.status.model;
  return t.status[p.status];
};
const catLabel = (ctx, id) => ctx.categories.find((c) => c.id === id)?.label ?? id;
const projectWhats = (t, p) => (p.category === 'sistemas' ? t.whatsSystem(p.name) : t.whatsSite(p.name));

/* ─────────────────────────── layout ─────────────────────────── */

function head(ctx, { title, description, alternates, image, jsonld, preload, noindex }) {
  const { site, assets, lang, langs } = ctx;
  const path = alternates[lang.code];
  const url = site.url + path;
  const og = site.url + (image || site.ogImage);
  const alt = Object.entries(alternates).map(([code, p]) => `<link rel="alternate" hreflang="${langs[code].htmlLang}" href="${site.url + p}">`).join('\n');
  return `<!doctype html>
<html lang="${lang.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.fullName)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${url}">
${alt}
<link rel="alternate" hreflang="x-default" href="${site.url + alternates.pt}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${lang.ogLocale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-serif-italic-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload ? `<link rel="preload" as="image" href="${preload.src}"${preload.srcset ? ` imagesrcset="${preload.srcset}" imagesizes="${preload.sizes}"` : ''} fetchpriority="high">\n` : ''}<link rel="stylesheet" href="${assets.css}">
<script src="${assets.js}" defer></script>
${(Array.isArray(jsonld) ? jsonld : [jsonld]).filter(Boolean).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>`;
}

const NAV = ['projetos', 'servicos', 'sobre', 'contato'];

/** Seletor de idioma: aponta para a página equivalente no outro idioma. */
function langSwitch(ctx, alternates, cls = '') {
  const { t, lang, langs } = ctx;
  return `<nav class="lang${cls ? ` ${cls}` : ''}" aria-label="${t.langGroup}">${Object.values(langs).map((l) => {
    const current = l.code === lang.code;
    return `<a href="${alternates[l.code]}" hreflang="${l.htmlLang}" lang="${l.htmlLang}"${current ? ' aria-current="true"' : ` title="${esc(t.switchTo)}"`}><span class="sr-only">${l.name} </span><span aria-hidden="true">${l.label}</span></a>`;
  }).join('')}</nav>`;
}

function header(ctx, home, alternates) {
  const { t, site, lang } = ctx;
  const homeHref = `${lang.base}/`;
  const href = (id) => (home ? `#${id}` : `${homeHref}#${id}`);
  const wa = whatsappUrl(t.whatsappMessage);
  return `<a class="skip" href="#main">${t.skip}</a>
<header class="nav">
  <div class="wrap nav-in">
    <a class="logo" href="${home ? '#inicio' : homeHref}" aria-label="lh.dev — ${t.home} ${esc(site.name)}">lh<b>.dev</b></a>
    <nav class="nav-links" aria-label="${t.navLabel}">
      <span class="nav-indicator" aria-hidden="true"></span>
      ${NAV.map((id) => `<a href="${href(id)}">${t.nav[id]}</a>`).join('\n      ')}
    </nav>
    <div class="nav-right">
      ${langSwitch(ctx, alternates)}
      ${button({ href: wa, label: t.quote, size: 'sm', external: true, magnetic: false })}
      <button class="burger" type="button" aria-label="${t.openMenu}" data-label-open="${t.openMenu}" data-label-close="${t.closeMenu}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true">
  <nav class="menu-links" aria-label="${t.menu}">
    ${NAV.map((id, i) => `<a href="${href(id)}" style="--i:${i}">${t.nav[id]}<small>0${i + 1}</small></a>`).join('\n    ')}
  </nav>
  <div class="menu-foot">
    ${button({ href: wa, label: t.quote, external: true, magnetic: false, ico: 'whatsapp' })}
    <div class="menu-social">
      <a href="mailto:${site.contact.email}">${t.email}</a>
      <a href="${site.social.instagram.url}" ${ext}>Instagram</a>
      <a href="${site.social.github.url}" ${ext}>GitHub</a>
      <a href="${site.social.linkedin.url}" ${ext}>LinkedIn</a>
    </div>
  </div>
</div>`;
}

function footer(ctx, home) {
  const { site, t, lang } = ctx;
  return `<footer class="footer" data-fab-hide>
  <div class="wrap footer-in">
    <a class="logo" href="${home ? '#inicio' : `${lang.base}/`}">lh<b>.dev</b></a>
    <span>© ${ctx.year} ${esc(site.name)} — ${esc(site.city)}</span>
    <nav aria-label="${t.footerNav}">
      <a href="${site.social.github.url}" ${ext}>GitHub</a>
      <a href="${site.social.linkedin.url}" ${ext}>LinkedIn</a>
      <a href="${site.social.instagram.url}" ${ext}>Instagram</a>
    </nav>
    <a class="to-top" href="#main" data-top>${t.toTop} ${icon.up}</a>
  </div>
</footer>
<a class="fab" href="${esc(whatsappUrl(t.whatsappMessage))}" ${ext} aria-label="${t.fab}">${icon.whatsapp}<span class="fab-label">WhatsApp</span></a>`;
}

const personLd = (ctx) => {
  const { site, t } = ctx;
  return {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.fullName,
    alternateName: site.name,
    url: `${site.url}/`,
    jobTitle: t.role,
    email: `mailto:${site.contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Manaus', addressRegion: 'AM', addressCountry: 'BR' },
    sameAs: [site.social.github.url, site.social.linkedin.url, site.social.instagram.url],
  };
};

/* ─────────────────────────── componentes ─────────────────────────── */

function card(ctx, p, i, size) {
  const { t } = ctx;
  const href = ctx.projectHref(p.slug);
  const cover = p.images?.[0];
  let media;
  if (cover) {
    const img = ctx.projectImage(p.slug, cover.file);
    const sizes = size === 'lg' ? '(min-width: 961px) 56vw, 100vw' : '(min-width: 961px) 40vw, 100vw';
    media = `<img src="${img.src}"${img.srcset ? ` srcset="${img.srcset}" sizes="${sizes}"` : ''} width="${img.w}" height="${img.h}" alt="${esc(cover.alt)}" loading="lazy" decoding="async">`;
  } else {
    media = `<div class="card-poster" aria-hidden="true"><b>${esc(p.type)}</b><code>${esc(p.poster || p.name)}</code></div>`;
  }
  return `<article class="card" data-category="${p.category}" data-size="${size}" data-reveal>
        <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true" style="view-transition-name: p-${p.slug}">
          ${media}
          <span class="card-cta">${t.viewProject} ${icon.right}</span>
        </a>
        <div class="card-body">
          <div class="card-meta"><span class="idx">${pad(i + 1)}</span><span>${esc(catLabel(ctx, p.category))}</span><span class="badge${isLive(p) ? ' live' : ''}">${statusLabel(t, p)}</span></div>
          <h3><a href="${href}">${esc(p.name)}</a></h3>
          <p>${esc(p.summary)}</p>
          <div class="card-links">
            <a class="link-arrow int" href="${href}">${t.viewProject} ${icon.right}</a>
            ${p.links?.live ? `<a class="link-arrow" href="${p.links.live}" ${ext}>${t.visitSite} ${icon.arrow}<span class="sr-only"> ${t.newTab}</span></a>` : ''}
          </div>
        </div>
      </article>`;
}

/** Tamanhos do ritmo editorial: [grande, pequeno], [pequeno, grande]… (o JS recalcula ao filtrar). */
const sizeFor = (i) => ((Math.floor(i / 2) % 2 === 0) === (i % 2 === 0) ? 'lg' : 'sm');

function contactSection(ctx) {
  const { site, t } = ctx;
  const wa = whatsappUrl(t.whatsappMessage);
  return `<section class="section contact" id="contato" aria-labelledby="contato-titulo" data-fab-hide>
  <div class="wrap">
    <p class="eyebrow" data-reveal><span class="num">05</span> ${t.contactEyebrow}</p>
    <h2 class="contact-title mt-md" id="contato-titulo" data-reveal>${t.contactTitle}</h2>
    <div class="contact-grid">
      <div data-reveal>
        <p class="lead">${t.contactLead}</p>
        <div class="contact-actions">
          ${button({ href: wa, label: t.callWhats, size: 'lg', external: true, ico: 'whatsapp' })}
          ${button({ href: `mailto:${site.contact.email}?subject=${encodeURIComponent(t.emailSubject)}`, label: t.sendEmail, variant: 'ghost', size: 'lg' })}
        </div>
      </div>
      <div class="channels" data-reveal style="--d:.1s">
        <a class="channel" href="${esc(wa)}" ${ext}><span>WhatsApp</span><span>${esc(site.contact.whatsappDisplay)} ${icon.arrow}</span></a>
        <a class="channel" href="mailto:${site.contact.email}"><span>${t.email}</span><span>${esc(site.contact.email)} ${icon.arrow}</span></a>
        <a class="channel" href="${site.social.instagram.url}" ${ext}><span>Instagram</span><span>${esc(site.social.instagram.label)} ${icon.arrow}</span></a>
        <a class="channel" href="${site.social.github.url}" ${ext}><span>GitHub</span><span>${esc(site.social.github.label)} ${icon.arrow}</span></a>
        <a class="channel" href="${site.social.linkedin.url}" ${ext}><span>LinkedIn</span><span>${esc(site.social.linkedin.label)} ${icon.arrow}</span></a>
      </div>
    </div>
  </div>
</section>`;
}

/* ─────────────────────────── home ─────────────────────────── */

export function homePage(ctx) {
  const { site, projects, categories, t, langs } = ctx;
  const alternates = Object.fromEntries(Object.values(langs).map((l) => [l.code, `${l.base}/`]));
  const wa = whatsappUrl(t.whatsappMessage);
  const sites = projects.filter((p) => p.model);
  const usedCats = categories.filter((c) => projects.some((p) => p.category === c.id));
  const stripItems = (hidden) => sites.map((p) => {
    const img = ctx.projectImage(p.slug, p.images[0].file);
    const small = img.srcset ? img.src.replace('.webp', '-800.webp') : img.src;
    return `<a href="${ctx.projectHref(p.slug)}"${hidden ? ' tabindex="-1" aria-hidden="true"' : ''}><img src="${small}" width="800" height="500" alt="${hidden ? '' : esc(`${p.name} — ${catLabel(ctx, p.category)}`)}" loading="lazy" decoding="async"><span>${esc(p.name)}</span></a>`;
  }).join('');

  return `${head(ctx, {
    title: t.title,
    description: t.description,
    alternates,
    jsonld: [
      { '@context': 'https://schema.org', ...personLd(ctx), knowsAbout: ['Web development', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'SEO', 'Motion design'] },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t.projectsEyebrow,
        itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: site.url + ctx.projectHref(p.slug), name: p.name })),
      },
    ],
  })}
<body>
${header(ctx, true, alternates)}
<main id="main">

<section class="hero" id="inicio" aria-labelledby="hero-titulo" data-fab-after>
  <div class="hero-bg" aria-hidden="true"><div class="glow" data-parallax="-0.18"></div><div class="cols"></div></div>
  <div class="wrap">
    <div class="hero-top fade-in" style="--d:.05s">
      <span class="status"><span class="pulse" aria-hidden="true"></span>${t.available}</span>
      <span class="eyebrow">${esc(site.name)} — ${esc(t.role)} · ${esc(site.city)}</span>
    </div>
    <h1 id="hero-titulo" class="reveal-words">${words(t.hero)}</h1>
    <div class="hero-foot">
      <div class="fade-in" style="--d:.75s">
        <p class="lead">${t.heroLead}</p>
        <div class="hero-actions">
          ${button({ href: '#projetos', label: t.explore, ico: 'down' })}
          ${button({ href: wa, label: t.quote, variant: 'ghost', external: true })}
        </div>
      </div>
      <dl class="hero-facts fade-in" style="--d:.9s">
        <div><dt>${t.facts.projects}</dt><dd>${pad(projects.length)}</dd></div>
        <div><dt>${t.facts.live}</dt><dd>${pad(projects.filter(isLive).length)}</dd></div>
        <div><dt>${t.facts.segments}</dt><dd>${pad(usedCats.length)}</dd></div>
      </dl>
    </div>
  </div>
  <div class="strip fade-in" style="--d:1.05s" role="region" aria-label="${t.stripLabel}">
    <div class="strip-track">${stripItems(false)}${stripItems(true)}</div>
  </div>
</section>

<section class="section" id="projetos" aria-labelledby="projetos-titulo">
  <span id="outros" aria-hidden="true"></span>
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow" data-reveal><span class="num">01</span> ${t.projectsEyebrow}</p>
      <h2 class="h-section" id="projetos-titulo" data-reveal>${t.projectsTitle}</h2>
      <p class="lead" data-reveal style="--d:.1s">${t.projectsLead}</p>
    </div>
    <div class="filters" role="group" aria-label="${t.filterLabel}" data-reveal>
      <button class="filter" type="button" data-filter="todos" data-label="${t.all}" aria-pressed="true">${t.all} <sup>${projects.length}</sup></button>
      ${usedCats.map((c) => `<button class="filter" type="button" data-filter="${c.id}" data-label="${esc(c.label)}" aria-pressed="false">${esc(c.label)} <sup>${projects.filter((p) => p.category === c.id).length}</sup></button>`).join('\n      ')}
    </div>
    <p class="sr-only" id="filter-status" aria-live="polite" data-one="${t.filterStatus.one}" data-many="${t.filterStatus.many}" data-in="${t.filterStatus.in}"></p>
    <div class="grid" id="grid">
      ${projects.map((p, i) => card(ctx, p, i, sizeFor(i))).join('\n      ')}
    </div>
    <div class="projects-foot" data-reveal>
      <p>${t.projectsFoot}</p>
      ${button({ href: wa, label: t.quote, external: true, ico: 'whatsapp' })}
    </div>
  </div>
</section>

<section class="section" id="servicos" aria-labelledby="servicos-titulo">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow" data-reveal><span class="num">02</span> ${t.servicesEyebrow}</p>
      <h2 class="h-section" id="servicos-titulo" data-reveal>${t.servicesTitle}</h2>
      <p class="lead" data-reveal style="--d:.1s">${t.servicesLead}</p>
    </div>
    <div class="services">
      ${t.services.map(([title, text], i) => `<article class="service" data-reveal>
        <span class="n">${pad(i + 1)}</span>
        <h3>${title}</h3>
        ${i === 0 ? `<div class="service-more">
          <p>${text}</p>
          <a class="link-arrow" href="${site.salesPage}" ${ext}>${t.salesLink} ${icon.arrow}</a>
        </div>` : `<p>${text}</p>`}
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="processo" aria-labelledby="processo-titulo">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow" data-reveal><span class="num">03</span> ${t.processEyebrow}</p>
      <h2 class="h-section" id="processo-titulo" data-reveal>${t.processTitle}</h2>
      <p class="lead" data-reveal style="--d:.1s">${t.processLead}</p>
    </div>
    <ol class="process">
      <li class="process-line" aria-hidden="true"><i></i></li>
      ${t.steps.map(([title, text], i) => `<li class="step" data-reveal${i ? ` style="--d:${(i * 0.08).toFixed(2)}s"` : ''}><span class="n">${pad(i + 1)}</span><h3>${title}</h3><p>${text}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section" id="sobre" aria-labelledby="sobre-titulo">
  <div class="wrap about">
    ${ctx.portrait ? `<figure class="portrait" data-reveal>
      <img src="${ctx.portrait.src}" width="${ctx.portrait.w}" height="${ctx.portrait.h}" alt="${esc(t.portraitAlt)}" loading="lazy" decoding="async" data-parallax="0.06">
      <figcaption>${esc(site.city)}</figcaption>
    </figure>` : ''}
    <div class="about-text">
      <p class="eyebrow" data-reveal><span class="num">04</span> ${t.aboutEyebrow}</p>
      <h2 class="h-section mt-sm" id="sobre-titulo" data-reveal>${t.aboutTitle}</h2>
      <div data-reveal>
        ${t.about.map((para) => `<p>${para}</p>`).join('\n        ')}
      </div>
      <dl class="facts" data-reveal>
        ${t.facts2.map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${v ?? `<a class="link-arrow" href="${site.social.github.url}" ${ext}>GitHub · ${esc(site.social.github.label)} ${icon.arrow}</a>`}</dd></div>`).join('\n        ')}
      </dl>
      <div class="stack-wrap" id="stack" data-reveal>
        <h3>${t.stackTitle}</h3>
        <p>${t.stackLead}</p>
        <div class="stack-grid">
          ${t.stack.map(([title, items]) => `<div><h4>${title}</h4><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</section>

${contactSection(ctx)}

</main>
${footer(ctx, true)}
</body>
</html>
`;
}

/* ─────────────────────────── página de projeto ─────────────────────────── */

export function projectPage(ctx, p, { prev, next }) {
  const { site, t, langs } = ctx;
  const alternates = Object.fromEntries(Object.values(langs).map((l) => [l.code, ctx.projectHrefFor(l, p.slug)]));
  const path = alternates[ctx.lang.code];
  const cat = catLabel(ctx, p.category);
  const status = statusLabel(t, p);
  const [cover, ...rest] = p.images || [];
  const coverImg = cover && ctx.projectImage(p.slug, cover.file);
  const coverSizes = '(min-width: 1360px) 1264px, 92vw';
  const frameUrl = p.links?.live ? p.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : p.model ? t.demoFrame : p.name.toLowerCase();
  const isSite = p.category !== 'sistemas';

  const actions = [];
  if (p.links?.live) actions.push(button({ href: p.links.live, label: isSite ? t.visitSite : t.openSystem, external: true }));
  if (p.links?.repo) actions.push(button({ href: p.links.repo, label: t.viewRepo, variant: 'ghost', external: true }));
  if (p.model && !p.links?.live) actions.push(button({ href: whatsappUrl(t.whatsDemo(p.name)), label: t.askDemo, external: true, ico: 'whatsapp' }));
  if (!actions.length) actions.push(button({ href: whatsappUrl(projectWhats(t, p)), label: t.talkProject, external: true, ico: 'whatsapp' }));

  const figure = (img, cls) => {
    const r = ctx.projectImage(p.slug, img.file);
    const tag = `<img src="${r.src}"${r.srcset ? ` srcset="${r.srcset}" sizes="${cls === 'half' ? '(min-width: 961px) 46vw, 92vw' : '(min-width: 961px) 62vw, 92vw'}"` : ''} width="${r.w}" height="${r.h}" alt="${esc(img.alt)}" loading="lazy" decoding="async">`;
    const body = img.device === 'mobile' ? `<div class="phone-frame">${tag}</div>` : `<div class="frame">${tag}</div>`;
    return `<figure class="${cls}" data-reveal>${body}${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ''}</figure>`;
  };
  let gallery = '';
  if (rest.length) {
    const desk = rest.filter((i) => i.device !== 'mobile');
    const mob = rest.filter((i) => i.device === 'mobile');
    const parts = [];
    if (desk.length === 1 && mob.length) parts.push(figure(desk[0], 'wide'), ...mob.map((m) => figure(m, 'phone')));
    else {
      desk.forEach((d) => parts.push(figure(d, desk.length > 1 ? 'half' : '')));
      mob.forEach((m) => parts.push(figure(m, 'phone')));
    }
    gallery = `<section class="p-section" aria-label="${t.gallery}"><div class="wrap"><div class="gallery">${parts.join('\n')}</div></div></section>`;
  }

  const s = p.study;
  const study = s ? `<section class="p-section" aria-labelledby="estudo"><div class="wrap">
    <div class="p-cols p-cols-head">
      <div><p class="eyebrow">${t.studyEyebrow}</p><h2 id="estudo">${t.studyTitle}</h2></div>
      <p class="lead">${t.studyLead}</p>
    </div>
    <div class="study">
      <div class="study-pair">
        <div data-reveal><h3>${t.study.problem}</h3><p>${s.problem}</p></div>
        <div data-reveal style="--d:.08s"><h3>${t.study.solution}</h3><p>${s.solution}</p></div>
      </div>
      ${s.architecture ? `<div data-reveal><h3>${esc(s.architectureTitle || t.study.architecture)}</h3><pre class="arch">${esc(s.architecture)}</pre></div>` : ''}
      ${s.challenges?.length ? `<div data-reveal><h3>${t.study.challenges}</h3><ul class="challenges">${s.challenges.map((c) => `<li><strong>${c.title}</strong>${c.text}</li>`).join('')}</ul></div>` : ''}
      <div class="study-pair">
        ${s.role ? `<div data-reveal><h3>${t.study.role}</h3><p>${s.role}</p></div>` : ''}
        ${s.result ? `<div data-reveal style="--d:.08s"><h3>${t.study.result}</h3><p>${s.result}</p></div>` : ''}
      </div>
    </div>
  </div></section>` : '';

  const highlights = p.highlights?.length ? `<section class="p-section" aria-labelledby="destaques"><div class="wrap p-cols">
    <div data-reveal><p class="eyebrow">${t.highlightsEyebrow}</p><h2 id="destaques">${isSite ? t.highlightsSite : t.highlightsSystem}</h2></div>
    <ul class="p-list" data-reveal>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
  </div></section>` : '';

  const pagerItem = (q, dir) => `<a href="${ctx.projectHref(q.slug)}"><small>${dir === 'prev' ? `${icon.left} ${t.prev}` : `${t.next} ${icon.right}`}</small><strong>${esc(q.name)}</strong><span>${esc(catLabel(ctx, q.category))}</span></a>`;
  const desc = stripTags(p.summary);
  const homeHref = `${ctx.lang.base}/`;

  return `${head(ctx, {
    title: `${p.name} — ${cat} · ${site.name}`,
    description: desc,
    alternates,
    image: cover ? `/img/projetos/${p.slug}/og.jpg` : undefined,
    preload: coverImg ? { src: coverImg.src, srcset: coverImg.srcset, sizes: coverSizes } : null,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.name,
        description: desc,
        url: site.url + path,
        inLanguage: ctx.lang.htmlLang,
        ...(coverImg ? { image: site.url + coverImg.src } : {}),
        genre: cat,
        keywords: (p.stack || []).join(', '),
        author: { '@id': `${site.url}/#person`, '@type': 'Person', name: site.fullName },
        ...(p.links?.live ? { sameAs: p.links.live } : {}),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: site.url + homeHref },
          { '@type': 'ListItem', position: 2, name: t.breadcrumbProjects, item: `${site.url + homeHref}#projetos` },
          { '@type': 'ListItem', position: 3, name: p.name, item: site.url + path },
        ],
      },
    ],
  })}
<body>
${header(ctx, false, alternates)}
<main id="main">
  <article>
    <header class="p-hero" data-fab-after>
      <div class="wrap">
        <a class="back" href="${homeHref}#projetos">${icon.left} ${t.allProjects}</a>
        <p class="eyebrow fade-in" style="--d:.05s"><span class="num">${esc(cat)}</span> · ${esc(p.type)} · ${esc(status)}</p>
        <h1 class="reveal-words">${words([[p.name]])}</h1>
        <div class="p-intro">
          <p class="lead fade-in" style="--d:.45s">${p.intro}</p>
          <div class="fade-in" style="--d:.6s">
            <dl class="p-info">
              <div><dt>${t.info.segment}</dt><dd>${esc(cat)}</dd></div>
              <div><dt>${t.info.delivery}</dt><dd>${esc(p.type)}</dd></div>
              <div><dt>${t.info.status}</dt><dd>${esc(status)}</dd></div>
              ${p.stack?.length ? `<div><dt>${t.info.tech}</dt><dd>${p.stack.map(esc).join(' · ')}</dd></div>` : ''}
            </dl>
            <div class="p-actions">${actions.join('\n')}</div>
          </div>
        </div>
        <div class="p-cover fade-in" style="--d:.7s">
          ${coverImg
            ? `<figure><div class="frame" style="view-transition-name: p-${p.slug}"><div class="frame-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(frameUrl)}</span></div><div class="frame-media"><img src="${coverImg.src}"${coverImg.srcset ? ` srcset="${coverImg.srcset}" sizes="${coverSizes}"` : ''} width="${coverImg.w}" height="${coverImg.h}" alt="${esc(cover.alt)}" fetchpriority="high" decoding="async"></div></div>${cover.caption ? `<figcaption class="sr-only">${esc(cover.caption)}</figcaption>` : ''}</figure>`
            : `<div class="frame p-poster" style="view-transition-name: p-${p.slug}"><div class="card-poster" aria-hidden="true"><b>${esc(p.type)}</b><code>${esc(p.poster || p.name)}</code></div></div>`}
        </div>
      </div>
    </header>

    ${highlights}
    ${gallery}
    ${study}

    <section class="p-section" aria-label="${t.nextStep}"><div class="wrap">
      ${p.note ? `<p class="p-note" data-reveal>${esc(p.note)}</p>` : ''}
      <div class="cta-band" data-reveal data-fab-hide>
        <div>
          <h2>${isSite ? t.ctaSite : t.ctaSystem}</h2>
          <p>${isSite ? t.ctaSiteLead : t.ctaSystemLead}</p>
        </div>
        ${button({ href: whatsappUrl(projectWhats(t, p)), label: t.quote, size: 'lg', external: true, ico: 'whatsapp' })}
      </div>
      <nav class="pager" aria-label="${t.otherProjects}">${pagerItem(prev, 'prev')}${pagerItem(next, 'next')}</nav>
    </div></section>
  </article>
</main>
${footer(ctx, false)}
</body>
</html>
`;
}

/* ─────────────────────────── 404 ─────────────────────────── */

export function notFoundPage(ctx) {
  const { t, lang } = ctx;
  const alternates = { pt: '/404.html', en: '/en/404.html' };
  return `${head(ctx, { title: `${t.nfTitle} · ${ctx.site.name}`, description: t.nfDescription, alternates, noindex: true })}
<body>
${header(ctx, false, alternates)}
<main id="main" class="nf">
  <div class="wrap">
    <p class="eyebrow">${t.nfEyebrow}</p>
    <h1 class="reveal-words">${words([['404']])}</h1>
    <p class="lead">${t.nfLead}</p>
    <div class="hero-actions">
      ${button({ href: `${lang.base}/#projetos`, label: t.nfProjects, ico: 'right' })}
      ${button({ href: whatsappUrl(t.whatsappMessage), label: t.nfTalk, variant: 'ghost', external: true, ico: 'whatsapp' })}
    </div>
  </div>
</main>
${footer(ctx, false)}
</body>
</html>
`;
}
