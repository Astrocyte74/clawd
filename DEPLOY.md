# GitHub Pages Deployment Instructions

The GitHub Actions deployment has been failing with "Internal server error" from GitHub's infrastructure.

## To Deploy Manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files are in `dist/`

3. Check GitHub repository settings:
   - Go to Settings → Pages
   - Source should be: "Deploy from a branch"
   - Branch: `gh-pages` folder: `/root`

4. Create and push gh-pages branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## Current Status:
- ✅ Code is ready (space exploration guide + link fixes)
- ✅ Local build works
- ⚠️ GitHub Actions failing (infrastructure issue)
- 🔄 Manual deploy available using `git subtree push`

## Alternative:
Just wait for GitHub's infrastructure to recover and the Actions deployment will work again.
