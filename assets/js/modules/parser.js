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
 * Automatically groups code blocks with their immediately following Output into
 * a responsive side-by-side split grid (code on left, rendered output on right).
 * Handles lists (ol, ul, dl), tables, code blocks, and inline list output.
 * @param {string} html 
 * @returns {string}
 */
function enhanceCodePreviewGrid(html) {
  // Pattern 1: Output heading or <p><strong>Output:</strong></p> followed by block element
  const labelPattern = '(?:<p>\\s*(?:<strong>)?\\s*(?:Expected\\s+|Rendered\\s+|Browser\\s+)?Output:?\\s*(?:</strong>)?\\s*</p>|<h[1-6][^>]*>\\s*(?:Expected\\s+|Rendered\\s+|Browser\\s+)?Output:?\\s*</h[1-6]>)';
  const blockRegex = new RegExp(
    '(<div class="code-wrapper">[\\s\\S]*?</div>)\\s*' +
    labelPattern +
    '\\s*(<ol[\\s\\S]*?</ol>|<ul[\\s\\S]*?</ul>|<dl[\\s\\S]*?</dl>|<div class="table-wrapper">[\\s\S]*?</div>|<table[\\s\\S]*?</table>|<div class="code-wrapper">[\\s\\S]*?</div>|<pre[\\s\\S]*?</pre>)',
    'gi'
  );

  html = html.replace(blockRegex, (match, codeBlock, outputBlock) => {
    return `
      <div class="code-preview-grid">
        <div class="code-pane">${codeBlock}</div>
        <div class="preview-pane">
          <div class="preview-header">
            <span class="preview-header-dot"></span>
            <span>Rendered Output</span>
          </div>
          <div class="preview-body">${outputBlock}</div>
        </div>
      </div>
    `;
  });

  // Pattern 2: Output followed by inline items within the same <p> (e.g. <p><strong>Output:</strong><br>- HTML<br>- CSS</p>)
  const inlineListRegex = /(<div class="code-wrapper">[\s\S]*?<\/div>)\s*<p>\s*(?:<strong>)?\s*(?:Expected\s+|Rendered\s+|Browser\s+)?Output:?\s*(?:<\/strong>)?\s*(?:<br\s*\/?>|\n)([\s\S]*?)<\/p>/gi;

  html = html.replace(inlineListRegex, (match, codeBlock, content) => {
    const rawLines = content.split(/<br\s*\/?>|\n/).map(l => l.replace(/^(?:<br\s*\/?>|\s)+/, '').trim()).filter(Boolean);
    const isOrdered = rawLines.some(l => /^\d+[\.\)]/.test(l));
    const tag = isOrdered ? 'ol' : 'ul';
    const itemsHtml = rawLines.map(l => {
      const clean = l.replace(/^(?:[-*•]|\d+[\.\)])\s*/, '');
      return `<li>${clean}</li>`;
    }).join('\n');
    const outputBlock = `<${tag}>\n${itemsHtml}\n</${tag}>`;

    return `
      <div class="code-preview-grid">
        <div class="code-pane">${codeBlock}</div>
        <div class="preview-pane">
          <div class="preview-header">
            <span class="preview-header-dot"></span>
            <span>Rendered Output</span>
          </div>
          <div class="preview-body">${outputBlock}</div>
        </div>
      </div>
    `;
  });

  return html;
}

/**
 * Configures Marked.js with custom renderers for headings, tables, and code blocks
 */
function configureMarked() {
  if (typeof window.marked === 'undefined') return;

  const renderer = new window.marked.Renderer();

  // Headings with IDs for TOC (supports both Marked v4-v11 and v12+)
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
    const safeCode = escapeCode(code);

    return `
      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-lang">${displayLang}</span>
          <button class="code-copy-button" data-action="copy-code" title="Copy code snippet">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <pre><code class="language-${lang}">${safeCode}</code></pre>
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

  // Apply side-by-side code & output transformation
  html = enhanceCodePreviewGrid(html);

  // Set innerHTML
  targetElement.innerHTML = html;

  // Initialize interactive copy buttons
  attachCodeCopyListeners(targetElement);

  // Apply Prism.js syntax highlighting if present
  if (window.Prism) {
    window.Prism.highlightAllUnder(targetElement);
  }
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
  attachCodeCopyListeners(targetElement);

  if (window.Prism) {
    window.Prism.highlightAllUnder(targetElement);
  }
}
