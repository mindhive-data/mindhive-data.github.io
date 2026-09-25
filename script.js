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
  /* alt text can't be toggled with CSS, so screenshots carry both
     languages as data attributes; the markup's alt is the BM default. */
  var altImgs = Array.prototype.slice.call(
    document.querySelectorAll('img[data-alt-ms][data-alt-en]')
  );

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
    altImgs.forEach(function (img) {
      img.setAttribute('alt', img.getAttribute('data-alt-' + lang));
    });

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
     5. Client carousel pause control
     The strip auto-scrolls, so WCAG 2.2.2 wants a way to stop it
     that doesn't depend on hovering. Under reduced motion the CSS
     already stops it and hides this button, so wire nothing up.
     --------------------------------------------------------- */
  var marquee = document.getElementById('marquee');
  var marqueeBtn = document.getElementById('marqueebtn');

  if (marquee && marqueeBtn && !reduced) {
    marqueeBtn.addEventListener('click', function () {
      var paused = marquee.classList.toggle('is-paused');
      marqueeBtn.classList.toggle('is-paused', paused);
    });
  }

  /* ---------------------------------------------------------
     6. Product carousel
     The track is a CSS scroll-snap strip, so swiping works on its
     own; this adds the tabs, arrows and dots and keeps them in step
     with wherever the track has scrolled. Slides that aren't showing
     are inert, so Tab never lands on a product that's off-screen.
     Links to a product (#onego, …) pick its slide.
     --------------------------------------------------------- */
  var pcar = document.getElementById('pcar');
  var track = document.getElementById('pcar-track');

  if (pcar && track) {
    var slides = Array.prototype.slice.call(track.children);
    var tabs = Array.prototype.slice.call(pcar.querySelectorAll('[role="tab"]'));
    var dots = Array.prototype.slice.call(pcar.querySelectorAll('.pcar__dots i'));
    var slideIndex = {};
    var current = -1;
    var target = null;   // the slide a tab/arrow scroll is gliding to

    pcar.setAttribute('role', 'region');
    pcar.setAttribute('aria-roledescription', 'carousel');
    slides.forEach(function (slide, i) {
      slideIndex[slide.id] = i;
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-roledescription', 'slide');
    });

    var select = function (i) {
      if (i === current) return;
      current = i;
      slides.forEach(function (slide, n) { slide.inert = n !== i; });
      tabs.forEach(function (tab, n) {
        tab.setAttribute('aria-selected', String(n === i));
        tab.tabIndex = n === i ? 0 : -1;
      });
      dots.forEach(function (dot, n) { dot.classList.toggle('is-on', n === i); });
    };

    var goTo = function (i, instant) {
      i = (i + slides.length) % slides.length;
      var left = slides[i].offsetLeft - slides[0].offsetLeft;
      select(i);
      target = Math.abs(track.scrollLeft - left) < 2 ? null : i;
      track.scrollTo({ left: left, behavior: instant || reduced ? 'auto' : 'smooth' });
    };

    var nearest = function () {
      var step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 1;
      return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step)));
    };

    /* Follow swipes. While a tab/arrow scroll glides past the slides
       in between, hold the selection on its destination instead. */
    var queued = false;
    track.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        var n = nearest();
        if (target !== null) {
          if (n === target) target = null;
          return;
        }
        select(n);
      });
    }, { passive: true });

    /* A hand on the track overrides any glide still in progress. */
    ['pointerdown', 'touchstart', 'wheel'].forEach(function (type) {
      track.addEventListener(type, function () { target = null; }, { passive: true });
    });

    tabs.forEach(function (tab, n) {
      tab.addEventListener('click', function () { goTo(n); });

      /* Arrow keys move between tabs, per the ARIA tabs pattern. */
      tab.addEventListener('keydown', function (e) {
        var to;
        if (e.key === 'ArrowRight') to = n + 1;
        else if (e.key === 'ArrowLeft') to = n - 1;
        else if (e.key === 'Home') to = 0;
        else if (e.key === 'End') to = tabs.length - 1;
        else return;
        e.preventDefault();
        to = (to + tabs.length) % tabs.length;
        goTo(to);
        tabs[to].focus();
      });
    });

    Array.prototype.slice.call(pcar.querySelectorAll('[data-step]')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(current + Number(btn.getAttribute('data-step')));
      });
    });

    /* The hero chips and footer links point at #onego etc. */
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      var n = link ? slideIndex[link.getAttribute('href').slice(1)] : undefined;
      if (n === undefined) return;
      e.preventDefault();
      goTo(n, true);
      pcar.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + slides[n].id);
      }
    });

    /* Keep the current slide aligned when the width changes. */
    window.addEventListener('resize', function () { goTo(current, true); });

    select(0);
    var fromHash = slideIndex[window.location.hash.slice(1)];
    if (fromHash) goTo(fromHash, true);
  }

  /* ---------------------------------------------------------
     7. Nav: underline the link for the section in view.
     The observed band is a thin strip across the middle of the
     viewport, so exactly one section holds it at a time.
     --------------------------------------------------------- */
  var navLinks = navEl
    ? Array.prototype.slice.call(navEl.querySelectorAll('a[href^="#"]'))
    : [];

  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('is-active', a === link); });
        } else {
          link.classList.remove('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------------------------------------------------------
     8. Copyright year (both language variants)
     --------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  ['yr', 'yr-en'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = year;
  });
})();
