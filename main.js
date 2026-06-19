document.addEventListener("DOMContentLoaded", () => {

  // ── Boot Sequence ──────────────────────────────────────────
  const bootLines = [
    "INITIALIZING LS-HCR INTERFACE v2.0...",
    "LOADING OPERATOR PROFILE: LITHIKA SARAVANAKUMAR",
    "UAV SYSTEMS: ONLINE  |  MOTION CAPTURE: ONLINE",
    "VICON TRACKING: ACTIVE  |  DRONE LINK: ESTABLISHED",
    "IIT-GN HCR LAB × KARNAVATI UNIVERSITY — BRIDGE ACTIVE",
    "ALL SYSTEMS NOMINAL."
  ];
  const bootDiv  = document.getElementById('boot-text');
  const bootSeq  = document.getElementById('boot-sequence');
  let lineIdx = 0;
  let bootFallback;

  function typeLine() {
    if (lineIdx < bootLines.length) {
      const p = document.createElement('p');
      bootDiv.appendChild(p);
      let charIdx = 0;
      const str = bootLines[lineIdx];
      const iv = setInterval(() => {
        if (charIdx < str.length) { p.textContent += str[charIdx++]; }
        else { clearInterval(iv); lineIdx++; setTimeout(typeLine, 180); }
      }, 18);
    } else {
      clearTimeout(bootFallback);
      setTimeout(() => {
        bootSeq.classList.add('scanline-flash');
        setTimeout(() => { bootSeq.style.display = 'none'; }, 400);
      }, 400);
    }
  }

  if (window.innerWidth < 768) {
    bootSeq.style.display = 'none';
  } else {
    bootFallback = setTimeout(() => { bootSeq.style.display = 'none'; }, 5000);
    typeLine();
  }

  // ── Clock ──────────────────────────────────────────────────
  const clockEl = document.getElementById('zulu-clock');
  setInterval(() => {
    const n = new Date();
    clockEl.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
      .map(v => String(v).padStart(2,'0')).join(':');
  }, 1000);

  // ── Radar System ───────────────────────────────────────────
  const radar       = document.querySelector('.radar');
  const radarPanel  = document.getElementById('radar-readout');
  const readoutTitle= document.getElementById('readout-title');
  const readoutDesc = document.getElementById('readout-desc');

  const targets = [
    { id:"mission-001", x:25, y:30, name:"MISSION-001", desc:"Drone Sim Automation & Health Monitor" },
    { id:"mission-002", x:65, y:20, name:"MISSION-002", desc:"Autonomous UAV Docking (ISRO IRoC 2026)" },
    { id:"mission-003", x:76, y:56, name:"MISSION-003", desc:"VINS-Fusion Visual-Inertial Localization" },
    { id:"mission-004", x:30, y:72, name:"MISSION-004", desc:"Ardupilot Drone — Custom Hardware" },
    { id:"mission-005", x:55, y:76, name:"MISSION-005", desc:"Archon — AI Learning Platform" },
    { id:"assignments",  x:46, y:42, name:"FIELD DEPLOYMENTS", desc:"HCR Lab IIT-GN | Reude | BlackPapers" },
    { id:"research",     x:82, y:36, name:"INTEL REPORTS",  desc:"IEEE ICBDML-2026 Publications × 2" },
    { id:"command",      x:18, y:52, name:"COMMAND POSTS",  desc:"Drone MatrX Tech Lead | FlightX Founder" }
  ];

  targets.forEach(t => {
    const dot = document.createElement('div');
    dot.className = 'radar-dot';
    dot.style.left = `${t.x}%`;
    dot.style.top  = `${t.y}%`;

    dot.addEventListener('mouseenter', () => {
      radarPanel.classList.add('active');
      readoutTitle.textContent = `TARGET LOCKED: ${t.name}`;
      readoutDesc.textContent  = `PAYLOAD: ${t.desc}`;
      dot.style.boxShadow = '0 0 16px var(--tertiary-accent)';
    });
    dot.addEventListener('mouseleave', () => {
      radarPanel.classList.remove('active');
      readoutTitle.textContent = 'AWAITING LOCK...';
      readoutDesc.textContent  = 'Hover radar targets to initialize scan.';
      dot.style.boxShadow = '0 0 10px var(--tertiary-accent)';
    });
    dot.addEventListener('click', () => {
      dot.style.background = '#fff';
      dot.style.boxShadow  = '0 0 22px #fff';
      readoutTitle.textContent = 'ACQUIRING TARGET...';
      readoutDesc.textContent  = 'CALCULATING TRAJECTORY...';
      radarPanel.classList.add('active');
      setTimeout(() => {
        dot.style.background = 'var(--tertiary-accent)';
        dot.style.boxShadow  = '0 0 10px var(--tertiary-accent)';
        const el = document.getElementById(t.id);
        if (el) {
          el.scrollIntoView({ behavior:'smooth', block:'center' });
          setTimeout(() => {
            el.style.background   = 'rgba(199,36,255,0.1)';
            el.style.borderColor  = 'var(--primary-accent)';
            setTimeout(() => { el.style.background = ''; el.style.borderColor = ''; }, 900);
          }, 500);
        }
      }, 500);
    });
    radar.appendChild(dot);
  });

  // ── Data Flicker ───────────────────────────────────────────
  const flickerEls = document.querySelectorAll('.flicker');
  setInterval(() => {
    const el = flickerEls[Math.floor(Math.random() * flickerEls.length)];
    if (!el) return;
    const orig = el.getAttribute('data-val');
    el.textContent = Math.floor(Math.random() * 99);
    setTimeout(() => { el.textContent = orig; }, 110);
  }, 2800);

  // ── Scroll Reveal ──────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObs.observe(r));

  // ── Animated Skill Bars ────────────────────────────────────
  const skillMeters = document.querySelectorAll('.skill-meter[data-pct]');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const meter = e.target;
      const pct   = parseInt(meter.getAttribute('data-pct'), 10);
      const total = 12;
      const fill  = Math.round((pct / 100) * total);
      let cur = 0;
      meter.textContent = '░'.repeat(total);
      const iv = setInterval(() => {
        if (cur <= fill) {
          meter.textContent = '█'.repeat(cur) + '░'.repeat(total - cur);
          cur++;
        } else { clearInterval(iv); }
      }, 55);
      skillObs.unobserve(meter);
    });
  }, { threshold: 0.5 });
  skillMeters.forEach(m => skillObs.observe(m));

  // ── Comms Form ─────────────────────────────────────────────
  const form   = document.getElementById('comms-form');
  const status = document.getElementById('transmit-status');
  if (form) {
    form.addEventListener('submit', () => {
      status.textContent = 'UPLINKING TO HCR-KU RELAY...';
    });
  }

  // ── Tab Title Flicker ──────────────────────────────────────
  const titles = [
    'LS-HCR | OPERATOR: LITHIKA SARAVANAKUMAR',
    'LS-HCR | UAV NAV × EXOSKELETON RESEARCH',
    'LS-HCR | UPLINK ACTIVE ●'
  ];
  let tIdx = 0;
  setInterval(() => { tIdx = (tIdx + 1) % titles.length; document.title = titles[tIdx]; }, 3000);

  // ── Custom Cursor ──────────────────────────────────────────
  const cursor = document.getElementById('ls-cursor');
  if (cursor) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animCursor() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      requestAnimationFrame(animCursor);
    })();

    document.querySelectorAll('a, button, .radar-dot, .field-op-entry').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
    document.querySelectorAll('.mission-card, .assignment-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('cursor-hover'); cursor.classList.add('cursor-scanning'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('cursor-hover'); cursor.classList.remove('cursor-scanning'); });
    });
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      setTimeout(() => cursor.classList.remove('cursor-click'), 200);
    });
  }

  // ── Terminal Easter Egg ────────────────────────────────────
  const termOverlay = document.getElementById('terminal-overlay');
  const closeTerm   = document.getElementById('close-terminal');
  const termInput   = document.getElementById('terminal-input');
  const termOutput  = document.getElementById('terminal-output');

  function printTerm(text) {
    const p = document.createElement('p');
    p.textContent = text;
    termOutput.appendChild(p);
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  if (termOverlay) {
    document.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 't' &&
          document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA') {
        termOverlay.classList.add('active');
        termInput.focus();
      }
    });
    closeTerm.addEventListener('click', () => termOverlay.classList.remove('active'));

    termInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const cmd = termInput.value.trim().toLowerCase();
      printTerm(`LS-HCR:~$ ${cmd}`);
      termInput.value = '';

      switch (cmd) {
        case 'help':
          printTerm('AVAILABLE COMMANDS: whoami | vicon | drone | skills | research | missions | clear | exit');
          break;
        case 'whoami':
          printTerm('OPERATOR: LITHIKA SARAVANAKUMAR');
          printTerm('ROLE    : UAV NAV ENGINEER | ROBOTICS RESEARCHER | AI-ML DEVELOPER');
          printTerm('AFFIL   : KARNAVATI UNIVERSITY × IIT GANDHINAGAR — HCR LAB');
          printTerm('CGPA    : 9.0 | BATCH: 2027 | STATUS: ACTIVELY DEPLOYING');
          break;
        case 'vicon':
          printTerm('>> VICON MOTION CAPTURE SYSTEM — HCR LAB, IIT GANDHINAGAR');
          printTerm('   MARKERS      : 14 ACTIVE | CONFIG: CUSTOM (EXOSKELETON)');
          printTerm('   FREQUENCY    : 100 Hz   | TRACKING: NOMINAL');
          printTerm('   SUBJECT      : LOWER-LIMB EXOSKELETON');
          printTerm('   OPENSIM LINK : MUSCULOSKELETAL MODEL LOADED ✓');
          printTerm('   KINEMATICS   : JOINT-LEVEL ANALYSIS ACTIVE');
          break;
        case 'drone':
          printTerm('>> UAV SYSTEMS STATUS');
          printTerm('   ACTIVE MISSIONS : 5');
          printTerm('   DRONE MATRX     : 3 UNITS ONLINE | SWARM COORD: ACTIVE');
          printTerm('   VINS-FUSION SLAM: ONLINE | NON-GPS NAV: ENABLED');
          printTerm('   ISRO IROC 2026  : IN PROGRESS — PRECISION LANDING SYSTEM');
          printTerm('   ARDUPILOT HW    : PIXHAWK + ESP32 — FIELD TESTING');
          break;
        case 'skills':
          printTerm('>> ONBOARD SYSTEMS DIAGNOSTIC');
          printTerm('   [NOMINAL] Python/C++  92% | ROS2/MAVLink 88%');
          printTerm('   [NOMINAL] PyTorch/CV  85% | React/Node    80%');
          printTerm('   [NOMINAL] Vicon       75% | OpenSim       75%');
          printTerm('   ALL PRIMARY SUBSYSTEMS OPERATIONAL');
          break;
        case 'research':
          printTerm('>> INTELLIGENCE REPORTS');
          printTerm('   LS-R-001: Topological UAV Navigation — IEEE ICBDML-2026 [PRESENTED]');
          printTerm('            88% accuracy on EuRoC MAV | Reduced SLAM overhead');
          printTerm('   LS-R-002: ML Weather Forecasting    — IEEE ICBDML-2026 [PRESENTED]');
          printTerm('            Regression + Ensemble Learning | Hourly prediction');
          break;
        case 'missions':
          printTerm('>> MISSION LOG');
          printTerm('   M-001: Drone Sim Automation     [COMPLETE]');
          printTerm('   M-002: Autonomous UAV Docking   [ACTIVE DEV]');
          printTerm('   M-003: VINS-Fusion Localization [COMPLETE]');
          printTerm('   M-004: Ardupilot Custom Drone   [ACTIVE DEV]');
          printTerm('   M-005: Archon AI Platform       [COMPLETE]');
          break;
        case 'clear':
          termOutput.innerHTML = '';
          break;
        case 'exit':
          termOverlay.classList.remove('active');
          break;
        case '':
          break;
        default:
          printTerm(`Command not found: ${cmd} | Type 'help' for a list.`);
      }
    });
  }

  // ── Mobile Nav Active State ────────────────────────────────
  const sections      = document.querySelectorAll('section');
  const mobileLinks   = document.querySelectorAll('.mobile-nav-link');
  if (mobileLinks.length > 0) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          mobileLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${e.target.id}`) a.classList.add('active');
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => secObs.observe(s));
  }

});
