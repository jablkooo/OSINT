(() => {
  'use strict';

  const sidebarEl    = document.getElementById('sidebarNav');
  const contentEl    = document.getElementById('content');
  const searchEl     = document.getElementById('search');
  const breadcrumbEl = document.getElementById('breadcrumb');
  const hamburgerEl  = document.getElementById('hamburger');
  const sidebarOuter = document.querySelector('.sidebar');

  // -------------------------------------------------------
  // Stav filtru v scénáři
  // -------------------------------------------------------
  let currentTypeFilter = 'Vše';

  // -------------------------------------------------------
  // Breadcrumb helper
  // -------------------------------------------------------
  function setBreadcrumb(scenario, tool) {
    if (scenario && tool) {
      const s = SCENARIOS.find(x => x.id === scenario);
      const t = TOOLS.find(x => x.id === tool);
      breadcrumbEl.innerHTML = s && t
        ? `<a href="#/">Domů</a> <span>›</span> <a href="#/${s.id}">${s.icon} ${Utils.escapeHtml(s.name)}</a> <span>›</span> <span class="crumb-current">${Utils.escapeHtml(t.name)}</span>`
        : '';
    } else if (scenario === 'stats') {
      breadcrumbEl.innerHTML = `<a href="#/">Domů</a> <span>›</span> <span class="crumb-current">📊 Statistiky</span>`;
    } else if (scenario === 'favorites') {
      breadcrumbEl.innerHTML = `<a href="#/">Domů</a> <span>›</span> <span class="crumb-current">⭐ Oblíbené</span>`;
    } else if (scenario) {
      const s = SCENARIOS.find(x => x.id === scenario);
      breadcrumbEl.innerHTML = s
        ? `<a href="#/">Domů</a> <span>›</span> <span class="crumb-current">${s.icon} ${Utils.escapeHtml(s.name)}</span>`
        : '';
    } else {
      breadcrumbEl.innerHTML = '';
    }
  }

  // -------------------------------------------------------
  // Render route
  // -------------------------------------------------------
  function renderRoute({ scenario, tool }) {
    currentTypeFilter = 'Vše';
    closeSidebar();

    sidebarEl.innerHTML = Renderer.sidebar(scenario);

    setBreadcrumb(scenario, tool);

    // Speciální stránky
    if (scenario === 'stats') {
      searchEl.style.display = 'none';
      contentEl.innerHTML = Renderer.statsView();
      window.scrollTo(0, 0);
      return;
    }
    if (scenario === 'favorites') {
      searchEl.style.display = 'none';
      contentEl.innerHTML = Renderer.favoritesView();
      window.scrollTo(0, 0);
      return;
    }

    if (!scenario) {
      contentEl.innerHTML = Renderer.homeView();
      searchEl.style.display = 'none';
      searchEl.value = '';
      return;
    }

    const scen = SCENARIOS.find(s => s.id === scenario);
    if (!scen) {
      contentEl.innerHTML = `<p class="err">Scénář nenalezen. <a href="#/">Zpět domů</a></p>`;
      return;
    }

    if (tool) {
      const t = TOOLS.find(x => x.id === tool);
      if (!t) {
        contentEl.innerHTML = `<p class="err">Nástroj nenalezen. <a href="#/${scen.id}">Zpět na ${scen.name}</a></p>`;
        return;
      }
      searchEl.style.display = 'none';
      contentEl.innerHTML = Renderer.toolDetail(t, scen.id);
      window.scrollTo(0, 0);
      return;
    }

    // Seznam nástrojů scénáře + search
    searchEl.style.display = 'block';
    searchEl.value = '';
    const tools = TOOLS.filter(t => t.scenarios.includes(scen.id));
    contentEl.innerHTML = Renderer.scenarioView(scen, tools);
  }

  // -------------------------------------------------------
  // Globální search (v topbaru)
  // -------------------------------------------------------
  let globalSearchActive = false;

  function activateGlobalSearch() {
    globalSearchActive = true;
    searchEl.style.display = 'block';
    searchEl.placeholder = '🔍 Hledat napříč všemi nástroji...';
    searchEl.focus();
    breadcrumbEl.innerHTML = `<span class="crumb-current">🔍 Globální hledání</span>`;
  }

  function deactivateGlobalSearch() {
    globalSearchActive = false;
    searchEl.placeholder = 'Hledat nástroj...';
    const route = Router.parse();
    renderRoute(route);
  }

  const debouncedSearch = Utils.debounce((q) => {
    if (globalSearchActive) {
      if (!q) {
        deactivateGlobalSearch();
        return;
      }
      const ql = q.toLowerCase();
      const results = TOOLS.filter(t =>
        t.name.toLowerCase().includes(ql) ||
        t.description.toLowerCase().includes(ql) ||
        (t.tags || []).some(tag => tag.includes(ql)) ||
        (t.usage || []).some(u => u.command.toLowerCase().includes(ql)) ||
        (t.install || []).some(i => i.command.toLowerCase().includes(ql))
      );
      contentEl.innerHTML = Renderer.globalSearchResults(q, results);
    } else {
      // Lokální search v scénáři
      const cards = contentEl.querySelectorAll('.tool-card');
      let visible = 0;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = !q || text.includes(q.toLowerCase());
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      updateToolCount(visible);
      let info = contentEl.querySelector('.search-info');
      if (q && !visible) {
        if (!info) {
          info = document.createElement('p');
          info.className = 'search-info';
          info.textContent = '😶‍🌫️ Nic nenalezeno.';
          contentEl.appendChild(info);
        }
      } else if (info) {
        info.remove();
      }
    }
  }, 150);

  function bindSearch() {
    searchEl.addEventListener('input', () => debouncedSearch(searchEl.value.trim()));
  }

  // -------------------------------------------------------
  // Type filter (v scénáři)
  // -------------------------------------------------------
  function bindTypeFilter() {
    contentEl.addEventListener('click', e => {
      const btn = e.target.closest('.type-btn');
      if (!btn) return;
      currentTypeFilter = btn.dataset.filter;
      // Přepni aktivní
      contentEl.querySelectorAll('.type-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === currentTypeFilter));
      // Filtruj karty
      const cards = contentEl.querySelectorAll('.tool-card');
      let visible = 0;
      cards.forEach(card => {
        const show = currentTypeFilter === 'Vše' || card.dataset.type === currentTypeFilter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      updateToolCount(visible);
    });
  }

  function updateToolCount(count) {
    const el = document.getElementById('toolCount');
    if (!el) return;
    el.textContent = `${count} ${count === 1 ? 'nástroj' : count < 5 ? 'nástroje' : 'nástrojů'}`;
  }

  // -------------------------------------------------------
  // Copy tlačítka
  // -------------------------------------------------------
  function bindCopy() {
    contentEl.addEventListener('click', async (e) => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      const ok = await Utils.copyToClipboard(btn.dataset.copy);
      const orig = btn.textContent;
      btn.textContent = ok ? '✓' : '✗';
      btn.classList.toggle('copied', ok);
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 1200);
    });
  }

  // -------------------------------------------------------
  // Favorites (toggle)
  // -------------------------------------------------------
  function bindFavorites() {
    contentEl.addEventListener('click', e => {
      const btn = e.target.closest('.fav-btn');
      if (!btn) return;
      const toolId = btn.dataset.fav;
      let favs = Utils.storage.get('favorites', []);
      if (favs.includes(toolId)) {
        favs = favs.filter(id => id !== toolId);
        btn.textContent = '☆';
        btn.classList.remove('active');
        btn.title = 'Přidat do oblíbených';
        if (btn.classList.contains('fav-btn--large')) btn.textContent = '☆ Přidat do oblíbených';
      } else {
        favs.push(toolId);
        btn.textContent = '⭐';
        btn.classList.add('active');
        btn.title = 'Odebrat z oblíbených';
        if (btn.classList.contains('fav-btn--large')) btn.textContent = '⭐ Oblíbené';
      }
      Utils.storage.set('favorites', favs);
      // Pokud jsme na favorites view – re-render
      if (Router.parse().scenario === 'favorites') {
        contentEl.innerHTML = Renderer.favoritesView();
      }
    });
  }

  // -------------------------------------------------------
  // Hamburger (mobile sidebar)
  // -------------------------------------------------------
  function closeSidebar() {
    sidebarOuter?.classList.remove('open');
  }

  function bindHamburger() {
    if (!hamburgerEl) return;
    hamburgerEl.addEventListener('click', () => {
      sidebarOuter?.classList.toggle('open');
    });
    // Klik mimo sidebar = zavřít
    document.addEventListener('click', e => {
      if (sidebarOuter?.classList.contains('open') &&
          !sidebarOuter.contains(e.target) &&
          e.target !== hamburgerEl) {
        closeSidebar();
      }
    });
  }

  // -------------------------------------------------------
  // Klávesové zkratky
  // -------------------------------------------------------
  function bindKeyboard() {
    document.addEventListener('keydown', e => {
      const tag = document.activeElement.tagName;
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

      // / → aktivovat globální search
      if (e.key === '/' && !inInput) {
        e.preventDefault();
        activateGlobalSearch();
        return;
      }

      // Esc → zavřít search / modal, nebo jít zpět
      if (e.key === 'Escape') {
        if (globalSearchActive) {
          searchEl.value = '';
          searchEl.blur();
          deactivateGlobalSearch();
          return;
        }
        if (inInput) { searchEl.blur(); return; }
        const route = Router.parse();
        if (route.tool) { location.hash = `#/${route.scenario}`; return; }
        if (route.scenario) { location.hash = '#/'; return; }
        return;
      }

      // ? → zobraz help modal
      if (e.key === '?' && !inInput) {
        showHelpModal();
        return;
      }

      // g+s = globální search (vim-style, jen pro nerdy)
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        activateGlobalSearch();
      }
    });

    // Pokud uživatel začne psát v search inputu – zaktivuj search
    searchEl.addEventListener('focus', () => {
      if (!globalSearchActive && searchEl.style.display === 'none') {
        activateGlobalSearch();
      }
    });
  }

  // -------------------------------------------------------
  // Help modal
  // -------------------------------------------------------
  function showHelpModal() {
    if (document.getElementById('helpModal')) return;
    const modal = document.createElement('div');
    modal.id = 'helpModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h2>⌨️ Klávesové zkratky</h2>
          <button class="modal-close" id="modalClose">✕</button>
        </div>
        <div class="shortcuts-grid">
          <kbd>/</kbd><span>Globální hledání</span>
          <kbd>Esc</kbd><span>Zavřít search / jít zpět</span>
          <kbd>?</kbd><span>Zobrazit tuto nápovědu</span>
          <kbd>Ctrl+S</kbd><span>Globální hledání (alt.)</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.id === 'modalClose') modal.remove();
    });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', esc); }
    });
  }

  // -------------------------------------------------------
  // Init
  // -------------------------------------------------------
  function init() {
    Router.onChange(renderRoute);
    bindSearch();
    bindCopy();
    bindFavorites();
    bindHamburger();
    bindKeyboard();
    bindTypeFilter();

    if (!location.hash) location.hash = '#/';
    renderRoute(Router.parse());
  }

  document.addEventListener('DOMContentLoaded', init);
})();
