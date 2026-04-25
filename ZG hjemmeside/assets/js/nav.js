(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  nav.appendChild(indicator);

  var links = nav.querySelectorAll('a');
  var activeLink = null;

  // Detect current page and mark active link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      activeLink = link;
    }
  });

  function move(el) {
    var navRect = nav.getBoundingClientRect();
    var rect = el.getBoundingClientRect();
    indicator.style.left  = (rect.left - navRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
    indicator.style.opacity = '1';
  }

  // Place indicator on active link after fonts load so widths are accurate
  if (activeLink) {
    document.fonts.ready.then(function () {
      indicator.style.transition = 'none';
      move(activeLink);
      requestAnimationFrame(function () { indicator.style.transition = ''; });
    });
  }

  links.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      move(this);
    });
  });

  // On mouse leave: slide back to active link, or fade out if no active link
  nav.addEventListener('mouseleave', function () {
    if (activeLink) {
      move(activeLink);
    } else {
      indicator.style.opacity = '0';
    }
  });
})();
