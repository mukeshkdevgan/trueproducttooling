(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobilePanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobilePanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Dark / light theme toggle ---------- */
  var THEME_KEY = 'ttpe-theme';
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'light');
  }

  function getInitialTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* Follow system theme changes only if the user hasn't chosen manually */
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  /* ---------- Contact form -> mailto (no backend required) ---------- */
  var form = document.getElementById('quoteForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var subject = encodeURIComponent('Project Enquiry — ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:info@trueproducttooling.com?subject=' + subject + '&body=' + body;
      if (status) status.textContent = 'Opening your email client…';
    });
  }
})();
