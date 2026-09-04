/* ============================================================
   industry-animations.js — Shared animation engine for all
   Navik industry pages (Logistics, Retail, Construction,
   Sales, Manufacturing, Health Care)
   Theme: #1d4ed8 | #60a5fa | #ffffff
   ============================================================ */

(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. SCROLL PROGRESS BAR ── */
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── 2. NAVBAR SHRINK ON SCROLL ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── 3. LOGO ROTATION ── */
  (function () {
    let idx = 0;
    const spans = document.querySelectorAll('.nav-logo-animated');
    if (!spans.length) return;
    function rotate() {
      spans.forEach(s => s.classList.remove('active'));
      spans[idx].classList.add('active');
      idx = (idx + 1) % spans.length;
    }
    rotate();
    setInterval(rotate, 3000);
  })();

  /* ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  if (REDUCED) return; /* respect user preference */

  /* ── 6. SCROLL-REVEAL (fade-up) for [data-anim] elements ── */
  function makeObserver(cb, opts) {
    return new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) cb(e); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...opts });
  }

  document.querySelectorAll('[data-anim]').forEach(el => {
    const delay = parseInt(el.dataset.animDelay || 0);
    const type  = el.dataset.anim;

    el.style.opacity = '0';
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    if (type === 'fade-up')   el.style.transform = 'translateY(36px)';
    if (type === 'fade-left') el.style.transform = 'translateX(40px)';
    if (type === 'fade-right')el.style.transform = 'translateX(-40px)';
    if (type === 'zoom-in')   { el.style.transform = 'scale(0.88)'; }

    const obs = makeObserver(entry => {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'none';
      setTimeout(() => { entry.target.style.willChange = 'auto'; }, 800);
      obs.unobserve(entry.target);
    });
    obs.observe(el);
  });

  /* ── 7. STAGGER GRID CHILDREN ── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const kids = Array.from(parent.children);
    const base = parseInt(parent.dataset.stagger || 80);
    kids.forEach((k, i) => {
      k.style.opacity   = '0';
      k.style.transform = 'translateY(28px)';
      k.style.transition = `opacity 0.55s ease ${i * base}ms, transform 0.55s ease ${i * base}ms`;
      k.style.willChange = 'opacity, transform';
    });
    const obs = makeObserver(entry => {
      kids.forEach(k => { k.style.opacity = '1'; k.style.transform = 'none'; });
      obs.unobserve(entry.target);
    });
    obs.observe(parent);
  });

  /* ── 8. SCROLL-SCALE (section zoom when entering viewport) ── */
  document.querySelectorAll('[data-scale-in]').forEach(el => {
    el.style.transform = 'scale(0.92)';
    el.style.opacity   = '0';
    el.style.transition = 'transform 0.8s cubic-bezier(.34,1.2,.64,1), opacity 0.7s ease';
    const obs = makeObserver(entry => {
      entry.target.style.transform = 'scale(1)';
      entry.target.style.opacity   = '1';
      obs.unobserve(entry.target);
    }, { threshold: 0.08 });
    obs.observe(el);
  });

  /* ── 9. COUNTER ANIMATION ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isFloat = el.dataset.float === '1';
    const dur = 1800;
    const obs = makeObserver(entry => {
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = isFloat ? (ease * target).toFixed(1) : Math.floor(ease * target).toLocaleString('en-IN');
        entry.target.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else entry.target.textContent = (isFloat ? target.toFixed(1) : target.toLocaleString('en-IN')) + suffix;
      };
      requestAnimationFrame(tick);
      obs.unobserve(entry.target);
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── 10. PARALLAX HERO ORBS on mousemove ── */
  const orb1 = document.querySelector('.ind-orb-1');
  const orb2 = document.querySelector('.ind-orb-2');
  if (orb1 || orb2) {
    document.addEventListener('mousemove', e => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 24;
      const dy = (e.clientY / window.innerHeight - 0.5) * 18;
      if (orb1) orb1.style.transform = `translate(${dx * 1.2}px, ${dy * 1.2}px)`;
      if (orb2) orb2.style.transform = `translate(${-dx * 0.8}px, ${-dy * 0.8}px)`;
    }, { passive: true });
  }

  /* ── 11. INFINITE HORIZONTAL MARQUEE (auto-duplicates content) ── */
  document.querySelectorAll('.ind-marquee-track').forEach(track => {
    if (track.dataset.marqueeDone) return;
    track.dataset.marqueeDone = '1';
    const clone = track.innerHTML;
    track.innerHTML += clone; /* duplicate for seamless loop */
  });

  /* ── 12. SCROLL-TRIGGERED HORIZONTAL SLIDE for feature rows ── */
  document.querySelectorAll('.ind-split-row').forEach((row, i) => {
    const left  = row.querySelector('.ind-split-left');
    const right = row.querySelector('.ind-split-right');
    if (!left || !right) return;
    const isEven = i % 2 === 0;
    left.style.cssText  += `opacity:0;transform:translateX(${isEven ? '-44px' : '44px'});transition:opacity .7s ease,transform .7s ease;`;
    right.style.cssText += `opacity:0;transform:translateX(${isEven ? '44px' : '-44px'});transition:opacity .7s ease .12s,transform .7s ease .12s;`;
    const obs = makeObserver(entry => {
      left.style.opacity  = '1'; left.style.transform  = 'none';
      right.style.opacity = '1'; right.style.transform = 'none';
      obs.unobserve(row);
    }, { threshold: 0.1 });
    obs.observe(row);
  });

  /* ── 13. CURSOR GLOW (desktop only) ── */
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.id = 'ind-cursor-glow';
    glow.style.cssText = 'position:fixed;top:0;left:0;width:360px;height:360px;background:radial-gradient(circle,rgba(29,78,216,.06) 0%,transparent 65%);border-radius:50%;pointer-events:none;z-index:0;will-change:transform;transition:none;';
    document.body.appendChild(glow);
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function track() {
      cx += (mx - cx) * 0.07;
      cy += (my - cy) * 0.07;
      glow.style.transform = `translate(${cx - 180}px,${cy - 180}px)`;
      requestAnimationFrame(track);
    })();
  }

  /* ── 14. SCROLL-DEPTH SCALE UP (elements grow as you scroll into them) ── */
  document.querySelectorAll('[data-depth]').forEach(el => {
    el.style.transition = 'transform 0.4s ease';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const ratio = Math.min(entry.intersectionRatio * 1.4, 1);
        const scale = 0.88 + ratio * 0.12;
        entry.target.style.transform = `scale(${scale})`;
        if (ratio >= 0.95) {
          entry.target.style.transform = 'scale(1)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: Array.from({ length: 20 }, (_, i) => i / 20) });
    obs.observe(el);
  });

  /* ── 15. STAT CARD HOVER TILT ── */
  document.querySelectorAll('.ind-stat-box, .ind-metric-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'none';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });

  /* ── 16. FEATURE CARD 3D TILT ── */
  document.querySelectorAll('.ind-fcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(.34,1.2,.64,1), border-color .3s';
      card.style.transform = 'none';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease, border-color .3s';
    });
  });

  /* ── 17. BANNER PULSE TEXT ── */
  document.querySelectorAll('.ind-pulse-badge').forEach(el => {
    let up = true;
    setInterval(() => {
      el.style.transform = up ? 'scale(1.06)' : 'scale(1)';
      el.style.transition = 'transform 0.6s ease';
      up = !up;
    }, 2000);
  });

  /* ── 18. TYPING HEADLINE EFFECT for .ind-typewriter ── */
  document.querySelectorAll('.ind-typewriter').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid #1d4ed8';
    let i = 0;
    const obs = makeObserver(() => {
      const type = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i === text.length) {
          clearInterval(type);
          setTimeout(() => { el.style.borderRight = 'none'; }, 800);
        }
      }, 38);
      obs.disconnect();
    }, { threshold: 0.4 });
    obs.observe(el);
  });

})();

/* ── 19. MOBILE DROPDOWN ACCORDION ── */
(function () {
  function initMobileDropdowns() {
    if (window.innerWidth > 768) return;

    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      var trigger = dropdown.querySelector('.nav-link-main');
      if (!trigger) return;
      if (trigger.dataset.mobileReady) return;
      trigger.dataset.mobileReady = '1';

      trigger.addEventListener('click', function (e) {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        e.stopPropagation();

        var isOpen = dropdown.classList.contains('mob-open');

        // Close all other open dropdowns
        document.querySelectorAll('.nav-dropdown.mob-open').forEach(function (d) {
          if (d !== dropdown) d.classList.remove('mob-open');
        });

        // Toggle this one
        dropdown.classList.toggle('mob-open', !isOpen);
      });
    });
  }

  // Run on load
  initMobileDropdowns();

  // Re-run if window resizes (handles orientation change)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.nav-dropdown.mob-open').forEach(function (d) {
        d.classList.remove('mob-open');
      });
    } else {
      initMobileDropdowns();
    }
  }, { passive: true });

  // Re-init after hamburger opens (in case of late DOM load)
  var ham = document.getElementById('hamburger');
  if (ham) {
    ham.addEventListener('click', function () {
      setTimeout(initMobileDropdowns, 50);
    });
  }

  // Close all dropdowns when drawer closes
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-inner')) {
      document.querySelectorAll('.nav-dropdown.mob-open').forEach(function (d) {
        d.classList.remove('mob-open');
      });
    }
  });
})();

/* ── 20. ATTENTION STRIP PADDING FIX ON MOBILE ── */
(function () {
  var strip = document.getElementById('attentionStrip');
  var navbar = document.getElementById('navbar');
  if (!strip || !navbar) return;

  function updateNavTop() {
    if (window.innerWidth <= 768) {
      navbar.style.top = '0';
    }
  }
  updateNavTop();
  window.addEventListener('resize', updateNavTop, { passive: true });
})();
