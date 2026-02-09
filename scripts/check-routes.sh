#!/bin/bash
# Route Verification Script
# Checks if all pages in src/pages/ have corresponding routes in App.tsx

echo "🔍 Checking route configuration..."

PAGES_DIR="src/pages"
APP_FILE="src/App.tsx"
ERRORS_FOUND=0

# Find all page components
find "$PAGES_DIR" -name "*.tsx" -not -name "*.test.tsx" | while read -r page_file; do
  page_name=$(basename "$page_file" .tsx)

  # Skip index files
  if [[ "$page_name" == "index" ]]; then
    continue
  fi

  # Check if import exists
  if ! grep -q "import.*${page_name}Page.*from.*pages/${page_name}" "$APP_FILE"; then
    echo "❌ Missing import: $page_name"
    echo "   Add: import ${page_name}Page from './pages/${page_name}'"
    ERRORS_FOUND=1
  fi

  # Check if route exists
  if ! grep -q "${page_name}Page" "$APP_FILE" | grep -q "Route.*path="; then
    echo "❌ Missing route: $page_name"
    echo "   Add: <Route path=\"/${page_name}\" element={<${page_name}Page />} />"
    ERRORS_FOUND=1
  fi
done

if [ $ERRORS_FOUND -eq 0 ]; then
  echo "✅ All routes configured correctly!"
  exit 0
else
  echo "⚠️  Route configuration issues found!"
  exit 1
fi
