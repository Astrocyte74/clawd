# Tailscale Integration

Access your Z-Image API from any device on your Tailnet (Mac, iPhone, iPad, etc.) for free, without exposing it to the public internet.

## Overview

Z-Image runs on `http://localhost:8000` by default. With Tailscale, you can access it from any Tailscale-connected device using your Mac's Tailscale IP.

```
Your iPhone (100.84.177.119)
    ↓
Tailscale VPN (encrypted, private)
    ↓
Your Mac (100.101.80.13:8000) ← Z-Image API
```

## Prerequisites

1. **Tailscale installed** on all devices
   - Mac: https://tailscale.com/download/mac
   - iOS: App Store
2. **Devices logged in** to the same Tailscale account
3. **Z-Image backend running** on your host Mac

## Find Your Tailscale IP

> [!WARNING]
> **Your Tailscale IP may change!** Always check your current IP before making requests. The IP can change when you restart Tailscale or reconnect to your Tailnet.

From your Mac (the one running Z-Image):

```bash
/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\."
```

Look for the IP next to your Mac's hostname (format: `100.x.x.x`).

Example output:
```
100.101.80.13   marks-macbook-pro    Astrocyte74@  macOS  active
```

**In this documentation, replace `YOUR_TAILSCALE_IP` with your actual IP from the command above.**

## Test Connectivity

From another Tailscale device (Mac, iPhone, etc.):

```bash
# Replace YOUR_TAILSCALE_IP with your actual IP from the step above
curl http://YOUR_TAILSCALE_IP:8000/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","uptime_seconds":...}
```

Expected response:
```json
{"status":"ok","timestamp":"...","uptime_seconds":...}
```

## API Usage

### Generate Image (curl)

```bash
# Replace YOUR_TAILSCALE_IP with your actual IP
curl -X POST http://YOUR_TAILSCALE_IP:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A cat wearing sunglasses",
    "generator": "zimage",
    "advanced": {}
  }'
```

**Expected Duration:** 20-30 seconds for 768×768 images (varies by prompt complexity and steps)

Response:
```json
{
  "id": "20260208T0127134807890000",
  "image_url": "/generated/20260208T0127134807890000.png",
  "prompt": "A cat wearing sunglasses",
  "duration_sec": 29.8
}
```

Access the image:
```
http://YOUR_TAILSCALE_IP:8000/generated/20260208T0127134807890000.png
```

### From Web Apps / Browsers

Browser-based apps require CORS support. The Z-Image backend is pre-configured to allow Tailscale IPs (see `backend/main.py`).

```javascript
const response = await fetch('http://YOUR_TAILSCALE_IP:8000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "A futuristic cityscape",
    generator: "zimage",
    advanced: {
      width: 1024,
      height: 1024,
      steps: 7
    }
  })
});
const result = await response.json();
const imageUrl = `http://YOUR_TAILSCALE_IP:8000${result.image_url}`;
```

### From iOS (iPhone/iPad)

**Option 1: HTTP Request Apps**
- Install: HTTPie, Insomnia, or Postman
- URL: `http://YOUR_TAILSCALE_IP:8000/health`

**Option 2: Pythonista (Python)**
```python
import requests
# Replace with your current Tailscale IP
r = requests.get('http://YOUR_TAILSCALE_IP:8000/health')
print(r.json())

r = requests.post('http://YOUR_TAILSCALE_IP:8000/api/generate', json={
    "prompt": "A sunset over mountains",
    "generator": "zimage",
    "advanced": {}
})
print(r.json())
```

**Option 3: Shortcuts App**
1. Create new shortcut
2. Add "Get Contents of URL"
3. URL: `http://YOUR_TAILSCALE_IP:8000/api/generate`
4. Method: POST
5. Headers: `Content-Type: application/json`
6. Body: `{"prompt":"test","generator":"zimage","advanced":{}}`

## CORS Configuration

Tailscale access is enabled in `backend/main.py`:

```python
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://100.*",  # Any Tailscale IP
]
```

If you need to restrict access to specific Tailscale IPs, replace `"http://100.*"` with specific IPs:
```python
"http://100.101.80.13:5173",
"http://100.84.177.119:3000",  # Your iPhone
```

## Security

- **Private**: Only devices on your Tailnet can access
- **Encrypted**: All traffic is encrypted via Tailscale's mesh VPN
- **No public exposure**: Your API never touches the public internet
- **Authentication**: Tailscale provides device-level authentication

For additional security in production environments:
1. Add API key authentication to `backend/main.py`
2. Use Tailscale's ACL features to restrict device access
3. Enable rate limiting

## Quick Reference

| Device | Access URL |
|--------|------------|
| Host Mac | `http://localhost:8000` |
| Other Macs | `http://YOUR_TAILSCALE_IP:8000` |
| iPhone (curl equivalent) | `http://YOUR_TAILSCALE_IP:8000` |
| Browser apps | `http://YOUR_TAILSCALE_IP:8000` |

**Replace `YOUR_TAILSCALE_IP` with your actual IP from:**
```bash
/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep "100\."
```

## Troubleshooting

**"Could not resolve host"**
- You're using a placeholder IP. Get your actual Tailscale IP from `tailscale status`

**"Connection refused"**
- Z-Image backend isn't running. Start it: `uvicorn backend.main:app --host 0.0.0.0 --port 8000`

**CORS errors in browser**
- Restart backend after updating `backend/main.py` CORS config
- Check browser console for specific blocked origin

**Slow generation times**
- Normal for local generation (20-30 seconds for 768×768 images)
- First generation is slower (model loading)
- More steps = longer generation (4 steps ≈ 20s, 7 steps ≈ 40s)
- Check CPU/GPU usage in Activity Monitor (device: "mps" = Apple Silicon GPU)

## Related Documentation

- [API Documentation](../API_DOCUMENTATION.md) - Full API reference
- [API Examples](../API_EXAMPLES.md) - More usage examples
- [README](../README.md) - Project setup
