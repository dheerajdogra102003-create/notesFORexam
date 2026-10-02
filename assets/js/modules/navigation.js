/**
 * Navigation Module - Flexible content-driven navigation engine
 * Generates dynamic sidebar navigation, Table of Contents, breadcrumbs,
 * previous/next links, reading progress, and handles mobile drawer interactions.
 */

let tocObserver = null;

/**
 * Dynamically renders the sidebar navigation from whatever structure is provided
 * Supports flat arrays, grouped arrays, or hierarchical structures without hardcoded names
 * @param {HTMLElement} container - Sidebar container DOM element
 * @param {Array<Object>} navData - Data describing navigation items or groups
 * @param {string} activeId - Currently active item ID
 * @param {Function} onSelect - Callback when an item is selected
 */
export function renderSidebar(container, navData, activeId, onSelect) {
  if (!container) return;

  if (!navData || !Array.isArray(navData) || navData.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: var(--space-8) var(--space-4);">
        <div class="empty-state-icon" style="width: 2.5rem; height: 2.5rem; font-size: 1.1rem;">📑</div>
        <div class="empty-state-title" style="font-size: var(--text-sm);">No Navigation Items</div>
        <p class="empty-state-desc" style="font-size: var(--text-xs);">Content navigation will appear dynamically here when content is added.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  // Detect if navData contains grouped items or a flat list
  const isGrouped = navData.some(item => Array.isArray(item.items) || Array.isArray(item.children));

  if (isGrouped) {
    navData.forEach(group => {
      const groupEl = document.createElement('div');
      groupEl.className = 'nav-group';
      groupEl.setAttribute('data-open', 'true');

      const headerEl = document.createElement('div');
      headerEl.className = 'nav-group-header';
      headerEl.innerHTML = `
        <span class="nav-group-header-label">
          <span>${escapeHtml(group.title || group.name || 'Section')}</span>
        </span>
        <span class="nav-group-toggle-icon">▶</span>
      `;

      const listEl = document.createElement('div');
      listEl.className = 'nav-group-list';

      const items = group.items || group.children || [];
      items.forEach(child => {
        const itemEl = createNavItemElement(child, activeId, onSelect);
        listEl.appendChild(itemEl);
      });

      // Accordion toggle
      headerEl.addEventListener('click', () => {
        const isOpen = groupEl.getAttribute('data-open') === 'true';
        groupEl.setAttribute('data-open', isOpen ? 'false' : 'true');
      });

      groupEl.appendChild(headerEl);
      groupEl.appendChild(listEl);
      container.appendChild(groupEl);
    });
  } else {
    // Flat navigation list
    const listEl = document.createElement('div');
    listEl.className = 'nav-flat-list';
    listEl.style.display = 'flex';
    listEl.style.flexDirection = 'column';
    listEl.style.gap = 'var(--space-1)';

    navData.forEach(item => {
      const itemEl = createNavItemElement(item, activeId, onSelect);
      listEl.appendChild(itemEl);
    });

    container.appendChild(listEl);
  }
}

/**
 * Creates an individual navigation link element
 * @param {Object} item 
 * @param {string} activeId 
 * @param {Function} onSelect 
 * @returns {HTMLElement}
 */
function createNavItemElement(item, activeId, onSelect) {
  const isCurrent = item.id === activeId || item.file === activeId;
  const link = document.createElement('a');
  link.href = item.url || `#${item.id || ''}`;
  link.className = `nav-item-link ${isCurrent ? 'active' : ''}`;
  link.innerHTML = `
    <span>${item.icon || '📄'}</span>
    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(item.title || item.name || 'Untitled')}</span>
    ${item.badge ? `<span class="badge badge-subtle" style="font-size: 0.65rem;">${escapeHtml(item.badge)}</span>` : ''}
  `;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(item);
    }
  });

  return link;
}

/**
 * Builds Table of Contents from headings (h2, h3) in rendered content
 * @param {HTMLElement} contentContainer 
 * @param {HTMLElement} tocContainer 
 */
export function buildTableOfContents(contentContainer, tocContainer) {
  if (!contentContainer || !tocContainer) return;

  const headings = contentContainer.querySelectorAll('h2, h3');

  if (headings.length === 0) {
    tocContainer.innerHTML = `<p style="font-size: var(--text-xs); color: var(--text-muted);">No sections in this document.</p>`;
    return;
  }

  const nav = document.createElement('nav');
  nav.className = 'toc-nav-list';
  nav.setAttribute('aria-label', 'Table of Contents');

  headings.forEach(heading => {
    const id = heading.id;
    const text = heading.textContent.replace('#', '').trim();
    const depth = heading.tagName.toLowerCase() === 'h2' ? '2' : '3';

    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = `toc-nav-link depth-${depth}`;
    link.textContent = text;
    link.setAttribute('data-target-id', id);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', `#${id}`);
      }
    });

    nav.appendChild(link);
  });

  tocContainer.innerHTML = '';
  tocContainer.appendChild(nav);

  initScrollSpy(headings, tocContainer);
}

/**
 * Sets up IntersectionObserver for scroll-spy highlighting in TOC
 * @param {NodeListOf<Element>} headings 
 * @param {HTMLElement} tocContainer 
 */
function initScrollSpy(headings, tocContainer) {
  if (tocObserver) {
    tocObserver.disconnect();
  }

  const links = tocContainer.querySelectorAll('.toc-nav-link');
  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  };

  tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          if (l.getAttribute('data-target-id') === id) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  headings.forEach(h => tocObserver.observe(h));
}

/**
 * Sets up mobile sidebar drawer toggle and backdrop
 * @param {HTMLElement} sidebarEl 
 * @param {HTMLElement} toggleBtnEl 
 * @param {HTMLElement} backdropEl 
 */
export function initMobileDrawer(sidebarEl, toggleBtnEl, backdropEl) {
  if (!sidebarEl) return;

  const closeDrawer = () => {
    sidebarEl.classList.remove('open');
    if (backdropEl) backdropEl.classList.remove('active');
  };

  if (toggleBtnEl) {
    toggleBtnEl.addEventListener('click', () => {
      const isOpen = sidebarEl.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        sidebarEl.classList.add('open');
        if (backdropEl) backdropEl.classList.add('active');
      }
    });
  }

  if (backdropEl) {
    backdropEl.addEventListener('click', closeDrawer);
  }
}

/**
 * Initializes reading progress bar
 * @param {HTMLElement} barFillEl 
 */
export function initReadingProgress(barFillEl) {
  if (!barFillEl) return;

  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) {
      barFillEl.style.width = '0%';
      return;
    }
    const progress = Math.min(Math.max((window.scrollY / total) * 100, 0), 100);
    barFillEl.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/**
 * Renders previous / next content pagination footer
 * @param {HTMLElement} container 
 * @param {Object|null} prevItem 
 * @param {Object|null} nextItem 
 * @param {Function} onNavigate 
 */
export function renderPagination(container, prevItem, nextItem, onNavigate) {
  if (!container) return;

  if (!prevItem && !nextItem) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = `
    ${prevItem ? `
      <div class="pagination-card prev" data-id="${prevItem.id || ''}">
        <span class="pagination-direction">← Previous</span>
        <span class="pagination-title">${escapeHtml(prevItem.title || 'Previous')}</span>
      </div>
    ` : `<div style="flex: 1;"></div>`}

    ${nextItem ? `
      <div class="pagination-card next" data-id="${nextItem.id || ''}">
        <span class="pagination-direction">Next →</span>
        <span class="pagination-title">${escapeHtml(nextItem.title || 'Next')}</span>
      </div>
    ` : `<div style="flex: 1;"></div>`}
  `;

  container.querySelectorAll('.pagination-card').forEach(card => {
    card.addEventListener('click', () => {
      const isNext = card.classList.contains('next');
      const targetItem = isNext ? nextItem : prevItem;
      if (targetItem && onNavigate) onNavigate(targetItem);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
