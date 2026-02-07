# Clawd Hub - Quick Onboarding

Welcome! This guide gets you oriented quickly. For detailed instructions, see `CLAWDBOT-GUIDE.md`.

---

## What This Is

**Clawd Hub** is an AI-powered project dashboard for showcasing research, experiments, and documentation.

**Live Site:** https://clawd-hub.onrender.com/

**Repository:** https://github.com/Astrocyte74/clawd

---

## Tech Stack & Why These Choices

| Tech | Why We Chose It |
|------|----------------|
| **React 19 + Vite** | Simple static site, no server complexity needed |
| **Render Pages** | Auto-deploy on git push, no subdirectory path hacks |
| **Motion** | Modern animations, smaller than Framer Motion |
| **react-markdown** | AI can write content in Markdown, not complex TSX |
| **shadcn/ui** | Beautiful components we own (copy-paste, not dependency) |
| **TypeScript** | Type safety, fewer runtime errors |

---

## Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Markdown system | ✅ Working | AI creates `.md` files, they render automatically |
| Motion animations | ✅ Working | Staggered entrance effects on cards |
| Theme system | ✅ Working | 4 color themes × 2 modes (light/dark) |
| Render deployment | ✅ Working | Auto-deploys on push to `main` |
| SPA routing | ✅ Working | React Router with basename `/` |
| Visual polish | ✅ Working | Progress bar, TOC, syntax highlighting, callouts |

---

## Quick Commands

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview build locally | `npm run preview` |
| Add shadcn component | `npx shadcn@latest add [name]` |
| Lint code | `npm run lint` |
| Commit & deploy | `git add -A && git commit -m "..." && git push` |

---

## Working Directory

**Always work from:**
```bash
/Users/markdarby16/clawd/projects/clawd-hub/
```

**Verify you're in the right place:**
```bash
pwd  # Should output: /Users/markdarby16/clawd/projects/clawd-hub
```

---

## Common Gotchas (Avoid These!)

| Gotcha | Solution |
|--------|----------|
| Base path confusion | Base path is `/` not `/clawd/` (we migrated to Render) |
| Markdown import fails | Use `?raw` suffix: `import content from './file.md?raw'` |
| Emoji icons break | Fixed! ProjectCard now handles both emoji and SVG paths |
| Route doesn't work | Check `basename="/"` in BrowserRouter, not `/clawd/` |
| Build fails | Check for missing imports or TypeScript errors first |

---

## Markdown Features (Visual Polish)

All Markdown pages include these enhanced features:

### Callout Boxes (GitHub-style)

Use callouts for tips, warnings, and notes:

```markdown
> [!TIP]
> This is a helpful tip!

> [!WARNING]
> Be careful here!

> [!NOTE]
> Something to remember.
```

### Code Syntax Highlighting

Code blocks get automatic VS Code-style syntax highlighting:

```markdown
\```javascript
const greeting = "Hello, World!"
console.log(greeting)
\```
```

### Table of Contents (Auto-generated)

Headings (h1-h3) automatically generate a table of contents on the right side (desktop).

### Reading Progress Bar

A progress bar at the top shows how far through the page you are.

### Back-to-Top Button

Appears after scrolling down, smoothly scrolls back to top.

### Smooth Scrolling

All anchor links and scroll behavior is smooth.

---

## How to Add a New Page (Quick Version)

1. **Create Markdown file** in `src/content/` or `src/pages/`
2. **Create page wrapper** in `src/pages/` (see `markdown-demo.tsx` for example)
3. **Add route** in `src/App.tsx`
4. **Add to projects** in `src/lib/projects.ts` ← This creates the dashboard card!

**See `CLAWDBOT-GUIDE.md` for detailed instructions.**

---

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (button, card, etc.)
│   ├── Header.tsx       # Main header with theme switcher
│   ├── NavSidebar.tsx   # Left sidebar navigation
│   ├── ProjectCard.tsx  # Individual project cards (with Motion)
│   └── MarkdownPage.tsx # Generic Markdown page renderer
├── pages/               # Route pages
├── lib/
│   ├── projects.ts      # Project data & categories
│   └── themes.ts        # Theme management
└── content/             # Markdown files (AI creates content here)
```

---

## Key Files to Understand

| File | Purpose |
|------|---------|
| `App.tsx` | Main app with all routes |
| `lib/projects.ts` | Add new projects here for dashboard cards |
| `components/MarkdownPage.tsx` | Renders Markdown with frontmatter |
| `components/ProjectCard.tsx` | Handles emoji + SVG icons |
| `CLAWDBOT-GUIDE.md` | Detailed instructions for all tasks |

---

## Deployment

**Automatic:** Push to `main` branch → Render builds and deploys automatically

**Build command:** `npm run build`
**Publish directory:** `dist/`
**Deploy time:** ~1-2 minutes

---

## Theme System

4 color themes × 2 modes = 8 total themes:
- **Colors:** Clawd Purple, Ocean Blue, Forest Green, Sunset Orange
- **Modes:** Light, Dark (auto-detects system preference)

Stored in localStorage as `clawd:theme` and `clawd:colorMode`.

---

## Need More Help?

- **Quick tasks:** This guide
- **Detailed instructions:** `CLAWDBOT-GUIDE.md`
- **Project context:** Ask the user

---

*Last updated: February 7, 2026*
