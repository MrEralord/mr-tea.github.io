/**
 * MR-TEA Educational Web Platform
 * Project concept and architecture: Yerassyl Tleudin
 * Development: AI-assisted under author's direction
 * © 2026 Yerassyl Tleudin
 */

document.addEventListener('DOMContentLoaded', () => {
    initQuizReveal();
    initScrollProgress();
});

/* Quiz: click-to-reveal answers */
function initQuizReveal() {
    document.querySelectorAll('.quiz-answer').forEach(el => {
        el.addEventListener('click', () => {
            /* New format: answer stored in data-answer attribute */
            if (!el.classList.contains('revealed') && el.dataset.answer) {
                el.textContent = el.dataset.answer;
            }
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
