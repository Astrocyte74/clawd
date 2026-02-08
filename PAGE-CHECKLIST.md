# Clawd Hub Page Creation Checklist

Use this checklist when creating new pages to avoid common mistakes and ensure consistency.

---

## ✅ Pre-Creation Checklist

### 1. Planning
- [ ] Define page purpose and target audience
- [ ] Choose appropriate URL slug (short, descriptive, lowercase with hyphens)
- [ ] Identify category: `home-renovation` | `ai-research` | `recipes` | `demo` | `guide`

### 2. Content Preparation
- [ ] Gather/transcript source material
- [ ] Extract key information (specs, comparisons, pros/cons)
- [ ] Plan structure (sections, headings, tables, diagrams)

---

## 📝 Creation Checklist

### 3. Create Markdown Content File
**Location:** `/Users/markdarby16/clawd/projects/clawd-hub/src/content/`

- [ ] Create file: `{slug}.md` (e.g., `hoka-mach-7-review.md`)
- [ ] Add frontmatter with all required fields:
  ```yaml
  ---
  title: "Page Title"
  description: "One-sentence description for SEO"
  date: "YYYY-MM-DD"
  category: "guide"
  tags: ["tag1", "tag2"]
  ---
  ```
- [ ] Use appropriate Markdown features:
  - [ ] Headings (h1-h3) for structure and auto-TOC
  - [ ] Callout boxes: `> [!TIP]`, `> [!WARNING]`, `> [!NOTE]`
  - [ ] Tables for comparisons
  - [ ] Mermaid diagrams (with 16px font size init block)
  - [ ] Code blocks with syntax highlighting
- [ ] Add source attribution at bottom (if applicable)

### 4. Create Page Component
**Location:** `/Users/markdarby16/clawd/projects/clawd-hub/src/pages/`

- [ ] Create file: `{slug}.tsx` (e.g., `hoka-mach-7-review.tsx`)
- [ ] ✅ **CRITICAL:** Use **named import** for `MarkdownPageWithMeta`:
  ```tsx
  // ✅ CORRECT
  import { MarkdownPageWithMeta } from '../components/MarkdownPage'
  import content from '../content/{slug}.md?raw'

  export default function PageName() {
    return <MarkdownPageWithMeta rawContent={content} />
  }
  ```
- [ ] ❌ **NEVER use default import:**
  ```tsx
  // ❌ WRONG - Causes build error
  import MarkdownPage from '../components/MarkdownPage'
  ```
- [ ] ✅ **Reference:** Check existing pages for correct pattern:
  - `best-marathon-shoes-2026.tsx`
  - `sls-vs-starship.tsx`

### 5. Add Route to App.tsx
**Location:** `/Users/markdarby16/clawd/projects/clawd-hub/src/App.tsx`

- [ ] Add import:
  ```tsx
  import PageNamePage from './pages/{slug}'
  ```
- [ ] Add route:
  ```tsx
  <Route path="/{slug}" element={<PageNamePage />} />
  ```

### 6. Add to Projects List
**Location:** `/Users/markdarby16/clawd/projects/clawd-hub/src/lib/projects.ts`

- [ ] Add project object to `projects` array:
  ```tsx
  {
    id: '{slug}',
    title: 'Page Title',
    description: 'Full description (2-3 sentences)',
    blurb: 'One-line description for cards',
    category: 'guide', // or appropriate category
    updatedAt: new Date('YYYY-MM-DD'),
    categoryLabel: 'Display Name',
    categoryIcon: '🎯',
    href: '/{slug}',
    date: 'MMM D, YYYY',
    metadata: [
      { icon: '📊', label: 'Stat' },
      { icon: '💡', label: 'Feature' }
    ]
  }
  ```
- [ ] Choose appropriate emoji icon
- [ ] Add 2-4 metadata items with icons

---

## 🚀 Deployment Checklist

### 7. Test Locally (if possible)
- [ ] Run `npm run dev` to verify no TypeScript errors
- [ ] Check page renders correctly
- [ ] Verify metadata displays properly
- [ ] Test responsive layout (mobile/tablet/desktop)

### 8. Git Commit & Push
- [ ] `cd /Users/markdarby16/clawd/projects/clawd-hub/` (always work from project dir!)
- [ ] `git add -A`
- [ ] `git status` (verify changes)
- [ ] `git commit -m "feat: descriptive message"`
- [ ] `git push origin main`

### 9. Verify Deployment
- [ ] Wait ~30-60 seconds for Render build
- [ ] Check https://stonebot.onrender.com/{slug}
- [ ] Verify page appears in "What's New" section
- [ ] Test category filter shows new page

---

## ⚠️ Common Mistakes to Avoid

### Mistake #1: Wrong Import for MarkdownPage
**Problem:** `import MarkdownPage from '../components/MarkdownPage'`
**Fix:** Use `import { MarkdownPageWithMeta } from '../components/MarkdownPage'`
**Why:** `MarkdownPage` has no default export, only named exports

### Mistake #2: Forgetting to Add to projects.ts
**Problem:** Page works but doesn't appear on landing page
**Fix:** Always add project metadata to `src/lib/projects.ts`
**Why:** Landing page uses projects array to display cards

### Mistake #3: Working from Wrong Directory
**Problem:** Git commits go to wrong repo
**Fix:** Always `cd /Users/markdarby16/clawd/projects/clawd-hub/` before git commands
**Why:** Workspace has its own git repo, separate from project repo

### Mistake #4: Missing Frontmatter
**Problem:** Page title/description don't display
**Fix:** Always include YAML frontmatter with title, description, date
**Why:** `MarkdownPageWithMeta` extracts metadata from frontmatter

### Mistake #5: Invalid Mermaid Syntax
**Problem:** Diagrams don't render or text is tiny
**Fix:** Always include init block with 16px font size:
  ````markdown
  %%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px'}}}%%
  ```mermaid
  graph TD
    A[Start] --> B[End]
  ```
  ````
**Why:** Default Mermaid font size is too small to read

---

## 📚 Quick Reference

### File Paths
- Content: `src/content/{slug}.md`
- Component: `src/pages/{slug}.tsx`
- Routes: `src/App.tsx`
- Projects: `src/lib/projects.ts`

### Category Options
- `home-renovation` 🏠 - Home improvement projects
- `ai-research` 🌌 - AI experiments and research
- `recipes` 🍳 - Recipe guides
- `demo` 🎨 - Feature demos
- `guide` 📚 - Guides, reviews, comparisons

### Emoji Icons
- Running: 🏃👟⚡🏆
- Tech: 💻🔬🚀📊
- Space: 🌙🔴🚀💫
- Home: 🏠🔨🛠️💡
- General: 📝✅❓💡

---

**Last Updated:** February 7, 2026
**Version:** 1.0
