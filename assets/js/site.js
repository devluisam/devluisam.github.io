/* devluisam — interações e movimento.
   Sem dependências. Todo o conteúdo já vem no HTML; este arquivo só melhora a
   experiência (e nada some se ele falhar). Respeita prefers-reduced-motion. */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const EASE = 'cubic-bezier(.16, 1, .3, 1)';

  /* ---------- Rolagem: um único listener com rAF ---------- */
  const scrollHandlers = [];
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      scrollHandlers.forEach((fn) => fn(y));
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Navbar: fundo ao rolar, esconde ao descer ---------- */
  const nav = $('.nav');
  if (nav) {
    let lastY = window.scrollY;
    const update = (y) => {
      nav.classList.toggle('is-scrolled', y > 24);
      const menuOpen = root.classList.contains('menu-open');
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (!menuOpen && goingDown && y > 480 && !nav.matches(':focus-within')) nav.classList.add('is-hidden');
      else if (goingUp || y < 480) nav.classList.remove('is-hidden');
      lastY = y;
    };
    scrollHandlers.push(update);
    update(window.scrollY);
  }

  /* ---------- Indicador de seção ativa ---------- */
  const links = $$('.nav-links a[href^="#"], .nav-links a[href*="/#"]');
  const indicator = $('.nav-indicator');
  const moveIndicator = (a) => {
    if (!indicator) return;
    if (!a) { indicator.style.opacity = '0'; return; }
    indicator.style.width = `${a.offsetWidth}px`;
    indicator.style.transform = `translateX(${a.offsetLeft}px)`;
    indicator.style.opacity = '1';
  };
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
    const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      let best = null, ratio = 0;
      visible.forEach((r, id) => { if (r > ratio) { ratio = r; best = id; } });
      links.forEach((a) => a.removeAttribute('aria-current'));
      const active = best && byId.get(best);
      if (active) active.setAttribute('aria-current', 'true');
      moveIndicator(active);
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, .01, .5, 1] });
    sections.forEach((s) => io.observe(s));
    addEventListener('resize', () => moveIndicator($('.nav-links a[aria-current]')), { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const burger = $('.burger');
  const menu = $('#menu');
  if (burger && menu) {
    let ctrl = null;
    const close = (focusBurger = true) => {
      menu.classList.remove('is-open');
      root.classList.remove('menu-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', burger.dataset.labelOpen || 'Abrir menu');
      menu.setAttribute('aria-hidden', 'true');
      menu.inert = true;
      ctrl?.abort();
      ctrl = null;
      if (focusBurger) burger.focus();
    };
    const open = () => {
      menu.inert = false;
      menu.classList.add('is-open');
      root.classList.add('menu-open');
      nav?.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', burger.dataset.labelClose || 'Fechar menu');
      menu.setAttribute('aria-hidden', 'false');
      ctrl = new AbortController();
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') {
          const items = [burger, ...$$('a, button', menu)];
          const first = items[0], last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }, { signal: ctrl.signal });
      matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && close(false), { signal: ctrl.signal });
    };
    menu.inert = true;
    burger.addEventListener('click', () => (menu.classList.contains('is-open') ? close() : open()));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(false); });
  }

  /* ---------- Revelação ao rolar ---------- */
  // Só esconde o que está abaixo da dobra; o que já está visível nunca pisca.
  const revealEls = $$('[data-reveal]');
  if (!reduced.matches && 'IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    // Lê todas as posições antes de escrever qualquer classe (evita layout forçado em loop).
    // Seções inteiras abaixo da dobra são decididas pela própria seção, sem medir cada filho.
    const fold = innerHeight * .92;
    const sectionTop = new Map();
    const below = revealEls.filter((el) => {
      const sec = el.closest('.section, .p-section');
      if (sec) {
        if (!sectionTop.has(sec)) sectionTop.set(sec, sec.getBoundingClientRect().top);
        if (sectionTop.get(sec) >= fold) return true;
      }
      return el.getBoundingClientRect().top >= fold;
    });
    below.forEach((el) => {
      el.classList.add('is-pending');
      io.observe(el);
    });
  }

  /* ---------- Botões magnéticos (desktop) ---------- */
  if (finePointer.matches && !reduced.matches) {
    $$('[data-magnetic]').forEach((el) => {
      const label = $('.btn-label', el);
      const strength = 0.28;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
        if (label) label.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
        if (label) label.style.transform = '';
      });
    });
  }

  /* ---------- Etiqueta "Ver projeto" que segue o cursor ---------- */
  if (finePointer.matches) {
    $$('.card-media').forEach((media) => {
      const cta = $('.card-cta', media);
      if (!cta) return;
      media.addEventListener('pointermove', (e) => {
        const r = media.getBoundingClientRect();
        media.style.setProperty('--cx', `${e.clientX - r.left - cta.offsetWidth / 2}px`);
        media.style.setProperty('--cy', `${e.clientY - r.top - cta.offsetHeight / 2}px`);
      });
    });
  }

  /* ---------- Parallax sutil ---------- */
  if (!reduced.matches) {
    const items = $$('[data-parallax]').map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0.1, on: false }));
    if (items.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => {
        const it = items.find((i) => i.el === e.target);
        if (it) it.on = e.isIntersecting;
      }));
      items.forEach((it) => io.observe(it.el));
      const update = () => {
        const active = items.filter((it) => it.on);
        const offsets = active.map(({ el, speed }) => {
          const r = el.parentElement.getBoundingClientRect();
          return (r.top + r.height / 2 - innerHeight / 2) * -speed;
        });
        active.forEach(({ el }, i) => { el.style.transform = `translate3d(0, ${offsets[i].toFixed(1)}px, 0)`; });
      };
      scrollHandlers.push(update);
      update();
    }
  }

  /* ---------- Linha do processo desenhada pela rolagem ---------- */
  const process = $('.process');
  const line = $('.process-line i');
  if (process && line) {
    if (reduced.matches) line.style.setProperty('--p', '1');
    else {
      const update = () => {
        const r = process.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
        line.style.setProperty('--p', p.toFixed(3));
      };
      scrollHandlers.push(update);
      update();
    }
  }

  /* ---------- Faixa de trabalhos: pausa fora da tela ---------- */
  const strip = $('.strip');
  if (strip && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => strip.classList.toggle('is-paused', !e.isIntersecting)).observe(strip);
    strip.addEventListener('focusin', () => strip.classList.add('is-paused'));
    strip.addEventListener('focusout', () => strip.classList.remove('is-paused'));
  }

  /* ---------- Filtros de projetos (com animação de reorganização) ---------- */
  const grid = $('#grid');
  const filters = $$('.filter');
  if (grid && filters.length) {
    const cards = $$('.card', grid);
    const status = $('#filter-status');
    const assignSizes = () => {
      // ritmo editorial: [grande, pequeno], [pequeno, grande]…
      let i = 0;
      cards.forEach((c) => {
        if (c.hidden) return;
        const row = Math.floor(i / 2);
        const first = i % 2 === 0;
        c.dataset.size = (row % 2 === 0) === first ? 'lg' : 'sm';
        i++;
      });
      return i;
    };

    const apply = (cat, animate) => {
      const before = new Map(cards.map((c) => [c, c.hidden ? null : c.getBoundingClientRect()]));
      cards.forEach((c) => {
        c.hidden = !(cat === 'todos' || c.dataset.category === cat);
        c.classList.remove('is-pending');
        c.classList.add('is-in');
      });
      const count = assignSizes();
      filters.forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.filter === cat)));
      if (status) {
        const label = filters.find((f) => f.dataset.filter === cat)?.dataset.label || '';
        const { one = 'projeto', many = 'projetos', in: inWord = 'em' } = status.dataset;
        status.textContent = `${count} ${count === 1 ? one : many}${cat === 'todos' ? '' : ` ${inWord} ${label}`}.`;
      }
      if (!animate || reduced.matches) return;
      let n = 0;
      cards.forEach((c) => {
        if (c.hidden) return;
        const from = before.get(c);
        const to = c.getBoundingClientRect();
        if (!from) {
          c.animate(
            [{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'none' }],
            { duration: 700, easing: EASE, delay: 60 * n++, fill: 'backwards' },
          );
          return;
        }
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const resized = Math.abs(from.width - to.width) > 2;
        if (!dx && !dy && !resized) return;
        c.animate(
          [{ transform: `translate(${dx}px, ${dy}px)`, opacity: resized ? 0.35 : 1 }, { transform: 'none', opacity: 1 }],
          { duration: 750, easing: EASE },
        );
      });
    };

    const setUrl = (cat) => {
      const url = new URL(location.href);
      if (cat === 'todos') url.searchParams.delete('segmento');
      else url.searchParams.set('segmento', cat);
      history.replaceState(null, '', url);
    };

    filters.forEach((f) => f.addEventListener('click', () => {
      const cat = f.dataset.filter;
      apply(cat, true);
      setUrl(cat);
    }));

    const initial = new URL(location.href).searchParams.get('segmento');
    if (initial && filters.some((f) => f.dataset.filter === initial)) apply(initial, false);
  }

  /* ---------- WhatsApp flutuante ---------- */
  const fab = $('.fab');
  if (fab) {
    const hero = $('[data-fab-after]');
    const hideOver = $$('[data-fab-hide]');
    let pastHero = !hero;
    const covered = new Set();
    const sync = () => fab.classList.toggle('is-visible', pastHero && covered.size === 0);
    if ('IntersectionObserver' in window) {
      if (hero) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }, { threshold: 0 }).observe(hero);
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? covered.add(e.target) : covered.delete(e.target)));
        sync();
      }, { threshold: 0.15 });
      hideOver.forEach((el) => io.observe(el));
    } else {
      fab.classList.add('is-visible');
    }
  }

  /* ---------- Voltar ao topo ---------- */
  $$('[data-top]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
    $('.skip')?.focus({ preventScroll: true });
  }));
})();
