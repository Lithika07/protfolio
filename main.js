document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ────────────────────────────────────────
  const cursor = document.getElementById('ls-cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function anim() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(anim);
    })();
    document.querySelectorAll('a, button, .proj-card, .tl-card, .pub-card, .ach-card, .lead-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      setTimeout(() => cursor.classList.remove('cursor-click'), 200);
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ── Nav scroll shadow ────────────────────────────────────
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile hamburger ─────────────────────────────────────
  const burger = document.getElementById('nav-burger');
  const overlay = document.getElementById('mob-overlay');
  const closeBtn = document.getElementById('mob-close');

  function openMob() {
    overlay.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMob() {
    overlay.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', openMob);
  if (closeBtn) closeBtn.addEventListener('click', closeMob);
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', closeMob);
  });

  // ── Scroll Reveal — Sections ─────────────────────────────
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); sectionObs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => sectionObs.observe(el));

  // ── Scroll Reveal — Cards (staggered) ────────────────────
  const cardSelectors = '.tl-entry, .proj-card, .stack-group, .pub-card, .ach-card, .acad-item, .lead-card';
  const cardEls = document.querySelectorAll(cardSelectors);

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger by index within the visible batch
        const delay = (i % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('anim-in');
        }, delay);
        cardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cardEls.forEach(el => cardObs.observe(el));

  // ── Active Nav Link on Scroll ────────────────────────────
  const navLinks = document.querySelectorAll('.nav-item[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const linkObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + e.target.id) a.classList.add('active');
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => linkObs.observe(s));

  // ── Contact Form Status ──────────────────────────────────
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', () => {
      status.textContent = 'Sending your message...';
      status.style.color = 'var(--blue)';
    });
  }

  // ── Tab Title Cycle ──────────────────────────────────────
  const titles = [
    'Lithika Saravanakumar — Portfolio',
    'UAV Navigation · Robotics · AI/ML',
    'IIT-GN HCR Lab · Vicon · OpenSim',
    'Open to Collaborations ◉'
  ];
  let tIdx = 0;
  setInterval(() => {
    tIdx = (tIdx + 1) % titles.length;
    document.title = titles[tIdx];
  }, 3500);

  // ── Hero scroll cue hide on scroll ──────────────────────
  const scrollCue = document.querySelector('.hero-scroll-cue');
  if (scrollCue) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollCue.style.opacity = '0';
      } else {
        scrollCue.style.opacity = '';
      }
    }, { passive: true });
  }

  // ── Vicon marker stagger fix for Safari ─────────────────
  // Already handled by CSS animation-delay on .vm nth-of-type
  // This is a no-op safety call for older browsers
  document.querySelectorAll('.vm').forEach((vm, i) => {
    vm.style.animationDelay = (i * 0.4) + 's';
  });

});
