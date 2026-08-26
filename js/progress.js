/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Progress Tracking System
   localStorage-based XP, achievements, and module progress
   ══════════════════════════════════════════════════════════ */

const Progress = {
  STORAGE_KEY: 'dotnet_learning_hub',

  defaults: {
    xp: 0,
    level: 1,
    completedLessons: [],
    completedQuizzes: [],
    quizScores: {},
    achievements: [],
    moduleProgress: {},
    streakDays: 0,
    lastVisit: null,
    totalQuizAnswered: 0,
    totalCorrect: 0,
  },

  data: null,

  init() {
    this.load();
    this.checkStreak();
    this.updateAllUI();
  },

  /* ─── Storage ─── */
  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.data = stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
    } catch {
      this.data = { ...this.defaults };
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('ไม่สามารถบันทึก progress ได้:', e);
    }
  },

  reset() {
    this.data = { ...this.defaults };
    this.save();
    this.updateAllUI();
  },

  /* ─── XP System ─── */
  getTotalXP() {
    return this.data?.xp || 0;
  },

  getLevel() {
    const xp = this.getTotalXP();
    if (xp >= 5000) return 10;
    if (xp >= 3500) return 9;
    if (xp >= 2500) return 8;
    if (xp >= 1800) return 7;
    if (xp >= 1200) return 6;
    if (xp >= 800) return 5;
    if (xp >= 500) return 4;
    if (xp >= 300) return 3;
    if (xp >= 100) return 2;
    return 1;
  },

  getLevelTitle() {
    const titles = {
      1: '🌱 เริ่มต้น',
      2: '📗 มือใหม่',
      3: '📘 กำลังเรียนรู้',
      4: '📙 เข้าใจพื้นฐาน',
      5: '📕 ระดับกลาง',
      6: '⚡ มีฝีมือ',
      7: '🔥 เก่งขึ้นเรื่อยๆ',
      8: '💎 ฝีมือดี',
      9: '🏆 เกือบ Pro',
      10: '👑 Master',
    };
    return titles[this.getLevel()] || '🌱 เริ่มต้น';
  },

  getXPForNextLevel() {
    const thresholds = [0, 100, 300, 500, 800, 1200, 1800, 2500, 3500, 5000, Infinity];
    const level = this.getLevel();
    return thresholds[level] || Infinity;
  },

  addXP(amount, source) {
    if (!this.data) this.load();
    this.data.xp += amount;
    this.data.level = this.getLevel();
    this.save();
    this.checkAchievements();
    return this.data.xp;
  },

  /* ─── Lesson Progress ─── */
  completeLesson(lessonId) {
    if (!this.data) this.load();
    if (!this.data.completedLessons.includes(lessonId)) {
      this.data.completedLessons.push(lessonId);
      this.addXP(20, 'lesson');
      this.save();
    }
  },

  isLessonCompleted(lessonId) {
    return this.data?.completedLessons?.includes(lessonId) || false;
  },

  /* ─── Module Progress ─── */
  setModuleProgress(moduleId, percent) {
    if (!this.data) this.load();
    this.data.moduleProgress[moduleId] = Math.min(100, Math.max(0, percent));
    this.save();
  },

  getModuleProgress(moduleId) {
    return this.data?.moduleProgress?.[moduleId] || 0;
  },

  /* ─── Quiz Tracking ─── */
  recordQuizResult(quizId, score, total) {
    if (!this.data) this.load();

    const percentage = Math.round((score / total) * 100);

    // Best score only
    const prev = this.data.quizScores[quizId];
    if (!prev || percentage > prev.percentage) {
      this.data.quizScores[quizId] = { score, total, percentage, date: new Date().toISOString() };
    }

    this.data.totalQuizAnswered += total;
    this.data.totalCorrect += score;

    if (percentage === 100 && !this.data.completedQuizzes.includes(quizId)) {
      this.data.completedQuizzes.push(quizId);
      this.addXP(50, 'quiz-perfect');
    } else if (percentage >= 70) {
      this.addXP(30, 'quiz-pass');
    } else {
      this.addXP(10, 'quiz-attempt');
    }

    this.save();
    this.checkAchievements();
    return percentage;
  },

  getQuizBestScore(quizId) {
    return this.data?.quizScores?.[quizId] || null;
  },

  /* ─── Streak ─── */
  checkStreak() {
    if (!this.data) return;
    const today = new Date().toDateString();
    const last = this.data.lastVisit;

    if (last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last === yesterday) {
        this.data.streakDays += 1;
      } else if (last !== today) {
        this.data.streakDays = 1;
      }
      this.data.lastVisit = today;
      this.save();
    }
  },

  /* ─── Achievements ─── */
  checkAchievements() {
    if (!this.data) return;

    const checks = [
      { id: 'first-lesson', condition: () => this.data.completedLessons.length >= 1 },
      { id: 'five-lessons', condition: () => this.data.completedLessons.length >= 5 },
      { id: 'ten-lessons', condition: () => this.data.completedLessons.length >= 10 },
      { id: 'first-quiz', condition: () => Object.keys(this.data.quizScores).length >= 1 },
      { id: 'perfect-score', condition: () => Object.values(this.data.quizScores).some(s => s.percentage === 100) },
      { id: 'xp-100', condition: () => this.data.xp >= 100 },
      { id: 'xp-500', condition: () => this.data.xp >= 500 },
      { id: 'xp-1000', condition: () => this.data.xp >= 1000 },
      { id: 'streak-3', condition: () => this.data.streakDays >= 3 },
      { id: 'streak-7', condition: () => this.data.streakDays >= 7 },
      { id: 'quiz-master', condition: () => this.data.totalCorrect >= 50 },
    ];

    checks.forEach(({ id, condition }) => {
      if (!this.data.achievements.includes(id) && condition()) {
        this.data.achievements.push(id);
        this.save();
      }
    });
  },

  hasAchievement(id) {
    return this.data?.achievements?.includes(id) || false;
  },

  /* ─── Stats ─── */
  getStats() {
    if (!this.data) this.load();
    return {
      xp: this.data.xp,
      level: this.getLevel(),
      levelTitle: this.getLevelTitle(),
      lessonsCompleted: this.data.completedLessons.length,
      quizzesCompleted: this.data.completedQuizzes.length,
      totalQuizAnswered: this.data.totalQuizAnswered,
      totalCorrect: this.data.totalCorrect,
      accuracy: this.data.totalQuizAnswered > 0
        ? Math.round((this.data.totalCorrect / this.data.totalQuizAnswered) * 100)
        : 0,
      streakDays: this.data.streakDays,
      achievementCount: this.data.achievements.length,
    };
  },

  /* ─── UI Updates ─── */
  updateAllUI() {
    // Update XP in header
    const xpEl = document.querySelector('.xp-value');
    if (xpEl) xpEl.textContent = this.getTotalXP();

    // Update progress bars on dashboard
    document.querySelectorAll('[data-progress-module]').forEach(el => {
      const moduleId = el.dataset.progressModule;
      const percent = this.getModuleProgress(moduleId);
      const fill = el.querySelector('.progress-fill');
      const label = el.querySelector('.label-value');
      if (fill) fill.style.width = percent + '%';
      if (label) label.textContent = percent + '%';
    });

    // Update completed badges
    document.querySelectorAll('[data-lesson-id]').forEach(el => {
      if (this.isLessonCompleted(el.dataset.lessonId)) {
        el.classList.add('completed');
      }
    });
  }
};
