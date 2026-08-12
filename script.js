/* =========================================================
   Mindhive — landing page behaviour
   No dependencies. Everything degrades gracefully without JS:
   Bahasa Malaysia renders by default, all content is visible,
   and the nav stays open on mobile (see html:not(.js) in CSS).
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---------------------------------------------------------
     1. Language switch (ms default / en)
     Visibility is handled entirely in CSS off <html lang>.
     JS only flips the attribute and syncs the metadata that
     CSS can't reach: <title>, meta description, og:locale.
     --------------------------------------------------------- */
  var META = {
    ms: {
      title: 'Mindhive — Pakar Data & Kecerdasan Buatan (AI)',
      desc: 'Mindhive ialah rakan strategik anda dalam transformasi digital — infrastruktur data, AI generatif dan latihan data & AI untuk perniagaan Malaysia.',
      locale: 'ms_MY',
      navLabel: 'Utama',
      menuLabel: 'Menu'
    },
    en: {
      title: 'Mindhive — Data & Artificial Intelligence (AI) Specialists',
      desc: 'Mindhive is your strategic partner in digital transformation — data infrastructure, generative AI and data & AI training for Malaysian businesses.',
      locale: 'en_MY',
      navLabel: 'Main',
      menuLabel: 'Menu'
    }
  };

  var langButtons = Array.prototype.slice.call(
    document.querySelectorAll('[data-setlang]')
  );
  var navEl = document.getElementById('navlinks');
  var metaDesc = document.querySelector('meta[name="description"]');
  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDesc = document.querySelector('meta[property="og:description"]');
  var ogLocale = document.querySelector('meta[property="og:locale"]');

  function setLang(lang, updateUrl) {
    if (lang !== 'en') lang = 'ms';
    var m = META[lang];

    root.setAttribute('lang', lang);
    document.title = m.title;
    if (metaDesc) metaDesc.setAttribute('content', m.desc);
    if (ogTitle) ogTitle.setAttribute('content', m.title);
    if (ogDesc) ogDesc.setAttribute('content', m.desc);
    if (ogLocale) ogLocale.setAttribute('content', m.locale);
    if (navEl) navEl.setAttribute('aria-label', m.navLabel);

    langButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setlang === lang));
    });

    /* Keep the URL shareable in the chosen language, without a reload
       and without adding a history entry per click. */
    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (lang === 'ms') url.searchParams.delete('lang');
      else url.searchParams.set('lang', 'en');
      window.history.replaceState(null, '', url);
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.setlang, true);
    });
  });

  /* Honour ?lang=en on load; also accept a browser default of English
     only when the visitor arrived without an explicit preference. */
  var requested = new URLSearchParams(window.location.search).get('lang');
  if (requested) {
    setLang(requested.toLowerCase().slice(0, 2) === 'en' ? 'en' : 'ms', false);
  }

  /* ---------------------------------------------------------
     2. Mobile nav
     --------------------------------------------------------- */
  var burger = document.getElementById('burger');

  function closeNav() {
    if (!burger || !navEl) return;
    navEl.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && navEl) {
    burger.addEventListener('click', function () {
      var open = navEl.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    /* Close after following an in-page link, and on Escape. */
    navEl.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', closeNav);
  }

  /* ---------------------------------------------------------
     3. Nav hairline once scrolled
     --------------------------------------------------------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     4. Scroll reveal — skipped entirely under reduced motion,
        and skipped if IntersectionObserver is unavailable, so
        content is never left hidden.
     --------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------------------------------------------------
     5. Copyright year (both language variants)
     --------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  ['yr', 'yr-en'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = year;
  });
})();
