/**
 * Main Portal Controller (index.html)
 * Loads dynamic subjects from data/subjects.json, renders subjects or empty states,
 * binds search UI, and handles theme preference persistence.
 */

import { getSavedTheme, saveTheme, getRecentSubjects } from './modules/storage.js';
import { buildIndex, initSearchUI } from './modules/search.js';
import { initBackgroundSystem } from './modules/effects.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Theme & Visual Atmosphere System
  initTheme();
  initBackgroundSystem();

  // DOM Elements
  const subjectsContainer = document.getElementById('subjects-container');
  const searchInput = document.getElementById('portal-search-input');
  const searchDropdown = document.getElementById('portal-search-dropdown');
  const sectionViewerLink = document.getElementById('section-viewer-link');

  // 2. Connect Viewer button directly with the Last Opened Subject
  syncLastOpenedViewerLink(sectionViewerLink);

  // 3. Fetch Master Registry
  try {
    const response = await fetch('data/subjects.json');
    if (!response.ok) {
      throw new Error(`Failed to load subjects registry: ${response.status}`);
    }
    const data = await response.json();
    const subjects = Array.isArray(data.subjects) ? data.subjects : [];

    // 4. Initialize Search
    const searchIndex = buildIndex(subjects);
    if (searchInput && searchDropdown) {
      initSearchUI({
        inputEl: searchInput,
        dropdownEl: searchDropdown,
        index: searchIndex
      });
    }

    // 5. Render Subject Cards or Empty State
    renderSubjects(subjects, subjectsContainer);

  } catch (error) {
    console.error('Error loading subjects:', error);
    if (subjectsContainer) {
      subjectsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h2 class="empty-state-title">Unable to Load Subjects</h2>
          <p class="empty-state-desc">Could not load the master catalog from data/subjects.json. Please ensure you are viewing through a local web server.</p>
        </div>
      `;
    }
  }
});

/**
 * Initializes and binds theme toggle buttons
 */
function initTheme() {
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = active === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    if (theme === 'light') {
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
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
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  });
}

/**
 * Renders subject cards or a clean empty state
 * @param {Array<Object>} subjects 
 * @param {HTMLElement} container 
 */
function renderSubjects(subjects, container) {
  if (!container) return;

  if (subjects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <h2 class="empty-state-title">Subjects will appear here when content is added</h2>
        <p class="empty-state-desc">The portal architecture is ready. Register subjects in <code>data/subjects.json</code> and place your educational materials in <code>data/content/</code>.</p>
        <a href="notes.html" class="btn btn-secondary">
          <span>Open Content Viewer</span>
          <span>→</span>
        </a>
      </div>
    `;
    return;
  }

  container.className = 'subject-grid';
  container.innerHTML = subjects.map(subject => {
    const itemCount = Array.isArray(subject.content) ? subject.content.length : (subject.count || null);
    const viewerUrl = subject.url || `notes.html?subject=${encodeURIComponent(subject.id)}`;

    const accentColor = subject.color || 'var(--primary)';
    return `
      <article class="subject-card" style="--card-accent: ${accentColor}" data-href="${viewerUrl}">
        <div class="card-header">
          ${subject.code ? `<span class="badge badge-code">${escapeHtml(subject.code)}</span>` : `<span class="badge badge-subtle">Subject</span>`}
          <div class="card-icon-bubble">
            ${subject.icon || '📖'}
          </div>
        </div>

        <h3 class="card-title">${escapeHtml(subject.title || subject.name || 'Untitled Subject')}</h3>
        ${subject.description ? `<p class="card-description">${escapeHtml(subject.description)}</p>` : ''}

        <div class="card-footer">
          ${itemCount !== null ? `<span class="badge badge-subtle">${itemCount} Items</span>` : `<span class="badge badge-subtle">Semester 2</span>`}
          <a href="${viewerUrl}" class="btn btn-sm btn-explore">
            <span>Explore Notes</span>
            <span>→</span>
          </a>
        </div>
      </article>
    `;
  }).join('');

  // Make entire card clickable for seamless UX
  container.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });
}

/**
 * Integrates the last opened subject directly onto the Viewer buttons
 * Removes distance between 'Viewer' and 'Recently Viewed'
 * @param {HTMLElement} sectionLinkEl 
 */
function syncLastOpenedViewerLink(sectionLinkEl) {
  const recents = getRecentSubjects();
  if (recents.length === 0) return;

  const lastOpened = recents[0];
  const url = `notes.html?subject=${encodeURIComponent(lastOpened.id)}`;

  // Update Section Header Button
  if (sectionLinkEl) {
    sectionLinkEl.href = url;
    sectionLinkEl.className = 'btn btn-continue btn-sm';
    sectionLinkEl.removeAttribute('style');
    sectionLinkEl.innerHTML = `
      <span>🕒 Continue: <strong>${escapeHtml(lastOpened.title || lastOpened.id)}</strong></span>
      <span>→</span>
    `;
  }

  // Update Header Nav Link
  const navViewerLink = document.querySelector('.nav-links a[href="notes.html"]');
  if (navViewerLink) {
    navViewerLink.href = url;
    navViewerLink.title = `Resume: ${lastOpened.title || lastOpened.id}`;
    navViewerLink.innerHTML = `Viewer <span style="font-size: 0.72rem; color: var(--text-accent); margin-left: 2px;">●</span>`;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
