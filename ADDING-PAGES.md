# Adding New Pages to Clawd Hub

When creating a new guide or page for the Clawd Hub dashboard, follow these steps **in order**.

## Quick Checklist

- [ ] 1. Create markdown file in `src/content/`
- [ ] 2. Create page component in `src/pages/`
- [ ] 3. Import and add route in `src/App.tsx`
- [ ] 4. Add project entry in `src/lib/projects.ts`
- [ ] 5. Commit and push

---

## Step 1: Create Markdown Content

Create a new `.md` file in `src/content/`:

```
src/content/my-new-guide.md
```

**Required frontmatter:**

```markdown
---
title: "Your Page Title"
date: "2026-02-20"
category: "Technology"
description: "Brief description for SEO and cards"
---

# Your Content Here

...markdown content...
```

**Tip:** Use Obsidian-style callouts for nice formatting:
```markdown
> [!TIP]
> Helpful tip here

> [!WARNING]
> Warning text here

> [!NOTE]
> Note text here
```

---

## Step 2: Create Page Component

Create a corresponding `.tsx` file in `src/pages/`:

```
src/pages/my-new-guide.tsx
```

**Template:**

```tsx
import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import content from '../content/my-new-guide.md?raw'

export default function MyNewGuide() {
  return <MarkdownPageWithMeta rawContent={content} />
}
```

**Important:** The component name should be PascalCase (e.g., `MyNewGuide`).

---

## Step 3: Add Route in App.tsx

Open `src/App.tsx` and make two additions:

### 3a. Add import at top

```tsx
import MyNewGuidePage from './pages/my-new-guide'
```

Add it with the other imports, alphabetically is nice but not required.

### 3b. Add route in the Routes section

Find the `<Routes>` block and add:

```tsx
<Route path="/my-new-guide" element={<MyNewGuidePage />} />
```

---

## Step 4: Add Project Entry

Open `src/lib/projects.ts` and add a new entry to the `projects` array:

```ts
{
  id: 'my-new-guide',
  title: 'Your Page Title',
  description: 'Full description for the page. Shows on the page itself.',
  blurb: 'Short one-liner for the dashboard card.',
  category: 'guide',  // Options: 'home-renovation' | 'ai-research' | 'recipes' | 'demo' | 'guide'
  updatedAt: new Date('2026-02-20'),
  categoryLabel: 'Setup Guide',
  categoryIcon: '🛠️',
  href: '/my-new-guide',
  date: 'Feb 20, 2026',
  metadata: [
    {
      icon: '📝',
      label: 'Metadata badge'
    },
    {
      icon: '✅',
      label: 'Another badge'
    }
  ]
}
```

**Category options:**
| Category | Icon Suggestions | Use For |
|----------|------------------|---------|
| `guide` | 📚, 🛠️, 📖 | How-to guides, tutorials |
| `ai-research` | 🤖, 🌌, 🔬 | AI/tech research |
| `home-renovation` | 🏠, 🔧 | Home projects |
| `recipes` | 🥢, 🍳 | Cooking/food |
| `demo` | 🎨, ✨ | Feature demos |

**Metadata badges:** These appear at the bottom of cards. Use emoji strings for icons.

---

## Step 5: Commit and Push

```bash
cd /Users/markdarby16/clawd/projects/clawd-hub
git add -A
git commit -m "Add [page name] guide"
git push
```

Render will auto-deploy within 1-2 minutes.

---

## File Naming Convention

| File Type | Location | Naming |
|-----------|----------|--------|
| Markdown | `src/content/` | `kebab-case.md` |
| Page component | `src/pages/` | `kebab-case.tsx` |
| Route path | App.tsx | `/kebab-case` |
| Project ID | projects.ts | `kebab-case` |

**Keep all four names identical** (minus extensions) to avoid confusion.

---

## Example: Full Page Addition

### 1. Create `src/content/zettlab-setup.md`

```markdown
---
title: "Zettlab D6 Ultra Setup"
date: "2026-02-20"
category: "Technology"
description: "Complete setup guide for Zettlab NAS"
---

# Zettlab D6 Ultra Setup

...content...
```

### 2. Create `src/pages/zettlab-setup.tsx`

```tsx
import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import content from '../content/zettlab-setup.md?raw'

export default function ZettlabSetup() {
  return <MarkdownPageWithMeta rawContent={content} />
}
```

### 3. Edit `src/App.tsx`

Add import:
```tsx
import ZettlabSetupPage from './pages/zettlab-setup'
```

Add route:
```tsx
<Route path="/zettlab-setup" element={<ZettlabSetupPage />} />
```

### 4. Edit `src/lib/projects.ts`

```ts
{
  id: 'zettlab-setup',
  title: 'Zettlab D6 Ultra Setup',
  description: 'Complete setup guide for Zettlab NAS with RAID 6.',
  blurb: 'Setup guide: 96GB RAM, RAID 6, 72TB usable',
  category: 'guide',
  updatedAt: new Date('2026-02-20'),
  categoryLabel: 'Setup Guide',
  categoryIcon: '🛠️',
  href: '/zettlab-setup',
  date: 'Feb 20, 2026',
  metadata: [
    { icon: '💾', label: '72.7 TiB' },
    { icon: '🔒', label: 'RAID 6' }
  ]
}
```

### 5. Commit & Push

```bash
git add -A && git commit -m "Add Zettlab setup guide" && git push
```

---

## Troubleshooting

**Page shows 404:**
- Check that route path in App.tsx matches href in projects.ts
- Verify the page component imports correctly

**Page not showing on dashboard:**
- Check projects.ts entry exists
- Verify `updatedAt` date is recent
- Check category is valid

**Markdown not rendering:**
- Check frontmatter has required fields
- Verify the .md file imports correctly in page component

---

## Quick Reference: Files to Edit

| What You're Adding | Files to Create/Modify |
|--------------------|------------------------|
| New page/guide | 1. `src/content/[name].md` (CREATE) |
| | 2. `src/pages/[name].tsx` (CREATE) |
| | 3. `src/App.tsx` (ADD import + route) |
| | 4. `src/lib/projects.ts` (ADD entry) |

---

*Last updated: February 20, 2026*
