# ⚡ Twitch Drops Farmer PRO (v1.2.1)

An elegant, premium Electron-based dashboard application designed to automatically farm and claim Twitch Drops in the background with zero-configuration and real-time status tracking.

---

## 📸 Screenshots

<div align="center">
  <h3>Control Hub</h3>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imghub.png" width="800" alt="Control Hub" style="border-radius: 12px; margin-bottom: 20px;" />

  <h3>Active Campaigns Browser</h3>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgcampaigns.png" width="800" alt="Campaigns Browser" style="border-radius: 12px; margin-bottom: 20px;" />

  <h3>My Inventory Stats</h3>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imginventory.png" width="800" alt="Inventory Stats" style="border-radius: 12px; margin-bottom: 20px;" />

  <h3>Preferences & System</h3>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgsettings.png" width="800" alt="Preferences" style="border-radius: 12px;" />
</div>

---

## ✨ Features & Advantages

- 🛡️ **Self-Healing Token Refresh**: Automatically resolves and updates Twitch `Client-Integrity` tokens in the background (~10 seconds). No more manual restarts or red-screen lockouts due to expired security tokens.
- ⚡ **Auto-Farm Engine & Preemption**: Set and order your favorite games. If a preferred game goes live while you are farming a lower-priority stream, the engine immediately switches back to the higher-priority game.
- 🎁 **Smart Auto-Claim**: Claims drops automatically under a resource-optimized hidden window, bypassing Chromium rendering optimizations that break other drop farmers.
- 🌐 **Multi-Language Claims Support**: Seamlessly claims rewards across multiple browser locales (English, Russian, German, French, Spanish, Portuguese, Polish, Italian, Turkish, Korean, Japanese, Chinese).
- 🔌 **WebSocket Real-Time Sync**: Subscribes directly to Twitch PubSub WebSockets for instant, real-time drop progress updates without spamming the GQL API.
- 🚫 **Banned Games & Campaigns Skip List**: Skip specific campaigns or entire game categories automatically to save bandwidth and focus on relevant loot.
- 🎮 **Discord Rich Presence**: Displays your active farming campaign, target streamer, and progress directly in your Discord profile.

---

## 🚀 Getting Started

### 📦 Option 1: Standalone Portable Exe (Recommended)

1. Go to the [Releases](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases) page.
2. Download the latest `TwitchDropsFarmerPRO-x.x.x-Setup.exe` or portable archive.
3. Run the executable and start farming instantly with zero configuration!

### 🛠️ Option 2: Running from Source (Development)

#### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

#### Setup & Launch

1. Clone this repository:
   ```bash
   git clone https://github.com/lokalizator-repo/TwitchDropsFarmer.git
   cd TwitchDropsFarmer
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

---

## 🛠️ Build & Package

To bundle the application into a standalone, portable Windows executable (`.exe`):

```bash
npm run dist
```
The output executable will be generated inside the `dist/` directory.

---

## ⚖️ License & Warning 

This project is created strictly as a hobbyist utility for educational purposes. Automating Twitch drops violates Twitch's Terms of Service. Use at your own risk.

Licensed under the [ISC License](LICENSE).
