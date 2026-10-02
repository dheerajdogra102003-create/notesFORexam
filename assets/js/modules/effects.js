/**
 * High-Tier Visual Effects & Cinematic Animation Engine (effects.js)
 * Features:
 * 1. Interactive Luminous Constellation Canvas with Velocity Response
 * 2. High-Speed Electric Data Packets shooting along connection nodes
 * 3. Linear / Aceternity Style 3D Card Spotlight & Parallax Tilt
 * 4. Magnetic Interactive Buttons with Fluid Spring Return
 * 5. Seamless Page-to-Page View Transitions Router (Zero White Flash)
 * 6. Floating Circular Progress Back-to-Top Widget with SVG Meter
 * 7. Page Visibility & Reduced-Motion Performance Controls
 */

let canvas = null;
let ctx = null;
let animationFrameId = null;
let particles = [];
let energyPackets = [];

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight * 0.35,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight * 0.35,
  prevX: window.innerWidth / 2,
  prevY: window.innerHeight * 0.35,
  vx: 0,
  vy: 0,
  speed: 0,
  isHovered: false
};

const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 24), 58);
const CONNECTION_DIST = 145;
const MOUSE_RADIUS = 190;

/**
 * Initializes the full high-level background, interactive systems, and page transitions
 */
export function initBackgroundSystem() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Build and inject DOM background layers
  createAtmosphericMarkup();

  // 2. Setup interactive canvas constellation & electric packets
  if (!prefersReducedMotion) {
    initConstellationCanvas();
  }

  // 3. Initialize 3D perspective card tilt with spotlight glow
  initInteractive3DCards(prefersReducedMotion);

  // 4. Initialize tactile magnetic buttons
  if (!prefersReducedMotion) {
    initMagneticButtons();
  }

  // 5. Initialize floating circular progress back-to-top button
  initBackToTopProgress();

  // 7. Track mouse coordinates with velocity calculation
  initMouseTracker();

  // 8. Lifecycle visibility management (pause when tab inactive)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (!prefersReducedMotion && canvas) {
      loop();
    }
  });
}

/**
 * Injects background DOM layers (Atmospheric Aurora Orbs, Technical Grid, Cyber Scan, and Glyphs)
 */
function createAtmosphericMarkup() {
  if (document.getElementById('bg-ambient-root')) return;

  const root = document.createElement('div');
  root.id = 'bg-ambient-root';
  root.className = 'bg-ambient-system';
  root.setAttribute('aria-hidden', 'true');

  root.innerHTML = `
    <!-- Layer 1: Vivid Atmospheric Aurora Light Waves -->
    <div class="aurora-orb aurora-orb-1"></div>
    <div class="aurora-orb aurora-orb-2"></div>
    <div class="aurora-orb aurora-orb-3"></div>
    <div class="aurora-orb aurora-orb-4"></div>

    <!-- Layer 2: Cyber-Clean Engineering Matrix Grid & Laser Scan -->
    <div class="technical-grid-layer"></div>
    <div class="cyber-scan-beam"></div>

    <!-- Layer 3: Ambient Floating Academic & Code Glyphs -->
    <div class="floating-glyphs-layer">
      <span class="floating-glyph">{ }</span>
      <span class="floating-glyph">&lt;/&gt;</span>
      <span class="floating-glyph">λ</span>
      <span class="floating-glyph">∫</span>
      <span class="floating-glyph">O(1)</span>
      <span class="floating-glyph">01</span>
    </div>

    <!-- Layer 4: Interactive Constellation & Energy Canvas -->
    <canvas id="ambient-canvas" class="ambient-canvas"></canvas>

    <!-- Layer 5: Interactive Liquid Cursor Spotlight -->
    <div class="cursor-ambient-spotlight" id="ambient-spotlight"></div>

    <!-- Layer 6: Seamless Page Transition Curtain -->
    <div class="page-transition-curtain" id="page-transition-curtain"></div>
  `;

  document.body.prepend(root);
}

/**
 * Initializes the particle mesh and constellation network on HTML5 Canvas
 */
function initConstellationCanvas() {
  canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  ctx = canvas.getContext('2d', { alpha: true });
  resizeCanvas();

  window.addEventListener('resize', debounce(resizeCanvas, 150));

  particles = [];
  energyPackets = [];

  const palette = [
    { r: 129, g: 140, b: 248 },  // Electric Indigo
    { r: 34, g: 211, b: 238 },   // Vivid Cyan
    { r: 168, g: 85, b: 247 },   // Radiant Purple
    { r: 244, g: 63, b: 94 }     // Neon Rose
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 2 + 1.2,
      baseRadius: Math.random() * 2 + 1.2,
      color: color,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.035 + 0.015
    });
  }

  loop();
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  if (ctx) ctx.scale(dpr, dpr);
}

/**
 * Animation loop for particles, constellation lines, electric packets, and mouse interactions
 */
function loop() {
  if (!ctx || !canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  // Smooth mouse LERP
  mouse.x += (mouse.targetX - mouse.x) * 0.09;
  mouse.y += (mouse.targetY - mouse.y) * 0.09;

  // Velocity calculation
  const dx = mouse.x - mouse.prevX;
  const dy = mouse.y - mouse.prevY;
  mouse.speed = Math.sqrt(dx * dx + dy * dy);
  mouse.prevX = mouse.x;
  mouse.prevY = mouse.y;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const lineBaseAlpha = isLight ? 0.045 : 0.14;

  // Occasionally spawn an energy packet along random connections
  if (Math.random() < 0.04 && energyPackets.length < 8) {
    const p1Idx = Math.floor(Math.random() * particles.length);
    const p1 = particles[p1Idx];
    // Find a close neighbor
    for (let j = 0; j < particles.length; j++) {
      if (j === p1Idx) continue;
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < CONNECTION_DIST) {
        energyPackets.push({
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          progress: 0,
          speed: Math.random() * 0.035 + 0.02,
          color: p1.color
        });
        break;
      }
    }
  }

  // 1. Draw connections between nearby particles
  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * lineBaseAlpha;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`;
        ctx.lineWidth = 0.85;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // 2. Connect particles to mouse cursor when nearby
    const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);

    if (mDist < MOUSE_RADIUS) {
      const mAlpha = (1 - mDist / MOUSE_RADIUS) * (isLight ? 0.1 : 0.32);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${mAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();

      // Gravitational push/pull away from cursor
      const pushFactor = Math.min(mouse.speed * 0.05 + 0.35, 1.2);
      p1.x += ((p1.x - mouse.x) / mDist) * pushFactor;
      p1.y += ((p1.y - mouse.y) / mDist) * pushFactor;
    }

    // 3. Move and wrap particles
    p1.x += p1.vx;
    p1.y += p1.vy;
    p1.pulse += p1.pulseSpeed;

    if (p1.x < -20) p1.x = width + 20;
    if (p1.x > width + 20) p1.x = -20;
    if (p1.y < -20) p1.y = height + 20;
    if (p1.y > height + 20) p1.y = -20;

    // 4. Draw particle glowing node
    const currentRadius = p1.baseRadius + Math.sin(p1.pulse) * 0.6;
    const dotAlpha = isLight ? 0.4 : 0.72;

    ctx.beginPath();
    ctx.arc(p1.x, p1.y, Math.max(currentRadius, 0.6), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${dotAlpha})`;
    ctx.shadowColor = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, 0.85)`;
    ctx.shadowBlur = isLight ? 5 : 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 5. Draw and advance electric energy packets
  for (let k = energyPackets.length - 1; k >= 0; k--) {
    const pkt = energyPackets[k];
    pkt.progress += pkt.speed;

    if (pkt.progress >= 1) {
      energyPackets.splice(k, 1);
      continue;
    }

    const curX = pkt.x1 + (pkt.x2 - pkt.x1) * pkt.progress;
    const curY = pkt.y1 + (pkt.y2 - pkt.y1) * pkt.progress;

    ctx.beginPath();
    ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 1)`;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 6. Update spotlight element coordinates & intensity
  const spotlight = document.getElementById('ambient-spotlight');
  if (spotlight) {
    spotlight.style.setProperty('--mouse-screen-x', `${mouse.x}px`);
    spotlight.style.setProperty('--mouse-screen-y', `${mouse.y}px`);
  }

  animationFrameId = requestAnimationFrame(loop);
}

/**
 * Tracks mouse position with smooth velocity dampening
 */
function initMouseTracker() {
  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isHovered = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.targetX = window.innerWidth / 2;
    mouse.targetY = window.innerHeight * 0.35;
    mouse.isHovered = false;
  }, { passive: true });
}

/**
 * Linear / Aceternity Style 3D Perspective Card Tilt & Spotlight Border Illumination
 */
export function initInteractive3DCards(reducedMotion = false) {
  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

  const attach3DToCards = () => {
    const cards = document.querySelectorAll('.subject-card, .stat-card');

    cards.forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      let bounds = null;

      const onEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const onMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        card.style.setProperty('--tilt-x', deltaX.toFixed(3));
        card.style.setProperty('--tilt-y', deltaY.toFixed(3));
        card.style.setProperty('--card-local-x', `${x}px`);
        card.style.setProperty('--card-local-y', `${y}px`);
      };

      const onLeave = () => {
        card.style.setProperty('--tilt-x', '0');
        card.style.setProperty('--tilt-y', '0');
        card.style.setProperty('--card-local-x', '-200px');
        card.style.setProperty('--card-local-y', '-200px');
        bounds = null;
      };

      card.addEventListener('pointerenter', onEnter, { passive: true });
      card.addEventListener('pointermove', onMove, { passive: true });
      card.addEventListener('pointerleave', onLeave, { passive: true });
    });
  };

  attach3DToCards();

  const container = document.getElementById('subjects-container');
  if (container) {
    const observer = new MutationObserver(() => {
      attach3DToCards();
    });
    observer.observe(container, { childList: true });
  }
}

/**
 * Tactile Magnetic Buttons: Elements gently pull toward the cursor when hovering nearby
 */
export function initMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const magneticTargets = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-icon, .brand-link');

  magneticTargets.forEach(el => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull distance
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}



/**
 * Floating Circular Progress Back-to-Top Button
 * Creates and updates a sleek floating button with an SVG circular progress meter
 */
export function initBackToTopProgress() {
  if (document.getElementById('back-to-top-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'back-to-top-btn';
  btn.className = 'back-to-top-widget';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.setAttribute('title', 'Back to top');

  btn.innerHTML = `
    <svg class="progress-ring" viewBox="0 0 52 52">
      <circle class="progress-ring-circle" cx="26" cy="26" r="23"></circle>
    </svg>
    <span class="back-to-top-arrow">↑</span>
  `;

  document.body.appendChild(btn);

  const circle = btn.querySelector('.progress-ring-circle');
  const circumference = 2 * Math.PI * 23; // ~144.5px
  if (circle) {
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  }

  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > 260) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }

    if (total > 0 && circle) {
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      const offset = circumference - (progress * circumference);
      circle.style.strokeDashoffset = `${offset}`;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
