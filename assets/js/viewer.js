/**
 * Content Viewer Controller (notes.html)
 * Dynamically loads subjects, content files, renders navigation, builds TOC,
 * manages bookmarks, reading progress, and font zoom.
 */

import {
  getSavedTheme,
  saveTheme,
  getBookmarks,
  isBookmarked,
  toggleBookmark,
  addRecentSubject,
  getRecentSubjects,
  addRecentContent,
  saveReadingPosition,
  getReadingPosition
} from './modules/storage.js';

import { parseAndRender } from './modules/parser.js?v=1.2';
import {
  renderSidebar,
  buildTableOfContents,
  initMobileDrawer,
  initReadingProgress,
  renderPagination
} from './modules/navigation.js';

import { buildIndex, initSearchUI } from './modules/search.js';
import { initBackgroundSystem } from './modules/effects.js';

let cachedSubjects = [];
let currentSubject = null;
let currentContentItem = null;
let currentFontSizeRem = 1.05;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Theme, Background System & Shell Controls
  initTheme();
  initBackgroundSystem();

  const progressBar = document.getElementById('reading-progress-fill');
  initReadingProgress(progressBar);

  const sidebarEl = document.getElementById('viewer-sidebar');
  const toggleBtnEl = document.querySelector('[data-action="toggle-sidebar"]');
  const backdropEl = document.getElementById('drawer-backdrop');
  initMobileDrawer(sidebarEl, toggleBtnEl, backdropEl);

  // DOM Containers
  const contentEl = document.getElementById('viewer-content');
  const sidebarNavContainer = document.getElementById('sidebar-nav-container');
  const tocContainer = document.getElementById('toc-content');
  const breadcrumbsEl = document.getElementById('viewer-breadcrumbs');
  const metaHeaderEl = document.getElementById('content-meta-header');
  const paginationEl = document.getElementById('viewer-pagination');
  const searchInput = document.getElementById('viewer-search-input');
  const searchDropdown = document.getElementById('viewer-search-dropdown');

  // Font Zoom & Print Controls
  initReadabilityControls(contentEl);

  // 2. Fetch Master Registry
  try {
    const response = await fetch(`data/subjects.json?_t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load subjects catalog: ${response.status}`);
    }
    const data = await response.json();
    cachedSubjects = Array.isArray(data.subjects) ? data.subjects : [];

    // Initialize search across loaded subjects
    if (searchInput && searchDropdown) {
      const searchIndex = buildIndex(cachedSubjects);
      initSearchUI({
        inputEl: searchInput,
        dropdownEl: searchDropdown,
        index: searchIndex,
        onSelect: (item) => {
          if (item.type === 'subject') {
            loadSubject(item.id, null);
          } else {
            loadSubject(item.subjectId, item.id);
          }
        }
      });
    }

    // Initialize Sidebar Tabs (Nav vs Bookmarks)
    initSidebarTabs(sidebarNavContainer);

    // 3. Resolve Current Subject and Content from URL or Recent Storage
    const params = new URLSearchParams(window.location.search);
    const targetSubjectId = params.get('subject');
    const targetContentId = params.get('content') || params.get('file');

    if (targetSubjectId) {
      await loadSubject(targetSubjectId, targetContentId);
    } else {
      // Intelligently resume the last opened subject if recorded
      const recents = getRecentSubjects();
      const lastOpenedSubject = recents.length > 0 ? cachedSubjects.find(s => s.id === recents[0].id) : null;

      if (lastOpenedSubject) {
        await loadSubject(lastOpenedSubject.id, null);
      } else if (cachedSubjects.length > 0) {
        // Fallback to Web Technologies (primary exam course) or first available
        const defaultSub = cachedSubjects.find(s => s.id === 'web-technologies') || cachedSubjects[0];
        await loadSubject(defaultSub.id, null);
      } else {
        renderNoContentState(contentEl, sidebarNavContainer, tocContainer);
      }
    }

    // 4. Handle browser popstate
    window.addEventListener('popstate', async () => {
      const p = new URLSearchParams(window.location.search);
      const sub = p.get('subject');
      const cont = p.get('content') || p.get('file');
      if (sub) {
        await loadSubject(sub, cont, false);
      }
    });

  } catch (error) {
    console.error('Viewer initialization error:', error);
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h2 class="empty-state-title">Viewer Offline</h2>
          <p class="empty-state-desc">Could not load subjects catalog. Make sure the portal is hosted on a local web server (e.g. Live Server on http://127.0.0.1:5500).</p>
        </div>
      `;
    }
  }
});

/**
 * Loads a subject by ID and optionally a specific content item
 * @param {string} subjectId 
 * @param {string|null} contentId 
 * @param {boolean} [updateHistory=true] 
 */
async function loadSubject(subjectId, contentId = null, updateHistory = true) {
  currentSubject = cachedSubjects.find(s => s.id === subjectId) || null;
  const contentEl = document.getElementById('viewer-content');
  const sidebarNavContainer = document.getElementById('sidebar-nav-container');
  const tocContainer = document.getElementById('toc-content');

  if (!currentSubject) {
    renderNoContentState(contentEl, sidebarNavContainer, tocContainer);
    return;
  }

  // Record recent subject view
  addRecentSubject(currentSubject);

  // Extract navigation items
  const navData = currentSubject.navigation || currentSubject.content || [];

  // Determine active content item
  let activeItem = null;
  if (contentId && Array.isArray(navData)) {
    activeItem = findNavItem(navData, contentId);
  }
  if (!activeItem && Array.isArray(navData) && navData.length > 0) {
    activeItem = getFirstNavItem(navData);
  }

  currentContentItem = activeItem;

  // Render dynamic sidebar
  renderSidebar(sidebarNavContainer, navData, activeItem ? (activeItem.id || activeItem.file) : null, (selectedItem) => {
    loadContent(selectedItem);
  });

  // Load the content item or show subject overview
  if (activeItem) {
    await loadContent(activeItem, updateHistory);
  } else {
    renderSubjectOverview(currentSubject, contentEl, tocContainer);
  }
}

/**
 * Loads and parses a specific content file or structured object
 * @param {Object} item - Navigation item with file path or embedded content
 * @param {boolean} [updateHistory=true] 
 */
async function loadContent(item, updateHistory = true) {
  if (!item) return;
  currentContentItem = item;

  const contentEl = document.getElementById('viewer-content');
  const tocContainer = document.getElementById('toc-content');
  const breadcrumbsEl = document.getElementById('viewer-breadcrumbs');
  const metaHeaderEl = document.getElementById('content-meta-header');
  const paginationEl = document.getElementById('viewer-pagination');

  // Loading state
  contentEl.innerHTML = `
    <div class="empty-state">
      <div class="loading-spinner"></div>
      <p style="color: var(--text-muted); font-size: var(--text-sm);">Loading content...</p>
    </div>
  `;

  // Update browser URL (clean without sticky question hash)
  if (updateHistory) {
    const url = new URL(window.location.href);
    if (currentSubject) url.searchParams.set('subject', currentSubject.id);
    url.searchParams.delete('content');
    url.searchParams.delete('file');
    window.history.replaceState({}, '', url.toString());
  }

  // Update recent content in storage
  addRecentContent({
    id: item.id || item.file,
    title: item.title || 'Untitled',
    subjectId: currentSubject ? currentSubject.id : ''
  });

  try {
    let rawContent = item.body || item.content || null;

    // If item points to a file, fetch it (strip any hash fragment for fetch)
    const cleanFilePath = item.file ? item.file.split('#')[0] : null;
    const targetHash = item.file && item.file.includes('#') ? item.file.split('#')[1] : (item.hash || null);

    if (cleanFilePath) {
      try {
        const cacheBustUrl = `${cleanFilePath}${cleanFilePath.includes('?') ? '&' : '?'}_t=${Date.now()}`;
        const response = await fetch(cacheBustUrl, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} (${response.statusText || 'Not Found'})`);
        }
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('json') || cleanFilePath.endsWith('.json')) {
          rawContent = await response.json();
        } else {
          rawContent = await response.text();
        }
      } catch (fetchErr) {
        console.error('Fetch error:', fetchErr);
        contentEl.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h2 class="empty-state-title">Content Not Found</h2>
            <p class="empty-state-desc">The content file at <code>${escapeHtml(item.file || '')}</code> could not be loaded (${escapeHtml(fetchErr.message)}).</p>
          </div>
        `;
        return;
      }
    }

    // Render content via parser
    try {
      parseAndRender(rawContent, contentEl);
    } catch (parseErr) {
      console.error('Render error:', parseErr);
      contentEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h2 class="empty-state-title">Display Error</h2>
          <p class="empty-state-desc">Error rendering document: ${escapeHtml(parseErr.message)}</p>
        </div>
      `;
      return;
    }

    // Trigger high-level staggered cascade entrance animation
    contentEl.classList.remove('animating');
    void contentEl.offsetWidth; // Reflow to reset CSS animation
    contentEl.classList.add('animating');

    // Build Table of Contents
    try {
      if (tocContainer) {
        buildTableOfContents(contentEl, tocContainer);
      }
    } catch (tocErr) {
      console.warn('TOC build warning:', tocErr);
    }

    // Update UI Chrome (Breadcrumbs, Meta Header, Pagination, Bookmark state)
    try {
      updateBreadcrumbs(breadcrumbsEl, currentSubject, item);
      updateMetaHeader(metaHeaderEl, currentSubject, item);
      updatePagination(paginationEl);
    } catch (uiErr) {
      console.warn('UI Chrome update warning:', uiErr);
    }

    // Always start at the very top (Question 1) on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update Document Title
    document.title = `${item.title || 'Notes'} | ${currentSubject ? currentSubject.title : 'Exam Portal'}`;

  } catch (error) {
    console.error('Unexpected error in loadContent:', error);
  }
}

/**
 * Renders fallback subject overview when subject has no content items yet
 */
function renderSubjectOverview(subject, contentEl, tocContainer) {
  if (!contentEl) return;
  contentEl.innerHTML = `
    <div class="content-body">
      <h1>${escapeHtml(subject.title || 'Subject Overview')}</h1>
      ${subject.description ? `<p class="content-lead">${escapeHtml(subject.description)}</p>` : ''}
      <div class="callout callout-note">
        <div class="callout-header">Ready for Content</div>
        <div>Content for this subject will be rendered here as soon as markdown or question files are placed in <code>data/content/</code>.</div>
      </div>
    </div>
  `;
  if (tocContainer) tocContainer.innerHTML = '';
}

/**
 * Renders empty state when no subjects or content exist
 */
function renderNoContentState(contentEl, sidebarContainer, tocContainer) {
  if (contentEl) {
    if (cachedSubjects && cachedSubjects.length > 0) {
      contentEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <h2 class="empty-state-title">Select a Subject to View Notes</h2>
          <p class="empty-state-desc">Choose one of the course subjects below to view all units, questions, and solutions:</p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
            ${cachedSubjects.map(s => `
              <a href="notes.html?subject=${encodeURIComponent(s.id)}" class="btn btn-secondary" style="border-left: 3px solid ${s.color || 'var(--primary)'}; text-align: left; padding: 10px 16px;">
                <span style="font-size: 1.2rem; margin-right: 6px;">${s.icon || '📖'}</span>
                <span><strong>${escapeHtml(s.title || s.id)}</strong></span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      contentEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📑</div>
          <h2 class="empty-state-title">No Subject Selected</h2>
          <p class="empty-state-desc">Add your subjects to <code>data/subjects.json</code> to view notes and questions here.</p>
          <a href="index.html" class="btn btn-secondary">← Back to Portal Home</a>
        </div>
      `;
    }
  }
  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <div class="empty-state" style="padding: var(--space-8) var(--space-4);">
        <p style="font-size: var(--text-xs); color: var(--text-muted);">Select a subject to explore units and notes.</p>
      </div>
    `;
  }
  if (tocContainer) tocContainer.innerHTML = '';
}

/**
 * Updates breadcrumbs path
 */
function updateBreadcrumbs(container, subject, item) {
  if (!container) return;
  container.innerHTML = `
    <a href="index.html">Portal</a>
    <span class="breadcrumb-separator">/</span>
    ${subject ? `<span class="breadcrumb-current">${escapeHtml(subject.title || subject.id)}</span>` : '<span class="breadcrumb-current">Notes</span>'}
  `;
}

/**
 * Updates meta header with badges and bookmark button
 */
function updateMetaHeader(container, subject, item) {
  if (!container) return;
  const itemId = item.id || item.file;
  const bookmarked = isBookmarked(itemId);

  container.style.display = 'flex';
  container.innerHTML = `
    <div class="meta-badges-row">
      ${subject && subject.code ? `<span class="badge badge-accent">${escapeHtml(subject.code)}</span>` : ''}
      ${item.badge ? `<span class="badge badge-subtle">${escapeHtml(item.badge)}</span>` : ''}
      <button class="bookmark-btn ${bookmarked ? 'active' : ''}" id="btn-toggle-bookmark" title="Bookmark this note">
        <span>${bookmarked ? '★' : '☆'}</span>
        <span>${bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
    </div>
    <div class="meta-info-row">
      <span>📄 Dynamic Content</span>
      ${item.duration ? `<span>⏱️ ${escapeHtml(item.duration)}</span>` : ''}
    </div>
  `;

  // Bind Bookmark Toggle
  const bookmarkBtn = container.querySelector('#btn-toggle-bookmark');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      const newStatus = toggleBookmark({
        id: itemId,
        title: item.title || 'Untitled',
        subjectId: subject ? subject.id : '',
        path: item.file || ''
      });
      bookmarkBtn.classList.toggle('active', newStatus);
      bookmarkBtn.querySelector('span:first-child').textContent = newStatus ? '★' : '☆';
      bookmarkBtn.querySelector('span:last-child').textContent = newStatus ? 'Bookmarked' : 'Bookmark';
    });
  }
}

/**
 * Updates previous / next pagination footer
 */
function updatePagination(container) {
  if (container) {
    container.style.display = 'none';
  }
}

/**
 * Initializes sidebar tabs: 'Navigation' and 'Bookmarks'
 */
function initSidebarTabs(navContainer) {
  const tabs = document.querySelectorAll('.sidebar-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');

      if (target === 'bookmarks') {
        renderBookmarksView(navContainer);
      } else {
        // Restore current navigation
        if (currentSubject) {
          const navData = currentSubject.navigation || currentSubject.content || [];
          renderSidebar(navContainer, navData, currentContentItem ? (currentContentItem.id || currentContentItem.file) : null, (item) => {
            loadContent(item);
          });
        }
      }
    });
  });
}

function renderBookmarksView(container) {
  if (!container) return;
  const bookmarks = getBookmarks();

  if (bookmarks.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: var(--space-8) var(--space-4);">
        <div class="empty-state-icon" style="width: 2.5rem; height: 2.5rem; font-size: 1.1rem;">☆</div>
        <div class="empty-state-title" style="font-size: var(--text-sm);">No Bookmarks Saved</div>
        <p class="empty-state-desc" style="font-size: var(--text-xs);">Click the bookmark button on any content item to save it for quick review.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-1);">
      ${bookmarks.map(b => `
        <a href="notes.html?subject=${encodeURIComponent(b.subjectId || '')}&content=${encodeURIComponent(b.id || '')}" class="nav-item-link">
          <span>★</span>
          <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b.title)}</span>
        </a>
      `).join('')}
    </div>
  `;
}

/**
 * Readability controls: font zoom (+/-) and print
 */
function initReadabilityControls(contentContainer) {
  const zoomInBtn = document.getElementById('btn-zoom-in');
  const zoomOutBtn = document.getElementById('btn-zoom-out');
  const printBtn = document.getElementById('btn-print-view');

  if (zoomInBtn && contentContainer) {
    zoomInBtn.addEventListener('click', () => {
      if (currentFontSizeRem < 1.35) {
        currentFontSizeRem += 0.08;
        contentContainer.style.setProperty('--reader-font-size', `${currentFontSizeRem}rem`);
      }
    });
  }

  if (zoomOutBtn && contentContainer) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentFontSizeRem > 0.85) {
        currentFontSizeRem -= 0.08;
        contentContainer.style.setProperty('--reader-font-size', `${currentFontSizeRem}rem`);
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/**
 * Initializes and binds theme toggle buttons
 */
function initTheme() {
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'cream';
      const nextTheme = active === 'dark' ? 'cream' : 'dark';
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'cream');
  }
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('title', 'Switch to Cream Mode');
      btn.setAttribute('aria-label', 'Switch to Cream Mode');
    } else {
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  });
}

// Helpers
function findNavItem(items, id) {
  for (const item of items) {
    if (item.id === id || item.file === id) return item;
    if (Array.isArray(item.items)) {
      const found = findNavItem(item.items, id);
      if (found) return found;
    }
    if (Array.isArray(item.children)) {
      const found = findNavItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getFirstNavItem(items) {
  for (const item of items) {
    if (item.file || item.body || item.content) return item;
    if (Array.isArray(item.items) && item.items.length > 0) {
      const found = getFirstNavItem(item.items);
      if (found) return found;
    }
  }
  return items[0] || null;
}

function flattenNavItems(items) {
  let list = [];
  items.forEach(item => {
    if (item.file || item.body || item.content) {
      list.push(item);
    }
    if (Array.isArray(item.items)) {
      list = list.concat(flattenNavItems(item.items));
    }
    if (Array.isArray(item.children)) {
      list = list.concat(flattenNavItems(item.children));
    }
  });
  return list;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
