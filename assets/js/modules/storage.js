/**
 * Storage Module - Manages client-side persistence via browser localStorage
 * Handles: Theme preference, Bookmarks, Recently viewed subjects/content, and Reading positions
 */

const STORAGE_KEYS = {
  THEME: 'exam_portal_theme',
  BOOKMARKS: 'exam_portal_bookmarks',
  RECENT_SUBJECTS: 'exam_portal_recent_subjects',
  RECENT_CONTENT: 'exam_portal_recent_content',
  READING_POSITIONS: 'exam_portal_reading_positions'
};

// --------------------------------------------------------------------------
// Theme Storage
// --------------------------------------------------------------------------

/**
 * Gets saved theme preference ('dark' or 'light'), defaulting to 'dark'
 * @returns {'dark'|'light'}
 */
export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (e) {
    console.warn('Storage access warning:', e);
    return 'dark';
  }
}

/**
 * Saves user theme preference
 * @param {'dark'|'light'} theme 
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.warn('Storage save warning:', e);
  }
}

// --------------------------------------------------------------------------
// Bookmarks Storage
// --------------------------------------------------------------------------

/**
 * Gets all bookmarks
 * @returns {Array<Object>} List of bookmark objects { id, title, subjectId, path, timestamp }
 */
export function getBookmarks() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Bookmarks load error:', e);
    return [];
  }
}

/**
 * Checks if an item is bookmarked
 * @param {string} id 
 * @returns {boolean}
 */
export function isBookmarked(id) {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === id);
}

/**
 * Toggles a bookmark
 * @param {Object} bookmarkItem - { id, title, subjectId, path }
 * @returns {boolean} New bookmarked status (true if added, false if removed)
 */
export function toggleBookmark(bookmarkItem) {
  if (!bookmarkItem || !bookmarkItem.id) return false;

  const bookmarks = getBookmarks();
  const existingIndex = bookmarks.findIndex(b => b.id === bookmarkItem.id);

  if (existingIndex >= 0) {
    bookmarks.splice(existingIndex, 1);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Bookmark removal error:', e);
    }
    return false;
  } else {
    bookmarks.unshift({
      ...bookmarkItem,
      timestamp: Date.now()
    });
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Bookmark add error:', e);
    }
    return true;
  }
}

// --------------------------------------------------------------------------
// Recently Viewed Subjects & Content
// --------------------------------------------------------------------------

/**
 * Gets list of recently viewed subjects
 * @returns {Array<Object>}
 */
export function getRecentSubjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT_SUBJECTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Adds a subject to recently viewed list (max 5)
 * @param {Object} subject - { id, title }
 */
export function addRecentSubject(subject) {
  if (!subject || !subject.id) return;
  const list = getRecentSubjects().filter(s => s.id !== subject.id);
  list.unshift({
    id: subject.id,
    title: subject.title,
    timestamp: Date.now()
  });
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_SUBJECTS, JSON.stringify(list.slice(0, 5)));
  } catch (e) {}
}

/**
 * Gets list of recently viewed content items
 * @returns {Array<Object>}
 */
export function getRecentContent() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT_CONTENT);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Adds content item to recently viewed list (max 10)
 * @param {Object} item - { id, title, subjectId, path }
 */
export function addRecentContent(item) {
  if (!item || !item.id) return;
  const list = getRecentContent().filter(c => c.id !== item.id);
  list.unshift({
    ...item,
    timestamp: Date.now()
  });
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_CONTENT, JSON.stringify(list.slice(0, 10)));
  } catch (e) {}
}

// --------------------------------------------------------------------------
// Reading Positions
// --------------------------------------------------------------------------

/**
 * Saves current reading scroll position for content ID
 * @param {string} contentId 
 * @param {number} position 
 */
export function saveReadingPosition(contentId, position) {
  if (!contentId) return;
  try {
    const positions = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_POSITIONS) || '{}');
    positions[contentId] = position;
    localStorage.setItem(STORAGE_KEYS.READING_POSITIONS, JSON.stringify(positions));
  } catch (e) {}
}

/**
 * Retrieves saved reading scroll position
 * @param {string} contentId 
 * @returns {number|null}
 */
export function getReadingPosition(contentId) {
  if (!contentId) return null;
  try {
    const positions = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_POSITIONS) || '{}');
    return positions[contentId] || null;
  } catch (e) {
    return null;
  }
}
