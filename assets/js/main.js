/* =========================================================
   Noamaan Consultancy Services — interactions + WebGL 3D
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  const nav = document.querySelector('header.nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (burger) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1600; const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const ans = item.querySelector('.faq-a');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });

  /* ---------- Tilt cards ---------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8, speed: 500, glare: true, 'max-glare': 0.18, scale: 1.02, gyroscope: false
    });
  }

  /* ---------- Contact form (mailto fallback) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const d = new FormData(form);
      const subject = encodeURIComponent('New enquiry — ' + (d.get('service') || 'General'));
      const body = encodeURIComponent(
        `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')}\nService: ${d.get('service')}\n\nMessage:\n${d.get('message')}`
      );
      window.location.href = `mailto:hello@noamaanconsultancy.in?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Footer year ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* =======================================================
     WebGL 3D background — floating crystalline network
     (Three.js, MIT). Gracefully degrades if unsupported.
     ======================================================= */
  const canvas = document.getElementById('bg-canvas');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || !window.THREE || prefersReduced) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return; }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 18;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const GOLD = new THREE.Color(0xd8b45e);
  const BLUE = new THREE.Color(0x4a6bd6);

  /* --- Particle field --- */
  const COUNT = window.innerWidth < 700 ? 90 : 170;
  const positions = new Float32Array(COUNT * 3);
  const seeds = [];
  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * 42;
    const y = (Math.random() - 0.5) * 26;
    const z = (Math.random() - 0.5) * 22;
    positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
    seeds.push({ x, y, z, sp: 0.2 + Math.random() * 0.6, ph: Math.random() * Math.PI * 2 });
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const sprite = makeGlow();
  const pMat = new THREE.PointsMaterial({
    size: 0.9, map: sprite, color: GOLD, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  /* --- Connecting lines --- */
  const lineGeo = new THREE.BufferGeometry();
  const lineMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending });
  const lineSeg = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineSeg);

  /* --- Rotating wireframe icosahedrons (crystals) --- */
  const crystals = [];
  const crystalDefs = [
    { r: 5.5, pos: [-11, 4, -4], col: GOLD, sp: 0.06 },
    { r: 3.6, pos: [12, -5, -2], col: BLUE, sp: -0.08 },
    { r: 2.4, pos: [8, 6, 2], col: GOLD, sp: 0.11 }
  ];
  crystalDefs.forEach(d => {
    const geo = new THREE.IcosahedronGeometry(d.r, 1);
    const mat = new THREE.MeshBasicMaterial({ color: d.col, wireframe: true, transparent: true, opacity: 0.18 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...d.pos);
    mesh.userData.sp = d.sp;
    scene.add(mesh);
    crystals.push(mesh);
  });

  /* --- Mouse parallax --- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5);
    mouse.ty = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  const clock = new THREE.Clock();
  const MAX_DIST = 5.2;

  function animate() {
    const t = clock.getElapsedTime();
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      pos[i * 3]     = s.x + Math.sin(t * s.sp + s.ph) * 1.4;
      pos[i * 3 + 1] = s.y + Math.cos(t * s.sp * 0.8 + s.ph) * 1.4;
      pos[i * 3 + 2] = s.z + Math.sin(t * s.sp * 0.5 + s.ph) * 1.0;
    }
    pGeo.attributes.position.needsUpdate = true;

    // rebuild nearby links (throttled)
    if (Math.floor(t * 30) % 2 === 0) {
      const linePos = [];
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < MAX_DIST) {
            linePos.push(pos[i*3],pos[i*3+1],pos[i*3+2], pos[j*3],pos[j*3+1],pos[j*3+2]);
          }
        }
      }
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    }

    crystals.forEach(c => { c.rotation.x += c.userData.sp * 0.01; c.rotation.y += c.userData.sp * 0.013; });

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    camera.position.x = mouse.x * 4;
    camera.position.y = -mouse.y * 3;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* radial glow sprite for particles */
  function makeGlow() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(232,200,119,0.9)');
    grd.addColorStop(1, 'rgba(232,200,119,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
  }
})();
