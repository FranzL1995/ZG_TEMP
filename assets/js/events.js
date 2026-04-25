(function () {
  'use strict';

  var container = document.getElementById('events-container');
  if (!container) return;

  fetch('content/events.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var events = data.events;
      if (!events || events.length === 0) {
        container.innerHTML = '<p class="events-empty">No upcoming events.</p>';
        return;
      }
      var grid = document.createElement('div');
      grid.className = 'events-grid';
      events.slice(0, 3).forEach(function (ev, i) {
        grid.appendChild(buildCard(ev, i));
      });
      container.appendChild(grid);
    })
    .catch(function () {
      container.innerHTML = '<p class="events-empty">Could not load events.</p>';
    });

  function buildCard(ev, i) {
    var isPlaceholder = !ev.poster || ev.poster.indexOf('logo.') !== -1;
    var article = document.createElement('article');
    article.className = 'event-card';
    article.innerHTML = [
      '<h2 class="event-title">' + esc(ev.title) + '</h2>',
      '<p class="event-meta">',
        esc(ev.date),
        ev.location ? ' - ' + esc(ev.location) : '',
      '</p>',
      '<div class="event-poster-wrapper">',
        '<img src="' + esc(ev.poster || 'assets/images/logo.svg') + '"',
             ' alt="' + esc(ev.title) + ' poster"',
             isPlaceholder ? ' class="is-placeholder"' : '',
             ' loading="lazy">',
        '<div class="event-poster-fade">',
          '<button class="read-more-btn" aria-expanded="false" data-target="details-' + i + '">',
            '<span class="btn-label">Read more</span>',
            '<span class="arrow" aria-hidden="true">&#8595;</span>',
          '</button>',
        '</div>',
      '</div>',
      '<div class="event-details" id="details-' + i + '" aria-hidden="true">',
        '<div class="event-details-inner">',
          ev.details ? '<p>' + esc(ev.details) + '</p>' : '',
          ev.ticketUrl ? '<a href="' + esc(ev.ticketUrl) + '" target="_blank" rel="noopener">Tickets &rarr;</a>' : '',
        '</div>',
      '</div>'
    ].join('');
    return article;
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
