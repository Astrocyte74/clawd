#!/bin/bash
# Auto-fix timestamps in projects.ts
# Updates any Date('YYYY-MM-DD') without time to include current time

PROJECTS_FILE="src/lib/projects.ts"

echo "🔍 Checking timestamps in $PROJECTS_FILE..."

# Count how many entries have date-only timestamps (no time component)
BAD_TIMESTAMPS=$(grep -c "new Date('[0-9]*-[0-9]*-[0-9]*')\"" "$PROJECTS_FILE" || echo "0")

if [ "$BAD_TIMESTAMPS" -eq "0" ]; then
    echo "✅ All timestamps include time component!"
    exit 0
fi

echo "⚠️  Found $BAD_TIMESTAMPS entries with date-only timestamps"
echo ""
echo "Run this command to fix automatically:"
echo "  node scripts/fix-timestamps.js"
echo ""
echo "Or manually update each entry to use: new Date() instead of new Date('YYYY-MM-DD')"

# List the problematic entries
echo ""
echo "Entries needing fixes:"
grep -n "new Date('[0-9]*-[0-9]*-[0-9]*')\"" "$PROJECTS_FILE" | while read -r line; do
    LINE_NUM=$(echo "$line" | cut -d: -f1)
    CONTEXT=$(sed -n "${LINE_NUM}p" "$PROJECTS_FILE")
    echo "  Line $LINE_NUM: $CONTEXT"
done
