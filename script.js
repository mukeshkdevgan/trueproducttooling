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
/* ---------- Industry project galleries ---------- */
(function () {
  // One entry per industry you want to enable. Add more keys later —
  // matching data-gallery="key" on the tile is all that's needed.
  var galleries = {
    automotive: {
      title: 'Automotive Components',
      images: [
        { src: 'assets/industries/automotive/a.jpeg', caption: 'Motorcycle Frame Welding Fixture' },
        { src: 'assets/industries/automotive/b.jpeg', caption: 'Sheet Metal Auto Part — Draw Tool' },
        { src: 'assets/industries/automotive/c.jpeg', caption: 'Welding Fixture — Sheet Metal Auto Part' },
        { src: 'assets/industries/automotive/d.jpeg', caption: 'Assembly/Sub-Assembly' },
        { src: 'assets/industries/automotive/e.jpeg', caption: 'Outline 3D Drawings' }
      ]
    },
    bicycles: {
      title: 'Bicycles & Parts',
      images: [
        { src: 'assets/industries/bicycles/a.jpeg', caption: 'Bicycle - Outline 3D Drawings' },
        { src: 'assets/industries/bicycles/b.jpeg', caption: 'Kid Bicycle Chain Cover' },
      ]
    },
    kids: {
      title: 'Kids Tricycles & Toys',
      images: [
        { src: 'assets/industries/kids/a.jpeg', caption: 'Kids Toy - Outline 3D Drawings' },
        { src: 'assets/industries/kids/b.jpeg', caption: 'Kids Toy - Assembly Fixture' },
        { src: 'assets/industries/kids/c.jpeg', caption: 'Kids Toy - Blowing Processss' },
        { src: 'assets/industries/kids/d.jpeg', caption: 'Kids Toy - Moulds' },
      ]
    },
    home_appliances: {
      title: 'Home Appliances Parts',
      images: [
        { src: 'assets/industries/home_appliances/a.jpeg', caption: 'Home Appliance - Mixer Grinder' },
        { src: 'assets/industries/home_appliances/b.jpeg', caption: 'Home Appliance - Table Fan' },
      ]
    },
    agriculture: {
      title: 'Farming Tools & Agriculture Equipments',
      images: [
        { src: 'assets/industries/agriculture/a.jpeg', caption: 'Outline 3D Drawings' },
        { src: 'assets/industries/agriculture/b.jpeg', caption: 'Rotary Tiller - Agricultural Equipment' },
      ]
    },
    hand_tools: {
      title: 'Hand Tools',
      images: [
        { src: 'assets/industries/hand_tools/a.jpeg', caption: 'Hand Tools - Outline 3D Drawings' },
        { src: 'assets/industries/hand_tools/b.jpeg', caption: 'Sheet Metal Jack (Car Jack)' },
      ]
    },
    industrial_spm: {
      title: 'Industrial SPM(Special Purpose Machines)',
      images: [
        { src: 'assets/industries/industrial_spm/a.jpeg', caption: 'Industrial SPM' },
        { src: 'assets/industries/industrial_spm/b.jpeg', caption: 'Industrial SPM - For Sheet Metal Component Manufacturing' },
      ]
    },
    manufacturing_automation: {
      title: 'Manufacturing Automation',
      images: [
        { src: 'assets/industries/manufacturing_automation/a.jpeg', caption: '3D Model & Station Overview' },
        { src: 'assets/industries/manufacturing_automation/b.jpeg', caption: 'Draw & Pierce Compound Tool' },
        { src: 'assets/industries/manufacturing_automation/c.jpeg', caption: 'Automated Welding System' },
        { src: 'assets/industries/manufacturing_automation/d.jpeg', caption: 'Automated Welding System - Components' },
        { src: 'assets/industries/manufacturing_automation/e.jpeg', caption: 'Automated Sheet Metal Manufacturing System' },
        { src: 'assets/industries/manufacturing_automation/f.jpeg', caption: 'Automated Sheet Metal Power Press - Components' },
      ]
    }
  };

  var overlay = document.getElementById('galleryOverlay');
  if (!overlay) return; // lightbox markup not on this page

  var imgEl = document.getElementById('galleryImage');
  var titleEl = document.getElementById('galleryTitle');
  var captionEl = document.getElementById('galleryCaption');
  var countEl = document.getElementById('galleryCount');
  var thumbsEl = document.getElementById('galleryThumbs');
  var closeBtn = document.getElementById('galleryClose');
  var prevBtn = document.getElementById('galleryPrev');
  var nextBtn = document.getElementById('galleryNext');

  var activeKey = null;
  var activeIndex = 0;

  function render() {
    var g = galleries[activeKey];
    var item = g.images[activeIndex];
    imgEl.src = item.src;
    imgEl.alt = item.caption;
    captionEl.textContent = item.caption;
    countEl.textContent = String(activeIndex + 1).padStart(2, '0') + ' / ' + String(g.images.length).padStart(2, '0');
    thumbsEl.querySelectorAll('.gallery-thumb').forEach(function (t, i) {
      t.classList.toggle('active', i === activeIndex);
    });
  }

  function buildThumbs() {
    var g = galleries[activeKey];
    thumbsEl.innerHTML = '';
    g.images.forEach(function (item, i) {
      var t = document.createElement('img');
      t.src = item.src;
      t.alt = item.caption;
      t.className = 'gallery-thumb';
      t.addEventListener('click', function () { activeIndex = i; render(); });
      thumbsEl.appendChild(t);
    });
  }

  function openGallery(key) {
    if (!galleries[key]) return;
    activeKey = key;
    activeIndex = 0;
    titleEl.textContent = galleries[key].title;
    buildThumbs();
    render();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function step(dir) {
    var g = galleries[activeKey];
    activeIndex = (activeIndex + dir + g.images.length) % g.images.length;
    render();
  }

  document.querySelectorAll('[data-gallery]').forEach(function (el) {
    el.addEventListener('click', function () { openGallery(el.getAttribute('data-gallery')); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGallery(el.getAttribute('data-gallery')); }
    });
  });

  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeGallery();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
