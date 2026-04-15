const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Auth
  onTokenCaptured: (callback) => ipcRenderer.on('auth-token-captured', (_event, value) => {
    if (value && value.auth) callback(value)
  }),

  // GQL Queries
  getCampaigns: (tokens) => ipcRenderer.invoke('fetch-campaigns', tokens),
  fetchCampaignDetails: (campaignId, tokens) => ipcRenderer.invoke('fetch-campaign-details', campaignId, tokens),
  findStreamer: (gameName, tokens) => ipcRenderer.invoke('find-streamer', gameName, tokens),
  getDropSession: (channelId, tokens, channelLogin) => ipcRenderer.invoke('get-drop-session', channelId, tokens, channelLogin),
  getInventory: (tokens) => ipcRenderer.invoke('get-inventory', tokens),
  getUserInfo: (tokens) => ipcRenderer.invoke('get-user-info', tokens),
  isStreamerOnline: (login, tokens) => ipcRenderer.invoke('get-stream-status', login, tokens),
  getMultiStreamStatus: (logins, tokens) => ipcRenderer.invoke('get-multi-stream-status', logins, tokens),
  claimDrop: (dropInstanceId, tokens) => ipcRenderer.invoke('claim-drop', dropInstanceId, tokens),

  // Farm control
  startFarm: (username) => ipcRenderer.send('start-farm', username),
  stopFarm: () => ipcRenderer.send('stop-farm'),
  claimViaWindow: () => ipcRenderer.send('claim-via-window'),
  updateTrayTooltip: (text) => ipcRenderer.send('update-tray-tooltip', text),
  minimizeToTray: () => ipcRenderer.send('minimize-to-tray'),
  openLoginWindow: () => ipcRenderer.send('open-login-window'),
  authSuccess: () => ipcRenderer.send('auth-success'),

  // WebSocket
  wsConnect: (userId, authToken) => ipcRenderer.invoke('ws-connect', userId, authToken),
  wsStatus: () => ipcRenderer.invoke('ws-status'),
  wsDisconnect: () => ipcRenderer.invoke('ws-disconnect'),
  onWsDropProgress: (callback) => ipcRenderer.on('ws-drop-progress', (_event, data) => callback(data)),
  onWsDropClaim: (callback) => ipcRenderer.on('ws-drop-claim', (_event, data) => callback(data)),
  onWsDropEvent: (callback) => ipcRenderer.on('ws-drop-event', (_event, data) => callback(data)),
  onWsDisconnected: (callback) => ipcRenderer.on('ws-disconnected', (_event, data) => callback(data)),
  onLogMsg: (callback) => ipcRenderer.on('log-msg', (_event, data) => callback(data))
})
