/* ============================================================
   i18n — Trilingual support (EN / RU / KZ)
   ============================================================ */

const TRANSLATIONS = {
    en: {
        // ── Navigation ──
        'nav.lab': 'Lab',
        'nav.assessment': 'Assessment',
        'nav.syllabus': 'Syllabus',
        'nav.teacher': "Teacher's Area",

        // ── Hero ──
        'hero.badge': 'NIS 2025 · Cambridge AS & A Level 9618',
        'hero.title': 'Learn CS with',
        'hero.subtitle': 'Structured knowledge base for grades 11–12. Computer Science theory and Python programming — aligned with NIS and Cambridge standards.',
        'hero.tag.python': 'Python',
        'hero.tag.hardware': 'Hardware',
        'hero.tag.databases': 'Databases',
        'hero.tag.security': 'Security',
        'hero.tag.networks': 'Networks',

        // ── Interactive Lab ──
        'lab.title': 'Interactive Lab',
        'lab.subtitle': 'Hands-on simulators and tools for deeper understanding',
        'lab.python.title': 'Python Compiler',
        'lab.python.desc': 'Write, run and debug Python code directly in your browser. Instant feedback on your solutions.',
        'lab.python.tag': 'Interactive',
        'lab.float.title': 'Data Representation Lab',
        'lab.float.desc': 'Custom 16-bit floating point (12m/4e) and Number Systems converter. Aligned with Cambridge 9618.',
        'lab.float.tag': 'Lab Tool',
        'lab.logic.title': 'Logic Gates',
        'lab.logic.desc': 'Build and test logic circuits with AND, OR, NOT, NAND, NOR, XOR gates. Generate truth tables automatically.',
        'lab.logic.tag': 'Simulator',
        'lab.lmc.title': 'LMC Emulator',
        'lab.lmc.desc': 'Little Man Computer emulator. Write assembly-level programs and step through execution cycle by cycle.',
        'lab.lmc.tag': 'Emulator',

        // ── Syllabus ──
        'syllabus.title': 'Full Syllabus',
        'syllabus.subtitle': 'Complete NIS 2025 learning objectives — Grades 11 & 12',
        'syllabus.tab.g11cs': 'Grade 11 CS',
        'syllabus.tab.g11prog': 'Grade 11 PROG',
        'syllabus.tab.g12cs': 'Grade 12 CS',
        'syllabus.tab.g12prog': 'Grade 12 PROG',
        'syllabus.grade.g11cs': 'Grade 11 — Computer Science (CS)',
        'syllabus.grade.g11prog': 'Grade 11 — Programming (PROG)',
        'syllabus.grade.g12cs': 'Grade 12 — Computer Science (CS)',
        'syllabus.grade.g12prog': 'Grade 12 — Programming (PROG)',
        'term.1': 'Term 1',
        'term.2': 'Term 2',
        'term.3': 'Term 3',
        'term.4': 'Term 4',

        // ── Assessment Hub ──
        'assess.title': 'Assessment Hub',
        'assess.subtitle': 'Mock exams and resources aligned with NIS and Cambridge standards',
        'assess.mock.label': 'Mock Exams',
        'assess.mock.title': 'SAT / SAU Papers',
        'assess.mock.desc': 'Ready-to-use papers specifically for NIS 2025.',
        'assess.mock.btn': 'Access Papers',
        'assess.res.label': 'Resources',
        'assess.res.title': 'Guides & Past Papers',
        'assess.res.desc': 'Guides, Mark Schemes and Cambridge Past Papers.',
        'assess.res.btn': 'Browse Resources',

        // ── Footer ──
        'footer.standards': 'NIS 2025 · Cambridge AS & A Level 9618',
        'footer.copy': '© 2025 mr. TEA — All rights reserved.'
    },

    ru: {
        'nav.lab': 'Лаборатория',
        'nav.assessment': 'Оценивание',
        'nav.syllabus': 'Силлабус',
        'nav.teacher': 'Учительская',

        'hero.badge': 'НИШ 2025 · Cambridge AS & A Level 9618',
        'hero.title': 'Изучай CS с',
        'hero.subtitle': 'Структурированная база знаний для 11–12 классов. Теория информатики и программирование на Python — по стандартам НИШ и Cambridge.',
        'hero.tag.python': 'Python',
        'hero.tag.hardware': 'Железо',
        'hero.tag.databases': 'Базы данных',
        'hero.tag.security': 'Безопасность',
        'hero.tag.networks': 'Сети',

        'lab.title': 'Интерактивная лаборатория',
        'lab.subtitle': 'Практические симуляторы и инструменты для глубокого понимания',
        'lab.python.title': 'Компилятор Python',
        'lab.python.desc': 'Пиши, запускай и отлаживай код на Python прямо в браузере. Мгновенная обратная связь.',
        'lab.python.tag': 'Интерактив',
        'lab.float.title': 'Представление данных',
        'lab.float.desc': '16-битная плавающая точка (12m/4e) и конвертер систем счисления. По стандарту Cambridge 9618.',
        'lab.float.tag': 'Инструмент',
        'lab.logic.title': 'Логические вентили',
        'lab.logic.desc': 'Строй и тестируй логические схемы с AND, OR, NOT, NAND, NOR, XOR. Автогенерация таблиц истинности.',
        'lab.logic.tag': 'Симулятор',
        'lab.lmc.title': 'Эмулятор LMC',
        'lab.lmc.desc': 'Эмулятор Little Man Computer. Пиши программы на ассемблере и выполняй по тактам.',
        'lab.lmc.tag': 'Эмулятор',

        'syllabus.title': 'Полный силлабус',
        'syllabus.subtitle': 'Все цели обучения НИШ 2025 — 11 и 12 классы',
        'syllabus.tab.g11cs': '11 класс CS',
        'syllabus.tab.g11prog': '11 класс PROG',
        'syllabus.tab.g12cs': '12 класс CS',
        'syllabus.tab.g12prog': '12 класс PROG',
        'syllabus.grade.g11cs': '11 класс — Информатика (CS)',
        'syllabus.grade.g11prog': '11 класс — Программирование (PROG)',
        'syllabus.grade.g12cs': '12 класс — Информатика (CS)',
        'syllabus.grade.g12prog': '12 класс — Программирование (PROG)',
        'term.1': 'Четверть 1',
        'term.2': 'Четверть 2',
        'term.3': 'Четверть 3',
        'term.4': 'Четверть 4',

        'assess.title': 'Центр оценивания',
        'assess.subtitle': 'Пробные экзамены и ресурсы по стандартам НИШ и Cambridge',
        'assess.mock.label': 'Пробные экзамены',
        'assess.mock.title': 'Работы СОР / СОЧ',
        'assess.mock.desc': 'Готовые работы для НИШ 2025.',
        'assess.mock.btn': 'Скачать работы',
        'assess.res.label': 'Ресурсы',
        'assess.res.title': 'Гайды и Past Papers',
        'assess.res.desc': 'Гайды, Mark Schemes и Cambridge Past Papers.',
        'assess.res.btn': 'Открыть ресурсы',

        'footer.standards': 'НИШ 2025 · Cambridge AS & A Level 9618',
        'footer.copy': '© 2025 mr. TEA — Все права защищены.'
    },

    kz: {
        'nav.lab': 'Зертхана',
        'nav.assessment': 'Бағалау',
        'nav.syllabus': 'Силлабус',
        'nav.teacher': 'Мұғалімдер бөлімі',

        'hero.badge': 'НЗМ 2025 · Cambridge AS & A Level 9618',
        'hero.title': 'CS-ті үйрен',
        'hero.subtitle': '11–12 сынып үшін құрылымдалған білім базасы. Информатика теориясы және Python бағдарламалау — НЗМ және Cambridge стандарттарына сәйкес.',
        'hero.tag.python': 'Python',
        'hero.tag.hardware': 'Аппараттық құрал',
        'hero.tag.databases': 'Деректер қоры',
        'hero.tag.security': 'Қауіпсіздік',
        'hero.tag.networks': 'Желілер',

        'lab.title': 'Интерактивті зертхана',
        'lab.subtitle': 'Тереңірек түсіну үшін тәжірибелік симуляторлар мен құралдар',
        'lab.python.title': 'Python компиляторы',
        'lab.python.desc': 'Python кодын тікелей браузерде жазыңыз, іске қосыңыз және жөндеңіз. Лезде кері байланыс.',
        'lab.python.tag': 'Интерактив',
        'lab.float.title': 'Деректер көрсетілімі',
        'lab.float.desc': '16-биттік жылжымалы нүкте (12m/4e) және санау жүйелері конвертері. Cambridge 9618 стандартына сәйкес.',
        'lab.float.tag': 'Құрал',
        'lab.logic.title': 'Логикалық вентильдер',
        'lab.logic.desc': 'AND, OR, NOT, NAND, NOR, XOR вентильдерімен логикалық схемалар құрыңыз. Ақиқаттық кестелерін автоматты жасаңыз.',
        'lab.logic.tag': 'Симулятор',
        'lab.lmc.title': 'LMC эмуляторы',
        'lab.lmc.desc': 'Little Man Computer эмуляторы. Ассемблер деңгейіндегі бағдарламалар жазыңыз және тактілер бойынша орындаңыз.',
        'lab.lmc.tag': 'Эмулятор',

        'syllabus.title': 'Толық силлабус',
        'syllabus.subtitle': 'НЗМ 2025 оқу мақсаттарының толық тізімі — 11 және 12 сыныптар',
        'syllabus.tab.g11cs': '11 сынып CS',
        'syllabus.tab.g11prog': '11 сынып PROG',
        'syllabus.tab.g12cs': '12 сынып CS',
        'syllabus.tab.g12prog': '12 сынып PROG',
        'syllabus.grade.g11cs': '11 сынып — Информатика (CS)',
        'syllabus.grade.g11prog': '11 сынып — Бағдарламалау (PROG)',
        'syllabus.grade.g12cs': '12 сынып — Информатика (CS)',
        'syllabus.grade.g12prog': '12 сынып — Бағдарламалау (PROG)',
        'term.1': '1-тоқсан',
        'term.2': '2-тоқсан',
        'term.3': '3-тоқсан',
        'term.4': '4-тоқсан',

        'assess.title': 'Бағалау орталығы',
        'assess.subtitle': 'НЗМ және Cambridge стандарттарына сәйкес сынақ емтихандар мен ресурстар',
        'assess.mock.label': 'Сынақ емтихандар',
        'assess.mock.title': 'БЖБ / ТЖБ жұмыстары',
        'assess.mock.desc': 'НЗМ 2025 үшін дайын жұмыстар.',
        'assess.mock.btn': 'Жұмыстарды жүктеу',
        'assess.res.label': 'Ресурстар',
        'assess.res.title': 'Нұсқаулықтар және Past Papers',
        'assess.res.desc': 'Нұсқаулықтар, Mark Schemes және Cambridge Past Papers.',
        'assess.res.btn': 'Ресурстарды ашу',

        'footer.standards': 'НЗМ 2025 · Cambridge AS & A Level 9618',
        'footer.copy': '© 2025 mr. TEA — Барлық құқықтар қорғалған.'
    }
};

/* ── Apply translations ── */
function setLanguage(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] != null) {
            el.textContent = dict[key];
        }
    });

    // Translate term labels (detect term number from text)
    document.querySelectorAll('.term-label').forEach(label => {
        const text = label.textContent;
        const match = text.match(/\d/);
        if (match) {
            const key = 'term.' + match[0];
            if (dict[key]) {
                label.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = ' ' + dict[key] + ' ';
                    }
                });
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'kz' ? 'kk' : lang;

    // Highlight active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Persist choice
    localStorage.setItem('site-lang', lang);
}

/* ── Initialize ── */
function initI18n() {
    // Attach click handlers to lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Restore saved language or default to English
    const saved = localStorage.getItem('site-lang') || 'en';
    if (saved !== 'en') {
        setLanguage(saved);
    } else {
        // Just highlight the EN button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === 'en');
        });
    }
}

document.addEventListener('DOMContentLoaded', initI18n);
