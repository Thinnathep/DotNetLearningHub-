/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Quiz Engine
   Supports: Multiple Choice, Fill-in-Blank, Code Ordering,
             Bug Hunt, Code Complete
   ══════════════════════════════════════════════════════════ */

const QuizEngine = {

  currentQuiz: null,
  currentIndex: 0,
  score: 0,
  answered: [],
  timer: null,
  timeLeft: 0,

  /* ─── Start Quiz ─── */
  start(containerId, questions, options = {}) {
    const container = document.getElementById(containerId);
    if (!container || !questions?.length) return;

    this.currentQuiz = {
      containerId,
      questions: options.shuffle ? this.shuffleArray([...questions]) : [...questions],
      options: {
        showTimer: options.showTimer || false,
        timePerQuestion: options.timePerQuestion || 30,
        showExplanation: options.showExplanation !== false,
        quizId: options.quizId || 'unnamed',
        onComplete: options.onComplete || null,
      }
    };

    this.currentIndex = 0;
    this.score = 0;
    this.answered = [];

    this.renderQuestion(container);
  },

  /* ─── Render Question ─── */
  renderQuestion(container) {
    const quiz = this.currentQuiz;
    const q = quiz.questions[this.currentIndex];
    if (!q) return this.showResults(container);

    const total = quiz.questions.length;
    const num = this.currentIndex + 1;

    let questionHTML = '';

    switch (q.type) {
      case 'multiple-choice':
        questionHTML = this.renderMultipleChoice(q);
        break;
      case 'fill-blank':
        questionHTML = this.renderFillBlank(q);
        break;
      case 'bug-hunt':
        questionHTML = this.renderBugHunt(q);
        break;
      case 'code-complete':
        questionHTML = this.renderCodeComplete(q);
        break;
      default:
        questionHTML = this.renderMultipleChoice(q);
    }

    container.innerHTML = `
      <div class="quiz-container animate-fade-in">
        <div class="quiz-header">
          <div class="quiz-title">
            <span>${this.getQuizTypeIcon(q.type)}</span>
            <span>${this.getQuizTypeLabel(q.type)}</span>
          </div>
          <div class="quiz-progress-info">
            <span>ข้อ ${num}/${total}</span>
            <span>•</span>
            <span>คะแนน: ${this.score}/${this.currentIndex}</span>
            ${quiz.options.showTimer ? `
              <div class="timer-ring" id="quiz-timer">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle class="timer-bg" cx="24" cy="24" r="20"/>
                  <circle class="timer-progress" cx="24" cy="24" r="20"
                    stroke-dasharray="126" stroke-dashoffset="0"/>
                </svg>
                <span class="timer-text">${quiz.options.timePerQuestion}</span>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="quiz-body">
          ${q.context ? `<div class="code-block-wrapper mb-md">
            <div class="code-block-body"><pre class="language-${q.language || 'csharp'}"><code>${this.escapeHTML(q.context)}</code></pre></div>
          </div>` : ''}
          <div class="quiz-question">${q.question}</div>
          ${questionHTML}
          <div id="quiz-feedback" class="hidden"></div>
        </div>
        <div class="quiz-footer">
          <div class="text-sm text-muted">
            ${q.difficulty ? `<span class="level-tag level-${q.difficulty}">${q.difficulty === 'basic' ? '⭐ พื้นฐาน' : q.difficulty === 'mid' ? '⭐⭐ กลาง' : '⭐⭐⭐ สูง'}</span>` : ''}
          </div>
          <button class="btn btn-primary hidden" id="quiz-next-btn" onclick="QuizEngine.nextQuestion()">
            ${num < total ? 'ข้อถัดไป →' : 'ดูผลลัพธ์ 🎯'}
          </button>
        </div>
      </div>
    `;

    // Re-highlight code
    if (typeof Prism !== 'undefined') Prism.highlightAll();

    // Start timer
    if (quiz.options.showTimer) this.startTimer();
  },

  /* ─── Multiple Choice ─── */
  renderMultipleChoice(q) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    return `<div class="quiz-options" id="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" data-index="${i}" onclick="QuizEngine.selectOption(this, ${i}, ${q.answer})">
          <span class="option-marker">${letters[i]}</span>
          <span class="option-text">${opt}</span>
        </div>
      `).join('')}
    </div>`;
  },

  selectOption(el, selected, correct) {
    if (el.closest('.quiz-options').classList.contains('answered')) return;
    el.closest('.quiz-options').classList.add('answered');

    const isCorrect = selected === correct;
    if (isCorrect) this.score++;
    this.answered.push({ index: this.currentIndex, correct: isCorrect });

    // Mark options
    el.closest('.quiz-options').querySelectorAll('.quiz-option').forEach((opt, i) => {
      if (i === correct) opt.classList.add('correct');
      if (i === selected && !isCorrect) opt.classList.add('wrong');
      opt.style.pointerEvents = 'none';
    });

    if (isCorrect) {
      el.classList.add('correct');
    } else {
      el.classList.add('wrong');
    }

    this.showFeedback(isCorrect);
    this.stopTimer();
  },

  /* ─── Fill-in-the-Blank ─── */
  renderFillBlank(q) {
    return `
      <div class="code-block-wrapper">
        <div class="code-block-body" style="padding: var(--space-lg);">
          <pre style="margin:0; background:transparent; border:none;"><code>${this.renderBlanks(q.code, q.blanks)}</code></pre>
        </div>
      </div>
      <div class="mt-md">
        <button class="btn btn-primary" onclick="QuizEngine.checkFillBlanks(${JSON.stringify(q.blanks).replace(/"/g, '&quot;')})">
          ✓ ตรวจคำตอบ
        </button>
      </div>
    `;
  },

  renderBlanks(code, blanks) {
    let result = this.escapeHTML(code);
    blanks.forEach((blank, i) => {
      result = result.replace(
        `___${i}___`,
        `<input type="text" class="code-fill-blank" id="blank-${i}" placeholder="${blank.hint || '...'}" autocomplete="off" spellcheck="false">`
      );
    });
    return result;
  },

  checkFillBlanks(blanks) {
    let allCorrect = true;
    blanks.forEach((blank, i) => {
      const input = document.getElementById(`blank-${i}`);
      if (!input) return;
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswers = Array.isArray(blank.answer) ? blank.answer.map(a => a.toLowerCase()) : [blank.answer.toLowerCase()];

      if (correctAnswers.includes(userAnswer)) {
        input.classList.add('correct');
        input.value = blank.answer;
      } else {
        input.classList.add('wrong');
        allCorrect = false;
      }
      input.disabled = true;
    });

    if (allCorrect) this.score++;
    this.answered.push({ index: this.currentIndex, correct: allCorrect });
    this.showFeedback(allCorrect);
    this.stopTimer();
  },

  /* ─── Bug Hunt ─── */
  renderBugHunt(q) {
    return `
      <div class="code-block-wrapper">
        <div class="code-block-body" style="padding: var(--space-lg);">
          <pre style="margin:0; background:transparent; border:none;"><code>${this.escapeHTML(q.buggyCode)}</code></pre>
        </div>
      </div>
      <p class="text-sm text-muted mt-md">💡 เลือกบรรทัดที่มี bug:</p>
      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" data-index="${i}" onclick="QuizEngine.selectOption(this, ${i}, ${q.answer})">
            <span class="option-marker">${i + 1}</span>
            <span class="option-text font-mono text-sm">${opt}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ─── Code Complete ─── */
  renderCodeComplete(q) {
    const letters = ['A', 'B', 'C', 'D'];
    return `
      <div class="code-block-wrapper mb-md">
        <div class="code-block-body" style="padding: var(--space-lg);">
          <pre style="margin:0; background:transparent; border:none;"><code>${this.escapeHTML(q.partialCode)}</code></pre>
        </div>
      </div>
      <p class="text-sm text-muted mb-md">เลือกโค้ดที่ถูกต้องเพื่อเติมในส่วนที่หายไป:</p>
      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" data-index="${i}" onclick="QuizEngine.selectOption(this, ${i}, ${q.answer})">
            <span class="option-marker">${letters[i]}</span>
            <span class="option-text font-mono text-sm">${opt}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ─── Feedback ─── */
  showFeedback(isCorrect) {
    const q = this.currentQuiz.questions[this.currentIndex];
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.innerHTML = `
        <div class="quiz-explanation ${isCorrect ? 'correct-explanation' : 'wrong-explanation'}">
          <strong>${isCorrect ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง'}</strong>
          ${this.currentQuiz.options.showExplanation && q.explanation ? `<p style="margin-top:8px; margin-bottom:0;">${q.explanation}</p>` : ''}
        </div>
      `;
    }

    if (nextBtn) nextBtn.classList.remove('hidden');

    // XP animation
    if (isCorrect && typeof App !== 'undefined') {
      const rect = feedback?.getBoundingClientRect();
      if (rect) App.showXPGain(10, rect.left + 20, rect.top);
    }
  },

  /* ─── Navigation ─── */
  nextQuestion() {
    this.currentIndex++;
    const container = document.getElementById(this.currentQuiz.containerId);
    if (this.currentIndex >= this.currentQuiz.questions.length) {
      this.showResults(container);
    } else {
      this.renderQuestion(container);
    }
  },

  /* ─── Results ─── */
  showResults(container) {
    if (!container) return;

    const total = this.currentQuiz.questions.length;
    const percentage = Math.round((this.score / total) * 100);

    let gradeClass, gradeText, gradeEmoji;
    if (percentage === 100) { gradeClass = 'perfect'; gradeText = 'สมบูรณ์แบบ!'; gradeEmoji = '🏆'; }
    else if (percentage >= 80) { gradeClass = 'good'; gradeText = 'เยี่ยมมาก!'; gradeEmoji = '🎉'; }
    else if (percentage >= 60) { gradeClass = 'average'; gradeText = 'ผ่านเกณฑ์'; gradeEmoji = '👍'; }
    else { gradeClass = 'poor'; gradeText = 'ลองอีกครั้งนะ'; gradeEmoji = '💪'; }

    // Record to progress
    if (typeof Progress !== 'undefined') {
      Progress.recordQuizResult(this.currentQuiz.options.quizId, this.score, total);
    }

    container.innerHTML = `
      <div class="quiz-container animate-scale-in">
        <div class="quiz-header">
          <div class="quiz-title">🎯 ผลลัพธ์</div>
        </div>
        <div class="quiz-body">
          <div class="score-display">
            <div class="score-number ${gradeClass}">${percentage}%</div>
            <div class="score-label">${gradeEmoji} ${gradeText}</div>
            <p class="mt-md text-muted">ตอบถูก ${this.score} จาก ${total} ข้อ</p>
          </div>

          <div class="grid grid-3 mt-xl" style="max-width: 500px; margin-left: auto; margin-right: auto;">
            <div class="text-center">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-success);">${this.score}</div>
              <div class="text-xs text-muted">ถูก</div>
            </div>
            <div class="text-center">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-danger);">${total - this.score}</div>
              <div class="text-xs text-muted">ผิด</div>
            </div>
            <div class="text-center">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-warning);">+${this.score * 10}</div>
              <div class="text-xs text-muted">XP</div>
            </div>
          </div>
        </div>
        <div class="quiz-footer" style="justify-content: center; gap: var(--space-md);">
          <button class="btn btn-outline" onclick="QuizEngine.start('${this.currentQuiz.containerId}', QuizEngine.currentQuiz.questions, QuizEngine.currentQuiz.options)">
            🔄 ทำใหม่
          </button>
          <button class="btn btn-primary" onclick="QuizEngine.reviewAnswers('${this.currentQuiz.containerId}')">
            📖 ดูเฉลย
          </button>
        </div>
      </div>
    `;
  },

  /* ─── Review Answers ─── */
  reviewAnswers(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const quiz = this.currentQuiz;
    let reviewHTML = quiz.questions.map((q, i) => {
      const result = this.answered[i];
      const icon = result?.correct ? '✅' : '❌';
      return `
        <div class="card mb-md" style="border-left: 3px solid ${result?.correct ? 'var(--accent-success)' : 'var(--accent-danger)'};">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <span>${icon}</span>
            <strong>ข้อ ${i + 1}</strong>
          </div>
          <p style="margin-bottom:8px;">${q.question}</p>
          ${q.explanation ? `<div class="callout callout-info"><p style="margin:0;">${q.explanation}</p></div>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="animate-fade-in">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-lg);">
          <h3>📖 เฉลยข้อสอบ</h3>
          <button class="btn btn-outline btn-sm" onclick="QuizEngine.start('${containerId}', QuizEngine.currentQuiz.questions, QuizEngine.currentQuiz.options)">
            🔄 ทำใหม่
          </button>
        </div>
        ${reviewHTML}
      </div>
    `;
  },

  /* ─── Timer ─── */
  startTimer() {
    this.timeLeft = this.currentQuiz.options.timePerQuestion;
    const timerEl = document.getElementById('quiz-timer');
    if (!timerEl) return;

    const textEl = timerEl.querySelector('.timer-text');
    const progressEl = timerEl.querySelector('.timer-progress');
    const total = this.timeLeft;

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (textEl) textEl.textContent = this.timeLeft;

      const offset = (1 - this.timeLeft / total) * 126;
      if (progressEl) progressEl.style.strokeDashoffset = offset;

      if (this.timeLeft <= 10) timerEl.classList.add('warning');
      if (this.timeLeft <= 5) { timerEl.classList.remove('warning'); timerEl.classList.add('danger'); }

      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.answered.push({ index: this.currentIndex, correct: false });
        this.showFeedback(false);
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  /* ─── Utilities ─── */
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  getQuizTypeIcon(type) {
    const icons = {
      'multiple-choice': '📝',
      'fill-blank': '✏️',
      'bug-hunt': '🐛',
      'code-complete': '🧩',
      'code-order': '🔢',
    };
    return icons[type] || '📝';
  },

  getQuizTypeLabel(type) {
    const labels = {
      'multiple-choice': 'เลือกตอบ',
      'fill-blank': 'เติมคำ',
      'bug-hunt': 'จับบัค',
      'code-complete': 'เติมโค้ด',
      'code-order': 'เรียงลำดับ',
    };
    return labels[type] || 'คำถาม';
  }
};
