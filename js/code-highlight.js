/* ============================================================
   ANTIgravity — Lightweight Syntax Highlighting
   No dependencies. Supports Python, C++, and Pseudocode.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre code[data-lang]').forEach(block => {
        const lang = block.getAttribute('data-lang').toLowerCase();
        if (lang === 'python' || lang === 'py') {
            block.innerHTML = highlightPython(block.textContent);
        } else if (lang === 'cpp' || lang === 'c++') {
            block.innerHTML = highlightCpp(block.textContent);
        } else if (lang === 'pseudo' || lang === 'pseudocode') {
            block.innerHTML = highlightPseudo(block.textContent);
        }
    });
});

/* ---------- Helpers ---------- */
function esc(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function highlightWith(code, rules) {
    code = esc(code);
    for (const [regex, className] of rules) {
        code = code.replace(regex, (match, ...groups) => {
            // If there's a capturing group, wrap only the first group
            if (groups.length > 1 && typeof groups[0] === 'string') {
                const idx = match.indexOf(groups[0]);
                return match.slice(0, idx) +
                    `<span class="${className}">${groups[0]}</span>` +
                    match.slice(idx + groups[0].length);
            }
            return `<span class="${className}">${match}</span>`;
        });
    }
    return code;
}

/* ---------- Python ---------- */
function highlightPython(code) {
    const rules = [
        // Comments (must be first)
        [/(#.*$)/gm, 'syn-comment'],
        // Triple-quoted strings
        [/("""[\s\S]*?"""|'''[\s\S]*?''')/g, 'syn-string'],
        // Strings
        [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, 'syn-string'],
        // Decorators
        [/(@\w+)/g, 'syn-decorator'],
        // Keywords
        [/\b(def|class|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|import|from|pass|break|continue|yield|lambda|global|nonlocal|assert|del|True|False|None)\b/g, 'syn-keyword'],
        // Built-in functions
        [/\b(print|input|len|range|int|str|float|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|sorted|reversed|open|super|property|staticmethod|classmethod|abs|max|min|sum|round|format|hasattr|getattr|setattr)\b/g, 'syn-builtin'],
        // Function calls (name followed by parenthesis)
        [/\b([a-zA-Z_]\w*)(?=\s*\()/g, 'syn-function'],
        // Numbers
        [/\b(\d+\.?\d*)\b/g, 'syn-number'],
        // Operators
        [/(==|!=|&lt;=|&gt;=|&lt;|&gt;|\+=|-=|\*=|\/=|=|\+|-|\*|\/|%|\*\*|\/\/)/g, 'syn-operator'],
    ];
    return highlightWith(code, rules);
}

/* ---------- C++ ---------- */
function highlightCpp(code) {
    const rules = [
        // Single-line comments
        [/(\/\/.*$)/gm, 'syn-comment'],
        // Multi-line comments
        [/(\/\*[\s\S]*?\*\/)/g, 'syn-comment'],
        // Strings
        [/("(?:[^"\\]|\\.)*")/g, 'syn-string'],
        // Preprocessor
        [/(#\w+.*$)/gm, 'syn-decorator'],
        // Keywords
        [/\b(int|float|double|char|void|bool|string|auto|const|static|class|struct|enum|namespace|using|public|private|protected|virtual|override|new|delete|return|if|else|for|while|do|switch|case|break|continue|try|catch|throw|true|false|nullptr|include|iostream|std|cin|cout|endl)\b/g, 'syn-keyword'],
        // Types
        [/\b(vector|map|set|pair|array|queue|stack|list|unordered_map|unordered_set|size_t)\b/g, 'syn-type'],
        // Function calls
        [/\b([a-zA-Z_]\w*)(?=\s*\()/g, 'syn-function'],
        // Numbers
        [/\b(\d+\.?\d*f?)\b/g, 'syn-number'],
        // Operators
        [/(==|!=|&lt;=|&gt;=|&lt;&lt;|&gt;&gt;|&lt;|&gt;|\+=|-=|\*=|\/=|=|\+|-|\*|\/|%|::|-&gt;|&amp;&amp;|\|\|)/g, 'syn-operator'],
    ];
    return highlightWith(code, rules);
}

/* ---------- Pseudocode (Cambridge 9618 standard) ---------- */
function highlightPseudo(code) {
    const rules = [
        // Comments
        [/(\/\/.*$)/gm, 'syn-comment'],
        // Strings
        [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, 'syn-string'],
        // Keywords (uppercase Cambridge style)
        [/\b(DECLARE|CONSTANT|INPUT|OUTPUT|IF|THEN|ELSE|ENDIF|WHILE|ENDWHILE|FOR|TO|STEP|NEXT|REPEAT|UNTIL|PROCEDURE|ENDPROCEDURE|FUNCTION|RETURNS|ENDFUNCTION|RETURN|CALL|CASE OF|OTHERWISE|ENDCASE|TYPE|ENDTYPE|ARRAY|OF|OPENFILE|READFILE|WRITEFILE|CLOSEFILE|READ|WRITE|APPEND|AND|OR|NOT|TRUE|FALSE|MOD|DIV)\b/g, 'syn-keyword'],
        // Types
        [/\b(INTEGER|REAL|CHAR|STRING|BOOLEAN|DATE)\b/g, 'syn-type'],
        // Assignment
        [/(←|&lt;-|:=)/g, 'syn-operator'],
        // Numbers
        [/\b(\d+\.?\d*)\b/g, 'syn-number'],
        // Operators
        [/(==|!=|&lt;=|&gt;=|&lt;&gt;|&lt;|&gt;|=|\+|-|\*|\/)/g, 'syn-operator'],
    ];
    return highlightWith(code, rules);
}
