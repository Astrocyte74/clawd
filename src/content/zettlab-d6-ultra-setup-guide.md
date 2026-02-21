---
title: "Zettlab D6 Ultra Setup Guide"
date: "2026-02-20"
category: "Technology"
description: "Complete walkthrough for setting up the Zettlab D6 Ultra NAS with RAID 6, 96GB RAM, and 80TB storage."
---

# Zettlab D6 Ultra Setup Guide

Your complete walkthrough for building an awesome NAS with 96GB RAM and 80TB storage.

---

## Your Build Summary

| Component | Specification |
|-----------|---------------|
| **NAS Device** | Zettlab D6 Ultra |
| **Processor** | Intel Core Ultra 5 125H (14 cores, 18 threads) |
| **RAM** | 96 GB DDR5 |
| **Hard Drives** | 6× Toshiba N300 Pro (starting with 4× 20TB) |
| **NVMe SSD** | Lexar NM990 2TB (to add later) |
| **RAID Level** | RAID 6 |
| **Usable Storage** | **72.7 TiB** (with 4× 20TB) |

> [!TIP]
> RAID 6 survives **2 drive failures** — critical protection with large 20TB drives that have long rebuild times (24-48 hours).

---

## Before You Start

### Hardware Checklist

- [ ] Zettlab D6 Ultra unit
- [ ] Power cable (included)
- [ ] Ethernet cable (Cat6 or better for 10GbE)
- [ ] 6× Hard drives (you have 4× 20TB Toshiba N300 Pro)
- [ ] 96GB RAM (2× 48GB DDR5 SO-DIMM)
- [ ] NVMe SSD (Lexar NM990 2TB - add later)
- [ ] Small Phillips screwdriver (for bottom panel)
- [ ] Anti-static wrist strap (recommended)

> [!WARNING]
> - **Handle drives carefully** — Hard drives are sensitive to shock
> - **Don't overtighten screws** — Especially the bottom panel (thermal pad pressure issue)
> - **Ground yourself** — Touch metal before handling RAM/SSD
> - **Install RAM before drives** — Easier access to bottom panel

---

## Zettlab D6 Ultra Quick Specs

| Spec | Details |
|------|---------|
| **CPU** | Intel Core Ultra 5 125H (14 cores, 18 threads) |
| **AI/NPU** | 34 TOPS (CPU + GPU + NPU combined) |
| **RAM Slots** | 2× DDR5 SO-DIMM (up to 96GB) |
| **NVMe Slots** | 2× M.2 2280 PCIe 4.0 x4 |
| **SATA Bays** | 6× 3.5" or 2.5" drives |
| **Network** | Dual 10GbE RJ45 |
| **Max Capacity** | 152 TB raw storage |

---

## Phase 1: Hardware Installation

### Step 1.1: Install RAM (96GB Upgrade)

The D6 Ultra comes with 32GB pre-installed. You're upgrading to 96GB:

1. Power off the NAS and unplug it
2. Flip the NAS upside down
3. Remove the **4 screws** on the bottom panel
4. Lift the panel carefully — **don't force it**
5. Locate the 2 DDR5 SO-DIMM slots
6. Remove existing RAM (push clips outward)
7. Install your new RAM (48GB × 2) at a 45° angle, then press down until clips lock

> [!WARNING]
> Zettlab includes thermal pads for NVMe drives, but they're **too thick**. If you install NVMe later, **don't overtighten the screws** — the pressure can damage the motherboard.

### Step 1.2: Install Hard Drives

1. Pull out each drive tray (labeled A-F)
2. Place a 20TB drive in each tray with the **connectors facing the rear**
3. For 3.5" drives: **No screws needed** — the trays have built-in retention
4. Slide each tray back in until it clicks
5. Start with bays A-D for your 4 drives (leaves E-F for future expansion)

> [!TIP]
> It doesn't matter which drive goes in which bay, but **label your drives** with their serial numbers. If one fails later, you'll know exactly which one to replace.

### Step 1.3: Connect Network & Power

1. Connect Ethernet to **LAN1** (10GbE port on back)
2. For maximum speed, connect both LAN1 and LAN2 to your switch/router
3. Connect the power cable
4. **Don't power on yet!** — Wait until you're ready for initial setup

### Port Reference

| Port | Type | Speed |
|------|------|-------|
| Power | DC input | 20V 12A |
| LAN 1 & 2 | RJ45 | 10GbE each |
| HDMI | Video out | 2.0b |
| USB4 × 2 | Type-C | 40Gbps each |
| USB 3.2 | Type-A | 10Gbps |
| SFF-8654 | PCIe expansion | PCIe 4.0 x8 |

---

## Phase 2: First Boot & Initial Setup

### Step 2.1: Power On

1. Press the **POWER button on the BACK** (not the front COPY button)
2. The LCD screen on the front will light up
3. Wait 2-3 minutes for ZettOS to boot
4. The screen will show the IP address when ready

> [!WARNING]
> **Front button = COPY** (one-click SD card backup)
> **Back button = POWER** (on/off/restart)
> Don't confuse them!

### Step 2.2: Access ZettOS Web Interface

1. On your computer, open a web browser
2. Go to the IP address shown on the LCD (e.g., `http://192.168.1.100`)
3. Or try: `http://zettlab.local` (if your network supports mDNS)
4. Create your admin account (username + strong password)
5. **Write this down!** You don't want to lose it

### Step 2.3: Run Initial Setup Wizard

ZettOS will guide you through:

- Time zone settings (America/Edmonton)
- Network configuration (DHCP or static IP)
- Firmware update check — **Do this first!**
- Drive detection (should see your 4× 20TB drives)

> [!TIP]
> For a NAS, set a **static IP address** so it's always at the same location. Reserve an IP in your router's DHCP settings, or configure a static IP in ZettOS Network settings.

---

## Phase 3: RAID 6 Configuration

### Your RAID 6 Math (4× 20TB Drives)

| Metric | Value |
|--------|-------|
| Raw capacity | 80 TB |
| Parity (2 drives) | 40 TB |
| **Usable space** | **72.7 TiB** |

### Step 3.1: Create Storage Pool

1. Go to **Storage Manager** in ZettOS
2. Click **Create Storage Pool**
3. Select drives A, B, C, D (your 4× 20TB)
4. Choose **RAID 6** as the RAID level
5. Select file system (Btrfs recommended for snapshots)
6. Name your pool (e.g., "MainStorage")

### Step 3.2: Initialize the RAID

1. Confirm your selection
2. ZettOS will initialize the RAID array
3. **This takes time!** — Expect 4-8 hours for 80TB
4. You can use the NAS during initialization (slower)
5. Check progress in Storage Manager

> [!WARNING]
> Don't panic if it says "Initializing" for hours. This is normal for large arrays. The NAS is still usable during this time, but performance will be reduced until it finishes.

### Step 3.3: Create Shared Folders

Once RAID is ready, create folders for your data:

| Folder | Purpose |
|--------|---------|
| `/Media` | Movies, TV shows, music |
| `/Photos` | Family photos |
| `/HomeVideos` | Personal videos |
| `/Backups` | Computer backups |
| `/Documents` | General files |
| `/Docker` | Container data (future) |
| `/Projects` | Web development |

> [!TIP]
> With 20TB drives, rebuild times are LONG (24-48 hours). RAID 6 survives **2 drive failures**, so you're protected even if a drive fails during a rebuild. RAID 5 only survives 1 failure — too risky for large drives!

---

## Phase 4: Network Configuration

### Step 4.1: Configure Network Settings

1. Go to **Control Panel → Network**
2. Set a **static IP** or reserve DHCP in your router
3. Example: `192.168.1.100`
4. Set DNS servers (use your router, or Google: 8.8.8.8, 8.8.4.4)
5. Enable **Link Aggregation** if your switch supports it (combines both 10GbE ports)

### Step 4.2: Enable Remote Access

1. Set up **ZettLab Cloud** or similar remote access
2. Configure port forwarding if needed (check router)
3. Enable **HTTPS** for secure access
4. Consider a VPN for remote access (more secure)

### Step 4.3: Connect from Your Computer (macOS)

1. Go → Connect to Server (`⌘K`)
2. Enter: `smb://192.168.1.100`
3. Enter your NAS credentials
4. Add to Login Items in System Settings for auto-mount

### 10GbE Speed Test

To verify your 10GbE connection is working:

1. Copy a large file (10GB+) to the NAS
2. Expected speed: **500-800 MB/s** (depends on drives)
3. If you only see ~100 MB/s, you're on 1GbE — check your cable/switch

---

## Phase 5: Apps & Services

### Step 5.1: Install Plex Media Server

1. Open **App Center** in ZettOS
2. Search for "Plex" and install
3. Set media folders to your `/Media` folder
4. Claim your server at `http://NAS-IP:32400/web`

> [!TIP]
> With 96GB RAM and Intel Core Ultra 5, your NAS can handle **multiple 4K transcodes** simultaneously. The Intel Arc GPU (7 Xe cores) has excellent hardware transcoding support!

### Step 5.2: Set Up Docker

1. Install **Docker** from App Center
2. Enable Docker service
3. Future containers to consider:
   - **Portainer** — Docker web UI
   - **Home Assistant** — Smart home
   - **Pi-hole** — Network-wide ad blocking
   - **Vaultwarden** — Self-hosted Bitwarden

### Step 5.3: Enable AI Features

Your D6 Ultra has 34 TOPS of AI power:

1. Enable **ZettAI** for smart photo search
2. Set up **AI Categories** for automatic file organization
3. Download the desktop companion app for full AI chat features
4. Future: Run local LLMs (Ollama, etc.) via Docker

### Step 5.4: Set Up Backups

1. **Local backup:** Connect external USB drive for periodic backups
2. **Cloud backup:** Set up Backblaze B2, Wasabi, or similar
3. **Snapshot schedule:** Enable hourly/daily snapshots for ransomware protection
4. **3-2-1 Rule:** 3 copies, 2 different media, 1 offsite

---

## Pro Tips & Best Practices

### Drive Health Monitoring

- Enable **SMART monitoring** in ZettOS
- Set up email alerts for drive warnings
- Check drive temps regularly (should be 35-45°C)
- Replace drives proactively at ~40,000 hours

### Power Management

- Enable drive spin-down after inactivity (saves power)
- Schedule tasks (backups, scrubs) during off-peak hours
- Connect to a UPS for graceful shutdown during power outages
- Idle power: ~18W | Full load: ~100W+ with all drives

### Security Best Practices

- Change default admin password immediately
- Enable 2FA if available
- Keep ZettOS updated
- Disable unused services
- Use strong, unique passwords

### Future Expansion Ideas

- **Add 2 more 20TB drives** → Expand to 120TB raw (109 TiB usable)
- **Add NVMe SSD** → Fast storage for Docker/VMs/LLM models
- **SFF-8654 port** → External GPU or 25GbE network card
- **Upgrade RAM to 96GB** → Already done! ✅

---

## Common Mistakes to Avoid

| Mistake | Why It's Bad |
|---------|--------------|
| No backup | RAID is not backup! Always have offsite copies |
| Ignoring SMART warnings | Replace failing drives immediately |
| Not testing backups | Verify you can restore before you need to |
| Public exposure | Don't put NAS directly on the internet |
| Skipping updates | Security patches matter! |

---

## Setup Timeline

| Phase | Time |
|-------|------|
| Hardware Installation | 15-30 minutes |
| First Boot | 5-10 minutes |
| RAID Setup | 30 min config + 4-8 hours init |
| Network Config | 10-15 minutes |
| Apps & Services | 30-60 minutes |

**Total active work:** 1.5-2.5 hours
**Background RAID init:** 4-8 hours (can use NAS during this)

---

## Future NVMe Upgrade

When you're ready to add the Lexar NM990 2TB:

1. Power off NAS and unplug
2. Remove bottom panel (4 screws)
3. Install NVMe in Slot 1 (don't overtighten!)
4. Close panel, power on
5. In ZettOS, create a new storage pool on the NVMe
6. Use for: Docker containers, Plex database, LLM models, VMs

### Recommended NVMe Layout (2TB)

| Use | Space |
|-----|-------|
| Plex database & metadata | ~50 GB |
| Docker containers | ~50 GB |
| LLM models | ~100-500 GB |
| Working files / temp | Remaining |

---

## Summary

You're building a powerful NAS with:

- **72.7 TiB usable storage** with RAID 6 protection
- **96GB RAM** for VMs, Docker, and LLM workloads
- **Intel Core Ultra 5** with 34 TOPS AI capability
- **10GbE networking** for fast transfers
- **Future expansion** via NVMe, more drives, or PCIe cards

Good luck with your build! 🎉

---

*Generated February 20, 2026*
