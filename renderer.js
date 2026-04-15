const getEl = (id) => document.getElementById(id);

const loginBtn = getEl('loginBtn');
const authStatusText = getEl('authStatusText');
const authStatusIndicator = document.querySelector('#authStatusIndicator .status-indicator');
const authSection = getEl('authSection');

// Navigation
const btnNavDashboard = getEl('btnNavDashboard');
const btnNavCampaigns = getEl('btnNavCampaigns');
const btnNavInventory = getEl('btnNavInventory');
const btnNavSettings = getEl('btnNavSettings');
const btnNavLogs = getEl('btnNavLogs');

const viewDashboard = getEl('viewDashboard');
const viewCampaigns = getEl('viewCampaigns');
const viewInventory = getEl('viewInventory');
const viewSettings = getEl('viewSettings');
const viewLogs = getEl('logsView');
// Persistent application state
let ignoredCampaignIds = JSON.parse(localStorage.getItem('ignoredCampaignIds') || '[]');

function toggleIgnoreCampaign(id) {
    if (ignoredCampaignIds.includes(id)) {
        ignoredCampaignIds = ignoredCampaignIds.filter(i => i !== id);
    } else {
        ignoredCampaignIds.push(id);
    }
    localStorage.setItem('ignoredCampaignIds', JSON.stringify(ignoredCampaignIds));
    renderCampaignsListItems(); // Refresh the list
    // If we're farming this game, we should probably stop and move to next
    if (activeFarmingCampaignId === id) {
        addLog(`[Ignore] Current farming campaign ignored. Choosing next candidate...`, 'system');
        runMasterFarmLoop();
    }
}

function clearIgnoredCampaigns() {
    ignoredCampaignIds = [];
    localStorage.setItem('ignoredCampaignIds', '[]');
    renderCampaignsListItems();
    addLog(`[Ignore] Cleared all ignored campaigns.`, 'system');
}

window.toggleIgnoreCampaign = toggleIgnoreCampaign;
window.clearIgnoredCampaigns = clearIgnoredCampaigns;

let campaignSortMode = 'viewers';
const btnSortViewers = getEl('btnSortViewers');
const btnSortEnd = getEl('btnSortEnd');

function updateSortUI() {
    if (!btnSortViewers || !btnSortEnd) return;
    if (campaignSortMode === 'viewers') {
        // Active Viewers
        btnSortViewers.style.background = 'var(--accent-light)';
        btnSortViewers.style.borderColor = 'var(--accent-color)';
        btnSortViewers.style.color = 'var(--accent-hover)';
        // Inactive End
        btnSortEnd.style.background = 'transparent';
        btnSortEnd.style.borderColor = 'var(--border-color)';
        btnSortEnd.style.color = 'var(--text-secondary)';
    } else {
        // Active End
        btnSortEnd.style.background = 'var(--accent-light)';
        btnSortEnd.style.borderColor = 'var(--accent-color)';
        btnSortEnd.style.color = 'var(--accent-hover)';
        // Inactive Viewers
        btnSortViewers.style.background = 'transparent';
        btnSortViewers.style.borderColor = 'var(--border-color)';
        btnSortViewers.style.color = 'var(--text-secondary)';
    }
}

if (btnSortViewers) btnSortViewers.onclick = () => { campaignSortMode = 'viewers'; updateSortUI(); renderCampaignsListItems(); };
if (btnSortEnd) btnSortEnd.onclick = () => { campaignSortMode = 'endDate'; updateSortUI(); renderCampaignsListItems(); };

function addLog(msg, type = 'info') {
    console.log(`[RendererLog] ${type.toUpperCase()}: ${msg}`); // Also log to terminal!
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
        if (viewInventory) viewInventory.style.display = 'none';
        if (viewSettings) viewSettings.style.display = 'none';
        if (viewLogs) viewLogs.style.display = 'none';

        if (btnNavDashboard) btnNavDashboard.classList.remove('active');
        if (btnNavCampaigns) btnNavCampaigns.classList.remove('active');
        if (btnNavInventory) btnNavInventory.classList.remove('active');
        if (btnNavSettings) btnNavSettings.classList.remove('active');
        if (btnNavLogs) btnNavLogs.classList.remove('active');

        if (viewName === 'dashboard' && viewDashboard) { viewDashboard.style.display = 'block'; btnNavDashboard.classList.add('active'); }
        if (viewName === 'campaigns' && viewCampaigns) { 
            viewCampaigns.style.display = 'block'; 
            btnNavCampaigns.classList.add('active');
            renderCampaignsListItems(); 
        }
        if (viewName === 'inventory' && viewInventory) { viewInventory.style.display = 'block'; btnNavInventory.classList.add('active'); renderInventory(); }
        if (viewName === 'settings' && viewSettings) { viewSettings.style.display = 'block'; btnNavSettings.classList.add('active'); }
        if (viewName === 'logs' && viewLogs) { viewLogs.style.display = 'block'; btnNavLogs.classList.add('active'); }
    } catch (e) {
        console.error("View switch error:", e);
    }
}

if (btnNavDashboard) btnNavDashboard.onclick = () => switchView('dashboard');
if (btnNavCampaigns) btnNavCampaigns.onclick = () => switchView('campaigns');
if (btnNavInventory) btnNavInventory.onclick = () => switchView('inventory');
if (btnNavSettings) btnNavSettings.onclick = () => switchView('settings');
if (btnNavLogs) btnNavLogs.onclick = () => switchView('logs');

let accountTokens = JSON.parse(localStorage.getItem('accountTokens') || 'null');
let allCampaigns = [];
let filteredCampaigns = [];
let autoClaimEnabled = localStorage.getItem('autoClaimEnabled') !== 'false'; // Default to true
let currentGlobalDropSession = null;
let currentFarmingChannelId = null;
let currentFarmCampaignId = null; // Currently VIEWED campaign on Dashboard
let activeFarmingCampaignId = null; // Currently FARMED campaign
let previewCampaignId = null; // Currently PREVIEWED campaign on Campaigns tab
let activeFarmingChannelLogin = null; // Name of current streamer for UI
let masterAutoFarmEnabled = false;
let tokenProcessingStarted = false;
let manualOverrideId = null;
let farmAllMode = false; // If true, farms all active campaigns based on priority
let currentUserId = null; // Stored for WebSocket authentication
let wsDropProgress = {}; // Real-time drop progress metrics { dropId: { current, required } }
let uiTimerInterval = null; // High-frequency UI update loop pointer

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

let selectedPriorityGames = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim()).filter(Boolean);

function savePriorityGames() {
    localStorage.setItem('autoFarmGames', selectedPriorityGames.join(', '));
}

const btnCheckUpdate = document.getElementById('btnCheckUpdate');
if (btnCheckUpdate) {
    btnCheckUpdate.onclick = () => checkUpdates();
}

const btnClearLogs = document.getElementById('btnClearLogs');
if (btnClearLogs) {
    btnClearLogs.onclick = () => {
        const consoleEl = getEl('logConsole');
        if (consoleEl) consoleEl.innerHTML = '';
        addLog('Logs cleared.', 'system');
    };
}

const btnClearIgnored = document.getElementById('btnClearIgnored');
if (btnClearIgnored) {
    btnClearIgnored.onclick = () => {
        if (confirm('Are you sure you want to reset the ignored campaigns list?')) {
            clearIgnoredCampaigns();
        }
    };
}

// Remote update check
async function checkUpdates() {
    const btn = document.getElementById('btnCheckUpdate');
    const notice = document.getElementById('updateNotice');
    if (!btn || !notice) return;

    btn.innerText = 'Checking...';
    btn.disabled = true;
    notice.innerText = '';

    try {
        // Fetch remote package descriptor to compare versions
        const repoUrl = "https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/package.json";
        const res = await fetch(repoUrl);
        if (!res.ok) throw new Error('Network error');

        const remote = await res.json();
        const currentVersion = "1.0.0";

        if (remote.version !== currentVersion) {
            notice.innerHTML = `<span style="color: var(--warning); cursor: pointer; text-decoration: underline;">New version ${remote.version} available! Click here.</span>`;
            notice.onclick = () => window.electronAPI.openExternal("https://github.com/lokalizator-repo/TwitchDropsFarmer/releases");
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
let isFetchingCampaigns = false;

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
            btnFarmAll.innerText = isFetchingCampaigns ? '⏳ Loading Data...' : '⚡ Start Global Auto-Farm';
            btnFarmAll.style.background = isFetchingCampaigns ? '#333' : 'linear-gradient(135deg, #00e676, #00c853)';
        }
    }
}

// Logic for the new Control Center
const btnTogglePriority = document.getElementById('btnTogglePriority');
const btnToggleGlobal = document.getElementById('btnToggleGlobal');
const btnStopMaster = document.getElementById('btnStopMaster');

if (btnTogglePriority) {
    btnTogglePriority.onclick = () => {
        masterAutoFarmEnabled = true;
        farmAllMode = false;
        activeFarmingCampaignId = null;
        addLog('Switched to PRIORITY auto-farm.', 'system');
        updateMasterAutoFarmUI();
        runMasterFarmLoop();
    };
}

if (btnToggleGlobal) {
    btnToggleGlobal.onclick = () => {
        masterAutoFarmEnabled = true;
        farmAllMode = true;
        activeFarmingCampaignId = null;
        addLog('Switched to GLOBAL auto-farm.', 'system');
        updateMasterAutoFarmUI();
        runMasterFarmLoop();
    };
}

if (btnStopMaster) {
    btnStopMaster.onclick = () => {
        masterAutoFarmEnabled = false;

        // Use the existing comprehensive stop helper
        stopFarmAction();

        currentFarmCampaignId = null;
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

            // Cross-check: Was it awarded during THIS campaign period?
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
 * Comprehensive campaign validation
 * Returns { isValid: boolean, reason: string }
 */
function validateCampaign(c, inventory = null) {
    if (!c) return { isValid: false, reason: 'No campaign data' };
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

    // 6. Smart Feasibility Check (Time remaining vs required progress)
    const minutesLeft = (end.getTime() - now.getTime()) / (1000 * 60);

    // If we have inventory data, check if any drop is actually achievable
    if (inventory) {
        const ipCamp = inventory.dropCampaignsInProgress?.find(ip => ip.id === c.id);

        const canFinishSomething = c.timeBasedDrops.some(drop => {
            // Skip claimed
            if (drop.self?.isClaimed) return false;

            // Find current progress
            const ipDrop = ipCamp?.timeBasedDrops?.find(d => d.id === drop.id);
            const currentMins = ipDrop?.self?.currentMinutesWatched || drop.self?.currentMinutesWatched || 0;
            const remainingMins = (drop.requiredMinutesWatched || 0) - currentMins;

            // Returns true if we have enough minutes left in campaign
            return minutesLeft >= remainingMins;
        });

        if (!canFinishSomething) {
            return { isValid: false, reason: 'Impossible to complete (Too little time left)' };
        }
    } else {
        // Fallback: If no inventory provided, just check if campaign end is > 5m
        if (minutesLeft < 5) return { isValid: false, reason: 'Campaign ending in < 5m' };
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

let isFarmingLoopBusy = false;

async function runMasterFarmLoop() {
    if (!masterAutoFarmEnabled || isFarmingLoopBusy) return;

    // Safety check: if campaigns aren't loaded yet, try to load them first
    if (!allCampaigns || allCampaigns.length === 0) {
        if (!isFetchingCampaigns) fetchAndUpdateCampaigns();
        return;
    }

    isFarmingLoopBusy = true;
    console.log('[AutoFarm] Starting decision cycle...');

    try {

        console.log('[AutoFarm] Loop running. Eligible games: ' + (allCampaigns?.length || 0));

        // Triple-check: Get FRESH inventory before making decisions
        const inventoryRes = await window.electronAPI.getInventory(accountTokens);
        const inventory = inventoryRes?.data?.currentUser?.inventory;
        const now = Date.now();
        const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim().toLowerCase());

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
                                statusArea.innerHTML = `<span style="color: var(--warning); font-size: 11px; opacity: 0.8;">⏳ Stall check: ${rem}s / ${Math.round(th / 1000)}s</span>`;
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

        // NEW: Persistent Farming Rule - Stick to what we started!
        const activeCamp = allCampaigns.find(c => c.id === activeFarmingCampaignId);
        if (activeCamp && !manualOverrideId) {
            const isFinished = isCampaignFinished(activeCamp, inventory);
            const isValid = validateCampaign(activeCamp, inventory).isValid;

            if (!isFinished && isValid) {
                // Check if we are stalled. If not stalled, STAY on this campaign.
                const stats = progressionTracker[activeCamp.id];
                const threshold = stats?.mins === -1 ? 45 * 1000 : 2 * 60 * 1000;
                const elapsed = now - (stats?.time || 0);

                if (elapsed < threshold) {
                    // Not stalled and not finished -> KEEP FARMING
                    return;
                }
            }

            // If we reach here, the campaign is either Finished, Stalled, or Invalid (Ended)
            if (isFinished) addLog(`[AutoFarm] ${activeCamp.game?.displayName} fully finished! Searching for new tasks...`, 'success');
            activeFarmingCampaignId = null;
        }

        // 2. Find eligible campaigns (ACTIVE)
        let eligible = [];

        if (farmAllMode) {
            // Mode: Farm EVERYTHING active, watchable and unfinished
            eligible = allCampaigns.filter(c =>
                c.status === 'ACTIVE' &&
                validateCampaign(c, inventory).isValid &&
                !isCampaignFinished(c, inventory) &&
                !ignoredCampaignIds.includes(c.id) &&
                (!stallBlacklist[c.id] || now > stallBlacklist[c.id])
            );

            // RE-SORT by current UI mode or default to Viewers
            if (campaignSortMode === 'endDate') {
                eligible.sort((a, b) => new Date(a.endAt) - new Date(b.endAt));
            } else {
                eligible.sort((a, b) => (b.game?.viewersCount || 0) - (a.game?.viewersCount || 0));
            }
            
            if (eligible.length > 0) {
                const topStr = eligible.slice(0, 3).map(e => `${e.game?.displayName} (${e.game?.viewersCount || 0} viewers)`).join(', ');
                console.log(`[AutoFarm] Top 3 Candidates: ${topStr}`);
            }
        } else {
            // Mode: Priority only
            for (const name of savedList) {
                const matchingCamps = allCampaigns.filter(c =>
                    c.game?.displayName?.toLowerCase() === name &&
                    c.status === 'ACTIVE' &&
                    !ignoredCampaignIds.includes(c.id) &&
                    (!stallBlacklist[c.id] || now > stallBlacklist[c.id])
                );
                for (const camp of matchingCamps) {
                    if (validateCampaign(camp, inventory).isValid) {
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

        // Redundant sort removed. Global Mode and Priority Mode already handled sorting.

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
            if (activeFarmingCampaignId !== targetCampaign.id) {
                const reason = farmAllMode ? "highest priority (Global Mode)" : "next in priority list";
                addLog(`Auto-Farm: Switching to ${targetCampaign.game?.displayName} — ${reason}`, 'system');

                // 1. STOP previous session in background
                stopFarmAction();

                // 2. Clear old state
                activeFarmingCampaignId = targetCampaign.id;
                activeFarmingChannelLogin = null;

                // 3. START new worker IMMEDIATELY (no timeout)
                if (masterAutoFarmEnabled) {
                    startFarmAction(targetCampaign, true);
                }
            } else {
                // Just update percentages if we are staying on the same game
                startFarmingSimulation(targetCampaign, false, true, 'farmPanel');
            }
        }
    } catch (err) {
        console.error("Farming loop error:", err);
    } finally {
        isFarmingLoopBusy = false;
    }
}

async function fetchAndUpdateCampaigns() {
    if (!accountTokens) return false;
    if (isFetchingCampaigns) return false;

    isFetchingCampaigns = true;
    updateMasterAutoFarmUI();

    try {
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

        let userData;
        if (Array.isArray(response)) {
            userData = response[0]?.data?.currentUser;
        } else {
            userData = response?.data?.currentUser;
        }

        if (!userData) {
            console.warn("No userData found", response);
            return false;
        }

        const rawCampaigns = userData.dropCampaigns || [];
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
        }

        const invRes = await window.electronAPI.getInventory(accountTokens);
        const inProgressMap = new Map();
        const eventDropsMap = new Map();

        if (invRes && invRes.data) {
            const inventory = invRes.data.currentUser?.inventory;
            const inProgress = inventory?.dropCampaignsInProgress || [];
            for (const ip of inProgress) inProgressMap.set(ip.id, ip);
            const eventDrops = inventory?.gameEventDrops || [];
            for (const ed of eventDrops) {
                if (ed.id && ed.lastAwardedAt) eventDropsMap.set(ed.id, new Date(ed.lastAwardedAt));
            }
        }

        let finalCampaigns = [];
        for (const c of rawCampaigns) {
            if (!c) continue;
            const validation = validateCampaign(c, null);
            if (!validation.isValid) continue;

            const start = new Date(c.startAt);
            const end = new Date(c.endAt);
            const drops = (c.timeBasedDrops || []).filter(d => (d.requiredMinutesWatched || 0) > 0);
            if (drops.length === 0) continue;

            c.timeBasedDrops = drops;
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
                let claimedDuringCampaign = false;
                for (const d of c.timeBasedDrops) {
                    const benefitId = d.benefitEdges?.[0]?.benefit?.id;
                    if (benefitId && eventDropsMap.has(benefitId)) {
                        const awardedAt = eventDropsMap.get(benefitId);
                        if (awardedAt >= start && awardedAt <= end) { claimedDuringCampaign = true; break; }
                    }
                }
                for (const d of c.timeBasedDrops) {
                    if (!d.self) d.self = {};
                    d.self.isClaimed = !!claimedDuringCampaign;
                    d.self.currentMinutesWatched = claimedDuringCampaign ? d.requiredMinutesWatched : 0;
                }
            }
            finalCampaigns.push(c);
        }

        allCampaigns = finalCampaigns;
        allCampaigns.sort((a, b) => (b.game?.viewersCount || 0) - (a.game?.viewersCount || 0));
        filteredCampaigns = [...allCampaigns];

        const statsCount = document.getElementById('statsCampaignsCount');
        if (statsCount) statsCount.innerText = allCampaigns.length;

        renderCampaignsList();
        renderPriorityChips();
        renderPriorityGrid(autoFarmSearch ? autoFarmSearch.value : '');

        const farmPanel = document.getElementById('farmPanel');
        if (farmPanel && allCampaigns.length > 0) {
            // Only update UI if we are already farming or viewing something specific
            let targetId = activeFarmingCampaignId || currentFarmCampaignId;
            if (targetId) {
                const target = allCampaigns.find(c => c.id === targetId);
                if (target) {
                    const isSameAsViewed = (currentFarmCampaignId === target.id);
                    startFarmingSimulation(target, false, isSameAsViewed, 'farmPanel');
                }
            } else {
                renderIdlePlaceholder();
            }
        }

        if (autoClaimEnabled) processAutoClaims();
        return true;
    } catch (err) {
        console.error("Critical error in fetchAndUpdateCampaigns:", err);
        return false;
    } finally {
        isFetchingCampaigns = false;
        updateMasterAutoFarmUI();
        if (masterAutoFarmEnabled) runMasterFarmLoop();
    }
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
    } catch (e) {
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
        renderIdlePlaceholder();
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
            tokenProcessingStarted = true;
            processTokens(accountTokens);
        } else if (data.integrity && !hadIntegrity) {
            // If we just got our first integrity token, force a refresh
            console.log("Integrity token captured, refreshing campaigns...");
            fetchAndUpdateCampaigns();
        }
    }
});

// Set a recurring loop for fast decision making (every 10s)
setInterval(() => {
    if (masterAutoFarmEnabled) runMasterFarmLoop();
}, 10000);

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
                activeFarmingCampaignId = null; // Clean start!
                addLog('Global Farm mode activated.', 'system');
                updateMasterAutoFarmUI();
                btnNavDashboard.click();

                // Trigger immediately! If allCampaigns is empty, it will wait for the fetch.
                runMasterFarmLoop();
                fetchAndUpdateCampaigns();
            }
        };
    }

    renderCampaignsListItems();
}

function renderCampaignsListItems() {
    const campaignsContainer = document.getElementById('campaignsContainer');
    if (!campaignsContainer) return;

    const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim().toLowerCase());

    try {
        // Apply manual sorting choice
        filteredCampaigns.sort((a, b) => {
            if (campaignSortMode === 'viewers') {
                const vA = a.game?.viewersCount || 0;
                const vB = b.game?.viewersCount || 0;
                return vB - vA;
            } else {
                const endA = a.endAt ? new Date(a.endAt).getTime() : 0;
                const endB = b.endAt ? new Date(b.endAt).getTime() : 0;
                return (endA || 0) - (endB || 0);
            }
        });

        // Clear existing campaigns grid
        while (campaignsContainer.firstChild) {
            campaignsContainer.removeChild(campaignsContainer.firstChild);
        }

        if (filteredCampaigns.length === 0) {
            campaignsContainer.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">No campaigns found.</p>';
            return;
        }

        let renderedCount = 0;
        filteredCampaigns.forEach(c => {
            try {
                if (!c || !c.game) return;

                renderedCount++;
                const imgUrl = getGameImageUrl(c.game, 144, 192);
                const totalDrops = c.timeBasedDrops?.length || 0;
                const claimedDrops = c.timeBasedDrops?.filter(d => d.self?.isClaimed).length || 0;

                const isFinished = c.timeBasedDrops?.every(d => d.self?.isClaimed) || false;
                const isPriority = savedList.includes(c.game?.displayName?.toLowerCase() || '');
                const isIgnored = ignoredCampaignIds.includes(c.id);
                const card = document.createElement('div');
                card.className = 'campaign-card fade-in';
                card.onclick = () => startFarmingSimulationById(c.id, false);

                if (isFinished) {
                    card.style.opacity = '0.35';
                    card.style.filter = 'grayscale(0.8)';
                } else if (isIgnored) {
                    card.style.opacity = '0.2';
                    card.style.filter = 'grayscale(1)';
                } else if (isPriority) {
                    card.style.borderColor = 'var(--success)';
                    card.style.boxShadow = '0 0 10px rgba(0, 230, 118, 0.1)';
                }

                const endDate = new Date(c.endAt);
                const day = String(endDate.getDate()).padStart(2, '0');
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                const endStr = `${day}.${month}`;
                const statusLabel = isFinished
                    ? '<span style="color:var(--success); font-weight:700;">COMPLETED</span>'
                    : isIgnored ? '<span style="color:var(--text-secondary); opacity:0.6;">IGNORED</span>' : `<span style="color:var(--warning);">Ends ${endStr}</span>`;

                // Calculate aggregate progress
                let totalReq = 0;
                let totalWatched = 0;
                (c.timeBasedDrops || []).forEach(d => {
                    const req = d.requiredMinutesWatched || 1;
                    totalReq += req;
                    totalWatched += d.self?.isClaimed ? req : (d.self?.currentMinutesWatched || 0);
                });
                const totalPercent = totalReq > 0 ? Math.min(100, Math.floor((totalWatched / totalReq) * 100)) : 0;
                const barColor = isFinished ? 'var(--success)' : (isIgnored ? '#444' : 'var(--accent-color)');

                card.innerHTML = `
          <div style="display:flex; gap:12px; padding:12px; position: relative;">
            <button class="btn-ignore-campaign" title="${isIgnored ? 'Unignore' : 'Ignore Campaign'}" onclick="event.stopPropagation(); toggleIgnoreCampaign('${c.id}')">
                ${isIgnored ? '✖' : '🚫'}
            </button>
            <img src="${imgUrl}" style="width:48px; height:64px; border-radius:8px; object-fit:cover; flex-shrink:0; background:#2a2a2e; ${isFinished || isIgnored ? 'filter: grayscale(1);' : ''}" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg'"/>
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700; font-size:14px; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${c.game?.displayName}">${c.game?.displayName}</div>
              <div style="font-size:12px; margin-top:2px;">${statusLabel}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">${totalDrops} Items · ${claimedDrops} Claimed</div>
              
              <div style="margin-top: 6px; height: 4px; width: 100%; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden;">
                  <div style="height: 100%; width: ${totalPercent}%; background: ${barColor}; border-radius: 2px; transition: width 0.3s ease;"></div>
              </div>
            </div>
          </div>
        `;
                campaignsContainer.appendChild(card);
            } catch (err) {
                console.error("Error drawing campaign card:", err);
            }
        });
    } catch (globalErr) {
        addLog(`UI Rendering failed: ${globalErr.message}`, 'error');
        console.error(globalErr);
    }
}

function stopFarmAction(campaign) {
    addLog(`Stopping farm session...`, 'system');
    window.electronAPI.stopFarm();
    currentFarmingChannelId = null;
    activeFarmingCampaignId = null;
    activeFarmingChannelLogin = null;
    manualOverrideId = null;
    window.electronAPI.updateTrayTooltip('Idle');

    const farmStatus = document.getElementById('farmStatus');
    if (farmStatus) farmStatus.innerText = 'Idle';

    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    if (btnRunFarm) btnRunFarm.style.display = 'block';
    if (btnStopFarm) btnStopFarm.style.display = 'none';

    const stallStatus = document.getElementById('stallStatus');
    if (stallStatus) stallStatus.innerHTML = '';

    if (campaign) startFarmingSimulation(campaign);
}

async function startFarmAction(campaign, isAuto = false) {
    // Update the Dashboard view immediately to ensure UI responsiveness
    startFarmingSimulation(campaign, false, false, 'farmPanel');

    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const farmStatus = document.getElementById('farmStatus');

    if (btnRunFarm) btnRunFarm.style.display = 'none';
    if (btnStopFarm) btnStopFarm.style.display = 'block';

    if (farmStatus) farmStatus.innerHTML = `<span style="color: var(--text-secondary);">🔍 Searching for streamer...</span>`;

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

        // SYNC UI: Now that we found a streamer, ensure Dashboard shows this campaign
        if (masterAutoFarmEnabled) {
            startFarmingSimulation(campaign, false, false, 'farmPanel');
        }

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

    // Look for /channelname patterns, ensuring they are preceded by whitespace to avoid false positives
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
    if (campaign) {
        if (autoStart) {
            btnNavDashboard.click();
            startFarmingSimulation(campaign, true);
        } else {
            // Just PREVIEW in the campaigns tab
            previewCampaignId = campaign.id;
            const previewEl = document.getElementById('previewPanel');
            if (previewEl) previewEl.style.display = 'block';
            startFarmingSimulation(campaign, false, false, 'previewPanel');
        }
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

function startFarmingSimulation(campaign, autoStart = false, updateOnly = false, targetPanelId = 'farmPanel') {
    if (targetPanelId === 'farmPanel') {
        if (!updateOnly) currentFarmCampaignId = campaign.id;
    } else {
        previewCampaignId = campaign.id;
    }

    const targetPanel = document.getElementById(targetPanelId);
    if (!targetPanel) return;

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
        const isFarmingThis = (activeFarmingCampaignId === campaign.id);
        const isDashboard = (targetPanelId === 'farmPanel');

        targetPanel.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 20px;">
            <div id="gameHeaderUIArea" style="display: flex; align-items: center; gap: 20px; width: 100%; max-width: 600px;">
                <img src="${getGameImageUrl(campaign.game, 120, 160)}" style="width: 80px; height: 106px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);" />
                <div style="flex: 1;">
                    <h2 style="margin: 0 0 5px 0; font-size: ${isDashboard ? '22px' : '18px'};">${campaign.game?.displayName}</h2>
                    <p style="color: var(--text-secondary); font-size: 13px; margin: 0 0 15px 0;">Status: <b>${campaign.status}</b></p>
                    
                    <div id="farmingControlsArea" style="display: flex; align-items: center; gap: 12px;">
                        ${isDashboard ? '<button id="btnPrevGame" class="btn-secondary" style="padding: 8px 12px; font-size: 14px;">◀</button>' : ''}
                        
                        <div id="mainActionArea">
                            <button id="btnRunFarm" class="btn-primary" style="width: 140px; height: 38px; display: ${isFarmingThis ? 'none' : 'block'};">Start Farming</button>
                            <button id="btnStopFarm" class="btn-outline" style="display: ${isFarmingThis ? 'block' : 'none'}; width: 140px; height: 38px; color: var(--danger); border-color: var(--danger);">Stop Farming</button>
                        </div>

                        ${isDashboard ? '<button id="btnNextGame" class="btn-secondary" style="padding: 8px 12px; font-size: 14px;">▶</button>' : ''}
                    </div>
                </div>
            </div>
            ${isFarmingThis ? `
                <div id="farmStatus" style="margin-top: 15px; font-size: 13px; color: #00e676;">✅ Watching <b>${activeFarmingChannelLogin || '...'}</b></div>
                <div id="stallStatus" style="margin-top: 4px; height: 16px;"></div>
            ` : `
                <div id="farmStatus" style="margin-top: 15px; font-size: 13px; color: var(--text-secondary);">Select the channel to start farming...</div>
            `}
        </div>
        <div id="dropItemsList" style="width: 100%; max-width: 600px;">
            ${itemsHtml}
        </div>
    `;

        const btnRunFarm = targetPanel.querySelector('#btnRunFarm');
        const btnStopFarm = targetPanel.querySelector('#btnStopFarm');
        const btnPrevGame = targetPanel.querySelector('#btnPrevGame');
        const btnNextGame = targetPanel.querySelector('#btnNextGame');

        if (btnRunFarm) btnRunFarm.onclick = () => {
            if (targetPanelId === 'previewPanel') btnNavDashboard.click();
            startFarmAction(campaign);
        };
        if (btnStopFarm) btnStopFarm.onclick = () => stopFarmAction(campaign);
        if (btnPrevGame) btnPrevGame.onclick = () => cycleCampaign(-1);
        if (btnNextGame) btnNextGame.onclick = () => cycleCampaign(1);
    } else {
        // Partial update (updateOnly=true)
        const list = targetPanel.querySelector('#dropItemsList');
        if (list) list.innerHTML = itemsHtml;

        const statusText = targetPanel.querySelector('#farmStatus');
        if (statusText && isFarmingThis) {
            statusText.innerHTML = `✅ Watching <b>${activeFarmingChannelLogin || '...'}</b>`;
        }
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

async function renderInventory() {
    const container = document.getElementById('inventoryContainer');
    if (!container) return;

    if (!accountTokens) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-secondary);">Connect your account to view inventory.</div>';
        return;
    }

    // Refresh inventory data
    const res = await window.electronAPI.getInventory(accountTokens);
    const inProgress = res?.data?.currentUser?.inventory?.dropCampaignsInProgress || [];
    const history = res?.data?.currentUser?.inventory?.gameEventDrops || [];

    if (history.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-secondary);">No claimed drops found in your history.</div>';
        return;
    }

    // 1. Map benefit IDs to images from ALL available sources (current campaigns + in-progress)
    const itemImageMap = new Map();
    const allKnownCampaigns = [...allCampaigns, ...inProgress];

    allKnownCampaigns.forEach(c => {
        c.timeBasedDrops?.forEach(d => {
            d.benefitEdges?.forEach(be => {
                if (be.benefit?.id && be.benefit?.imageAssetURL) {
                    itemImageMap.set(be.benefit.id, be.benefit.imageAssetURL);
                }
            });
        });
    });

    // 2. Grouping & finding most recent date per game
    const groups = {}; // { gameName: { img, maxDate, rewards: [] } }

    history.forEach(item => {
        let gameName = "Other Rewards";
        let gameBoxArt = "";

        // Find matching campaign for game info
        const camp = allKnownCampaigns.find(c => c.timeBasedDrops?.some(d => d.benefitEdges?.some(be => be.benefit?.id === item.id)));
        if (camp) {
            gameName = camp.game?.displayName || gameName;
            gameBoxArt = getGameImageUrl(camp.game, 60, 80);
        }

        const awardDate = new Date(item.lastAwardedAt);
        if (!groups[gameName]) {
            groups[gameName] = { img: gameBoxArt, maxDate: awardDate, rewards: [] };
        }
        if (awardDate > groups[gameName].maxDate) groups[gameName].maxDate = awardDate;

        groups[gameName].rewards.push({
            ...item,
            image: itemImageMap.get(item.id) || null
        });
    });

    // 3. Sorting groups: Identified games by recency, "Other" ALWAYS at the bottom
    const sortedGroupNames = Object.keys(groups).sort((a, b) => {
        const otherName = "Other Rewards";
        if (a === otherName && b !== otherName) return 1;
        if (a !== otherName && b === otherName) return -1;
        return groups[b].maxDate - groups[a].maxDate;
    });

    container.innerHTML = sortedGroupNames.map(gn => {
        const group = groups[gn];
        // Sort rewards within group (Newest First)
        const rewardsSorted = group.rewards.sort((a, b) => new Date(b.lastAwardedAt) - new Date(a.lastAwardedAt));

        const rewardsHtml = rewardsSorted.map(r => {
            const d = new Date(r.lastAwardedAt);
            const dateStr = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getFullYear()).slice(-2)}`;
            const itemIcon = r.image
                ? `<img src="${r.image}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: contain; background: rgba(0,0,0,0.3); margin-bottom: 8px;">`
                : `<div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 24px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px;">🎁</div>`;

            return `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; text-align: center; overflow: hidden; min-width: 0;" class="inventory-tile">
                    ${itemIcon}
                    <div style="font-size: 11px; color: #fff; font-weight: 600; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;" title="${r.name}">${r.name}</div>
                    <div style="font-size: 9px; color: var(--text-secondary); opacity: 0.6;">${dateStr}</div>
                </div>
            `;
        }).join('');

        const gameCover = group.img
            ? `<img src="${group.img}" style="width: 52px; height: 70px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 6px 15px rgba(0,0,0,0.5);">`
            : `<div style="width: 52px; height: 70px; background: linear-gradient(135deg, #444, #222); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(255,255,255,0.1);">🎮</div>`;

        return `
            <div class="farm-panel" style="margin-bottom: 30px; padding: 25px; border: 1px solid rgba(191,148,255,0.12); background: rgba(255,255,255,0.025); border-radius: 18px; align-items: stretch; display: block; width: 100%;">
                <div style="display: flex; gap: 22px; align-items: center; margin-bottom: 25px;">
                    ${gameCover}
                    <div style="flex: 1; min-width: 0;">
                        <h3 style="margin: 0; font-size: 22px; color: var(--accent-color); font-weight: 800; letter-spacing: -0.6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${gn}</h3>
                        <p style="margin: 4px 0 0; font-size: 13px; color: var(--text-secondary); opacity: 0.8; display: flex; align-items: center; gap: 6px;">
                           <span style="color: var(--success); font-size: 8px;">●</span> Collected ${group.rewards.length} Drops
                        </p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; width: 100%;">
                    ${rewardsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function renderIdlePlaceholder() {
    const farmPanel = document.getElementById('farmPanel');
    if (!farmPanel) return;

    if (activeFarmingCampaignId) return;

    farmPanel.innerHTML = `
        <div class="empty-state fade-in" style="text-align: center;">
            <div class="icon" style="font-size: 54px; margin-bottom: 25px; opacity: 0.9; filter: drop-shadow(0 0 15px rgba(145, 70, 255, 0.4));">🎮</div>
            <h2 style="margin-bottom: 12px; font-size: 24px; font-weight: 800; color: white;">Ready to Farm</h2>
            <p style="color: var(--text-secondary); max-width: 340px; margin: 0 auto 30px; line-height: 1.6; font-size: 14px;">
                Your bot is standing by. Activate <b>Global Mode</b> or select a specific game from the <b>Campaigns</b> tab to start earning rewards.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button class="btn-primary" onclick="document.getElementById('btnNavCampaigns').click()" style="width: auto; padding: 12px 24px; border-radius: 12px; font-size: 14px;">Browse Campaigns</button>
            </div>
        </div>
    `;
}
