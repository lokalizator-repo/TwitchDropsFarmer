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
let autoClaimEnabled = localStorage.getItem('autoClaimEnabled') !== 'false'; // Default to true
let currentGlobalDropSession = null;
let currentFarmingChannelId = null;
let currentFarmCampaignId = null; // Currently VIEWED campaign
let activeFarmingCampaignId = null; // Currently FARMED campaign
let activeFarmingChannelLogin = null; // Name of current streamer for UI
let masterAutoFarmEnabled = false;
let tokenProcessingStarted = false;
let manualOverrideId = null;
let farmAllMode = false; // New mode to farm EVERYTHING active
let currentUserId = null; // For WebSocket
let wsDropProgress = {}; // Real-time drop progress from WebSocket { dropId: { current, required } }
let uiTimerInterval = null; // High-frequency UI update interval

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
    localStorage.setItem('autoClaimEnabled', autoClaimEnabled);
    updateAutoClaimUI();
    
    if (autoClaimEnabled) {
        addLog('Auto-Claim enabled. Checking rewards...', 'system');
        processAutoClaims();
    }
  });
}

function updateAutoClaimUI() {
    const btn = document.getElementById('btnToggleClaim');
    if (!btn) return;
    if (autoClaimEnabled) {
      btn.innerText = 'Toggle (Enabled)';
      btn.className = 'btn-primary';
      btn.style.background = 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))';
      btn.style.borderColor = 'transparent';
      btn.style.color = 'white';
    } else {
      btn.innerText = 'Toggle (Disabled)';
      btn.className = 'btn-outline';
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-secondary)';
      btn.style.borderColor = 'var(--border-color)';
    }
}

// Set initial UI state
updateAutoClaimUI();

const autoFarmSearch = document.getElementById('autoFarmSearch');
const selectedGamesChips = document.getElementById('selectedGamesChips');
const priorityGameGrid = document.getElementById('priorityGameGrid');
const btnAddCustomGame = document.getElementById('btnAddCustomGame');

let selectedPriorityGames = (localStorage.getItem('autoFarmGames') || '').split(',').map(s=>s.trim()).filter(Boolean);

function savePriorityGames() {
    localStorage.setItem('autoFarmGames', selectedPriorityGames.join(', '));
}

const btnCheckUpdate = document.getElementById('btnCheckUpdate');
if (btnCheckUpdate) {
    btnCheckUpdate.onclick = () => checkUpdates();
}

async function checkUpdates() {
    const btn = document.getElementById('btnCheckUpdate');
    const notice = document.getElementById('updateNotice');
    if (!btn || !notice) return;

    btn.innerText = 'Checking...';
    btn.disabled = true;
    notice.innerText = '';

    try {
        // !!! IMPORTANT: Replace this URL with your actual GitHub repository raw package.json link
        const repoUrl = "https://raw.githubusercontent.com/Lokalizator-repo/twitchdropsfarm/main/package.json";
        const res = await fetch(repoUrl);
        if (!res.ok) throw new Error('Network error');
        
        const remote = await res.json();
        const currentVersion = "1.0.0"; 

        if (remote.version !== currentVersion) {
            notice.innerHTML = `<span style="color: var(--warning); cursor: pointer; text-decoration: underline;">New version ${remote.version} available! Click here.</span>`;
            notice.onclick = () => window.electronAPI.openExternal("https://github.com/Lokalizator-repo/twitchdropsfarm/releases");
        } else {
            notice.innerHTML = `<span style="color: var(--success);">You have the latest version.</span>`;
        }
    } catch (e) {
        console.error("Update check failed:", e);
        notice.innerHTML = `<span style="color: var(--danger);">Error checking updates.</span>`;
    } finally {
        btn.innerText = 'Check for Updates';
        btn.disabled = false;
    }
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
            <div style="display:flex; flex-direction: row; gap: 4px; line-height: 1;">
                <span onclick="movePriorityGame(${index}, -1)" style="cursor:pointer; opacity: 0.8; font-size: 11px; padding: 2px;">◀</span>
                <span onclick="movePriorityGame(${index}, 1)" style="cursor:pointer; opacity: 0.8; font-size: 11px; padding: 2px;">▶</span>
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
let progressionTracker = {}; // { campaignId: { mins, time } }
let stallBlacklist = {}; // campaignId -> timestamp to ignore until
let campaignBlacklist = {}; // { campaignId: expiryTime }
let pendingClaims = new Set();

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

function isCampaignFinished(c, inventory) {
    if (!c || !c.timeBasedDrops || c.timeBasedDrops.length === 0) return true;
    
    // METHOD 1: Check in-progress campaign data from inventory
    const ipCamp = inventory?.dropCampaignsInProgress?.find(ip => ip.id === c.id);
    if (ipCamp) {
        const allClaimedOrWatched = ipCamp.timeBasedDrops.every(d => 
            d.self?.isClaimed === true || 
            (d.self?.currentMinutesWatched || 0) >= d.requiredMinutesWatched
        );
        if (allClaimedOrWatched) return true;
    }

    // METHOD 2: Check GameEventDrops (Archive) + Timestamps
    const eventDrops = inventory?.gameEventDrops || [];
    let unfinishedFound = false;

    for (const drop of c.timeBasedDrops) {
        if (drop.self?.isClaimed) continue;

        const benefitId = drop.benefitEdges?.[0]?.benefit?.id;
        const matchingReward = eventDrops.find(ed => ed.id === benefitId);

        if (matchingReward) {
            const awardedAt = new Date(matchingReward.lastAwardedAt);
            const dropStart = new Date(drop.startAt || c.startAt);
            const dropEnd = new Date(drop.endAt || c.endAt);

            // Alorf Logic: Was it awarded during THIS campaign period?
            if (awardedAt >= dropStart && awardedAt <= dropEnd) {
                continue; 
            }
        }

        unfinishedFound = true;
        break;
    }

    return !unfinishedFound;
}

/**
 * Comprehensive campaign validation (Alorf-style)
 * Returns { isValid: boolean, reason: string }
 */
function validateCampaign(c, inventory) {
    // 1. Basic existence
    if (!c) return { isValid: false, reason: 'Campaign is null' };
    if (!c.timeBasedDrops || c.timeBasedDrops.length === 0) {
        return { isValid: false, reason: 'No time-based drops' };
    }

    // 2. Status check
    if (c.status !== 'ACTIVE') {
        return { isValid: false, reason: `Status: ${c.status}` };
    }

    // 3. Game linkage
    if (!c.game || !c.game.displayName) {
        return { isValid: false, reason: 'No game linked' };
    }

    // 4. Just Chatting / IRL filter
    const gameName = (c.game.displayName || '').toLowerCase();
    const badGames = ['just chatting', 'общение', 'irl'];
    if (badGames.some(bad => gameName.includes(bad))) {
        return { isValid: false, reason: 'Just Chatting (badge-only)' };
    }

    // 5. Date validation
    const now = new Date();
    const start = new Date(c.startAt);
    const end = new Date(c.endAt);
    
    // Add a 5-minute "buffer" for start/end times to account for clock drift
    if (now < new Date(start.getTime() - 5 * 60000)) return { isValid: false, reason: 'Not started yet' };
    if (now > new Date(end.getTime() + 5 * 60000)) return { isValid: false, reason: 'Already ended' };

    // 6. Time remaining check
    const minutesLeft = (end.getTime() - now.getTime()) / (1000 * 60);
    // Only check if it's even POSSIBLE to finish at least one drop from scratch or current progress
    const minRequired = Math.min(...c.timeBasedDrops.map(d => d.requiredMinutesWatched || 0));
    
    // Alorf: If less than 5 minutes left total, it's probably not worth it
    if (minutesLeft < 5) {
        return { isValid: false, reason: `Campaign ending in < 5m` };
    }

    // 7. Sub-only filter
    const hasSubRequirement = c.timeBasedDrops.some(d => (d.requiredSubs || 0) > 0);
    if (hasSubRequirement) {
        return { isValid: false, reason: 'Requires subscription' };
    }

    // 8. Valid drops
    const validDrops = c.timeBasedDrops.filter(d => (d.requiredMinutesWatched || 0) > 0);
    if (validDrops.length === 0) {
        return { isValid: false, reason: 'All drops have 0 minutes requirement' };
    }

    return { isValid: true, reason: 'OK' };
}

function isWatchableCampaign(c) {
    const res = validateCampaign(c);
    if (!res.isValid) {
        console.log(`[Validator] Skipping ${c?.game?.displayName || 'Unknown'}: ${res.reason}`);
    }
    return res.isValid;
}


async function cycleCampaign(direction, autoStart = false) {
    if (!allCampaigns.length) return;
    
    // Triple-check: Fetch inventory for precise cycling
    const inventoryRes = await window.electronAPI.getInventory(accountTokens);
    const inventory = inventoryRes?.data?.currentUser?.inventory;

    // Manual cycling should ALWAYS allow seeing all active watchable campaigns
    let eligible = allCampaigns.filter(c => 
        c.status === 'ACTIVE' && 
        isWatchableCampaign(c) &&
        !isCampaignFinished(c, inventory)
    );
    
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
    
    // 3. Just SHOW the info, don't start farming automatically
    startFarmingSimulation(target, autoStart);
}

async function runMasterFarmLoop() {
    if (!masterAutoFarmEnabled) return;
    
    // Triple-check: Get FRESH inventory before making decisions
    const inventoryRes = await window.electronAPI.getInventory(accountTokens);
    const inventory = inventoryRes?.data?.currentUser?.inventory;
    
    const now = Date.now();
    const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s=>s.trim().toLowerCase());
    
    // 1. Monitor progression of CURRENTLY farming campaign
    const curr = allCampaigns.find(c => c.id === activeFarmingCampaignId);
    if (curr) {
        const ipCamp = inventory?.dropCampaignsInProgress?.find(ip => ip.id === curr.id);
        const activeDrop = ipCamp?.timeBasedDrops?.find(d => !d.self?.isClaimed);
        
        // Track the specific progress of the FIRST unclaimed drop
        const currentMins = activeDrop?.self?.currentMinutesWatched || 0;
        const dropName = activeDrop?.name || 'Unknown';
        const stats = progressionTracker[curr.id] || { mins: -1, time: now, lastDropName: '' };
        
        if (currentMins > stats.mins) {
            // PROGRESS DETECTED!
            if (stats.mins !== -1) {
                const diff = currentMins - stats.mins;
                addLog(`[${curr.game?.displayName}] Progress on "${dropName}": +${diff}m (${currentMins}m)`, 'farm');
            }
            progressionTracker[curr.id] = { mins: currentMins, time: now, lastDropName: dropName };
        } else {
            // Check for STALL (Decrease threshold to 120s as requested)
            const threshold = stats.mins === -1 ? 45 * 1000 : 2 * 60 * 1000;
            const elapsed = now - stats.time;
            
            // Dedicated UI Timer
            if (!uiTimerInterval) {
                uiTimerInterval = setInterval(() => {
                    const statusArea = document.getElementById('stallStatus');
                    const c = allCampaigns.find(currCamp => currCamp.id === activeFarmingCampaignId);
                    if (statusArea && c && progressionTracker[c.id]) {
                        const s = progressionTracker[c.id];
                        const th = s.mins === -1 ? 45 * 1000 : 2 * 60 * 1000;
                        const el = Date.now() - s.time;
                        const rem = Math.max(0, Math.floor((th - el) / 1000));
                        if (rem > 0) {
                            statusArea.innerHTML = `<span style="color: var(--warning); font-size: 11px; opacity: 0.8;">⏳ Stall check: ${rem}s / ${Math.round(th/1000)}s</span>`;
                        } else if (rem === 0) {
                             statusArea.innerHTML = `<span style="color: var(--danger); font-size: 11px;">🚨 Stall verified!</span>`;
                        }
                    } else if (uiTimerInterval) {
                        statusArea.innerHTML = '';
                        clearInterval(uiTimerInterval);
                        uiTimerInterval = null;
                    }
                }, 1000);
            }

            if (elapsed > threshold) {
                if (uiTimerInterval) { clearInterval(uiTimerInterval); uiTimerInterval = null; }
                const timerArea = document.getElementById('stallStatus');
                if (timerArea) timerArea.innerHTML = '';

                const campaignName = curr.name || curr.game?.displayName || 'Unknown';
                addLog(`Verified stall on campaign "${campaignName}"! Ignoring for 1 hour.`, 'warn');
                stallBlacklist[curr.id] = now + 60 * 60 * 1000; // Ignore for 1 hour
                progressionTracker[curr.id] = { mins: currentMins, time: now, lastDropName: dropName }; 

                // Reset broadcaster so we find a new one for the next campaign
                currentFarmingChannelId = null;

                if (farmAllMode) {
                    cycleCampaign(1, true);
                } else {
                    stopFarmAction(curr);
                    currentFarmCampaignId = null;
                }
                return;
            }
        }
    }
    
    // 2. Find eligible campaigns (ACTIVE)
    let eligible = [];
    
    if (farmAllMode) {
        // Mode: Farm EVERYTHING active, watchable and unfinished
        eligible = allCampaigns.filter(c => 
            c.status === 'ACTIVE' && 
            isWatchableCampaign(c) &&
            !isCampaignFinished(c, inventory) &&
            (!stallBlacklist[c.id] || now > stallBlacklist[c.id])
        );
    } else {
        // Mode: Priority only
        for (const name of savedList) {
            const matchingCamps = allCampaigns.filter(c => 
                c.game?.displayName?.toLowerCase() === name && 
                c.status === 'ACTIVE' &&
                (!stallBlacklist[c.id] || now > stallBlacklist[c.id])
            );
            for (const camp of matchingCamps) {
                 if (isWatchableCampaign(camp)) {
                    if (!isCampaignFinished(camp, inventory)) {
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
             
             // Reset state for new campaign - -1 means "new session, use 45s grace period"
             currentFarmingChannelId = null;
             progressionTracker[targetCampaign.id] = { mins: -1, time: Date.now() };
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
  console.log(`Received ${rawCampaigns.length} total campaigns from Twitch`);
  
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
  let skipStats = {};

  for (const c of rawCampaigns) {
      if (!c) continue;
      
      const validation = validateCampaign(c);
      if (!validation.isValid) {
          skipStats[validation.reason] = (skipStats[validation.reason] || 0) + 1;
          continue;
      }

      const now = new Date();
      const start = new Date(c.startAt);
      const end = new Date(c.endAt);
      
      // Step B: Extract valid drops (safely)
      const drops = c.timeBasedDrops || [];
      const validDrops = drops.filter(d => (d.requiredMinutesWatched || 0) > 0);
      
      if (validDrops.length === 0) {
          skipStats['No active drops'] = (skipStats['No active drops'] || 0) + 1;
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
                  if (ipDrop.self?.dropInstanceID) d.self.dropInstanceID = ipDrop.self.dropInstanceID;
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

  // Log why we have what we have
  if (Object.keys(skipStats).length > 0) {
      const summary = Object.entries(skipStats).map(([reason, count]) => `${reason}: ${count}`).join(', ');
      console.log(`Filtering results: ${finalCampaigns.length} kept, skipped: ${summary}`);
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
  
  if (autoClaimEnabled) {
      processAutoClaims();
  }
  
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
      currentUserId = user.id;
      addLog(`Logged in as ${displayName}`, 'system');
    } else {
      addLog('Could not fetch user profile details, using default "Connected"', 'warn');
      if (userRes.error) console.error("UserInfo Error:", userRes.error);
    }
  } catch(e) {
    console.error("UserInfo Exception:", e);
  }

  // Initialize WebSocket for real-time drop progress
  if (currentUserId && tokens.auth) {
    try {
      await window.electronAPI.wsConnect(currentUserId, tokens.auth);
      addLog('⚡ WebSocket connected — real-time drop updates active', 'system');
    } catch (e) {
      addLog('WebSocket connection failed, falling back to polling', 'warn');
    }
  }
  
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
  farmingInterval = setInterval(fetchAndUpdateCampaigns, 30000); // Polling fallback (30s)

  // Setup WebSocket real-time listeners
  setupWebSocketListeners();
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
    activeFarmingCampaignId = null;
    activeFarmingChannelLogin = null;
    manualOverrideId = null;
    window.electronAPI.updateTrayTooltip('Idle');
    if (campaign) startFarmingSimulation(campaign);
}

async function startFarmAction(campaign, isAuto = false) {
    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const farmStatus = document.getElementById('farmStatus');
    
    if (btnRunFarm) btnRunFarm.style.display = 'none';
    if (btnStopFarm) btnStopFarm.style.display = 'block';
    
    try {
        const res = await window.electronAPI.findStreamer(campaign.game?.displayName || '', accountTokens);
        const streams = res?.data?.game?.streams?.edges || [];
        
        const validStreams = streams.filter(s => {
            const tags = (s.node.freeformTags || []).map(t => t.name.toLowerCase());
            const title = (s.node.title || '').toLowerCase();
            
            // Look for "drops" in tags (localized like "Drops有効" or "DropsВключены") or in title
            return tags.some(t => t.includes('drops')) || 
                   title.includes('drops') || 
                   title.includes('!drops') || 
                   title.includes('дропс');
        });

        if (validStreams.length === 0) {
            addLog(`No live streamers for ${campaign.game?.displayName}`, 'warn');
            if (farmStatus) farmStatus.innerText = 'No live streamers found.';
            if (btnRunFarm) btnRunFarm.style.display = 'block';
            if (btnStopFarm) btnStopFarm.style.display = 'none';
            if (isAuto && farmAllMode) cycleCampaign(1);
            return;
        }

        // Just pick the first candidate and START - no more blocking checks
        const targetStreamer = validStreams[0].node.broadcaster;
        const streamerLogin = targetStreamer.login;
        const streamerId = targetStreamer.id;

        currentFarmingChannelId = streamerId;
        activeFarmingCampaignId = campaign.id;
        activeFarmingChannelLogin = streamerLogin;
        window.electronAPI.startFarm(streamerLogin);
        window.electronAPI.updateTrayTooltip(`Farming: ${campaign.game?.displayName || 'Game'}`);
        addLog(`Watching ${streamerLogin}... (Grace period 45s started)`, 'farm');
        if (farmStatus) farmStatus.innerHTML = `<span style="color: #00e676;">✅ Watching <b>${streamerLogin}</b></span>`;
        
        // Reset progression tracker: -1 tells the loop this is a NEW session
        progressionTracker[campaign.id] = { mins: -1, time: Date.now() };

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

function cycleCampaign(dir, autoStart = false) {
    if (allCampaigns.length === 0) return;
    const idx = allCampaigns.findIndex(c => c.id === currentFarmCampaignId);
    let nextIdx = idx + dir;
    if (nextIdx < 0) nextIdx = allCampaigns.length - 1;
    if (nextIdx >= allCampaigns.length) nextIdx = 0;
    startFarmingSimulation(allCampaigns[nextIdx], autoStart);
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
            <div id="stallStatus" style="margin-top: 4px; height: 16px;"></div>
        </div>
        <div id="dropItemsList" style="width: 100%; max-width: 600px;">
            ${itemsHtml}
        </div>
    `;
    
    // Update tray with overall progress
    if (campaign && currentFarmCampaignId === campaign.id) {
        // Find current and required mins for the next unclaimed drop to show real progress
        const activeDrop = drops.find(d => !d.self?.isClaimed);
        if (activeDrop) {
            const { currentMins } = getAccurateDropProgress(activeDrop, campaign);
            const percent = Math.floor((currentMins / activeDrop.requiredMinutesWatched) * 100);
            window.electronAPI.updateTrayTooltip(`Farming: ${campaign.game?.displayName} (${percent}%)`);
        } else if (drops.length > 0) {
            window.electronAPI.updateTrayTooltip(`Farming: ${campaign.game?.displayName} (100%)`);
        }
    }

    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const btnPrevGame = document.getElementById('btnPrevGame');
    const btnNextGame = document.getElementById('btnNextGame');
    
    if (btnRunFarm) btnRunFarm.onclick = () => startFarmAction(campaign, false);
    if (btnStopFarm) btnStopFarm.onclick = () => stopFarmAction(campaign);
    if (btnPrevGame) btnPrevGame.onclick = () => cycleCampaign(-1);
    if (btnNextGame) btnNextGame.onclick = () => cycleCampaign(1);

    // If already farming this same game, show active UI
    if (currentFarmingChannelId && activeFarmingCampaignId === campaign.id) {
        if (btnRunFarm) btnRunFarm.style.display = 'none';
        if (btnStopFarm) btnStopFarm.style.display = 'block';
        const farmStatus = document.getElementById('farmStatus');
        if (farmStatus) farmStatus.innerHTML = `<span style="color: #00e676;">✅ Watching <b>${activeFarmingChannelLogin || '...'}</b></span>`;
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
              startFarmAction(campaign, true);
              window.electronAPI.updateTrayTooltip(`Farming: ${campaign.game?.displayName || 'Game'}`);
          }
      }, 100);
  }
}

// ============================================================
// WebSocket Real-Time Drop Progress
// ============================================================

function setupWebSocketListeners() {
  // Real-time drop progress updates
  window.electronAPI.onWsDropProgress((data) => {
    if (data.dropId) {
      const oldData = wsDropProgress[data.dropId];
      const newMins = data.currentProgress;
      const oldMins = oldData ? oldData.current : -1;

      wsDropProgress[data.dropId] = {
        current: newMins,
        required: data.requiredProgress,
        timestamp: Date.now()
      };

      // Explicitly log the progress when it increases
      if (newMins > oldMins && oldMins !== -1) {
        const diff = newMins - oldMins;
        const curr = allCampaigns.find(c => c.id === currentFarmCampaignId);
        const gameName = curr?.game?.displayName || 'Game';
        addLog(`[${gameName}] Real-time progress: +${diff}m (${newMins}m)`, 'farm');
      } else if (oldMins === -1) {
        addLog(`[WS] Real-time tracking active for drop. Current: ${newMins}m`, 'system');
      }
      
      // Immediately update the UI progress bars without full refresh
      const curr = allCampaigns.find(c => c.id === currentFarmCampaignId);
      if (curr) {
        startFarmingSimulation(curr, false, true);
      }
    }
  });

  // Drop claimed notification
  window.electronAPI.onWsDropClaim((data) => {
    addLog(`🎁 Drop claimed via WebSocket! (${data.dropId})`, 'farm');
    // Force inventory refresh
    fetchAndUpdateCampaigns();
  });

  // WebSocket disconnection
  window.electronAPI.onWsDisconnected((data) => {
    if (data.permanent) {
      addLog('⚠️ WebSocket permanently disconnected. Using polling only.', 'warn');
    }
  });

  // Generic drop event (for debugging)
  window.electronAPI.onWsDropEvent((data) => {
    console.log('[WS Event]', data.type, data.raw);
  });
}

/**
 * Get the most accurate drop progress for a given drop.
 * Priority: WebSocket data > Inventory data > Campaign data
 * 
 * @param {object} drop - A timeBasedDrop object from allCampaigns
 * @param {object} inventoryDrop - Matching drop from inventory (if available)
 * @returns {{ currentMins: number, isClaimed: boolean }}
 */
function getAccurateDropProgress(drop, inventoryDrop) {
  let currentMins = 0;
  let isClaimed = false;

  // Layer 1: Campaign data (least fresh)
  if (drop.self) {
    currentMins = drop.self.currentMinutesWatched || 0;
    isClaimed = drop.self.isClaimed || false;
  }

  // Layer 2: Inventory data (fresher)
  if (inventoryDrop?.self) {
    currentMins = Math.max(currentMins, inventoryDrop.self.currentMinutesWatched || 0);
    if (inventoryDrop.self.isClaimed) isClaimed = true;
  }

  // Layer 3: WebSocket real-time data (freshest)
  const wsData = wsDropProgress[drop.id];
  if (wsData && (Date.now() - wsData.timestamp) < 5 * 60 * 1000) {
    // Only use WS data if it's less than 5 minutes old
    currentMins = Math.max(currentMins, wsData.current || 0);
  }

  return { currentMins, isClaimed };
}

async function processAutoClaims() {
    if (!autoClaimEnabled || !accountTokens) return;
    
    let candidates = 0;
    for (const campaign of allCampaigns) {
        for (const drop of (campaign.timeBasedDrops || [])) {
            const self = drop.self || {};
            
            if (!self.isClaimed && self.currentMinutesWatched >= drop.requiredMinutesWatched) {
                const claimId = self.dropInstanceID || `missing-${campaign.id}-${drop.id}`;
                
                // If we already tried this recently, skip
                if (pendingClaims.has(claimId)) continue;
                if (self.hasPreconditionsMet === false) continue;

                candidates++;
                pendingClaims.add(claimId);
                // Mark as pending for 10 minutes
                setTimeout(() => pendingClaims.delete(claimId), 10 * 60 * 1000);
            }
        }
    }

    if (candidates > 0) {
        addLog(`[Auto-Claim] Detected ${candidates} ready reward(s). Triggering one hidden claim window...`, 'system');
        window.electronAPI.claimViaWindow();
    }
}

window.electronAPI.onLogMsg((data) => {
    if (data && data.msg) {
        addLog(data.msg, data.type || 'info');
        if (data.refresh) {
            fetchAndUpdateCampaigns();
        }
    }
});

// Tray initialization
window.electronAPI.updateTrayTooltip('Idle');

// Minimize to tray button
const btnMinimizeTray = document.getElementById('btnMinimizeTray');
if (btnMinimizeTray) {
    btnMinimizeTray.onclick = () => {
        window.electronAPI.minimizeToTray();
    };
}
