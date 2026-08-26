/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Animation Controller
   Anime.js orchestration + Intersection Observer
   ══════════════════════════════════════════════════════════ */

const AnimationController = {

  init() {
    this.initScrollReveal();
    this.initCounters();
    this.initProgressBars();
    this.initTypewriter();
  },

  /* ─── Scroll Reveal (CSS-based, no library) ─── */
  initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay
          const delay = entry.target.dataset.delay || (index * 100);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  },

  /* ─── Animated Counters ─── */
  initCounters() {
    const counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  },

  animateCounter(el) {
    const target = parseInt(el.dataset.countTo) || 0;
    const duration = parseInt(el.dataset.countDuration) || 1500;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  },

  /* ─── Progress Bar Animation ─── */
  initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || '0';
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(el => {
      el.style.width = '0%';
      observer.observe(el);
    });
  },

  /* ─── Typewriter Effect ─── */
  initTypewriter() {
    document.querySelectorAll('.typewriter').forEach(el => {
      const text = el.textContent;
      const speed = parseInt(el.dataset.speed) || 50;
      el.textContent = '';
      el.style.visibility = 'visible';

      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };

      // Start when visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          type();
          observer.unobserve(el);
        }
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  },

  /* ─── Animate with Anime.js (if available) ─── */
  animate(targets, props) {
    if (typeof anime !== 'undefined') {
      return anime({ targets, ...props });
    }
    // CSS fallback
    document.querySelectorAll(targets).forEach(el => {
      el.classList.add('animate-fade-in-up');
    });
  },

  /* ─── Stagger children animation ─── */
  staggerIn(parentSelector, childSelector = '> *') {
    if (typeof anime !== 'undefined') {
      anime({
        targets: `${parentSelector} ${childSelector}`,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80),
        duration: 500,
        easing: 'easeOutCubic',
      });
    }
  },

  /* ─── Pulse glow effect ─── */
  pulseElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('animate-pulse-glow');
      setTimeout(() => el.classList.remove('animate-pulse-glow'), 2000);
    }
  },

  /* ─── Badge unlock animation ─── */
  showBadgeUnlock(badgeName, badgeEmoji) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; top:0; left:0; right:0; bottom:0; z-index:10000;
      display:flex; align-items:center; justify-content:center;
      background:rgba(0,0,0,0.7); backdrop-filter:blur(4px);
    `;
    overlay.innerHTML = `
      <div class="animate-bounce-in" style="text-align:center; padding:40px;">
        <div style="font-size:4rem; margin-bottom:16px;">${badgeEmoji}</div>
        <div style="font-family:var(--font-heading); font-size:1.5rem; font-weight:700; color:var(--accent-warning); margin-bottom:8px;">
          🏆 ปลดล็อค Achievement!
        </div>
        <div style="color:var(--text-secondary); font-size:1.1rem;">${badgeName}</div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
    setTimeout(() => overlay.remove(), 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => AnimationController.init());
