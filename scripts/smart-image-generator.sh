#!/bin/bash
# Smart Image Generator - Watch folder for .txt files and create AI images
# Usage: ./smart-image-generator.sh /path/to/watch /path/to/output

WATCH_DIR="${1:-$HOME/Dropbox/Input}"
OUTPUT_DIR="${2:-$HOME/Dropbox/Output-G}"
LOG_FILE="${WATCH_DIR}/generator.log"

# Get current Tailscale IP for Z-Image backend
get_tailscale_ip() {
    /Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\." | grep "active" | awk '{print $1}' | head -1
}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Create directories
mkdir -p "$WATCH_DIR" "$OUTPUT_DIR"

log "🚀 Smart Image Generator Starting..."
log "📁 Watch folder: $WATCH_DIR"
log "📁 Output folder: $OUTPUT_DIR"

# Check for required tools
if ! command -v fswatch >/dev/null 2>&1; then
    warn "fswatch not installed. Install with: brew install fswatch"
    warn "Falling back to polling mode (less efficient)..."
    USE_POLLING=true
else
    log "✅ Using fswatch for efficient monitoring"
    USE_POLLING=false
fi

# Process a single file
process_file() {
    local txtfile="$1"
    local basename=$(basename "$txtfile" .txt)

    # Skip if already processed
    [ -f "${OUTPUT_DIR}/${basename}.png" ] && return

    log "📄 Processing: $basename"

    # Read content
    local content=$(cat "$txtfile")

    if [ -z "$content" ]; then
        error "Empty file: $txtfile"
        return
    fi

    # Get Tailscale IP
    local TS_IP=$(get_tailscale_ip)
    if [ -z "$TS_IP" ]; then
        error "Could not get Tailscale IP. Is Tailscale running?"
        return
    fi

    # Check Z-Image backend
    info "🔍 Checking Z-Image backend at $TS_IP:8000..."
    if ! curl -s "http://${TS_IP}:8000/health" > /dev/null 2>&1; then
        error "Z-Image backend not responding. Start it with: cd ~/clawd/projects/clawd-hub/backend && python3 main.py"
        return
    fi

    info "✅ Z-Image backend is running"

    # Generate image using recipe system (fastest with transparency)
    log "🎨 Generating image..."

    # Use the first 200 chars as the prompt for icon generation
    local prompt=$(echo "$content" | head -c 200)

    local response=$(curl -s -X POST "http://${TS_IP}:8000/api/generate" \
        -H "Content-Type: application/json" \
        -d "{
            \"prompt\": \"$prompt\",
            \"recipe_id\": \"icon-256\",
            \"advanced\": {}
        }" 2>&1)

    # Check if image was generated
    if echo "$response" | grep -q "image_url"; then
        local image_url=$(echo "$response" | grep -o '"image_url":"[^"]*' | cut -d'"' -f4)

        if [ -n "$image_url" ]; then
            # Download image
            info "📥 Downloading image..."
            curl -s "$image_url" -o "${OUTPUT_DIR}/${basename}.png"

            if [ -f "${OUTPUT_DIR}/${basename}.png" ]; then
                local size=$(wc -c < "${OUTPUT_DIR}/${basename}.png" | awk '{print $1}')
                log "✅ Image created: ${basename}.png (${size} bytes)"

                # Move source file to processed
                mv "$txtfile" "${WATCH_DIR}/processed/${basename}.txt" 2>/dev/null || \
                    mv "$txtfile" "${txtfile}.processed"
            else
                error "Failed to download image"
            fi
        else
            error "No image URL in response"
            warn "Response: $response"
        fi
    else
        error "Image generation failed"
        warn "Response: $response"
    fi
}

# Create processed folder
mkdir -p "${WATCH_DIR}/processed" 2>/dev/null

# Main monitoring loop
if [ "$USE_POLLING" = true ]; then
    log "🔄 Starting polling mode (5 second intervals)..."

    declare -A seen_files

    while true; do
        for txtfile in "$WATCH_DIR"/*.txt; do
            [ -f "$txtfile" ] || continue

            # Skip processed files
            [[ "$txtfile" == *.processed ]] && continue
            [ -f "${txtfile}.done" ] && continue

            # Check if we've seen this file
            if [ -z "${seen_files[$txtfile]}" ]; then
                seen_files[$txtfile]=1
                process_file "$txtfile"
            fi
        done

        sleep 5
    done
else
    log "👀 Starting fswatch monitoring..."
    fswatch -o "$WATCH_DIR" -e ".*" -i "\\.txt$" | while read; do
        for txtfile in "$WATCH_DIR"/*.txt; do
            [ -f "$txtfile" ] || continue

            # Skip processed files
            [[ "$txtfile" == *.processed ]] && continue
            [ -f "${txtfile}.done" ] && continue

            process_file "$txtfile"
            touch "${txtfile}.done"
        done
    done
fi
