/**
 * Search Module - Reusable client-side indexing and search engine
 * Searches dynamically across subjects, questions, concepts, notes, and explanations
 */

/**
 * Builds a searchable index from provided subjects or content records
 * @param {Array<Object>} subjects - Array of subject objects
 * @returns {Array<Object>} Indexed records ready for rapid filtering
 */
export function buildIndex(subjects = []) {
  if (!Array.isArray(subjects)) return [];

  const index = [];

  subjects.forEach(subject => {
    // 1. Index the subject itself
    index.push({
      type: 'subject',
      id: subject.id,
      title: subject.title || subject.name || '',
      description: subject.description || '',
      subjectId: subject.id,
      url: `notes.html?subject=${encodeURIComponent(subject.id)}`,
      searchTokens: `${subject.title || ''} ${subject.description || ''} ${subject.id || ''}`.toLowerCase()
    });

    // 2. Index content items if present (flexible data model)
    if (Array.isArray(subject.content)) {
      subject.content.forEach(item => {
        index.push({
          type: item.type || 'content',
          id: item.id || `${subject.id}-${item.title || Math.random()}`,
          title: item.title || item.question || 'Untitled Item',
          description: item.summary || item.description || item.answer || '',
          subjectId: subject.id,
          subjectTitle: subject.title,
          url: `notes.html?subject=${encodeURIComponent(subject.id)}&content=${encodeURIComponent(item.id || item.file || '')}`,
          searchTokens: `${item.title || ''} ${item.question || ''} ${item.summary || ''} ${item.answer || ''} ${subject.title || ''}`.toLowerCase()
        });
      });
    }

    // 3. Index navigation groups and items
    if (Array.isArray(subject.navigation)) {
      subject.navigation.forEach(group => {
        const items = group.items || group.children || [];
        items.forEach(item => {
          const targetUrl = `notes.html?subject=${encodeURIComponent(subject.id)}&content=${encodeURIComponent(item.id || item.file || '')}`;

          index.push({
            type: 'topic',
            id: item.id || item.file,
            title: item.title || 'Untitled Topic',
            description: `${group.title || ''} • ${subject.title || ''}`,
            subjectId: subject.id,
            subjectTitle: subject.title,
            url: targetUrl,
            searchTokens: `${item.title || ''} ${group.title || ''} ${item.badge || ''} ${subject.title || ''}`.toLowerCase()
          });
        });
      });
    }
  });

  return index;
}

/**
 * Queries the index with user input
 * @param {string} query 
 * @param {Array<Object>} index 
 * @param {number} maxResults 
 * @returns {Array<Object>}
 */
export function search(query, index = [], maxResults = 8) {
  if (!query || typeof query !== 'string') return [];
  const cleanQuery = query.toLowerCase().trim();
  if (cleanQuery.length === 0) return [];

  const terms = cleanQuery.split(/\s+/).filter(t => t.length > 0);

  return index
    .filter(record => {
      // Must match all search terms
      return terms.every(term => record.searchTokens.includes(term));
    })
    .slice(0, maxResults);
}

/**
 * Initializes search input UI and interactive dropdown
 * @param {Object} options
 * @param {HTMLInputElement} options.inputEl - Search text input element
 * @param {HTMLElement} options.dropdownEl - Dropdown container element
 * @param {Array<Object>} options.index - The search index
 * @param {Function} [options.onSelect] - Optional selection callback
 */
export function initSearchUI({ inputEl, dropdownEl, index = [], onSelect }) {
  if (!inputEl || !dropdownEl) return;

  let activeIndex = -1;

  const renderDropdown = (results) => {
    if (results.length === 0) {
      dropdownEl.innerHTML = `
        <div style="padding: var(--space-4); text-align: center; color: var(--text-muted); font-size: var(--text-xs);">
          No matching results found.
        </div>
      `;
      dropdownEl.classList.add('active');
      return;
    }

    dropdownEl.innerHTML = results.map((item, idx) => `
      <div class="search-item ${idx === activeIndex ? 'selected' : ''}" data-idx="${idx}" data-url="${item.url}">
        <div>
          <div class="search-item-title">${escapeHtml(item.title)}</div>
          <div class="search-item-meta">
            <span>${escapeHtml(item.type.toUpperCase())}</span>
            ${item.subjectTitle ? `<span>• ${escapeHtml(item.subjectTitle)}</span>` : ''}
          </div>
        </div>
        <span class="badge badge-subtle">View →</span>
      </div>
    `).join('');

    dropdownEl.classList.add('active');

    // Attach click handlers
    dropdownEl.querySelectorAll('.search-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const idx = parseInt(itemEl.getAttribute('data-idx'), 10);
        const selectedItem = results[idx];
        if (onSelect) {
          onSelect(selectedItem);
        } else if (selectedItem.url) {
          window.location.href = selectedItem.url;
        }
        dropdownEl.classList.remove('active');
      });
    });
  };

  inputEl.addEventListener('input', () => {
    const query = inputEl.value;
    activeIndex = -1;

    if (query.trim().length === 0) {
      dropdownEl.classList.remove('active');
      return;
    }

    const matches = search(query, index);
    renderDropdown(matches);
  });

  // Keyboard navigation
  inputEl.addEventListener('keydown', (e) => {
    const items = dropdownEl.querySelectorAll('.search-item');
    if (!dropdownEl.classList.contains('active') || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      highlightItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      highlightItem(items);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault();
        items[activeIndex].click();
      }
    } else if (e.key === 'Escape') {
      dropdownEl.classList.remove('active');
    }
  });

  function highlightItem(items) {
    items.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
      dropdownEl.classList.remove('active');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
