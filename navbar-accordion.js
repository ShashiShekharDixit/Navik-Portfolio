/* ══════════════════════════════════════════════════════════════
   navik — navbar-accordion.js
   Mobile nav-dropdown accordion + drawer close behavior.
   This is the same logic index.html already has inlined in its
   own <script id="navik-core-enhancements-js">. It is pulled out
   here as a shared file so every other page gets the identical
   mobile "Products / Industries / Resources / Company" accordion
   behavior in the hamburger drawer, without touching index.html
   or main.js (which already handles the hamburger open/close).
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  var navLinksEl = document.getElementById('navLinks');
  var hamburgerEl = document.getElementById('hamburger');

  // Accordion handling on mobile
  var dropdownItems = document.querySelectorAll('.nav-dropdown');
  dropdownItems.forEach(function (item) {
    var trigger = item.querySelector('.nav-link-main');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          e.stopPropagation();
          var isCurrentlyExpanded = item.classList.contains('expanded');
          dropdownItems.forEach(function (d) {
            if (d !== item) d.classList.remove('expanded');
          });
          item.classList.toggle('expanded', !isCurrentlyExpanded);
        }
      });
    }
  });

  // Close menu when clicking a link inside the drawer
  if (navLinksEl) {
    navLinksEl.querySelectorAll('a:not(.nav-link-main)').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 1024) {
          navLinksEl.classList.remove('open');
          if (hamburgerEl) hamburgerEl.classList.remove('open');
          dropdownItems.forEach(function (d) { d.classList.remove('expanded'); });
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Lock body scroll while the mobile drawer is open
  if (hamburgerEl && navLinksEl) {
    hamburgerEl.addEventListener('click', function () {
      var isOpen = navLinksEl.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
});
