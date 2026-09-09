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

/* Shared close helper — restores scroll on EVERY close path. */
function navAccordionClose() {
  var navLinksEl   = document.getElementById('navLinks');
  var hamburgerEl  = document.getElementById('hamburger');
  var dropdownItems = document.querySelectorAll('.nav-dropdown');

  if (navLinksEl)   navLinksEl.classList.remove('open');
  if (hamburgerEl)  hamburgerEl.classList.remove('open');
  dropdownItems.forEach(function (d) { d.classList.remove('expanded'); });
  document.body.style.overflow = '';  // always restore scroll
}

document.addEventListener('DOMContentLoaded', function () {
  var navLinksEl    = document.getElementById('navLinks');
  var hamburgerEl   = document.getElementById('hamburger');
  var dropdownItems = document.querySelectorAll('.nav-dropdown');

  // Accordion handling on mobile
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
          navAccordionClose();
        }
      });
    });
  }

  // Toggle scroll lock when hamburger opens/closes
  if (hamburgerEl && navLinksEl) {
    hamburgerEl.addEventListener('click', function () {
      var isNowOpen = navLinksEl.classList.contains('open');
      // classList.toggle('open') is handled by main.js; we only mirror the scroll lock
      document.body.style.overflow = isNowOpen ? 'hidden' : '';
    });
  }

  // Outside-click closes drawer AND restores scroll
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 1024) return;
    if (!navLinksEl) return;
    if (!navLinksEl.classList.contains('open')) return;

    var navbar = document.getElementById('navbar');
    if (navbar && navbar.contains(e.target)) return;  // click inside navbar — ignore

    navAccordionClose();
  });

  // Escape key closes drawer AND restores scroll
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinksEl && navLinksEl.classList.contains('open')) {
      navAccordionClose();
      // Return focus to hamburger
      if (hamburgerEl) hamburgerEl.focus();
    }
  });

  // Viewport resize: if widening past breakpoint, clean up mobile state
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      navAccordionClose();
    }
  });
});
