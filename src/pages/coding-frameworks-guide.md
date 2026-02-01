---
title: "Coding Frameworks Guide"
description: "Understanding Next.js, React, Vite, shadcn/ui and how they work together"
---

# Coding Frameworks Guide

A practical comparison of modern web development tools.

## Quick Overview

| Tool | Type | What It Does | When to Use |
|------|------|--------------|-------------|
| **React** | Library | UI components | Any interactive UI |
| **Next.js** | Framework | Full-stack React apps | Production apps, SEO, APIs |
| **Vite** | Build Tool | Fast dev server | New projects, speed |
| **shadcn/ui** | Component library | Pre-built components | Beautiful UIs quickly |

---

## React

### What Is It?
A **JavaScript library** for building user interfaces with components.

### Key Concepts
- **Components** - Reusable UI pieces (buttons, cards, forms)
- **JSX** - HTML-like syntax in JavaScript
- **State** - Data that changes (useState, useReducer)
- **Props** - Data passed to components
- **Hooks** - Functions for side effects (useEffect, useContext)

### Example
```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Use React When
- ✅ Building interactive UIs
- ✅ Need component reusability
- ✅ Want a large ecosystem

### Don't Use React When
- ❌ Simple static pages (HTML/CSS is faster)
- ❌ Learning web development basics first

---

## Next.js

### What Is It?
A **React framework** that handles routing, server-side rendering, and APIs.

### Key Features
- **File-based routing** - `app/page.tsx` → `/`
- **Server Components** - Faster, SEO-friendly
- **API routes** - Built-in backend
- **Image optimization** - Automatic resizing
- **App Router** - Latest routing system

### Project Structure
```
my-app/
├── app/
│   ├── page.tsx          → Home page (/)
│   ├── about/
│   │   └── page.tsx      → About page (/about)
│   └── api/
│       └── hello/
│           └── route.ts  → API endpoint (/api/hello)
├── components/
│   └── Button.tsx        → Reusable components
└── public/               → Static files
```

### Example
```typescript
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Hello Next.js!</h1>
    </main>
  )
}

// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello!' })
}
```

### Use Next.js When
- ✅ Building production apps
- ✅ Need SEO (server rendering)
- ✅ Want built-in API routes
- ✅ Deploying to Vercel (they made it!)

### Don't Use Next.js When
- ❌ Simple static sites (use Vite + React)
- ❌ Learning React basics first

---

## Vite

### What Is It?
A **build tool** that creates a fast dev server and optimizes production builds.

### Key Features
- **Instant start** - No bundling in dev
- **Lightning fast HMR** - See changes instantly
- **Out of the box** - TypeScript, JSX, CSS support
- **Framework agnostic** - Works with React, Vue, Svelte, etc.

### Creating a Vite + React App
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure
```
my-app/
├── src/
│   ├── main.jsx      → Entry point
│   ├── App.jsx       → Main component
│   └── index.css     → Global styles
├── index.html        → HTML template
└── vite.config.js    → Vite config
```

### Use Vite When
- ✅ Starting a new React project
- ✅ Want faster dev experience
- ✅ Building SPAs (single-page apps)
- ✅ Don't need Next.js features

### Don't Use Vite When
- ❌ Need server-side rendering (use Next.js)
- ❌ Building a full-stack app with APIs

---

## shadcn/ui

### What Is It?
A **component library** that copies components into your project (not a dependency).

### Key Features
- **Copy-paste components** - Full control over code
- **Built on Radix UI** - Accessible components
- **Styled with Tailwind** - Easy customization
- **Not a package** - You own the code

### Installing shadcn/ui
```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
```

### Example Usage
```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function MyPage() {
  return (
    <Card>
      <h1>Hello shadcn/ui!</h1>
      <Button>Click me</Button>
    </Card>
  )
}
```

### Use shadcn/ui When
- ✅ Using Tailwind CSS
- ✅ Want beautiful, accessible components
- ✅ Need full control over styling
- ✅ Building with Next.js or Vite

### Don't Use shadcn/ui When
- ❌ Not using Tailwind CSS
- ❌ Want pre-packaged UI library (use Chakra, MUI)

---

## How They Work Together

### Example Stacks

#### 1. Next.js + shadcn/ui (Recommended)
```bash
npx create-next-app@latest my-app
npx shadcn@latest init
```
**Perfect for:** Full-stack apps with beautiful UI

#### 2. Vite + React + shadcn/ui
```bash
npm create vite@latest my-app -- --template react
npx shadcn@latest init
```
**Perfect for:** Fast SPAs with great dev experience

#### 3. Next.js (No UI library)
```bash
npx create-next-app@latest my-app
```
**Perfect for:** Learning, custom components, simple sites

---

## Quick Comparison

### React vs Next.js
| | React | Next.js |
|---|-------|---------|
| **Type** | Library | Framework |
| **Routing** | Manual (react-router) | Built-in |
| **Server Rendering** | No | Yes |
| **API Routes** | No | Yes |
| **Learning Curve** | Medium | Higher |
| **Use For** | UIs | Production apps |

**Next.js = React + routing + server + APIs**

---

### Vite vs Next.js

| | Vite | Next.js |
|---|------|---------|
| **Type** | Build tool | Framework |
| **Dev Speed** | ⚡ Fast | 🐢 Slower |
| **Server Rendering** | No | Yes |
| **API Routes** | No | Yes |
| **Best For** | SPAs | Full-stack apps |

**They're different tools!** Vite is for dev speed, Next.js is for production features.

---

### shadcn/ui vs Others

| | shadcn/ui | Chakra UI | MUI |
|---|-----------|-----------|-----|
| **Style** | Tailwind | Custom | Material |
| **Ownership** | Yours | Theirs | Theirs |
| **Bundle Size** | Smaller | Larger | Larger |
| **Customization** | Full | Medium | Low |
| **Best For** | Control | Quick start | Enterprise |

---

## Which Should You Choose?

### For Learning
1. **Start with React** - Learn components, state, props
2. **Try Vite + React** - Fast dev experience
3. **Move to Next.js** - When you need APIs, SEO
4. **Add shadcn/ui** - When you want beautiful UIs

### For Production
1. **Next.js + shadcn/ui** - Full-stack, beautiful, fast
2. **Vite + React + shadcn/ui** - SPAs, dashboards
3. **Next.js alone** - Custom UI, full control

---

## Your Current Projects

### Garmin Health Dashboard
- **Framework:** Next.js 15
- **Why:** APIs, server-side rendering, Vercel deployment
- **Components:** Custom Chart.js wrappers

### Clawd Hub
- **Framework:** React + Vite (deployed to GitHub Pages)
- **Why:** Simple static site, fast builds
- **Components:** Motion, react-markdown

Both great choices for their use cases! 🎯

---

## Summary

- **React** - UI library, the foundation
- **Next.js** - React framework for production apps
- **Vite** - Build tool for fast development
- **shadcn/ui** - Component library for beautiful UIs

**Rule of thumb:**
- Learning? → Vite + React
- Production app? → Next.js
- Need pretty UI? → Add shadcn/ui

Happy coding! 🚀
