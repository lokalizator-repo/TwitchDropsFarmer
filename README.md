# ⚡ Twitch Drops Farmer PRO `v1.3.0`

> **Автоматический фоновый фармер и клеймер Twitch Drops. Работает в фоновом режиме, не требует открытого браузера и потребляет минимум ресурсов.**

[![Версия](https://img.shields.io/badge/версия-1.3.0-purple.svg?style=for-the-badge)](package.json)
[![Релиз](https://img.shields.io/badge/Скачать-.EXE-brightgreen.svg?style=for-the-badge&logo=windows)](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases/download/v1.3.0/TwitchDropsFarmer_v1.3.0.exe)
[![Electron](https://img.shields.io/badge/Electron-v32.0.0-47848F.svg?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![Лицензия](https://img.shields.io/badge/лицензия-ISC-blue.svg?style=for-the-badge)](LICENSE)

---

## 📸 Скриншоты интерфейса

<div align="center">
  <h3>⚡ Главный хаб (Control Hub)</h3>
  <p>Реальный статус фарма, текущий стрим, таймер прогресса, переключатель приоритетов и консоль событий.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imghub.png" width="850" alt="Control Hub" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎯 Активные кампании (Campaigns)</h3>
  <p>Просмотр всех доступных Twitch Drops кампаний, списка игр и наград в реальном времени.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgcampaigns.png" width="850" alt="Campaigns" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>🎁 Инвентарь и забранные награды (Inventory)</h3>
  <p>Отслеживание полученных предметов, текущего прогресса и истории авто-клеймов.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imginventory.png" width="850" alt="Inventory" style="border-radius: 12px; margin-bottom: 24px;" />

  <h3>⚙️ Настройки и Автозапуск (Settings)</h3>
  <p>Гибкая настройка автозапуска с Windows, старта фарма при запуске ПК, черных списков и уведомлений.</p>
  <img src="https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/imgsettings.png" width="850" alt="Settings" style="border-radius: 12px; margin-bottom: 24px;" />
</div>

---

## 🔥 Реальные возможности и функции

- 🚀 **Авто-фарм Дропсов 24/7 без лагов**: Программа отслеживает нужные стримы и фармит Дропсы в фоновом режиме. Не нужно держать открытым браузер или грузить систему видеопотоками.
- 💻 **Автозапуск с Windows и старт фарма**: Можно настроить запуск программы в свернутом виде (в трей) при включении ПК и авто-старт фарма без единого клика.
- ⚡ **Умная система приоритетов игр**: Задайте порядок любимых игр. Как только стрим по приоритетной игре выходит в эфир — программа сразу переключается на неё.
- ⏭️ **Кнопка быстрой смены/пропуска стримера**: Если стример уйдет в офлайн или зависнет — нажмите одну кнопку в шапке программы, чтобы мгновенно переключиться на другого стримера.
- 🛡️ **Обход защиты Twitch (Обновление токенов Integrity)**: Автоматический фоновый рефреш токенов `Client-Integrity` (~10 секунд). Никаких вылетов, рассоединений и красных экранов ошибки.
- 🎁 **Авто-клейм наград**: Награды забираются автоматически сразу по достижении 100% через фоновый процесс.
- 🎮 **Интеграция с Discord (Discord Rich Presence)**: В вашем профиле Discord отображается текущая фармящаяся игра, канал стримера и процент прогресса.
- 🚫 **Черные списки игр и кампаний**: Исключайте ненужные игры или кампании, чтобы не тратить время на фарм ненужных предметов.

---

## 🚀 Быстрый запуск

### 📦 Самый простой способ (Готовый `.exe`)

1. Перейдите в раздел **[Releases](https://github.com/lokalizator-repo/TwitchDropsFarmer/releases/tag/v1.3.0)**.
2. Скачайте файл **`TwitchDropsFarmer_v1.3.0.exe`**.
3. Запустите `.exe` — программа готова к работе без установки!

---

### 🛠️ Запуск из исходного кода (Для разработчиков)

#### Требования:
- **Node.js** (версия 18 или выше)
- **npm**

#### Инструкция:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/lokalizator-repo/TwitchDropsFarmer.git
   cd TwitchDropsFarmer
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите программу:
   ```bash
   npm start
   ```

---

## 🛠️ Сборка собственного `.exe`

Чтобы скомпилировать портативный `.exe` файл самостоятельно:

```bash
npm run dist
```

Готовый файл появится в папке `dist/TwitchDropsFarmer_v1.3.0.exe`.

---

## ⚖️ Дисклеймер и Лицензия

Программа создана исключительно в ознакомительных и личных целях.

Распространяется под лицензией **ISC**.
