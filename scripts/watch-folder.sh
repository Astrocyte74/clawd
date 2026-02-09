#!/bin/bash
# Folder Watcher - Monitor folder for .txt files and generate images
# Usage: ./watch-folder.sh /path/to/watch

WATCH_DIR="${1:-$HOME/Dropbox/Input}"
OUTPUT_DIR="${2:-$HOME/Dropbox/Output}"
Z_IMAGE_BACKEND="${Z_IMAGE_BACKEND:-http://localhost:8000}"

echo "📁 Watching: $WATCH_DIR"
echo "📁 Output: $OUTPUT_DIR"
echo "🎨 Z-Image: $Z_IMAGE_BACKEND"
echo "Press Ctrl+C to stop..."

# Create output directory if needed
mkdir -p "$OUTPUT_DIR"

# Check if Z-Image is running
check_zimage() {
    curl -s "$Z_IMAGE_BACKEND/health" > /dev/null 2>&1
    return $?
}

# Monitor folder using fswatch (if installed) or poll
if command -v fswatch >/dev/null 2>&1; then
    echo "✅ Using fswatch for efficient monitoring"
    fswatch -o "$WATCH_DIR" -e ".*" -i "\\.txt$" | while read event; do
        process_new_files
    done
else
    echo "⚠️  fswatch not found, using polling (install with: brew install fswatch)"
    echo "🔄 Polling every 5 seconds..."

    LAST_COUNT=$(ls -1 "$WATCH_DIR"/*.txt 2>/dev/null | wc -l)

    while true; do
        CURRENT_COUNT=$(ls -1 "$WATCH_DIR"/*.txt 2>/dev/null | wc -l)

        if [ "$CURRENT_COUNT" -gt "$LAST_COUNT" ]; then
            echo "🔔 New file(s) detected!"
            process_new_files
            LAST_COUNT=$CURRENT_COUNT
        fi

        sleep 5
    done
fi

process_new_files() {
    for txtfile in "$WATCH_DIR"/*.txt; do
        [ -f "$txtfile" ] || continue

        # Skip if we've already processed this file (check for .done marker)
        [ -f "${txtfile}.done" ] && continue

        echo ""
        echo "📄 Processing: $(basename "$txtfile")"

        # Read content
        CONTENT=$(cat "$txtfile")

        # Generate summary and image prompt
        echo "🤖 Generating summary and prompt..."

        PROMPT_RESPONSE=$(curl -s "$Z_IMAGE_BACKEND/api/generate" \
            -H "Content-Type: application/json" \
            -d "{
                \"prompt\": \"Create an image based on this text: ${CONTENT:0:500}\",
                \"generator\": \"zimage\",
                \"advanced\": {\"steps\": 4}
            }")

        echo "✨ Image generated!"
        echo "$PROMPT_RESPONSE" > "${txtfile}.response.json"

        # Mark as done
        touch "${txtfile}.done"

        echo "✅ Completed: $(basename "$txtfile")"
    done
}
