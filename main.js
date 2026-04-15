const { app, BrowserWindow, session, ipcMain, Tray, Menu, nativeImage, shell } = require('electron')
const path = require('node:path')
const fs = require('fs')

ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});
const TwitchWebSocketManager = require('./websocket-manager')
const GraphQLManager = require('./gql-manager')

process.on('uncaughtException', (err) => {
  console.error('Core: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Core: Unhandled Rejection:', reason);
});

// Basic optimization flags
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-extensions');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=256');
app.commandLine.appendSwitch('disable-webgl');
app.commandLine.appendSwitch('disable-webgl2');
app.commandLine.appendSwitch('enable-unsafe-swiftshader');
app.commandLine.appendSwitch('log-level', '3'); // Show only fatal errors to keep console clean

// Managers
const gql = new GraphQLManager();
const wsManager = new TwitchWebSocketManager();

// Campaign Cache
let inventoryCache = { data: null, timestamp: 0, ttl: 20000 };

let mainWindow;
let tray = null;
let isQuitting = false;

/**
 * Build standard Twitch GQL headers including optional Integrity and Device-Id
 */
function buildHeaders(tokens) {
  const headers = {
    'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
    'Authorization': tokens.auth,
    'Content-Type': 'application/json'
  };
  if (tokens.integrity) headers['Client-Integrity'] = tokens.integrity;
  if (tokens.deviceId) {
    headers['Device-Id'] = tokens.deviceId;
    headers['X-Device-Id'] = tokens.deviceId;
  }
  return headers;
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets/icon.png');
  let icon;
  if (fs.existsSync(iconPath)) {
      icon = nativeImage.createFromPath(iconPath);
  } else {
      icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkoBAwUqifAWowf//+P8MIGEQUvH/fGEYDGBkhY0ZDYDBR8P99Y7CHAACOWSAFAgsPhQAAAABJRU5ErkJggg==');
  }
  
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => {
        isQuitting = true;
        app.quit();
    }}
  ]);
  
  tray.setToolTip('Twitch Drops Farmer');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

ipcMain.on('update-tray-tooltip', (event, text) => {
  if (tray) {
    tray.setToolTip(`Twitch Drops Farmer\n${text}`);
  }
});

ipcMain.on('minimize-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

// ============================================================
// Window
// ============================================================
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0e0e10',
      symbolColor: '#bf94ff',
      height: 40
    },
    backgroundColor: '#0e0e10',
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // Fallback if ready-to-show is delayed
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show()
      mainWindow.focus()
    }
  }, 2000)

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.loadFile('index.html')

  // Intercept Twitch GQL traffic for token capture
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['*://gql.twitch.tv/gql'] },
    (details, callback) => {
      let auth = details.requestHeaders['Authorization'] || details.requestHeaders['authorization'];
      let integrity = details.requestHeaders['Client-Integrity'] || details.requestHeaders['client-integrity'];
      let clientId = details.requestHeaders['Client-Id'] || details.requestHeaders['client-id'];
      let deviceId = details.requestHeaders['X-Device-Id'] || details.requestHeaders['Device-Id'] || details.requestHeaders['device-id'];

      if ((auth && auth.includes('OAuth')) || integrity) {
        if (mainWindow) {
          mainWindow.webContents.send('auth-token-captured', { auth, integrity, clientId, deviceId })
        }
      }
      callback({ requestHeaders: details.requestHeaders })
    }
  )
}

app.whenReady().then(() => {
  createWindow()
  createTray()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  wsManager.disconnect();
  if (process.platform !== 'darwin') app.quit()
})

/**
 * IPC Handlers for Twitch GraphQL operations
 */

ipcMain.handle('get-user-info', async (event, tokens) => {
  return await gql.execute('GetUserInfo', {}, buildHeaders(tokens));
});

ipcMain.handle('fetch-campaigns', async (event, tokens) => {
  const headers = buildHeaders(tokens);
  console.log('CAMPAIGN_REQ:', {
    hasAuth: !!headers.Authorization,
    hasIntegrity: !!headers['Client-Integrity'],
    integrityLen: (headers['Client-Integrity'] || '').length,
    hasDeviceId: !!headers['Device-Id']
  });

  const data = await gql.execute('ViewerDropsDashboard', {}, headers);

  if (data.error === 'HASH_EXPIRED') {
    // Fallback: use raw query if hash expired
    console.log('[GQL] Hash expired for ViewerDropsDashboard, using raw query fallback...');
    return await _fetchCampaignsFallback(headers);
  }

  try { require('fs').writeFileSync(path.join(__dirname, 'debug_campaigns.json'), JSON.stringify(data, null, 2)); } catch(e) {}
  return data;
});

// Fallback with raw query (in case persisted hash expires)
async function _fetchCampaignsFallback(headers) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        operationName: 'ViewerDropsDashboard',
        variables: {},
        query: `query ViewerDropsDashboard { currentUser { dropCurrentSession { dropID game { id displayName } currentMinutesWatched requiredMinutesWatched } dropCampaigns { id status detailsURL game { id displayName viewersCount boxArtURL } name startAt endAt timeBasedDrops { id requiredMinutesWatched requiredSubs name startAt endAt benefitEdges { benefit { id name imageAssetURL } } self { dropInstanceID currentMinutesWatched isClaimed hasPreconditionsMet } } } } }`
      })
    });
    clearTimeout(timer);
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

ipcMain.handle('fetch-campaign-details', async (event, campaignId, tokens) => {
  const userLogin = tokens.userLogin || 'twitch';
  return await gql.execute('DropCampaignDetails', {
    channelLogin: userLogin,
    campaignID: campaignId
  }, buildHeaders(tokens));
});

ipcMain.handle('find-streamer', async (event, gameName, tokens) => {
  // FindStreamer uses a raw query (no persisted hash available for this custom query)
  try {
    const headers = buildHeaders(tokens);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        query: `query { 
          game(name: "${gameName}") { 
            streams(first: 50) { 
              edges { 
                node { 
                  title
                  broadcaster { id login } 
                  freeformTags { name }
                } 
              } 
            } 
          } 
        }`
      })
    });
    clearTimeout(timer);
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle('get-drop-session', async (event, channelId, tokens, channelLogin = "") => {
  return await gql.execute('DropCurrentSessionContext', {
    channelLogin,
    channelID: channelId.toString()
  }, buildHeaders(tokens), { arrayWrap: true });
});

ipcMain.handle('get-inventory', async (event, tokens) => {
  const now = Date.now();
  if (inventoryCache.data && (now - inventoryCache.timestamp) < inventoryCache.ttl) {
    return inventoryCache.data;
  }

  const data = await gql.execute('Inventory', {}, buildHeaders(tokens));

  if (data.error === 'HASH_EXPIRED') {
    // Fallback with raw query
    return await _fetchInventoryFallback(buildHeaders(tokens));
  }

  if (!data.error) {
    inventoryCache = { data, timestamp: now, ttl: 20000 };
  }
  return data;
});

async function _fetchInventoryFallback(headers) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        variables: {},
        query: `query Inventory { currentUser { inventory { dropCampaignsInProgress { id status detailsURL game { id displayName viewersCount boxArtURL } name startAt endAt timeBasedDrops { id requiredMinutesWatched requiredSubs name startAt endAt benefitEdges { benefit { id name imageAssetURL } } self { dropInstanceID currentMinutesWatched isClaimed hasPreconditionsMet } } } gameEventDrops { id name lastAwardedAt } } } }`
      })
    });
    clearTimeout(timer);
    const data = await res.json();
    inventoryCache = { data, timestamp: Date.now(), ttl: 20000 };
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

ipcMain.handle('get-multi-stream-status', async (event, logins, tokens) => {
  const data = await gql.execute('MultiStreamStatus', { logins }, buildHeaders(tokens));
  return data?.data?.users?.filter(u => u?.stream) || [];
});

ipcMain.handle('get-stream-status', async (event, login, tokens) => {
  const data = await gql.execute('StreamStatus', { login }, buildHeaders(tokens));
  return !!data?.data?.user?.stream;
});

ipcMain.handle('claim-drop', async (event, dropInstanceId, tokens) => {
  return await gql.execute('ClaimDrop', { 
    input: { dropInstanceID: dropInstanceId } 
  }, buildHeaders(tokens));
});

/**
 * WebSocket communication handlers for real-time progress updates
 */

ipcMain.handle('ws-connect', async (event, userId, authToken) => {
  try {
    const status = wsManager.getStatus();
    if (status.connected && status.userId === userId && status.subscribed) {
      console.log(`[WS] Already connected and subscribed for userId ${userId}. Skipping redundant connect.`);
      return { success: true, alreadyConnected: true };
    }

    wsManager.removeAllListeners();

    wsManager.on('drop-progress', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('ws-drop-progress', data);
      }
    });
    wsManager.on('drop-claim', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('ws-drop-claim', data);
      }
    });
    wsManager.on('drop-event', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('ws-drop-event', data);
      }
    });
    wsManager.on('disconnected', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('ws-disconnected', data);
      }
    });

    wsManager.connect(userId, authToken);
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle('ws-status', async () => wsManager.getStatus());
ipcMain.handle('ws-disconnect', async () => { wsManager.disconnect(); return { success: true }; });

// ============================================================
// Farm Window
// ============================================================

let farmWin = null;
ipcMain.on('start-farm', (event, username) => {
  if (farmWin) farmWin.destroy();
  if (!username) return;

  farmWin = new BrowserWindow({
    width: 800, height: 600,
    show: false,
    webPreferences: { 
      backgroundThrottling: false
    }
  });

  farmWin.webContents.setAudioMuted(true);
  // Disabled setFrameRate(5) for better compatibility

  farmWin.loadURL(`https://www.twitch.tv/${username}`);

  farmWin.webContents.on('did-finish-load', () => {
    farmWin.webContents.executeJavaScript(`
       (function() {
         const style = document.createElement('style');
         style.innerHTML = \`
           .side-nav, .top-nav, .right-column, .chat-shell, 
           .channel-root__right-column, .video-chat { 
              display: none !important; 
           } 
           .video-player__container { width: 100vw !important; height: 100vh !important; }
         \`;
         document.head.appendChild(style);
         
         const removeList = ['.side-nav', '.chat-shell', '.top-nav'];
         removeList.forEach(sel => {
           const el = document.querySelector(sel);
           if (el) el.remove();
         });

         setInterval(() => {
             const stayActive = document.querySelector('button[aria-label="Yes, I am still watching"], .tw-button--success');
             if (stayActive) stayActive.click();
             const video = document.querySelector('video');
             if (video && video.paused) video.play().catch(() => {});
         }, 30000);
       })();
    `).catch(e => {});
    console.log('[Farm] Window active for: ' + username);
  });
});

ipcMain.on('stop-farm', () => {
  if (farmWin) { farmWin.destroy(); farmWin = null; }
});

let claimWin = null;
let isProcessingClaim = false;

ipcMain.on('claim-via-window', () => {
    if (claimWin || isProcessingClaim) return;
    isProcessingClaim = true;
    
    console.log("[ClaimBot] Opening hidden claim window...");
    claimWin = new BrowserWindow({
        width: 1000, height: 800,
        show: false, // Keep it hidden
        webPreferences: { backgroundThrottling: false }
    });
    
    // Mute it just in case
    claimWin.webContents.setAudioMuted(true);
    
    claimWin.loadURL('https://www.twitch.tv/drops/inventory');
    
    claimWin.webContents.on('did-finish-load', async () => {
        // Wait longer for Twitch's inventory to load (initial fetch + react render)
        if (mainWindow) mainWindow.webContents.send('log-msg', { msg: `[Window-Claim] Inventory page loaded. Waiting 10s for items to appear...`, type: 'info' });
        await new Promise(r => setTimeout(r, 10000));
        
        try {
            const results = await claimWin.webContents.executeJavaScript(`
                (() => {
                    const findAndClick = () => {
                        const selectors = [
                            'button', 
                            '[data-a-target="tw-core-button-label-text"]',
                            '.tw-core-button--primary'
                        ];
                        
                        let clickedCount = 0;
                        const seen = new Set();

                        selectors.forEach(sel => {
                            document.querySelectorAll(sel).forEach(el => {
                                const btn = el.tagName === 'BUTTON' ? el : el.closest('button');
                                if (!btn || seen.has(btn)) return;

                                const html = btn.innerHTML.toLowerCase();
                                const text = btn.innerText?.toLowerCase() || "";
                                
                                const isClaimButton = text.includes('получить сейчас') || 
                                                   text.includes('claim now') || 
                                                   text.includes('claim reward') ||
                                                   html.includes('tw-core-button-label-text');
                                
                                if (isClaimButton && btn.offsetParent !== null) {
                                    btn.click();
                                    clickedCount++;
                                    seen.add(btn);
                                }
                            });
                        });
                        return clickedCount;
                    };
                    return findAndClick();
                })();
            `);
            
            console.log(`[ClaimBot] Script executed. Buttons clicked: ${results}`);
            if (mainWindow) mainWindow.webContents.send('log-msg', { msg: `[Window-Claim] Search complete. Buttons clicked: ${results}`, type: results > 0 ? 'farm' : 'info' });
        } catch (e) {
            console.error("[ClaimBot] Script failed:", e);
            if (mainWindow) mainWindow.webContents.send('log-msg', { msg: `[Window-Claim] ${e.message}`, type: 'warn' });
        } finally {
            // Close after work
            setTimeout(() => {
                if (claimWin && !claimWin.isDestroyed()) {
                    claimWin.destroy();
                    claimWin = null;
                }
                isProcessingClaim = false;
                // Notify renderer to refresh inventory after window work
                if (mainWindow) mainWindow.webContents.send('log-msg', { msg: `[Window-Claim] Process finished. Refreshing inventory...`, type: 'system', refresh: true });
            }, 3000);
        }
    });
});

let loginWin;
ipcMain.on('open-login-window', (event, url) => {
  if (loginWin) return;
  loginWin = new BrowserWindow({
    width: 600, height: 800,
    parent: mainWindow, modal: true,
    autoHideMenuBar: true, backgroundColor: '#0e0e10'
  })
  loginWin.loadURL(url || 'https://www.twitch.tv/login')
  loginWin.on('closed', () => { loginWin = null; })
  ipcMain.once('auth-success', () => {
    if (loginWin && !loginWin.isDestroyed()) loginWin.close()
  })
})
