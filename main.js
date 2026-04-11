const { app, BrowserWindow, session, ipcMain } = require('electron')
const path = require('node:path')

// Campaign Cache (Alorf-style optimization)
let inventoryCache = { data: null, timestamp: 0, ttl: 20000 }; 

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0e0e10',
      symbolColor: '#bf94ff',
      height: 40
    },
    backgroundColor: '#0e0e10',
    show: false // gracefully show when ready
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.loadFile('index.html')

  // Listen to twitch gql traffic to grab tokens seamlessly
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['*://gql.twitch.tv/gql'] },
    (details, callback) => {
      let auth = details.requestHeaders['Authorization'] || details.requestHeaders['authorization'];
      let integrity = details.requestHeaders['Client-Integrity'] || details.requestHeaders['client-integrity'];
      let clientId = details.requestHeaders['Client-Id'] || details.requestHeaders['client-id'];
      let deviceId = details.requestHeaders['X-Device-Id'] || details.requestHeaders['Device-Id'] || details.requestHeaders['device-id'];

      // Send intercepted tokens to the main interface UI
      if ((auth && auth.includes('OAuth')) || integrity) {
        if (mainWindow) {
          mainWindow.webContents.send('auth-token-captured', {
            auth,
            integrity,
            clientId,
            deviceId
          })
        }
      }
      callback({ requestHeaders: details.requestHeaders })
    }
  )
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('get-user-info', async (event, tokens) => {
  try {
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { currentUser { id login displayName profileImageURL(width: 70) } }`
      })
    });
    return await res.json();
  } catch(e) {
    return { error: e.message };
  }
});

ipcMain.handle('fetch-campaigns', async (event, tokens) => {
  try {
    const headers = {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Client-Integrity': tokens.integrity || '',
        'Content-Type': 'application/json'
    };
    if (tokens.deviceId) {
        headers['Device-Id'] = tokens.deviceId;
        headers['X-Device-Id'] = tokens.deviceId;
    }

    console.log('CAMPAIGN_REQ:', { hasAuth: !!headers.Authorization, hasIntegrity: !!headers['Client-Integrity'], integrityLen: (headers['Client-Integrity'] || '').length, hasDeviceId: !!headers['Device-Id'] });
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        operationName: 'ViewerDropsDashboard',
        variables: {},
        query: `query ViewerDropsDashboard { currentUser { dropCurrentSession { dropID game { id displayName } currentMinutesWatched requiredMinutesWatched } dropCampaigns { id status detailsURL game { id displayName viewersCount boxArtURL } name startAt endAt timeBasedDrops { id requiredMinutesWatched requiredSubs name benefitEdges { benefit { id name imageAssetURL } } self { dropInstanceID currentMinutesWatched isClaimed hasPreconditionsMet } } } } }`
      })
    });
    const data = await res.json();
    
    // If we have an integrity error, log it specifically
    if (data.errors && data.errors.some(e => e.message?.includes('integrity'))) {
        console.error('CAMPAIGN_REQ: Failed integrity check. Need to refresh safety token.');
        return { error: 'INTEGRITY_REQUIRED', details: data.errors };
    }

    try { require('fs').writeFileSync(require('path').join(__dirname, 'debug_campaigns.json'), JSON.stringify(data, null, 2)); } catch(e) {}
    return data;
  } catch (error) {
    console.error('CAMPAIGN_REQ Error:', error.message);
    return { error: error.message };
  }
});

ipcMain.handle('fetch-campaign-details', async (event, campaignId, tokens) => {
  try {
    const userLogin = tokens.userLogin || 'twitch'; 
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Client-Integrity': tokens.integrity || '',
        'X-Device-Id': tokens.deviceId || '',
        'Device-Id': tokens.deviceId || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operationName: 'DropCampaignDetails',
        variables: { channelLogin: userLogin, campaignID: campaignId },
        query: `query DropCampaignDetails($channelLogin: String, $campaignID: ID) { user(login: $channelLogin) { dropCampaign(id: $campaignID) { id name allow { isEnabled channels { id login displayName } } } } }`
      })
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle('find-streamer', async (event, gameName, tokens) => {
  try {
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Client-Integrity': tokens.integrity || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { 
          game(name: "${gameName}") { 
            streams(first: 20, options: {freeformTags: ["DropsEnabled"]}) { 
              edges { 
                node { 
                  broadcaster { id login } 
                  freeformTags { name }
                } 
              } 
            } 
          } 
        }`
      })
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle('get-drop-session', async (event, channelId, tokens, channelLogin = "") => {
  try {
    const headers = {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Client-Integrity': tokens.integrity || '',
        'Content-Type': 'application/json'
    };
    if (tokens.deviceId) {
        headers['Device-Id'] = tokens.deviceId;
        headers['X-Device-Id'] = tokens.deviceId;
    }

    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify([
        {
          "operationName": "DropCurrentSessionContext",
          "variables": {
            "channelLogin": channelLogin,
            "channelID": channelId.toString()
          },
          "query": `query DropCurrentSessionContext($channelLogin: String, $channelID: ID) {
            currentUser {
              dropCurrentSession(channelLogin: $channelLogin, channelID: $channelID) {
                dropID
                currentMinutesWatched
                requiredMinutesWatched
                status
                game {
                  id
                  displayName
                }
              }
            }
          }`
        }
      ])
    });
    const text = await res.text();
    console.log('DROP_SESSION_RAW:', text.substring(0, 500));
    return JSON.parse(text);
  } catch(e) {
    return { error: e.message };
  }
});

ipcMain.handle('get-inventory', async (event, tokens) => {
  const now = Date.now();
  if (inventoryCache.data && (now - inventoryCache.timestamp) < inventoryCache.ttl) {
    return inventoryCache.data;
  }

  try {
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        'Client-Id': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Authorization': tokens.auth,
        'Client-Integrity': tokens.integrity || '',
        'X-Device-Id': tokens.deviceId || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        variables: {},
        query: `query Inventory { currentUser { inventory { dropCampaignsInProgress { id status detailsURL game { id displayName viewersCount boxArtURL } name startAt endAt timeBasedDrops { id requiredMinutesWatched requiredSubs name benefitEdges { benefit { id name imageAssetURL } } self { dropInstanceID currentMinutesWatched isClaimed hasPreconditionsMet } } } gameEventDrops { id name lastAwardedAt } } } }`
      })
    });
    const invData = await res.json();
    inventoryCache = { data: invData, timestamp: now, ttl: 20000 };
    return invData;
  } catch(e) {
    return { error: e.message };
  }
});

ipcMain.handle('get-multi-stream-status', async (event, logins, tokens) => {
  try {
    const headers = {
      'Client-ID': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'Authorization': tokens.auth,
      'Content-Type': 'application/json'
    };
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: `query($logins: [String!]) { users(logins: $logins) { id login stream { id } } }`,
        variables: { logins: logins }
      })
    });
    const data = await res.json();
    return data?.data?.users?.filter(u => u?.stream) || [];
  } catch (e) {
    return [];
  }
});

ipcMain.handle('get-stream-status', async (event, login, tokens) => {
  try {
    const headers = {
      'Client-ID': tokens.clientId || 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'Authorization': tokens.auth,
      'Content-Type': 'application/json'
    };
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: `query($login: String!) { user(login: $login) { stream { id } } }`,
        variables: { login: login }
      })
    });
    const data = await res.json();
    return !!data?.data?.user?.stream;
  } catch (e) {
    return false;
  }
});

let farmWin = null;
ipcMain.on('start-farm', (event, username) => {
  if (farmWin) {
    farmWin.destroy();
  }
  if (!username) return;

  farmWin = new BrowserWindow({
    width: 600, height: 400,
    show: false, // HIDDEN!
    webPreferences: {
      backgroundThrottling: false, // Keep it running in bg
    }
  });

  // Mute it so user doesn't hear the stream
  farmWin.webContents.setAudioMuted(true);
  
  // Load full site to ensure integrity scripts run, but with popout-like appearance
  farmWin.loadURL(`https://www.twitch.tv/${username}`);
  
  farmWin.webContents.on('did-finish-load', () => {
    // Inject JS to:
    // 1. Hide everything except player
    // 2. Mute player (redundant but safe)
    // 3. Set low quality
    // 4. Stay active
    farmWin.webContents.executeJavaScript(`
       const style = document.createElement('style');
       style.innerHTML = '.side-nav, .top-nav, .right-column, .chat-shell { display: none !important; } .video-player__container { width: 100vw !important; height: 100vh !important; }';
       document.head.appendChild(style);
       
       setInterval(() => {
           // Click "Stay Active" prompts if they appear
           const stayActive = document.querySelector('button[aria-label="Yes, I am still watching"], .tw-button--success');
           if (stayActive) stayActive.click();
           
           // Ensure it's playing
           const video = document.querySelector('video');
           if (video && video.paused) video.play().catch(() => {});
       }, 30000);
    `).catch(e => {});
    console.log(`Started farming on full page: ${username}`);
  });
});

ipcMain.on('stop-farm', () => {
  if (farmWin) {
    farmWin.destroy();
    farmWin = null;
  }
});

let loginWin;
ipcMain.on('open-login-window', (event, url) => {
  if (loginWin) return;
  loginWin = new BrowserWindow({
    width: 600,
    height: 800,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    backgroundColor: '#0e0e10'
  })
  loginWin.loadURL(url || 'https://www.twitch.tv/login')
  
  loginWin.on('closed', () => {
    loginWin = null;
  })

  ipcMain.once('auth-success', () => {
    if (loginWin && !loginWin.isDestroyed()) {
      loginWin.close()
    }
  })
})
