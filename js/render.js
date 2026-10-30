// ============================================================
// RENDER – převádí data na DOM
// ============================================================

const Renderer = (() => {

  const { escapeHtml, prettyUrl } = Utils;

  /** Vytvoří HTML jedné karty nástroje */
  function cardHtml(tool) {
    const badge = `<span class="badge" data-type="${escapeHtml(tool.type)}">${escapeHtml(tool.type)}</span>`;

    // Tělo karty: buď příkaz (CLI) nebo odkaz (WEB)
    let body = '';
    if (tool.command) {
      body = `
        <div class="cmd-box">
          <span class="prompt">$</span>
          <code>${escapeHtml(tool.command)}</code>
          <button class="copy-btn" data-copy="${escapeHtml(tool.command)}" title="Kopírovat">Kopírovat</button>
        </div>`;
    } else if (tool.url) {
      body = `
        <div class="cmd-box is-link">
          <span class="prompt">🔗</span>
          <code><a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener">${escapeHtml(prettyUrl(tool.url))}</a></code>
        </div>`;
    }

    // Volitelný odkaz na zdroj (GitHub)
    const sourceLink = tool.link
      ? `<div class="source-link"><a href="${escapeHtml(tool.link)}" target="_blank" rel="noopener">📂 Zdrojový kód / dokumentace</a></div>`
      : '';

    return `
      <article class="card" data-category="${escapeHtml(tool.category)}">
        <h3>${escapeHtml(tool.name)} ${badge}</h3>
        <p class="desc">${escapeHtml(tool.description)}</p>
        ${body}
        ${sourceLink}
      </article>`;
  }

  /** Vyrenderuje celou sekci (kategorii) s nástroji */
  function sectionHtml(category, tools) {
    return `
      <section class="category" data-cat="${escapeHtml(category.id)}">
        <h2>
          <span class="icon">${category.icon}</span>
          ${escapeHtml(category.name)}
          <span class="count">${tools.length}</span>
        </h2>
        <div class="grid">
          ${tools.map(cardHtml).join('')}
        </div>
      </section>`;
  }

  /** Vyrenderuje filtrační tlačítka */
  function filtersHtml(categories) {
    const allBtn = `<button class="active" data-cat="all">Vše</button>`;
    const catBtns = categories.map(c =>
      `<button data-cat="${escapeHtml(c.id)}">${c.icon} ${escapeHtml(c.name)}</button>`
    ).join('');
    return allBtn + catBtns;
  }

  /** Vyrenderuje celou stránku (filtry + obsah) */
  function renderAll(rootEl, filtersEl, categories, tools) {
    filtersEl.innerHTML = filtersHtml(categories);

    rootEl.innerHTML = categories.map(cat => {
      const catTools = tools.filter(t => t.category === cat.id);
      return catTools.length ? sectionHtml(cat, catTools) : '';
    }).join('');
  }

  return { renderAll, cardHtml, sectionHtml, filtersHtml };
})();