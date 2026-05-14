/* ============================================================
   IT-Tea.org — Core Application JS
   System-aware theme, syllabus tabs, accordions, mobile nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initSyllabusTabs();
  initSyllabusAccordions();
  initScrollAnimations();
  initSmoothScroll();
  initImageLightbox();
  initHidePlaceholderPdf();
  initSidebarSearch();
});
function initSidebarSearch() {
  const searchInput = document.getElementById('topic-search');
  const clearBtn = document.getElementById('clear-search');
  const sidebarNav = document.querySelector('.sidebar-nav');
  
  if (!searchInput || !sidebarNav) return;

  const links = sidebarNav.querySelectorAll('ul a');
  const syllabusGroups = sidebarNav.querySelectorAll('.syllabus-group');
  const termGroups = sidebarNav.querySelectorAll('.term-group');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    clearBtn.style.display = query.length > 0 ? 'block' : 'none';

    if (query.length < 2) {
      // Если запрос слишком короткий, сбрасываем фильтр (по желанию)
      if (query.length === 0) resetSearch();
      return;
    }

    links.forEach(link => {
      const text = link.textContent.toLowerCase();
      const listItem = link.parentElement; // li element

      if (text.includes(query)) {
        listItem.classList.remove('hidden-search-item');
        
        // Рекурсивно раскрываем родителей details
        let parentDetails = link.closest('details');
        while (parentDetails) {
          parentDetails.open = true;
          parentDetails = parentDetails.parentElement.closest('details');
        }
      } else {
        listItem.classList.add('hidden-search-item');
      }
    });

    // Скрываем пустые группы четвертей
    termGroups.forEach(term => {
      const visibleLinks = term.querySelectorAll('ul li:not(.hidden-search-item)');
      term.classList.toggle('hidden-search-item', visibleLinks.length === 0);
    });

    // Скрываем пустые группы классов
    syllabusGroups.forEach(group => {
      const visibleTerms = group.querySelectorAll('.term-group:not(.hidden-search-item)');
      group.classList.toggle('hidden-search-item', visibleTerms.length === 0);
    });
  });

  clearBtn.addEventListener('click', resetSearch);

  function resetSearch() {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    const allHidden = sidebarNav.querySelectorAll('.hidden-search-item');
    allHidden.forEach(el => el.classList.remove('hidden-search-item'));
    // Опционально: не закрывать открытые вкладки, чтобы не раздражать юзера
  }
}

/* ============================================================
   THEME  — System-aware (prefers-color-scheme) + manual toggle
   ============================================================ */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('ittea-theme');

  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  updateThemeIcon(toggle);

  toggle.addEventListener('click', () => {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ittea-theme', next);
    updateThemeIcon(toggle);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('ittea-theme')) {
      updateThemeIcon(toggle);
    }
  });
}

function getEffectiveTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeIcon(toggle) {
  const theme = getEffectiveTheme();
  const icon = toggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ============================================================
   DRAWER NAV (Sidebar)
   ============================================================ */
function initMobileNav() {
  const menuToggle = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-sidebar-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (!menuToggle || !sidebar || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openSidebar);
  
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  
  overlay.addEventListener('click', closeSidebar);

  const links = sidebar.querySelectorAll('a:not(.teacher-area-link)');
  links.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeSidebar, 150);
    });
  });
}

/* ============================================================
   SYLLABUS TABS (Восстановлено, чтобы работали вкладки на главной)
   ============================================================ */
function initSyllabusTabs() {
  const tabs = document.querySelectorAll('.syllabus-tab');
  const grades = document.querySelectorAll('.syllabus-grade');

  if (!tabs.length || !grades.length) return;

  function switchTab(targetGradeId) {
    tabs.forEach(t => t.classList.remove('active'));
    grades.forEach(g => {
        g.classList.remove('active');
        g.style.display = 'none'; 
    });

    const activeTab = document.querySelector(`.syllabus-tab[data-filter="${targetGradeId}"]`);
    if (activeTab) activeTab.classList.add('active');

    const activeGrade = document.querySelector(`.syllabus-grade[data-grade="${targetGradeId}"]`);
    if (activeGrade) {
        activeGrade.classList.add('active');
        activeGrade.style.display = 'block';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-filter'));
    });
  });

  switchTab('g11-cs');
}

function initSyllabusAccordions() {
  // Заглушка, чтобы не выдавало ошибку
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.lo-card, .lab-card, .assessment-card' 
  );

  targets.forEach((el, i) => {
    el.classList.add('animate-target');
    const stagger = (i % 4) + 1;
    el.classList.add(`stagger-${stagger}`);
  });

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

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   IMAGE LIGHTBOX — fullscreen view on click
   ============================================================ */
function initImageLightbox() {
  const images = document.querySelectorAll('.lesson-image-block img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.innerHTML = '<button class="image-lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('img');
  const lbClose = overlay.querySelector('.image-lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== lbImg) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ============================================================
   Hide PDF presentation block when no real PDF is linked
   ============================================================ */
function initHidePlaceholderPdf() {
  document.querySelectorAll('.lesson-pdf-block').forEach(block => {
    const btns = block.querySelectorAll('.lesson-pdf-btn');
    const allPlaceholder = Array.from(btns).every(btn => {
      const href = btn.getAttribute('href');
      return !href || href === '#';
    });
    if (allPlaceholder) {
      block.style.display = 'none';
    }
  });
}
