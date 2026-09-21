(() => {
  'use strict';

  const C = window.EXAM_CONFIG;
  if (!C) throw new Error('EXAM_CONFIG is missing. Load exam-data.js before exam.js.');

  const byId = id => document.getElementById(id);
  const KEY = 'mockexam:' + C.examId;
  const DURATION_MS = C.durationMin * 60 * 1000;

  const fields = [];
  const questionKeys = new Map();

  C.questions.forEach(q => {
    const keys = [];
    q.parts.forEach(p => p.fields.forEach(f => {
      fields.push({ ...f, question: q.number, partLabel: p.label, prompt: p.prompt });
      keys.push(f.key);
    }));
    questionKeys.set(String(q.number), keys);
  });

  const computedTotal = fields.reduce((sum, f) => sum + Number(f.marks || 0), 0);
  if (computedTotal !== C.maxMarks) {
    console.error(`Exam configuration error: fields total ${computedTotal}, expected ${C.maxMarks}.`);
  }

  let state = loadState() || {};
  let timerHandle = null;
  let draftHandle = null;
  let sending = false;
  let examActive = false;
  let toastHandle = null;

  function loadState() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch { return null; }
  }

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }

  function randomHex(bytes = 8) {
    const a = new Uint8Array(bytes);
    crypto.getRandomValues(a);
    return Array.from(a, n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function configured() {
    return /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:[?#].*)?$/.test(String(C.submitUrl || ''));
  }

  function escapeText(s) {
    return String(s ?? '');
  }

  function marksOf(part) {
    return part.fields.reduce((sum, f) => sum + Number(f.marks || 0), 0);
  }

  function questionMarks(q) {
    return q.parts.reduce((sum, p) => sum + marksOf(p), 0);
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  }

  function toast(message) {
    const el = byId('examToast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastHandle);
    toastHandle = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function touch() {
    state.changeVersion = Number(state.changeVersion || 0) + 1;
    state.dirty = true;
    state.updatedAt = Date.now();
    saveState();
  }

  function metric(name, message) {
    state[name] = Number(state[name] || 0) + 1;
    touch();
    if (message) toast(message);
  }

  function getAnswer(key) {
    return String((state.answers && state.answers[key]) ?? '');
  }

  function setAnswer(key, value) {
    state.answers ||= {};
    state.answers[key] = value;
    touch();
    refreshProgress();
    setSaveText('Saved locally · server sync pending');
  }

  function renderStatic() {
    document.title = C.title;
    byId('startTitle').textContent = C.title;
    byId('startSubtitle').textContent = C.subtitle || '';
    byId('factTime').textContent = `${C.durationMin} min`;
    byId('factMarks').textContent = String(C.maxMarks);
    byId('factQuestions').textContent = String(C.questions.length);
    byId('paperTitle').textContent = C.title;

    const rules = byId('rulesList');
    rules.replaceChildren(...C.rules.map(r => make('li', '', r)));

    renderQuestions();
  }

  function renderQuestions() {
    const container = byId('questionContainer');
    const sections = C.questions.map(q => {
      const section = make('section', 'exam-question');
      section.id = 'q' + q.number;

      const head = make('div', 'question-head');
      const left = make('div');
      left.append(
        make('h3', '', `${q.number}. ${q.title}`),
        make('div', 'question-topic', q.topic || '')
      );
      head.append(left, make('div', 'question-marks', `[Total: ${questionMarks(q)}]`));
      section.append(head);

      if (q.intro) section.append(make('p', 'question-intro', q.intro));

      q.parts.forEach(part => {
        const partEl = make('div', 'exam-part');
        const partHead = make('div', 'part-head');
        const prompt = make('div', 'part-prompt');
        const label = make('span', 'part-label', part.label);
        prompt.append(label, document.createTextNode(part.prompt));
        partHead.append(prompt, make('span', 'part-marks', `[${marksOf(part)}]`));
        partEl.append(partHead);

        if (part.code) {
          const pre = make('pre', 'codebox');
          const code = make('code', '', part.code);
          pre.append(code);
          partEl.append(pre);
        }

        const fieldWrap = make('div', part.fields.length > 1 ? 'field-grid' : '');
        part.fields.forEach(field => fieldWrap.append(renderField(field)));
        partEl.append(fieldWrap);
        section.append(partEl);
      });

      return section;
    });

    container.replaceChildren(...sections);
  }

  function renderField(field) {
    const wrap = make('label', 'exam-field');
    if (field.label) wrap.append(make('span', 'exam-field-label', field.label));

    let el;
    if (field.input === 'short') {
      el = document.createElement('input');
      el.type = 'text';
      el.autocomplete = 'off';
    } else if (field.input === 'select') {
      el = document.createElement('select');
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Choose…';
      el.append(placeholder);
      (field.options || []).forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        el.append(option);
      });
    } else {
      el = document.createElement('textarea');
      el.rows = field.input === 'working' || field.input === 'code' ? 7 : 4;
      if (field.input === 'working') el.classList.add('working-answer');
      if (field.input === 'code') {
        el.classList.add('code-answer');
        el.spellcheck = false;
      }
    }

    el.classList.add('answer-control');
    el.dataset.answer = field.key;
    el.dataset.input = field.input || 'long';
    el.placeholder = field.placeholder || 'Type your answer';
    el.setAttribute('aria-label', field.label ? `${field.label} answer` : `Answer ${field.key}`);
    wrap.append(el);
    return wrap;
  }

  function hydrateInputs() {
    document.querySelectorAll('[data-answer]').forEach(el => {
      el.value = getAnswer(el.dataset.answer);
      if (el.dataset.bound === '1') return;
      el.dataset.bound = '1';

      const eventName = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(eventName, () => setAnswer(el.dataset.answer, el.value));

      if (el.dataset.input === 'code') {
        el.addEventListener('keydown', e => {
          if (e.key === 'Tab') {
            e.preventDefault();
            el.setRangeText('    ', el.selectionStart, el.selectionEnd, 'end');
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      }
    });
  }

  function questionStatus(number) {
    const values = (questionKeys.get(String(number)) || []).map(k => getAnswer(k).trim());
    const filled = values.filter(Boolean).length;
    if (!filled) return 'empty';
    return filled === values.length ? 'done' : 'partial';
  }

  function refreshProgress() {
    let done = 0;
    C.questions.forEach(q => {
      const status = questionStatus(q.number);
      const link = byId('qnav').querySelector(`[data-q="${q.number}"]`);
      if (link) {
        link.classList.toggle('done', status === 'done');
        link.classList.toggle('partial', status === 'partial');
      }
      if (status === 'done') done++;
    });
    const text = `Completed questions: ${done}/${C.questions.length}`;
    byId('progressLabel').textContent = text;
    byId('footerProgress').textContent = text;
  }

  function setSaveText(text) {
    byId('saveStatus').textContent = text;
  }

  function startExam() {
    const fullName = byId('fullName').value.trim().replace(/\s+/g, ' ');
    const group = byId('group').value.trim();

    if (fullName.length < 4 || !fullName.includes(' ')) {
      byId('startError').textContent = 'Enter surname and first name.';
      byId('fullName').focus();
      return;
    }
    if (group.length < 2) {
      byId('startError').textContent = 'Enter your class / group.';
      byId('group').focus();
      return;
    }

    state = {
      fullName,
      group,
      startedAt: Date.now(),
      answers: {},
      submissionId: randomHex(6),
      sessionToken: randomHex(16),
      status: 'DRAFT',
      changeVersion: 1,
      dirty: true,
      pageExits: 0,
      copyAttempts: 0,
      pasteAttempts: 0,
      contextMenuAttempts: 0,
      dropAttempts: 0
    };
    saveState();
    showExam();
  }

  function showExam() {
    examActive = true;
    byId('startScreen').classList.add('hidden');
    byId('doneScreen').classList.add('hidden');
    byId('examScreen').classList.remove('hidden');

    byId('candidateLabel').textContent = state.fullName + (state.group ? ` · ${state.group}` : '');

    const nav = byId('qnav');
    nav.replaceChildren(...C.questions.map(q => {
      const a = document.createElement('a');
      a.href = '#q' + q.number;
      a.dataset.q = String(q.number);
      a.textContent = String(q.number);
      a.setAttribute('aria-label', `Question ${q.number}`);
      return a;
    }));

    hydrateInputs();
    refreshProgress();
    runTimer();

    clearInterval(draftHandle);
    draftHandle = setInterval(() => syncDraft(false), C.draftEveryMs);
    setTimeout(() => syncDraft(true), 2500);

    window.scrollTo(0, 0);
  }

  function runTimer() {
    clearInterval(timerHandle);
    const el = byId('timer');

    const tick = () => {
      const left = state.startedAt + DURATION_MS - Date.now();
      if (left <= 0) {
        el.textContent = '00:00';
        clearInterval(timerHandle);
        state.autoSubmitted = true;
        saveState();
        submitExam(true);
        return;
      }

      const seconds = Math.ceil(left / 1000);
      const minutes = Math.floor(seconds / 60);
      const rest = seconds % 60;
      el.textContent = `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
      el.classList.toggle('warn', left <= 10 * 60000 && left > 5 * 60000);
      el.classList.toggle('danger', left <= 5 * 60000);
    };

    tick();
    timerHandle = setInterval(tick, 1000);
  }

  function buildPayload(status) {
    const now = Date.now();
    return {
      schemaVersion: 3,
      examId: C.examId,
      id: state.submissionId,
      sessionToken: state.sessionToken,
      fullName: state.fullName,
      group: state.group || '',
      startedAt: new Date(state.startedAt).toISOString(),
      submittedAt: status === 'SUBMITTED'
        ? new Date(state.submittedAt || now).toISOString()
        : '',
      lastSavedAt: new Date(now).toISOString(),
      secondsUsed: Math.min(Math.round((now - state.startedAt) / 1000), C.durationMin * 60),
      status,
      autoSubmitted: !!state.autoSubmitted,
      pageExits: Number(state.pageExits || 0),
      copyAttempts: Number(state.copyAttempts || 0),
      pasteAttempts: Number(state.pasteAttempts || 0),
      contextMenuAttempts: Number(state.contextMenuAttempts || 0),
      dropAttempts: Number(state.dropAttempts || 0),
      answers: state.answers || {}
    };
  }

  async function sendPayload(status, silent = false) {
    if (!configured()) return false;

    const versionAtSend = Number(state.changeVersion || 0);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(C.submitUrl, {
        method: 'POST',
        body: JSON.stringify(buildPayload(status)),
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeout);
      const data = await response.json();
      if (!data || !data.ok) throw new Error(data?.error || 'Server error');

      state.lastServerSave = Date.now();
      if (status === 'DRAFT' && versionAtSend === Number(state.changeVersion || 0)) {
        state.dirty = false;
      }
      saveState();

      if (!silent) {
        setSaveText(status === 'SUBMITTED'
          ? 'Submitted'
          : `Synced to teacher · ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`);
      }
      return true;
    } catch (err) {
      if (!silent) setSaveText('Saved locally · server sync failed');
      return false;
    }
  }

  async function syncDraft(force) {
    if (!examActive || sending || !state.startedAt) return;
    if (!force && !state.dirty && state.lastServerSave) return;
    await sendPayload('DRAFT', false);
  }

  function backgroundDraft() {
    if (!configured() || !examActive || !state.startedAt || !navigator.sendBeacon) return;
    try {
      const blob = new Blob([JSON.stringify(buildPayload('DRAFT'))], { type: 'text/plain;charset=UTF-8' });
      navigator.sendBeacon(C.submitUrl, blob);
    } catch {}
  }

  async function submitExam(auto) {
    if (sending || state.submitted) return;

    sending = true;
    examActive = false;
    clearInterval(timerHandle);
    clearInterval(draftHandle);

    state.autoSubmitted = !!auto || !!state.autoSubmitted;
    state.status = 'SUBMITTED';
    state.submittedAt ||= Date.now();
    state.submitPending = true;
    saveState();

    showDone('sending');

    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      ok = await sendPayload('SUBMITTED', true);
      if (!ok && attempt < 3) await new Promise(r => setTimeout(r, 1200 * attempt));
    }

    if (ok) {
      state.submitted = true;
      state.submitPending = false;
      state.dirty = false;
      saveState();
      showDone('sent');
    } else {
      showDone(configured() ? 'failed' : 'local');
    }
    sending = false;
  }

  function openSubmitDialog() {
    const incomplete = C.questions.filter(q => questionStatus(q.number) !== 'done').length;
    byId('submitMessage').textContent = incomplete
      ? `${incomplete} question(s) are incomplete or partially answered. After submission, answers cannot be changed.`
      : 'All questions contain responses. After submission, answers cannot be changed.';
    byId('submitDialog').showModal();
  }

  function backupText() {
    const p = buildPayload('SUBMITTED');
    const lines = [
      C.title,
      `Student: ${p.fullName}`,
      `Class: ${p.group || '-'}`,
      `Submission ID: ${p.id}`,
      `Started: ${p.startedAt}`,
      `Submitted: ${p.submittedAt || new Date().toISOString()}`,
      `Page exits: ${p.pageExits}`,
      `Copy attempts: ${p.copyAttempts}`,
      `Paste attempts: ${p.pasteAttempts}`,
      ''
    ];

    C.questions.forEach(q => {
      lines.push(`QUESTION ${q.number}: ${q.title} [${questionMarks(q)}]`);
      q.parts.forEach(part => {
        lines.push(`${part.label} ${part.prompt}`);
        if (part.code) lines.push(part.code);
        part.fields.forEach(field => {
          if (field.label) lines.push(`${field.label}:`);
          lines.push(getAnswer(field.key).trim() || '(no answer)');
        });
        lines.push('');
      });
    });

    return lines.join('\n');
  }

  function downloadBackup() {
    const blob = new Blob(['\ufeff' + backupText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safe = state.fullName.replace(/[^\p{L}\p{N}]+/gu, '_');
    a.download = `${C.examId}_${safe}.txt`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function showDone(mode) {
    byId('examScreen').classList.add('hidden');
    byId('startScreen').classList.add('hidden');
    byId('doneScreen').classList.remove('hidden');

    const box = byId('doneBox');
    box.replaceChildren();

    const addBackup = () => {
      const btn = make('button', 'exam-btn exam-btn-secondary', 'Download a copy (.txt)');
      btn.type = 'button';
      btn.addEventListener('click', downloadBackup);
      return btn;
    };

    if (mode === 'sending') {
      box.append(make('h1', '', 'Submitting answers…'), make('p', '', 'Do not close this page.'));
      return;
    }

    if (mode === 'sent') {
      const dl = document.createElement('dl');
      dl.className = 'receipt';
      [['Student', state.fullName], ['Submission ID', state.submissionId]].forEach(([k, v]) => {
        dl.append(make('dt', '', k), make('dd', '', v));
      });
      const actions = make('div', 'done-actions');
      actions.append(addBackup());
      box.append(
        make('h1', '', 'Examination submitted'),
        make('p', '', 'Your responses were received. Results will be given by your teacher.'),
        dl,
        actions
      );
      return;
    }

    if (mode === 'local') {
      const actions = make('div', 'done-actions');
      actions.append(addBackup());
      box.append(
        make('h1', '', 'Saved on this device only'),
        make('p', '', 'The Google Apps Script URL is not configured in exam-data.js. Download the answer file and give it to the teacher.'),
        actions
      );
      return;
    }

    const retry = make('button', 'exam-btn exam-btn-primary', 'Try again');
    retry.type = 'button';
    retry.addEventListener('click', () => submitExam(!!state.autoSubmitted));

    const actions = make('div', 'done-actions');
    actions.append(retry, addBackup());

    box.append(
      make('h1', '', 'Server submission failed'),
      make('p', '', 'Your answers are still saved on this device. Check the internet connection and try again.'),
      actions
    );
  }

  function isAnswerTarget(target) {
    return target instanceof Element && !!target.closest('input, textarea, select, .answer-control');
  }

  /* Anti-copy / anti-paste controls.
     These deter normal clipboard use; they cannot make a public web page impossible to inspect. */
  document.addEventListener('paste', e => {
    if (!examActive || !isAnswerTarget(e.target)) return;
    e.preventDefault();
    metric('pasteAttempts', 'Pasting is disabled during the examination. Type your answer manually.');
  }, true);

  document.addEventListener('beforeinput', e => {
    if (!examActive || !isAnswerTarget(e.target)) return;
    if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop') e.preventDefault();
  }, true);

  document.addEventListener('drop', e => {
    if (!examActive || !isAnswerTarget(e.target)) return;
    e.preventDefault();
    metric('dropAttempts', 'Drag-and-drop text is disabled during the examination.');
  }, true);

  document.addEventListener('copy', e => {
    if (!examActive || isAnswerTarget(e.target)) return;
    e.preventDefault();
    metric('copyAttempts', 'Copying question text is disabled during the examination.');
  }, true);

  document.addEventListener('contextmenu', e => {
    if (!examActive || isAnswerTarget(e.target)) return;
    e.preventDefault();
    metric('contextMenuAttempts', 'The context menu is disabled on question text.');
  }, true);

  document.addEventListener('dragstart', e => {
    if (examActive && !isAnswerTarget(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && examActive) {
      state.pageExits = Number(state.pageExits || 0) + 1;
      touch();
      backgroundDraft();
    }
  });

  window.addEventListener('beforeunload', e => {
    if (examActive) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  byId('startBtn').addEventListener('click', startExam);
  byId('submitBtn').addEventListener('click', openSubmitDialog);
  byId('cancelSubmit').addEventListener('click', () => byId('submitDialog').close());
  byId('confirmSubmit').addEventListener('click', () => {
    byId('submitDialog').close();
    submitExam(false);
  });

  renderStatic();

  if (state.submitted) {
    showDone('sent');
  } else if (state.submitPending) {
    showDone(configured() ? 'failed' : 'local');
  } else if (state.startedAt) {
    showExam();
    if (Date.now() >= state.startedAt + DURATION_MS) {
      state.autoSubmitted = true;
      saveState();
      submitExam(true);
    }
  }
})();
