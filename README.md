# ⚡ Twitch Drops Farmer PRO (v1.2)

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

## ✨ Features

- ⚡ **Auto-Farm Engine**: Watch live streams automatically. Set and prioritize your favorite games, or let Global Mode farm all available drops.
- 🎁 **Smart Auto-Claim**: Claims drops instantly when they hit 100% watcher progress, with smart retries to avoid unnecessary popup browser prompts.
- 🔌 **WebSocket Real-Time Sync**: Real-time progress percentage bar tracking for all campaigns and rewards via Twitch's PubSub WebSocket.
- 🎮 **Discord Rich Presence**: Share what game you are currently farming, your watcher progress, and current streamer directly on your Discord status.
- 📊 **Premium Inventory Stats**: View total drops claimed, games farmed, and total estimated time watched in a premium card header.
- 🚫 **Banned Games Skip List**: Skip specific campaigns or entire game categories automatically to save bandwidth and watch time.
- ⚙️ **Modern Sliding UI Switches**: Beautifully custom CSS switches for preference controls, threshold duration settings, and log view cleanup.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup & Launch

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/lokalizator-repo/TwitchDropsFarmer.git
   cd TwitchDropsFarmer
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Run the application locally in development mode:
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
