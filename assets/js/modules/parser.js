/**
 * Parser Module - Generic content renderer
 * Safely parses Markdown, JSON structured content, questions, tables, code blocks,
 * diagrams, and preserves technical math symbols and programming syntax.
 */

/**
 * Escapes HTML characters in code snippets to prevent corruption
 * Preserves syntax like <>, {}, [], (), &&, ||, ==, ===, !=, =>
 * @param {string} str 
 * @returns {string}
 */
export function escapeCode(str) {
  if (str === null || str === undefined) return '';
  if (typeof str !== 'string') {
    str = typeof str === 'object' && str.text ? str.text : String(str);
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Slugifies a text string for clean heading IDs and anchor links
 * @param {string} text 
 * @returns {string}
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Transforms Markdown callout blockquotes into stylized callout boxes
 * @param {string} html 
 * @returns {string}
 */
function enhanceCallouts(html) {
  return html.replace(/<blockquote>\s*<p>\s*\[!(NOTE|EXAM|WARNING|TIP|FORMULA|IMPORTANT)\]([\s\S]*?)<\/blockquote>/gi, (match, type, content) => {
    const typeUpper = type.toUpperCase();
    const classMap = {
      'NOTE': 'callout-note',
      'EXAM': 'callout-exam',
      'WARNING': 'callout-warning',
      'TIP': 'callout-tip',
      'FORMULA': 'callout-formula',
      'IMPORTANT': 'callout-warning'
    };
    const titleMap = {
      'NOTE': 'Note',
      'EXAM': 'Exam Alert 🎯',
      'WARNING': 'Warning ⚠️',
      'TIP': 'Tip 💡',
      'FORMULA': 'Key Formula 📐',
      'IMPORTANT': 'Important 📌'
    };

    const cssClass = classMap[typeUpper] || 'callout-note';
    const title = titleMap[typeUpper] || typeUpper;

    return `
      <div class="callout ${cssClass}">
        <div class="callout-header">
          <span>${title}</span>
        </div>
        <div class="callout-body">${content.trim()}</div>
      </div>
    `;
  });
}

/**
 * Automatically pairs code snippets with their immediate rendered output
 * into an adjoining side-by-side layout (code on left, output on right).
 * Operates directly on the rendered DOM tree for 100% reliability.
 * @param {HTMLElement} container 
 */
function enhanceCodePreviewGrid(container) {
  if (!container) return;

  const wrappers = Array.from(container.querySelectorAll('.code-wrapper'));
  wrappers.forEach(wrapper => {
    // Skip if already nested in a split grid
    if (wrapper.closest('.code-preview-grid')) return;

    let next = wrapper.nextElementSibling;
    // Check if next is an "Output:" label (<p><strong>Output:</strong></p> or <h3>Rendered Output</h3>)
    if (next && (/^(P|H[2-6])$/i.test(next.tagName)) && /^\s*(?:rendered\s+)?output:?\s*$/i.test(next.textContent.trim())) {
      const outputEl = next.nextElementSibling;
      if (!outputEl) return;

      const isOutputTarget = (
        outputEl.tagName === 'OL' ||
        outputEl.tagName === 'UL' ||
        outputEl.tagName === 'DL' ||
        outputEl.tagName === 'TABLE' ||
        outputEl.tagName === 'FORM' ||
        outputEl.classList.contains('table-wrapper') ||
        outputEl.classList.contains('rendered-form-container') ||
        outputEl.classList.contains('rendered-page-preview') ||
        outputEl.classList.contains('preview-output') ||
        outputEl.querySelector('form, table, ul, ol, dl, input, textarea, select, button, h1, h2, h3, p') !== null ||
        (outputEl.tagName === 'P' && outputEl.querySelector('a, input, textarea, select, button') !== null)
      );

      if (isOutputTarget) {
        // Construct side-by-side grid
        const grid = document.createElement('div');
        grid.className = 'code-preview-grid';

        const codePane = document.createElement('div');
        codePane.className = 'code-pane';

        const previewPane = document.createElement('div');
        previewPane.className = 'preview-pane';
        previewPane.innerHTML = `
          <div class="preview-header">
            <span class="preview-header-dot"></span>
            <span>Rendered Output</span>
          </div>
          <div class="preview-body"></div>
        `;

        // Insert grid in place of wrapper
        wrapper.parentNode.insertBefore(grid, wrapper);

        // Move wrapper into codePane
        codePane.appendChild(wrapper);

        // Move output element into preview-body
        previewPane.querySelector('.preview-body').appendChild(outputEl);

        // Remove the redundant "Output:" label
        next.remove();

        // Assemble the side-by-side grid
        grid.appendChild(codePane);
        grid.appendChild(previewPane);
      }
    }
  });
}

/**
 * Wraps each question and its solution inside a self-contained card container (.question-exam-card).
 * This cleanly encapsulates the question header, answer, points, and side-by-side preview grid.
 * @param {HTMLElement} container 
 */
function wrapQuestionsInCards(container) {
  if (!container) return;

  const headers = Array.from(container.querySelectorAll('.question-header-ribbon, h2[id^="question"]'));
  if (headers.length === 0) return;

  headers.forEach(header => {
    // If already inside an exam card, skip
    if (header.closest('.question-exam-card')) return;

    // If there is an immediate preceding HR, remove it to keep layout clean
    if (header.previousElementSibling && header.previousElementSibling.tagName === 'HR') {
      header.previousElementSibling.remove();
    }

    const card = document.createElement('div');
    card.className = 'question-exam-card';
    if (header.id) {
      card.id = header.id;
    }

    const cardHeader = document.createElement('div');
    cardHeader.className = 'question-card-header';

    const cardBody = document.createElement('div');
    cardBody.className = 'question-card-body';

    // Insert card before header
    header.parentNode.insertBefore(card, header);

    // Place header inside cardHeader
    cardHeader.appendChild(header);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    // Move all sibling nodes up until the next question or major section
    let nextEl = card.nextElementSibling;
    while (nextEl) {
      const isNextQuestion = nextEl.classList.contains('question-header-ribbon') || 
                             (nextEl.tagName === 'H2' && /^question/i.test(nextEl.id || '')) ||
                             (nextEl.classList && nextEl.classList.contains('question-exam-card'));
      const isNextSection = (nextEl.tagName === 'H1');
      const isDivider = (nextEl.tagName === 'HR');

      if (isNextQuestion || isNextSection) {
        break;
      }

      if (isDivider) {
        // Look ahead to check if this divider precedes the next question or major section
        const subsequent = nextEl.nextElementSibling;
        const isFollowedByQuestionOrSection = subsequent && (
          subsequent.classList.contains('question-header-ribbon') ||
          (subsequent.tagName === 'H2' && /^question/i.test(subsequent.id || '')) ||
          (subsequent.classList && subsequent.classList.contains('question-exam-card')) ||
          subsequent.tagName === 'H1'
        );

        if (isFollowedByQuestionOrSection) {
          nextEl.remove();
          break; // This divider separates consecutive questions, so complete this card
        }
      }

      const current = nextEl;
      nextEl = nextEl.nextElementSibling;
      cardBody.appendChild(current);
    }
  });
}

/**
 * Configures Marked.js with custom renderers for headings, tables, and code blocks
 */
function configureMarked() {
  if (typeof window.marked === 'undefined') return;

  const renderer = new window.marked.Renderer();

  // Headings with IDs for TOC and Question Ribbon Badges
  renderer.heading = function (arg1, arg2, arg3) {
    let text = '', level = 2, raw = '';
    if (typeof arg1 === 'object' && arg1 !== null) {
      // Marked v12+ token object
      level = arg1.depth || 2;
      raw = arg1.raw || arg1.text || '';
      text = arg1.text || raw;
    } else {
      text = arg1 || '';
      level = arg2 || 2;
      raw = arg3 || text;
    }
    const id = slugify(raw || text);

    // If it's a Question heading (e.g. "Question 1: What is an IP address?")
    const qMatch = text.match(/^Question\s+(\d+)[:\s]*(.*)/i);
    if ((level === 2 || level === 3) && qMatch) {
      const qNum = qMatch[1];
      let qTitle = qMatch[2].trim();
      // Clean any raw LaTeX or symbols from ribbon heading text
      qTitle = qTitle
        .replace(/\\Omega\b/g, 'Ω')
        .replace(/\\Theta\b/g, 'Θ')
        .replace(/\\(?:leq|le)\b/g, '≤')
        .replace(/\\(?:geq|ge)\b/g, '≥')
        .replace(/\\times\b/g, '×')
        .replace(/\\approx\b/g, '≈')
        .replace(/\\(?:rightarrow|to)\b/g, '→')
        .replace(/\$+/g, '');

      return `
        <h2 id="${id}" class="question-header-ribbon">
          <span class="question-badge-pill">Q ${qNum}</span>
          <span class="question-title-text">${qTitle}</span>
        </h2>\n
      `;
    }

    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };

  // Responsive Table Wrapper
  renderer.table = function (arg1, arg2) {
    if (typeof arg1 === 'object' && arg1 !== null && arg1.header) {
      return `
        <div class="table-wrapper">
          <table>
            <thead>${arg1.header}</thead>
            <tbody>${arg1.rows || ''}</tbody>
          </table>
        </div>
      `;
    }
    return `
      <div class="table-wrapper">
        <table>
          <thead>${arg1 || ''}</thead>
          <tbody>${arg2 || ''}</tbody>
        </table>
      </div>
    `;
  };

  // Safe Code Block with Copy Button
  renderer.code = function (arg1, arg2) {
    let code = '', infostring = '';
    if (typeof arg1 === 'object' && arg1 !== null) {
      code = arg1.text || '';
      infostring = arg1.lang || '';
    } else {
      code = typeof arg1 === 'string' ? arg1 : String(arg1 || '');
      infostring = typeof arg2 === 'string' ? arg2 : '';
    }

    const langMatch = (infostring || 'text').match(/\S*/);
    const lang = langMatch ? langMatch[0] : 'text';
    const displayLang = lang ? lang.toUpperCase() : 'CODE';
    
    // Trim leading/trailing blank lines and collapse redundant blank lines to conserve vertical space
    const cleanedCode = code.replace(/^\s*\n+|\n+\s*$/g, '').replace(/(\r?\n\s*){2,}\r?\n/g, '\n\n');
    const safeCode = escapeCode(cleanedCode);

    return `
      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-lang">${displayLang}</span>
          <button class="code-copy-button" data-action="copy-code" title="Copy code snippet">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <pre class="language-${lang}"><code class="language-${lang}">${safeCode}</code></pre>
      </div>
    `;
  };

  const markedConfig = {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true
  };

  try {
    if (typeof window.marked.use === 'function') {
      window.marked.use(markedConfig);
    } else if (typeof window.marked.setOptions === 'function') {
      window.marked.setOptions(markedConfig);
    }
  } catch (e) {
    console.warn('Marked configuration warning:', e);
  }
}

/**
 * Binds copy button functionality in code snippets
 * @param {HTMLElement} container 
 */
function attachCodeCopyListeners(container) {
  container.querySelectorAll('[data-action="copy-code"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-wrapper')?.querySelector('pre code');
      if (!codeBlock) return;

      const codeText = codeBlock.textContent || '';
      try {
        await navigator.clipboard.writeText(codeText);
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--status-success);">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: var(--status-success); font-weight: 600;">Copied!</span>
        `;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `;
        }, 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    });
  });
}

/**
 * Main content parser: Renders Markdown or JSON data into target element
 * @param {string|Object} rawContent - Raw markdown string or JSON content structure
 * @param {HTMLElement} targetElement - DOM element to inject rendered HTML into
 */
export function parseAndRender(rawContent, targetElement) {
  if (!targetElement) return;

  if (rawContent === null || rawContent === undefined) {
    targetElement.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📄</div>
        <div class="empty-state-title">No content loaded</div>
        <p class="empty-state-desc">Select an item from the sidebar to view notes or questions.</p>
      </div>
    `;
    return;
  }

  // Handle JSON-structured content blocks if provided
  if (typeof rawContent === 'object') {
    renderStructuredContent(rawContent, targetElement);
    return;
  }

  // Handle Markdown Content
  configureMarked();

  let html = '';
  if (typeof window.marked !== 'undefined' && typeof window.marked.parse === 'function') {
    try {
      html = window.marked.parse(rawContent);
    } catch (parseErr) {
      console.error('Marked parse error, using fallback:', parseErr);
      html = `<div class="raw-markdown-fallback"><pre>${escapeCode(rawContent)}</pre></div>`;
    }
  } else {
    // Basic fallback if marked CDN is unreachable
    html = `<p>${escapeCode(rawContent).replace(/\n/g, '<br>')}</p>`;
  }

  // Apply callout transformations
  html = enhanceCallouts(html);

  // Set innerHTML
  targetElement.innerHTML = html;

  // Apply side-by-side code & output transformation directly in DOM
  enhanceCodePreviewGrid(targetElement);

  // Wrap each question and its solution inside an enclosed exam card
  wrapQuestionsInCards(targetElement);

  // Initialize interactive copy buttons
  attachCodeCopyListeners(targetElement);

  // Apply Prism.js syntax highlighting if present
  if (window.Prism) {
    window.Prism.highlightAllUnder(targetElement);
  }

  // Render mathematical expressions with KaTeX and clean legacy symbols
  renderMathAndCleanSymbols(targetElement);
}

/**
 * Renders flexible JSON-structured content blocks (Q&A, diagrams, callouts, lists)
 * @param {Object} data 
 * @param {HTMLElement} targetElement 
 */
function renderStructuredContent(data, targetElement) {
  let html = '';

  if (data.title) {
    html += `<h1>${escapeCode(data.title)}</h1>`;
  }

  if (data.description) {
    html += `<p class="content-lead">${escapeCode(data.description)}</p>`;
  }

  if (Array.isArray(data.items)) {
    data.items.forEach(item => {
      if (item.type === 'question' || item.question) {
        html += `
          <div class="qa-card">
            <div class="qa-header">
              <h3 class="qa-question-title">${escapeCode(item.question)}</h3>
              ${item.marks ? `<span class="badge badge-accent">${escapeCode(item.marks)} Marks</span>` : ''}
            </div>
            <div class="qa-body">
              <div>${item.answer ? window.marked ? window.marked.parse(item.answer) : escapeCode(item.answer) : ''}</div>
              ${item.explanation ? `
                <div class="qa-explanation-box">
                  <strong>Explanation:</strong>
                  <div>${item.explanation}</div>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      } else if (item.type === 'diagram') {
        html += `
          <div class="diagram-container">
            <img src="${item.src}" alt="${escapeCode(item.caption || 'Diagram')}" loading="lazy">
            ${item.caption ? `<div class="diagram-caption">${escapeCode(item.caption)}</div>` : ''}
          </div>
        `;
      } else if (item.type === 'callout') {
        html += `
          <div class="callout callout-${item.variant || 'note'}">
            <div class="callout-header">${escapeCode(item.title || 'Note')}</div>
            <div>${item.content}</div>
          </div>
        `;
      } else if (item.markdown) {
        html += window.marked ? window.marked.parse(item.markdown) : escapeCode(item.markdown);
      }
    });
  }

  targetElement.innerHTML = html;
  enhanceCodePreviewGrid(targetElement);
  attachCodeCopyListeners(targetElement);

  if (window.Prism) {
    window.Prism.highlightAllUnder(targetElement);
  }

  renderMathAndCleanSymbols(targetElement);
}

/**
 * Renders mathematical expressions via KaTeX and performs a site-wide
 * cleanup of any raw LaTeX/Unicode characters so they display cleanly.
 * @param {HTMLElement} container 
 */
function renderMathAndCleanSymbols(container) {
  if (!container) return;

  // 1. If KaTeX auto-render is available, render mathematical formulas
  if (typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false,
        errorColor: '#f43f5e',
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      });
    } catch (mathErr) {
      console.warn('KaTeX auto-render error:', mathErr);
    }
  }

  // 2. Perform DOM-level symbol normalization for any text nodes outside <pre>, <code>, and .katex
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('pre') || parent.closest('code') || parent.closest('.katex')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    let text = node.nodeValue;
    if (!text) return;

    // Replace bare LaTeX and entities with clean Unicode equivalents
    let replaced = text
      .replace(/\\Omega\b/g, 'Ω')
      .replace(/\\Theta\b/g, 'Θ')
      .replace(/\\(?:leq|le)\b/g, '≤')
      .replace(/\\(?:geq|ge)\b/g, '≥')
      .replace(/\\times\b/g, '×')
      .replace(/\\approx\b/g, '≈')
      .replace(/\\(?:neq|ne)\b/g, '≠')
      .replace(/\\(?:rightarrow|to)\b/g, '→')
      .replace(/\\leftarrow\b/g, '←')
      .replace(/\\pm\b/g, '±')
      .replace(/\\dots\b/g, '…')
      .replace(/\\cdot\b/g, '·')
      .replace(/\\in\b/g, '∈')
      .replace(/\\notin\b/g, '∉')
      .replace(/\\subseteq\b/g, '⊆')
      .replace(/\\subset\b/g, '⊂')
      .replace(/\\cap\b/g, '∩')
      .replace(/\\cup\b/g, '∪')
      .replace(/\\emptyset\b/g, '∅')
      .replace(/\\infty\b/g, '∞')
      .replace(/\\sqrt\b/g, '√')
      .replace(/\\sum\b/g, '∑')
      // If any lone $ remains around simple Big-O notations in headings or cards
      .replace(/\$O\(([^$]+)\)\$/g, 'O($1)')
      .replace(/\$Ω\(([^$]+)\)\$/g, 'Ω($1)')
      .replace(/\$Θ\(([^$]+)\)\$/g, 'Θ($1)');

    if (replaced !== text) {
      node.nodeValue = replaced;
    }
  });
}
