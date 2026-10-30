const Renderer = (() => {
  const { escapeHtml, prettyUrl } = Utils;

  // --- Sidebar ---
  function sidebar(activeScenarioId) {
    return SCENARIOS.map(s => `
      <a href="#/${s.id}" class="nav-item ${s.id === activeScenarioId ? 'active' : ''}">
        <span class="nav-icon">${s.icon}</span>
        <span class="nav-text">
          <span class="nav-name">${escapeHtml(s.name)}</span>
          <span class="nav-desc">${escapeHtml(s.desc)}</span>
        </span>
      </a>
    `).join('');
  }

  // --- Badge ---
  function badge(type) {
    return `<span class="badge" data-type="${escapeHtml(type)}">${escapeHtml(type)}</span>`;
  }

  // --- Mini karta (v seznamu scénáře) ---
  function toolCard(tool) {
    return `
      <a href="#/${tool.scenarios[0]}/${tool.id}" class="tool-card" data-id="${escapeHtml(tool.id)}">
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

    return `
      <div class="detail">
        <a href="${backUrl}" class="back-link">← Zpět na ${escapeHtml(backLabel)}</a>
        <header class="detail-head">
          <h1>${escapeHtml(tool.name)} ${badge(tool.type)}</h1>
          <p class="detail-desc">${escapeHtml(tool.description)}</p>
          ${platformsHtml}
        </header>
        ${installHtml}
        ${usageHtml}
        ${linksHtml}
      </div>
    `;
  }

  // --- Scénář (seznam nástrojů) ---
  function scenarioView(scenario, tools) {
    return `
      <div class="scenario-head">
        <h1><span class="scenario-icon">${scenario.icon}</span> ${escapeHtml(scenario.name)}</h1>
        <p>${escapeHtml(scenario.desc)}</p>
        <span class="scenario-count">${tools.length} ${tools.length === 1 ? 'nástroj' : tools.length < 5 ? 'nástroje' : 'nástrojů'}</span>
      </div>
      <div class="tools-grid">
        ${tools.map(toolCard).join('')}
      </div>
    `;
  }

  // --- Home ---
  function homeView() {
    return `
      <div class="home">
        <h1>🕵️ <span>OSINT</span> Toolkit</h1>
        <p class="home-sub">Vyber scénář vlevo a otevře se ti sada nástrojů s návodem na instalaci a použití.</p>
        <div class="home-scenarios">
          ${SCENARIOS.map(s => {
            const count = TOOLS.filter(t => t.scenarios.includes(s.id)).length;
            return `
              <a href="#/${s.id}" class="home-scenario">
                <span class="home-scenario-icon">${s.icon}</span>
                <span class="home-scenario-name">${escapeHtml(s.name)}</span>
                <span class="home-scenario-desc">${escapeHtml(s.desc)}</span>
                <span class="home-scenario-count">${count} nástrojů</span>
              </a>
            `;
          }).join('')}
        </div>
        <p class="home-warn">⚠️ Používej eticky a v souladu se zákony. OSINT ≠ hacking.</p>
      </div>
    `;
  }

  return { sidebar, toolDetail, scenarioView, homeView };
})();
