const ICONS = {
    zap: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-zap"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    star: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#fbbf24" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    eye: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="#38bdf8"/></svg>`,
    gear: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-gear"><circle cx="12" cy="12" r="3" fill="rgba(192, 132, 252, 0.3)" stroke="#c084fc" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    gamepad: (size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-gamepad"><rect x="2" y="6" width="20" height="12" rx="6" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" stroke-width="2"/><line x1="6" y1="12" x2="10" y2="12" stroke="#e0e7ff" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="10" x2="8" y2="14" stroke="#e0e7ff" stroke-width="2" stroke-linecap="round"/><circle cx="15" cy="13" r="1.2" fill="#f43f5e"/><circle cx="17.5" cy="10.5" r="1.2" fill="#38bdf8"/></svg>`,
    clock: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-clock"><circle cx="12" cy="12" r="10" fill="rgba(249, 115, 22, 0.18)" stroke="#fb923c" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/></svg>`,
    gift: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-gift"><rect x="3" y="11" width="18" height="11" rx="2" fill="rgba(244, 63, 94, 0.22)" stroke="#f43f5e" stroke-width="2"/><rect x="2" y="7" width="20" height="4" rx="1" fill="#f43f5e"/><path d="M12 7v15" stroke="#fbbf24" stroke-width="2"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" fill="none" stroke="#fbbf24" stroke-width="2"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" fill="none" stroke="#fbbf24" stroke-width="2"/></svg>`,
    tag: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="7" r="1.5" fill="#34d399"/></svg>`,
    ban: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-ban"><circle cx="12" cy="12" r="10" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="2"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#ef4444" stroke-width="2.5"/></svg>`,
    lock: (size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-lock"><rect x="3" y="11" width="18" height="11" rx="2" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>`,
    copy: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-copy"><rect x="9" y="9" width="13" height="13" rx="2" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#38bdf8" stroke-width="2" fill="none"/></svg>`,
    tv: (size = 36) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-tv"><rect x="2" y="7" width="20" height="15" rx="2" fill="rgba(145, 70, 255, 0.25)" stroke="#a855f7" stroke-width="2"/><polyline points="17 2 12 7 7 2" stroke="#c084fc" stroke-width="2" stroke-linecap="round"/></svg>`,
    link: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><polyline points="15 3 21 3 21 9" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
    search: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-search"><circle cx="11" cy="11" r="8" fill="rgba(129, 140, 248, 0.2)" stroke="#818cf8" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    check: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-check"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    warn: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-warn"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    error: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-error"><circle cx="12" cy="12" r="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/></svg>`,
    info: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-info"><circle cx="12" cy="12" r="10" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    spinner: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon spin"><circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3"/><path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/></svg>`,
    stop: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-stop"><rect x="6" y="6" width="12" height="12" rx="2" fill="#ef4444" stroke="#f87171" stroke-width="1"/></svg>`,
    skip: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="svg-icon icon-skip"><polygon points="5 4 15 12 5 20 5 4" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" stroke-width="2" stroke-linejoin="round"/><line x1="19" y1="5" x2="19" y2="19" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/></svg>`
};

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
let ignoredGameNames = JSON.parse(localStorage.getItem('ignoredGameNames') || '[]');
let ignoredCampaignIds = JSON.parse(localStorage.getItem('ignoredCampaignIds') || '[]');

function encodeGameParam(str) {
    if (!str) return '';
    return encodeURIComponent(str).replace(/'/g, "%27").replace(/"/g, "%22");
}

function decodeGameParam(str) {
    if (!str) return '';
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Toast Notification System
const recentToasts = new Map();

function showToast(msg, type = 'info', duration = 3500) {
    const container = getEl('toastContainer');
    if (!container) return;
    
    const now = Date.now();
    const key = `${type}:${msg}`;
    if (recentToasts.has(key) && (now - recentToasts.get(key) < 2000)) {
        return; // Suppress duplicate notification within 2 seconds
    }
    recentToasts.set(key, now);
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = ICONS.info(16);
    if (type === 'success') icon = ICONS.check(16);
    if (type === 'warn') icon = ICONS.warn(16);
    if (type === 'error') icon = ICONS.error(16);
    
    toast.innerHTML = `
        <div class="toast-content">
            <span style="display: inline-flex; align-items: center;">${icon}</span>
            <span>${msg}</span>
        </div>
        <button class="toast-close" title="Close">✕</button>
        <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;
    
    container.appendChild(toast);

    // Trigger smooth entrance transition on next animation frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
        });
    });

    let autoTimer = null;
    let isClosing = false;

    const dismiss = () => {
        if (isClosing) return;
        isClosing = true;
        if (autoTimer) clearTimeout(autoTimer);
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 400);
    };

    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dismiss();
        });
    }

    toast.addEventListener('click', dismiss);

    autoTimer = setTimeout(dismiss, duration);
}

function toggleIgnoreCampaign(id) {
    if (!id) return;
    if (ignoredCampaignIds.includes(id)) {
        ignoredCampaignIds = ignoredCampaignIds.filter(i => i !== id);
        showToast('Campaign unignored', 'info');
    } else {
        ignoredCampaignIds.push(id);
        showToast('Campaign ignored', 'warn');
    }
    localStorage.setItem('ignoredCampaignIds', JSON.stringify(ignoredCampaignIds));
    renderCampaignsListItems();
}

window.toggleIgnoreCampaign = toggleIgnoreCampaign;

function toggleIgnoreGame(gameNameOrEncoded) {
    const gameName = decodeGameParam(gameNameOrEncoded);
    if (!gameName) return;
    const nameLower = gameName.toLowerCase();
    
    if (ignoredGameNames.includes(nameLower)) {
        ignoredGameNames = ignoredGameNames.filter(i => i !== nameLower);
        showToast(`Unbanned ${gameName}`, 'info');
    } else {
        ignoredGameNames.push(nameLower);
        showToast(`Banned ${gameName}`, 'warn');
    }
    localStorage.setItem('ignoredGameNames', JSON.stringify(ignoredGameNames));
    renderCampaignsListItems();
    renderBannedGames();
    
    const currentActiveCamp = allCampaigns?.find(c => c.id === activeFarmingCampaignId);
    if (currentActiveCamp && currentActiveCamp.game?.displayName?.toLowerCase() === nameLower) {
        addLog(`[Ignore] Current farming game banned. Choosing next candidate...`, 'warn');
        if (masterAutoFarmEnabled && farmAllMode) {
             cycleCampaign(1, true);
        } else {
             stopFarmAction(currentActiveCamp);
        }
    }
}

function clearIgnoredGames() {
    ignoredGameNames = [];
    localStorage.setItem('ignoredGameNames', '[]');
    renderCampaignsListItems();
    renderBannedGames();
    addLog(`[Ignore] Cleared all banned games.`, 'system');
    showToast('Cleared all banned games', 'info');
}

function renderBannedGames() {
    const container = document.getElementById('bannedGamesChips');
    if (!container) return;
    
    if (ignoredGameNames.length === 0) {
        container.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px; font-style: italic; align-self: center;">No games are currently banned.</span>';
        return;
    }
    
    container.innerHTML = ignoredGameNames.map(name => {
        const camp = allCampaigns.find(c => c.game?.displayName?.toLowerCase() === name.toLowerCase());
        const miniImg = getGameImageUrl(camp?.game, 36, 48);
        const imgTag = miniImg ? `<img src="${miniImg}" style="width:18px; height:24px; border-radius:3px; object-fit:cover;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-36x48.jpg'">` : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/></svg>';
        
        return `<div class="game-chip" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); color: var(--text-primary); padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;" onclick="toggleIgnoreGame('${encodeGameParam(name)}')">
            ${imgTag}
            <span>${escapeHtml(name)}</span>
            <span style="display: flex; align-items: center; justify-content: center; color: var(--danger); margin-left: 2px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
        </div>`;
    }).join('');
}

window.toggleIgnoreGame = toggleIgnoreGame;
window.clearIgnoredGames = clearIgnoredGames;

let campaignSortMode = 'viewers';
const btnSortViewers = getEl('btnSortViewers');
const btnSortEnd = getEl('btnSortEnd');

function updateSortUI() {
    if (!btnSortViewers || !btnSortEnd) return;
    if (campaignSortMode === 'viewers') {
        btnSortViewers.style.background = 'var(--accent-light)';
        btnSortViewers.style.borderColor = 'var(--accent-color)';
        btnSortViewers.style.color = 'var(--accent-hover)';
        btnSortEnd.style.background = 'transparent';
        btnSortEnd.style.borderColor = 'var(--border-color)';
        btnSortEnd.style.color = 'var(--text-secondary)';
    } else {
        btnSortEnd.style.background = 'var(--accent-light)';
        btnSortEnd.style.borderColor = 'var(--accent-color)';
        btnSortEnd.style.color = 'var(--accent-hover)';
        btnSortViewers.style.background = 'transparent';
        btnSortViewers.style.borderColor = 'var(--border-color)';
        btnSortViewers.style.color = 'var(--text-secondary)';
    }
}

if (btnSortViewers) btnSortViewers.onclick = () => { campaignSortMode = 'viewers'; updateSortUI(); renderCampaignsListItems(); };
if (btnSortEnd) btnSortEnd.onclick = () => { campaignSortMode = 'endDate'; updateSortUI(); renderCampaignsListItems(); };

let currentCategory = 'drops';
let hidePaidBadges = true;

const btnCatDrops = getEl('btnCatDrops');
const btnCatBadges = getEl('btnCatBadges');
const btnHidePaid = getEl('btnHidePaid');

function updateCategoryUI() {
    if (!btnCatDrops || !btnCatBadges) return;
    if (currentCategory === 'drops') {
        btnCatDrops.style.background = 'var(--accent-light)';
        btnCatDrops.style.borderColor = 'var(--accent-color)';
        btnCatDrops.style.color = 'var(--accent-hover)';
        btnCatBadges.style.background = 'transparent';
        btnCatBadges.style.borderColor = 'var(--border-color)';
        btnCatBadges.style.color = 'var(--text-secondary)';
    } else {
        btnCatBadges.style.background = 'var(--accent-light)';
        btnCatBadges.style.borderColor = 'var(--accent-color)';
        btnCatBadges.style.color = 'var(--accent-hover)';
        btnCatDrops.style.background = 'transparent';
        btnCatDrops.style.borderColor = 'var(--border-color)';
        btnCatDrops.style.color = 'var(--text-secondary)';
    }
    if (btnHidePaid) btnHidePaid.style.display = currentCategory === 'badges' ? 'inline-flex' : 'none';
    const btnFarmAll = getEl('btnFarmAll');
    if (btnFarmAll) btnFarmAll.style.display = currentCategory === 'drops' ? 'inline-flex' : 'none';
}

function updateHidePaidUI() {
    if (!btnHidePaid) return;
    if (hidePaidBadges) {
        btnHidePaid.innerHTML = `${ICONS.ban(12)} Hide Paid`;
        btnHidePaid.style.background = 'var(--accent-light)';
        btnHidePaid.style.borderColor = 'var(--accent-color)';
        btnHidePaid.style.color = 'var(--accent-hover)';
    } else {
        btnHidePaid.innerHTML = `${ICONS.eye(12)} Show All`;
        btnHidePaid.style.background = 'transparent';
        btnHidePaid.style.borderColor = 'var(--border-color)';
        btnHidePaid.style.color = 'var(--text-secondary)';
    }
}

function applyCurrentFilters() {
    const searchVal = document.getElementById('campaignSearch')?.value?.toLowerCase() || '';
    
    const clearBtn = getEl('btnClearCampaignSearch');
    if (clearBtn) clearBtn.style.display = searchVal ? 'flex' : 'none';

    filteredCampaigns = allCampaigns.filter(c => {
        const matchesCategory = currentCategory === 'drops' ? !c.isBadgeOrQuest : c.isBadgeOrQuest;
        const matchesSearch = !searchVal || c.game?.displayName?.toLowerCase().includes(searchVal);
        const matchesPaid = !(currentCategory === 'badges' && hidePaidBadges && c._badgePaid);
        const matchesViewers = minViewersThreshold <= 0 || (c.game?.viewersCount || 0) >= minViewersThreshold;
        return matchesCategory && matchesSearch && matchesPaid && matchesViewers;
    });
    renderCampaignsListItems();
}

const btnClearCampaignSearch = getEl('btnClearCampaignSearch');
if (btnClearCampaignSearch) {
    btnClearCampaignSearch.onclick = () => {
        const input = getEl('campaignSearch');
        if (input) {
            input.value = '';
            applyCurrentFilters();
        }
    };
}

let minViewersEnabled = localStorage.getItem('minViewersEnabled') === 'true';
let minViewersLimit = parseInt(localStorage.getItem('minViewersLimit') || '1000', 10);
let minViewersThreshold = minViewersEnabled ? minViewersLimit : 0;

function updateMinViewersThresholdState() {
    minViewersThreshold = minViewersEnabled ? minViewersLimit : 0;
}

function toggleMinViewersFilter(forceState = null) {
    if (forceState !== null) {
        minViewersEnabled = forceState;
    } else {
        minViewersEnabled = !minViewersEnabled;
    }
    localStorage.setItem('minViewersEnabled', minViewersEnabled);
    updateMinViewersThresholdState();
    updateMinViewersUI();
    addLog(`[AutoFarm] Minimum viewer filter ${minViewersEnabled ? 'ENABLED (' + minViewersLimit + '+ viewers)' : 'DISABLED'}.`, 'system');
    showToast(`Min viewers filter ${minViewersEnabled ? 'enabled' : 'disabled'}`, 'info');

    applyCurrentFilters();
    if (masterAutoFarmEnabled) {
        runMasterFarmLoop();
    }
}

function setMinViewersLimit(val) {
    const parsed = Math.max(0, parseInt(val, 10) || 1000);
    minViewersLimit = parsed;
    localStorage.setItem('minViewersLimit', minViewersLimit);
    updateMinViewersThresholdState();
    updateMinViewersUI();
    addLog(`[AutoFarm] Minimum viewer limit set to ${minViewersLimit} viewers.`, 'system');
    showToast(`Min viewers threshold: ${minViewersLimit}`, 'info');

    applyCurrentFilters();
    if (masterAutoFarmEnabled) {
        runMasterFarmLoop();
    }
}

function updateMinViewersUI() {
    const pillLabel = document.getElementById('minViewersPillLabel');
    const pillBtn = document.getElementById('btnMinViewersPill');
    const sidebarLabel = document.getElementById('minViewersSidebarLabel');
    const sidebarPill = document.getElementById('btnMinViewersSidebarPill');

    const sidebarMinViewersContainer = document.getElementById('sidebarMinViewersContainer');
    const campaignsMinViewersContainer = document.getElementById('campaignsMinViewersContainer');

    if (sidebarMinViewersContainer) {
        sidebarMinViewersContainer.style.display = farmAllMode ? 'flex' : 'none';
    }
    if (campaignsMinViewersContainer) {
        campaignsMinViewersContainer.style.display = farmAllMode ? 'flex' : 'none';
    }

    const updatePill = (btn, label) => {
        if (!btn || !label) return;
        if (minViewersEnabled) {
            label.innerText = `${minViewersLimit}+`;
            btn.style.background = 'var(--accent-light)';
            btn.style.borderColor = 'var(--accent-color)';
            btn.style.color = 'white';
        } else {
            label.innerText = 'Off';
            btn.style.background = 'transparent';
            btn.style.borderColor = 'var(--border-color)';
            btn.style.color = 'var(--text-secondary)';
        }
    };

    updatePill(pillBtn, pillLabel);
    updatePill(sidebarPill, sidebarLabel);

    const settingsToggle = document.getElementById('toggleMinViewersSettings');
    if (settingsToggle) {
        settingsToggle.checked = minViewersEnabled;
    }
    const settingsInput = document.getElementById('minViewersSettingsInput');
    if (settingsInput && parseInt(settingsInput.value, 10) !== minViewersLimit) {
        settingsInput.value = minViewersLimit;
    }
    const modalInput = document.getElementById('minViewersModalInput');
    if (modalInput && parseInt(modalInput.value, 10) !== minViewersLimit) {
        modalInput.value = minViewersLimit;
    }
}

const btnMinViewersSidebarPill = document.getElementById('btnMinViewersSidebarPill');
if (btnMinViewersSidebarPill) {
    btnMinViewersSidebarPill.onclick = () => {
        toggleMinViewersFilter();
    };
}

function syncMinViewersModalPresets() {
    const input = document.getElementById('minViewersModalInput');
    if (!input) return;
    const currentVal = parseInt(input.value, 10) || 0;
    document.querySelectorAll('.btn-preset-modal-viewers').forEach(btn => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        if (val === currentVal) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function openMinViewersModal() {
    const modal = document.getElementById('minViewersModal');
    const modalInput = document.getElementById('minViewersModalInput');
    if (modalInput) {
        modalInput.value = minViewersLimit;
        syncMinViewersModalPresets();
    }
    if (modal) modal.style.display = 'flex';
}

const btnMinViewersSidebarSettings = document.getElementById('btnMinViewersSidebarSettings');
if (btnMinViewersSidebarSettings) {
    btnMinViewersSidebarSettings.onclick = () => {
        openMinViewersModal();
    };
}

const btnMinViewersPill = document.getElementById('btnMinViewersPill');
if (btnMinViewersPill) {
    btnMinViewersPill.onclick = () => {
        toggleMinViewersFilter();
    };
}

const btnMinViewersSettings = document.getElementById('btnMinViewersSettings');
if (btnMinViewersSettings) {
    btnMinViewersSettings.onclick = () => {
        openMinViewersModal();
    };
}

const btnMinViewersStepDown = document.getElementById('btnMinViewersStepDown');
const btnMinViewersStepUp = document.getElementById('btnMinViewersStepUp');
const minViewersModalInput = document.getElementById('minViewersModalInput');

if (btnMinViewersStepDown && minViewersModalInput) {
    btnMinViewersStepDown.onclick = () => {
        let current = parseInt(minViewersModalInput.value, 10) || 0;
        current = Math.max(0, current - 500);
        minViewersModalInput.value = current;
        syncMinViewersModalPresets();
    };
}

if (btnMinViewersStepUp && minViewersModalInput) {
    btnMinViewersStepUp.onclick = () => {
        let current = parseInt(minViewersModalInput.value, 10) || 0;
        current += 500;
        minViewersModalInput.value = current;
        syncMinViewersModalPresets();
    };
}

if (minViewersModalInput) {
    minViewersModalInput.addEventListener('input', syncMinViewersModalPresets);
}

const btnSaveMinViewersModal = document.getElementById('btnSaveMinViewersModal');
const btnCloseMinViewersModal = document.getElementById('btnCloseMinViewersModal');
if (btnSaveMinViewersModal) {
    btnSaveMinViewersModal.onclick = () => {
        const val = parseInt(document.getElementById('minViewersModalInput')?.value, 10) || 0;
        if (val <= 0) {
            toggleMinViewersFilter(false);
        } else {
            setMinViewersLimit(val);
            toggleMinViewersFilter(true);
        }
        const modal = document.getElementById('minViewersModal');
        if (modal) modal.style.display = 'none';
    };
}
if (btnCloseMinViewersModal) {
    btnCloseMinViewersModal.onclick = () => {
        const modal = document.getElementById('minViewersModal');
        if (modal) modal.style.display = 'none';
    };
}
document.querySelectorAll('.btn-preset-modal-viewers').forEach(btn => {
    btn.onclick = () => {
        const val = btn.getAttribute('data-val');
        const input = document.getElementById('minViewersModalInput');
        if (input) {
            input.value = val;
            syncMinViewersModalPresets();
        }
    };
});
document.querySelectorAll('.btn-preset-viewers').forEach(btn => {
    btn.onclick = () => {
        const val = btn.getAttribute('data-val');
        setMinViewersLimit(val);
        toggleMinViewersFilter(true);
    };
});
const toggleMinViewersSettings = document.getElementById('toggleMinViewersSettings');
if (toggleMinViewersSettings) {
    toggleMinViewersSettings.onchange = () => {
        toggleMinViewersFilter(toggleMinViewersSettings.checked);
    };
}

if (btnCatDrops) btnCatDrops.onclick = () => {
    currentCategory = 'drops';
    updateCategoryUI();
    applyCurrentFilters();
};

if (btnCatBadges) btnCatBadges.onclick = () => {
    currentCategory = 'badges';
    updateCategoryUI();
    applyCurrentFilters();
};

if (btnHidePaid) {
    updateHidePaidUI();
    btnHidePaid.onclick = () => {
        hidePaidBadges = !hidePaidBadges;
        updateHidePaidUI();
        applyCurrentFilters();
    };
}

let activeLogFilter = 'all';

function addLog(msg, type = 'info') {
    console.log(`[RendererLog] ${type.toUpperCase()}: ${msg}`);
    const consoleEl = getEl('logConsole');
    const time = new Date().toLocaleTimeString();
    let color = '#d1d1d1';
    let prefix = '[INFO]';

    if (type === 'system') { color = '#a25eff'; prefix = '[SYSTEM]'; }
    if (type === 'farm') { color = '#10b981'; prefix = '[FARM]'; }
    if (type === 'warn') { color = '#f59e0b'; prefix = '[WARN]'; }
    if (type === 'error') { color = '#ef4444'; prefix = '[ERROR]'; }
    if (type === 'success') { color = '#34d399'; prefix = '[SUCCESS]'; }

    if (!consoleEl) return;
    const entry = document.createElement('div');
    entry.className = `log-entry log-entry-${type}`;
    entry.setAttribute('data-type', type);
    entry.style.color = color;
    entry.style.marginBottom = '4px';
    entry.innerHTML = `<span style="color: #64748b; font-size: 11px;">${time}</span> <span style="font-weight: 700;">${prefix}</span> ${msg}`;

    if (activeLogFilter !== 'all' && activeLogFilter !== type) {
        entry.style.display = 'none';
    }

    consoleEl.appendChild(entry);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

addLog('Application renderer starting...', 'system');

// Log Console Controls
document.querySelectorAll('.log-filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.log-filter-btn').forEach(b => {
            b.style.background = 'var(--bg-tertiary)';
            b.style.borderColor = 'var(--border-color)';
            b.style.color = 'var(--text-secondary)';
        });
        btn.style.background = 'var(--accent-light)';
        btn.style.borderColor = 'var(--accent-color)';
        btn.style.color = 'white';
        activeLogFilter = btn.getAttribute('data-filter') || 'all';

        const entries = document.querySelectorAll('#logConsole .log-entry');
        entries.forEach(entry => {
            if (activeLogFilter === 'all' || entry.getAttribute('data-type') === activeLogFilter) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
    };
});

const btnCopyLogs = getEl('btnCopyLogs');
if (btnCopyLogs) {
    btnCopyLogs.onclick = () => {
        const consoleEl = getEl('logConsole');
        if (consoleEl) {
            const text = consoleEl.innerText;
            navigator.clipboard.writeText(text);
            showToast('Logs copied to clipboard', 'success');
        }
    };
}

const btnClearLogsConsole = getEl('btnClearLogsConsole');
if (btnClearLogsConsole) {
    btnClearLogsConsole.onclick = () => {
        const consoleEl = getEl('logConsole');
        if (consoleEl) consoleEl.innerHTML = '';
        addLog('Console logs cleared.', 'system');
    };
}

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
let autoClaimEnabled = localStorage.getItem('autoClaimEnabled') !== 'false';
let discordRPCEnabled = localStorage.getItem('discordRPCEnabled') === 'true';
let rpcFarmingStartTimestamp = null;
let currentGlobalDropSession = null;
let currentFarmingChannelId = null;
let currentFarmCampaignId = null;
let activeFarmingCampaignId = null;
let browsedCampaignId = null;
let previewCampaignId = null;
let activeFarmingChannelLogin = null;
let masterAutoFarmEnabled = false;
let tokenProcessingStarted = false;
let manualOverrideId = null;
let currentUserId = null;
let wsDropProgress = {};
let uiTimerInterval = null;
let integritySafetyTimer = null;

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

let farmAllMode = localStorage.getItem('farmAllMode') === 'true';
let stallThresholdSec = parseInt(localStorage.getItem('stallThresholdSec')) || 180;
let showStallTimer = localStorage.getItem('showStallTimer') !== 'false';

// Startup & Automation Preferences State
let autoLaunchEnabled = false;
let autoLaunchHidden = false;
let autoStartFarm = false;
let autoStartFarmMode = 'priority';
let hasAutoStartedFarm = false;

function updateStartupSettingsUI() {
    const toggleAutoLaunch = document.getElementById('toggleAutoLaunch');
    const toggleAutoLaunchHidden = document.getElementById('toggleAutoLaunchHidden');
    const toggleAutoStartFarm = document.getElementById('toggleAutoStartFarm');
    const autoStartFarmModeSelect = document.getElementById('autoStartFarmModeSelect');
    const subGroup = document.getElementById('startupSubSettings');

    if (toggleAutoLaunch) toggleAutoLaunch.checked = autoLaunchEnabled;

    if (toggleAutoLaunchHidden) {
        toggleAutoLaunchHidden.checked = autoLaunchEnabled && autoLaunchHidden;
        toggleAutoLaunchHidden.disabled = !autoLaunchEnabled;
    }
    if (toggleAutoStartFarm) {
        toggleAutoStartFarm.checked = autoLaunchEnabled && autoStartFarm;
        toggleAutoStartFarm.disabled = !autoLaunchEnabled;
    }
    if (autoStartFarmModeSelect) {
        autoStartFarmModeSelect.value = autoStartFarmMode;
        autoStartFarmModeSelect.disabled = !autoLaunchEnabled;
    }

    if (subGroup) {
        if (autoLaunchEnabled) {
            subGroup.classList.remove('disabled-group');
        } else {
            subGroup.classList.add('disabled-group');
        }
    }
}

function syncAutoLaunchConfig() {
    const hiddenState = autoLaunchEnabled && autoLaunchHidden;
    const farmState = autoLaunchEnabled && autoStartFarm;

    if (window.electronAPI && window.electronAPI.setAutoLaunch) {
        window.electronAPI.setAutoLaunch({
            autoLaunchEnabled,
            autoLaunchHidden: hiddenState,
            autoStartFarm: farmState,
            autoStartFarmMode
        });
    }
}

// Initial load: Fetch saved startup config directly from disk via Main Process IPC
if (window.electronAPI && window.electronAPI.getAutoLaunch) {
    window.electronAPI.getAutoLaunch().then(cfg => {
        if (cfg) {
            autoLaunchEnabled = !!cfg.autoLaunchEnabled;
            autoLaunchHidden = autoLaunchEnabled && !!cfg.autoLaunchHidden;
            autoStartFarm = autoLaunchEnabled && !!cfg.autoStartFarm;
            autoStartFarmMode = cfg.autoStartFarmMode || 'priority';
            updateStartupSettingsUI();
        }
    }).catch(e => console.error("Error loading auto launch config from main:", e));
}

updateStartupSettingsUI();

const toggleAutoLaunchEl = document.getElementById('toggleAutoLaunch');
if (toggleAutoLaunchEl) {
    toggleAutoLaunchEl.addEventListener('change', () => {
        autoLaunchEnabled = toggleAutoLaunchEl.checked;
        if (!autoLaunchEnabled) {
            autoLaunchHidden = false;
            autoStartFarm = false;
        }
        updateStartupSettingsUI();
        syncAutoLaunchConfig();
        showToast(`System Startup ${autoLaunchEnabled ? 'enabled' : 'disabled'}`, 'info');
        addLog(`System Auto-Launch set to ${autoLaunchEnabled ? 'ENABLED' : 'DISABLED'}`, 'system');
    });
}

const toggleAutoLaunchHiddenEl = document.getElementById('toggleAutoLaunchHidden');
if (toggleAutoLaunchHiddenEl) {
    toggleAutoLaunchHiddenEl.addEventListener('change', () => {
        if (!autoLaunchEnabled) return;
        autoLaunchHidden = toggleAutoLaunchHiddenEl.checked;
        syncAutoLaunchConfig();
        showToast(`Start Minimized ${autoLaunchHidden ? 'enabled' : 'disabled'}`, 'info');
        addLog(`Start Minimized to Tray set to ${autoLaunchHidden ? 'ENABLED' : 'DISABLED'}`, 'system');
    });
}

const toggleAutoStartFarmEl = document.getElementById('toggleAutoStartFarm');
if (toggleAutoStartFarmEl) {
    toggleAutoStartFarmEl.addEventListener('change', () => {
        if (!autoLaunchEnabled) return;
        autoStartFarm = toggleAutoStartFarmEl.checked;
        syncAutoLaunchConfig();
        showToast(`Auto-Start Farming ${autoStartFarm ? 'enabled' : 'disabled'}`, 'info');
        addLog(`Auto-Start Farming on launch set to ${autoStartFarm ? 'ENABLED' : 'DISABLED'}`, 'system');
    });
}

const autoStartFarmModeSelectEl = document.getElementById('autoStartFarmModeSelect');
if (autoStartFarmModeSelectEl) {
    autoStartFarmModeSelectEl.addEventListener('change', () => {
        if (!autoLaunchEnabled) return;
        autoStartFarmMode = autoStartFarmModeSelectEl.value;
        farmAllMode = (autoStartFarmMode === 'global');
        localStorage.setItem('farmAllMode', farmAllMode ? 'true' : 'false');
        updateMasterAutoFarmUI();
        syncAutoLaunchConfig();
        showToast(`Auto-Start mode set to ${autoStartFarmMode.toUpperCase()}`, 'info');
        addLog(`Auto-Start Farming mode set to ${autoStartFarmMode.toUpperCase()}`, 'system');
    });
}

function triggerAutoStartFarm() {
    if (hasAutoStartedFarm) return;
    if (!autoLaunchEnabled || !autoStartFarm) return;
    if (!accountTokens || !accountTokens.auth) {
        addLog(`[Startup] Auto-start farming skipped: Not logged in.`, 'system');
        return;
    }

    hasAutoStartedFarm = true;
    farmAllMode = (autoStartFarmMode === 'global');
    localStorage.setItem('farmAllMode', farmAllMode ? 'true' : 'false');
    masterAutoFarmEnabled = true;
    activeFarmingCampaignId = null;
    manualOverrideId = null;

    addLog(`🚀 [Startup] Auto-start farming triggered automatically in ${autoStartFarmMode.toUpperCase()} mode.`, 'system');
    showToast(`Auto-Start Farming (${autoStartFarmMode.toUpperCase()})`, 'success');
    updateMasterAutoFarmUI();
    runMasterFarmLoop();
}

if (accountTokens && accountTokens.auth) {
    showLoadingPlaceholder();
    setTimeout(() => {
        processTokens(accountTokens, true);
    }, 500);
}

const toggleClaim = document.getElementById('toggleClaim');
if (toggleClaim) {
    toggleClaim.checked = autoClaimEnabled;
    toggleClaim.addEventListener('change', () => {
        autoClaimEnabled = toggleClaim.checked;
        localStorage.setItem('autoClaimEnabled', autoClaimEnabled);
        showToast(`Auto-Claim ${autoClaimEnabled ? 'enabled' : 'disabled'}`, 'info');
        if (autoClaimEnabled) {
            addLog('Auto-Claim enabled. Checking rewards...', 'system');
            processAutoClaims();
        }
    });
}

updateMinViewersUI();

const toggleDiscordRPC = document.getElementById('toggleDiscordRPC');
if (toggleDiscordRPC) {
    toggleDiscordRPC.checked = discordRPCEnabled;
    toggleDiscordRPC.addEventListener('change', () => {
        discordRPCEnabled = toggleDiscordRPC.checked;
        localStorage.setItem('discordRPCEnabled', discordRPCEnabled);
        showToast(`Discord RPC ${discordRPCEnabled ? 'enabled' : 'disabled'}`, 'info');
        window.electronAPI.rpcToggle(discordRPCEnabled);
        updateRPCStatus();
    });
}

// Persistent Top Header Live Farm Widget Updates
function updateHeaderFarmWidget() {
    const dot = getEl('headerFarmStatusDot');
    const text = getEl('headerFarmText');
    const subtext = getEl('headerFarmSubtext');
    const btnSkip = getEl('btnHeaderSkip');
    const currentFarmTitle = getEl('currentFarmTitle');
    const statsWorkerStatus = getEl('statsWorkerStatus');

    if (activeFarmingCampaignId && activeFarmingChannelLogin) {
        const curr = allCampaigns.find(c => c.id === activeFarmingCampaignId);
        const gameName = curr?.game?.displayName || 'Twitch Game';

        if (dot) {
            dot.className = 'status-indicator green';
            dot.style.boxShadow = '0 0 8px var(--success)';
        }
        if (text) text.innerText = gameName;
        if (subtext) subtext.innerHTML = `· <span class="streamer-link" title="Open twitch.tv/${activeFarmingChannelLogin} in browser" onclick="event.stopPropagation(); window.electronAPI.openExternal('https://www.twitch.tv/${activeFarmingChannelLogin}')">@${activeFarmingChannelLogin}</span>`;
        if (btnSkip) {
            btnSkip.style.display = 'inline-flex';
            btnSkip.title = 'Skip Streamer';
            btnSkip.onclick = () => {
                skipStreamerAction();
            };
        }
        if (currentFarmTitle) {
            currentFarmTitle.innerText = gameName;
            currentFarmTitle.style.color = 'var(--text-primary)';
        }
        if (statsWorkerStatus) {
            statsWorkerStatus.innerHTML = `<span style="color: var(--success); font-size: 14px; font-weight:700;">Live <span class="streamer-link" title="Open twitch.tv/${activeFarmingChannelLogin} in browser" onclick="event.stopPropagation(); window.electronAPI.openExternal('https://www.twitch.tv/${activeFarmingChannelLogin}')">@${activeFarmingChannelLogin}</span></span>`;
        }
    } else {
        if (dot) {
            dot.className = 'status-indicator red';
            dot.style.boxShadow = 'none';
        }
        if (text) text.innerText = 'Idle';
        if (subtext) subtext.innerText = '— No active farm';
        if (btnSkip) btnSkip.style.display = 'none';
        if (currentFarmTitle) {
            currentFarmTitle.innerText = 'Idle';
            currentFarmTitle.style.color = 'var(--text-muted)';
        }
        if (statsWorkerStatus) {
            statsWorkerStatus.innerHTML = `<span style="color: var(--text-muted); font-size: 14px;">Standing By</span>`;
        }
    }
}

function updateRPCStatus() {
    updateHeaderFarmWidget();
    if (!discordRPCEnabled) {
        window.electronAPI.rpcToggle(false);
        return;
    }

    if (activeFarmingCampaignId && activeFarmingChannelLogin) {
        const curr = allCampaigns.find(c => c.id === activeFarmingCampaignId);
        const gameName = curr?.game?.displayName || 'Game';
        
        let dropName = 'Drops';
        let progressPercent = 0;
        if (curr) {
            const activeDrop = curr.timeBasedDrops?.find(d => !d.self?.isClaimed);
            if (activeDrop) {
                dropName = activeDrop.name || 'Drop';
                const selfStats = activeDrop.self || {};
                const currentMins = selfStats.currentMinutesWatched || 0;
                const requiredMins = activeDrop.requiredMinutesWatched || 1;
                progressPercent = Math.min(100, Math.floor((currentMins / requiredMins) * 100));
            }
        }

        if (!rpcFarmingStartTimestamp) {
            rpcFarmingStartTimestamp = Date.now();
        }

        window.electronAPI.rpcUpdate({
            details: `Farming: ${gameName}`,
            state: `Watching ${activeFarmingChannelLogin} (${progressPercent}%)`,
            timestamps: { start: rpcFarmingStartTimestamp },
            assets: {
                large_image: 'twitch_drops_logo',
                large_text: 'Twitch Drops Farmer',
                small_image: 'farming',
                small_text: `Farming ${dropName}`
            }
        });
    } else {
        rpcFarmingStartTimestamp = null;
        window.electronAPI.rpcUpdate({
            details: 'Standing by',
            state: 'Idle',
            assets: { large_image: 'twitch_drops_logo', large_text: 'Twitch Drops Farmer' }
        });
    }
}

const toggleStallTimer = document.getElementById('toggleStallTimer');
if (toggleStallTimer) {
    toggleStallTimer.checked = showStallTimer;
    toggleStallTimer.addEventListener('change', () => {
        showStallTimer = toggleStallTimer.checked;
        localStorage.setItem('showStallTimer', showStallTimer);
        showToast(`Stall Timer ${showStallTimer ? 'visible' : 'hidden'}`, 'info');
        if (!showStallTimer) {
            const statusArea = document.getElementById('stallStatus');
            if (statusArea) statusArea.innerHTML = '';
        }
    });
}

const stallThresholdInput = document.getElementById('stallThresholdInput');
const btnSaveStallThreshold = document.getElementById('btnSaveStallThreshold');
if (stallThresholdInput && btnSaveStallThreshold) {
    stallThresholdInput.value = stallThresholdSec;
    btnSaveStallThreshold.onclick = () => {
        let val = parseInt(stallThresholdInput.value);
        if (isNaN(val) || val < 30) val = 180;
        stallThresholdSec = val;
        stallThresholdInput.value = val;
        localStorage.setItem('stallThresholdSec', val);
        showToast(`Stall threshold saved (${val}s)`, 'success');
        addLog(`Stall threshold updated to ${val} seconds`, 'system');
    };
}

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
        showToast('Logs cleared', 'info');
    };
}

function semverCompare(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na > nb) return 1;
        if (nb > na) return -1;
    }
    return 0;
}

async function checkUpdates() {
    const btn = document.getElementById('btnCheckUpdate');
    const notice = document.getElementById('updateNotice');
    if (!btn || !notice) return;

    btn.innerText = 'Checking...';
    btn.disabled = true;
    notice.innerText = '';

    try {
        const repoUrl = "https://raw.githubusercontent.com/lokalizator-repo/TwitchDropsFarmer/main/package.json";
        const res = await fetch(repoUrl);
        if (!res.ok) throw new Error('Network error');

        const remote = await res.json();
        const currentVersion = await window.electronAPI.getAppVersion();

        if (semverCompare(remote.version, currentVersion) > 0) {
            notice.innerHTML = `<span style="color: var(--warning); cursor: pointer; text-decoration: underline;">New version ${remote.version} available!</span>`;
            notice.onclick = () => window.electronAPI.openExternal("https://github.com/lokalizator-repo/TwitchDropsFarmer/releases");
            showToast(`New version ${remote.version} available!`, 'warn');
        } else {
            notice.innerHTML = `<span style="color: var(--success);">You have the latest version (v${currentVersion}).</span>`;
            showToast('You are on the latest version', 'success');
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
        showToast(`Added ${val} to priority list`, 'success');
    }
}

function updatePriorityStatsCount() {
    const statsPriorityCount = getEl('statsPriorityCount');
    if (statsPriorityCount) {
        const count = selectedPriorityGames.length;
        statsPriorityCount.innerText = `${count} ${count === 1 ? 'Game' : 'Games'}`;
    }
}

function renderPriorityChips() {
    updatePriorityStatsCount();
    if (!selectedGamesChips) return;
    if (selectedPriorityGames.length === 0) {
        selectedGamesChips.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px; font-style: italic; align-self: center;">No games selected yet. Pick from the grid or add manually.</span>';
        return;
    }
    selectedGamesChips.innerHTML = selectedPriorityGames.map((game, index) => {
        const camp = allCampaigns.find(c => c.game?.displayName?.toLowerCase() === game.toLowerCase());
        const miniImg = getGameImageUrl(camp?.game, 36, 48);
        const imgTag = miniImg ? `<img src="${miniImg}" style="width:18px; height:24px; border-radius:3px; object-fit:cover;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-36x48.jpg'">` : '<div style="display:flex; align-items:center; opacity:0.7;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/></svg></div>';
        return `
        <div style="background: rgba(145,70,255,0.14); border: 1px solid var(--accent-color); color: white; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
            <div style="display:flex; flex-direction: row; gap: 4px; line-height: 1;">
                <span onclick="movePriorityGame(${index}, -1)" style="cursor:pointer; opacity: 0.6; display:flex; align-items:center; padding: 2px;" title="Move Up"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></span>
                <span onclick="movePriorityGame(${index}, 1)" style="cursor:pointer; opacity: 0.6; display:flex; align-items:center; padding: 2px;" title="Move Down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></span>
            </div>
            ${imgTag}
            <span>${escapeHtml(game)}</span>
            <span style="cursor: pointer; display:flex; align-items:center; color: var(--danger); margin-left: 2px;" onclick="removePriorityGame('${encodeGameParam(game)}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
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
};

window.removePriorityGame = (encodedGame) => {
    const game = decodeGameParam(encodedGame);
    selectedPriorityGames = selectedPriorityGames.filter(g => g.toLowerCase() !== game.toLowerCase());
    savePriorityGames();
    renderPriorityChips();
    renderPriorityGrid();
    showToast(`Removed ${game} from priority`, 'info');
};

function renderPriorityGrid(searchTerm = '') {
    if (!priorityGameGrid) return;

    const uniqueGames = [];
    const seen = new Set();
    for (const c of allCampaigns) {
        if (c.game && c.game.displayName && !seen.has(c.game.id) && isWatchableCampaign(c)) {
            seen.add(c.game.id);
            uniqueGames.push(c.game);
        }
    }

    if (uniqueGames.length === 0) {
        priorityGameGrid.innerHTML = '<p style="color: var(--text-secondary); font-size: 13px; grid-column: 1/-1;">No active campaigns loaded yet.</p>';
        return;
    }

    const filtered = searchTerm
        ? uniqueGames.filter(g => g.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
        : uniqueGames;

    if (filtered.length === 0) {
        priorityGameGrid.innerHTML = '<p style="color: var(--text-secondary); font-size: 13px; grid-column: 1/-1;">No campaigns match your search.</p>';
        return;
    }

    priorityGameGrid.innerHTML = filtered.map(game => {
        const isSelected = selectedPriorityGames.some(g => g.toLowerCase() === game.displayName.toLowerCase());
        const imgUrl = getGameImageUrl(game, 144, 192);

        return `
        <div onclick="togglePriorityGame('${encodeGameParam(game.displayName)}')" style="
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 160px;
            background: ${isSelected ? 'rgba(145, 70, 255, 0.15)' : 'var(--bg-tertiary)'};
            border: 2px solid ${isSelected ? 'var(--accent-color)' : 'transparent'};
            border-radius: 10px;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.2s ease;
        ">
            <img src="${imgUrl}" style="width:100%; aspect-ratio: 144 / 192; object-fit: cover; display:block; flex-shrink: 0;" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg'" />
           <div style="padding: 6px 8px; flex-shrink: 0; background: ${isSelected ? 'rgba(145, 70, 255, 0.1)' : 'var(--bg-tertiary)'};">
               <p style="font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">${escapeHtml(game.displayName)}</p>
           </div>
           ${isSelected ? '<div style="position: absolute; top: 4px; right: 4px; background: var(--accent-color); color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>' : ''}
       </div>
       `;
    }).join('');
}

window.togglePriorityGame = (encodedGame) => {
    const game = decodeGameParam(encodedGame);
    const lower = game.toLowerCase();
    if (selectedPriorityGames.some(g => g.toLowerCase() === lower)) {
        selectedPriorityGames = selectedPriorityGames.filter(g => g.toLowerCase() !== lower);
        showToast(`Removed ${game} from priority`, 'info');
    } else {
        selectedPriorityGames.push(game);
        showToast(`Added ${game} to priority`, 'success');
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

if (selectedGamesChips) {
    renderPriorityChips();
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        startDeviceAuthFlow();
    });
}

let farmingInterval = null;
let progressionTracker = {};
let stallBlacklist = {};
let streamerBlacklist = {};
let sessionSkippedStreamers = new Set();
let campaignFailedStreamerCounts = {};
let preCheckTimer = null;
let campaignBlacklist = {};
let campaignIdBeingStarted = null;
let pendingClaims = new Set();
let isFetchingCampaigns = false;

// Sidebar Dock Master Farm UI Synchronizer
function updateMasterAutoFarmUI() {
    updateRPCStatus();
    const status = document.getElementById('masterToggleStatus');
    const btnPriority = document.getElementById('btnTogglePriority');
    const btnGlobal = document.getElementById('btnToggleGlobal');
    const btnStop = document.getElementById('btnStopMaster');
    const btnStart = document.getElementById('btnStartMaster');
    const btnFarmAll = document.getElementById('btnFarmAll');

    const sidebarMinViewersContainer = document.getElementById('sidebarMinViewersContainer');
    const campaignsMinViewersContainer = document.getElementById('campaignsMinViewersContainer');

    if (sidebarMinViewersContainer) {
        sidebarMinViewersContainer.style.display = farmAllMode ? 'flex' : 'none';
    }
    if (campaignsMinViewersContainer) {
        campaignsMinViewersContainer.style.display = farmAllMode ? 'flex' : 'none';
    }

    if (btnPriority) btnPriority.classList.remove('active-mode');
    if (btnGlobal) btnGlobal.classList.remove('active-mode');

    if (farmAllMode) {
        if (btnGlobal) btnGlobal.classList.add('active-mode');
    } else {
        if (btnPriority) btnPriority.classList.add('active-mode');
    }

    const statsAutoFarmMode = document.getElementById('statsAutoFarmMode');
    if (statsAutoFarmMode) {
        statsAutoFarmMode.innerHTML = farmAllMode ? `${ICONS.zap(12)} Global` : `${ICONS.star(12)} Priority`;
    }

    if (masterAutoFarmEnabled) {
        if (btnStart) btnStart.style.display = 'none';
        if (btnStop) btnStop.style.display = 'flex';
        if (status) status.innerHTML = `<span style="color: var(--success); font-weight:700;">Running</span>`;
        if (btnFarmAll) {
            btnFarmAll.innerHTML = `${ICONS.stop(12)} Stop Global Farm`;
            btnFarmAll.style.background = 'var(--danger)';
        }
    } else {
        if (btnStart) btnStart.style.display = 'flex';
        if (btnStop) btnStop.style.display = 'none';
        if (status) status.innerText = 'Idle';
        if (btnFarmAll) {
            btnFarmAll.innerHTML = isFetchingCampaigns ? `${ICONS.spinner(12)} Loading...` : `${ICONS.zap(12)} Farm All Available`;
            btnFarmAll.style.background = isFetchingCampaigns ? '#333' : 'linear-gradient(135deg, #10b981, #059669)';
        }
    }
}

const btnTogglePriority = document.getElementById('btnTogglePriority');
const btnToggleGlobal = document.getElementById('btnToggleGlobal');
const btnStopMaster = document.getElementById('btnStopMaster');
const btnStartMaster = document.getElementById('btnStartMaster');

if (btnTogglePriority) {
    btnTogglePriority.onclick = () => {
        farmAllMode = false;
        localStorage.setItem('farmAllMode', 'false');
        addLog('Switched to PRIORITY auto-farm mode.', 'system');
        showToast('Switched to PRIORITY mode', 'info');
        updateMasterAutoFarmUI();
    };
}

if (btnToggleGlobal) {
    btnToggleGlobal.onclick = () => {
        farmAllMode = true;
        localStorage.setItem('farmAllMode', 'true');
        addLog('Switched to GLOBAL auto-farm mode.', 'system');
        showToast('Switched to GLOBAL mode', 'info');
        updateMasterAutoFarmUI();
    };
}

if (btnStartMaster) {
    btnStartMaster.onclick = () => {
        masterAutoFarmEnabled = true;
        activeFarmingCampaignId = null;
        manualOverrideId = null;
        addLog(`Auto-Farm STARTED in ${farmAllMode ? 'GLOBAL' : 'PRIORITY'} mode.`, 'system');
        showToast(`Auto-Farm Started (${farmAllMode ? 'Global' : 'Priority'})`, 'success');
        updateMasterAutoFarmUI();
        runMasterFarmLoop();
    };
}

if (btnStopMaster) {
    btnStopMaster.onclick = () => {
        masterAutoFarmEnabled = false;
        stopFarmAction();
        currentFarmCampaignId = null;
        addLog('Auto-Farm STOPPED.', 'system');
        showToast('Auto-Farm Stopped', 'info');
        updateMasterAutoFarmUI();
    };
}

function isCampaignFinished(c, inventory) {
    if (!c || !c.timeBasedDrops || c.timeBasedDrops.length === 0) return true;

    const ipCamp = inventory?.dropCampaignsInProgress?.find(ip => ip.id === c.id);
    if (ipCamp) {
        const allClaimedOrWatched = ipCamp.timeBasedDrops.every(d =>
            d.self?.isClaimed === true ||
            (d.self?.currentMinutesWatched || 0) >= d.requiredMinutesWatched
        );
        if (allClaimedOrWatched) return true;
    }

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

            if (awardedAt >= dropStart && awardedAt <= dropEnd) {
                continue;
            }
        }

        unfinishedFound = true;
        break;
    }

    return !unfinishedFound;
}

function isCampaignBadgeOrQuest(c) {
    if (!c) return false;
    const NORMAL_DROP_TYPES = [null, undefined, 'GAME_DROP', 'DIRECT_ENTITLEMENT'];

    for (const d of (c.timeBasedDrops || [])) {
        for (const edge of (d.benefitEdges || [])) {
            const dt = edge.benefit?.distributionType;
            if (!NORMAL_DROP_TYPES.includes(dt)) {
                c._badgeReason = dt;
                c._badgePaid = (d.requiredSubs || 0) > 0;
                return true;
            }
        }
    }

    const hasSubRequirement = (c.timeBasedDrops || []).some(d => (d.requiredSubs || 0) > 0);
    if (hasSubRequirement) {
        c._badgeReason = 'Requires sub';
        c._badgePaid = true;
        return true;
    }

    const allDrops = c.timeBasedDrops || [];
    const totalMinutes = allDrops.reduce((sum, d) => sum + (d.requiredMinutesWatched || 0), 0);
    if (allDrops.length > 0 && totalMinutes === 0) {
        c._badgeReason = '0 min watch';
        c._badgePaid = false;
        return true;
    }

    return false;
}

function validateCampaign(c, inventory = null) {
    if (!c) return { isValid: false, reason: 'No campaign data' };

    c.isBadgeOrQuest = isCampaignBadgeOrQuest(c);

    if (!c.timeBasedDrops || c.timeBasedDrops.length === 0) {
        return { isValid: false, reason: 'No time-based drops' };
    }

    if (c.status !== 'ACTIVE') {
        return { isValid: false, reason: `Status: ${c.status}` };
    }

    if (!c.game || !c.game.displayName) {
        return { isValid: false, reason: 'No game linked' };
    }

    const gameName = (c.game.displayName || '').toLowerCase();
    const badGames = ['just chatting', 'общение', 'irl'];
    if (badGames.some(bad => gameName.includes(bad))) {
        if (!c.isBadgeOrQuest) {
            return { isValid: false, reason: 'Just Chatting (badge-only)' };
        }
    }

    const now = new Date();
    const start = new Date(c.startAt);
    const end = new Date(c.endAt);

    if (now < new Date(start.getTime() - 5 * 60000)) return { isValid: false, reason: 'Not started yet' };
    if (now > new Date(end.getTime() + 5 * 60000)) return { isValid: false, reason: 'Already ended' };

    if (c.isBadgeOrQuest) {
        return { isValid: true, reason: 'OK' };
    }

    const minutesLeft = (end.getTime() - now.getTime()) / (1000 * 60);

    if (inventory) {
        const ipCamp = inventory.dropCampaignsInProgress?.find(ip => ip.id === c.id);

        const canFinishSomething = c.timeBasedDrops.some(drop => {
            if (drop.self?.isClaimed) return false;

            const ipDrop = ipCamp?.timeBasedDrops?.find(d => d.id === drop.id);
            const currentMins = ipDrop?.self?.currentMinutesWatched || drop.self?.currentMinutesWatched || 0;
            const remainingMins = (drop.requiredMinutesWatched || 0) - currentMins;

            return minutesLeft >= remainingMins;
        });

        if (!canFinishSomething) {
            return { isValid: false, reason: 'Impossible to complete (Too little time left)' };
        }
    } else {
        if (minutesLeft < 5) return { isValid: false, reason: 'Campaign ending in < 5m' };
    }

    const hasSubRequirement = c.timeBasedDrops.some(d => (d.requiredSubs || 0) > 0);
    if (hasSubRequirement) {
        return { isValid: false, reason: 'Requires subscription' };
    }

    const validDrops = c.timeBasedDrops.filter(d => (d.requiredMinutesWatched || 0) > 0);
    if (validDrops.length === 0) {
        return { isValid: false, reason: 'All drops have 0 minutes requirement' };
    }

    return { isValid: true, reason: 'OK' };
}

function isWatchableCampaign(c, inventory = null) {
    if (c && c.isBadgeOrQuest) return false;
    const res = validateCampaign(c, inventory);
    return res.isValid;
}

function getNavigableCampaigns(options = {}) {
    if (!allCampaigns || !allCampaigns.length) return [];

    const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const now = Date.now();
    const inv = options.inventory || null;

    let eligible = allCampaigns.filter(c =>
        c.status === 'ACTIVE' &&
        isWatchableCampaign(c, inv) &&
        !isCampaignFinished(c, inv) &&
        !ignoredGameNames.includes(c.game?.displayName?.toLowerCase() || '') &&
        !ignoredCampaignIds.includes(c.id) &&
        (options.ignoreBlacklist || !stallBlacklist[c.id] || now > stallBlacklist[c.id]) &&
        (minViewersThreshold <= 0 || (c.game?.viewersCount || 0) >= minViewersThreshold)
    );

    if (farmAllMode) {
        eligible.sort((a, b) => {
            const nameA = a.game?.displayName?.toLowerCase();
            const nameB = b.game?.displayName?.toLowerCase();
            const indexA = savedList.indexOf(nameA);
            const indexB = savedList.indexOf(nameB);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            if (campaignSortMode === 'endDate') {
                return new Date(a.endAt) - new Date(b.endAt);
            } else {
                return (b.game?.viewersCount || 0) - (a.game?.viewersCount || 0);
            }
        });
    } else {
        eligible.sort((a, b) => {
            const nameA = a.game?.displayName?.toLowerCase();
            const nameB = b.game?.displayName?.toLowerCase();
            const indexA = savedList.indexOf(nameA);
            const indexB = savedList.indexOf(nameB);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return (b.game?.viewersCount || 0) - (a.game?.viewersCount || 0);
        });
    }

    return eligible;
}

async function skipStreamerAction() {
    const currId = activeFarmingCampaignId || currentFarmCampaignId || browsedCampaignId;
    const curr = allCampaigns?.find(c => c.id === currId);
    const gameName = curr?.game?.displayName || 'Game';
    const sLogin = activeFarmingChannelLogin;

    if (sLogin) {
        sessionSkippedStreamers.add(sLogin.toLowerCase());
        showToast(`Skipping streamer @${sLogin}...`, 'info');
        addLog(`[Skip] Skipping streamer @${sLogin} (${gameName}). Switching to next streamer...`, 'system');

        window.electronAPI.stopFarm();
        currentFarmingChannelId = null;
        activeFarmingChannelLogin = null;

        if (curr) {
            startFarmAction(curr, true);
        } else {
            cycleCampaign(1, true);
        }
    } else {
        skipCampaignAction();
    }
}
window.skipStreamerAction = skipStreamerAction;

async function skipCampaignAction() {
    const currId = activeFarmingCampaignId || currentFarmCampaignId || browsedCampaignId;
    const curr = allCampaigns?.find(c => c.id === currId);
    const gameName = curr?.game?.displayName || 'Game';

    showToast(`Skipping campaign ${gameName}...`, 'info');
    addLog(`[Skip] Skipping campaign ${gameName}...`, 'system');

    cycleCampaign(1, true);
}
window.skipCampaignAction = skipCampaignAction;

async function cycleCampaign(direction, autoStart = false) {
    sessionSkippedStreamers.clear();
    const eligible = getNavigableCampaigns();
    if (!eligible.length) {
        showToast("No active campaigns available.", "info");
        return;
    }

    let currentId = activeFarmingCampaignId || currentFarmCampaignId || browsedCampaignId;
    let currentIndex = eligible.findIndex(c => c.id === currentId);
    let nextIndex;

    if (currentIndex !== -1) {
        nextIndex = (currentIndex + direction + eligible.length) % eligible.length;
    } else {
        const unblacklisted = getNavigableCampaigns({ ignoreBlacklist: true });
        const oldIndex = unblacklisted.findIndex(c => c.id === currentId);

        if (oldIndex !== -1) {
            if (direction > 0) {
                const nextCamp = eligible.find(c => {
                    const idx = unblacklisted.findIndex(u => u.id === c.id);
                    return idx > oldIndex;
                });
                nextIndex = nextCamp ? eligible.indexOf(nextCamp) : 0;
            } else {
                const prevCamps = eligible.filter(c => {
                    const idx = unblacklisted.findIndex(u => u.id === c.id);
                    return idx < oldIndex;
                });
                nextIndex = prevCamps.length ? eligible.indexOf(prevCamps[prevCamps.length - 1]) : eligible.length - 1;
            }
        } else {
            nextIndex = direction > 0 ? 0 : eligible.length - 1;
        }
    }

    const target = eligible[nextIndex];

    if (autoStart) {
        addLog(`Auto-cycling: Switching to ${target.game?.displayName}...`, 'system');
        window.electronAPI.stopFarm();
        currentFarmingChannelId = null;
        currentFarmCampaignId = target.id;
        manualOverrideId = target.id;
        startFarmAction(target, true);
    } else {
        openCampaignBrowserModal(target.id);
    }
}

let isFarmingLoopBusy = false;

async function runMasterFarmLoop() {
    if (isFarmingLoopBusy) return;
    if (!masterAutoFarmEnabled && !activeFarmingCampaignId) return;

    if (!allCampaigns || allCampaigns.length === 0) {
        if (!isFetchingCampaigns) fetchAndUpdateCampaigns();
        return;
    }

    isFarmingLoopBusy = true;

    try {
        const inventoryRes = await window.electronAPI.getInventory(accountTokens);
        const inventory = inventoryRes?.data?.currentUser?.inventory;
        const now = Date.now();
        const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

        const curr = allCampaigns.find(c => c.id === activeFarmingCampaignId);
        if (curr) {
            const ipCamp = inventory?.dropCampaignsInProgress?.find(ip => ip.id === curr.id);
            const activeDrop = ipCamp?.timeBasedDrops?.find(d => !d.self?.isClaimed);

            const currentMins = activeDrop?.self?.currentMinutesWatched || 0;
            const dropName = activeDrop?.name || 'Unknown';
            const stats = progressionTracker[curr.id] || { mins: -1, time: now, lastDropName: '' };

            if (currentMins > stats.mins) {
                if (stats.mins !== -1) {
                    const diff = currentMins - stats.mins;
                    addLog(`[${curr.game?.displayName}] Progress on "${dropName}": +${diff}m (${currentMins}m)`, 'farm');
                }
                progressionTracker[curr.id] = { mins: currentMins, time: now, lastDropName: dropName };
                campaignFailedStreamerCounts[curr.id] = 0;
            } else {
                const threshold = stallThresholdSec * 1000;
                const elapsed = now - stats.time;

                if (!uiTimerInterval) {
                    uiTimerInterval = setInterval(() => {
                        const statusArea = document.getElementById('stallStatus');
                        const c = allCampaigns.find(currCamp => currCamp.id === activeFarmingCampaignId);

                        if (statusArea && c && progressionTracker[c.id]) {
                            const s = progressionTracker[c.id];
                            const th = stallThresholdSec * 1000;
                            const el = Date.now() - s.time;
                            const rem = Math.max(0, Math.floor((th - el) / 1000));

                            // Only show badge as a backup/warning when progress is delayed beyond normal 1m cycle (> 75s)
                            if (showStallTimer && el > 75000) {
                                statusArea.innerHTML = (rem > 0)
                                    ? `<span class="stall-timer-badge warning">${ICONS.clock(11)} Stall check: ${rem}s</span>`
                                    : `<span class="stall-timer-badge danger">${ICONS.warn(11)} Stall verified!</span>`;
                            } else {
                                statusArea.innerHTML = '';
                            }
                        } else if (uiTimerInterval) {
                            if (statusArea) statusArea.innerHTML = '';
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
                    const sLogin = activeFarmingChannelLogin || '';

                    if (sLogin) {
                        streamerBlacklist[sLogin.toLowerCase()] = now + 30 * 60 * 1000;
                        addLog(`[Stall Check] No progress on @${sLogin} (${campaignName}) after ${stallThresholdSec}s. Blacklisting streamer...`, 'warn');
                    }

                    campaignFailedStreamerCounts[curr.id] = (campaignFailedStreamerCounts[curr.id] || 0) + 1;
                    progressionTracker[curr.id] = { mins: currentMins, time: now, lastDropName: dropName };
                    currentFarmingChannelId = null;

                    if (campaignFailedStreamerCounts[curr.id] >= 3) {
                        addLog(`[Stall Check] 3 streamers stalled on "${campaignName}". Blacklisting category for 30m.`, 'warn');
                        showToast(`Stall on ${campaignName}. Switching game...`, 'warn');
                        stallBlacklist[curr.id] = now + 30 * 60 * 1000;
                        delete campaignFailedStreamerCounts[curr.id];

                        if (masterAutoFarmEnabled && farmAllMode) {
                            cycleCampaign(1, true);
                        } else {
                            stopFarmAction(curr);
                        }
                    } else {
                        showToast(`Stall on @${sLogin}. Trying next streamer...`, 'warn');
                        startFarmAction(curr, true);
                    }
                    return;
                }
            }
        }

        const activeCamp = allCampaigns.find(c => c.id === activeFarmingCampaignId);
        if (activeCamp) {
            const isFinished = isCampaignFinished(activeCamp, inventory);
            const validRes = validateCampaign(activeCamp, inventory);

            if (isFinished) {
                addLog(`[AutoFarm] ${activeCamp.game?.displayName} fully finished! Searching for new tasks...`, 'success');
                activeFarmingCampaignId = null;
                manualOverrideId = null;
            } else if (!validRes.isValid) {
                addLog(`[AutoFarm] Campaign ${activeCamp.game?.displayName} not watchable (${validRes.reason}). Skipping...`, 'warn');
                stallBlacklist[activeCamp.id] = now + 30 * 60 * 1000;
                activeFarmingCampaignId = null;
                manualOverrideId = null;
            } else if (!manualOverrideId) {
                const stats = progressionTracker[activeCamp.id];
                const threshold = stallThresholdSec * 1000;
                const elapsed = now - (stats?.time || 0);

                if (elapsed < threshold) {
                    const activeGameName = activeCamp.game?.displayName?.toLowerCase();
                    const activeRank = savedList.indexOf(activeGameName);
                    let hasBetterCandidate = false;

                    const tempEligible = getNavigableCampaigns({ inventory });

                    for (const cand of tempEligible) {
                        const candName = cand.game?.displayName?.toLowerCase();
                        const candRank = savedList.indexOf(candName);
                        if (candRank !== -1) {
                            if (activeRank === -1 || candRank < activeRank) {
                                hasBetterCandidate = true;
                                break;
                            }
                        }
                    }

                    if (!hasBetterCandidate) {
                        isFarmingLoopBusy = false;
                        return;
                    } else {
                        addLog(`[AutoFarm] Found higher-priority campaign available. Preempting current farm...`, 'system');
                        activeFarmingCampaignId = null;
                    }
                }
            }
        }

        if (!masterAutoFarmEnabled) {
            isFarmingLoopBusy = false;
            return;
        }

        let eligible = [];

        if (farmAllMode) {
            eligible = getNavigableCampaigns({ inventory });
        } else {
            for (const name of savedList) {
                const matchingCamps = allCampaigns.filter(c =>
                    c.game?.displayName?.toLowerCase() === name &&
                    c.status === 'ACTIVE' &&
                    !c.isBadgeOrQuest &&
                    !ignoredGameNames.includes(c.game?.displayName?.toLowerCase() || '') &&
                    !ignoredCampaignIds.includes(c.id) &&
                    (!stallBlacklist[c.id] || now > stallBlacklist[c.id]) &&
                    (minViewersThreshold <= 0 || (c.game?.viewersCount || 0) >= minViewersThreshold)
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

        let targetCampaign = null;
        if (manualOverrideId) {
            targetCampaign = allCampaigns.find(c => c.id === manualOverrideId);
            if (targetCampaign) {
                const inv = inventory || null;
                const isFinished = isCampaignFinished(targetCampaign, inv);
                const isBlacklisted = stallBlacklist[targetCampaign.id] && now < stallBlacklist[targetCampaign.id];
                if (isFinished || targetCampaign.status !== 'ACTIVE' || isBlacklisted) {
                    addLog(`[AutoFarm] Selected campaign ${targetCampaign.game?.displayName || ''} finished or unavailable. Resuming global farm...`, 'info');
                    manualOverrideId = null;
                    targetCampaign = null;
                }
            } else {
                manualOverrideId = null;
            }
        }

        if (!targetCampaign) {
            if (eligible.length === 0) {
                if (currentFarmCampaignId) {
                    window.electronAPI.stopFarm();
                    currentFarmCampaignId = null;
                    currentFarmingChannelId = null;
                }
                const masterStatus = getEl('masterToggleStatus');
                if (masterStatus) masterStatus.innerHTML = `<span style="color:#f59e0b;">Standby</span>`;
                return;
            }
            targetCampaign = eligible[0];
        }

        if (targetCampaign) {
            if (activeFarmingCampaignId !== targetCampaign.id) {
                const reason = farmAllMode ? "highest priority (Global Mode)" : "next in priority list";
                addLog(`Auto-Farm: Switching to ${targetCampaign.game?.displayName} — ${reason}`, 'system');

                haltCurrentFarmWorker();

                activeFarmingCampaignId = targetCampaign.id;
                activeFarmingChannelLogin = null;

                if (masterAutoFarmEnabled) {
                    startFarmAction(targetCampaign, true);
                }
            } else {
                if (!document.hidden) {
                    startFarmingSimulation(targetCampaign, false, true, 'farmPanel');
                }
            }
        }
    } catch (err) {
        console.error("Farming loop error:", err);
    } finally {
        isFarmingLoopBusy = false;
    }
}

function showLoadingPlaceholder(message = "Synchronizing session with Twitch...") {
    const loadingHtml = `
      <div class="empty-state fade-in" style="text-align: center; padding: 25px 20px;">
          <div class="spinner-sm" style="width: 32px; height: 32px; border-width: 3px; margin: 0 auto 14px; border-top-color: var(--accent-color);"></div>
          <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #fff;">Connecting & Loading Campaigns...</h3>
          <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">${message}</p>
      </div>
    `;

    const container = document.getElementById('campaignsContainer');
    if (container && (!allCampaigns || allCampaigns.length === 0)) {
        container.innerHTML = loadingHtml;
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

        if (response.error === 'AUTH_EXPIRED') {
            handleAuthExpired();
            return false;
        }
        if (response.error === 'INTEGRITY_REQUIRED') {
            addLog('🔒 [Security] Initializing Twitch security token in background...', 'info');
            window.electronAPI.refreshIntegrityToken();
            showLoadingPlaceholder("Validating security token in background...");

            if (integritySafetyTimer) clearTimeout(integritySafetyTimer);
            integritySafetyTimer = setTimeout(() => {
                const c = document.getElementById('campaignsContainer');
                if (c && (!allCampaigns || allCampaigns.length === 0)) {
                    showIntegrityFailedUI();
                }
            }, 14000);

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
            renderCampaignsListItems();
            renderIdlePlaceholder();
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
        let inventory = null;

        if (invRes && invRes.data) {
            inventory = invRes.data.currentUser?.inventory;
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
            const drops = (c.timeBasedDrops || []).filter(d => c.isBadgeOrQuest || (d.requiredMinutesWatched || 0) > 0);
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
                        if (ipDrop.self?.dropInstanceID) d.self.dropInstanceID = ipDrop.self.dropInstanceID;
                    }
                }
            } else {
                for (const d of c.timeBasedDrops) {
                    if (!d.self) d.self = {};
                    const benefitId = d.benefitEdges?.[0]?.benefit?.id;
                    let isClaimed = false;
                    if (benefitId && eventDropsMap.has(benefitId)) {
                        const awardedAt = eventDropsMap.get(benefitId);
                        if (awardedAt >= start && awardedAt <= end) {
                            isClaimed = true;
                        }
                    }
                    d.self.isClaimed = isClaimed;
                    d.self.currentMinutesWatched = isClaimed ? d.requiredMinutesWatched : 0;
                }
            }
            finalCampaigns.push(c);
        }

        allCampaigns = finalCampaigns;
        allCampaigns.sort((a, b) => (b.game?.viewersCount || 0) - (a.game?.viewersCount || 0));

        applyCurrentFilters();
        setupCampaignsListEvents();
        renderPriorityChips();
        renderPriorityGrid(autoFarmSearch ? autoFarmSearch.value : '');

        const farmPanel = document.getElementById('farmPanel');
        if (farmPanel && allCampaigns.length > 0) {
            let targetId = activeFarmingCampaignId || currentFarmCampaignId;
            if (targetId) {
                const target = allCampaigns.find(c => c.id === targetId);
                if (target) {
                    const isSameAsViewed = (currentFarmCampaignId === target.id);
                    startFarmingSimulation(target, false, isSameAsViewed, 'farmPanel');

                    if (targetId === activeFarmingCampaignId && isCampaignFinished(target, inventory)) {
                        addLog(`Campaign for ${target.game?.displayName} finished! Looking for next drops...`, 'system');
                        masterAutoFarmEnabled = true;
                        runMasterFarmLoop();
                    }
                }
            } else {
                renderIdlePlaceholder();
            }
        }

        if (autoClaimEnabled) processAutoClaims(inventory);
        return true;
    } catch (err) {
        console.error("Critical error in fetchAndUpdateCampaigns:", err);
        return false;
    } finally {
        isFetchingCampaigns = false;
        updateMasterAutoFarmUI();
        if (!allCampaigns || allCampaigns.length === 0) {
            renderCampaignsListItems();
            renderIdlePlaceholder();
        }
        if (masterAutoFarmEnabled) runMasterFarmLoop();
    }
}

let deviceAuthPollInterval = null;
let deviceAutoOpenTimerInterval = null;
let currentVerificationUrl = '';
let currentDeviceUserCode = '';

async function startDeviceAuthFlow() {
    const modal = document.getElementById('deviceAuthModal');
    const codeDisplay = document.getElementById('deviceCodeDisplay');
    const statusText = document.getElementById('deviceAuthStatusText');

    if (!modal || !codeDisplay) return;

    modal.style.display = 'flex';
    codeDisplay.innerText = 'LOADING...';
    if (statusText) statusText.innerText = 'Requesting activation code from Twitch...';

    if (deviceAuthPollInterval) {
        clearInterval(deviceAuthPollInterval);
        deviceAuthPollInterval = null;
    }
    if (deviceAutoOpenTimerInterval) {
        clearInterval(deviceAutoOpenTimerInterval);
        deviceAutoOpenTimerInterval = null;
    }

    try {
        const data = await window.electronAPI.requestDeviceCode();
        if (data.error || !data.user_code) {
            if (statusText) statusText.innerText = `Error: ${data.error || 'Failed to request activation code'}`;
            return;
        }

        currentDeviceUserCode = data.user_code;
        currentVerificationUrl = data.verification_uri || `https://www.twitch.tv/activate?device-code=${data.user_code}`;

        codeDisplay.innerText = currentDeviceUserCode;
        if (statusText) statusText.innerText = 'Waiting for authorization on Twitch...';
        addLog(`[DeviceAuth] Activation code: ${currentDeviceUserCode}`, 'system');

        let countdownSec = 3;
        const timerContainer = document.getElementById('deviceAutoOpenTimer');

        if (timerContainer) {
            timerContainer.innerHTML = `Opening browser in <span id="autoOpenCountdown">${countdownSec}</span>s...`;
            timerContainer.style.display = 'block';
        }

        deviceAutoOpenTimerInterval = setInterval(() => {
            countdownSec--;
            const countSpan = document.getElementById('autoOpenCountdown');
            if (countSpan) countSpan.innerText = countdownSec;

            if (countdownSec <= 0) {
                clearInterval(deviceAutoOpenTimerInterval);
                deviceAutoOpenTimerInterval = null;
                const timerC = document.getElementById('deviceAutoOpenTimer');
                if (timerC) timerC.innerText = 'Browser opened!';
                if (currentVerificationUrl) {
                    window.electronAPI.openExternal(currentVerificationUrl);
                }
            }
        }, 1000);

        const pollInterval = Math.max((data.interval || 5) * 1000, 3000);
        deviceAuthPollInterval = setInterval(async () => {
            try {
                const tokenRes = await window.electronAPI.pollDeviceToken(data.device_code);
                if (tokenRes.access_token) {
                    clearInterval(deviceAuthPollInterval);
                    deviceAuthPollInterval = null;
                    if (deviceAutoOpenTimerInterval) {
                        clearInterval(deviceAutoOpenTimerInterval);
                        deviceAutoOpenTimerInterval = null;
                    }

                    modal.style.display = 'none';
                    addLog('⚡ Twitch Device Authorization successful!', 'farm');
                    showToast('Logged in to Twitch successfully!', 'success');

                    const tokens = {
                        auth: `OAuth ${tokenRes.access_token}`,
                        clientId: 'kimne78kx3ncx6brgo4mv6wki5h1ko',
                        integrity: accountTokens?.integrity || ''
                    };
                    tokenProcessingStarted = false;
                    processTokens(tokens);
                } else if (tokenRes.error && tokenRes.error !== 'authorization_pending') {
                    clearInterval(deviceAuthPollInterval);
                    deviceAuthPollInterval = null;
                    if (deviceAutoOpenTimerInterval) {
                        clearInterval(deviceAutoOpenTimerInterval);
                        deviceAutoOpenTimerInterval = null;
                    }
                    if (statusText) statusText.innerText = `Error: ${tokenRes.error_description || tokenRes.error}`;
                    addLog(`[DeviceAuth] Error: ${tokenRes.error}`, 'error');
                    showToast(`Auth Error: ${tokenRes.error}`, 'error');
                }
            } catch (e) {
                console.error("Device token poll exception:", e);
            }
        }, pollInterval);

    } catch (e) {
        if (statusText) statusText.innerText = `Failed: ${e.message}`;
        addLog(`[DeviceAuth] Exception: ${e.message}`, 'error');
    }
}

function closeDeviceAuthModal() {
    if (deviceAuthPollInterval) {
        clearInterval(deviceAuthPollInterval);
        deviceAuthPollInterval = null;
    }
    if (deviceAutoOpenTimerInterval) {
        clearInterval(deviceAutoOpenTimerInterval);
        deviceAutoOpenTimerInterval = null;
    }
    const modal = document.getElementById('deviceAuthModal');
    if (modal) modal.style.display = 'none';
}

window.startDeviceAuthFlow = startDeviceAuthFlow;
window.closeDeviceAuthModal = closeDeviceAuthModal;

const btnOpenActivateUrl = document.getElementById('btnOpenActivateUrl');
if (btnOpenActivateUrl) {
    btnOpenActivateUrl.onclick = () => {
        if (deviceAutoOpenTimerInterval) {
            clearInterval(deviceAutoOpenTimerInterval);
            deviceAutoOpenTimerInterval = null;
        }
        const timerC = document.getElementById('deviceAutoOpenTimer');
        if (timerC) timerC.innerText = 'Browser opened!';
        if (currentVerificationUrl) window.electronAPI.openExternal(currentVerificationUrl);
    };
}

const btnCopyDeviceCode = document.getElementById('btnCopyDeviceCode');
if (btnCopyDeviceCode) {
    btnCopyDeviceCode.onclick = () => {
        if (currentDeviceUserCode) {
            navigator.clipboard.writeText(currentDeviceUserCode);
            btnCopyDeviceCode.innerHTML = `${ICONS.check(13)} Copied!`;
            showToast('Code copied to clipboard', 'info');
            setTimeout(() => { btnCopyDeviceCode.innerHTML = `${ICONS.copy(13)} Copy Code`; }, 2000);
        }
    };
}

const btnCloseDeviceAuthModal = document.getElementById('btnCloseDeviceAuthModal');
if (btnCloseDeviceAuthModal) btnCloseDeviceAuthModal.onclick = closeDeviceAuthModal;

const initialLoginBtn = document.getElementById('loginBtn');
if (initialLoginBtn) {
    initialLoginBtn.onclick = () => startDeviceAuthFlow();
}

function showIntegrityFailedUI() {
    addLog('[Security] Automatic security check resolution failed. Twitch login required.', 'error');
    if (integritySafetyTimer) {
        clearTimeout(integritySafetyTimer);
        integritySafetyTimer = null;
    }

    const errorHtml = `
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid var(--danger); padding: 24px; border-radius: 16px; text-align: center; margin: 20px auto; max-width: 500px;" class="fade-in">
          <div style="display: flex; justify-content: center; margin-bottom: 10px;">${ICONS.lock(44)}</div>
          <h3 style="color: var(--danger); margin-bottom: 8px; font-size: 18px; font-weight: 700;">Security Check Required</h3>
          <p style="font-size: 13px; margin-bottom: 18px; color: var(--text-secondary);">
            Twitch security token could not be refreshed automatically. Interactive login required.
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn-primary" onclick="startDeviceAuthFlow()" style="padding: 8px 18px; width: auto;">Log In Again</button>
            <button class="btn-secondary" onclick="retryIntegrityCheck()" style="padding: 8px 16px; width: auto;">Retry</button>
          </div>
      </div>
    `;

    const container = document.getElementById('campaignsContainer');
    if (container) container.innerHTML = errorHtml;

    const farmPanel = document.getElementById('farmPanel');
    if (farmPanel) farmPanel.innerHTML = errorHtml;
}

function retryIntegrityCheck() {
    addLog('🔒 Retrying security token refresh...', 'system');
    tokenProcessingStarted = false;
    window.electronAPI.refreshIntegrityToken();
    fetchAndUpdateCampaigns();
}
window.retryIntegrityCheck = retryIntegrityCheck;

window.electronAPI.onIntegrityRefreshFailed((data) => {
    console.warn("Integrity refresh failed:", data);
    showIntegrityFailedUI();
});

function handleAuthExpired() {
    addLog(`Twitch session has expired or is invalid. Please log in again.`, 'error');
    showToast('Twitch session expired. Please log in again.', 'error');
    
    localStorage.removeItem('accountTokens');
    accountTokens = null;

    haltCurrentFarmWorker();
    
    try {
        window.electronAPI.wsDisconnect();
    } catch (e) {
        console.error("Failed to disconnect WebSocket:", e);
    }
    
    if (farmingInterval) {
        clearInterval(farmingInterval);
        farmingInterval = null;
    }
    
    tokenProcessingStarted = false;
    
    const userText = getEl('headerUserText');
    const userDot = getEl('headerUserDot');
    if (userText) userText.innerText = 'Session Expired';
    if (userDot) userDot.className = 'status-indicator red';
    
    const statsAccountName = document.getElementById('statsAccountName');
    if (statsAccountName) {
        statsAccountName.innerHTML = 'Session Expired';
        statsAccountName.style.color = 'var(--danger)';
    }
    
    const campaignsContainer = document.getElementById('campaignsContainer');
    if (campaignsContainer) {
        campaignsContainer.innerHTML = `
            <div style="grid-column: 1/-1; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger); padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0;">
                <h3 style="color: var(--danger); margin-bottom: 10px; font-size: 18px;">Authentication Expired</h3>
                <p style="font-size: 14px; margin-bottom: 18px; color: var(--text-secondary); max-width: 500px; margin-left: auto; margin-right: auto;">Your Twitch session has expired. Please log in again to continue auto-farming.</p>
                <button class="btn-primary" onclick="startDeviceAuthFlow()" style="padding: 10px 24px; width: auto; margin: 0 auto;">Log In Again</button>
            </div>
        `;
    }
}

async function processTokens(tokens, fromStorage = false) {
    if (!tokens || !tokens.auth || !tokens.auth.includes('OAuth')) return;
    if (tokenProcessingStarted) return;

    tokenProcessingStarted = true;
    accountTokens = tokens;
    localStorage.setItem('accountTokens', JSON.stringify(tokens));

    if (integritySafetyTimer) {
        clearTimeout(integritySafetyTimer);
        integritySafetyTimer = null;
    }
    addLog(`Tokens captured and saved`, 'system');

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
        }
    } catch (e) {
        console.error("UserInfo Exception:", e);
    }

    if (currentUserId && tokens.auth) {
        try {
            await window.electronAPI.wsConnect(currentUserId, tokens.auth);
            addLog('⚡ WebSocket connected — real-time drop updates active', 'system');
        } catch (e) {
            addLog('WebSocket connection failed, falling back to polling', 'warn');
        }
    }

    // Update Header User Widget
    const userDot = getEl('headerUserDot');
    const userText = getEl('headerUserText');
    const userAvatarEl = getEl('headerUserAvatar');
    const loginBtnEl = getEl('loginBtn');

    if (userDot) userDot.className = 'status-indicator green';
    if (userText) userText.innerHTML = `<b>${displayName}</b>`;
    if (userAvatarEl) {
        if (avatarUrl) {
            userAvatarEl.src = avatarUrl;
            userAvatarEl.style.display = 'block';
        } else {
            userAvatarEl.style.display = 'none';
        }
    }
    if (loginBtnEl) {
        loginBtnEl.innerText = 'Logout';
        loginBtnEl.className = 'btn-secondary';
        loginBtnEl.style.padding = '3px 8px';
        loginBtnEl.style.fontSize = '11px';
        loginBtnEl.onclick = async () => {
            localStorage.removeItem('accountTokens');
            try { await window.electronAPI.wsDisconnect(); } catch (e) {}
            location.reload();
        };
    }

    const statsAccountName = document.getElementById('statsAccountName');
    if (statsAccountName) {
        statsAccountName.innerHTML = displayName;
        statsAccountName.style.color = 'var(--success)';
    }

    const campaignsContainer = document.getElementById('campaignsContainer');
    if (campaignsContainer) campaignsContainer.innerHTML = '<p style="color: var(--text-secondary);">Loading campaigns from Twitch...</p>';

    const success = await fetchAndUpdateCampaigns();

    if (success && allCampaigns.length === 0 && campaignsContainer) {
        campaignsContainer.innerHTML = '<p style="color: var(--text-secondary);">No active campaigns found.</p>';
        renderIdlePlaceholder();
    }
    farmingInterval = setInterval(fetchAndUpdateCampaigns, 30000);
    triggerAutoStartFarm();
}

window.electronAPI.onTokenCaptured(async (data) => {
    const oldAuth = accountTokens ? accountTokens.auth : null;
    const oldIntegrity = accountTokens ? accountTokens.integrity : null;

    if (!accountTokens) accountTokens = { auth: '', integrity: '', clientId: '', deviceId: '' };

    if (data.auth) accountTokens.auth = data.auth;
    if (data.integrity) accountTokens.integrity = data.integrity;
    if (data.clientId) accountTokens.clientId = data.clientId;
    if (data.deviceId) accountTokens.deviceId = data.deviceId;

    localStorage.setItem('accountTokens', JSON.stringify(accountTokens));

    const authChanged = oldAuth && data.auth && oldAuth !== data.auth;

    if (accountTokens.auth && accountTokens.auth.includes('OAuth')) {
        if (!tokenProcessingStarted || authChanged) {
            if (authChanged) {
                tokenProcessingStarted = false;
                if (farmingInterval) {
                    clearInterval(farmingInterval);
                    farmingInterval = null;
                }
            }
            processTokens(accountTokens);
        } else if (data.integrity && data.integrity !== oldIntegrity) {
            await fetchAndUpdateCampaigns();
        }
    }
});

setInterval(() => {
    if (masterAutoFarmEnabled || activeFarmingCampaignId) runMasterFarmLoop();
}, 10000);

function setupCampaignsListEvents() {
    const campaignsContainer = document.getElementById('campaignsContainer');
    if (!campaignsContainer) return;

    const campaignSearch = document.getElementById('campaignSearch');
    if (campaignSearch && !campaignSearch.oninput) {
        campaignSearch.oninput = () => applyCurrentFilters();
    }

    const btnFarmAll = document.getElementById('btnFarmAll');
    if (btnFarmAll) {
        updateMasterAutoFarmUI();

        btnFarmAll.onclick = () => {
            if (farmAllMode && masterAutoFarmEnabled) {
                masterAutoFarmEnabled = false;
                window.electronAPI.stopFarm();
                addLog('Global Farm Stopped.', 'system');
                showToast('Global Farm Stopped', 'info');
            } else {
                farmAllMode = true;
                masterAutoFarmEnabled = true;
                activeFarmingCampaignId = null;
                manualOverrideId = null;
                addLog('Global Farm mode activated.', 'system');
                showToast('Global Farm Started', 'success');
                updateMasterAutoFarmUI();
                btnNavDashboard.click();

                runMasterFarmLoop();
                fetchAndUpdateCampaigns();
            }
        };
    }
}

// Side Preview Drawer Logic
function openPreviewDrawer(campaign) {
    const drawer = getEl('previewDrawer');
    const content = getEl('previewDrawerContent');
    if (!drawer || !content || !campaign) return;

    previewCampaignId = campaign.id;
    drawer.classList.add('drawer-open');

    const drops = (campaign.timeBasedDrops || []).slice().sort((a, b) => a.requiredMinutesWatched - b.requiredMinutesWatched);
    const totalDrops = drops.length;
    const claimedDrops = drops.filter(d => d.self?.isClaimed).length;
    const imgUrl = getGameImageUrl(campaign.game, 120, 160);
    const isPriority = selectedPriorityGames.some(g => g.toLowerCase() === campaign.game?.displayName?.toLowerCase());
    const isBanned = ignoredGameNames.includes(campaign.game?.displayName?.toLowerCase() || '');

    const isFarmingThisModal = (activeFarmingCampaignId === campaign.id);
    let modalFoundUnfinished = false;

    const dropsListHtml = drops.map((drop, index) => {
        const dropName = drop.benefitEdges?.[0]?.benefit?.name || drop.name || 'Reward';
        let dropImg = drop.benefitEdges?.[0]?.benefit?.imageAssetURL || '';
        if (dropImg && dropImg.startsWith('//')) dropImg = 'https:' + dropImg;
        if (!dropImg) dropImg = 'https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg';

        const reqMins = drop.requiredMinutesWatched || 0;
        const curMins = Math.min(reqMins, drop.self?.currentMinutesWatched || 0);
        const isClaimed = drop.self?.isClaimed || false;
        const percent = reqMins > 0 ? Math.floor((curMins / reqMins) * 100) : 0;
        const isCompleted = isClaimed || (percent >= 100 && reqMins > 0);

        let isActiveDrop = false;
        if (isFarmingThisModal && !isCompleted && !modalFoundUnfinished && reqMins > 0) {
            modalFoundUnfinished = true;
            isActiveDrop = true;
        }

        let containerClass = 'drop-progress-bar';
        let fillClass = 'drop-progress-bar-fill';
        const delayStyle = `--delay: -${(index * 0.45).toFixed(2)}s;`;

        if (isFarmingThisModal) {
            if (isActiveDrop) {
                containerClass += ' is-farming';
                fillClass += ' progress-active';
            } else if (!isCompleted) {
                containerClass += ' is-farming-secondary';
                fillClass += ' progress-secondary-active';
            } else if (percent === 100 && !isClaimed) {
                containerClass += ' is-claimable';
                fillClass += ' progress-claimable-active';
            }
        } else if (percent === 100 && !isClaimed) {
            containerClass += ' is-claimable';
            fillClass += ' progress-claimable-active';
        }

        return `
        <div class="drop-item-row" style="margin-bottom: 8px;">
            <img src="${dropImg}" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-72x96.jpg'"/>
            <div class="drop-info">
                <h4>${dropName}</h4>
                <div class="${containerClass}" style="${delayStyle}">
                    <div class="${fillClass}" style="width:${percent}%; ${isClaimed ? 'background: var(--success);' : (percent === 100 ? 'background: var(--warning);' : '')} ${delayStyle}"></div>
                </div>
            </div>
            <div class="drop-status">
                ${isClaimed ? `<span style="color:var(--success); display:inline-flex; align-items:center; gap:3px;">${ICONS.check(12)} Claimed</span>` : (percent === 100 ? `<span style="color:var(--warning); display:inline-flex; align-items:center; gap:3px;">${ICONS.gift(12)} Ready</span>` : `<span style="color:var(--text-secondary);">${curMins}m / ${reqMins}m</span>`)}
            </div>
        </div>
        `;
    }).join('');

    content.innerHTML = `
        <div style="display: flex; gap: 14px; align-items: center;">
            <img src="${imgUrl}" style="width: 64px; height: 86px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-color);" />
            <div style="flex: 1;">
                <h3 style="margin: 0 0 4px 0; font-size: 18px; color: white;">${campaign.game?.displayName}</h3>
                <p style="color: var(--text-secondary); font-size: 12px; margin: 0 0 8px 0;">${totalDrops} Total Rewards · ${claimedDrops} Claimed</p>
                <div style="display: flex; gap: 6px;">
                    <span class="badge ${isPriority ? 'badge-green' : 'badge-purple'}">${isPriority ? `${ICONS.star(11)} Priority` : 'Standard'}</span>
                    ${isBanned ? '<span class="badge badge-live" style="background:rgba(239,68,68,0.2);">Banned</span>' : ''}
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button id="btnDrawerStartFarm" class="btn-primary" style="flex: 1; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">${ICONS.zap(13)} Farm This Game</button>
            <button id="btnDrawerPriorityToggle" class="btn-secondary" style="width: auto; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">${ICONS.star(12)} ${isPriority ? 'Remove Priority' : 'Set Priority'}</button>
        </div>

        <div style="margin-top: 16px;">
            <h4 style="font-size: 13px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">Drop Rewards Breakdown</h4>
            ${dropsListHtml}
        </div>
    `;

    const btnDrawerStartFarm = getEl('btnDrawerStartFarm');
    if (btnDrawerStartFarm) {
        btnDrawerStartFarm.onclick = () => {
            drawer.classList.remove('drawer-open');
            btnNavDashboard.click();
            if (campaign) {
                manualOverrideId = campaign.id;
                masterAutoFarmEnabled = true;
                updateMasterAutoFarmUI();
                startFarmAction(campaign);
            }
        };
    }

    const btnDrawerPriorityToggle = getEl('btnDrawerPriorityToggle');
    if (btnDrawerPriorityToggle) {
        btnDrawerPriorityToggle.onclick = () => {
            togglePriorityGame(campaign.game?.displayName);
            openPreviewDrawer(campaign);
        };
    }
}

const btnClosePreviewDrawer = getEl('btnClosePreviewDrawer');
if (btnClosePreviewDrawer) {
    btnClosePreviewDrawer.onclick = () => {
        const drawer = getEl('previewDrawer');
        if (drawer) drawer.classList.remove('drawer-open');
    };
}

function renderCampaignsListItems() {
    const campaignsContainer = document.getElementById('campaignsContainer');
    if (!campaignsContainer) return;

    const statsCount = document.getElementById('statsCampaignsCount');
    if (statsCount) statsCount.innerText = filteredCampaigns.length;

    const savedList = (localStorage.getItem('autoFarmGames') || '').split(',').map(s => s.trim().toLowerCase());

    try {
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

        if (filteredCampaigns.length === 0) {
            campaignsContainer.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">No campaigns found.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredCampaigns.forEach(c => {
            try {
                if (!c || !c.game) return;

                const imgUrl = getGameImageUrl(c.game, 144, 192);
                const totalDrops = c.timeBasedDrops?.length || 0;
                const claimedDrops = c.timeBasedDrops?.filter(d => d.self?.isClaimed).length || 0;

                const isFinished = c.timeBasedDrops?.every(d => d.self?.isClaimed) || false;
                const isPriority = savedList.includes(c.game?.displayName?.toLowerCase() || '');
                const isGameBanned = ignoredGameNames.includes(c.game?.displayName?.toLowerCase() || '');
                const isCampIgnored = ignoredCampaignIds.includes(c.id);
                const isIgnored = isGameBanned || isCampIgnored;

                const card = document.createElement('div');
                card.className = 'campaign-card';
                card.onclick = () => openPreviewDrawer(c);

                if (isFinished) {
                    card.style.opacity = '0.4';
                    card.style.filter = 'grayscale(0.8)';
                } else if (isGameBanned) {
                    card.style.opacity = '0.25';
                    card.style.filter = 'grayscale(1)';
                } else if (isPriority) {
                    card.style.borderColor = 'var(--accent-color)';
                    card.style.boxShadow = '0 0 14px rgba(145, 70, 255, 0.2)';
                }

                const endDate = new Date(c.endAt);
                const day = String(endDate.getDate()).padStart(2, '0');
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                const endStr = `${day}.${month}`;

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
          <div style="position: absolute; top: 8px; right: 8px; display: flex; gap: 4px; z-index: 10;">
              <button class="btn-ignore-campaign ${isCampIgnored ? 'active-ignore' : ''}" title="${isCampIgnored ? 'Unignore Campaign' : 'Ignore Campaign'}" onclick="event.stopPropagation(); toggleIgnoreCampaign('${c.id}')">
                  ${isCampIgnored ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
              </button>
              <button class="btn-ignore-campaign ${isGameBanned ? 'active-ignore' : ''}" title="${isGameBanned ? 'Unban Game' : 'Ban Game'}" onclick="event.stopPropagation(); toggleIgnoreGame('${encodeGameParam(c.game?.displayName)}')">
                  ${isGameBanned ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
              </button>
          </div>
          
          <div class="campaign-card-header">
            <img src="${imgUrl}" class="campaign-cover-img" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-144x192.jpg'"/>
            <div class="campaign-title-block">
              <div class="campaign-game-name">${c.game?.displayName}</div>
              <div style="font-size: 11px; color: var(--text-secondary); display: flex; gap: 6px;">
                <span>${totalDrops} Rewards</span> · <span>${claimedDrops} Claimed</span>
              </div>
              <div style="font-size: 11px; margin-top: 2px;">
                ${isFinished ? `<span style="color:var(--success); font-weight:700; display:inline-flex; align-items:center; gap:3px;">${ICONS.check(11)} Completed</span>` : `<span style="color:var(--warning); display:inline-flex; align-items:center; gap:3px;">${ICONS.clock(11)} Ends ${endStr}</span>`}
              </div>
            </div>
          </div>

          <div class="campaign-progress-track ${c.id === activeFarmingCampaignId ? 'is-farming' : ''}" style="margin-top: 4px; height: 5px; width: 100%; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; position: relative;">
              <div class="${c.id === activeFarmingCampaignId ? 'progress-active' : ''}" style="height: 100%; width: ${totalPercent}%; background: ${barColor}; border-radius: 3px; transition: width 0.3s ease;"></div>
          </div>
        `;
                fragment.appendChild(card);
            } catch (err) {
                console.error("Error drawing campaign card:", err);
            }
        });

        campaignsContainer.innerHTML = '';
        campaignsContainer.appendChild(fragment);
    } catch (globalErr) {
        addLog(`UI Rendering failed: ${globalErr.message}`, 'error');
    }
}

function haltCurrentFarmWorker() {
    if (preCheckTimer) { clearTimeout(preCheckTimer); preCheckTimer = null; }
    window.electronAPI.stopFarm();
    currentFarmingChannelId = null;
    activeFarmingCampaignId = null;
    activeFarmingChannelLogin = null;
    campaignIdBeingStarted = null;
    
    window.electronAPI.updateTrayTooltip('Idle');
    updateHeaderFarmWidget();

    const farmStatus = document.getElementById('farmStatus');
    if (farmStatus) farmStatus.innerText = 'Idle';

    const stallStatus = document.getElementById('stallStatus');
    if (stallStatus) stallStatus.innerHTML = '';
}

function stopFarmAction(campaign) {
    addLog(`Stopping farm session...`, 'system');
    masterAutoFarmEnabled = false;
    campaignIdBeingStarted = null;
    
    const targetCamp = campaign || allCampaigns.find(c => c.id === (currentFarmCampaignId || activeFarmingCampaignId));

    haltCurrentFarmWorker();

    updateMasterAutoFarmUI();
    if (targetCamp) {
        startFarmingSimulation(targetCamp);
    } else {
        renderIdlePlaceholder();
    }
}

function startFarmActionById(id, isAuto = false) {
    const campaign = allCampaigns.find(c => c.id === id);
    if (campaign) {
        manualOverrideId = campaign.id;
        masterAutoFarmEnabled = true;
        updateMasterAutoFarmUI();
        startFarmAction(campaign, isAuto);
    }
}

window.startFarmActionById = startFarmActionById;
window.startFarmAction = startFarmAction;
window.stopFarmAction = stopFarmAction;

async function startFarmAction(campaign, isAuto = false) {
    campaignIdBeingStarted = campaign.id;
    activeFarmingCampaignId = campaign.id;
    startFarmingSimulation(campaign, false, false, 'farmPanel');

    const btnRunFarm = document.getElementById('btnRunFarm');
    const btnStopFarm = document.getElementById('btnStopFarm');
    const farmStatus = document.getElementById('farmStatus');

    if (btnRunFarm) btnRunFarm.style.display = 'none';
    if (btnStopFarm) btnStopFarm.style.display = 'flex';

    if (farmStatus) farmStatus.innerHTML = `<span style="color: var(--text-secondary); display:inline-flex; align-items:center; gap:4px;">${ICONS.search(12)} Searching for streamer...</span>`;

    try {
        let whitelistedLogins = null;
        if (campaign.allow?.isEnabled && campaign.allow?.channels && campaign.allow.channels.length > 0) {
            whitelistedLogins = campaign.allow.channels.map(ch => ch.name);
        }

        const res = await window.electronAPI.findStreamer(campaign.game?.displayName || '', accountTokens, whitelistedLogins);
        if (campaignIdBeingStarted !== campaign.id) return;

        const streams = res?.data?.game?.streams?.edges || [];

        const validStreams = streams.filter(s => {
            if (whitelistedLogins) return true;

            const tags = (s.node.freeformTags || []).map(t => t.name.toLowerCase());
            const title = (s.node.title || '').toLowerCase();

            return tags.some(t => t.includes('drops')) ||
                title.includes('drops') ||
                title.includes('!drops') ||
                title.includes('дропс');
        });

        if (activeFarmingCampaignId !== campaign.id) {
            sessionSkippedStreamers.clear();
        }

        const now = Date.now();
        const availableStreams = validStreams.filter(s => {
            const login = (s.node?.broadcaster?.login || '').toLowerCase();
            const isBlacklisted = streamerBlacklist[login] && now <= streamerBlacklist[login];
            const isSessionSkipped = sessionSkippedStreamers.has(login);
            return !login || (!isBlacklisted && !isSessionSkipped);
        });

        let targetStreamerNode = null;
        const targetGameId = campaign.game?.id;
        const targetGameName = (campaign.game?.displayName || '').toLowerCase();

        // GQL Pre-Check: verify active drops on channel before starting stream
        for (const candidate of availableStreams.slice(0, 5)) {
            const streamerId = candidate.node?.broadcaster?.id;
            const login = candidate.node?.broadcaster?.login;
            if (!streamerId || !login) continue;

            const isWhitelisted = whitelistedLogins && whitelistedLogins.length > 0;

            try {
                const dropCheck = await window.electronAPI.checkChannelDrops(streamerId, accountTokens);
                const activeCampaignsOnChannel = dropCheck?.data?.channelDropCampaignsProgress || [];

                const isConfirmed = isWhitelisted || (activeCampaignsOnChannel.length > 0 && activeCampaignsOnChannel.some(dc =>
                    (dc.game?.id && String(dc.game.id) === String(targetGameId)) ||
                    (dc.game?.name && dc.game.name.toLowerCase() === targetGameName) ||
                    (dc.name && dc.name.toLowerCase().includes(targetGameName)) ||
                    dc.id === campaign.id
                ));

                if (isConfirmed) {
                    const tagInfo = isWhitelisted ? ' (Whitelisted Channel)' : '';
                    addLog(`✓ [GQL Pre-Check] @${login} has confirmed active Drops for ${campaign.game?.displayName || campaign.name}${tagInfo}!`, 'success');
                    targetStreamerNode = candidate.node;
                    break;
                } else if (dropCheck?.data) {
                    addLog(`⚠️ [GQL Pre-Check] @${login} drops inactive for ${campaign.game?.displayName || campaign.name}. Trying next candidate...`, 'warn');
                    sessionSkippedStreamers.add(login.toLowerCase());
                } else {
                    // Query error or challenge: fallback to watching this stream
                    targetStreamerNode = candidate.node;
                    break;
                }
            } catch (err) {
                console.error("GQL Pre-check error:", err);
                targetStreamerNode = candidate.node;
                break;
            }
        }

        if (!targetStreamerNode) {
            if (availableStreams.length > 0) {
                targetStreamerNode = availableStreams[0].node;
            } else if (streams.length > 0) {
                targetStreamerNode = streams[0].node;
            } else {
                const gameName = campaign.game?.displayName || 'Game';
                addLog(`No live streamers found for ${gameName}.`, 'warn');
                showToast(`No live streamers found for ${gameName}`, 'warn');
                if (farmStatus) farmStatus.innerText = 'No live streamers found.';
                if (btnRunFarm) btnRunFarm.style.display = 'flex';
                if (btnStopFarm) btnStopFarm.style.display = 'none';

                if (!manualOverrideId) {
                    stallBlacklist[campaign.id] = Date.now() + 30 * 60 * 1000;
                    delete campaignFailedStreamerCounts[campaign.id];

                    setTimeout(() => {
                        cycleCampaign(1, true);
                    }, 600);
                }
                return;
            }
        }

        const targetStreamer = targetStreamerNode.broadcaster;
        const streamerLogin = targetStreamer.login;
        const streamerId = targetStreamer.id;

        currentFarmingChannelId = streamerId;
        activeFarmingCampaignId = campaign.id;
        activeFarmingChannelLogin = streamerLogin;

        if (masterAutoFarmEnabled) {
            startFarmingSimulation(campaign, false, false, 'farmPanel');
        }

        window.electronAPI.startFarm(streamerLogin);
        window.electronAPI.updateTrayTooltip(`Farming: ${campaign.game?.displayName || 'Game'}`);
        addLog(`Watching ${streamerLogin}...`, 'farm');
        showToast(`Farming ${campaign.game?.displayName} on ${streamerLogin}`, 'success');

        progressionTracker[campaign.id] = { mins: -1, time: Date.now() };

        updateHeaderFarmWidget();
        setTimeout(fetchAndUpdateCampaigns, 3000);
    } catch (e) {
        if (btnRunFarm) btnRunFarm.style.display = 'flex';
    }
}

window.startFarmingSimulationById = (id, autoStart = false) => {
    const campaign = allCampaigns.find(c => c.id === id);
    if (campaign) {
        browsedCampaignId = campaign.id;
        if (autoStart) {
            manualOverrideId = campaign.id;
            masterAutoFarmEnabled = true;
            updateMasterAutoFarmUI();
            btnNavDashboard.click();
            startFarmAction(campaign);
        } else {
            openPreviewDrawer(campaign);
        }
    }
}

function startFarmingSimulation(campaign, autoStart = false, updateOnly = false, targetPanelId = 'farmPanel') {
    if (targetPanelId === 'farmPanel') {
        if (!updateOnly) {
            currentFarmCampaignId = campaign.id;
            browsedCampaignId = campaign.id;
        }
    }

    const targetPanel = document.getElementById(targetPanelId);
    const heroCard = getEl('heroMonitorCard');
    if (!targetPanel) return;

    const drops = (campaign.timeBasedDrops || []).slice().sort((a, b) => a.requiredMinutesWatched - b.requiredMinutesWatched);
    const isFarmingThis = (activeFarmingCampaignId === campaign.id);
    let currentlyFoundUnfinished = false;
    let activeDropNameForUI = '';

    // Calculate progress statistics
    let activeDropObj = null;
    let activePercent = 0;
    let activeCurrentMins = 0;
    let activeReqMins = 0;

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
        
        const isCompleted = isClaimed || (percent >= 100 && requiredMins > 0);
        let isActiveDrop = false;
        if (isFarmingThis && !isCompleted && !currentlyFoundUnfinished && requiredMins > 0) {
            currentlyFoundUnfinished = true;
            isActiveDrop = true;
            activeDropNameForUI = dropName;
            activeDropObj = drop;
            activePercent = percent;
            activeCurrentMins = currentMins;
            activeReqMins = requiredMins;
        }

        let statusHtml;
        let barColor = 'var(--accent-color)';
        let containerClass = 'drop-progress-bar';
        let fillClass = 'drop-progress-bar-fill';
        const delayStyle = `--delay: -${(index * 0.45).toFixed(2)}s;`;

        if (isClaimed) {
            statusHtml = `<span style="color: var(--success); display:inline-flex; align-items:center; gap:3px;">${ICONS.check(12)} Claimed</span>`;
            barColor = 'var(--success)';
        } else if (percent === 100) {
            statusHtml = `<span style="color: var(--warning); display:inline-flex; align-items:center; gap:3px;">${ICONS.gift(12)} Ready to claim</span>`;
            barColor = 'var(--warning)';
            containerClass += ' is-claimable';
            fillClass += ' progress-claimable-active';
        } else {
            statusHtml = `<span style="color: var(--text-secondary);">${percent}% · ${currentMins}m / ${requiredMins}m</span>`;
            if (isFarmingThis) {
                if (isActiveDrop) {
                    containerClass += ' is-farming';
                    fillClass += ' progress-active';
                } else {
                    containerClass += ' is-farming-secondary';
                    fillClass += ' progress-secondary-active';
                }
            }
        }

        return `
     <div class="drop-item-row">
         <img src="${dropImg}" onerror="this.onerror=null; this.src='https://static-cdn.jtvnw.net/ttv-boxart/488190-72x96.jpg'" />
         <div class="drop-info">
             <h4>${dropName}</h4>
             <div class="${containerClass}" style="${delayStyle}">
                 <div class="${fillClass}" style="width:${percent}%; ${isClaimed ? 'background: var(--success);' : (percent === 100 ? 'background: var(--warning);' : '')} ${delayStyle}"></div>
             </div>
         </div>
         <div class="drop-status">
             ${statusHtml}
         </div>
     </div>`;
    }).join('');

    // Update Dashboard Hero Card Skeleton
    if (heroCard) {
        const dropsContainer = getEl('currentFarmDropsContainer');
        if (isFarmingThis && activeFarmingChannelLogin) {
            if (dropsContainer) dropsContainer.style.display = 'block';

            const existingHeroStreamInfo = heroCard.querySelector('.hero-stream-info');
            const currentChannel = heroCard.getAttribute('data-farming-channel');

            if (existingHeroStreamInfo && currentChannel === activeFarmingChannelLogin) {
                // In-place update existing DOM elements! Smooth width transition & continuous keyframe animation
                const metaEl = heroCard.querySelector('.hero-streamer-meta');
                if (metaEl) {
                    const newMetaHtml = `<span>Farming: <b>${activeDropNameForUI || 'Drop Reward'}</b></span><span>· ${activePercent}% (${activeCurrentMins}m / ${activeReqMins}m)</span>`;
                    if (metaEl.innerHTML !== newMetaHtml) metaEl.innerHTML = newMetaHtml;
                }
                const heroBar = heroCard.querySelector('.progress-bar');
                if (heroBar) {
                    const targetWidth = `${activePercent}%`;
                    if (heroBar.style.width !== targetWidth) heroBar.style.width = targetWidth;
                }
            } else {
                heroCard.setAttribute('data-farming-channel', activeFarmingChannelLogin || '');
                heroCard.innerHTML = `
                    <img src="${getGameImageUrl(campaign.game, 120, 160)}" class="hero-game-cover" onerror="this.onerror=null; this.src='../assets/icon.png'"/>
                    <div class="hero-stream-info" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-width: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; width: 100%;">
                            <div style="display: flex; flex-direction: column; gap: 6px; min-width: 0; flex: 1;">
                                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                                    <span class="badge badge-live">STREAMING NOW</span>
                                    <span class="badge badge-purple">${campaign.game?.displayName}</span>
                                </div>
                                <div class="hero-game-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Watching <span class="streamer-link" title="Open twitch.tv/${activeFarmingChannelLogin} in browser" onclick="event.stopPropagation(); window.electronAPI.openExternal('https://www.twitch.tv/${activeFarmingChannelLogin}')">@${activeFarmingChannelLogin}</span></div>
                                <div class="hero-streamer-meta">
                                    <span>Farming: <b>${activeDropNameForUI || 'Drop Reward'}</b></span>
                                    <span>· ${activePercent}% (${activeCurrentMins}m / ${activeReqMins}m)</span>
                                </div>
                            </div>
                            <div class="hero-actions" style="display: flex; gap: 8px; align-items: center; flex-shrink: 0; margin-top: 2px;">
                                <button class="btn-danger" onclick="stopFarmAction()" title="Stop Farm" style="width: auto; padding: 7px 16px; font-size: 12.5px;">Stop</button>
                                <button class="btn-secondary" onclick="skipCampaignAction()" title="Skip Campaign" style="width: auto; padding: 7px 14px; font-size: 12.5px; display: inline-flex; align-items: center; gap: 4px;">Skip ${ICONS.skip(12)}</button>
                            </div>
                        </div>
                        <div class="progress-container is-farming" style="margin-top: 14px; width: 100%;">
                            <div class="progress-bar progress-active" style="width: ${activePercent}%;"></div>
                        </div>
                    </div>
                `;
            }
        } else if (campaign && campaign.game) {
            if (dropsContainer) dropsContainer.style.display = 'block';
            heroCard.removeAttribute('data-farming-channel');
            heroCard.innerHTML = `
                <img src="${getGameImageUrl(campaign.game, 120, 160)}" class="hero-game-cover" onerror="this.onerror=null; this.src='../assets/icon.png'"/>
                <div class="hero-stream-info" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; width: 100%;">
                        <div style="display: flex; flex-direction: column; gap: 6px; min-width: 0; flex: 1;">
                            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                                <span class="badge badge-purple">READY TO FARM</span>
                            </div>
                            <div class="hero-game-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${campaign.game?.displayName}</div>
                            <div class="hero-streamer-meta">
                                <span>Click Start Farming to connect worker</span>
                            </div>
                        </div>
                        <div class="hero-actions" style="display: flex; gap: 8px; align-items: center; flex-shrink: 0; margin-top: 2px;">
                            <button class="btn-primary" onclick="startFarmActionById('${campaign.id}', true)" title="Start Farming" style="width: auto; padding: 7px 18px; font-size: 13px;">Start Farming</button>
                        </div>
                    </div>
                    <div class="progress-container" style="margin-top: 14px; width: 100%;">
                        <div class="progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
            `;
        } else {
            heroCard.removeAttribute('data-farming-channel');
            renderIdlePlaceholder();
        }
    }

    if (!updateOnly) {
        targetPanel.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="font-size: 15px; font-weight: 700; color: white;">${campaign.game?.displayName}</h3>
            </div>
            <div id="dropItemsList" style="width: 100%;" data-campaign-id="${campaign.id}">
                ${itemsHtml}
            </div>
        </div>
        `;
    } else {
        const list = targetPanel.querySelector('#dropItemsList');
        if (list) {
            const existingRows = list.querySelectorAll('.drop-item-row');
            const listCampaignId = list.getAttribute('data-campaign-id');
            if (listCampaignId === campaign.id && existingRows.length === drops.length) {
                // In-place DOM update of existing drop rows! Smooth CSS width transitions & no keyframe resets
                let foundUnfinished = false;
                drops.forEach((drop, index) => {
                    const row = existingRows[index];
                    if (!row) return;

                    const dropName = drop.benefitEdges?.[0]?.benefit?.name || `Reward ${index + 1}`;
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
                    const isCompleted = isClaimed || (percent >= 100 && requiredMins > 0);

                    let isActive = false;
                    if (isFarmingThis && !isCompleted && !foundUnfinished && requiredMins > 0) {
                        foundUnfinished = true;
                        isActive = true;
                    }

                    let containerClass = 'drop-progress-bar';
                    let fillClass = 'drop-progress-bar-fill';
                    if (isClaimed) {
                        // claimed
                    } else if (percent === 100) {
                        containerClass += ' is-claimable';
                        fillClass += ' progress-claimable-active';
                    } else if (isFarmingThis) {
                        if (isActive) {
                            containerClass += ' is-farming';
                            fillClass += ' progress-active';
                        } else {
                            containerClass += ' is-farming-secondary';
                            fillClass += ' progress-secondary-active';
                        }
                    }

                    const track = row.querySelector('.drop-progress-bar, .is-farming, .is-farming-secondary, .is-claimable');
                    if (track && track.className !== containerClass) {
                        track.className = containerClass;
                    }

                    const fill = row.querySelector('.drop-progress-bar-fill, .progress-active, .progress-secondary-active, .progress-claimable-active');
                    if (fill) {
                        if (fill.className !== fillClass) fill.className = fillClass;
                        const targetW = `${percent}%`;
                        if (fill.style.width !== targetW) fill.style.width = targetW;
                    }

                    const statusEl = row.querySelector('.drop-status');
                    if (statusEl) {
                        let statusHtml;
                        if (isClaimed) {
                            statusHtml = `<span style="color: var(--success); display:inline-flex; align-items:center; gap:3px;">${ICONS.check(12)} Claimed</span>`;
                        } else if (percent === 100) {
                            statusHtml = `<span style="color: var(--warning); display:inline-flex; align-items:center; gap:3px;">${ICONS.gift(12)} Ready to claim</span>`;
                        } else {
                            statusHtml = `<span style="color: var(--text-secondary);">${percent}% · ${currentMins}m / ${requiredMins}m</span>`;
                        }
                        if (statusEl.innerHTML !== statusHtml) statusEl.innerHTML = statusHtml;
                    }
                });
            } else {
                list.setAttribute('data-campaign-id', campaign.id);
                list.innerHTML = itemsHtml;
            }
        }
    }

    if (autoStart) {
        setTimeout(() => {
            const btn = document.getElementById('btnRunFarm');
            if (btn && btn.style.display !== 'none') {
                startFarmAction(campaign, true);
            }
        }, 100);
    }
}

function setupWebSocketListeners() {
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

            if (newMins > oldMins && oldMins !== -1) {
                const diff = newMins - oldMins;
                const curr = allCampaigns.find(c => c.id === currentFarmCampaignId);
                const gameName = curr?.game?.displayName || 'Game';
                addLog(`[${gameName}] Real-time progress: +${diff}m (${newMins}m)`, 'farm');
            }

            if (activeFarmingCampaignId && progressionTracker[activeFarmingCampaignId]) {
                progressionTracker[activeFarmingCampaignId].time = Date.now();
                campaignFailedStreamerCounts[activeFarmingCampaignId] = 0;
            }

            const curr = allCampaigns.find(c => c.id === currentFarmCampaignId);
            if (curr && !document.hidden) {
                startFarmingSimulation(curr, false, true);
            }
            updateRPCStatus();
        }
    });

    window.electronAPI.onWsDropClaim((data) => {
        addLog(`[Drop Claimed] Reward claimed via WebSocket! (${data.dropId})`, 'farm');
        showToast('Reward claimed successfully!', 'success');
        fetchAndUpdateCampaigns();
    });

    window.electronAPI.onWsDisconnected((data) => {
        if (data.permanent) {
            addLog('⚠️ WebSocket permanently disconnected. Using polling only.', 'warn');
        }
    });

    window.electronAPI.onWsDropEvent((data) => {
        console.log('[WS Event]', data.type, data.raw);
    });
}

async function processAutoClaims(inventory = null) {
    if (!autoClaimEnabled || !accountTokens) return;

    let claimSuccessCount = 0;
    let windowClaimNeeded = false;

    let activeInventory = inventory;
    if (!activeInventory) {
        try {
            const invRes = await window.electronAPI.getInventory(accountTokens);
            activeInventory = invRes?.data?.currentUser?.inventory;
        } catch (e) {
            console.error("Failed to fetch inventory for auto-claims:", e);
        }
    }

    const campaignsToCheck = new Map();

    for (const c of allCampaigns) {
        campaignsToCheck.set(c.id, c);
    }

    if (activeInventory && activeInventory.dropCampaignsInProgress) {
        for (const c of activeInventory.dropCampaignsInProgress) {
            if (!campaignsToCheck.has(c.id)) {
                campaignsToCheck.set(c.id, c);
            } else {
                const existing = campaignsToCheck.get(c.id);
                for (const d of (c.timeBasedDrops || [])) {
                    const existingDrop = existing.timeBasedDrops?.find(ed => ed.id === d.id);
                    if (existingDrop && d.self) {
                        existingDrop.self = { ...existingDrop.self, ...d.self };
                    }
                }
            }
        }
    }

    for (const campaign of campaignsToCheck.values()) {
        for (const drop of (campaign.timeBasedDrops || [])) {
            const self = drop.self || {};

            if (!self.isClaimed && self.currentMinutesWatched >= drop.requiredMinutesWatched) {
                const claimId = self.dropInstanceID;
                const dropId = drop.id;

                if (pendingClaims.has(dropId)) continue;
                pendingClaims.add(dropId);
                setTimeout(() => pendingClaims.delete(dropId), 10 * 60 * 1000);

                if (!claimId) {
                    windowClaimNeeded = true;
                    continue;
                }

                const dropName = drop.name || `Reward in ${campaign.name || campaign.id}`;
                addLog(`[Auto-Claim] Attempting to claim "${dropName}"...`, 'system');

                let claimSuccess = false;
                let lastError = 'Unknown error';

                for (let attempt = 1; attempt <= 3; attempt++) {
                    try {
                        const res = await window.electronAPI.claimDrop(claimId, accountTokens);
                        if (res && res.error === 'AUTH_EXPIRED') {
                            handleAuthExpired();
                            return;
                        }
                        const claimDropResult = res?.data?.claimDrop;
                        if (claimDropResult && !claimDropResult.error && claimDropResult.dropSelf?.isClaimed) {
                            addLog(`🎉 [Auto-Claim] Successfully claimed "${dropName}"!`, 'success');
                            showToast(`Claimed reward: ${dropName}`, 'success');
                            self.isClaimed = true;
                            self.currentMinutesWatched = drop.requiredMinutesWatched;
                            claimSuccessCount++;
                            claimSuccess = true;
                            break;
                        } else {
                            lastError = claimDropResult?.error?.message || res?.error || 'Unknown error';
                        }
                    } catch (err) {
                        lastError = err.message;
                    }

                    if (attempt < 3) {
                        await new Promise(r => setTimeout(r, 5000));
                    }
                }

                if (!claimSuccess) {
                    windowClaimNeeded = true;
                }
            }
        }
    }

    if (claimSuccessCount > 0) {
        fetchAndUpdateCampaigns();
    }

    if (windowClaimNeeded) {
        addLog(`[Auto-Claim] Triggering hidden claim window to claim remaining rewards...`, 'system');
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

window.electronAPI.updateTrayTooltip('Idle');

const btnMinimizeTray = document.getElementById('btnMinimizeTray');
if (btnMinimizeTray) {
    btnMinimizeTray.onclick = () => {
        window.electronAPI.minimizeToTray();
    };
}

// Inventory Search
let inventorySearchQuery = '';

const inventorySearchInput = getEl('inventorySearch');
const btnClearInventorySearch = getEl('btnClearInventorySearch');

if (inventorySearchInput) {
    inventorySearchInput.oninput = (e) => {
        inventorySearchQuery = e.target.value.toLowerCase();
        if (btnClearInventorySearch) btnClearInventorySearch.style.display = inventorySearchQuery ? 'flex' : 'none';
        renderInventory();
    };
}

if (btnClearInventorySearch) {
    btnClearInventorySearch.onclick = () => {
        if (inventorySearchInput) inventorySearchInput.value = '';
        inventorySearchQuery = '';
        btnClearInventorySearch.style.display = 'none';
        renderInventory();
    };
}

async function renderInventory() {
    const container = document.getElementById('inventoryContainer');
    if (!container) return;

    if (!accountTokens) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-secondary);">Connect your account to view inventory.</div>';
        return;
    }

    const res = await window.electronAPI.getInventory(accountTokens);
    if (res && res.error === 'AUTH_EXPIRED') {
        handleAuthExpired();
        return;
    }
    const inProgress = res?.data?.currentUser?.inventory?.dropCampaignsInProgress || [];
    const history = res?.data?.currentUser?.inventory?.gameEventDrops || [];

    if (history.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-secondary);">No claimed drops found in your history.</div>';
        return;
    }

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

    const groups = {};

    history.forEach(item => {
        let gameName = "Other Rewards";
        let gameBoxArt = "";

        const camp = allKnownCampaigns.find(c => {
            return c.timeBasedDrops?.some(d => d.benefitEdges?.some(be => be.benefit?.id === item.id));
        });

        if (camp) {
            gameName = camp.game?.displayName || gameName;
            gameBoxArt = getGameImageUrl(camp.game, 60, 80);
        } else {
            const nameMatch = allKnownCampaigns.find(c => item.name.toLowerCase().includes(c.game?.displayName?.toLowerCase()));
            if (nameMatch) {
                gameName = nameMatch.game?.displayName;
                gameBoxArt = getGameImageUrl(nameMatch.game, 60, 80);
            }
        }

        if (inventorySearchQuery) {
            const matchesGame = gameName.toLowerCase().includes(inventorySearchQuery);
            const matchesReward = item.name.toLowerCase().includes(inventorySearchQuery);
            if (!matchesGame && !matchesReward) return;
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

    const sortedGroupNames = Object.keys(groups).sort((a, b) => {
        const otherName = "Other Rewards";
        if (a === otherName && b !== otherName) return 1;
        if (a !== otherName && b === otherName) return -1;
        return groups[b].maxDate - groups[a].maxDate;
    });

    if (sortedGroupNames.length === 0 && inventorySearchQuery) {
        container.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-secondary);">No rewards matching "${inventorySearchQuery}".</div>`;
        return;
    }

    const panelsHtml = sortedGroupNames.map(gn => {
        const group = groups[gn];
        const rewardsSorted = group.rewards.sort((a, b) => new Date(b.lastAwardedAt) - new Date(a.lastAwardedAt));

        const rewardsHtml = rewardsSorted.map(r => {
            const d = new Date(r.lastAwardedAt);
            const dateStr = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getFullYear()).slice(-2)}`;
            const itemIcon = r.image
                ? `<img src="${r.image}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: contain; background: rgba(0,0,0,0.3); margin-bottom: 6px;">`
                : `<div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 6px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4V12"/><rect x="2" y="7" width="20" height="5" rx="1"/></svg></div>`;

            return `
                <div class="drop-item-row" style="margin-bottom: 0;">
                    ${itemIcon}
                    <div class="drop-info">
                        <h4>${r.name}</h4>
                        <div style="font-size: 11px; color: var(--text-secondary);">${dateStr}</div>
                    </div>
                </div>
            `;
        }).join('');

        const gameCover = group.img
            ? `<img src="${group.img}" style="width: 44px; height: 58px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-color);">`
            : `<div style="width: 44px; height: 58px; background: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">${ICONS.gamepad(22)}</div>`;

        return `
            <div class="farm-panel settings-panel" style="margin-bottom: 20px; width: 100%; display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; gap: 14px; align-items: center;">
                    ${gameCover}
                    <div>
                        <h3 style="margin: 0; font-size: 16px; color: white; font-weight: 800;">${gn}</h3>
                        <p style="margin: 2px 0 0; font-size: 12px; color: var(--text-secondary);">
                           Collected ${group.rewards.length} Drops
                        </p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    ${rewardsHtml}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = panelsHtml;
}

function renderIdlePlaceholder() {
    if (activeFarmingCampaignId || browsedCampaignId) return;

    const heroCard = getEl('heroMonitorCard');
    if (heroCard) {
        heroCard.innerHTML = `
            <div class="empty-state fade-in" style="width: 100%; text-align: center; padding: 28px 20px;">
                <div class="icon" style="margin-bottom: 12px; filter: drop-shadow(0 0 16px rgba(145, 70, 255, 0.45)); color: var(--accent-hover); display: flex; justify-content: center;">${ICONS.gamepad(48)}</div>
                <h2 style="margin-bottom: 8px; font-size: 20px; font-weight: 800; color: white;">Ready to Auto-Farm</h2>
                <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px; line-height: 1.5; font-size: 13.5px;">
                    Bot standing by. Click <b>Start Farm</b> in the sidebar or browse active campaigns to start earning Twitch drops automatically.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button class="btn-primary" onclick="document.getElementById('btnNavCampaigns').click()" style="width: auto; padding: 10px 22px; font-size: 13px;">Browse Active Campaigns</button>
                </div>
            </div>
        `;
    }

    const dropsContainer = getEl('currentFarmDropsContainer');
    if (dropsContainer) dropsContainer.style.display = 'none';
}

setupWebSocketListeners();
updateMinViewersUI();
updateMasterAutoFarmUI();
updatePriorityStatsCount();
renderIdlePlaceholder();
