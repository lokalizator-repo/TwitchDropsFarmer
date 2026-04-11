const getEl = (id) => document.getElementById(id);

const loginBtn = getEl('loginBtn');
const authStatusText = getEl('authStatusText');
const authStatusIndicator = document.querySelector('#authStatusIndicator .status-indicator');
const authSection = getEl('authSection');

// Navigation
const btnNavDashboard = getEl('btnNavDashboard');
const btnNavCampaigns = getEl('btnNavCampaigns');
const btnNavSettings = getEl('btnNavSettings');
const btnNavLogs = getEl('btnNavLogs');

const viewDashboard = getEl('viewDashboard');
const viewCampaigns = getEl('viewCampaigns');
const viewSettings = getEl('viewSettings');
const viewLogs = getEl('logsView');

function addLog(msg, type = 'info') {
    const consoleEl = getEl('logConsole');
    const time = new Date().toLocaleTimeString();
    let color = '#d1d1d1';
    let prefix = '[INFO]';
    
    if (type === 'system') { color = '#bf94ff'; prefix = '[SYSTEM]'; }
    if (type === 'farm') { color = '#00e676'; prefix = '[FARM]'; }
    if (type === 'warn') { color = '#ffb300'; prefix = '[WARN]'; }
    if (type === 'error') { color = '#ff4f4f'; prefix = '[ERROR]'; }
    
    console.log(`${prefix} ${msg}`); // Always log to real console
    
    if (!consoleEl) return;
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.style.marginBottom = '4px';
    entry.innerHTML = `<span style="color: #666; font-size: 11px;">${time}</span> <span style="font-weight: 700;">${prefix}</span> ${msg}`;
    
    consoleEl.appendChild(entry);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

addLog('Application renderer starting...', 'system');

function switchView(viewName) {
  try {
    if (viewDashboard) viewDashboard.style.display = 'none';
    if (viewCampaigns) viewCampaigns.style.display = 'none';
    if (viewSettings) viewSettings.style.display = 'none';
    if (viewLogs) viewLogs.style.display = 'none';
    
    if (btnNavDashboard) btnNavDashboard.classList.remove('active');
    if (btnNavCampaigns) btnNavCampaigns.classList.remove('active');
    if (btnNavSettings) btnNavSettings.classList.remove('active');
    if (btnNavLogs) btnNavLogs.classList.remove('active');
    
    if(viewName === 'dashboard' && viewDashboard) { viewDashboard.style.display = 'block'; btnNavDashboard.classList.add('active'); }
    if(viewName === 'campaigns' && viewCampaigns) { viewCampaigns.style.display = 'block'; btnNavCampaigns.classList.add('active'); }
    if(viewName === 'settings' && viewSettings) { viewSettings.style.display = 'block'; btnNavSettings.classList.add('active'); }
    if(viewName === 'logs' && viewLogs) { viewLogs.style.display = 'block'; btnNavLogs.classList.add('active'); }
  } catch (e) {
    console.error("View switch error:", e);
  }
}

if (btnNavDashboard) btnNavDashboard.onclick = () => switchView('dashboard');
if (btnNavCampaigns) btnNavCampaigns.onclick = () => switchView('campaigns');
if (btnNavSettings) btnNavSettings.onclick = () => switchView('settings');
if (btnNavLogs) btnNavLogs.onclick = () => switchView('logs');

let accountTokens = JSON.parse(localStorage.getItem('accountTokens') || 'null');
let allCampaigns = [];
let filteredCampaigns = [];
let autoClaimEnabled = true;
let currentGlobalDropSession = null;
let currentFarmingChannelId = null;
let masterAutoFarmEnabled = false;
let tokenProcessingStarted = false;
let manualOverrideId = null;
let farmAllMode = false; // New mode to farm EVERYTHING active

// Global helper for consistent image URLs
function fixTwitchUrl(url, w, h) {
    if (!url) return '';
    let res = url.replace('{width}', w).replace('{height}', h);
    if (res.startsWith('//')) res = 'https:' + res;
    return res;
}

function getGameImageUrl(game, w, h) {
    if (!game) return ''; 
    if (game.boxArtURL) return fixTwitchUrl(game.boxArtURL, w, h);
    if (game.id) return `https://static-cdn.jtvnw.net/ttv-boxart/${game.id}-${w}x${h}.jpg`;
    return '';
}

// Auto-run if tokens exist
if (accountTokens && accountTokens.auth) {
    setTimeout(() => {
        processTokens(accountTokens, true);
    }, 500);
}

const btnToggleClaim = document.getElementById('btnToggleClaim');
if (btnToggleClaim) {
  btnToggleClaim.addEventListener('click', () => {
    autoClaimEnabled = !autoClaimEnabled;
    if (autoClaimEnabled) {
      btnToggleClaim.innerText = 'Toggle (Enabled)';
      btnToggleClaim.className = 'btn-primary';
      btnToggleClaim.style.background = 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))';
      btnToggleClaim.style.borderColor = 'transparent';
      btnToggleClaim.style.color = 'white';
    } else {
      btnToggleClaim.innerText = 'Toggle (Disabled)';
      btnToggleClaim.className = 'btn-outline';
      btnToggleClaim.style.background = 'transparent';
    }
  });
}

const autoFarmSearch = document.getElementById('autoFarmSearch');
const selectedGamesChips = document.getElementById('selectedGamesChips');
const priorityGameGrid = document.getElementById('priorityGameGrid');
const btnAddCustomGame = document.getElementById('btnAddCustomGame');

let selectedPriorityGames = (localStorage.getItem('autoFarmGames') || '').split(',').map(s=>s.trim()).filter(Boolean);

function savePriorityGames() {
    localStorage.setItem('autoFarmGames', selectedPriorityGames.join(', '));
}

function addCustomGame() {
    if (!autoFarmSearch) return;
    const val = autoFarmSearch.value.trim();
    if (!val) return;
    if (!selectedPriorityGames.some(g => g.toLowerCase() === val.toLowerCase())) {
        selectedPriorityGames.push(val);
        savePriorityGames();
        renderPriorityChips();
        autoFarmSearch.value = '';
        renderPriorityGrid();
    }
}

function renderPriorityChips() {
    if (!selectedGamesChips) return;
    if (selectedPriorityGames.length === 0) {
        selectedGamesChips.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px; font-style: italic; align-self: center;">No games selected yet. Pick from the grid or add manually.</span>';
        return;
    }
    selectedGamesChips.innerHTML = selectedPriorityGames.map((game, index) => {
       const camp = allCampaigns.find(c => c.game?.displayName?.toLowerCase() === game.toLowerCase());
       const miniImg = getGameImageUrl(camp?.game, 36, 48);
       const imgTag = miniImg ? `<img src="${miniImg}" style="width:18px; height:24px; border-radius:3px; object-fit:cover;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-36x48.jpg'">` : '🎮';
       return `
        <div style="background: rgba(191,148,255,0.12); border: 1px solid var(--accent-color); color: white; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
            <div style="display:flex; flex-direction: column; gap: 2px; line-height: 1;">
                <span onclick="movePriorityGame(${index}, -1)" style="cursor:pointer; opacity: 0.6; font-size: 10px; padding: 2px;">▲</span>
                <span onclick="movePriorityGame(${index}, 1)" style="cursor:pointer; opacity: 0.6; font-size: 10px; padding: 2px;">▼</span>
            </div>
            ${imgTag}
            <span>${game}</span>
            <span style="cursor: pointer; font-size: 18px; font-weight: bold; color: var(--danger); margin-left: 4px;" onclick="removePriorityGame('${encodeURIComponent(game)}')">×</span>
        </div>`;
    }).join('');
}

window.movePriorityGame = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= selectedPriorityGames.length) return;
    const temp = selectedPriorityGames[index];
    selectedPriorityGames[index] = selectedPriorityGames[newIdx];
    selectedPriorityGames[newIdx] = temp;
    savePriorityGames();
    renderPriorityChips();
    addLog(`Moved ${temp} ${direction === -1 ? 'UP' : 'DOWN'} in priority`, 'system');
};

window.removePriorityGame = (encodedGame) => {
    const game = decodeURIComponent(encodedGame);
    selectedPriorityGames = selectedPriorityGames.filter(g => g.toLowerCase() !== game.toLowerCase());
    savePriorityGames();
    renderPriorityChips();
    renderPriorityGrid();
    addLog(`Removed ${game} from priority`, 'warn');
};

function renderPriorityGrid(searchTerm = '') {
    if (!priorityGameGrid) return;

    const uniqueGames = [];
    const seen = new Set();
    for (const c of allCampaigns) {
       // Only show REAL watchable games in the quick-add list
       if (c.game && c.game.displayName && !seen.has(c.game.id) && isWatchableCampaign(c)) {
           seen.add(c.game.id);
           uniqueGames.push(c.game);
       }
    }

    if (uniqueGames.length === 0) {
        priorityGameGrid.innerHTML = '<p style="color: var(--text-secondary); font-size: 13px; grid-column: 1/-1;">No active campaigns loaded yet. You can still add games manually above.</p>';
        return;
    }
    
    const filtered = searchTerm
        ? uniqueGames.filter(g => g.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
        : uniqueGames;
    
    if (filtered.length === 0) {
        priorityGameGrid.innerHTML = '<p style="color: var(--text-secondary); font-size: 13px; grid-column: 1/-1;">No campaigns match your search. Click <strong>+ Add Game</strong> to add it manually.</p>';
        return;
    }
    
     priorityGameGrid.innerHTML = filtered.map(game => {
        const isSelected = selectedPriorityGames.some(g => g.toLowerCase() === game.displayName.toLowerCase());
        const imgUrl = getGameImageUrl(game, 144, 192);
        
        return `
        <div onclick="togglePriorityGame('${encodeURIComponent(game.displayName)}')" style="
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 180px;
            background: ${isSelected ? 'rgba(191, 148, 255, 0.08)' : 'var(--bg-tertiary)'};
            border: 2px solid ${isSelected ? 'var(--accent-color)' : 'transparent'};
            border-radius: 10px;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.15s ease;
        ">
            <img src="${imgUrl}" style="width:100%; aspect-ratio: 144 / 192; object-fit: cover; display:block; flex-shrink: 0;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg'" />
           <div style="padding: 8px 10px; flex-shrink: 0; background: ${isSelected ? 'rgba(191, 148, 255, 0.08)' : 'var(--bg-tertiary)'};">
               <p style="font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">${game.displayName}</p>
           </div>
           ${isSelected ? '<div style="position: absolute; top: 6px; right: 6px; background: var(--accent-color); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">✓</div>' : ''}
       </div>
       `;
    }).join('');
}

window.togglePriorityGame = (encodedGame) => {
    const game = decodeURIComponent(encodedGame);
    const lower = game.toLowerCase();
    if (selectedPriorityGames.some(g => g.toLowerCase() === lower)) {
        selectedPriorityGames = selectedPriorityGames.filter(g => g.toLowerCase() !== lower);
    } else {
        selectedPriorityGames.push(game);
    }
    savePriorityGames();
    renderPriorityChips();
    renderPriorityGrid(autoFarmSearch ? autoFarmSearch.value : '');
};

if (autoFarmSearch) {
    autoFarmSearch.addEventListener('input', (e) => {
        renderPriorityGrid(e.target.value);
    });
    autoFarmSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addCustomGame();
        }
    });
}

if (btnAddCustomGame) {
    btnAddCustomGame.addEventListener('click', addCustomGame);
}

// Initial render for chips
if (selectedGamesChips) {
    renderPriorityChips();
}


if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    loginBtn.innerText = "Waiting for login...";
    window.electronAPI.openLoginWindow();
  });
}


let farmingInterval = null;
let currentFarmCampaignId = null;
let progressionTracker = {}; // { campaignId: { mins, time } }
let campaignBlacklist = {}; // { campaignId: expiryTime }

function updateMasterAutoFarmUI() {
    const status = document.getElementById('masterToggleStatus');
    const btnPriority = document.getElementById('btnTogglePriority');
    const btnGlobal = document.getElementById('btnToggleGlobal');
    const btnStop = document.getElementById('btnStopMaster');
    const btnFarmAll = document.getElementById('btnFarmAll');

    // Reset classes
    if (btnPriority) btnPriority.classList.remove('active-priority');
    if (btnGlobal) btnGlobal.classList.remove('active-global');
    if (btnStop) btnStop.style.display = 'none';

    if (masterAutoFarmEnabled) {
        if (btnStop) btnStop.style.display = 'block';
        if (farmAllMode) {
            if (status) status.innerHTML = '<span style="color: var(--warning);">GLOBAL MODE</span>';
            if (btnGlobal) btnGlobal.classList.add('active-global');
            if (btnFarmAll) {
                btnFarmAll.innerText = '⏹ Stop Global Farm';
                btnFarmAll.style.background = 'var(--danger)';
            }
        } else {
            if (status) status.innerHTML = '<span style="color: var(--success);">PRIORITY MODE</span>';
            if (btnPriority) btnPriority.classList.add('active-priority');
            if (btnFarmAll) {
                btnFarmAll.innerText = '⚡ Start Global Auto-Farm';
                btnFarmAll.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
            }
        }
    } else {
        if (status) status.innerText = 'Idle';
        if (btnFarmAll) {
            btnFarmAll.innerText = '⚡ Start Global Auto-Farm';
            btnFarmAll.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
        }
    }
}

// Logic for the new Control Center
const btnTogglePriority = document.getElementById('btnTogglePriority');
const btnToggleGlobal = document.getElementById('btnToggleGlobal');
const btnStopMaster = document.getElementById('btnStopMaster');

if (btnTogglePriority) {
    btnTogglePriority.onclick = () => {
        if (masterAutoFarmEnabled && !farmAllMode) return; // Already in this mode
        masterAutoFarmEnabled = true;
        farmAllMode = false;
        addLog('Switched to PRIORITY auto-farm.', 'system');
        fetchAndUpdateCampaigns();
        updateMasterAutoFarmUI();
    };
}

if (btnToggleGlobal) {
    btnToggleGlobal.onclick = () => {
        if (masterAutoFarmEnabled && farmAllMode) return; // Already in this mode
        masterAutoFarmEnabled = true;
        farmAllMode = true;
        addLog('Switched to GLOBAL auto-farm.', 'system');
        fetchAndUpdateCampaigns();
        updateMasterAutoFarmUI();
    };
}

if (btnStopMaster) {
    btnStopMaster.onclick = () => {
        masterAutoFarmEnabled = false;
        window.electronAPI.stopFarm();
        currentFarmCampaignId = null;
        currentFarmingChannelId = null;
        addLog('Auto-Farm STOPPED.', 'system');
        updateMasterAutoFarmUI();
    };
}

function isCampaignFinished(c) {
    if (!c || !c.timeBasedDrops || c.timeBasedDrops.length === 0) return true;
    return c.timeBasedDrops.every(d => d.self?.isClaimed === true || (d.self?.currentMinutesWatched || 0) >= d.requiredMinutesWatched);
}

function isWatchableCampaign(c) {
   if (!c || !c.timeBasedDrops || c.timeBasedDrops.length === 0) return false;
   
   // No Just Chatting (badges)
   const gameName = (c.game?.displayName || '').toLowerCase();
   if (gameName === 'just chatting' || gameName === 'общение') return false;

   // No Sub-only drops
   const hasSubRequirement = c.timeBasedDrops.some(d => (d.requiredSubs || 0) > 0);
   if (hasSubRequirement) return false;

   return true;
}

function cycleCampaign(direction) {
    if (!allCampaigns.length) return;
    
    let eligible = [];
    
    if (farmAllMode) {
        // In Farm All mode, we cycle through EVERY watchable active campaign
        eligible = allCampaigns.filter(c => 
            c.status === 'ACTIVE' && 
            isWatchableCampaign(c) &&
            !isCampaignFinished(c)
        );
    } else {
        // In Selective mode, we only cycle through the saved priority list
        const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
        if (savedList.length === 0) {
            addLog("No priority games found in settings.", "warn");
            return;
        }

        for (const name of savedList) {
            const activeUnfinished = allCampaigns.filter(c => 
                c.game?.displayName?.toLowerCase() === name && 
                c.status === 'ACTIVE' && 
                isWatchableCampaign(c) &&
                !isCampaignFinished(c)
            );
            eligible.push(...activeUnfinished);
        }
    }
    
    if (eligible.length === 0) {
        addLog("No unfinished campaigns found to cycle to.", "warn");
        return;
    }
    
    let currentIndex = eligible.findIndex(c => c.id === currentFarmCampaignId);
    let nextIndex;
    if (currentIndex === -1) {
        nextIndex = 0;
    } else {
        nextIndex = (currentIndex + direction + eligible.length) % eligible.length;
    }
    
    const target = eligible[nextIndex];
    addLog(`Manual Cycle: Switching to ${target.game?.displayName}...`, 'system');
    
    // 1. HARD STOP previous session
    window.electronAPI.stopFarm();
    currentFarmingChannelId = null;
    currentFarmCampaignId = target.id;
    manualOverrideId = target.id;
    
    // 2. Clear panels UI immediately to prevent flickering
    const farmStatus = document.getElementById('farmStatus');
    if (farmStatus) farmStatus.innerText = 'Switching...';
    
    // 3. Start new one
    startFarmingSimulation(target, true);
}

async function runMasterFarmLoop() {
    if (!masterAutoFarmEnabled) return;
    
    const now = Date.now();
    const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s=>s.trim().toLowerCase());
    
    // 1. Monitor progression of CURRENTLY farming campaign
    if (currentFarmCampaignId && currentGlobalDropSession) {
        const stats = progressionTracker[currentFarmCampaignId] || { mins: -1, time: now };
        const currentMins = currentGlobalDropSession.currentMinutesWatched || 0;
        
        if (currentMins > stats.mins) {
            // Progress! Reset tracker
            progressionTracker[currentFarmCampaignId] = { mins: currentMins, time: now };
            addLog(`Progression: ${currentMins}m / ${currentGlobalDropSession.requiredMinutesWatched}m`, 'farm');
        } else if (now - stats.time > 2 * 60 * 1000) { 
            // 2 minutes stuck - try RECOVERING (maybe streamer went offline)
            addLog(`Progress stalled on ${currentFarmCampaignId}. Attempting to find another streamer...`, 'warn');
            
            const currentCamp = allCampaigns.find(c => c.id === currentFarmCampaignId);
            if (currentCamp) {
                const res = await window.electronAPI.findStreamer(currentCamp.game?.displayName || '', accountTokens);
                const streams = res?.data?.game?.streams?.edges || [];
                const newStreamer = streams[0]?.node?.broadcaster?.login;
                
                if (newStreamer && newStreamer !== currentFarmingChannelId) {
                    addLog(`Found new streamer: ${newStreamer}. Switching...`, 'farm');
                    startFarmingSimulationById(currentFarmCampaignId, true);
                    progressionTracker[currentFarmCampaignId] = { mins: currentMins, time: now }; // Give it another chance
                    return;
                }
            }

            addLog(`No alternatives found or still stuck. Blacklisting ${currentFarmCampaignId} for 15m.`, 'error');
            campaignBlacklist[currentFarmCampaignId] = now + 15 * 60 * 1000;
            
            window.electronAPI.stopFarm();
            currentFarmCampaignId = null;
            currentFarmingChannelId = null;
            masterToggleStatus.innerHTML = `Auto Mode: Skipping inactive campaign...`;
            setTimeout(runMasterFarmLoop, 2000);
            return;
        }
    }
    
    // 2. Find eligible campaigns (ACTIVE)
    let eligible = [];
    
    if (farmAllMode) {
        // Mode: Farm EVERYTHING active, watchable and unfinished
        eligible = allCampaigns.filter(c => 
            c.status === 'ACTIVE' && 
            isWatchableCampaign(c) &&
            !isCampaignFinished(c) && 
            (!campaignBlacklist[c.id] || now >= campaignBlacklist[c.id])
        );
    } else {
        // Mode: Priority only
        for (const name of savedList) {
            const matchingCamps = allCampaigns.filter(c => c.game?.displayName?.toLowerCase() === name && c.status === 'ACTIVE');
            for (const camp of matchingCamps) {
                 if (isWatchableCampaign(camp) && (!campaignBlacklist[camp.id] || now >= campaignBlacklist[camp.id])) {
                    if (!isCampaignFinished(camp)) {
                        eligible.push(camp);
                    }
                 }
            }
        }
    }
    
    if (eligible.length === 0) {
        if (currentFarmCampaignId) {
             window.electronAPI.stopFarm();
             currentFarmCampaignId = null;
             currentFarmingChannelId = null;
        }
        masterToggleStatus.innerHTML = `<span style="color:#ffd700;">✅ Standby: waiting for new drops</span>`;
        return;
    }

    // Determine target: manual override or first eligible
    let targetCampaign = null;
    if (manualOverrideId) {
        targetCampaign = eligible.find(c => c.id === manualOverrideId);
        if (!targetCampaign) {
            manualOverrideId = null;
        }
    }
    
    if (!targetCampaign) {
        targetCampaign = eligible[0];
    }
    
    if (targetCampaign) {
         if (currentFarmCampaignId !== targetCampaign.id) {
             addLog(`Auto-Farm: Selected campaign ${targetCampaign.game?.displayName}`, 'system');
             
             // Reset state for new campaign
             currentFarmingChannelId = null;
             startFarmingSimulationById(targetCampaign.id, true);
         } else {
             // Already farming this - just update the UI bars and stats
             startFarmingSimulation(targetCampaign, false, true);
             
             // Update top status
             if (masterAutoFarmEnabled) {
                 masterToggleStatus.innerHTML = `Auto Mode: ON (Farming ${targetCampaign.game?.displayName})`;
             }
         }
    }
}

async function fetchAndUpdateCampaigns() {
  if (!accountTokens || !accountTokens.auth) return false;
  const response = await window.electronAPI.getCampaigns(accountTokens);
  
  if (!response) return false;

  if (response.error === 'INTEGRITY_REQUIRED') {
      const container = document.getElementById('campaignsContainer');
      if (container) {
          container.innerHTML = `
            <div style="background: rgba(255, 79, 79, 0.1); border: 1px solid #ff4f4f; padding: 20px; border-radius: 12px; text-align: center; margin: 20px;">
                <h3 style="color: #ff4f4f; margin-bottom: 10px; font-size: 18px;">Security Token Needed</h3>
                <p style="font-size: 14px; margin-bottom: 16px; color: var(--text-secondary);">Twitch is blocking access. Click the button below, and just wait for 5 seconds on the page that opens.</p>
                <button class="btn-primary" onclick="window.electronAPI.openLoginWindow('https://www.twitch.tv/drops/inventory')" style="padding: 10px 20px; background: #ff4f4f; border:none;">Fix Security Token</button>
            </div>
          `;
      }
      return false;
  }
  
  // Handle both array/object and be resilient to errors if data exists
  let userData;
  if (Array.isArray(response)) {
      userData = response[0]?.data?.currentUser;
  } else {
      userData = response?.data?.currentUser;
  }
  
  if (!userData) {
      console.warn("No userData found in campaign response", response);
      return false;
  }
  
  const rawCampaigns = userData.dropCampaigns || [];
  
  // Apply GLOBAL FILTER: Only campaigns with real watchable rewards
  allCampaigns = rawCampaigns.filter(c => isWatchableCampaign(c));
  
  // Extract dropCurrentSession from campaign query directly (more reliable)
  const sessionFromCampaign = userData.dropCurrentSession || null;
  if (sessionFromCampaign && sessionFromCampaign.game) {
      currentGlobalDropSession = sessionFromCampaign;
  }
  
  if (currentFarmingChannelId) {
      const dropRes = await window.electronAPI.getDropSession(currentFarmingChannelId, accountTokens);
      if (dropRes) {
          if (Array.isArray(dropRes) && dropRes.length > 0) {
              currentGlobalDropSession = dropRes[0]?.data?.currentUser?.dropCurrentSession || null;
          } else {
              currentGlobalDropSession = dropRes?.data?.currentUser?.dropCurrentSession || null;
          }
      }
  } else {
      currentGlobalDropSession = null;
  }
  
  const invRes = await window.electronAPI.getInventory(accountTokens);
  const inProgressMap = new Map();
  const eventDropsMap = new Map();
  
  if (invRes && invRes.data) {
      const inventory = invRes.data.currentUser?.inventory;
      const inProgress = inventory?.dropCampaignsInProgress || [];
      for (const ip of inProgress) {
          inProgressMap.set(ip.id, ip);
      }
      const eventDrops = inventory?.gameEventDrops || [];
      for (const ed of eventDrops) {
          if (ed.id && ed.lastAwardedAt) {
              eventDropsMap.set(ed.id, new Date(ed.lastAwardedAt));
          }
      }
  }
  
  // 2. CONSOLIDATED FILTERING & PROCESSING
  let finalCampaigns = [];
  let skippedCount = 0;

  for (const c of rawCampaigns) {
      if (!c) continue;
      
      const isOk = isWatchableCampaign(c);
      if (!isOk) {
          skippedCount++;
          continue;
      }

      const now = new Date();
      const end = new Date(c.endAt);
      const start = new Date(c.startAt);
      
      // Step B: Basic sanity checks
      if (c.status !== 'ACTIVE' || !c.timeBasedDrops) {
          skippedCount++;
          continue;
      }
      
      const validDrops = c.timeBasedDrops.filter(d => (d.requiredMinutesWatched || 0) > 0);
      if (validDrops.length === 0 || now < start || now > end) {
          skippedCount++;
          continue;
      }
      
      // Step C: Update rewards progress from inventory
      c.timeBasedDrops = validDrops;
      c.timeBasedDrops.sort((a, b) => a.requiredMinutesWatched - b.requiredMinutesWatched);
      
      const ipCamp = inProgressMap.get(c.id);
      if (ipCamp) {
          for (const d of c.timeBasedDrops) {
              const ipDrop = ipCamp.timeBasedDrops?.find(ipd => ipd.id === d.id);
              if (ipDrop) {
                  if (!d.self) d.self = {};
                  d.self.currentMinutesWatched = ipDrop.self?.currentMinutesWatched || 0;
                  if (ipDrop.self?.isClaimed) d.self.isClaimed = true;
              }
          }
      } else {
          // Fallback to eventDropsMap logic
          let claimedDuringCampaign = false;
          for (const d of c.timeBasedDrops) {
              const benefitId = d.benefitEdges?.[0]?.benefit?.id;
              if (benefitId && eventDropsMap.has(benefitId)) {
                  const awardedAt = eventDropsMap.get(benefitId);
                  if (awardedAt >= start && awardedAt <= end) {
                      claimedDuringCampaign = true;
                      break;
                  }
              }
          }
          
          for (const d of c.timeBasedDrops) {
              if (!d.self) d.self = {};
              if (claimedDuringCampaign) {
                  d.self.isClaimed = true;
                  d.self.currentMinutesWatched = d.requiredMinutesWatched;
              } else {
                  d.self.isClaimed = false;
                  d.self.currentMinutesWatched = 0;
              }
          }
      }
      
      finalCampaigns.push(c);
  }
  
  if (skippedCount > 0) {
      addLog(`Filtered out ${skippedCount} subscription/invalid campaigns and updated the view.`, 'system');
  }

  // UPDATE GLOBAL DATA STORES
  allCampaigns = finalCampaigns;
  
  allCampaigns.sort((a, b) => {
      const vA = a.game?.viewersCount || 0;
      const vB = b.game?.viewersCount || 0;
      return vB - vA;
  });
  
  filteredCampaigns = [...allCampaigns];
  
  const statsCount = document.getElementById('statsCampaignsCount');
  if (statsCount) statsCount.innerText = allCampaigns.length;
  if (document.getElementById('campaignSearch')) {
      document.getElementById('campaignSearch').oninput = (e) => {
          const val = e.target.value.toLowerCase();
          filteredCampaigns = allCampaigns.filter(c => c.game?.displayName?.toLowerCase().includes(val));
          renderCampaignsList();
      };
  }

  renderCampaignsList();
  renderPriorityGrid(autoFarmSearch ? autoFarmSearch.value : '');
  
  // Handle auto-farm loop
  if (masterAutoFarmEnabled) {
      runMasterFarmLoop();
  } else if (currentFarmCampaignId) {
      const currentCamp = allCampaigns.find(c => c.id === currentFarmCampaignId);
      if (currentCamp) startFarmingSimulation(currentCamp, false, true); // true = update only
  }
  return true;
}

async function processTokens(tokens, fromStorage = false) {
  if (!tokens || !tokens.auth || !tokens.auth.includes('OAuth')) return;
  if (tokenProcessingStarted) return;
  
  // We need integrity to actually load campaigns. 
  // If we're capturing fresh, wait for it before closing the login window.
  if (!fromStorage && !tokens.integrity) return;
  
  tokenProcessingStarted = true;
  addLog(`Tokens captured for user`, 'system');
  localStorage.setItem('accountTokens', JSON.stringify(tokens));
  window.electronAPI.authSuccess();
  
  // Fetch user info (avatar + name)
  let displayName = 'Connected';
  let login = '';
  let avatarUrl = '';
  try {
    const userRes = await window.electronAPI.getUserInfo(tokens);
    const user = userRes?.data?.currentUser;
    if (user) {
      displayName = user.displayName || user.login || 'User';
      login = user.login || '';
      avatarUrl = user.profileImageURL || '';
    }
  } catch(e) {}
  
  // Update stat card
  const statsAccountName = document.getElementById('statsAccountName');
  if (statsAccountName) {
    statsAccountName.innerHTML = displayName;
    statsAccountName.style.color = 'var(--success)';
  }
  
  // Update sidebar auth with avatar
  if (authSection) {
    authSection.classList.add('connected');
    if (avatarUrl) {
      authSection.innerHTML = `
        <div class="user-profile">
          <img src="${avatarUrl}" alt="avatar"/>
          <div class="user-info">
            <div class="user-name">${displayName}</div>
            <div class="user-login">@${login}</div>
          </div>
        </div>
        <button class="btn-secondary" id="btnDisconnect" style="width: 100%; font-size: 12px;">Disconnect</button>
      `;
    } else {
      authSection.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span class="status-indicator green"></span>
          <span style="font-size:13px; font-weight:600; color:var(--success);">${displayName}</span>
        </div>
        <button class="btn-secondary" id="btnDisconnect" style="width: 100%; font-size: 12px;">Disconnect</button>
      `;
    }
    document.getElementById('btnDisconnect').onclick = () => {
        localStorage.removeItem('accountTokens');
        location.reload();
    };
  }

  const campaignsContainer = document.getElementById('campaignsContainer');
  if (campaignsContainer) campaignsContainer.innerHTML = '<p style="color: var(--text-secondary);">Loading campaigns from Twitch...</p>';
  
  const success = await fetchAndUpdateCampaigns();
  
  // Only show "No campaigns" if the fetch succeeded but returned nothing
  if (success && allCampaigns.length === 0 && campaignsContainer) {
      campaignsContainer.innerHTML = '<p style="color: var(--text-secondary);">No active campaigns found.</p>';
      document.getElementById('farmPanel').innerHTML = `
        <div class="empty-state">
           <div class="icon">📭</div>
           <p>No active time-based campaigns found right now.</p>
        </div>
      `;
  }
  
  if (farmingInterval) clearInterval(farmingInterval);
  farmingInterval = setInterval(fetchAndUpdateCampaigns, 30000); // More frequent updates (30s)
}

window.electronAPI.onTokenCaptured(async (data) => {
  const hadIntegrity = accountTokens && !!accountTokens.integrity;
  
  if (!accountTokens) accountTokens = { auth: '', integrity: '', clientId: '', deviceId: '' };
  
  if (data.auth) accountTokens.auth = data.auth;
  if (data.integrity) accountTokens.integrity = data.integrity;
  if (data.clientId) accountTokens.clientId = data.clientId;
  if (data.deviceId) accountTokens.deviceId = data.deviceId;
  
  // Save most recent tokens
  localStorage.setItem('accountTokens', JSON.stringify(accountTokens));
  
  if (accountTokens.auth && accountTokens.auth.includes('OAuth')) {
      if (!tokenProcessingStarted) {
          processTokens(accountTokens);
      } else if (data.integrity && !hadIntegrity) {
          // If we just got our first integrity token, force a refresh
          console.log("Integrity token captured, refreshing campaigns...");
          fetchAndUpdateCampaigns();
      }
  }
});

function renderCampaignsList() {
  const campaignsContainer = document.getElementById('campaignsContainer');
  if (!campaignsContainer) return;
  
  // Update search input handler (only once)
  const campaignSearch = document.getElementById('campaignSearch');
  if (campaignSearch && !campaignSearch.oninput) {
      campaignSearch.oninput = (e) => {
          const val = e.target.value.toLowerCase();
          filteredCampaigns = allCampaigns.filter(c => c.game?.displayName?.toLowerCase().includes(val));
          renderCampaignsListItems();
      };
  }

  const btnFarmAll = document.getElementById('btnFarmAll');
  if (btnFarmAll) {
      updateMasterAutoFarmUI();
      
      btnFarmAll.onclick = () => {
          if (farmAllMode && masterAutoFarmEnabled) {
              masterAutoFarmEnabled = false;
              window.electronAPI.stopFarm();
              addLog('Global Farm Stopped.', 'system');
          } else {
              farmAllMode = true;
              masterAutoFarmEnabled = true;
              addLog('Global Farm STARTED.', 'system');
              fetchAndUpdateCampaigns();
              btnNavDashboard.click();
          }
          updateMasterAutoFarmUI();
      };
  }

  renderCampaignsListItems();
}

function renderCampaignsListItems() {
  const campaignsContainer = document.getElementById('campaignsContainer');
  if (!campaignsContainer) return;
  
  // NUCLEAR CLEAR
  while (campaignsContainer.firstChild) {
      campaignsContainer.removeChild(campaignsContainer.firstChild);
  }

  if(filteredCampaigns.length === 0) {
     campaignsContainer.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">No campaigns found.</p>';
     return;
  }
  
  let renderedCount = 0;
  filteredCampaigns.forEach(c => {
    // HARD FAILSAFE
    if (!isWatchableCampaign(c)) {
        console.warn(`[RENDER] Refusing to draw non-watchable campaign: ${c.game?.displayName}`);
        return;
    }
    
    renderedCount++;
    const imgUrl = getGameImageUrl(c.game, 144, 192);
    const totalDrops = c.timeBasedDrops?.length || 0;
    const claimedDrops = c.timeBasedDrops?.filter(d => d.self?.isClaimed).length || 0;
    const firstReward = c.timeBasedDrops?.[0]?.benefitEdges?.[0]?.benefit?.name || '';
    
    const card = document.createElement('div');
    card.className = 'campaign-card fade-in';
    card.onclick = () => startFarmingSimulationById(c.id, false);
    
    card.innerHTML = `
      <div style="display:flex; gap:12px; padding:12px;">
        <img src="${imgUrl}" style="width:48px; height:64px; border-radius:8px; object-fit:cover; flex-shrink:0; background:#2a2a2e;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg'"/>
        <div style="flex:1; min-width:0;">
          <h4 style="font-size:14px; font-weight:600; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.name || 'Unknown'}</h4>
          <p style="font-size:12px; color:var(--text-secondary); margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Game: ${c.game?.displayName || 'Unknown'}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
             <span style="font-size:11px; color:var(--text-secondary);">${totalDrops} drops · ${claimedDrops} claimed</span>
             <span style="font-size:11px; color:var(--accent-hover); font-weight:600;">Farm ▶</span>
          </div>
        </div>
      </div>
    `;
    campaignsContainer.appendChild(card);
  });
}

function stopFarmAction(campaign) {
    addLog(`Stopping farm session...`, 'system');
    window.electronAPI.stopFarm();
    currentFarmingChannelId = null;
    currentFarmCampaignId = null;
    manualOverrideId = null;
    if (campaign) startFarmingSimulation(campaign);
}

async function startFarmAction(campaign) {
    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const farmStatus = document.getElementById('farmStatus');
    
    if (btnRunFarm) btnRunFarm.style.display = 'none';
    if (btnStopFarm) btnStopFarm.style.display = 'block';
    
    try {
        const res = await window.electronAPI.findStreamer(campaign.game?.displayName || '', accountTokens);
        const streams = res?.data?.game?.streams?.edges || [];
        
        const validStreams = streams.filter(s => {
            const tags = s.node.freeformTags || [];
            return tags.some(t => t.name === 'DropsEnabled');
        });

        if (validStreams.length === 0) {
            addLog(`No live streamers for ${campaign.game?.displayName}`, 'warn');
            if (farmStatus) farmStatus.innerText = 'No live streamers found.';
            if (btnRunFarm) btnRunFarm.style.display = 'block';
            if (btnStopFarm) btnStopFarm.style.display = 'none';
            return;
        }
        
        const streamerLogin = validStreams[0].node.broadcaster.login;
        const streamerId = validStreams[0].node.broadcaster.id;

        currentFarmingChannelId = streamerId;
        window.electronAPI.startFarm(streamerLogin);
        addLog(`Watching ${streamerLogin}`, 'farm');
        if (farmStatus) farmStatus.innerHTML = `<span style="color: #00e676;">✅ Watching <b>${streamerLogin}</b></span>`;
        setTimeout(fetchAndUpdateCampaigns, 3000);
    } catch (e) {
        if (btnRunFarm) btnRunFarm.style.display = 'block';
    }
}

function extractStreamerFromText(text) {
    if (!text) return null;
    
    // Ignore URLs completely
    const cleanText = text.replace(/https?:\/\/[^\s]+/g, '');
    
    // Look for /channelname (must be preceded by a space or start of string to avoid weird matches)
    const slashMatch = cleanText.match(/(?:^|\s)\/([a-zA-Z0-9_]{3,25})/);
    if (slashMatch) {
        const name = slashMatch[1].toLowerCase();
        if (name !== 'www' && name !== 'twitch') return name;
    }
    
    // Look for "watching Name's"
    const watchingMatch = cleanText.match(/watching\s+([a-zA-Z0-9_]{3,25})'s/i);
    if (watchingMatch) {
        const name = watchingMatch[1].toLowerCase();
        if (name !== 'www') return name;
    }
    
    return null;
}

window.startFarmingSimulationById = (id, autoStart = false) => {
  const campaign = allCampaigns.find(c => c.id === id);
  if(campaign) {
    btnNavDashboard.click();
    startFarmingSimulation(campaign, autoStart);
  }
}

function startFarmingSimulation(campaign, autoStart = false, updateOnly = false) {
  if (!updateOnly) currentFarmCampaignId = campaign.id;
  
  const farmPanel = document.getElementById('farmPanel');
  if (!farmPanel) return;

  const drops = (campaign.timeBasedDrops || []).slice().sort((a, b) => a.requiredMinutesWatched - b.requiredMinutesWatched);
  
  let itemsHtml = drops.map((drop, index) => {
     const dropName = drop.benefitEdges?.[0]?.benefit?.name || `Reward ${index + 1}`;
     let dropImg = drop.benefitEdges?.[0]?.benefit?.imageAssetURL || '';
     if (dropImg && dropImg.startsWith('//')) dropImg = 'https:' + dropImg;
     if (!dropImg) dropImg = 'https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg';
     
     let requiredMins = drop.requiredMinutesWatched;
     const selfStats = drop.self || {};
     let currentMins = selfStats.currentMinutesWatched || 0;
     let isClaimed = selfStats.isClaimed || false;
     
     if (currentGlobalDropSession && (currentGlobalDropSession.game?.id === campaign.game?.id || currentGlobalDropSession.game?.displayName === campaign.game?.displayName)) {
         if (!isClaimed && currentGlobalDropSession.requiredMinutesWatched === requiredMins) {
             if (currentGlobalDropSession.currentMinutesWatched !== undefined && currentGlobalDropSession.currentMinutesWatched !== null) {
                 currentMins = currentGlobalDropSession.currentMinutesWatched;
             }
         }
     }
     
     if (currentMins > requiredMins) currentMins = requiredMins;
     if (isClaimed) currentMins = requiredMins;
     let percent = requiredMins > 0 ? Math.floor((currentMins / requiredMins) * 100) : 0;
     
     let statusHtml;
     let barColor;
     if (isClaimed) {
         statusHtml = `<span style="color: var(--success);">✅ Claimed</span>`;
         barColor = 'var(--success)';
     } else if (percent === 100) {
         statusHtml = `<span style="color: var(--warning);">🎁 Ready to claim</span>`;
         barColor = 'var(--warning)';
     } else {
         statusHtml = `<span style="color: var(--text-secondary);">${percent}% · ${currentMins}m / ${requiredMins}m</span>`;
         barColor = 'var(--accent-color)';
     }
                    
     return `
     <div class="drop-item-row">
         <img src="${dropImg}" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-72x96.jpg'" />
         <div class="drop-info">
             <h4>${dropName}</h4>
             <div class="drop-progress-bar">
                 <div class="drop-progress-bar-fill" style="width:${percent}%; background:${barColor};"></div>
             </div>
         </div>
         <div class="drop-status">
             ${statusHtml}
         </div>
     </div>`;
  }).join('');
  
  if (!updateOnly) {
    farmPanel.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 20px;">
            <div id="gameHeaderUIArea" style="display: flex; align-items: center; gap: 20px; width: 100%; max-width: 600px;">
                <img src="${getGameImageUrl(campaign.game, 120, 160)}" style="width: 80px; height: 106px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);" />
                <div style="flex: 1;">
                    <h2 style="margin: 0 0 5px 0; font-size: 22px;">${campaign.game?.displayName}</h2>
                    <p style="color: var(--text-secondary); font-size: 13px; margin: 0 0 15px 0;">Status: <b>${campaign.status}</b></p>
                    
                    <div id="farmingControlsArea" style="display: flex; align-items: center; gap: 12px;">
                        <button id="btnPrevGame" class="btn-secondary" style="padding: 8px 12px; font-size: 14px;">◀</button>
                        
                        <div id="mainActionArea">
                            <button id="btnRunFarm" class="btn-primary" style="width: 140px; height: 38px;">Start Farming</button>
                            <button id="btnStopFarm" class="btn-outline" style="display: none; width: 140px; height: 38px; color: var(--danger); border-color: var(--danger);">Stop Farming</button>
                        </div>

                        <button id="btnNextGame" class="btn-secondary" style="padding: 8px 12px; font-size: 14px;">▶</button>
                    </div>
                </div>
            </div>
            <div id="farmStatus" style="margin-top: 15px; font-size: 13px; color: var(--text-secondary);">Select the channel to start farming...</div>
        </div>
        <div id="dropItemsList" style="width: 100%; max-width: 600px;">
            ${itemsHtml}
        </div>
    `;
    
    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const btnPrevGame = document.getElementById('btnPrevGame');
    const btnNextGame = document.getElementById('btnNextGame');
    
    if (btnRunFarm) btnRunFarm.onclick = () => startFarmAction(campaign);
    if (btnStopFarm) btnStopFarm.onclick = () => stopFarmAction(campaign);
    if (btnPrevGame) btnPrevGame.onclick = () => cycleCampaign(-1);
    if (btnNextGame) btnNextGame.onclick = () => cycleCampaign(1);

    // If already farming this same game, show active UI
    if (currentFarmingChannelId && currentFarmCampaignId === campaign.id) {
        if (btnRunFarm) btnRunFarm.style.display = 'none';
        if (btnStopFarm) btnStopFarm.style.display = 'block';
        const farmStatus = document.getElementById('farmStatus');
        if (farmStatus) farmStatus.innerHTML = `<span style="color: #00e676;">✅ Watching...</span>`;
    }

  } else {
    // Partial update
    const list = document.getElementById('dropItemsList');
    if (list) list.innerHTML = itemsHtml;
  }
  
  if (autoStart) {
      setTimeout(() => {
          const btn = document.getElementById('btnRunFarm');
          if (btn && btn.style.display !== 'none') {
              startFarmAction(campaign);
          }
      }, 100);
  }
}
