// TrickDex Difficulty Quiz & Trick Recommender
(function() {
  let quizTricks = [];
  let quizStep = 0;
  let knownTricks = new Set();
  const STEPS = [
    { title: 'The Basics', desc: 'Let\'s start simple — can you do these?', filter: t => t.difficulty <= 2 && t.prerequisites.length === 0 },
    { title: 'Fundamentals', desc: 'How about these foundational tricks?', filter: t => t.difficulty <= 2 && t.prerequisites.length > 0 },
    { title: 'Intermediate', desc: 'Getting serious — check what you\'ve landed.', filter: t => t.difficulty >= 3 && t.difficulty <= 4 },
    { title: 'Advanced', desc: 'The hard stuff — any of these?', filter: t => t.difficulty >= 5 && t.difficulty <= 6 },
    { title: 'Expert', desc: 'Only the brave. Check what you can do.', filter: t => t.difficulty >= 7 },
  ];

  window.initQuiz = function(tricks) {
    quizTricks = tricks;
  };

  window.startQuiz = function() {
    quizStep = 0;
    // Pre-populate from progress tracker
    knownTricks = new Set();
    const progress = getProgress();
    Object.entries(progress).forEach(([id, level]) => {
      if (level === 'landed' || level === 'mastered') knownTricks.add(id);
    });
    renderQuizStep();
  };

  function renderQuizStep() {
    const container = document.getElementById('quizContent');
    if (quizStep >= STEPS.length) {
      renderResults();
      return;
    }
    const step = STEPS[quizStep];
    const stepTricks = quizTricks.filter(step.filter).sort((a, b) => a.difficulty - b.difficulty || a.name.localeCompare(b.name));

    if (stepTricks.length === 0) {
      quizStep++;
      renderQuizStep();
      return;
    }

    const progressPct = ((quizStep / STEPS.length) * 100).toFixed(0);

    container.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
      </div>
      <div class="quiz-step-header">
        <span class="quiz-step-num">Step ${quizStep + 1} of ${STEPS.length}</span>
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
      </div>
      <div class="quiz-tricks">
        ${stepTricks.map(t => `
          <label class="quiz-trick ${knownTricks.has(t.id) ? 'checked' : ''}" data-id="${t.id}">
            <input type="checkbox" ${knownTricks.has(t.id) ? 'checked' : ''} onchange="toggleQuizTrick('${t.id}', this)">
            <span class="quiz-trick-name">${t.name}</span>
            <span class="quiz-trick-diff">${'★'.repeat(t.difficulty)}</span>
          </label>
        `).join('')}
      </div>
      <div class="quiz-nav">
        ${quizStep > 0 ? '<button class="quiz-btn quiz-btn-secondary" onclick="quizBack()">← Back</button>' : '<div></div>'}
        <button class="quiz-btn" onclick="quizNext()">${quizStep < STEPS.length - 1 ? 'Next →' : 'Show Recommendations 🎯'}</button>
      </div>
    `;
  }

  window.toggleQuizTrick = function(id, el) {
    if (el.checked) knownTricks.add(id); else knownTricks.delete(id);
    el.closest('.quiz-trick').classList.toggle('checked', el.checked);
  };

  window.quizNext = function() { quizStep++; renderQuizStep(); };
  window.quizBack = function() { quizStep--; renderQuizStep(); };

  function getRecommendations() {
    // Find tricks where ALL prerequisites are in knownTricks but the trick itself is NOT known
    const recs = quizTricks.filter(t => {
      if (knownTricks.has(t.id)) return false;
      if (t.prerequisites.length === 0 && t.difficulty <= 2) return false; // skip starters
      return t.prerequisites.every(p => knownTricks.has(p));
    });
    // Sort by difficulty, then name
    recs.sort((a, b) => a.difficulty - b.difficulty || a.name.localeCompare(b.name));
    return recs;
  }

  function getSkillLevel() {
    const maxDiff = Math.max(0, ...Array.from(knownTricks).map(id => {
      const t = quizTricks.find(x => x.id === id);
      return t ? t.difficulty : 0;
    }));
    if (maxDiff === 0) return { level: 'Beginner', emoji: '🌱', desc: 'Just getting started — the world of skating awaits!' };
    if (maxDiff <= 2) return { level: 'Novice', emoji: '🛹', desc: 'You\'ve got the basics down. Time to build on them!' };
    if (maxDiff <= 4) return { level: 'Intermediate', emoji: '🔥', desc: 'Solid foundation. You\'re ready for some real tricks.' };
    if (maxDiff <= 6) return { level: 'Advanced', emoji: '⚡', desc: 'You\'re shredding. Keep pushing the limits!' };
    if (maxDiff <= 8) return { level: 'Expert', emoji: '🏆', desc: 'Seriously skilled. Not many tricks left to conquer.' };
    return { level: 'Legend', emoji: '👑', desc: 'You\'re at the top. Absolute beast on the board.' };
  }

  function renderResults() {
    const container = document.getElementById('quizContent');
    const recs = getRecommendations();
    const skill = getSkillLevel();
    const total = quizTricks.length;
    const known = knownTricks.size;

    // Categorize recs
    const easyRecs = recs.filter(t => t.difficulty <= 3);
    const medRecs = recs.filter(t => t.difficulty > 3 && t.difficulty <= 5);
    const hardRecs = recs.filter(t => t.difficulty > 5);

    function recSection(title, emoji, tricks, maxShow) {
      if (tricks.length === 0) return '';
      const shown = tricks.slice(0, maxShow || 6);
      const extra = tricks.length - shown.length;
      return `
        <div class="rec-section">
          <h4>${emoji} ${title}</h4>
          <div class="rec-tricks">
            ${shown.map(t => `
              <div class="rec-card" onclick="closeQuizAndOpen('${t.id}')">
                <div class="rec-card-head">
                  <strong>${t.name}</strong>
                  <span class="cat">${t.category}</span>
                </div>
                <div class="difficulty">${Array.from({length:10},(_,i)=>`<div class="dot${i<t.difficulty?' active':''}"></div>`).join('')}</div>
                <p class="rec-desc">${t.description}</p>
                <div class="rec-prereqs">Needs: ${t.prerequisites.map(p => {
                  const pt = quizTricks.find(x=>x.id===p);
                  return pt ? pt.name : p;
                }).join(', ')}</div>
              </div>
            `).join('')}
          </div>
          ${extra > 0 ? `<p class="rec-more">+ ${extra} more</p>` : ''}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="quiz-results">
        <div class="skill-badge">
          <span class="skill-emoji">${skill.emoji}</span>
          <h3>${skill.level}</h3>
          <p>${skill.desc}</p>
          <div class="skill-stats">
            <span><strong>${known}</strong> tricks known</span>
            <span><strong>${recs.length}</strong> tricks unlocked</span>
            <span><strong>${total - known - recs.length}</strong> still locked</span>
          </div>
        </div>

        ${recs.length > 0 ? `
          <h3 class="rec-title">🎯 Recommended Next Tricks</h3>
          <p class="rec-subtitle">You've unlocked these — all prerequisites met!</p>
          ${recSection('Quick Wins', '🟢', easyRecs, 6)}
          ${recSection('Solid Challenges', '🟡', medRecs, 6)}
          ${recSection('Reach Goals', '🔴', hardRecs, 4)}
        ` : `
          <div class="rec-empty">
            <p>🎉 You either know everything or need to learn some basics first!</p>
            <p>Go back and check off the tricks you can do.</p>
          </div>
        `}

        <div class="quiz-nav">
          <button class="quiz-btn quiz-btn-secondary" onclick="quizBack()">← Back</button>
          <button class="quiz-btn" onclick="applyQuizToProgress()">Save to Progress Tracker 💾</button>
          <button class="quiz-btn quiz-btn-secondary" onclick="startQuiz()">Retake Quiz 🔄</button>
        </div>
      </div>
    `;
  }

  window.applyQuizToProgress = function() {
    const progress = getProgress();
    knownTricks.forEach(id => {
      if (!progress[id]) progress[id] = 'landed';
    });
    localStorage.setItem('trickdex-progress', JSON.stringify(progress));
    renderProgressBar();
    render();
    // Show confirmation
    const btn = document.querySelector('.quiz-nav .quiz-btn:not(.quiz-btn-secondary)');
    if (btn) { btn.textContent = '✅ Saved!'; btn.disabled = true; }
  };

  window.closeQuizAndOpen = function(id) {
    document.getElementById('quizModal').classList.remove('active');
    openModal(id);
  };
})();
