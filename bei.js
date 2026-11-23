/* =========================================================================
   BEI — interaction layer
   Masthead shell · hover previews · editorial reveals · grain · filters
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SRC = 'https://www.black-entrepreneurs-international.com/wp-content/uploads/';
  var IMG = {
    event: SRC + '2025/06/BEI-October-2024-Event-Admin-Member-Caroline-and-Nicola.jpg',
    exhibit: SRC + '2025/06/Dalgety-Teas-Oct-2024-Exhibit.jpg',
    showroom: SRC + '2025/06/Lee-MArsh-MEShowroom.jpg',
    grocery: SRC + '2025/06/Grocery-Shop.webp',
    bbbs: SRC + '2025/06/BEI-BBBS-Event.jpg',
    catalogue: SRC + '2026/02/TC-BEI-ORANGE.webp',
    freight: SRC + '2025/06/Aerona-Freight-truck-loaded-with-items.jpg',
    bakery: SRC + '2025/06/100.p-William-Herman-Ltd-Sunrise-Bakery.jpg'
  };

  var NAV = [
    { label: 'Home', href: 'index.html', key: 'home', img: IMG.event, meta: 'The directory' },
    { label: 'About BEI', href: 'about.html', key: 'about', img: IMG.exhibit, meta: 'Who we are' },
    { label: 'Membership', href: 'membership.html', key: 'membership', img: IMG.showroom, meta: 'Join the collective' },
    { label: 'Business Directory', href: 'all-businesses.html', key: 'directory', img: IMG.grocery, meta: 'Find a business' },
    { label: 'Events', href: 'events.html', key: 'events', img: IMG.bbbs, meta: 'Meet in person' },
    { label: 'Trade Catalogue', href: 'trade-catalogue.html', key: 'catalogue', img: IMG.catalogue, meta: 'BEI Amplifier' },
    { label: 'Contact', href: 'contact.html', key: 'contact', img: IMG.freight, meta: 'Get in touch' }
  ];

  var page = document.body.getAttribute('data-page') || '';
  if (!page) {
    var cls = (document.body.className || '').match(/bei-page-([^\s]+)/);
    var slug = cls ? cls[1] : '';
    var pageMap = { 'all-businesses': 'directory', 'search-businesses': 'directory', 'single-category': 'directory', 'all-categories': 'directory', 'all-locations': 'directory', 'single-location': 'directory', 'directory': 'directory', 'sign-in': 'auth', 'trade-catalogue': 'catalogue', 'catalogue-edition': 'catalogue', 'faqs': 'faqs', 'blog': 'blog' };
    page = pageMap[slug] || slug;
  }

  /* ---------- Masthead + footer shells ---------------------------------- */
  function navLinks(child) {
    return NAV.map(function (n) {
      var current = n.key === page ? ' is-current' : '';
      var link = '<a class="nav__link' + current + '" href="' + n.href + '" data-preview="' + n.img + '" data-meta="' + n.meta + '">' + n.label + '</a>';
      if (n.key === 'directory') {
        return '<div class="nav__item">' + link + '<span class="nav__caret">&#9662;</span>' +
          '<div class="nav__dropdown"><a href="search-businesses.html">Search Businesses</a></div></div>';
      }
      return '<div class="nav__item">' + link + '</div>';
    }).join('');
  }

  function buildHeader() {
    var host = document.getElementById('bei-header');
    if (!host) return;
    host.innerHTML =
      '<a class="skip-link" href="#content">Skip to content</a>' +
      '<header class="masthead" id="masthead">' +
        '<a class="brand" href="index.html" aria-label="Black Entrepreneurs International — home">' +
          '<img class="brand__logo" src="assets/img/bei-logo-bk-bg.webp" alt="Black Entrepreneurs International logo">' +
          '<span class="brand__full">Black Entrepreneurs<br>International</span>' +
        '</a>' +
        '<nav class="nav" id="nav" aria-label="Primary">' + navLinks() + '</nav>' +
        '<div class="masthead__end">' +
          '<div class="login-wrap">' +
            '<a class="login-icon" href="sign-in.html" aria-label="Login or register">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>' +
            '</a>' +
            '<div class="login-dropdown">' +
              '<a href="sign-in.html#pane-login">Login</a>' +
              '<a href="sign-in.html#pane-register">Register</a>' +
            '</div>' +
          '</div>' +
          '<a class="cta-inline" href="membership.html">Get Started <span>&rarr;</span></a>' +
          '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</header>' +
      '<div class="drawer" id="drawer" aria-hidden="true">' +
        NAV.map(function (n, i) {
          var main = '<a class="drawer__link" href="' + n.href + '"><i>0' + (i + 1) + '</i>' + n.label + '</a>';
          if (n.key === 'directory') {
            main += '<a class="drawer__link drawer__link--child" href="search-businesses.html">Search Businesses</a>';
          }
          return main;
        }).join('') +
        '<a class="drawer__link" href="sign-in.html"><i>08</i>Login / Register</a>' +
        '<div class="drawer__foot">Black Entrepreneurs International &nbsp;·&nbsp; Building Black Owned Businesses</div>' +
      '</div>';
  }

  function buildFooter() {
    var host = document.getElementById('bei-footer');
    if (!host) return;
    var year = new Date().getFullYear();
    host.innerHTML =
      '<footer class="footer">' +
        '<div class="footer__aurora" aria-hidden="true"></div>' +
        '<div class="footer__gridlines" aria-hidden="true"></div>' +
        '<div class="footer__marquee" aria-hidden="true"><div class="footer__marquee-track">' +
          '<span>Black owned business <b>&#10022;</b> Global network <b>&#10022;</b> Business connections <b>&#10022;</b> Trade catalogue <b>&#10022;</b> Community empowerment <b>&#10022;</b></span>' +
          '<span>Black owned business <b>&#10022;</b> Global network <b>&#10022;</b> Business connections <b>&#10022;</b> Trade catalogue <b>&#10022;</b> Community empowerment <b>&#10022;</b></span>' +
        '</div></div>' +
        '<div class="footer__lead">' +
          '<div>' +
            '<span class="meta">BEI — The collective</span>' +
            '<p class="footer__statement">Join a network that turns<br class="desktop-break"><span class="nowrap"><em>connection</em> into commerce.</span></p>' +
          '</div>' +
          '<div class="footer__contact">' +
            '<div>letstalk@black-entrepreneurs-international.com</div>' +
            '<div>C K R House, 70 East Hill, Dartford, England, DA1 1RZ</div>' +
            '<div><span class="ph">[PHONE]</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="footer__grid">' +
          '<div class="footer__col">' +
            '<h4>Navigate</h4><ul>' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="about.html">About BEI</a></li>' +
            '<li><a href="membership.html">Membership</a></li>' +
            '<li><a href="all-businesses.html">Business Directory</a></li>' +
            '<li><a href="events.html">Events</a></li>' +
            '<li><a href="trade-catalogue.html">Trade Catalogue</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>The platform</h4><ul>' +
            '<li><a href="search-businesses.html">Search Businesses</a></li>' +
            '<li><a href="sign-in.html">Login / Register</a></li>' +
            '<li><a href="faqs.html">FAQs</a></li>' +
            '<li><a href="add-business.html">Add your business</a></li>' +
            '<li><a href="blog.html">Journal</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>Follow</h4>' +
            '<div class="footer__social">' +
              '<a href="https://www.facebook.com/blackentrepreneursinternational/" target="_blank" rel="noopener">Facebook</a>' +
              '<a href="https://www.instagram.com/blackentrepreneursintlbei/?hl=en-gb" target="_blank" rel="noopener">Instagram</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>Legal</h4><ul>' +
            '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
            '<li><a href="terms-and-conditions.html">Terms and Conditions</a></li>' +
            '<li><a href="disclaimer.html">Disclaimer</a></li>' +
            '</ul>' +
            '<p style="font-size:.74rem;line-height:1.7;color:var(--muted);margin-top:18px">By joining the BEI Business Directory, you gain global exposure, forge valuable connections, and unlock sustainable growth opportunities.</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer__word-wrap" aria-hidden="true"><div class="footer__word-track">' +
          '<span class="footer__word">BLACK ENTREPRENEURS INTERNATIONAL</span>' +
          '<span class="footer__word">BLACK ENTREPRENEURS INTERNATIONAL</span>' +
        '</div></div>' +
        '<div class="footer__bottom">' +
          '<span>&copy; ' + year + ' Black Entrepreneurs International (BEI) — All Rights Reserved.</span>' +
          '<span>Made with <span aria-hidden="true">&#10084;</span> by <a href="https://www.bygfutsocialmedia.com/website-design/" target="_blank" rel="noopener">Bygfut Media Limited</a></span>' +
          '<button class="footer__totop" type="button" data-totop aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg></button>' +
        '</div>' +
      '</footer>';
  }

  buildHeader();
  buildFooter();

  /* ---------- Masthead contrast against light sections ------------------ */
  var masthead = document.getElementById('masthead');
  var lightSections = document.querySelectorAll('[data-nav="light"]');
  if (masthead && 'IntersectionObserver' in window) {
    var navTop = 90;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) masthead.classList.add('is-light');
        else masthead.classList.remove('is-light');
      });
    }, { rootMargin: '-' + navTop + 'px 0px -85% 0px', threshold: 0 });
    lightSections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Mobile drawer --------------------------------------------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = !drawer.classList.contains('is-open');
      drawer.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        drawer.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Editorial reveals ----------------------------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          rio.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
    reveals.forEach(function (el) { rio.observe(el); });
    /* Safety net: reveal anything already in view if IntersectionObserver
       misses a clipped/masked element on first paint. */
    setTimeout(function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * .96 && r.bottom > 0) el.classList.add('is-in');
      });
    }, 900);
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Grain + restrained parallax on scroll --------------------- */
  var ticking = false;
  function onScroll() {
    var yNow = window.pageYOffset || root.scrollTop;
    var totopBtn = document.querySelector('[data-totop]');
    if (totopBtn) totopBtn.classList.toggle('is-visible', yNow > 240);
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || root.scrollTop;
      root.style.setProperty('--gx', ((y * .012) % 60) + 'px');
      root.style.setProperty('--gy', ((y * -.008) % 60) + 'px');
      if (!reduce) {
        document.querySelectorAll('[data-parallax]').forEach(function (el) {
          var rate = parseFloat(el.getAttribute('data-parallax')) || .06;
          var rect = el.getBoundingClientRect();
          var shift = (rect.top + rect.height / 2 - window.innerHeight / 2) * -rate;
          el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
        });
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Directory: filters, search, views -------------------------- */
  var dir = document.querySelector('[data-directory]');
  if (dir) {
    var rows = Array.prototype.slice.call(dir.querySelectorAll('.bizrow'));
    var cards = Array.prototype.slice.call(dir.querySelectorAll('.bizgrid__card'));
    var items = rows.map(function (row, i) { return { row: row, card: cards[i] }; });
    var count = dir.querySelector('[data-count]');
    var empty = dir.querySelector('.dir-empty');
    var search = dir.querySelector('[data-search]');
    var selects = Array.prototype.slice.call(dir.querySelectorAll('[data-filter]'));

    function applyFilters() {
      var q = (search ? search.value : '').trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var hay = (item.row.getAttribute('data-search-text') || item.row.textContent).toLowerCase();
        var ok = !q || hay.indexOf(q) !== -1;
        selects.forEach(function (sel) {
          var val = sel.value;
          if (val && item.row.getAttribute('data-' + sel.getAttribute('data-filter')) !== val) ok = false;
        });
        item.row.style.display = ok ? '' : 'none';
        if (item.card) item.card.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (count) count.textContent = shown + ' businesses found';
      if (empty) empty.style.display = shown ? 'none' : 'block';
    }
    if (search) search.addEventListener('input', applyFilters);
    selects.forEach(function (s) { s.addEventListener('change', applyFilters); });
    dir.querySelectorAll('.viewtoggle button').forEach(function (b) {
      b.addEventListener('click', function () {
        dir.querySelectorAll('.viewtoggle button').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        dir.classList.toggle('dir--grid', b.getAttribute('data-view') === 'grid');
      });
    });
    var reset = dir.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', function () {
      if (search) search.value = '';
      selects.forEach(function (s) { s.value = ''; });
      applyFilters();
    });
    applyFilters();
  }

  /* ---------- Membership billing toggle (pricing concept) --------------- */
  document.querySelectorAll('.pricing__switch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var annual = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(annual));
      document.querySelectorAll('.plan-card').forEach(function (card) {
        var monthly = card.querySelector('.plan-card__price');
        var yearly = card.querySelector('.plan-card__price-alt');
        if (!monthly || !yearly) return;
        monthly.style.display = annual ? 'none' : 'block';
        yearly.style.display = annual ? 'block' : 'none';
      });
      document.querySelectorAll('[data-billing-label]').forEach(function (l) {
        l.textContent = annual ? 'Annually' : 'Monthly';
      });
    });
  });

  /* ---------- Back to top ------------------------------------------------ */
  document.querySelectorAll('[data-totop]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Auth login / register / recover tabs ---------------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    group.querySelectorAll('button[data-pane]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('button[data-pane]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var pane = document.getElementById(btn.getAttribute('data-pane'));
        document.querySelectorAll('[data-tabs]').forEach(function (other) {
          other.closest('.auth__panel').querySelectorAll('.auth__pane').forEach(function (p) { p.classList.remove('is-active'); });
          other.closest('.auth__panel').querySelectorAll('button[data-pane]').forEach(function (b) { b.classList.remove('is-active'); });
        });
        if (pane) pane.classList.add('is-active');
      });
    });
  });

  document.querySelectorAll('[data-pane-jump]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.getAttribute('data-pane-jump');
      var panel = link.closest('.auth__panel');
      if (!panel) return;
      panel.querySelectorAll('.auth__pane').forEach(function (p) { p.classList.remove('is-active'); });
      panel.querySelectorAll('.auth__tabs button').forEach(function (b) { b.classList.remove('is-active'); });
      var pane = document.getElementById(id);
      var tab = panel.querySelector('[data-pane="' + id + '"]');
      if (pane) pane.classList.add('is-active');
      if (tab) tab.classList.add('is-active');
    });
  });

  /* ---------- FAQ: one panel open at a time within a group -------------- */
  document.querySelectorAll('.faq').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      var parent = d.closest('.faq-group') || document;
      parent.querySelectorAll('.faq[open]').forEach(function (other) {
        if (other !== d) other.open = false;
      });
    });
  });

  /* ---------- Profile-card testimonial carousel -------------------------- */
  document.querySelectorAll('[data-testimonial-carousel]').forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-dot]'));
    var current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle('is-active', active);
        slide.hidden = !active;
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { show(current - 1); });
    if (next) next.addEventListener('click', function () { show(current + 1); });
    dots.forEach(function (dot, i) { dot.addEventListener('click', function () { show(i); }); });
    show(0);
  });

  /* ---------- Stats: zoom in, then count up ------------------------------ */
  document.querySelectorAll('.stats').forEach(function (stats) {
    var nums = stats.querySelectorAll('[data-stat]');
    if (!nums.length) return;
    var done = false;
    function run() {
      if (done) return;
      done = true;
      stats.classList.add('is-counted');
      if (reduce) return;
      nums.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-stat'), 10) || 0;
        var suffix = el.getAttribute('data-stat-suffix') || '';
        var start = null;
        var duration = 1400;
        function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
    stats._beiRun = run;
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(); sio.disconnect(); }
        });
      }, { threshold: .25 });
      sio.observe(stats);
    } else {
      run();
    }
  });

  /* Scroll fallback so the stats animation fires even when IO is throttled. */
  function checkStats() {
    document.querySelectorAll('.stats').forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (!s.classList.contains('is-counted') && r.top < window.innerHeight * .85 && r.bottom > 0) {
        if (s._beiRun) s._beiRun();
      }
    });
  }
  window.addEventListener('scroll', checkStats, { passive: true });
  checkStats();

  /* ---------- Stats glow follows the cursor ----------------------------- */
  document.querySelectorAll('.stats').forEach(function (stats) {
    stats.addEventListener('mousemove', function (e) {
      var r = stats.getBoundingClientRect();
      stats.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      stats.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    });
    stats.addEventListener('mouseleave', function () {
      stats.style.setProperty('--mx', '50%');
      stats.style.setProperty('--my', '50%');
    });
  });

  /* ---------- Embedded catalogue edition -------------------------------- */
  var params = new URLSearchParams(window.location.search);
  var editionKey = params.get('edition');
  var embedFrame = document.getElementById('catalogueEmbed');
  var embedMap = {
    'march-2026': 'https://publuu.com/flip-book/1021799/2404331/page/1?embed'
  };
  if (embedFrame && editionKey && !embedMap[editionKey]) {
    embedFrame.style.display = 'none';
    var note = document.querySelector('[data-embed-note]');
    if (note) note.textContent = '[EMBED URL] — add the embedded publication for this edition.';
  }

  /* ---------- Dynamic catalogue edition label ---------------------------- */
  /* The latest published issue is the previous calendar month. It rolls
     over automatically on the 1st of each new month. */
  document.querySelectorAll('[data-catalogue-edition]').forEach(function (el) {
    var d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    var month = d.toLocaleString('en-GB', { month: 'long' });
    el.textContent = month + ' ' + d.getFullYear();
  });

  /* ---------- Sign-in pane from URL hash --------------------------------- */
  if (location.hash.indexOf('#pane-') === 0) {
    var hashPane = document.getElementById(location.hash.slice(1));
    var hashTab = document.querySelector('[data-pane="' + location.hash.slice(1) + '"]');
    var hashPanel = hashTab && hashTab.closest('.auth__panel');
    if (hashPane && hashPanel) {
      hashPanel.querySelectorAll('.auth__pane').forEach(function (p) { p.classList.remove('is-active'); });
      hashPanel.querySelectorAll('.auth__tabs button').forEach(function (b) { b.classList.remove('is-active'); });
      hashPane.classList.add('is-active');
      hashTab.classList.add('is-active');
    }
  }

  /* ---------- Query-driven archive headings ------------------------------ */
  document.querySelectorAll('[data-query-title]').forEach(function (el) {
    var key = el.getAttribute('data-query-title');
    var val = params.get(key);
    if (val) {
      el.textContent = val.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }
  });
  document.querySelectorAll('[data-query-text]').forEach(function (el) {
    var val = params.get(el.getAttribute('data-query-text'));
    if (val) el.textContent = val;
  });

  /* ---------- Category search results: found vs empty states ------------ */
  var categoryRoot = document.querySelector('[data-category-results]');
  if (categoryRoot) {
    var categoryKey = params.get('category') || '';
    var categoriesWithResults = ['entertainment', 'food-and-dining', 'education', 'legal-financial', 'business-services', 'consulting', 'retail'];
    var hasResults = categoriesWithResults.indexOf(categoryKey) !== -1;
    var grid = categoryRoot.querySelector('.bizgrid');
    var count = categoryRoot.querySelector('[data-count]');
    var emptyState = categoryRoot.querySelector('[data-empty-state]');
    var secondary = categoryRoot.querySelector('.results-secondary');
    if (grid) grid.style.display = hasResults ? 'grid' : 'none';
    if (count) count.style.display = hasResults ? 'block' : 'none';
    if (emptyState) emptyState.classList.toggle('is-visible', !hasResults);
    if (secondary) secondary.classList.toggle('is-visible', hasResults);
  }

  /* ---------- Auth-aware CTA + back links -------------------------------- */
  document.querySelectorAll('[data-auth-cta]').forEach(function (link) {
    link.href = window.localStorage.getItem('bei_signed_in') === 'true' ? 'dashboard.html' : 'membership.html';
  });
  document.querySelectorAll('[data-back]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.history.length > 1) window.history.back();
      else window.location.href = 'all-businesses.html';
    });
  });

  /* ---------- Honest form handling (no fake submissions) ---------------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('[data-form-msg]');
      if (msg) {
        msg.textContent = 'This is a design prototype. Connect this form to your CRM or email service before going live.';
        msg.style.display = 'block';
      }
    });
  });
})();
