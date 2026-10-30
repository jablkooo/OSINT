// ============================================================
// APP – inicializace, filtry, vyhledávání
// ============================================================

(() => {
  'use strict';

  const { debounce } = Utils;

  // ----- DOM -----
  const contentEl = document.getElementById('content');
  const filtersEl = document.getElementById('filters');
  const searchEl = document.getElementById('search');
  const noResultsEl = document.getElementById('noResults');

  // ----- STAV -----
  let activeCategory = 'all';
  let searchQuery = '';

  // ----- INIT -----
  function init() {
    if (!CATEGORIES.length || !TOOLS.length) {
      contentEl.innerHTML = '<p style="text-align:center;color:var(--warn)">Chyba: data se nenačetla.</p>';
      return;
    }

    // Vykreslit filtry + obsah
    Renderer.renderAll(contentEl, filtersEl, CATEGORIES, TOOLS);

    // Event listenery
    filtersEl.addEventListener('click', onFilterClick);
    searchEl.addEventListener('input', debounce(onSearch, 150));
    contentEl.addEventListener('click', onCopyClick);

    // Hlídat viditelnost – kdy zobrazit "prázdný stav"
    updateEmptyState();
  }

  // ----- FILTRY -----
  function onFilterClick(e) {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;

    activeCategory = btn.dataset.cat;

    // Aktivní tlačítko
    filtersEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    applyFilters();
  }

  // ----- SEARCH -----
  function onSearch(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  }

  // ----- APLIKACE FILTRŮ -----
  function applyFilters() {
    let visibleSections = 0;

    document.querySelectorAll('.category').forEach(sec => {
      const cat = sec.dataset.cat;
      const catMatch = (activeCategory === 'all' || activeCategory === cat);
      let visibleCards = 0;

      sec.querySelectorAll('.card').forEach(card => {
        const text = card.textContent.toLowerCase();
        const textMatch = !searchQuery || text.includes(searchQuery);

        if (catMatch && textMatch) {
          card.classList.remove('hidden');
          visibleCards++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (visibleCards > 0) {
        sec.classList.remove('hidden');
        visibleSections++;
        sec.querySelector('.count').textContent = visibleCards;
      } else {
        sec.classList.add('hidden');
      }
    });

    noResultsEl.classList.toggle('show', visibleSections === 0);
  }

  // ----- KOPÍROVÁNÍ -----
  async function onCopyClick(e) {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const text = btn.dataset.copy;
    const ok = await Utils.copyToClipboard(text);

    const original = btn.textContent;
    btn.textContent = ok ? '✓ Zkopírováno' : '✗ Chyba';
    btn.classList.toggle('copied', ok);

    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  }

  // ----- STAV "PRÁZDNÉ" -----
  function updateEmptyState() {
    const anyVisible = document.querySelector('.category:not(.hidden)');
    noResultsEl.classList.toggle('show', !anyVisible);
  }

  // ----- START -----
  document.addEventListener('DOMContentLoaded', init);
})();