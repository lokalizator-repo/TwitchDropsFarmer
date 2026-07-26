# ⚡ Twitch Drops Farmer PRO `v1.3.0`

> **An automated, lightweight desktop application designed to farm and claim Twitch Drops 24/7 in the background with zero lag, low CPU/RAM usage, and zero-configuration setup.**

[![Version](https://img.shields.io/badge/version-1.3.0-purple.svg?style=for-the-badge)](package.json)
[![Download EXE](https://img.shields.io/badge/Download-.EXE-brightgreen.svg?style=for-the-badge&logo=windows)](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases/download/v1.3.0/TwitchDropsFarmer_v1.3.0.exe)
[![Electron](https://img.shields.io/badge/Electron-v32.0.0-47848F.svg?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge)](LICENSE)

---

## 📸 Interface Screenshots

<div align="center">
  <h3>⚡ Control Hub</h3>
  <p>Real-time status overview, priority switches, active farming stream details, timer progress, and live event console.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imghub.png" width="850" alt="Control Hub" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎯 Active Campaigns Browser</h3>
  <p>Explore all available live Twitch Drop campaigns, category priorities, and target campaign reward details.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgcampaigns.png" width="850" alt="Campaigns Browser" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎁 Inventory & Claim History</h3>
  <p>Track claimed items, drop progress percentages, and active campaign reward timelines.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imginventory.png" width="850" alt="Inventory Stats" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>⚙️ Preferences & System Settings</h3>
  <p>Configure PC auto-start, auto-farm mode on boot, game blacklists, notification sounds, and tray behavior.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgsettings.png" width="850" alt="Preferences & System" style="border-radius: 12px;" />
</div>

---

## 🔥 Key Features & Capabilities

- 🚀 **24/7 Background Auto-Farming**: Automatically finds live drop channels and farms rewards silently in the background without loading heavy browser video feeds or lagging your PC.
- 💻 **Windows Auto-Start & Auto-Farm**: Launch minimized to system tray on Windows boot and immediately start farming without touching a single button.
- ⚡ **Smart Priority Preemption**: Set game priority lists. As soon as a higher-priority game goes live, the farmer automatically switches target streams.
- ⏭️ **Instant Streamer Skip**: Skip offline, stuck, or unwanted streamers with a single click in the header without dropping the target category.
- 🛡️ **Self-Healing Integrity Token Engine**: Automatically fetches and refreshes Twitch `Client-Integrity` security tokens (~10s cycle), eliminating disconnects or red error screens.
- 🎁 **Automated Background Drop Claiming**: Auto-claims inventory rewards instantly upon reaching 100% completion via optimized background workers.
- 🎮 **Discord Rich Presence Integration**: Displays your active farmed game, channel name, and drop progress directly on your Discord profile.
- 🚫 **Selective Blacklists & Category Filters**: Block unwanted games or specific campaigns from being farmed.

---

## 🚀 Quick Start

### 📦 Standalone Portable Executable (Recommended)

1. Go to the **[Releases Page](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases/tag/v1.3.0)**.
2. Download **`TwitchDropsFarmer_v1.3.0.exe`**.
3. Run the executable — zero installation or setup required!

---

### 🛠️ Building & Running from Source

#### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

#### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/lokalizator-repo/TwitchDropsFarmer.git
   cd TwitchDropsFarmer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

---

## 🛠️ Build Executable

To compile a clean standalone Windows executable (`.exe`):

```bash
npm run dist
```

The output file will be generated in `dist/TwitchDropsFarmer_v1.3.0.exe`.

---

## ⚖️ Disclaimer & License

This project is created for educational and personal utility purposes. Automating Twitch drop claims may fall under Twitch Terms of Service regarding scripts. Use responsibly.

Distributed under the **ISC License**.
