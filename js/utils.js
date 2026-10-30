const Utils = (() => {
  const escapeHtml = (str) => {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  };

  const prettyUrl = (url) => String(url).replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Debounce helper
  const debounce = (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  // LocalStorage helpers (bezpečně – fallback při blokování)
  const storage = {
    get(key, fallback = null) {
      try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch { return false; }
    },
  };

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch { return false; }
  }

  // Statistiky
  function getStats() {
    const total = TOOLS.length;
    const byType = {};
    const byScenario = {};
    TOOLS.forEach(t => {
      byType[t.type] = (byType[t.type] || 0) + 1;
      t.scenarios.forEach(s => { byScenario[s] = (byScenario[s] || 0) + 1; });
    });
    return { total, byType, byScenario, scenarios: SCENARIOS.length };
  }

  return { escapeHtml, prettyUrl, debounce, copyToClipboard, storage, getStats };
})();
