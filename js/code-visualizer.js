/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Code Visualizer
   Interactive code blocks with click-to-explain tooltips
   ══════════════════════════════════════════════════════════ */

const CodeVisualizer = {

  /* ─── Initialize all interactive code blocks ─── */
  init() {
    document.querySelectorAll('.interactive-code').forEach(block => {
      this.setupInteractiveCode(block);
    });
  },

  /* ─── Setup click-to-explain on annotated code ─── */
  setupInteractiveCode(container) {
    const annotations = container.querySelectorAll('[data-explain]');

    annotations.forEach(el => {
      el.classList.add('highlighted');
      el.style.cursor = 'pointer';

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        // Remove previous active
        container.querySelectorAll('.highlighted.active').forEach(a => a.classList.remove('active'));
        el.classList.add('active');

        const text = el.getAttribute('data-explain');
        const category = el.getAttribute('data-category') || 'info';
        this.showExplanation(container, text, category, el);
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      container.querySelectorAll('.highlighted.active').forEach(a => a.classList.remove('active'));
      const panel = container.querySelector('.explain-panel');
      if (panel) panel.classList.add('hidden');
    });
  },

  /* ─── Show explanation panel ─── */
  showExplanation(container, text, category, targetEl) {
    let panel = container.querySelector('.explain-panel');

    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'explain-panel';
      container.appendChild(panel);
    }

    const colors = {
      keyword: { bg: 'rgba(255,123,114,0.1)', border: 'var(--syn-keyword)', icon: '🔴' },
      type: { bg: 'rgba(121,192,255,0.1)', border: 'var(--syn-type)', icon: '🔵' },
      method: { bg: 'rgba(210,168,255,0.1)', border: 'var(--syn-method)', icon: '🟣' },
      variable: { bg: 'rgba(255,166,87,0.1)', border: 'var(--syn-variable)', icon: '🟠' },
      annotation: { bg: 'rgba(126,231,135,0.1)', border: 'var(--syn-annotation)', icon: '🟢' },
      string: { bg: 'rgba(165,214,255,0.1)', border: 'var(--syn-string)', icon: '🩵' },
      comment: { bg: 'rgba(139,148,158,0.1)', border: 'var(--syn-comment)', icon: '⬜' },
      info: { bg: 'rgba(88,166,255,0.1)', border: 'var(--accent-primary)', icon: '💡' },
    };

    const c = colors[category] || colors.info;

    panel.innerHTML = `
      <div style="background:${c.bg}; border:1px solid ${c.border}; border-radius:var(--radius-md); padding:var(--space-md); font-size:0.9rem; line-height:1.6; animation: fadeInUp 0.3s ease;">
        <span>${c.icon}</span> ${text}
      </div>
    `;
    panel.classList.remove('hidden');
    panel.style.marginTop = '12px';
  },

  /* ─── Create a full interactive code block ─── */
  createCodeBlock(options) {
    const {
      containerId,
      fileName = 'Program.cs',
      language = 'csharp',
      code,
      output = null,
      annotations = [],
      showLegend = true,
    } = options;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Build annotated code
    let codeHTML = this.escapeHTML(code);

    // Apply annotations (reverse order to preserve indices)
    const sortedAnnotations = [...annotations].sort((a, b) => b.start - a.start);
    sortedAnnotations.forEach(ann => {
      const before = codeHTML.substring(0, ann.start);
      const target = codeHTML.substring(ann.start, ann.end);
      const after = codeHTML.substring(ann.end);
      codeHTML = `${before}<span class="highlighted" data-explain="${this.escapeAttr(ann.explain)}" data-category="${ann.category || 'info'}" style="color:var(--syn-${ann.category || 'keyword'})">${target}</span>${after}`;
    });

    const legendItems = showLegend ? `
      <div class="color-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-keyword)"></span> คำสั่งหลัก</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-type)"></span> ชนิดข้อมูล</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-method)"></span> Method</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-variable)"></span> ตัวแปร</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-annotation)"></span> Attribute</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-string)"></span> ข้อความ</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--syn-comment)"></span> Comment</div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="code-block-wrapper interactive-code">
        <div class="code-block-header">
          <div class="file-info">
            <span class="file-icon">📄</span>
            <span>${fileName}</span>
          </div>
          <button class="copy-btn" onclick="App.initCodeCopy()">📋 Copy</button>
        </div>
        <div class="code-block-body">
          <pre class="language-${language}"><code>${codeHTML}</code></pre>
        </div>
        ${output !== null ? `
          <div class="code-block-output">
            <span class="output-label">▶ Output:</span>
            <span class="output-text">${this.escapeHTML(output)}</span>
          </div>
        ` : ''}
        ${legendItems}
        <div class="explain-panel hidden"></div>
      </div>
    `;

    // Setup interactivity
    this.setupInteractiveCode(container.querySelector('.interactive-code'));

    // Highlight
    if (typeof Prism !== 'undefined') Prism.highlightAll();
  },

  /* ─── Utilities ─── */
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
};

document.addEventListener('DOMContentLoaded', () => CodeVisualizer.init());
