/* ═══════════════════════════════════════════════
   MAIN INTERACTIVITY — Sanjana Narayan Naik Portfolio
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ─── 1. PRELOADER DISMISSAL ─── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('done');
        setTimeout(() => {
          const pf = document.getElementById('photo-frame');
          if (pf) pf.classList.add('photo-active');
        }, 300);
      }, 1400);
    });
    // Fallback if load already fired
    setTimeout(() => {
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done');
        const pf = document.getElementById('photo-frame');
        if (pf) pf.classList.add('photo-active');
      }
    }, 2500);
  }

  /* ─── 2. SCROLL PROGRESS BAR ─── */
  const scrollBar = document.getElementById('scroll-progress');
  if (scrollBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      scrollBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }, { passive: true });
  }

  /* ─── 3. ACTIVE NAVIGATION LINK HIGHLIGHTING ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop) {
          current = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === current);
      });
    }, { passive: true });
  }

  /* ─── 4. MOBILE HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ─── 5. SCROLL REVEAL ANIMATION ─── */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 40);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    revealElements.forEach(el => revealObs.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ─── 6. BACK TO TOP BUTTON ─── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── 7. TRINETRA THREAT SIMULATION DEMO ─── */
  const threatDemo = document.getElementById('threat-demo');
  if (threatDemo && 'IntersectionObserver' in window) {
    let animated = false;
    const threatObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateThreatDemo();
        threatObs.unobserve(entries[0].target);
      }
    }, { threshold: 0.3 });

    threatObs.observe(threatDemo);
  }

  function animateThreatDemo() {
    const fill = document.getElementById('threat-bar-fill');
    const score = document.getElementById('threat-score');
    if (!fill || !score) return;

    let pct = 0;
    const target = 87;

    setTimeout(() => {
      fill.style.width = target + '%';
    }, 300);

    const interval = setInterval(() => {
      pct += 1;
      if (pct >= target) {
        pct = target;
        clearInterval(interval);
      }
      score.textContent = pct + '%';
    }, 20);
  }

  /* ─── 8. TRINETRA RADAR EYE CANVAS ─── */
  (function initRadarCanvas() {
    const canvas = document.getElementById('trinetra-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W, H, cx, cy;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      cx = W / 2;
      cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 40 + Math.random() * 100,
        speed: (Math.random() - 0.5) * 0.008,
        size: Math.random() * 1.5 + 0.4,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    function draw() {
      time += 0.016;
      ctx.clearRect(0, 0, W, H);
      const baseR = Math.min(W, H) / 2 - 12;

      // Outer static ring
      ctx.beginPath();
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating dashed ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.15);
      ctx.setLineDash([6, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, baseR - 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Inner segmented ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.1);
      ctx.setLineDash([3, 18]);
      ctx.beginPath();
      ctx.arc(0, 0, baseR - 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Scanning Radar Beam
      ctx.save();
      ctx.translate(cx, cy);
      const grad = ctx.createConicGradient(time * 0.8, 0, 0);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      grad.addColorStop(0.08, 'rgba(56, 189, 248, 0)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(0, 0, baseR - 12, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Core Pulsing Glow
      const coreR = 4 + Math.sin(time * 2) * 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.fill();

      // Particles
      particles.forEach(p => {
        p.angle += p.speed;
        p.pulse += 0.03;
        const d = p.dist + Math.sin(p.pulse) * 6;
        const px = cx + Math.cos(p.angle) * d;
        const py = cy + Math.sin(p.angle) * d;
        
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + Math.sin(p.pulse) * 0.3})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ─── 9. PHOTO FRAME TILT & CANVAS ─── */
  (function initPhotoFrameCanvas() {
    const canvas = document.getElementById('pf-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = 300, H = 300;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2;

    const dots = [];
    for (let i = 0; i < 24; i++) {
      dots.push({
        a: Math.random() * Math.PI * 2,
        r: 85 + Math.random() * 45,
        speed: (Math.random() - 0.5) * 0.01,
        size: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.a += d.speed;
        d.phase += 0.02;
        const r = d.r + Math.sin(d.phase) * 5;
        const x = cx + Math.cos(d.a) * r;
        const y = cy + Math.sin(d.a) * r;
        
        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.3 + Math.sin(d.phase) * 0.3})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();

    // 3D tilt effect on mouse hover
    const frame = document.getElementById('photo-frame');
    const wrap = frame?.querySelector('.pf-wrap');
    if (frame && wrap) {
      frame.addEventListener('mousemove', (e) => {
        const r = frame.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        wrap.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
      });
      frame.addEventListener('mouseleave', () => {
        wrap.style.transform = 'rotateY(0) rotateX(0)';
      });
    }
  })();

  /* ─── 10. COMMAND PALETTE ─── */
  const cmdOverlay = document.getElementById('cmd-overlay');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');
  const cmdTriggerBtn = document.getElementById('cmd-trigger-btn');

  const commands = [
    { icon: '👤', text: 'About Me', hint: 'Jump to profile overview', target: '#about' },
    { icon: '⚡', text: 'Skills', hint: 'Technical stack & competencies', target: '#skills' },
    { icon: '🛡️', text: 'Trinetra AI', hint: 'Featured scam detection system', target: '#trinetra' },
    { icon: '💬', text: 'Secure Chat', hint: 'Trinetra AI messaging integration', target: 'https://secure-chat-two-green.vercel.app/chat?trinetra=linked', external: true },
    { icon: '🚀', text: 'Trinetra Live Demo', hint: 'trinetra-ai-ua5e.onrender.com', target: 'https://trinetra-ai-ua5e.onrender.com', external: true },
    { icon: '💻', text: 'Projects', hint: 'Email Phishing & SmartShop apps', target: '#projects' },
    { icon: '📄', text: 'Research Paper', hint: 'AI-Driven Scam Detection Publication', target: '#publication' },
    { icon: '🔗', text: 'View Publication DOI', hint: 'doi.org/10.51470/AI.2026.5.1.34', target: 'https://doi.org/10.51470/AI.2026.5.1.34', external: true },
    { icon: '🏆', text: 'Achievements', hint: 'Campus selections & awards', target: '#achievements' },
    { icon: '📜', text: 'Certifications', hint: 'NPTEL, IBM, Infosys & Udemy certs', target: '#certifications' },
    { icon: '🎪', text: 'Events & Hackathons', hint: 'Advitiya, IEEE, VTU Debugging', target: '#events' },
    { icon: '🎓', text: 'Education', hint: 'B.E. CSE, Class 12 & Class 10', target: '#education' },
    { icon: '🧠', text: 'DSA Practice', hint: 'Data structures & problem solving', target: '#dsa' },
    { icon: '✉️', text: 'Contact', hint: 'Email, phone & connections', target: '#contact' },
    { icon: '📄', text: 'View Resume PDF', hint: 'Open assets/resume.pdf in tab', target: 'assets/resume.pdf', external: true },
    { icon: '📥', text: 'Download Resume PDF', hint: 'Download assets/resume.pdf', target: 'assets/resume.pdf', download: true },
    { icon: '🌐', text: 'GitHub Profile', hint: 'github.com/Sanjana398-tech', target: 'https://github.com/Sanjana398-tech', external: true },
    { icon: '💼', text: 'LinkedIn Profile', hint: 'linkedin.com/in/sanjana-naik-91192b2ba', target: 'https://www.linkedin.com/in/sanjana-naik-91192b2ba', external: true },
    { icon: '🧩', text: 'LeetCode Profile', hint: 'leetcode.com/u/Naik_Sanjana/', target: 'https://leetcode.com/u/Naik_Sanjana/', external: true }
  ];

  let selectedIdx = 0;
  let filtered = [...commands];

  function openCmd() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('open');
    cmdInput.value = '';
    cmdInput.focus();
    filtered = [...commands];
    selectedIdx = 0;
    renderCmd();
  }

  function closeCmd() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.remove('open');
  }

  function renderCmd() {
    if (!cmdResults) return;
    cmdResults.innerHTML = filtered.map((c, i) =>
      `<div class="cmd-item${i === selectedIdx ? ' selected' : ''}" data-idx="${i}">
        <span class="cmd-item-icon">${c.icon}</span>
        <span class="cmd-item-text">${c.text}</span>
        <span class="cmd-item-hint">${c.hint}</span>
      </div>`
    ).join('');

    cmdResults.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.idx, 10);
        if (filtered[idx]) executeCmd(filtered[idx]);
      });
    });
  }

  function executeCmd(cmd) {
    closeCmd();
    if (cmd.download) {
      const a = document.createElement('a');
      a.href = cmd.target;
      a.download = 'Sanjana_Narayan_Naik_Resume.pdf';
      a.click();
    } else if (cmd.external) {
      window.open(cmd.target, '_blank', 'noopener,noreferrer');
    } else {
      const el = document.querySelector(cmd.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (cmdTriggerBtn) cmdTriggerBtn.addEventListener('click', openCmd);
  
  if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCmd();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', () => {
      const q = cmdInput.value.toLowerCase().trim();
      filtered = commands.filter(c => c.text.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
      selectedIdx = 0;
      renderCmd();
    });

    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, filtered.length - 1);
        renderCmd();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
        renderCmd();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) executeCmd(filtered[selectedIdx]);
      } else if (e.key === 'Escape') {
        closeCmd();
      }
    });
  }

  // Ctrl+K / Cmd+K Keyboard Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdOverlay && cmdOverlay.classList.contains('open')) {
        closeCmd();
      } else {
        openCmd();
      }
    }
    if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('open')) {
      closeCmd();
    }
  });

});
