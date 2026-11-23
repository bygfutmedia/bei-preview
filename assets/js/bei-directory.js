/* =========================================================================
   BEI dynamic directory renderer
   Data source: JSON file (static) or WordPress REST endpoint (via plugin).
   Only requires this script + the design-system CSS — no directory plugin.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.querySelector('[data-bei-directory]');
  if (!root) return;

  var source = root.getAttribute('data-source') || 'data/businesses.json';
  var perPage = parseInt(root.getAttribute('data-per-page'), 10) || 12;
  var results = root.querySelector('[data-dir-results]');
  var countEl = root.querySelector('[data-dir-count]');
  var search = root.querySelector('[data-dir-search]');
  var locationSel = root.querySelector('[data-dir-location]');
  var categorySel = root.querySelector('[data-dir-category]');
  var searchBtn = root.querySelector('[data-dir-submit]');
  var resetBtn = root.querySelector('[data-dir-reset]');
  var viewButtons = root.querySelectorAll('[data-dir-view]');

  var businesses = [];
  var page = 1;
  var searched = false;
  var view = 'list';

  function text(tag, cls, value) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = value || '';
    return el;
  }

  function card(b, index) {
    var href = b.slug ? 'directory.html' : 'directory.html';
    var link = document.createElement('a');
    link.className = 'bizrow';
    link.href = href;

    var num = text('span', 'bizrow__num', String(index + 1).padStart(2, '0'));

    var imgWrap = document.createElement('span');
    imgWrap.className = 'img-treat bizrow__img';
    var img = document.createElement('img');
    img.src = b.image || 'assets/img/bei-logo.webp';
    img.alt = b.name;
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    var body = document.createElement('span');
    body.appendChild(text('span', 'bizrow__name', b.name));
    var info = document.createElement('span');
    info.className = 'bizrow__info';
    [b.address, b.phone, b.email].forEach(function (value) {
      if (value) info.appendChild(text('span', '', value));
    });
    body.appendChild(info);
    var tags = document.createElement('span');
    tags.className = 'bizrow__tags';
    (b.categories || []).forEach(function (c) {
      tags.appendChild(text('span', 'tag', c));
    });
    body.appendChild(tags);
    body.appendChild(text('span', 'bizrow__info', b.description || ''));

    var arrow = text('span', 'bizrow__arrow', '\u2192');
    link.appendChild(num);
    link.appendChild(imgWrap);
    link.appendChild(body);
    link.appendChild(arrow);
    return link;
  }

  function render() {
    results.innerHTML = '';
    if (!searched) {
      results.appendChild(text('p', 'meta meta--muted', 'Enter a search term or choose filters to find Black owned businesses.'));
      if (countEl) countEl.textContent = '';
      return;
    }
    var q = (search && search.value || '').trim().toLowerCase();
    var loc = locationSel ? locationSel.value : '';
    var cat = categorySel ? categorySel.value : '';

    var found = businesses.filter(function (b) {
      var hay = [b.name, b.address, b.description, (b.categories || []).join(' ')].join(' ').toLowerCase();
      if (q && hay.indexOf(q) === -1) return false;
      if (loc && b.location !== loc) return false;
      if (cat && (b.categories || []).indexOf(cat) === -1) return false;
      return true;
    });

    if (countEl) countEl.textContent = found.length + (found.length === 1 ? ' business found' : ' businesses found');

    if (!found.length) {
      results.appendChild(text('p', 'dir-empty', 'No businesses match those filters. Try another search.'));
      results.querySelector('.dir-empty').style.display = 'block';
      return;
    }

    var start = (page - 1) * perPage;
    var slice = found.slice(start, start + perPage);
    var wrap = document.createElement('div');
    wrap.className = view === 'grid' ? 'dir-results-grid' : 'dir-results-list';
    slice.forEach(function (b, i) { wrap.appendChild(card(b, start + i)); });
    results.appendChild(wrap);

    if (found.length > perPage) {
      var pages = Math.ceil(found.length / perPage);
      var nav = document.createElement('nav');
      nav.className = 'dir-pagination';
      nav.setAttribute('aria-label', 'Directory pages');
      for (var p = 1; p <= pages; p++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = String(p);
        btn.setAttribute('aria-label', 'Page ' + p);
        if (p === page) btn.className = 'is-active';
        btn.addEventListener('click', function (n) {
          return function () { page = n; render(); };
        }(p));
        nav.appendChild(btn);
      }
      results.appendChild(nav);
    }
  }

  function apply() { page = 1; searched = true; render(); }

  if (searchBtn) searchBtn.addEventListener('click', apply);
  if (search) search.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
  [locationSel, categorySel].forEach(function (sel) {
    if (sel) sel.addEventListener('change', apply);
  });
  if (resetBtn) resetBtn.addEventListener('click', function () {
    if (search) search.value = '';
    if (locationSel) locationSel.value = '';
    if (categorySel) categorySel.value = '';
    searched = false;
    page = 1;
    render();
  });
  viewButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      view = btn.getAttribute('data-dir-view');
      viewButtons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      root.classList.toggle('dir--grid', view === 'grid');
      render();
    });
  });

  fetch(source)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      businesses = Array.isArray(data) ? data : (data.businesses || []);
      render();
    })
    .catch(function () {
      results.appendChild(text('p', 'dir-empty', 'Directory data could not be loaded.'));
    });
})();
