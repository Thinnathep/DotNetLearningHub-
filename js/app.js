/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Main Application Logic
   Navigation, Theme, Global Event Handlers
   ══════════════════════════════════════════════════════════ */

const App = {
  init() {
    this.initSidebar();
    this.initScrollReveal();
    this.initCodeCopy();
    this.initAccordions();
    this.initTabs();
    this.setActiveSidebarLink();
    this.initMermaid();
    this.registerServiceWorker();

    // Load progress data
    if (typeof Progress !== 'undefined') {
      Progress.init();
      this.updateHeaderXP();
    }
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swPath = window.location.pathname.includes('/pages/') ? '../sw.js' : './sw.js';
        navigator.serviceWorker.register(swPath).catch(() => {});
      });
    }
  },

  /* ─── Sidebar Toggle (Mobile) ─── */
  initSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.site-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (hamburger && sidebar) {
      hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
        });
      }

      // Close sidebar on link click (mobile)
      sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 1024) {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
          }
        });
      });
    }
  },

  /* ─── Scroll Reveal Animation ─── */
  initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  },

  /* ─── Code Copy Button ─── */
  initCodeCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const codeBlock = btn.closest('.code-block-wrapper');
        const code = codeBlock?.querySelector('code');
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent);
          const original = btn.textContent;
          btn.textContent = '✓ คัดลอกแล้ว';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        } catch {
          // Fallback for older browsers
          const range = document.createRange();
          range.selectNodeContents(code);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand('copy');
          sel.removeAllRanges();
          btn.textContent = '✓ คัดลอกแล้ว';
          setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
        }
      });
    });
  },

  /* ─── Accordion ─── */
  initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const expanded = trigger.getAttribute('aria-expanded') === 'true';

        trigger.setAttribute('aria-expanded', !expanded);

        if (expanded) {
          content.style.maxHeight = '0';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  },

  /* ─── Tabs ─── */
  initTabs() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('.tab-btn');
      const container = tabGroup.parentElement;
      const contents = container.querySelectorAll('.tab-content');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));

          btn.classList.add('active');
          const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
          if (targetContent) targetContent.classList.add('active');
        });
      });
    });
  },

  /* ─── Set Active Sidebar Link ─── */
  setActiveSidebarLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop();
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  },

  /* ─── Mermaid.js Init ─── */
  initMermaid() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#21262d',
          primaryTextColor: '#e6edf3',
          primaryBorderColor: '#30363d',
          lineColor: '#58a6ff',
          secondaryColor: '#161b22',
          tertiaryColor: '#0d1117',
          fontFamily: "'Noto Sans Thai', 'Outfit', sans-serif",
          fontSize: '14px',
        }
      });
    }
  },

  /* ─── Update Header XP ─── */
  updateHeaderXP() {
    const xpEl = document.querySelector('.xp-value');
    if (xpEl && typeof Progress !== 'undefined') {
      xpEl.textContent = Progress.getTotalXP();
    }
  },

  /* ─── Show XP Float Animation ─── */
  showXPGain(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${amount} XP`;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 1200);
    this.updateHeaderXP();
  },

  /* ─── Smooth Section Navigation ─── */
  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

/* ─── Initialize on DOM Ready ─── */
document.addEventListener('DOMContentLoaded', () => App.init());
