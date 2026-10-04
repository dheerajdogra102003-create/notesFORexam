# ExamVault — Exam Notes & Important Questions Portal

[![Architecture](https://img.shields.io/badge/Architecture-Decoupled%20%26%20Data--Driven-6366f1?style=for-the-badge)](antigravity.rules)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20•%20CSS3%20•%20ES6+-06b6d4?style=for-the-badge)](assets/)
[![Build](https://img.shields.io/badge/Build-Zero%20Dependencies%20•%20Static-10b981?style=for-the-badge)](#quickstart)
[![Theme](https://img.shields.io/badge/Theme-Dark--First%20Twilight%20•%20Light%20Mode-a855f7?style=for-the-badge)](#visual-system--animations)

**ExamVault** is a high-performance, responsive, and completely content-decoupled web portal designed for semester exam preparation, technical documentation, quick revision, and important question banks. 

Built with pure web standards (Vanilla HTML5, CSS Custom Properties, and ES6+ Modules), the platform separates the **application presentation engine** from the **educational content**, allowing courses, subjects, chapters, questions, and revision cheat sheets to be integrated effortlessly via dynamic JSON data and Markdown files without touching a single line of application code.

---

## 📑 Table of Contents

- [Key Highlights](#-key-highlights)
- [Visual System & Animations](#-visual-system--animations)
- [Architecture & Design Principles](#-architecture--design-principles)
- [Repository Structure](#-repository-structure)
- [Quickstart & Running Locally](#-quickstart--running-locally)
- [Content Authoring & Subject Registration](#-content-authoring--subject-registration)
  - [1. Registering a Subject](#1-registering-a-subject-datasubjectsjson)
  - [2. Structuring Content Files](#2-structuring-content-files)
  - [3. Code Blocks, Math & Technical Symbols](#3-code-blocks-math--technical-symbols)
- [Key Features](#-key-features)
- [Browser Compatibility & Accessibility](#-browser-compatibility--accessibility)
- [License](#-license)

---

## 🚀 Key Highlights

- **100% Content-Decoupled**: Application code contains zero hard-coded chapters or syllabi. Everything renders dynamically from [`data/subjects.json`](data/subjects.json) and [`data/content/`](data/content/).
- **Zero Build Step**: No webpack, Vite, Babel, Node runtime, or compilers required. Deployable instantly to GitHub Pages, Netlify, Vercel, or any standard HTTP web server.
- **AAA-Grade Visual Experience**: Powered by an interactive visual system inspired by modern technical platforms (Linear, Aceternity UI, Stripe, and Apple) with 3D tilt spotlight cards, particle physics, and smooth view transitions.
- **Client-Side Data Engine**: Real-time client-side search indexing, local bookmarking, reading position recovery, and theme persistence using browser `localStorage`.
- **Exam & Revision Friendly**: Includes dynamic table-of-contents scroll spy, breadcrumb navigation, interactive code blocks with one-click clipboard copying, font zoom controls (A- / A+), and an optimized `@media print` stylesheet for clean PDF export.

---

## 🎨 Visual System & Animations

ExamVault features a multi-layered, GPU-accelerated atmospheric visual engine configured in [`assets/css/effects.css`](assets/css/effects.css) and [`assets/js/modules/effects.js`](assets/js/modules/effects.js):

| Feature | Description |
| :--- | :--- |
| **Linear-Grade 3D Spotlight Cards** | Subject cards track cursor coordinates (`--card-local-x`, `--card-local-y`) in real-time, casting a vibrant radial border spotlight and specular glass reflection across the card surface. |
| **Layered 3D Parallax Depth** | Cards utilize `transform-style: preserve-3d`. On hover, the subject icon bubble (`translateZ(48px)`), explore button (`translateZ(38px)`), and title float out with authentic spatial depth. |
| **Constellation Particle Network** | Interactive canvas simulation with velocity-sensitive gravitation and smooth LERP cursor tracking. |
| **Electric Data Packets** | High-speed luminescent energy pulses periodically shoot across connection vectors between particle nodes like neural synapses. |
| **Cyber Scanline & Tech Glyphs** | A subtle horizontal laser beam sweeps down the technical matrix grid every 12 seconds alongside organic drifting academic tokens (`{ }`, `</>`, `λ`, `∫`, `01`, `O(1)`). |
| **Live Radar Beacon** | Hero badge features a live radar beacon dot with expanding concentric acoustic rings (`@keyframes radarPing`). |
| **Fluid Liquid Text Shimmer** | The primary headline features an iridescent multi-stop gradient with soft colored ambient bloom. |
| **Tactile Magnetic Buttons** | Navigation buttons and interactive elements gently pull toward the cursor upon proximity with a high-speed diagonal light reflection sweep. |
| **Seamless View Transitions** | Native browser `document.startViewTransition()` integration (with animated curtain fallback) completely eliminates white screen flashing when moving between pages. |
| **Circular Reading Meter** | Floating glass widget in the reading pane with an animated SVG circle progress meter tracking live scroll percentage (0–100%) and smooth scroll-to-top. |

---

## 🏛 Architecture & Design Principles

The application adheres strictly to the architectural constraints established in [`antigravity.rules`](antigravity.rules):

```
┌────────────────────────────────────────────────────────┐
│                   EXAMVAULT ENGINE                     │
│  index.html • notes.html • base.css • effects.css/js   │
└───────────────────────────▲────────────────────────────┘
                            │ Dynamic Fetch (JSON/Markdown)
┌───────────────────────────┴────────────────────────────┐
│                    CONTENT LAYER                       │
│  data/subjects.json • data/content/<subject>/*.md      │
└────────────────────────────────────────────────────────┘
```

1. **Content Independence**: The UI shell never assumes a rigid hierarchy (e.g. `Subject -> Chapter -> Unit -> Topic`). Subjects can use nested trees, flat topic lists, or standalone reference sheets.
2. **Design Tokens**: Standardized CSS variables defined in [`assets/css/variables.css`](assets/css/variables.css) manage colors, spacing scales, typography, and elevations.
3. **Twilight Dark-First Mode**: Tuned for late-night exam revision using deep slate/indigo surfaces (`#0b0f19`, `#111827`, `#162033`) rather than harsh pure `#000000`. Full Light Mode is supported via `data-theme="light"`.
4. **Symbol & Operator Integrity**: The Markdown parser explicitly protects technical operators (`&&`, `||`, `==`, `!=`, `=>`, `<>`), mathematical notation (`≠`, `≤`, `≥`, `→`, `∞`, `π`, `λ`), and code indentation.

---

## 📁 Repository Structure

```text
notesFORexam/
├── antigravity.rules                  # Architectural guidelines & strict specifications
├── index.html                         # Portal directory & multi-semester subject catalog
├── notes.html                         # 3-Column reading workspace & content viewer
├── README.md                          # Project documentation
│
├── assets/
│   ├── css/
│   │   ├── variables.css              # Design tokens (colors, gradients, typography, spacing)
│   │   ├── base.css                   # Global resets, accessibility rules, typography
│   │   ├── components.css             # Buttons, 3D cards, badges, search UI, empty states
│   │   ├── notes-view.css             # Viewer layout, sidebar tree, reading pane, code blocks, print
│   │   └── effects.css                # Visual animations, spotlights, radar sweeps, view transitions
│   │
│   ├── js/
│   │   ├── main.js                    # Directory page controller (subjects loader, search, recents)
│   │   ├── viewer.js                  # Document viewer controller (parser trigger, TOC, bookmarks)
│   │   └── modules/
│   │       ├── storage.js             # LocalStorage manager (theme, bookmarks, recents, scroll position)
│   │       ├── search.js              # Client-side indexing & search dropdown UI
│   │       ├── parser.js              # Robust Markdown/HTML/Code parser preserving math & symbols
│   │       ├── navigation.js          # Sidebar tree, TOC generator, mobile drawer, scroll-spy
│   │       └── effects.js             # Particle mesh, 3D card tilt, magnetic buttons, view router
│   │
│   └── images/
│       ├── favicon.ico                # Site icon
│       └── diagrams/                  # Directory for course schematics and architectural diagrams
│
└── data/
    ├── subjects.json                  # Master subject registry (metadata, colors, navigation)
    └── content/                       # Content repository (Structured Markdown per subject)
        ├── daa/
        │   └── daa-notes.md           # Design & Analysis of Algorithms notes
        ├── web-technologies/
        │   └── web-technology-notes.md# Web Technologies notes & Q&A bank
        ├── linux-administration/
        │   └── linux-notes.md         # Linux Administration notes
        └── java/
            └── java-notes.md          # Java Programming notes
```

---

## ⚡ Quickstart & Running Locally

Because ExamVault utilizes standard **ES6 Modules** (`import` / `export`) and dynamic asynchronous `fetch()` requests to load subjects and content, files must be served through an HTTP/HTTPS web server (rather than opened via the direct `file:///` protocol).

### Option 1: Python (Built-in, No Installation Needed)
```bash
# Navigate to the repository root
cd notesFORexam

# Start server on port 8080
python -m http.server 8080
```
Open your browser at: **`http://localhost:8080/index.html`**

### Option 2: VS Code Live Server Extension
1. Open the project folder in Visual Studio Code.
2. Right-click [`index.html`](index.html) and select **"Open with Live Server"**.

### Option 3: Node.js (npx)
```bash
npx serve .
```

---

## ✍ Content Authoring & Subject Registration

Adding a new subject or educational content requires **zero modifications to HTML or JavaScript**.

### 1. Registering a Subject (`data/subjects.json`)

Open [`data/subjects.json`](data/subjects.json) and add an entry to the `subjects` array:

```json
{
  "id": "daa",
  "code": "CS-201",
  "title": "Design & Analysis of Algorithms",
  "description": "Asymptotic analysis, divide & conquer, dynamic programming, greedy algorithms, and graph theory.",
  "semester": 2,
  "icon": "⚡",
  "color": "#6366f1",
  "navigation": [
    {
      "id": "unit-1-intro",
      "title": "Unit 1: Foundations & Asymptotics",
      "items": [
        {
          "id": "asymptotic-notation",
          "title": "Asymptotic Notations (Big-O, Omega, Theta)",
          "badge": "Core",
          "duration": "15 min",
          "file": "data/content/daa/unit1-asymptotics.md"
        },
        {
          "id": "recurrence-relations",
          "title": "Solving Recurrences & Master Theorem",
          "badge": "Important",
          "duration": "20 min",
          "file": "data/content/daa/unit1-recurrences.md"
        }
      ]
    },
    {
      "id": "unit-2-divide-conquer",
      "title": "Unit 2: Divide and Conquer",
      "items": [
        {
          "id": "merge-quick-sort",
          "title": "Merge Sort vs Quick Sort Analysis",
          "badge": "Exam Question",
          "duration": "25 min",
          "file": "data/content/daa/unit2-sorting.md"
        }
      ]
    }
  ]
}
```

#### Supported Navigation Topologies:
- **Hierarchical (Grouped)**: Groups containing nested `items` or `children` arrays (like the example above).
- **Flat (Topic List)**: A direct list of items without groups for concise cheat sheets or question banks.

---

### 2. Structuring Content Files

Create your Markdown files inside `data/content/<subject-id>/` (e.g. `data/content/daa/unit1-asymptotics.md`):

```markdown
# Asymptotic Notations & Growth of Functions

Asymptotic notation provides a mathematical framework for analyzing the running time of algorithms as input size $n$ approaches infinity ($\infty$).

## 1. Big-O Notation ($O$)

Big-O provides an **asymptotic upper bound** on function growth.

> [!NOTE]
> Formally: $f(n) = O(g(n))$ if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that:
> $$0 \le f(n) \le c \cdot g(n) \quad \forall n \ge n_0$$

### Common Complexity Classes:
- $O(1)$: Constant Time
- $O(\log n)$: Logarithmic Time (Binary Search)
- $O(n)$: Linear Time
- $O(n \log n)$: Linearithmic Time (Merge Sort, Heap Sort)
- $O(n^2)$: Quadratic Time (Bubble Sort, Selection Sort)
```

---

### 3. Code Blocks, Math & Technical Symbols

ExamVault automatically parses code blocks with language headers and provides an animated one-click Copy button:

````markdown
```cpp
// Binary Search Implementation: O(log n)
int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```
````

Special technical symbols are preserved without entity corruption:
- **Mathematical**: `$`, `%`, `&`, `≠`, `≤`, `≥`, `→`, `←`, `∞`, `π`, `λ`, `α`, `β`, `γ`
- **Programming Operators**: `<>`, `{}`, `[]`, `&&`, `||`, `==`, `===`, `!=`, `=>`

---

## 🌟 Key Features

| Component | Functionality |
| :--- | :--- |
| **Unified Search** | Press `/` from anywhere on the directory to search across all registered subjects, topics, and item codes. |
| **Continue Action** | Dynamically updates the "Viewer" button on the directory to **"🕒 Continue: [Last Subject]"**, resuming exactly where you left off. |
| **Dynamic Table of Contents** | Automatically extracts all `<h2>` and `<h3>` headings from the rendered document, creating an active scroll-spy TOC in the right sidebar. |
| **Bookmark System** | One-click bookmarking saves frequently reviewed notes to `localStorage`. Access bookmarks from the dedicated tab in the left sidebar. |
| **Reading Controls** | Instant font scaling (`A-` / `A+`) and a dedicated **Print** action that strips all sidebars and headers for pristine, ink-friendly PDF generation. |
| **State Persistence** | Remembers theme preference (Dark/Light), active reading scroll position, recent subjects, and bookmarks across browser sessions. |

---

## 📱 Browser Compatibility & Accessibility

- **Modern Browsers**: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and Chromium-based browsers (Brave, Arc, Opera).
- **View Transitions**: Leverages native `document.startViewTransition()` on modern Chromium engines with a graceful, high-speed animated curtain fallback on other engines.
- **Accessibility**:
  - Full keyboard accessibility and focus rings on interactive elements.
  - WCAG AA compliant color contrast ratios.
  - Respects `@media (prefers-reduced-motion: reduce)` by disabling high-velocity canvas particles, 3D tilts, and ambient radar animations for users who prefer static presentations.

---

## 📄 License

This project is released under the **MIT License**. Free to use, customize, and extend for personal, academic, or institutional examination preparation portals.
