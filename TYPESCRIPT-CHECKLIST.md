# TypeScript Build Checklist for Clawd Hub

**Created:** February 8, 2026
**Purpose:** Catch TypeScript errors before pushing to avoid failed deployments

---

## 🚨 The Problem

When creating new pages, using the wrong prop names for `MarkdownPageWithMeta` causes build failures:

```tsx
// ❌ WRONG - Causes build error
export const metadata = { title: "...", description: "..." };
return <MarkdownPageWithMeta meta={metadata} />;

// ✅ CORRECT
import content from "../content/page.md?raw";
return <MarkdownPageWithMeta rawContent={content} />;
```

---

## ✅ Correct Page Template

**Always use this pattern for new pages:**

```tsx
import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/your-page-slug.md?raw";

export default function YourPageSlugPage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
```

**Key points:**
1. Import `MarkdownPageWithMeta` from `@/components/MarkdownPage`
2. Import content with `?raw` suffix
3. Use `rawContent` prop (NOT `meta`)
4. No `export const metadata` needed (metadata comes from YAML frontmatter in .md file)

---

## 🔍 Pre-Push Checklist

### **1. Local Build Test**

Before pushing, run:

```bash
cd /Users/markdarby16/clawd/projects/clawd-hub
npm run build
```

**Look for:**
- ✅ "built in Xs" = Success
- ❌ "error TS" = Fix before pushing

### **2. Check New Pages**

Verify each new page follows the template:

```bash
# Check for incorrect prop usage
grep -r "meta={metadata}" src/pages/
# Should return nothing

# Check for correct prop usage
grep -r "rawContent={content}" src/pages/
# Should show all your pages
```

### **3. Verify Imports**

Ensure all `.tsx` files have the `?raw` suffix:

```bash
# Check for missing ?raw
grep -r "from.*content/.*.md\"" src/pages/
# Should return nothing (all should have .md?raw)

# Verify correct imports
grep -r "from.*content/.*.md?raw\"" src/pages/
# Should show all content imports
```

---

## 🛠️ Pre-Commit Hook (Optional)

**Location:** `.git/hooks/pre-commit`

```bash
#!/bin/bash
echo "🔍 Testing TypeScript compilation..."

if npm run build 2>&1 | grep -q "error TS"; then
    echo "❌ TypeScript errors found! Commit aborted."
    echo "Run 'npm run build' to see errors."
    exit 1
else
    echo "✅ TypeScript build successful"
    exit 0
fi
```

**Install:**
```bash
chmod +x .git/hooks/pre-commit
```

---

## 📋 Common Errors & Solutions

### **Error: Property 'meta' does not exist**

**Cause:** Using `meta` prop instead of `rawContent`

**Fix:**
```tsx
// Before
export const metadata = { title: "...", ... };
return <MarkdownPageWithMeta meta={metadata} />;

// After
import content from "../content/page.md?raw";
return <MarkdownPageWithMeta rawContent={content} />;
```

### **Error: Cannot find module**

**Cause:** Missing `?raw` suffix in import

**Fix:**
```tsx
// Before
import content from "../content/page.md";

// After
import content from "../content/page.md?raw";
```

### **Error: Type 'string' is not assignable to type 'never'**

**Cause:** YAML frontmatter syntax error in .md file

**Fix:** Check frontmatter format:
```yaml
---
title: "Your Title"
description: "Your description"
date: "2026-02-08"
category: "guide"
tags: ["tag1", "tag2"]
---
```

---

## 🚀 Best Practices

### **1. Use Existing Pages as Reference**

Before creating a new page, check a working example:

```bash
cat src/pages/best-marathon-shoes-2026.tsx
```

### **2. Follow PAGE-CHECKLIST.md**

Use the comprehensive checklist:
- Content file with YAML frontmatter
- Component file with correct import
- Add route to App.tsx
- Add metadata to projects.ts

### **3. Test Locally First**

```bash
# Create page
# Add to App.tsx
# Add to projects.ts
# THEN test build
npm run build

# If successful, commit and push
git add -A
git commit -m "Add new page"
git push origin main
```

### **4. Monitor Deploy Status**

After pushing, check Render dashboard:
- https://dashboard.render.com
- Navigate to "stonebot" service
- Check "Events" tab for build status

---

## 🎯 Quick Reference

**Correct Component Structure:**

```tsx
// src/pages/your-page.tsx
import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/your-page.md?raw";

export default function YourPagePage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
```

**Correct Frontmatter:**

```yaml
---
title: "Your Page Title"
description: "Your page description"
date: "2026-02-08"
category: "guide"
tags: ["tag1", "tag2"]
---
```

**Incorrect Examples to Avoid:**

```tsx
// ❌ Don't do this
export const metadata = { ... };
return <MarkdownPageWithMeta meta={metadata} />;

// ❌ Don't do this
import content from "../content/page.md";  // Missing ?raw
return <MarkdownPageWithMeta rawContent={content} />;

// ❌ Don't do this
export default function Page({ meta }) {  // Wrong props
  return <MarkdownPageWithMeta {...meta} />;
}
```

---

## 📞 Troubleshooting

**Build still failing?**

1. Check full error message: `npm run build`
2. Verify all imports have `?raw` suffix
3. Check YAML frontmatter syntax
4. Ensure App.tsx route is correct
5. Verify projects.ts entry exists
6. Check for TypeScript errors in other files

**Need help?**

- Check existing working pages
- Review PAGE-CHECKLIST.md
- Ask in chat for assistance

---

## Summary

**Golden Rule:** Always use `rawContent={content}` with `?raw` import suffix.

**Before Pushing:**
1. ✅ Run `npm run build`
2. ✅ Check for TypeScript errors
3. ✅ Verify all new pages use correct pattern
4. ✅ Only push if build succeeds

**Result:** Zero failed deployments! 🎉

---

*Last Updated: February 8, 2026*
*Learned from: Failed deployment due to incorrect prop usage*
