# MEMORY.md - Long-term Memory

*This file contains durable information about Mark, preferences, projects, and important context.*

---

## Personal Info

- **Name:** Mark
- **Profession:** Physician (based in Calgary, Alberta)
- **Age:** 51 years old
- **Family:** Married to Megan since 1997, 4 grown children (all moved out)
- **Location:** Lives in Carstairs, Alberta (commutes to Calgary)
- **Timezone:** America/Edmonton (MST)

## Health & Fitness

- **Runner** — actively tracks running data
- **Garmin ecosystem** — uses Garmin watch/device for health tracking
- **Nike integration** — Nike data is linked/associated with Garmin data
- **Health metrics monitored:**
  - Sleep (score, stages, duration)
  - Body Battery (recovery metric)
  - HRV (heart rate variability)
  - Resting heart rate
  - Training readiness
  - Activities/workouts

## Projects & Tech

- **Clawd Hub** (`/Users/markdarby16/clawd/projects/clawd-hub/`)
  - React 19 + Vite + TypeScript
  - Deployed to Render Pages (https://stonebot.onrender.com/)
  - Repo: https://github.com/Astrocyte74/clawd
  - AI-powered project dashboard for research, experiments, documentation
  - Uses Markdown for AI-friendly content creation

- **Garmin Health Analysis** (local only, privacy-first)
  - Skill installed: `garmin-health-analysis`
  - Dashboard HTML: `~/Desktop/garmin-health-dashboard.html`
  - Auth tokens: `~/.openclaw/garmin/`
  - Python venv: `~/.openclaw/workspace/skills/garmin-health-analysis/venv/`
  - **NOT deployed publicly** (privacy decision)

- **OpenClaw/Clawdbot Setup**
  - Workspace: `~/.openclaw/workspace/`
  - Skills installed:
    - `control-panel` — Telegram menu system with `/menu`
    - `model-shortcuts` — Quick model switching (`/kimi-o`, `/glm`, `/vision`)
    - `startup` — Welcome message on agent start
    - `vision-fallback` — Auto-switch to Kimi-OR for images
    - `garmin-health-analysis` — Garmin data & dashboards
  - Default model: `zai/glm-4.7`
  - Channel: Telegram

## Preferences

- **Privacy:** Values data security, keeps health data local
- **Git workflow:** Prefers working from project directories, avoids embedded repo issues
- **Content creation:** Prefers Markdown over complex TSX for AI-generated content
- **Deployment:** Uses Render Pages for auto-deploy on git push

## Clawd Hub Markdown Features

When creating content for Clawd Hub, use these Markdown enhancements:

### Callout Boxes
```markdown
> [!TIP]
> This is a helpful tip!

> [!WARNING]
> Be careful here!

> [!NOTE]
> Something to remember.
```

### Syntax Highlighting
```markdown
\```javascript
const greeting = "Hello, World!"
\```
```

### Auto-TOC
Use headings (h1-h3) to automatically generate table of contents.

### Other Features
- Reading progress bar (automatic)
- Back-to-top button (automatic)
- Smooth scrolling (automatic)

## Mermaid Diagram Best Practices

**Always include this init block for readable text:**

```markdown
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px'}}}%%
graph TD
    A[<b>Component Name</b><br/>Description] --> B[Next]
```

**Key Rules:**
1. **Set font size to 16px** — Default is too small
2. **Use `graph TD`** (top-to-bottom) — Better readability than LR
3. **Add stroke borders** — `style A fill:#3b82f6,color:#fff,stroke:#000,stroke-width:2px`
4. **Use `<b>` tags** — Bold component names for emphasis
5. **Simplify edge labels** — 2-3 words max
6. **Semantic colors** — Green=start/success, Blue=primary, Orange=warning, Red=error/end

**Example:**
```markdown
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px'}}}%%
graph TD
    START([<b>Start</b>]) --> CHECK{Health Check?}
    CHECK -->|Healthy| API[YTV2 API]
    CHECK -->|Failed| LOCAL[Local Extraction]
    API --> SUCCESS([<b>Success</b>])
    LOCAL --> SUCCESS

    style START fill:#22c55e,color:#fff,stroke:#000,stroke-width:2px
    style SUCCESS fill:#22c55e,color:#fff,stroke:#000,stroke-width:2px
    style CHECK fill:#f59e0b,color:#fff,stroke:#000,stroke-width:2px
    style API fill:#3b82f6,color:#fff,stroke:#000,stroke-width:2px
```

**Documented in:** `/Users/markdarby16/clawd/projects/clawd-hub/CLAWDBOT-GUIDE.md`

## GitHub Repositories

- **Astrocyte74/clawd** — Clawd Hub (main project dashboard)
- **Astrocyte74/garmin-health-dashboard** — Next.js Garmin + Nike health dashboard

## Garmin Health Dashboard Project (IMPORTANT!)

**Location:** `/Users/markdarby16/clawd/projects/garmin-health-dashboard/`
**Live Demo:** https://garmin-health-dashboard-t3ez.vercel.app/
**Tech Stack:** Next.js 15 + TypeScript + Tailwind + Chart.js + shadcn/ui

### Two Complete Dashboards

| Dashboard | Data Source | What It Tracks |
|-----------|-------------|----------------|
| **Garmin Health** `/` | Garmin Connect API (live sync) | Sleep, HRV, HR, Body Battery, activities (30+ days) |
| **Nike+ Running** `/nike-running` | Exported TCX files (876 files) | 854 runs from June 2021 → January 2023 |

### Nike+ Running Analytics Details

**Stats (854 runs total):**
- **6,473 km** total distance (4,023 miles)
- **542 hours** total running time
- **23 half marathons** (21.1km each — auto-counted)
- **1 marathon** (42.3km)
- **25,209m** elevation gain
- **Date range:** June 2021 → January 2023

**Features:**
- 🏆 Fastest runs leaderboard (5K, 10K, Half Marathon, Marathon)
- 📈 Distance distribution chart
- 📅 Monthly/yearly volume charts
- 📍 GPS location map showing where Mark has run
- 🟠 Orange/amber theme (distinct from Garmin blue)
- ⚡ 24-hour caching after first load (~25-30 sec to parse 876 TCX files)

**Data Location:**
- TCX files: `/Users/markdarby16/clawd/projects/garmin-health-dashboard/data/nikeuserdata/tcx/`
- 876 TCX files total
- Elevation data from NikeFuel extensions in TCX
- GPS coordinates extracted from trackpoints

**Key Scripts:**
- `sync-garmin.sh` — Syncs Garmin data to dashboard
- `src/lib/tcx-parser.ts` — Parses Nike+ TCX files using xml2js
- `src/app/api/nike/route.ts` — Nike+ stats API with 24-hour caching

**Navigation:** Orange "Nike+" button in main header → `/nike-running`

### Garmin Health Dashboard Features

**Main Page (`/`):**
- 30+ days of health data (sleep, HRV, HR, Body Battery, activities)
- Date range picker (7d, 30d, 90d, 6m, 1y)
- Interactive dual-axis charts with synchronized crosshairs
- One-click Garmin sync button
- Color-coded Body Battery zones:
  - 🔴 Red < 25 (depleted)
  - 🟡 Yellow < 50 (low energy)
  - 🟢 Green 50-79 (moderate energy)
  - 🔵 Blue 80-100 (fully charged)
- Running Analytics tab with yearly charts

**All Charts View (`/all-charts`):**
- Crosshair synchronization across all charts
- Zoom/pan functionality
- Multiple chart types (line, bar, scatter)

**Data Source:**
- Garmin Health skill: `/Users/markdarby16/skills/garmin-health-analysis`
- Live sync via Garmin Connect API

## Important Paths

```
~/clawd/projects/clawd-hub/          # Main project
~/.openclaw/workspace/                # OpenClaw workspace
~/.openclaw/workspace/skills/         # Installed skills
~/.openclaw/garmin/                   # Garmin auth tokens
~/Desktop/garmin-health-dashboard.html # Generated dashboard
```

## Critical Warnings

### ⚠️ NEVER Use `/new` Command

**The `/new` command completely wipes the workspace directory**, including:
- `MEMORY.md` (all long-term memory)
- `USER.md` (your profile)
- `PROJECTS.md` (project references)
- `memory/*.md` (daily logs)
- All workspace configuration

**Instead, use `/reset`** which preserves workspace files but clears the conversation context.

**What survives `/new`:**
- Scripts in project directories (e.g., `/Users/markdarby16/clawd/scripts/`)
- Git repositories (e.g., `/Users/markdarby16/clawd/projects/clawd-hub/`)
- Skill installations (stored in `~/.openclaw/`)

**What is lost:**
- All workspace memory files
- Environment variables not in `.zshrc`
- Recent context and learnings

**Recovery after `/new`:**
1. Check project READMEs and documentation
2. Restore from git history if available
3. Rebuild memory from scratch (painful!)

## Notes

- Mark is comfortable with tech but appreciates clear documentation
- Works in medicine so values precision and accuracy
- Prefers `/reset` over `/new` to preserve workspace memory

## Z-Image Project (Tailscale Integration)

**Location:** `/Users/markdarby16/clawd/projects/clawd-hub/`
**Documentation:** `TAILSCALE.md`

### What It Is
Z-Image API running on `localhost:8000` accessible via Tailscale VPN from any device on your Tailnet (Mac, iPhone, iPad) without public internet exposure.

### Key Features
- **Private mesh network** — Only devices on your Tailnet can access
- **Encrypted traffic** — All traffic via Tailscale VPN
- **No public exposure** — API never touches public internet
- **CORS enabled** — Pre-configured for Tailscale IPs (`http://100.*`)

### Get Your Tailscale IP
> [!WARNING]
> **CRITICAL:** Tailscale IPs are **dynamic** and change! Never hardcode them. Always get the current IP before making API requests.

**IMPORTANT:** Mark has **two** Macs on his Tailnet:
- `marks-macbook-pro` (active) — **This one runs the Z-Image backend**
- `marks-macbook-pro-2` (idle) — Does NOT have the backend

The backend IP can change between these devices or reconnect with different IPs!

```bash
# Get current Tailscale IP for ACTIVE Mac
TS_IP=$(/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\." | grep "active" | awk '{print $1}' | head -1)

# Test connectivity
curl http://${TS_IP}:8000/health

# Generate image
curl -X POST http://${TS_IP}:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "blue rocket", "recipe_id": "icon-256", "advanced": {}}'
```

**Common Mistake:**
- ❌ Using `localhost:8000` — Fails because workspace is not the backend directory
- ❌ Using hardcoded IP like `100.101.80.13` — IP changes and becomes stale
- ❌ Using old Tailscale IPs from memory — Dynamic IPs change on reconnect
- ❌ Using the wrong Mac (marks-macbook-pro-2) — Backend is on marks-macbook-pro (active)

**Correct Approach:**
- ✅ Always run the grep command to get current IP
- ✅ Filter for "active" status to find the correct Mac
- ✅ Use the `${TS_IP}` variable in all curl commands
- ✅ Check `/health` endpoint first to verify connectivity

### Test Connectivity
```bash
# ALWAYS get current Tailscale IP first
TS_IP=$(/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\." | awk '{print $1}' | head -1)

# Check backend is running
curl http://${TS_IP}:8000/health
# Response: {"status":"ok","timestamp":"...","uptime_seconds":...}
```

### API Usage

**Standard Generation (Full Prompt):**
```bash
# ALWAYS get current Tailscale IP first
TS_IP=$(/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\." | awk '{print $1}' | head -1)

curl -X POST http://${TS_IP}:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A cat wearing sunglasses",
    "generator": "zimage",
    "advanced": {}
  }'
```

**⚡ Fast Icon Generation (Recipe System):**
```bash
# ALWAYS get current Tailscale IP first
TS_IP=$(/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\." | awk '{print $1}' | head -1)

# Verify backend is running first
curl http://${TS_IP}:8000/health

# Generate icon using recipe
curl -X POST http://${TS_IP}:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "blue rocket",
    "recipe_id": "icon-256",
    "advanced": {}
  }'
```

### Developer Recipes (Fast Icon Generation)

**⚡ Use recipe IDs for 3-4× faster generation!**

| Recipe ID | Size | Steps | Avg Time | Best For |
|-----------|------|-------|----------|----------|
| `icon-256` | 256×256 | 4 | ~6s | Favicons, small icons |
| `web-graphic-256` | 256×256 | 4 | ~6s | Simple web graphics |
| `icon-384` | 384×384 | 4 | ~9s | UI icons, buttons |
| `icon-512` | 512×512 | 5 | ~16s | High-res icons, retina |

**Recipe System Benefits:**
- **3-4× faster** than full prompts (6s vs 22s for 768×768)
- **Consistent style** — Flat vector, solid fill, thick outline
- **Auto-negative prompts** — Built-in quality controls
- **Optimized sizes** — Right dimensions for each use case
- **AUTOMATIC TRANSPARENCY** — Post-processing removes backgrounds! ⭐

> [!WARNING]
> **CRITICAL LESSON (February 7, 2026):**
>
> ❌ **NEVER use `generator: "zimage"` for icons:**
> ```json
> {"prompt": "blue rocket", "generator": "zimage", "advanced": {...}}
> ```
> - Results in WHITE/colored backgrounds (not transparent)
> - Model ignores "transparent background" in prompts
> - You must manually post-process to remove background
>
> ✅ **ALWAYS use `recipe_id` for icons:**
> ```json
> {"prompt": "blue rocket", "recipe_id": "icon-256", "advanced": {}}
> ```
> - **Automatic transparency** via recipe post-processing!
> - Cleaner backgrounds with proper alpha channel
> - Smaller file sizes (white pixels removed)
> - **Lesson learned the hard way with plant icons!**
>
> The Z-Image recipe system has a post-processing step that converts solid backgrounds to transparent after generation. Using `generator` directly skips this step!

**What the recipe system does automatically:**
1. Takes your subject (e.g., "blue rocket")
2. Adds the recipe's prompt template: `"{subject} icon, flat vector icon, solid fill, clean thick outline, centred, no gradients, no shadow, white background"`
3. Applies the recipe's negative prompt: `"photo, realistic, 3d render, gradient, shadow, messy lines, complex details"`
4. Uses the optimized size and steps
5. Returns a clean, flat vector-style icon

**Test Results (February 7, 2026):**
- Blue rocket (icon-256): **5.9s** ⚡⚡⚡
- Settings gear (web-graphic-256): **6.0s** ⚡⚡⚡
- Lightning bolt (icon-384): **8.6s** ⚡⚡
- Heart (icon-512): **15.8s** ⚡
- Database (full prompt, 768×768): **22.3s** (baseline)

### CORS Configuration
`backend/main.py` allows Tailscale IPs:
```python
origins = [
    "http://localhost:5173",
    "http://100.*",  # Any Tailscale IP
]
```

### Security
- Device-level authentication via Tailscale
- Encrypted mesh VPN
- Optional: Add API keys, rate limiting, Tailscale ACLs for production

### Access from iOS
- **HTTPie/Insomnia/Postman:** Direct HTTP requests
- **Pythonista:** Python `requests` library
- **Shortcuts App:** "Get Contents of URL" action

### Full Documentation
`/Users/markdarby16/clawd/projects/clawd-hub/TAILSCALE.md`

---

## Pages Created on Clawd Hub (2026)

### SLS vs Starship (`/sls-vs-starship/`)
**Date:** February 7, 2026

Comprehensive technical comparison of NASA's Space Launch System and SpaceX's Starship.

**Content:**
- Technical specifications comparison table
- Detailed cost analysis ($2.5-4B vs <$10M per launch)
- Lunar mission profiles for both systems
- Mars mission implications and feasibility
- Pros/cons analysis of each approach
- Future outlook: Coexistence → Starship dominance

**Key Findings:**
- SLS is proven but costs **$2.5-4 billion per launch**
- Starship aims for **<$10 million per launch** (250x cheaper)
- SLS can enable initial lunar landings but **cannot scale to Mars**
- Starship's **full reusability** is the game-changer
- Near-term: Both systems work together (Artemis)
- Long-term: Starship dominates due to economics

**Features Demonstrated:**
- Callout boxes (TIP, WARNING, NOTE)
- Syntax-highlighted code blocks
- Auto-generated table of contents
- Comparison tables
- Mermaid diagrams
- Progress bar & back-to-top (auto-generated)

**Files:**
- `/Users/markdarby16/clawd/projects/clawd-hub/src/content/sls-vs-starship.md`
- `/Users/markdarby16/clawd/projects/clawd-hub/src/pages/sls-vs-starship.tsx`

### Best Marathon Running Shoes 2026 (`/best-marathon-shoes-2026/`)
**Date:** February 7, 2026

Comprehensive running shoe guide created from YouTube video transcript using YTV2 API.

**Content:**
- 5 categories: Carbon Racing, Beginners, Value, Training/Racing, Comfort
- Mindmap diagram showing shoe categories
- Comparison tables for each category
- Detailed shoe recommendations with pros/cons

**Source Video:**
- "Best Marathon Running Shoes 2026: Our top picks for racing, beginners, value and comfort"
- Run Testers channel (15:45 duration)
- Transcript extracted via YTV2 API with metadata

**Files:**
- `/Users/markdarby16/clawd/projects/clawd-hub/src/content/best-marathon-shoes-2026.md`
- `/Users/markdarby16/clawd/projects/clawd-hub/src/pages/best-marathon-shoes-2026.tsx`

**Workflow Demonstrated:**
1. Extract transcript via YTV2 API (with health check + retry logic)
2. Generate comprehensive Markdown content
3. Create Mermaid mindmap diagram
4. Add comparison tables and callout boxes
5. Deploy to Clawd Hub via git push

**Content:**
- Technical specifications comparison table
- Detailed cost analysis ($2.5-4B vs <$10M per launch)
- Lunar mission profiles for both systems
- Mars mission implications and feasibility
- Pros/cons analysis of each approach
- Future outlook: Coexistence → Starship dominance

**Key Findings:**
- SLS is proven but costs **$2.5-4 billion per launch**
- Starship aims for **<$10 million per launch** (250x cheaper)
- SLS can enable initial lunar landings but **cannot scale to Mars**
- Starship's **full reusability** is the game-changer
- Near-term: Both systems work together (Artemis)
- Long-term: Starship dominates due to economics

**Features Demonstrated:**
- Callout boxes (TIP, WARNING, NOTE)
- Syntax-highlighted code blocks
- Auto-generated table of contents
- Comparison tables
- Mermaid diagrams
- Progress bar & back-to-top (auto-generated)

**Files:**
- `/Users/markdarby16/clawd/projects/clawd-hub/src/content/sls-vs-starship.md`
- `/Users/markdarby16/clawd/projects/clawd-hub/src/pages/sls-vs-starship.tsx`

---

## YouTube Transcript Script

**Script:** `/Users/markdarby16/clawd/scripts/youtube_transcript.py`

### Features
- **YTV2 API Integration** — Fast transcript extraction with built-in rate limiting and caching
- **Health Check** — Verifies API is responsive before attempting transcript
- **Retry Logic** — Handles transient network issues (Timeout, ConnectionError, HTTP 503)
- **Fallback** — Local extraction via youtube-transcript-api if YTV2 fails

### Configuration
```bash
export YTV2_API_URL="http://192.168.4.54:6453"
export YTV2_API_SECRET="66cd4657a97b10374a43ce06959fcf28aae1e5fa794fd9bebb35e78f0cfcb9c8"
```

### Retry Strategy
- **Retries:** 3 attempts for transient errors
- **Delay:** 5 seconds between retries
- **Timeout:** 60 seconds per request
- **No retry:** HTTP 401 (invalid secret), HTTP 429 (rate limited)

### Error Handling
- `Timeout` → Retry with backoff
- `ConnectionError` → Retry with backoff
- `HTTP 503` → Retry with backoff
- `HTTP 401` → Fail immediately (invalid secret)
- `HTTP 429` → Fail immediately (rate limited)

### Workflow
1. Health check → 2. YTV2 API with retries → 3. Fallback to local extraction

### Usage
```bash
export YTV2_API_SECRET="your-secret-here"
python3 ~/clawd/scripts/youtube_transcript.py "https://youtube.com/watch?v=VIDEO_ID"
```

---

## Z-Image API (IMPORTANT!)

**Status:** ✅ Fully operational (tested February 7, 2026)

### What It Is
Z-Image API running on `localhost:8000` accessible via Tailscale VPN. AI image generation using Stable Diffusion.

### API Endpoints

**GET /api/recipes**
- Returns 90+ image generation recipes in 10 categories
- Categories: Miniature Worlds, Portraits, Product, Photography, Artistic, Infographics, Quick Prompts, Creative Concepts, Travel, Developer
- Each recipe has: `id`, `name`, `grouping`, `prompt`, `focus_tokens`, `negative_prompt`

**POST /api/generate**
- Generates images from text prompts
- Parameters:
  ```json
  {
    "prompt": "A cat wearing sunglasses",
    "generator": "zimage",
    "advanced": {
      "steps": 4,
      "guidance": 7.5
    }
  }
  ```
- Returns: Generated image (768×768 default)
- Generation time: 20-30 seconds (4 steps ≈ 20s, 7 steps ≈ 40s)

### Interesting Recipes
- **Trojan Horse Enters Troy** — Google Street View style with privacy blur
- **Living Passport of Worlds** — Visa stamps transform into 3D cities
- **Historical Event Street View** — 360° panoramas of historical events
- **Spaghetti Western Worlds** — Everything made of pasta
- **Cats in Hats Tour** — Countries as cats in appropriate headwear

### Tailscale Access
- Backend: `localhost:8000`
- Tailscale IP: **Dynamic** (changes on reconnect)
- Get current IP: `/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\."`
- CORS: Pre-configured for `http://100.*` IPs

### Test Commands
```bash
# Get current Tailscale IP
/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\."

# List recipes
curl http://YOUR_TAILSCALE_IP:8000/api/recipes

# Generate image
curl -X POST http://YOUR_TAILSCALE_IP:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A cat wearing sunglasses", "generator": "zimage", "advanced": {}}'
```

### Backend Management
- Location: `/Users/markdarby16/clawd/projects/clawd-hub/backend/`
- Start: `cd backend && python3 main.py`
- Stop: `Ctrl+C` in terminal
- TODO: Set up as background service via launchd

### Usage for Clawd Hub
- Generate featured images for blog posts
- Create custom illustrations for articles
- Recipe system ensures consistent style
- Can add generated images to `/public/images/`

---

*Last updated: February 7, 2026*
