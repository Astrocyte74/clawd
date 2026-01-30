# Clawdbot Projects Hub

Modern, AI-generated reports and documentation powered by Clawdbot.

## 🎨 Design Features

- **Modern UI/UX** - Contemporary design with gradients, smooth animations, and professional typography
- **Responsive** - Mobile-first design that looks great on all devices
- **Print-friendly** - Optimized for printing with @media print rules
- **Fast & Lightweight** - Pure HTML/CSS, no frameworks needed
- **Accessible** - Semantic HTML with proper heading hierarchy

## 📁 Structure

```
projects/
├── index.html              # Main landing page (modern project hub)
├── README.md              # This file
├── flooring-basement/     # Basement flooring project
│   └── index.html         # Complete flooring plan report
├── ai-news/              # AI news reports
├── ai-news-reports/      # Additional reports
└── templates/            # Reusable templates
    └── project-template.html
```

## 🚀 Getting Started

### Local Development

1. **View the hub:**
   ```bash
   open projects/index.html
   # or double-click the file
   ```

2. **Add a new project:**
   ```bash
   # Create project folder
   mkdir projects/your-project-name
   
   # Copy template
   cp projects/templates/project-template.html projects/your-project-name/index.html
   
   # Edit the file with your content
   open projects/your-project-name/index.html
   ```

3. **Update the landing page:**
   - Edit `projects/index.html`
   - Add your project card to the appropriate category section
   - Update the project count in the hero stats

### GitHub Pages Deployment

#### Quick Start

1. **Initialize repository:**
   ```bash
   cd /Users/markdarby16/clawd
   git init
   git add projects/
   git commit -m "Add modern projects hub"
   ```

2. **Create GitHub repository:**
   - Go to [github.com](https://github.com) and create a new repo
   - Name it something like `clawd-projects`
   - Don't initialize with README

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/clawd-projects.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to repository → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` → `/projects` folder
   - Click **Save**
   - Your site will be at: `https://YOUR_USERNAME.github.io/clawd-projects`

#### Workflow for New Projects

```bash
# 1. Create and edit your project
mkdir projects/new-project
cp templates/project-template.html projects/new-project/index.html
# Edit content...

# 2. Update landing page
# Add project to projects/index.html

# 3. Test locally
open projects/index.html

# 4. Commit and push
git add projects/
git commit -m "Add new project: Project Name"
git push

# 5. GitHub Pages auto-updates in 1-2 minutes
```

## 🎯 Project Categories

- **🏠 Home & Renovation** - Flooring, remodeling, DIY projects, home improvement
- **🤖 AI & Research** - News reports, research summaries, analysis, documentation
- **📂 Other** - Miscellaneous projects and reports

## 📝 Template Usage

The `templates/project-template.html` file includes:
- Modern responsive design
- Navigation with "Back to Hub" link
- Hero section with category badge
- Content card sections
- Print-optimized styles
- Consistent branding

### Customizing the Template

1. Replace `[PROJECT TITLE]` with your actual title
2. Replace `[PROJECT DESCRIPTION]` with a brief summary
3. Replace `[CATEGORY]` with your category name
4. Replace `[DATE]` with the project date
5. Replace `[STATUS]` with current status
6. Add your content in the sections provided

## 🎨 Design System

### Colors
```css
--primary: #6366f1      /* Indigo */
--secondary: #ec4899    /* Pink */
--accent: #14b8a6       /* Teal */
--dark: #0f172a         /* Slate */
--gray: #64748b         /* Gray */
```

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** 700-800 weight, tight letter spacing
- **Body:** 400 weight, relaxed line height
- **Responsive sizing:** Uses clamp() for fluid typography

### Components
- **Cards:** 24px border radius, shadow on hover
- **Buttons:** 12px border radius, gradient backgrounds
- **Badges:** Pill-shaped, gradient backgrounds
- **Sections:** Clear visual hierarchy with spacing

## 📊 Project Card Format

```html
<div class="project-card" onclick="window.location.href='project-folder/index.html'">
    <div class="project-category">
        <span>🏠 CATEGORY</span>
    </div>
    <h3 class="project-title">Project Title</h3>
    <p class="project-description">Brief description...</p>
    <div class="project-meta">
        <div class="meta-item">
            <svg>...</svg>
            <span>Date</span>
        </div>
    </div>
    <a href="project-folder/index.html" class="project-link">
        View Report →
    </a>
</div>
```

## 🔧 Customization

### Updating Hero Stats

Edit `projects/index.html`:
```html
<div class="stat-number">X</div>
<div class="stat-label">Active Projects</div>
```

### Adding New Categories

1. Add a new section in `projects/index.html`:
```html
<div class="section-header">
    <h2>📁 New Category</h2>
    <p>Description here...</p>
</div>
<div class="projects-grid">
    <!-- Project cards here -->
</div>
```

### Changing Color Scheme

Edit the CSS variables in `:root`:
```css
:root {
    --primary: #your-color;
    --gradient-1: linear-gradient(...);
}
```

## 🌐 Best Practices

- ✅ Keep project names short and descriptive
- ✅ Use consistent date format (Month DD, YYYY)
- ✅ Write clear, concise descriptions
- ✅ Test on mobile before publishing
- ✅ Optimize images before adding
- ✅ Update the landing page when adding projects
- ✅ Use meaningful commit messages
- ✅ Keep templates updated with design changes

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Content generated by Clawdbot AI Assistant.

---

**Built with modern web technologies** • Last updated: January 30, 2026
