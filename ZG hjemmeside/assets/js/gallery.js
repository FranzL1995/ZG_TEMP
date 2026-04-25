(function () {
  'use strict';

  var grid = document.getElementById('gallery-grid');
  if (!grid) return;

  fetch('content/previous-events.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      data.events.forEach(function (ev) {
        grid.appendChild(buildItem(ev));
      });
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:var(--muted);padding:3rem 2rem;">Could not load events.</p>';
    });

  function buildItem(ev) {
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = [
      '<img src="' + encodeURI(ev.image) + '" alt="' + esc(ev.title) + '" loading="lazy">',
      '<div class="gallery-overlay">',
        '<div class="gallery-overlay-title">' + esc(ev.title) + '</div>',
        ev.date && ev.date !== 'TBD'
          ? '<div class="gallery-overlay-date">' + esc(ev.date) + '</div>'
          : '',
      '</div>'
    ].join('');
    return item;
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
