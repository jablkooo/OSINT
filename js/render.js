const Renderer = (() => {
  const { escapeHtml, prettyUrl } = Utils;

  // --- Sidebar ---
  function sidebar(activeScenarioId) {
    const extras = [
      { id: 'stats', icon: '📊', name: 'Statistiky', desc: 'Přehled nástrojů a kategorií' },
      { id: 'favorites', icon: '⭐', name: 'Oblíbené', desc: 'Tvoje záložky' },
    ];
    const scenarioLinks = SCENARIOS.map(s => `
      <a href="#/${s.id}" class="nav-item ${s.id === activeScenarioId ? 'active' : ''}">
        <span class="nav-icon">${s.icon}</span>
        <span class="nav-text">
          <span class="nav-name">${escapeHtml(s.name)}</span>
          <span class="nav-desc">${escapeHtml(s.desc)}</span>
        </span>
      </a>
    `).join('');

    const extraLinks = extras.map(e => `
      <a href="#/${e.id}" class="nav-item nav-item--extra ${e.id === activeScenarioId ? 'active' : ''}">
        <span class="nav-icon">${e.icon}</span>
        <span class="nav-text">
          <span class="nav-name">${escapeHtml(e.name)}</span>
          <span class="nav-desc">${escapeHtml(e.desc)}</span>
        </span>
      </a>
    `).join('');

    return `
      <div class="nav-section-label">Scénáře</div>
      ${scenarioLinks}
      <div class="nav-section-label nav-section-label--extra">Nástroje</div>
      ${extraLinks}
    `;
  }

  // --- Badge ---
  function badge(type) {
    return `<span class="badge" data-type="${escapeHtml(type)}">${escapeHtml(type)}</span>`;
  }

  // --- Favorites button ---
  function favBtn(toolId) {
    const favs = Utils.storage.get('favorites', []);
    const isFav = favs.includes(toolId);
    return `<button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${escapeHtml(toolId)}" title="${isFav ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}">${isFav ? '⭐' : '☆'}</button>`;
  }

  // --- Mini karta (v seznamu scénáře) ---
  function toolCard(tool) {
    const favs = Utils.storage.get('favorites', []);
    const isFav = favs.includes(tool.id);
    return `
      <div class="tool-card" data-id="${escapeHtml(tool.id)}" data-type="${escapeHtml(tool.type)}">
        <a href="#/${tool.scenarios[0]}/${tool.id}" class="tool-card-link">
          <div class="tool-card-head">
            <h3>${escapeHtml(tool.name)}</h3>
            ${badge(tool.type)}
          </div>
          <p class="tool-card-desc">${escapeHtml(tool.description)}</p>
          <div class="tool-card-foot">
            ${tool.install ? '<span class="chip">📦 Instalace</span>' : ''}
            ${tool.usage ? '<span class="chip">⚡ Použití</span>' : ''}
            ${tool.links?.length ? '<span class="chip">🔗 Odkazy</span>' : ''}
          </div>
        </a>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${escapeHtml(tool.id)}" title="${isFav ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}">${isFav ? '⭐' : '☆'}</button>
      </div>
    `;
  }

  // --- Cmd box ---
  function cmdBox(command) {
    return `
      <div class="cmd">
        <span class="cmd-prompt">$</span>
        <code>${escapeHtml(command)}</code>
        <button class="copy-btn" data-copy="${escapeHtml(command)}">Kopírovat</button>
      </div>
    `;
  }

  // --- Detail nástroje ---
  function toolDetail(tool, scenarioId) {
    const scenario = SCENARIOS.find(s => s.id === scenarioId);
    const backUrl = scenario ? `#/${scenario.id}` : '#/';
    const backLabel = scenario ? scenario.name : 'Domů';
    const favs = Utils.storage.get('favorites', []);
    const isFav = favs.includes(tool.id);

    const installHtml = tool.install?.length ? `
      <section class="detail-section">
        <h2>📦 Instalace</h2>
        ${tool.install.map(i => `
          <div class="install-row">
            <span class="install-label">${escapeHtml(i.label)}</span>
            ${cmdBox(i.command)}
          </div>
        `).join('')}
      </section>
    ` : '';

    const usageHtml = tool.usage?.length ? `
      <section class="detail-section">
        <h2>⚡ Použití</h2>
        ${tool.usage.map(u => `
          <div class="install-row">
            <span class="install-label">${escapeHtml(u.label)}</span>
            ${cmdBox(u.command)}
          </div>
        `).join('')}
      </section>
    ` : '';

    const linksHtml = tool.links?.length ? `
      <section class="detail-section">
        <h2>🔗 Odkazy a stažení</h2>
        <div class="links-grid">
          ${tool.links.map(l => `
            <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="link-card">
              <span class="link-label">${escapeHtml(l.label)}</span>
              <span class="link-url">${escapeHtml(prettyUrl(l.url))}</span>
            </a>
          `).join('')}
        </div>
      </section>
    ` : '';

    const platformsHtml = tool.platforms?.length ? `
      <div class="platforms">
        <span class="platforms-label">Platformy:</span>
        ${tool.platforms.map(p => `<span class="platform-tag">${escapeHtml(p)}</span>`).join('')}
      </div>
    ` : '';

    const tagsHtml = tool.tags?.length ? `
      <div class="tags-row">
        ${tool.tags.map(tag => `<span class="tag-chip">#${escapeHtml(tag)}</span>`).join('')}
      </div>
    ` : '';

    const scenariosHtml = tool.scenarios.length > 1 ? `
      <div class="also-in">
        <span class="also-label">Také v:</span>
        ${tool.scenarios.filter(sid => sid !== scenarioId).map(sid => {
          const s = SCENARIOS.find(x => x.id === sid);
          return s ? `<a href="#/${s.id}/${tool.id}" class="also-link">${s.icon} ${escapeHtml(s.name)}</a>` : '';
        }).join('')}
      </div>
    ` : '';

    return `
      <div class="detail">
        <a href="${backUrl}" class="back-link">← Zpět na ${escapeHtml(backLabel)}</a>
        <header class="detail-head">
          <div class="detail-head-top">
            <h1>${escapeHtml(tool.name)} ${badge(tool.type)}</h1>
            <button class="fav-btn fav-btn--large ${isFav ? 'active' : ''}" data-fav="${escapeHtml(tool.id)}" title="${isFav ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}">
              ${isFav ? '⭐ Oblíbené' : '☆ Přidat do oblíbených'}
            </button>
          </div>
          <p class="detail-desc">${escapeHtml(tool.description)}</p>
          ${platformsHtml}
          ${tagsHtml}
          ${scenariosHtml}
        </header>
        ${installHtml}
        ${usageHtml}
        ${linksHtml}
      </div>
    `;
  }

  // --- Filtr lišta (typy) ---
  function typeFilterBar(types, activeType) {
    const all = ['Vše', ...types];
    return `
      <div class="type-filter" id="typeFilter">
        ${all.map(t => `
          <button class="type-btn ${(activeType || 'Vše') === t ? 'active' : ''}" data-filter="${escapeHtml(t)}">${escapeHtml(t)}</button>
        `).join('')}
      </div>
    `;
  }

  // --- Scénář (seznam nástrojů) ---
  function scenarioView(scenario, tools) {
    const types = [...new Set(tools.map(t => t.type))].sort();
    return `
      <div class="scenario-head">
        <h1><span class="scenario-icon">${scenario.icon}</span> ${escapeHtml(scenario.name)}</h1>
        <p>${escapeHtml(scenario.desc)}</p>
        <span class="scenario-count" id="toolCount">${tools.length} ${tools.length === 1 ? 'nástroj' : tools.length < 5 ? 'nástroje' : 'nástrojů'}</span>
      </div>
      ${typeFilterBar(types, null)}
      <div class="tools-grid" id="toolsGrid">
        ${tools.map(toolCard).join('')}
      </div>
    `;
  }

  // --- Stats view ---
  function statsView() {
    const stats = Utils.getStats();
    const typeColors = { CLI: '#00ff9d', WEB: '#00b8ff', AI: '#ff5e78', TOOL: '#ffc107', PLUGIN: '#ffc107' };
    const typeRows = Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).map(([type, count]) => {
      const pct = Math.round((count / stats.total) * 100);
      return `
        <div class="stat-row">
          <span class="stat-label">${badge(type)}</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar" style="width:${pct}%; background:${typeColors[type] || '#888'};"></div>
          </div>
          <span class="stat-count">${count}</span>
        </div>
      `;
    }).join('');

    const scenarioRows = SCENARIOS.map(s => {
      const count = stats.byScenario[s.id] || 0;
      const pct = Math.round((count / stats.total) * 100);
      return `
        <div class="stat-row">
          <span class="stat-label">${s.icon} ${escapeHtml(s.name)}</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar stat-bar--blue" style="width:${pct}%;"></div>
          </div>
          <span class="stat-count">${count}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="stats-view">
        <h1>📊 Statistiky toolkitu</h1>
        <div class="stats-hero">
          <div class="stat-card">
            <div class="stat-big">${stats.total}</div>
            <div class="stat-sub">nástrojů celkem</div>
          </div>
          <div class="stat-card">
            <div class="stat-big">${stats.scenarios}</div>
            <div class="stat-sub">scénářů</div>
          </div>
          <div class="stat-card">
            <div class="stat-big">${Object.keys(stats.byType).length}</div>
            <div class="stat-sub">typů nástrojů</div>
          </div>
        </div>

        <div class="stats-sections">
          <section class="detail-section">
            <h2>🏷️ Podle typu</h2>
            <div class="stat-rows">${typeRows}</div>
          </section>
          <section class="detail-section">
            <h2>🗂️ Podle scénáře</h2>
            <div class="stat-rows">${scenarioRows}</div>
          </section>
        </div>
      </div>
    `;
  }

  // --- Favorites view ---
  function favoritesView() {
    const favIds = Utils.storage.get('favorites', []);
    const favTools = TOOLS.filter(t => favIds.includes(t.id));
    if (!favTools.length) {
      return `
        <div class="empty-state">
          <div class="empty-icon">☆</div>
          <h2>Žádné oblíbené</h2>
          <p>Klikni na ☆ na kartě nástroje pro přidání do oblíbených.</p>
          <a href="#/" class="btn-home">← Zpět domů</a>
        </div>
      `;
    }
    return `
      <div class="scenario-head">
        <h1>⭐ Oblíbené nástroje</h1>
        <p>Tvoje uložené záložky.</p>
        <span class="scenario-count">${favTools.length} ${favTools.length === 1 ? 'nástroj' : favTools.length < 5 ? 'nástroje' : 'nástrojů'}</span>
      </div>
      <div class="tools-grid">
        ${favTools.map(toolCard).join('')}
      </div>
    `;
  }

  // --- Globální search výsledky ---
  function globalSearchResults(query, results) {
    if (!query) return '';
    if (!results.length) {
      return `
        <div class="empty-state">
          <div class="empty-icon">😶‍🌫️</div>
          <h2>Nic nenalezeno</h2>
          <p>Pro dotaz "<strong>${escapeHtml(query)}</strong>" nebyl nalezen žádný nástroj.</p>
        </div>
      `;
    }
    return `
      <div class="scenario-head">
        <h1>🔍 Výsledky hledání</h1>
        <p>Dotaz: <strong>${escapeHtml(query)}</strong></p>
        <span class="scenario-count">${results.length} ${results.length === 1 ? 'výsledek' : results.length < 5 ? 'výsledky' : 'výsledků'}</span>
      </div>
      <div class="tools-grid">
        ${results.map(toolCard).join('')}
      </div>
    `;
  }
  // --- Home ---
  function homeView() {
    const total = TOOLS.length;
    return `
      <div class="home">
        <div class="home-hero">
          <div class="home-avatar-wrap">
            <img src="https://github.com/jablkooo.png?size=200" alt="Jablkooo" class="home-avatar">
          </div>
          <h1>🕵️ <span>OSINT</span> Toolkit</h1>
          <p class="home-author">od <strong>Jablkooo</strong></p>
          <a href="https://github.com/jablkooo/OSINT" target="_blank" rel="noopener" class="home-github-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span>Zobrazit na GitHubu</span>
          </a>
        </div>
        <p class="home-sub">Vyber scénář vlevo a otevře se ti sada nástrojů s návodem na instalaci a použití.</p>
        <div class="home-hint">
          <kbd>/</kbd> Globální search &nbsp;·&nbsp; <kbd>?</kbd> Klávesové zkratky &nbsp;·&nbsp; <kbd>Esc</kbd> Zpět
        </div>
        <div class="home-scenarios">
          ${SCENARIOS.map(s => {
            const count = TOOLS.filter(t => t.scenarios.includes(s.id)).length;
            return `
              <a href="#/${s.id}" class="home-scenario">
                <span class="home-scenario-icon">${s.icon}</span>
                <span class="home-scenario-name">${Utils.escapeHtml(s.name)}</span>
                <span class="home-scenario-desc">${Utils.escapeHtml(s.desc)}</span>
                <span class="home-scenario-count">${count} nástrojů</span>
              </a>
            `;
          }).join('')}
        </div>
        <div class="home-total">Celkem <strong>${total}</strong> nástrojů ve ${SCENARIOS.length} scénářích</div>
        <p class="home-warn">⚠️ Používej eticky a v souladu se zákony. OSINT ≠ hacking.</p>
      </div>
    `;
  }
  
    return { sidebar, toolDetail, scenarioView, homeView, statsView, favoritesView, globalSearchResults };
})();
