/* ═══════════════════════════════════════════════════════════
   navik — main.js  |  Production-Ready
   ═══════════════════════════════════════════════════════════ */

const IS_MOBILE = () => window.innerWidth <= 768;
const REDUCED   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── PAGE LOAD MOTION ── */
document.documentElement.classList.add('navik-loading');
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.documentElement.classList.add('navik-ready'));
}, { once: true });

/* ── ROTATING LOGO TEXT ── */
(function() {
  const texts = ['HR', 'WFM', 'Payroll'];
  let currentIndex = 0;
  
  function rotateText() {
    const spans = document.querySelectorAll('.nav-logo-animated');
    console.log('Rotating logo:', {foundSpans: spans.length, currentIndex, texts});
    if (spans.length === 0) {
      console.warn('No .nav-logo-animated elements found!');
      return;
    }
    
    // Remove active class from all
    spans.forEach((span) => {
      span.classList.remove('active');
    });
    
    // Add active class to current
    if (spans[currentIndex]) {
      spans[currentIndex].classList.add('active');
      console.log('Activated:', spans[currentIndex].textContent);
    }
    
    currentIndex = (currentIndex + 1) % texts.length;
  }
  
  // Initial rotation
  rotateText();
  
  // Rotate every 3 seconds
  setInterval(rotateText, 3000);
})();

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
const announcementBanner = document.querySelector('.announcement-banner');
const heroSection = document.getElementById('home') || document.querySelector('.hero');

/* ── LAYOUT OFFSET — navbar is fixed at top:0, strip scrolls naturally ── */
function getStripHeight() {
  return 0; /* strip is position:relative now, scrolls away */
}

function applyLayoutOffsets() {
  const bannerHeight = 0; /* announcement banner no longer at top */
  const navH = navbar ? navbar.offsetHeight : 116;
  const totalNavHeight = navH;

  /* Hero layout top padding - use CSS value, no need for JS calculation */
  const heroLayout = document.querySelector('.hero-layout');
  if (heroLayout) heroLayout.style.paddingTop = '0px';

  /* Scroll-margin-top for all anchor sections */
  const totalOffset = totalNavHeight + 12;
  document.querySelectorAll('[id]').forEach(el => {
    el.style.scrollMarginTop = totalOffset + 'px';
  });
}

// Run on load, resize, and strip dismiss
applyLayoutOffsets();
window.addEventListener('resize', applyLayoutOffsets, { passive: true });

// Re-run after strip animates out
const _stripEl = document.getElementById('attentionStrip');
if (_stripEl) {
  _stripEl.addEventListener('transitionend', applyLayoutOffsets, { passive: true });
}

/* ── ANNOUNCEMENT BANNER SCROLL HIDE/SHOW ── */
// Announcement banner stays fixed and visible at all times
// No scroll hide/show functionality needed

/* ── ACTIVE NAV LINK on scroll ── */
(function () {
  const sections = ['solution','workforce','payroll','field-force','multipunch','trust'];
  const links    = {};
  sections.forEach(id => {
    const a = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (a) links[id] = a;
  });

  function updateActiveLink() {
    const scrollY  = window.scrollY + 100;
    let   activeId = null;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeId = id;
    });
    Object.entries(links).forEach(([id, a]) => {
      a.classList.toggle('active', id === activeId);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* ── NAVBAR SHRINK ON SCROLL ── */
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Add scrolled class when scrolled down more than 24px, remove when at top
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 24);
  }
  lastScrollY = scrollY;
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    if (open) {
      navLinks.style.top = (navbar ? navbar.offsetHeight : 76) + 'px';
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-inner')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── CURSOR GLOW (desktop only) ── */
if (!IS_MOBILE() && !REDUCED) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let mx = 0, my = 0, cx = 0, cy = 0, glowRaf = null;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  const trackGlow = () => {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    glow.style.transform = `translate(${cx - 190}px,${cy - 190}px)`;
    glowRaf = requestAnimationFrame(trackGlow);
  };
  glowRaf = requestAnimationFrame(trackGlow);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && glowRaf) { cancelAnimationFrame(glowRaf); glowRaf = null; }
    else if (!document.hidden && !glowRaf) { glowRaf = requestAnimationFrame(trackGlow); }
  });
}

/* ── HERO PARALLAX (desktop only) ── */
if (!IS_MOBILE() && !REDUCED) {
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');
  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 20;
      const dy = (e.clientY / window.innerHeight - 0.5) * 14;
      if (glow1) glow1.style.transform = `translate(${dx * 1.1}px,${dy * 1.1}px)`;
      if (glow2) glow2.style.transform = `translate(${-dx * 0.8}px,${-dy * 0.8}px)`;
      ticking = false;
    });
  }, { passive: true });
}

/* ── WORD-BY-WORD HEADLINE ── */
function splitWords(el) {
  const nodes = Array.from(el.childNodes);
  el.innerHTML = '';
  nodes.forEach(node => {
    if (node.nodeType === 3) {
      node.textContent.split(/(\s+)/).forEach(part => {
        if (part.trim()) {
          const s = document.createElement('span');
          s.className = 'word-span';
          s.textContent = part;
          el.appendChild(s);
        } else if (part) {
          el.appendChild(document.createTextNode(part));
        }
      });
    } else {
      el.appendChild(node.cloneNode(true));
    }
  });
}

const heroH1 = document.querySelector('[data-reveal="words"]');
if (heroH1 && !REDUCED) {
  heroH1.removeAttribute('data-reveal');
  heroH1.style.opacity = '1';
  heroH1.style.transform = 'none';
  splitWords(heroH1);
  const words = heroH1.querySelectorAll('.word-span');
  words.forEach((w, i) => { w.style.transitionDelay = `${120 + i * 60}ms`; });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    words.forEach(w => { w.style.opacity = '1'; w.style.transform = 'translateY(0)'; });
  }));
} else if (heroH1) {
  heroH1.style.opacity = '1';
  heroH1.style.transform = 'none';
}

/* ── INTERSECTION OBSERVER HELPER ── */
function makeIO(cb, opts = {}) {
  return new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) cb(entry); });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px', ...opts });
}

/* ── GENERIC SCROLL REVEAL ── */
function isAboveFold(el) { return el.getBoundingClientRect().top < window.innerHeight; }

document.querySelectorAll('[data-reveal]').forEach(el => {
  const delay = parseInt(el.dataset.delay || 0);
  if (isAboveFold(el)) {
    setTimeout(() => el.classList.add('revealed'), 80 + delay);
  } else {
    const io = makeIO(entry => {
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      io.unobserve(entry.target);
    });
    io.observe(el);
  }
});

/* ── SHOWCASE SPLIT REVEAL ── */
document.querySelectorAll('[data-reveal="split"]').forEach(row => {
  row.removeAttribute('data-reveal');
  row.style.opacity = '1';
  row.style.transform = 'none';
  const text  = row.querySelector('.sc-text');
  const visual = row.querySelector('.sc-visual');
  const isRev = row.classList.contains('sc-row-rev');
  const dist  = IS_MOBILE() ? 24 : 44;
  [text, visual].forEach((el, j) => {
    if (!el) return;
    const xd = isRev ? (j === 0 ? dist : -dist) : (j === 0 ? -dist : dist);
    el.style.opacity = '0';
    el.style.transform = `translateX(${xd}px)`;
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    el.style.willChange = 'transform, opacity';
  });
  const io = makeIO(() => {
    [text, visual].forEach((el, j) => {
      if (!el) return;
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; }, j * 120);
    });
    setTimeout(() => { [text, visual].forEach(el => { if (el) el.style.willChange = 'auto'; }); }, 900);
    io.unobserve(row);
  }, { threshold: 0.1 });
  io.observe(row);
});

/* ── STAGGER GRID CHILDREN ── */
function stagger(parentSel, childSel, baseDelay = 85) {
  document.querySelectorAll(parentSel).forEach(parent => {
    const kids = Array.from(parent.querySelectorAll(childSel));
    kids.forEach(k => {
      k.style.opacity = '0';
      k.style.transform = 'translateY(16px)';
      k.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      k.style.willChange = 'transform, opacity';
    });
    const io = makeIO(() => {
      const d = IS_MOBILE() ? baseDelay * 0.5 : baseDelay;
      kids.forEach((k, i) => {
        setTimeout(() => { k.style.opacity = '1'; k.style.transform = 'translateY(0)'; }, i * d);
      });
      const cleanup = kids.length * d + 600;
      setTimeout(() => kids.forEach(k => { k.style.willChange = 'auto'; }), cleanup);
      io.unobserve(parent);
    }, { threshold: 0.08 });
    io.observe(parent);
  });
}

stagger('.feat-grid',     '.feat-card',   60);
stagger('.trust-stats',   '.ts-item',    100);
stagger('.testimonials',  '.testi-card', 110);
stagger('.industries-grid', '.industry-card', 105);

/* Section-specific motion gives the product story a different cadence in each chapter. */
function revealCollection(parentSel, childSel, className, baseDelay = 90) {
  document.querySelectorAll(parentSel).forEach(parent => {
    const items = Array.from(parent.querySelectorAll(childSel));
    if (!items.length) return;
    items.forEach((item, index) => {
      item.classList.add(className);
      item.style.setProperty('--motion-index', index);
    });
    const io = makeIO(() => {
      parent.classList.add(`${className}-active`);
      items.forEach((item, index) => {
        item.style.setProperty('--motion-delay', `${index * baseDelay}ms`);
        item.classList.add(`${className}-in`);
      });
      io.unobserve(parent);
    }, { threshold: 0.12 });
    io.observe(parent);
  });
}

revealCollection('.media-grid', '.media-item', 'story-motion', 95);
revealCollection('.logos-strip', '.logo-item', 'logo-motion', 70);

document.querySelectorAll('.sol-cards-grid, .sol-cards-4').forEach(parent => {
  const kids = Array.from(parent.querySelectorAll('.sol-card'));
  kids.forEach(k => {
    k.style.opacity = '0';
    k.style.transform = 'translateY(16px)';
    k.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  const io = makeIO(() => {
    kids.forEach((k, i) => {
      setTimeout(() => { k.style.opacity = '1'; k.style.transform = 'translateY(0)'; }, i * 80);
    });
    io.unobserve(parent);
  }, { threshold: 0.08 });
  io.observe(parent);
});

/* ── COUNTER ANIMATION ── */
function countUp(el, target, suffix, isFloat, duration = 1800) {
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (isFloat ? (e * target).toFixed(1) : Math.floor(e * target).toLocaleString()) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

document.querySelectorAll('.ts-num[data-count]').forEach(el => {
  const target  = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const isFloat = !!el.dataset.float;
  const io = makeIO(entry => {
    countUp(entry.target, target, suffix, isFloat);
    io.unobserve(entry.target);
  }, { threshold: 0.5 });
  io.observe(el);
});

/* ── DASHBOARD ANIMATIONS ── */
document.querySelectorAll('.att-bar-mini').forEach(bar => {
  const targetH = bar.style.getPropertyValue('--h') || '50%';
  bar.style.setProperty('--h', '0%');
  const io = makeIO(entry => {
    setTimeout(() => entry.target.style.setProperty('--h', targetH), 200 + Math.random() * 150);
    io.unobserve(entry.target);
  }, { threshold: 0.3 });
  io.observe(bar);
});

document.querySelectorAll('.bar-segment').forEach(seg => {
  const targetW = seg.style.width || '0%';
  seg.style.width = '0%';
  seg.style.transition = 'width 1s ease';
  const io = makeIO(entry => {
    setTimeout(() => { entry.target.style.width = targetW; }, 300);
    io.unobserve(entry.target);
  }, { threshold: 0.3 });
  io.observe(seg.closest('.premise-bar-mini') || seg);
});

/* ── SECTION TRANSITIONS ── */
if (!REDUCED) {
  const sections = document.querySelectorAll('section');
  let currentSection = null;
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const section = entry.target;
      if (entry.isIntersecting) {
        if (entry.intersectionRatio > 0.2) {
          section.classList.remove('section-entering');
          section.classList.add('section-active');
          if (currentSection && currentSection !== section) {
            currentSection.classList.add('section-exiting');
            setTimeout(() => currentSection.classList.remove('section-exiting'), 500);
          }
          currentSection = section;
        }
      } else {
        section.classList.remove('section-active');
        section.classList.add(entry.boundingClientRect.top < 0 ? 'section-exiting' : 'section-entering');
      }
    });
  }, { threshold: [0, 0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' });

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    section.classList.add(
      (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) ? 'section-active' : 'section-entering'
    );
    sectionObserver.observe(section);
  });
}

/* ── DONUT CHART ANIMATION ── */
const donutArc = document.querySelector('.donut-arc');
if (donutArc) {
  donutArc.style.strokeDasharray = '0 314';
  const io = makeIO(() => {
    setTimeout(() => { donutArc.style.strokeDasharray = '274 314'; }, 200);
    io.disconnect();
  }, { threshold: 0.4 });
  io.observe(donutArc.closest('svg') || donutArc);
}

/* ── PAYROLL PROGRESS BAR ── */
document.querySelectorAll('.pp-fill').forEach(el => {
  const m = (el.getAttribute('style') || '').match(/--pw:\s*([^;]+)/);
  const targetW = m ? m[1].trim() : '87%';
  el.style.setProperty('--pw', '0%');
  el.style.width = '0%';
  const io = makeIO(entry => {
    setTimeout(() => { entry.target.style.setProperty('--pw', targetW); entry.target.style.width = targetW; }, 300);
    io.unobserve(entry.target);
  }, { threshold: 0.4 });
  io.observe(el);
});

/* ── SHIFT BARS ANIMATION ── */
document.querySelectorAll('.sp-fill').forEach(el => {
  const s = el.getAttribute('style') || '';
  const wM = s.match(/--w:\s*([^;]+)/);
  const cM = s.match(/--c:\s*([^;]+(?:\([^)]*\))?[^;]*)/);
  el.style.background = cM ? cM[1].trim() : 'var(--blue)';
  el.style.width = '0%';
  el.style.transition = 'width 1.5s ease';
  const io = makeIO(entry => {
    setTimeout(() => { entry.target.style.width = wM ? wM[1].trim() : '50%'; }, 200);
    io.unobserve(entry.target);
  }, { threshold: 0.3 });
  io.observe(el.closest('.shift-panel') || el);
});

/* ── WFM MAP TOAST ── */
const mapToast = document.getElementById('mapToast');
const toastMessages = [
  'Rahul checked in — Andheri West',
  'Rahul arrived at Bandra client site',
  'Stop 3 completed — Kurla',
  'Rahul heading to next stop — Powai',
  'Live location updated — Powai',
];
let toastIdx = 0;
function showMapToast() {
  if (!mapToast) return;
  mapToast.textContent = toastMessages[toastIdx++ % toastMessages.length];
  mapToast.classList.add('show');
  setTimeout(() => mapToast.classList.remove('show'), 2800);
}
function restartAnim(el) {
  if (!el) return;
  const clone = el.cloneNode(true);
  el.parentNode.replaceChild(clone, el);
  return clone;
}
const wfmMap = document.getElementById('wfmMap');
if (wfmMap) {
  const io = makeIO(() => {
    restartAnim(document.getElementById('routeDone'));
    restartAnim(document.getElementById('routePath'));
    setTimeout(showMapToast, 1600);
    setInterval(showMapToast, 5500);
    io.disconnect();
  }, { threshold: 0.35 });
  io.observe(wfmMap);
}

/* ── CTA BUTTON PULSE ── */
const ctaBtn = document.getElementById('demoBtn');
if (ctaBtn) {
  setInterval(() => {
    ctaBtn.classList.add('pulsing');
    setTimeout(() => ctaBtn.classList.remove('pulsing'), 820);
  }, 3600);
}

/* ── MOBILE STICKY CTA ── */
const mobileCta = document.getElementById('mobileCta');
function updateMobileCta() {
  if (!mobileCta) return;
  mobileCta.style.display = (window.innerWidth <= 768 && window.scrollY > 280) ? 'block' : 'none';
}
let mobileCtaRaf = null;
window.addEventListener('scroll', () => {
  if (mobileCtaRaf) return;
  mobileCtaRaf = requestAnimationFrame(() => { updateMobileCta(); mobileCtaRaf = null; });
}, { passive: true });
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateMobileCta, 150);
}, { passive: true });
updateMobileCta();

/*
   ══════════════════════════════════════════════════════════
   MEDIA CARDS — Dynamic system
   ══════════════════════════════════════════════════════════
   HOW TO ADD A VIDEO:
   {
     url:         'https://www.youtube.com/watch?v=YOUR_ID',
     category:    'clients',          // clients | demos | podcasts
     label:       'Client Story',
     title:       'Your Title',
     description: 'Short description.',
     source:      'Company Name',
     date:        '1 week ago',
     duration:    '3:45',
   }

   HOW TO ADD A PHOTO (client meet, event, etc.):
   {
     type:        'photo',            // ← marks this as a photo card
     thumbnail:   'https://your-image-url.jpg',
     link:        'https://optional-link.com',  // opens on click (optional)
     category:    'clients',
     label:       'Client Meet',
     title:       'Your Heading Here',
     description: 'Your subheading / caption here.',
     source:      'Company Name',
     date:        'May 2026',
   }
   ══════════════════════════════════════════════════════════ */

const MEDIA_CARDS = [

  // ─── HOW TO ADD CONTENT ───────────────────────────────
  //
  // 1. PHOTO CARD (client meet, event, etc.):
  // {
  //   type:        'photo',                                    // ← marks this as a photo card
  //   thumbnail:   'https://your-image-url.jpg',              // image URL
  //   link:        'https://optional-link.com',               // opens on click (optional)
  //   category:    'clients',                                 // clients | demos | podcasts
  //   label:       'Client Meet',                             // badge text on card
  //   title:       'Your Heading Here',                       // main heading
  //   description: 'Your subheading / caption here.',         // description
  //   source:      'Company Name',                            // company/source name
  //   date:        'May 2026',                                // date text
  // },
  //
  // 2. VIDEO CARD (YouTube, Vimeo, etc.):
  // {
  //   url:         'https://www.youtube.com/watch?v=YOUR_ID', // video URL
  //   category:    'demos',                                   // clients | demos | podcasts
  //   label:       'Product Demo',                            // badge text on card
  //   title:       'Your Video Title',                        // main heading
  //   description: 'Short description shown under title.',    // description
  //   source:      'navik',                                   // author / channel name
  //   date:        '1 week ago',                              // date text
  //   duration:    '4:32',                                    // optional, shown as badge
  // },
  //
  // 3. ARTICLE/URL CARD (blog post, article, etc.):
  // {
  //   url:         'https://example.com/article',             // article URL
  //   category:    'clients',                                 // clients | demos | podcasts
  //   label:       'Case Study',                              // badge text on card
  //   title:       'Article Title',                           // main heading (auto-fetched if not provided)
  //   description: 'Article description.',                    // description (auto-fetched if not provided)
  //   source:      'Blog Name',                               // source name (auto-fetched if not provided)
  //   date:        '1 month ago',                             // date text (auto-fetched if not provided)
  // },
  //
  // ───────────────────────────────────────────────────────

  // Photo card 1 - 4Fox Business Solution
  {
    type:        'photo',
    thumbnail:   'https://www.image2url.com/r2/default/images/1779091173113-2bafb205-45a9-4f8c-b8c2-8a100b0747cf.png',
    link:        null,  // optional: add a URL to open when clicked
    category:    'clients',
    label:       'Client Story',
    title:       'How 4Fox Business Solution Streamlined Workforce Management',
    description: 'Helping 4Fox Business Solution simplify attendance, employee tracking, and daily workforce operations through a smarter and more efficient HRMS experience.',
    source:      '4Fox Business Solution',
    date:        '8 weeks ago',
  },

  // Photo card 2 - Atmaram Child Care
  {
    type:        'photo',
    thumbnail:   'https://www.image2url.com/r2/default/images/1779091412896-633cf0ed-1075-4c61-9a94-6ae5392f2117.jpg',
    link:        null,  // optional: add a URL to open when clicked
    category:    'clients',
    label:       'Client Story',
    title:       'Streamlining Workforce Operations at Atmaram Child Care & Critical Care',
    description: 'Helping Atmaram Child Care & Critical Care manage staff attendance, shift operations, and workforce efficiency with a smart HRMS solution.',
    source:      'Atmaram Child Care & Critical care',
    date:        '6 weeks ago',
  },

  // Instagram Reel card - Lala Purushottam Das Jewellers
  {
    thumbnail:   'https://www.image2url.com/r2/default/images/1779091084150-8e4e3ba8-0516-4018-8ada-40531314e768.png',
    url:         'https://www.instagram.com/reel/DYWT7-NT-gR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    category:    'clients',
    label:       'Client Story',
    title:       'Smarter Workforce Management for Lala Purushottam Das Jewellers',
    description:  'Helping Lala Purushottam Das Jewellers streamline staff attendance, workforce coordination, and daily operations with a smarter HRMS solution.',
    source:      'Lala Purshottam Das Jewellers',
    date:        '3 week ago',
  },

  // Video card example (YouTube)
  /*{
    url:         'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category:    'demos',
    label:       'Product Demo',
    title:       'navik Platform Overview 2026',
    description: 'Complete walkthrough of attendance tracking, payroll automation, and field workforce management features.',
    source:      'navik',
    date:        '1 week ago',
    duration:    '8:30',
  },*/

  // Podcast card example
  /*{
    url:         'https://open.spotify.com/episode/example',
    category:    'podcasts',
    label:       'Podcast',
    title:       'The Future of Workforce Management',
    description: 'Industry experts discuss trends in HR tech, automation, and the future of work.',
    source:      'navik Talks',
    date:        '3 days ago',
    duration:    '28:15',
  },*/

];

/* ── Media card helpers ── */
const INITIAL_VISIBLE = 3;
const CACHE_KEY       = 'navik_media_v1';
const MICROLINK_API   = 'https://api.microlink.io/?url=';

function sanitizeText(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function getYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function getInstagramReelId(url) {
  // Match Instagram reel URLs: instagram.com/reel/REEL_ID/
  const m = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function isInstagramUrl(url) {
  return url && /instagram\.com/.test(url);
}

function loadCache() {
  try { return JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
}
function saveCache(c) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

async function fetchMicrolink(url) {
  const cache = loadCache();
  if (cache[url]) return cache[url];
  try {
    const res  = await fetch(MICROLINK_API + encodeURIComponent(url) + '&palette=false&audio=false&video=false');
    const json = await res.json();
    if (json.status !== 'success') throw new Error();
    const d = json.data;
    const meta = {
      title:       d.title       || null,
      description: d.description || null,
      thumbnail:   d.image?.url  || d.screenshot?.url || null,
      source:      d.publisher   || d.author || new URL(url).hostname.replace('www.', ''),
      date:        d.date ? new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null,
    };
    cache[url] = meta;
    saveCache(cache);
    return meta;
  } catch { return null; }
}

async function resolveCard(card) {
  // Photo card — no URL resolution needed
  if (card.type === 'photo') {
    return {
      type:        'photo',
      thumbnail:   card.thumbnail   || null,
      link:        card.link        || null,
      title:       card.title       || '',
      description: card.description || '',
      source:      card.source      || '',
      date:        card.date        || '',
      category:    card.category,
      label:       card.label       || 'Photo',
      ytId:        null,
      instaId:     null,
      url:         card.link        || null,
    };
  }
  
  const ytId = getYouTubeId(card.url);
  const instaId = getInstagramReelId(card.url);
  
  // If all key fields provided, skip network fetch
  if (card.title && card.description) {
    let thumbnail = card.thumbnail;
    
    // Auto-generate thumbnail for YouTube
    if (!thumbnail && ytId) {
      thumbnail = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    }
    
    // Use Instagram gradient placeholder for Instagram reels
    if (!thumbnail && instaId) {
      thumbnail = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Cdefs%3E%3ClinearGradient id='ig' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f09433'/%3E%3Cstop offset='25%25' style='stop-color:%23e6683c'/%3E%3Cstop offset='50%25' style='stop-color:%23dc2743'/%3E%3Cstop offset='75%25' style='stop-color:%23cc2366'/%3E%3Cstop offset='100%25' style='stop-color:%23bc1888'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23ig)'/%3E%3Ctext x='300' y='180' text-anchor='middle' font-size='80' fill='white' font-family='sans-serif' font-weight='bold'%3E▶%3C/text%3E%3Ctext x='300' y='240' text-anchor='middle' font-size='24' fill='white' font-family='sans-serif'%3EInstagram Reel%3C/text%3E%3C/svg%3E";
    }
    
    return { 
      ...card, 
      ytId, 
      instaId,
      thumbnail,
      isInstagram: !!instaId,
    };
  }
  
  let fetched = {};
  if (ytId) {
    fetched.thumbnail = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
  } else if (instaId) {
    // Instagram reel - use gradient placeholder
    fetched.thumbnail = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Cdefs%3E%3ClinearGradient id='ig' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f09433'/%3E%3Cstop offset='25%25' style='stop-color:%23e6683c'/%3E%3Cstop offset='50%25' style='stop-color:%23dc2743'/%3E%3Cstop offset='75%25' style='stop-color:%23cc2366'/%3E%3Cstop offset='100%25' style='stop-color:%23bc1888'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23ig)'/%3E%3Ctext x='300' y='180' text-anchor='middle' font-size='80' fill='white' font-family='sans-serif' font-weight='bold'%3E▶%3C/text%3E%3Ctext x='300' y='240' text-anchor='middle' font-size='24' fill='white' font-family='sans-serif'%3EInstagram Reel%3C/text%3E%3C/svg%3E";
  } else {
    const meta = await fetchMicrolink(card.url);
    if (meta) fetched = meta;
  }
  
  let host = '';
  try { host = new URL(card.url).hostname.replace('www.', ''); } catch {}
  
  return {
    ytId,
    instaId,
    isInstagram: !!instaId,
    thumbnail:   card.thumbnail   || fetched.thumbnail   || null,
    title:       card.title       || fetched.title       || host,
    description: card.description || fetched.description || '',
    source:      card.source      || fetched.source      || host,
    date:        card.date        || fetched.date        || '',
    duration:    card.duration    || null,
    category:    card.category,
    label:       card.label,
    url:         card.url,
  };
}

const ICON_PLAY    = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const ICON_PODCAST = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="11" r="3"/><path d="M6.343 17.657A8 8 0 1 1 17.657 6.343 8 8 0 0 1 6.343 17.657z"/><path d="M12 14v7"/></svg>';
const ICON_VIDEO   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const ICON_PHOTO   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
const ICON_ARTICLE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
const ICON_INSTAGRAM = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
const ICON_REEL    = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/><path d="M8 5l11 7-11 7z" fill="white" opacity="0.9"/></svg>';
const PLACEHOLDER  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e2e8f0'/%3E%3Ctext x='300' y='210' text-anchor='middle' font-size='18' fill='%2394a3b8' font-family='sans-serif'%3ENo Preview%3C/text%3E%3C/svg%3E";

function getTypeIcon(card) {
  if (card.type === 'photo')                                     return { icon: ICON_PHOTO,     cls: 'type-photo'     };
  if (card.isInstagram || card.instaId)                          return { icon: ICON_INSTAGRAM, cls: 'type-instagram' };
  if (card.category === 'podcasts')                              return { icon: ICON_PODCAST,   cls: 'type-podcast'   };
  if (card.ytId || /youtube|vimeo|youtu\.be/.test(card.url||'')) return { icon: ICON_VIDEO,     cls: 'type-video'     };
  return { icon: ICON_ARTICLE, cls: 'type-article' };
}

// Real-time timestamp formatter
function getRelativeTime(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
    if (seconds < 2592000) return Math.floor(seconds / 604800) + 'w ago';
    return Math.floor(seconds / 2592000) + 'mo ago';
  } catch {
    return dateString;
  }
}

// Modal popup for detailed card view
function showCardModal(card) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('mediaCardModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mediaCardModal';
    modal.className = 'media-card-modal';
    modal.innerHTML = `
      <div class="media-modal-overlay" id="mediaModalOverlay"></div>
      <div class="media-modal-container">
        <button class="media-modal-close" id="mediaModalClose" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="media-modal-content" id="mediaModalContent"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal handlers
    document.getElementById('mediaModalClose').addEventListener('click', closeCardModal);
    document.getElementById('mediaModalOverlay').addEventListener('click', closeCardModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCardModal(); });
  }
  
  // Populate modal with card data
  const content = document.getElementById('mediaModalContent');
  const thumb = card.thumbnail 
    ? `<img src="${sanitizeText(card.thumbnail)}" alt="${sanitizeText(card.title)}" class="media-modal-thumbnail">`
    : `<img src="${PLACEHOLDER}" alt="${sanitizeText(card.label)}" class="media-modal-thumbnail">`;
  
  const relativeTime = card.postedDate ? getRelativeTime(card.postedDate) : (card.date || '');
  
  content.innerHTML = `
    <div class="media-modal-header">
      ${thumb}
    </div>
    <div class="media-modal-body">
      <div class="media-modal-category">${sanitizeText(card.label)}</div>
      <h2 class="media-modal-title">${sanitizeText(card.title)}</h2>
      ${card.description ? `<p class="media-modal-description">${sanitizeText(card.description)}</p>` : ''}
      <div class="media-modal-meta">
        ${card.source ? `<span class="media-modal-company">${sanitizeText(card.source)}</span>` : ''}
        ${card.source && relativeTime ? '<span class="media-dot">•</span>' : ''}
        ${relativeTime ? `<span class="media-modal-time" data-posted="${card.postedDate || ''}">${relativeTime}</span>` : ''}
      </div>
      ${card.url ? `
        <a href="${sanitizeText(card.url)}" target="_blank" rel="noopener noreferrer" class="media-modal-link">
          View Story →
        </a>
      ` : ''}
    </div>
  `;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update timestamp every minute
  updateTimestamps();
}

function closeCardModal() {
  const modal = document.getElementById('mediaCardModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Update all relative timestamps in real-time
function updateTimestamps() {
  document.querySelectorAll('[data-posted]').forEach(el => {
    const posted = el.getAttribute('data-posted');
    if (posted) {
      el.textContent = getRelativeTime(posted);
    }
  });
}

// Update timestamps every minute
setInterval(updateTimestamps, 60000);

function buildCard(card, index) {
  const { icon, cls } = getTypeIcon(card);
  const isHidden = index >= INITIAL_VISIBLE;
  const isPhoto  = card.type === 'photo';
  const isInstagram = card.isInstagram || card.instaId;
  
  // Build thumbnail with proper error handling
  const thumb = card.thumbnail
    ? `<img src="${sanitizeText(card.thumbnail)}" alt="${sanitizeText(card.title)}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">`
    : `<img src="${PLACEHOLDER}" alt="${sanitizeText(card.label)}">`;
  
  // Duration badge (only for videos/podcasts with duration)
  const duration = card.duration ? `<div class="media-duration">${sanitizeText(card.duration)}</div>` : '';
  
  // Play button logic:
  // - Photos: NO play button
  // - Podcasts: NO play button (audio icon instead)
  // - Instagram Reels: YES play button (special reel icon)
  // - Videos: YES play button
  // - Articles: NO play button
  const showPlayBtn = !isPhoto && card.category !== 'podcasts' && (card.ytId || card.url || isInstagram);
  const playBtnIcon = isInstagram ? ICON_REEL : ICON_PLAY;
  const playBtn = showPlayBtn ? `<div class="media-play-btn ${isInstagram ? 'instagram-play' : ''}" aria-label="Play">${playBtnIcon}</div>` : '';
  
  // Build metadata with relative time
  const relativeTime = card.postedDate ? getRelativeTime(card.postedDate) : (card.date || '');
  const meta = [
    card.source ? `<span class="media-company">${sanitizeText(card.source)}</span>` : '',
    card.source && relativeTime ? '<span class="media-dot">•</span>' : '',
    relativeTime ? `<span class="media-date" data-posted="${card.postedDate || ''}">${relativeTime}</span>` : '',
  ].join('');

  const el = document.createElement('div');
  el.className = 'media-item' + (isHidden ? ' media-hidden' : '') + (isPhoto ? ' media-item-photo' : '') + (isInstagram ? ' media-item-instagram' : '');
  el.dataset.category = card.category;
  el.setAttribute('role', 'article');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', card.title || card.label);
  el.style.cssText = 'opacity:0;transform:translateY(20px);transition:opacity 0.45s ease,transform 0.45s ease';
  el.innerHTML = `
    <div class="media-thumbnail">
      ${thumb}
      <div class="media-type-icon ${cls}" aria-hidden="true">${icon}</div>
      ${playBtn}${duration}
    </div>
    <div class="media-content">
      <div class="media-category">${sanitizeText(card.label)}</div>
      <h3 class="media-title">${sanitizeText(card.title)}</h3>
      ${card.description ? `<p class="media-desc">${sanitizeText(card.description)}</p>` : ''}
      ${meta ? `<div class="media-meta">${meta}</div>` : ''}
    </div>`;

  // Handle clicks - open modal for detailed view instead of direct URL
  el.addEventListener('click', () => showCardModal(card));
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showCardModal(card); } });
  el.style.cursor = 'pointer';
  
  return el;
}

function animateIn(el, delay) {
  setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, delay || 0);
}

async function renderMediaCards() {
  const grid   = document.getElementById('mediaGrid');
  const footer = document.getElementById('mediaFooter');
  if (!grid) return;

  // Handle empty MEDIA_CARDS array
  if (!MEDIA_CARDS || MEDIA_CARDS.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 16px; color: var(--g500); margin-bottom: 12px;">No stories available yet.</p>
        <p style="font-size: 14px; color: var(--g400);">Check back soon for customer stories and updates!</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  try {
    const resolved = await Promise.all(MEDIA_CARDS.map(resolveCard));
    grid.innerHTML = '';

    // Filter out any failed cards
    const validCards = resolved.filter(card => card && card.title);
    
    if (validCards.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 16px; color: var(--g500); margin-bottom: 12px;">Unable to load stories.</p>
          <p style="font-size: 14px; color: var(--g400);">Please try refreshing the page.</p>
        </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    validCards.forEach((card, i) => {
      const el = buildCard(card, i);
      grid.appendChild(el);
      if (i < INITIAL_VISIBLE) animateIn(el, i * 80);
    });

    // Media cards arrive asynchronously, so attach their entrance choreography after render.
    revealCollection('.media-grid', '.media-item', 'story-motion', 95);

    if (validCards.length > INITIAL_VISIBLE && footer) {
      footer.style.display = 'block';
    } else if (footer) {
      footer.style.display = 'none';
    }

    // View All button
    const viewAllBtn = document.getElementById('viewAllStoriesBtn');
    if (viewAllBtn && footer) {
      viewAllBtn.addEventListener('click', () => {
        grid.querySelectorAll('.media-item.media-hidden').forEach((el, i) => {
          el.classList.remove('media-hidden');
          animateIn(el, i * 80);
        });
        footer.style.display = 'none';
      });
    }

    // Tab filtering with empty state handling
    document.querySelectorAll('.media-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.media-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.category;
        let idx = 0;
        let visibleCount = 0;
        
        grid.querySelectorAll('.media-item').forEach(el => {
          const match = cat === 'all' || el.dataset.category === cat;
          if (match) {
            visibleCount++;
            el.style.display = 'block';
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            animateIn(el, idx++ * 60);
          } else {
            el.style.opacity = '0';
            setTimeout(() => { el.style.display = 'none'; }, 300);
          }
        });
        
        // Show empty state if no cards match the filter
        let emptyState = grid.querySelector('.media-empty-state');
        if (visibleCount === 0) {
          if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'media-empty-state';
            emptyState.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 60px 20px;';
            emptyState.innerHTML = `
              <p style="font-size: 16px; color: var(--g500); margin-bottom: 8px;">No ${cat === 'all' ? '' : cat} stories yet.</p>
              <p style="font-size: 14px; color: var(--g400);">Try selecting a different category.</p>`;
            grid.appendChild(emptyState);
          }
          emptyState.style.display = 'block';
        } else if (emptyState) {
          emptyState.style.display = 'none';
        }
      });
    });
  } catch (error) {
    console.error('Error rendering media cards:', error);
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 16px; color: var(--red); margin-bottom: 12px;">⚠️ Error loading stories</p>
        <p style="font-size: 14px; color: var(--g400);">Please refresh the page or try again later.</p>
      </div>`;
    if (footer) footer.style.display = 'none';
  }
}

renderMediaCards();

/* ══════════════════════════════════════════════════════════
   BOOK DEMO FORM — validation + Google Apps Script submit
   ══════════════════════════════════════════════════════════ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVLKYM_vFzPbSN3dR80ZWMyf03L-ZwxKaNvXwb9Bv5MwzVjwQo5mM3I5zpe7O2UaHR/exec';

(function () {
  const btn = document.getElementById('demoBtn');
  if (!btn) {
    console.warn('Demo button not found');
    return;
  }

  // Get all field elements
  const nameField = document.getElementById('cf_name');
  const companyField = document.getElementById('cf_company');
  const emailField = document.getElementById('cf_email');
  const phoneField = document.getElementById('cf_phone');
  const sizeField = document.getElementById('cf_size');
  const messageField = document.getElementById('cf_message');
  const hpField = document.getElementById('hp_field');

  if (!nameField || !companyField || !emailField || !phoneField || !sizeField) {
    console.error('One or more form fields not found');
    return;
  }

  const successBox = document.getElementById('cfSuccess');
  const errorBox = document.getElementById('cfErrorMsg');
  const btnLabel = btn.querySelector('.btn-label');
  const btnLoading = btn.querySelector('.btn-loading');

  function setErr(id, msg) {
    const errEl = document.getElementById(id);
    if (!errEl) return;
    errEl.textContent = msg;
    const field = document.getElementById(id.replace('err_', 'cf_'));
    if (field) field.classList.add('err');
  }

  function clearErr(id) {
    const errEl = document.getElementById(id);
    if (!errEl) return;
    errEl.textContent = '';
    const field = document.getElementById(id.replace('err_', 'cf_'));
    if (field) field.classList.remove('err');
  }

  function validate() {
    let valid = true;
    const name = nameField.value.trim();
    const company = companyField.value.trim();
    const email = emailField.value.trim();
    const phone = phoneField.value.replace(/[\s\-\+\(\)]/g, '');
    const size = sizeField.value;

    if (!name) {
      setErr('err_name', 'Full name is required.');
      valid = false;
    } else {
      clearErr('err_name');
    }

    if (!company) {
      setErr('err_company', 'Company name is required.');
      valid = false;
    } else {
      clearErr('err_company');
    }

    if (!email) {
      setErr('err_email', 'Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setErr('err_email', 'Enter a valid email address.');
      valid = false;
    } else {
      clearErr('err_email');
    }

    if (!phone) {
      setErr('err_phone', 'Phone number is required.');
      valid = false;
    } else if (!/^[0-9]{10,15}$/.test(phone)) {
      setErr('err_phone', 'Enter a valid 10-digit phone number.');
      valid = false;
    } else {
      clearErr('err_phone');
    }

    if (!size) {
      setErr('err_size', 'Please select company size.');
      valid = false;
    } else {
      clearErr('err_size');
    }

    return valid;
  }

  btn.addEventListener('click', async () => {
    if (successBox) successBox.style.display = 'none';
    if (errorBox) errorBox.style.display = 'none';

    if (!validate()) {
      console.log('Validation failed');
      return;
    }

    // Honeypot check
    if (hpField && hpField.value.trim() !== '') {
      console.log('Honeypot triggered');
      return;
    }

    // Show loading state
    if (btnLabel) btnLabel.style.display = 'none';
    if (btnLoading) btnLoading.style.display = '';
    btn.disabled = true;

    try {
      // Build data
      const name = nameField.value.trim();
      const company = companyField.value.trim();
      const email = emailField.value.trim();
      const phone = phoneField.value.replace(/[\s\-\+\(\)]/g, '');
      const companySize = sizeField.value;
      const message = messageField ? messageField.value.trim() : '';

      // Build URL with query parameters (GET request)
      const params = new URLSearchParams();
      params.append('formType', 'demo');
      params.append('name', name);
      params.append('company', company);
      params.append('email', email);
      params.append('phone', phone);
      params.append('companySize', companySize);
      params.append('message', message);
      params.append('hp_field', hpField ? hpField.value : '');

      const url = APPS_SCRIPT_URL + '?' + params.toString();

      console.log('Sending form data via GET:', {
        name, company, email, phone, companySize, message, url
      });

      // Send as GET request (no CORS issues)
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });

      console.log('Form submitted successfully');

      if (successBox) successBox.style.display = 'flex';

      // Reset form
      nameField.value = '';
      companyField.value = '';
      emailField.value = '';
      phoneField.value = '';
      sizeField.selectedIndex = 0;
      if (messageField) messageField.value = '';

      // Clear errors
      ['err_name', 'err_company', 'err_email', 'err_phone', 'err_size'].forEach(id => clearErr(id));

    } catch (error) {
      console.error('Form submission error:', error);
      if (errorBox) errorBox.style.display = 'block';
    } finally {
      if (btnLabel) btnLabel.style.display = '';
      if (btnLoading) btnLoading.style.display = 'none';
      btn.disabled = false;
    }
  });
})();


/* ══════════════════════════════════════════════════════════
   MULTI PUNCH SYSTEM — Interactive Logic
   ══════════════════════════════════════════════════════════ */
(function () {
  const PUNCH_DATA = {
    wfh:  { title: 'WFH Punch — Remote Attendance' },
    bio:  { title: 'Biometric Punch — Hardware Verified' },
    web:  { title: 'Web Punch — Browser Based' },
    geo:  { title: 'Geo Punch — Location Verified' },
    auto: { title: 'Auto Punch — Smart Detection' },
  };

  const tabs      = document.querySelectorAll('.mp-tab');
  const panels    = document.querySelectorAll('.mp-panel');
  const nodes     = document.querySelectorAll('.mp-core-node');
  const lines     = document.querySelectorAll('.mp-core-svg line');
  const demoTitle = document.getElementById('mpDemoTitle');

  if (!tabs.length) return;

  function switchPunch(key) {
    // Tabs
    tabs.forEach(t => t.classList.toggle('active', t.dataset.punch === key));
    // Panels
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
    // Core nodes
    nodes.forEach(n => n.classList.toggle('node-active', n.id === 'node-' + key));
    // Core lines
    lines.forEach(l => {
      const isActive = l.id === 'line-' + key;
      l.style.stroke = isActive ? 'rgba(37,99,235,0.7)' : 'rgba(37,99,235,0.12)';
      l.style.strokeWidth = isActive ? '2.5' : '1.5';
      l.style.transition = 'stroke .4s, stroke-width .4s';
    });
    // Title
    if (demoTitle && PUNCH_DATA[key]) demoTitle.textContent = PUNCH_DATA[key].title;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchPunch(tab.dataset.punch));
  });

  // Init active line
  switchPunch('wfh');

  /* ── METRIC COUNT-UP ── */
  document.querySelectorAll('[data-mp-count]').forEach(el => {
    const target  = parseFloat(el.dataset.mpCount);
    const suffix  = el.dataset.mpSuffix || '';
    const isFloat = !!el.dataset.mpFloat;
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1800;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (isFloat ? (e * target).toFixed(1) : Math.floor(e * target)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ── FLOATING PARTICLES ── */
  const container = document.getElementById('mpParticles');
  if (container) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'mp-particle';
      p.style.cssText = `left:${Math.random()*100}%;bottom:0;width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;animation-duration:${6+Math.random()*10}s;animation-delay:${Math.random()*8}s`;
      container.appendChild(p);
    }
  }

  /* ── CARD TILT on demo screen ── */
  const screen = document.querySelector('.mp-demo-screen');
  if (screen && !window.matchMedia('(hover:none)').matches) {
    screen.addEventListener('mousemove', e => {
      const r = screen.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      screen.style.transform = `perspective(800px) rotateY(${x*4}deg) rotateX(${-y*3}deg)`;
    });
    screen.addEventListener('mouseleave', () => {
      screen.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ── COMPARISON CARDS scroll reveal ── */
  const compareCards = document.querySelectorAll('.mp-compare-card');
  compareCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = i === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    card.style.transition = 'opacity .6s ease, transform .6s ease';
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, i * 120);
      io.disconnect();
    }, { threshold: 0.2 });
    io.observe(card);
  });

  /* ── METRIC CARDS stagger ── */
  document.querySelectorAll('.mp-metric-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease';
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 100);
      io.disconnect();
    }, { threshold: 0.2 });
    io.observe(card);
  });

})();

/* ═══════════════════════════════════════════
   MULTI PUNCH SYSTEM v2 — Interactive Logic
═══════════════════════════════════════════ */
(function () {
  'use strict';

  const PUNCH_DATA2 = {
    wfh:  { title: 'WFH Punch — Remote Attendance' },
    fr:   { title: 'Face Recognition — Identity Verified' },
    web:  { title: 'Web Punch — Browser Based' },
    geo:  { title: 'Geo Punch — Location Verified' },
    auto: { title: 'Auto Punch — Smart Detection' },
  };

  const tabs2      = document.querySelectorAll('.mps2-tab');
  const panels2    = document.querySelectorAll('.mps2-panel');
  const nodes2     = document.querySelectorAll('.mps2-node');
  const demoTitle2 = document.getElementById('mps2DemoTitle');

  if (!tabs2.length) return;

  function switchPunch2(key) {
    // Tabs
    tabs2.forEach(t => t.classList.toggle('active', t.dataset.punch2 === key));
    // Panels
    panels2.forEach(p => p.classList.toggle('active', p.id === 'mps2-panel-' + key));
    // Orbital nodes
    nodes2.forEach(n => n.classList.toggle('node-glow', n.id === 'mps2-node-' + key));
    // SVG lines
    ['wfh','fr','web','geo','auto'].forEach(k => {
      const line = document.getElementById('mps2-line-' + k);
      if (!line) return;
      const isActive = k === key;
      line.style.stroke = isActive ? 'rgba(37,99,235,0.65)' : 'rgba(37,99,235,0.1)';
      line.style.strokeWidth = isActive ? '2' : '1.5';
      line.style.transition = 'stroke .35s, stroke-width .35s';
    });
    // Title
    if (demoTitle2 && PUNCH_DATA2[key]) demoTitle2.textContent = PUNCH_DATA2[key].title;
  }

  tabs2.forEach(tab => {
    tab.addEventListener('click', () => switchPunch2(tab.dataset.punch2));
  });

  // Orbital nodes also clickable
  nodes2.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.id.replace('mps2-node-', '');
      switchPunch2(key);
    });
  });

  // Init
  switchPunch2('wfh');

  /* ── STAT COUNT-UP ── */
  document.querySelectorAll('[data-mps2-count]').forEach(el => {
    const target  = parseFloat(el.dataset.mps2Count);
    const suffix  = el.dataset.mps2Suffix || '';
    const isFloat = !!el.dataset.mps2Float;
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0  = performance.now();
      const dur = 1600;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (isFloat ? (e * target).toFixed(1) : Math.floor(e * target)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ── DEMO CARD subtle tilt ── */
  const card = document.querySelector('.mps2-demo-card');
  if (card && !window.matchMedia('(hover:none)').matches) {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'transform .4s ease';
    });
  }

})();

/* ═══════════════════════════════════════════
   HR WORKSPACE — HRW Interactive Logic
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── TAB SWITCHING ── */
  const tabs  = document.querySelectorAll('.hrw-tab');
  const panes = document.querySelectorAll('.hrw-pane');
  const badge = document.getElementById('hrwLiveBadge');

  const BADGE_TEXT = {
    recruit: '12 candidates in pipeline',
    docs:    '1 document awaiting upload',
    comply:  '24 signatures pending'
  };

  function switchTab(key) {
    tabs.forEach(t  => t.classList.toggle('active', t.dataset.hrwtab === key));
    panes.forEach(p => p.classList.toggle('active', p.id === 'hrw-pane-' + key));
    if (badge && BADGE_TEXT[key]) badge.textContent = BADGE_TEXT[key];
    // Restart upload animation when docs tab opens
    if (key === 'docs') startUpload();
    // Animate policy bars when comply tab opens
    if (key === 'comply') animatePolicyBars();
  }

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.hrwtab)));

  /* ── METRIC COUNT-UP ── */
  document.querySelectorAll('[data-hrw-count]').forEach(el => {
    const target = parseFloat(el.dataset.hrwCount);
    const suffix = el.dataset.hrwSuffix || '';
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1500;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ── UPLOAD ANIMATION ── */
  let uploadStarted = false;
  function startUpload() {
    const fill = document.getElementById('hrwUploadFill');
    const pct  = document.getElementById('hrwUploadPct');
    if (!fill || !pct) return;
    // Reset and replay
    fill.style.width = '0';
    pct.textContent = '0%';
    uploadStarted = false;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5 + 1;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      fill.style.width = progress + '%';
      pct.textContent = Math.floor(progress) + '%';
    }, 80);
  }

  // Auto-start upload when section enters viewport
  const uploadRow = document.querySelector('.hrw-upload-row');
  if (uploadRow) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || uploadStarted) return;
      uploadStarted = true;
      io.disconnect();
      startUpload();
    }, { threshold: 0.5 });
    io.observe(uploadRow);
  }

  /* ── POLICY BAR ANIMATION ── */
  function animatePolicyBars() {
    document.querySelectorAll('.hrw-policy-fill').forEach((bar, i) => {
      const target = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = target; }, i * 100);
    });
  }

  // Auto-animate on first view
  const policyList = document.querySelector('.hrw-policy-list');
  if (policyList) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      animatePolicyBars();
    }, { threshold: 0.3 });
    io.observe(policyList);
  }

  /* ── KANBAN CARD MOVE ── */
  window.hrwMoveCard = function(cardId, laneId) {
    const card = document.getElementById(cardId);
    const lane = document.getElementById(laneId);
    if (!card || !lane) return;
    card.style.transition = 'opacity .25s ease, transform .25s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px) scale(0.95)';
    setTimeout(() => {
      const laneHead = lane.querySelector('.hrw-lane-head');
      if (laneHead) lane.insertBefore(card, laneHead.nextSibling);
      else lane.appendChild(card);
      card.style.transform = 'translateX(-20px) scale(0.95)';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0) scale(1)';
      });
      if (laneId === 'hrwLane5') {
        const countEl = document.getElementById('hrwJoinedCount');
        if (countEl) countEl.textContent = (parseInt(countEl.textContent) || 0) + 1;
        const stack = document.getElementById('hrwJoinedStack');
        const name  = card.querySelector('.hrw-card-name');
        if (stack && name) {
          const initials = name.textContent.split(' ').map(w => w[0]).join('').slice(0,2);
          const chip = document.createElement('div');
          chip.className = 'hrw-joined-chip';
          chip.innerHTML = `<div class="hrw-avatar hrw-av-green" style="width:24px;height:24px;font-size:9px;border-radius:7px">${initials}</div><span>${name.textContent.split(' ')[0]} ${(name.textContent.split(' ')[1]||'')[0]||''}.</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
          chip.style.cssText = 'opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease';
          stack.appendChild(chip);
          requestAnimationFrame(() => { chip.style.opacity='1'; chip.style.transform='translateY(0)'; });
        }
      }
    }, 260);
  };

})();

/* ═══════════════════════════════════════════
   WFM — WORKFORCE MANAGEMENT COMMAND CENTER
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── SET TODAY'S DATE ── */
  const dateEl = document.getElementById('wfmDate');
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* ── VIEW TOGGLE ── */
  const toggleBtns = document.querySelectorAll('.wfm-toggle-btn');
  const views      = document.querySelectorAll('.wfm-view');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.wfmview;
      toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.wfmview === key));
      views.forEach(v => v.classList.toggle('active', v.id === 'wfm-view-' + key));
    });
  });

  /* ── STAT COUNT-UP ── */
  document.querySelectorAll('[data-wfm-count]').forEach(el => {
    const target = parseFloat(el.dataset.wfmCount);
    const suffix = el.dataset.wfmSuffix || '';
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ── SHIFT PROGRESS BAR (removed — employee view redesigned) ── */

  /* ── ROTATING AI CHIP TEXT ── */
  const aiMessages = [
    'Move 2 employees to evening shift',
    'Warehouse understaffed — 3 open slots',
    'Approve overtime? Support team flagged',
    'Auto-balance Production roster?',
    'Shift conflict detected — Tue Production'
  ];
  const aiText = document.getElementById('wfmAiText');
  const aiChip = document.getElementById('wfmAiChip');
  if (aiText && aiChip) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % aiMessages.length;
      aiText.style.opacity = '0';
      setTimeout(() => {
        aiText.textContent = aiMessages[idx];
        aiText.style.opacity = '1';
      }, 300);
    }, 4000);
    aiText.style.transition = 'opacity .3s ease';
  }

  /* ── SHIFT BLOCK HOVER ACTIONS ── */
  document.querySelectorAll('.wfm-shift').forEach(shift => {
    shift.addEventListener('click', () => {
      // Brief visual feedback on click
      shift.style.transform = 'scale(0.96)';
      setTimeout(() => { shift.style.transform = ''; }, 150);
    });
  });

  /* ── SUGGESTION BUTTON FEEDBACK ── */
  document.querySelectorAll('.wfm-suggestion').forEach(btn => {
    btn.addEventListener('click', function () {
      const orig = this.innerHTML;
      this.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Done';
      this.style.color = 'var(--green)';
      this.style.borderColor = 'rgba(16,185,129,.3)';
      this.style.background = '#f0fdf4';
      setTimeout(() => {
        this.innerHTML = orig;
        this.style.color = '';
        this.style.borderColor = '';
        this.style.background = '';
      }, 2000);
    });
  });

  /* ── ACTION CARD FEEDBACK ── */
  document.querySelectorAll('.wfm-action-card').forEach(card => {
    card.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  /* ── ADMIN DASHBOARD: Animate bars & arcs on scroll ── */
  const admSection = document.querySelector('.wfm');
  if (admSection) {
    const admIO = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      admIO.disconnect();

      // Attendance bars (admin)
      document.querySelectorAll('.adm-att-bar').forEach((bar, i) => {
        const targetH = bar.style.getPropertyValue('--bh') || '30%';
        bar.style.setProperty('--bh', '0%');
        setTimeout(() => { bar.style.setProperty('--bh', targetH); }, 200 + i * 80);
      });

      // Premise bars (admin)
      document.querySelectorAll('.adm-premise-bar').forEach((bar, i) => {
        const targetW = bar.style.getPropertyValue('--pw') || '50%';
        bar.style.setProperty('--pw', '0%');
        setTimeout(() => { bar.style.setProperty('--pw', targetW); }, 300 + i * 150);
      });

      // Team summary bars (admin)
      document.querySelectorAll('.adm-team-bar').forEach((bar, i) => {
        const targetW = bar.style.getPropertyValue('--tw') || '0%';
        bar.style.setProperty('--tw', '0%');
        setTimeout(() => { bar.style.setProperty('--tw', targetW); }, 300 + i * 100);
      });

      // Employee view bar chart
      document.querySelectorAll('.emp-bc-bar').forEach((bar, i) => {
        const targetH = bar.style.getPropertyValue('--bh') || '0%';
        bar.style.setProperty('--bh', '0%');
        setTimeout(() => { bar.style.setProperty('--bh', targetH); }, 250 + i * 70);
      });

      // Employee progress fill
      const pf = document.getElementById('empProgressFill');
      if (pf) { pf.style.width = '0%'; setTimeout(() => { pf.style.width = '33%'; }, 400); }

    }, { threshold: 0.25 });
    admIO.observe(admSection);
  }

})();

/* ══════════════════════════════════════════════════════════
   PAYROLL SECTION — Count-up on scroll
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function payCountUp(el, target, suffix, duration) {
    const isFloat = target % 1 !== 0;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (isFloat ? (e * target).toFixed(1) : Math.floor(e * target)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const paySection = document.querySelector('.payroll');
  if (!paySection) return;

  const payIO = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    payIO.disconnect();

    document.querySelectorAll('[data-pay-count]').forEach(el => {
      const target = parseFloat(el.dataset.payCount);
      const suffix = el.dataset.paySuffix || '';
      payCountUp(el, target, suffix, 1600);
    });

  }, { threshold: 0.3 });

  payIO.observe(paySection);
})();

/* ══════════════════════════════════════════════════════════
   FIELD FORCE TRACKING — Interactions
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const fftSection = document.querySelector('.fft');
  if (!fftSection) return;

  /* ── Count-up on scroll ── */
  function fftCountUp(el, target, suffix, dur) {
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const fftIO = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    fftIO.disconnect();

    document.querySelectorAll('[data-fft-count]').forEach(el => {
      const target = parseFloat(el.dataset.fftCount);
      const suffix = el.dataset.fftSuffix || '';
      fftCountUp(el, target, suffix, 1600);
    });

    /* Restart route draw animation */
    const route = document.getElementById('fftRoute');
    if (route) {
      route.style.animation = 'none';
      route.getBoundingClientRect(); // reflow
      route.style.animation = 'fftDrawRoute 2.5s ease forwards';
    }

  }, { threshold: 0.25 });
  fftIO.observe(fftSection);

  /* ── Subtle pin drift animation ── */
  const pins = [
    { id: 'fftPinSales',    baseTop: 42, baseLeft: 30 },
    { id: 'fftPinService',  baseTop: 20, baseLeft: 60 },
    { id: 'fftPinDelivery', baseTop: 62, baseLeft: 50 },
    { id: 'fftPinInspect',  baseTop: 30, baseLeft: 18 },
  ];

  pins.forEach(({ id, baseTop, baseLeft }, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    let t = i * 1.2;
    const drift = () => {
      t += 0.012;
      const dy = Math.sin(t) * 1.8;
      const dx = Math.cos(t * 0.7) * 1.2;
      el.style.top  = (baseTop  + dy) + '%';
      el.style.left = (baseLeft + dx) + '%';
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  });

  /* ── Proof panel pulse ── */
  const proofPanel = document.getElementById('fftProofPanel');
  if (proofPanel) {
    setInterval(() => {
      proofPanel.style.boxShadow = '0 6px 24px rgba(37,99,235,.25)';
      setTimeout(() => {
        proofPanel.style.boxShadow = '0 6px 24px rgba(15,31,75,.14)';
      }, 600);
    }, 5000);
  }

})();


/* ═══════════════════════════════════════════════════════════
   PREMIUM UPGRADE — navik SaaS polish
   ═══════════════════════════════════════════════════════════ */

/* ── ATTENTION STRIP DISMISS ── */
(function () {
  const strip = document.getElementById('attentionStrip');
  if (!strip) return;
  const dismissed = sessionStorage.getItem('navik_strip_dismissed');
  if (dismissed) { strip.style.display = 'none'; return; }
  strip.style.cursor = 'pointer';
  strip.title = 'Click to dismiss';
  strip.addEventListener('click', e => {
    if (e.target.tagName === 'A') return; // let links pass through
    strip.style.transition = 'max-height .3s ease, opacity .3s ease, padding .3s ease';
    strip.style.overflow = 'hidden';
    strip.style.maxHeight = strip.offsetHeight + 'px';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      strip.style.maxHeight = '0';
      strip.style.opacity = '0';
      strip.style.padding = '0';
    }));
    strip.addEventListener('transitionend', () => {
      strip.style.display = 'none';
      sessionStorage.setItem('navik_strip_dismissed', '1');
      applyLayoutOffsets(); // re-calc navbar/hero offsets now strip is gone
    }, { once: true });
  });
})();

/* ── CARD MOUSE-GLOW (desktop only) ── */
if (!IS_MOBILE() && !REDUCED) {
  document.querySelectorAll('.industry-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--glow-x', x);
      card.style.setProperty('--glow-y', y);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });
}

/* ── HERO TRUST AVATAR COUNTER ── */
(function () {
  const avatars = document.querySelectorAll('.hero-trust-avatar');
  const names   = ['VP','SR','AK','MN','RV','PS'];
  avatars.forEach((av, i) => {
    if (!av.textContent.trim()) av.textContent = names[i] || '??';
  });
})();

/* ── SECTION-ENTER FADE for dark sections ── */
if (!IS_MOBILE() && !REDUCED) {
  const darkSections = document.querySelectorAll('.payroll, .multipunch, .cta-section');
  const darkIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity .5s ease';
        e.target.style.opacity = '1';
        darkIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  darkSections.forEach(s => {
    s.style.opacity = '0';
    darkIO.observe(s);
  });
}

/* ── SMOOTH NAVBAR HEIGHT COMPENSATION — handled by applyLayoutOffsets above ── */

/* ── PREMIUM BUTTON RIPPLE (touch-friendly) ── */
document.querySelectorAll('.btn-primary, .btn-ghost-dark, .btn-nav-cta').forEach(btn => {
  btn.addEventListener('pointerdown', function (e) {
    const r = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(r.width, r.height) * 2;
    Object.assign(ripple.style, {
      position:     'absolute',
      width:        size + 'px',
      height:       size + 'px',
      left:         (e.clientX - r.left - size / 2) + 'px',
      top:          (e.clientY - r.top  - size / 2) + 'px',
      background:   'rgba(255,255,255,0.18)',
      borderRadius: '50%',
      transform:    'scale(0)',
      pointerEvents:'none',
      transition:   'transform .5s ease, opacity .5s ease',
      opacity:      '1',
    });
    if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity   = '0';
    }));
    ripple.addEventListener('transitionend', () => ripple.remove(), { once: true });
  });
});

/* ── TESTI CARD — subtle tilt on hover (desktop) ── */
if (!IS_MOBILE() && !REDUCED) {
  document.querySelectorAll('.testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width  - 0.5;
      const dy = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
      card.style.transform  = 'translateY(0) rotateX(0) rotateY(0)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .15s ease';
    });
  });
}

/* ── INDUSTRY CARD — tilt ── */
if (!IS_MOBILE() && !REDUCED) {
  document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width  - 0.5;
      const dy = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
      card.style.setProperty('--glow-x', ((dx + 0.5) * 100).toFixed(1) + '%');
      card.style.setProperty('--glow-y', ((dy + 0.5) * 100).toFixed(1) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease, border-color .4s ease';
      card.style.transform  = 'translateY(0) rotateX(0) rotateY(0)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .15s ease';
    });
  });
}

/* ── PROB CARD HOVER GLOW ── */
if (!IS_MOBILE() && !REDUCED) {
  document.querySelectorAll('.prob-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y  = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, #10203a 0%, #0b1525 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}

console.info('%cnavik premium upgrade loaded ✓', 'color:#3b82f6;font-weight:700;font-size:12px');

/* ═══════════════════════════════════════════════════════════
   BLOG ROUTING — Integrated Hash Navigation
   Handles #/blog navigation from homepage
   ═══════════════════════════════════════════════════════════ */

function initBlogRouting() {
  // Load blog-hash-router if not already loaded
  if (typeof BlogHashRouter === 'undefined') {
    const script = document.createElement('script');
    script.src = 'blog-hash-router.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

// Check for blog route on load
function handleBlogNavigation() {
  const hash = window.location.hash;
  if (hash === '#/blog' || hash === '#/blog/') {
    // Blog router will handle this automatically once loaded
    initBlogRouting();
  }
}

// Listen for hash changes
window.addEventListener('hashchange', handleBlogNavigation);

// Check on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleBlogNavigation);
} else {
  handleBlogNavigation();
}

console.info('%cBlog routing initialized ✓', 'color:#3b82f6;font-weight:700;font-size:12px');
