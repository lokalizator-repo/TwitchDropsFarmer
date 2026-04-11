const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onTokenCaptured: (callback) => ipcRenderer.on('auth-token-captured', (_event, value) => {
    if (value && value.auth) callback(value)
  }),
  getCampaigns: (tokens) => ipcRenderer.invoke('fetch-campaigns', tokens),
  fetchCampaignDetails: (campaignId, tokens) => ipcRenderer.invoke('fetch-campaign-details', campaignId, tokens),
  findStreamer: (gameName, tokens) => ipcRenderer.invoke('find-streamer', gameName, tokens),
  getDropSession: (channelId, tokens) => ipcRenderer.invoke('get-drop-session', channelId, tokens),
  getInventory: (tokens) => ipcRenderer.invoke('get-inventory', tokens),
  getUserInfo: (tokens) => ipcRenderer.invoke('get-user-info', tokens),
  isStreamerOnline: (login, tokens) => ipcRenderer.invoke('get-stream-status', login, tokens),
  getMultiStreamStatus: (logins, tokens) => ipcRenderer.invoke('get-multi-stream-status', logins, tokens),
  startFarm: (username) => ipcRenderer.send('start-farm', username),
  stopFarm: () => ipcRenderer.send('stop-farm'),
  openLoginWindow: () => ipcRenderer.send('open-login-window'),
  authSuccess: () => ipcRenderer.send('auth-success')
})
