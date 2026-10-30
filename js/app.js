(() => {
  'use strict';

  const sidebarEl   = document.getElementById('sidebarNav');
  const contentEl   = document.getElementById('content');
  const searchEl    = document.getElementById('search');
  const breadcrumbEl = document.getElementById('breadcrumb');

  // --- Vykreslení podle aktuální routy ---
  function renderRoute({ scenario, tool }) {
    // Aktivní scénář pro sidebar
    sidebarEl.innerHTML = Renderer.sidebar(scenario);

    // Breadcrumb
    if (scenario && tool) {
      const s = SCENARIOS.find(x => x.id === scenario);
      const t = TOOLS.find(x => x.id === tool);
      breadcrumbEl.innerHTML = s && t
        ? `<a href="#/">Domů</a> <span>›</span> <a href="#/${s.id}">${s.icon} ${Utils.escapeHtml(s.name)}</a> <span>›</span> <span class="crumb-current">${Utils.escapeHtml(t.name)}</span>`
        : '';
    } else if (scenario) {
      const s = SCENARIOS.find(x => x.id === scenario);
      breadcrumbEl.innerHTML = s
        ? `<a href="#/">Domů</a> <span>›</span> <span class="crumb-current">${s.icon} ${Utils.escapeHtml(s.name)}</span>`
        : '';
    } else {
      breadcrumbEl.innerHTML = '';
    }

    // Obsah
    if (!scenario) {
      contentEl.innerHTML = Renderer.homeView();
      searchEl.style.display = 'none';
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

  // --- Live search uvnitř scénáře ---
  function bindSearch() {
    searchEl.addEventListener('input', () => {
      const q = searchEl.value.toLowerCase().trim();
      const cards = contentEl.querySelectorAll('.tool-card');
      let visible = 0;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = !q || text.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
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
    });
  }

  // --- Copy tlačítka ---
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

  // --- Init ---
  function init() {
    Router.onChange(renderRoute);
    bindSearch();
    bindCopy();

    if (!location.hash) location.hash = '#/';
    renderRoute(Router.parse());
  }

  document.addEventListener('DOMContentLoaded', init);
})();
