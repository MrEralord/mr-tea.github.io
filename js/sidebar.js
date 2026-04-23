/* ============================================================
   sidebar.js — Dynamic Sidebar Loader
   Fetches /components/sidebar.html and injects into the page
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initSidebar);

  function initSidebar() {
    const wrapper = document.querySelector('.layout-wrapper');
    if (!wrapper) return;

    fetch('/components/sidebar.html')
      .then(res => {
        if (!res.ok) throw new Error('Sidebar fetch failed');
        return res.text();
      })
      .then(html => {
        // Insert sidebar + overlay before main-content
        const mainContent = wrapper.querySelector('.main-content');
        const container = document.createElement('div');
        container.innerHTML = html;

        // Insert sidebar
        const sidebar = container.querySelector('.sidebar');
        if (sidebar) {
          wrapper.insertBefore(sidebar, mainContent);
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.className = 'sidebar-overlay';
        wrapper.insertBefore(overlay, mainContent);

        // Bind events
        bindSidebarEvents();

        // Highlight active lesson
        highlightActiveLesson();

        // Auto-open parent details for active lesson
        expandActiveParents();

        // Re-init theme (theme-toggle now exists in sidebar)
        if (typeof initTheme === 'function') {
          initTheme();
        }

        // Re-init i18n if available
        if (typeof initI18n === 'function') {
          initI18n();
        } else if (typeof applyLanguage === 'function') {
          const savedLang = localStorage.getItem('ittea-lang') || 'en';
          applyLanguage(savedLang);
        }
      })
      .catch(err => {
        console.warn('Sidebar could not be loaded:', err.message);
      });
  }

  function bindSidebarEvents() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!menuBtn || !sidebar || !overlay) return;

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

    menuBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a lesson link
    const links = sidebar.querySelectorAll('.term-group a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeSidebar, 150);
      });
    });
  }

  function highlightActiveLesson() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const currentPath = location.pathname;
    const links = sidebar.querySelectorAll('.term-group a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http')) return;

      // Compare pathname
      if (currentPath === href || currentPath.endsWith(href.replace(/^\//, ''))) {
        link.classList.add('active-lesson');
      }
    });
  }

  function expandActiveParents() {
    const activeLink = document.querySelector('.sidebar .active-lesson');
    if (!activeLink) return;

    // Walk up the DOM and open all <details> ancestors
    let el = activeLink.parentElement;
    while (el && el !== document.body) {
      if (el.tagName === 'DETAILS') {
        el.setAttribute('open', '');
      }
      el = el.parentElement;
    }
  }
})();
