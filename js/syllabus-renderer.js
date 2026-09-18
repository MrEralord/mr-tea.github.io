/* ============================================================
   Syllabus Renderer — Dynamic tab content from JSON
   Loads data/syllabus.json lazily, renders tables on demand
   ============================================================ */

(function () {
  'use strict';

  let syllabusData = null;
  let dataLoaded = false;
  let loadingPromise = null;
  let currentGrade = null;

  /**
   * Fetch and cache syllabus JSON (once)
   */
  function loadSyllabusData() {
    if (loadingPromise) return loadingPromise;
    loadingPromise = fetch('data/syllabus.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        syllabusData = data;
        dataLoaded = true;
        return data;
      })
      .catch(err => {
        console.error('[SyllabusRenderer] Failed to load syllabus data:', err);
        loadingPromise = null;
        return null;
      });
    return loadingPromise;
  }

  /**
   * Escape HTML entities
   */
  function esc(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }

  /**
   * Build HTML for a single grade's syllabus
   */
  function buildGradeHTML(gradeId) {
    const grade = syllabusData[gradeId];
    if (!grade) return '<p>Data not available.</p>';

    let html = '';

    // Grade header
    html += `<div class="grade-header">
      <i class="${esc(grade.icon)}"></i>
      <h3 data-i18n="${esc(grade.i18n)}">${esc(grade.grade)}</h3>
    </div>`;

    // Terms
    for (const term of grade.terms) {
      html += `<div class="term-label"><i class="fas fa-calendar-alt"></i> <span data-i18n="term.${term.term}">Term ${term.term}</span></div>`;

      for (const unit of term.units) {
        html += `<div class="syllabus-unit syllabus-table-container">
          <div class="unit-header-bar">
            <span class="unit-code">${esc(unit.code)}</span>
            <span class="unit-name">${esc(unit.name)}</span>
          </div>
          <table class="syllabus-table">
            <thead>
              <tr>
                <th class="topic-col">Topic</th>
                <th class="lo-col">Learning Objectives</th>
              </tr>
            </thead>
            <tbody>`;

        for (const topic of unit.topics) {
          const topicCell = topic.link
            ? `<a href="${esc(topic.link)}">${esc(topic.title)}</a>`
            : esc(topic.title);

          let loItems = '';
          for (const lo of topic.lo) {
            loItems += `<li><span class="lo-code">${esc(lo.code)}</span> ${esc(lo.text)}</li>`;
          }

          html += `<tr>
            <td class="topic-col">${topicCell}</td>
            <td class="lo-col">
              <ul class="lo-list">${loItems}</ul>
            </td>
          </tr>`;
        }

        html += `</tbody></table></div>`;
      }
    }

    return html;
  }

  /**
   * Render a specific grade into the container
   */
  function renderGrade(gradeId) {
    if (currentGrade === gradeId) return;
    currentGrade = gradeId;

    const container = document.getElementById('syllabus-content');
    if (!container) return;

    if (!dataLoaded) {
      container.innerHTML = '<div class="syllabus-loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
      loadSyllabusData().then(() => {
        if (currentGrade === gradeId) {
          renderGrade(gradeId);
        }
      });
      return;
    }

    // Build and insert content
    const gradeDiv = document.createElement('div');
    gradeDiv.className = 'syllabus-grade active';
    gradeDiv.setAttribute('data-grade', gradeId);
    gradeDiv.style.display = 'block';
    gradeDiv.innerHTML = buildGradeHTML(gradeId);

    container.innerHTML = '';
    container.appendChild(gradeDiv);

    // Re-apply i18n translations if available
    if (typeof applyTranslations === 'function') {
      applyTranslations();
    }

    // Trigger scroll animations for newly added cards
    initDynamicScrollAnimations(container);
  }

  /**
   * Apply scroll animations to dynamically added elements
   */
  function initDynamicScrollAnimations(container) {
    const targets = container.querySelectorAll('.syllabus-unit');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach((el, i) => {
      el.classList.add('animate-target');
      const stagger = (i % 4) + 1;
      el.classList.add(`stagger-${stagger}`);
      observer.observe(el);
    });
  }

  /**
   * Initialize syllabus tabs and lazy loading
   */
  function initSyllabusRenderer() {
    const syllabusSection = document.getElementById('syllabus');
    const tabsContainer = document.getElementById('syllabus-tabs');
    
    if (!syllabusSection || !tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.syllabus-tab');

    // Tab click handler
    function switchTab(gradeId) {
      tabs.forEach(t => t.classList.remove('active'));
      const activeTab = tabsContainer.querySelector(`.syllabus-tab[data-filter="${gradeId}"]`);
      if (activeTab) activeTab.classList.add('active');
      renderGrade(gradeId);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchTab(tab.getAttribute('data-filter'));
      });
    });

    // Hero tabs — scroll to syllabus + activate tab
    document.querySelectorAll('.hero-tab[data-activate-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const gradeId = btn.getAttribute('data-activate-tab');
        switchTab(gradeId);

        // Smooth scroll to syllabus
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 64;
        const top = syllabusSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // IntersectionObserver: pre-load data when syllabus section comes near viewport
    const preloadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadSyllabusData();
          preloadObserver.unobserve(entry.target);

          // Render default tab if nothing is active yet
          if (!currentGrade) {
            switchTab('g11-cs');
          }
        }
      });
    }, {
      rootMargin: '200px 0px'
    });
    preloadObserver.observe(syllabusSection);
  }

  // Expose to global scope
  window.initSyllabusRenderer = initSyllabusRenderer;
  window.switchSyllabusTab = function (gradeId) {
    const tabsContainer = document.getElementById('syllabus-tabs');
    if (!tabsContainer) return;
    const tabs = tabsContainer.querySelectorAll('.syllabus-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = tabsContainer.querySelector(`.syllabus-tab[data-filter="${gradeId}"]`);
    if (activeTab) activeTab.classList.add('active');
    renderGrade(gradeId);
  };

})();
