# ⚡ Twitch Drops Farmer PRO `v1.3.0`

> **An automated, high-performance desktop application designed to farm and claim Twitch Drops in the background with zero configuration, real-time WebSocket updates, and sleek glassmorphism UI.**

[![Version](https://img.shields.io/badge/version-1.3.0-purple.svg?style=for-the-badge)](package.json)
[![Electron](https://img.shields.io/badge/Electron-v32.0.0-47848F.svg?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20x64-0078D6.svg?style=for-the-badge&logo=windows)](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases)

---

## 📸 Interface Preview

<div align="center">
  <h3>⚡ Control Hub</h3>
  <p>Real-time status overview, priority switches, current farming stream details, and active progress.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imghub.png" width="850" alt="Control Hub" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎯 Active Campaigns Browser</h3>
  <p>Browse live Twitch Drop campaigns, category priorities, and target campaign details.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgcampaigns.png" width="850" alt="Campaigns Browser" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎁 Inventory & Claim Stats</h3>
  <p>Track claimed rewards, progress toward active drops, and drop campaign timelines.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imginventory.png" width="850" alt="Inventory Stats" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>⚙️ Preferences & System Settings</h3>
  <p>Configure PC auto-start, auto-farm launch, stream preemption, notification alerts, and skip lists.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgsettings.png" width="850" alt="Preferences & System" style="border-radius: 12px; margin-bottom: 24px;" />
</div>

---

## ✨ Features & Highlights

- 🛡️ **Self-Healing Integrity Token Manager**: Automatically fetches and refreshes Twitch `Client-Integrity` security tokens (~10s cycle). Eliminates auth lockouts and red-screen error states seamlessly.
- ⚡ **Smart Stream Preemption**: Define preferred game priority order. When a higher-priority stream goes live, the farmer instantly switches target streams to maximize desired rewards.
- 🎁 **Robust Background Auto-Claim**: Automated drop claim engine running under resource-optimized hidden execution windows, avoiding browser tab throttling or missing claim buttons.
- ⏭️ **Instant Streamer & Category Skip**: Skip offline, undesirable, or stuck streamers with a single click without skipping the entire game category.
- 💻 **PC Auto-Start & Auto-Farm Integration**: Seamlessly launch minimized on Windows system startup and optionally begin farming automatically.
- 📊 **Animated Drop Progress Bars**: Dynamic visual indicators with distinct visual shimmer states for active farming vs. completed drops.
- 🔌 **Direct WebSocket Integration**: Subscribes directly to Twitch PubSub WebSockets for real-time progress events with minimal GQL polling overhead.
- 🎮 **Discord Rich Presence**: Displays active farming status, target game category, and drop progress directly on your Discord profile.
- 🌐 **Multi-Language Support**: Complete claim compatibility across 12+ Twitch localized browser languages.

---

## 🚀 Quick Start

### 📦 Option 1: Standalone Portable Exe (Recommended)

1. Go to the [Releases](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases) section.
2. Download `TwitchDropsFarmer_v1.3.0.exe`.
3. Launch the `.exe` file. No installation or complex configuration required!

### 🛠️ Option 2: Run from Source

#### Requirements
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

#### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/lokalizator-repo/TwitchDropsFarmer.git
   cd TwitchDropsFarmer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the application:
   ```bash
   npm start
   ```

---

## 🛠️ Build Portable Executable

To compile a clean, standalone single-file Windows executable (`.exe`):

```bash
npm run dist
```

The output executable will be created in the `dist/` folder as `dist/TwitchDropsFarmer_v1.3.0.exe`.

---

## ⚖️ Disclaimer & License

This application is developed strictly for educational and personal utility purposes. Automating drop collection may fall under Twitch's Terms of Service guidelines regarding automated scripts. Use responsibly.

Distributed under the **ISC License**.
