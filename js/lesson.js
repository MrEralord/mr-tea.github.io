/* ============================================================
   IT-Tea.org — Lesson Page JS
   Quiz reveal, scroll progress, nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initQuizReveal();
    initScrollProgress();
});

/* Quiz: click-to-reveal answers */
function initQuizReveal() {
    document.querySelectorAll('.quiz-answer').forEach(el => {
        el.addEventListener('click', () => {
            el.classList.toggle('revealed');
        });
    });
}

/* Scroll progress bar (optional) */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (window.scrollY / h * 100) + '%';
    });
}
