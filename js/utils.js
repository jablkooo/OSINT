// ============================================================
// UTILS – pomocné funkce
// ============================================================

const Utils = (() => {

  /** Escapuje HTML znaky (bezpečné vkládání uživatelských dat) */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Zkopíruje text do schránky, vrátí Promise */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback pro file:// nebo starší prohlížeče
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  /** Debounce – zpozdí volání funkce */
  function debounce(fn, delay = 150) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  /** Vrátí zkrácenou URL pro zobrazení (bez protokolu) */
  function prettyUrl(url) {
    return String(url).replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  return { escapeHtml, copyToClipboard, debounce, prettyUrl };
})();