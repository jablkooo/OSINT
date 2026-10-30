# 📄 README.md – kompletní verze

<div align="center">

# 🕵️ OSINT Toolkit

**Kurátorovaný katalog OSINT nástrojů v přehledném dashboardu**

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://github.com/jablkooo/OSINT)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[🌐 Live Demo](#) · [🐛 Nahlásit chybu](https://github.com/jablkooo/OSINT/issues) · [💡 Návrh funkce](https://github.com/jablkooo/OSINT/issues)

</div>

---

## 📖 O projektu

**OSINT Toolkit** je jednostránková webová aplikace, která slouží jako přehledný katalog nástrojů pro **Open Source Intelligence** (OSINT). Nástroje jsou rozdělené do logických **scénářů** (stalking, e-maily, telefony, domény, geolokace…) a u každého najdeš:

- 📦 **Instalační příkazy** (pip, apt, brew, go, docker)
- ⚡ **Příklady použití** s reálnými parametry
- 🔗 **Odkazy na GitHub** a oficiální dokumentaci
- 📋 **Tlačítko „Kopírovat"** u každého příkazu

Vše funguje **bez serveru a bez závislostí** – stačí otevřít `index.html`.

> ⚠️ **Disclaimer:** Tento projekt je určený pro **etické a legální** vzdělávací účely. OSINT ≠ hacking. Vždy respektuj soukromí, GDPR a zákony dané země.

---

## ✨ Funkce

### 🗂️ Scénáře (14 kategorií)
- 🕵️ Stalking / stopa
- 📧 E-maily a identity
- 📱 Telefonní čísla
- 🖼️ Metadata a média
- 🌐 Domény a weby
- 📍 Geolokace
- 🇨🇿 České OSINT
- 🕸️ Vizualizace
- 🔌 Sítě a infrastruktura
- 🧅 Dark Web / Leaky
- 🪙 Krypto a blockchain
- 👤 Osoby a jména
- 🏢 Firmy a organizace
- 🤖 AI OSINT nástroje

### 🔍 Vyhledávání a filtrování
- **Živé hledání** napříč názvy, popisy, tagy i příkazy
- **Filtrování podle typu** (CLI / WEB / AI / TOOL / PLUGIN)
- **Globální hledání** napříč všemi scénáři (klávesa `/`)

### ⭐ Personalizace
- **Oblíbené nástroje** uložené v `localStorage`
- **Statistiky** – počty nástrojů podle typu a scénáře
- **Tmavé téma** optimalizované pro dlouhé sezení

### ⌨️ Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `/` | Aktivovat globální hledání |
| `?` | Zobrazit nápovědu (modal) |
| `Esc` | Zavřít hledání / jít zpět |
| `Ctrl + S` | Alternativní spuštění hledání |

### 📱 Responzivní design
- **Desktop** – trvale viditelný sidebar, mřížka karet
- **Tablet** – skrytý sidebar, hamburger menu
- **Mobil** – jednosloupcový layout, optimalizované příkazy

---

## 🚀 Spuštění

### Varianta 1: Otevřít lokálně (nejjednodušší)

```bash
git clone https://github.com/jablkooo/OSINT.git
cd OSINT
```

Pak **dvojklikem** otevři `index.html` v prohlížeči. Hotovo. 🎉

> Funguje i přes `file://` protokol – nepotřebuješ žádný lokální server.

### Varianta 2: Přes lokální server (volitelné)

Pokud chceš vyvíjet a mít live-reload:

```bash
# Python 3
python -m http.server 8000

# nebo Node.js (npx)
npx serve

# nebo PHP
php -S localhost:8000
```

Pak otevři `http://localhost:8000`.

### Varianta 3: GitHub Pages (nasazení)

1. Jdi do **Settings → Pages** svého repozitáře
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` / `root`
4. Hotovo – web běží na `https://jablkooo.github.io/OSINT/`

---

## 📁 Struktura projektu

```
OSINT/
│
├── 📄 index.html              # HTML kostra (layout, sidebar, topbar)
├── 📄 README.md               # Tato dokumentace
│
├── 📁 css/
│   ├── 🎨 base.css            # CSS proměnné, reset, typografie, scrollbar
│   ├── 🎨 layout.css          # Sidebar, topbar, main, breadcrumb, avatar
│   ├── 🎨 tools.css           # Karty, detaily, statistiky, cmd boxy, modal
│   └── 🎨 responsive.css      # Media queries (tablet, mobil, print)
│
└── 📁 js/
    ├── 📦 data.js             # ⭐ Data – scénáře a nástroje
    ├── 🛠️ utils.js            # Helpery (escape, copy, debounce, storage, stats)
    ├── 🖼️ render.js           # Generátory HTML (karty, detaily, views)
    ├── 🧭 router.js           # Hash routing (#/scenario/tool)
    └── ⚡ app.js              # Inicializace, eventy, filtry, klávesy
```

### Proč takto?

| Soubor | Zodpovědnost | Upravíš když… |
|--------|--------------|---------------|
| `index.html` | Strukturální kostra | Měníš layout nebo přidáváš meta tagy |
| `css/base.css` | Design systém | Chceš změnit barvy nebo fonty |
| `css/layout.css` | Rozmístění bloků | Přesouváš sidebar nebo topbar |
| `css/tools.css` | Vzhled komponent | Chceš jiné karty, tlačítka… |
| `css/responsive.css` | Mobilní úpravy | Řešíš breakpointy |
| `js/data.js` | **Data** | **Přidáváš nový nástroj** ⭐ |
| `js/utils.js` | Helpery | Přidáváš novou utilitu |
| `js/render.js` | Data → HTML | Měníš strukturu karty |
| `js/router.js` | URL routing | Měníš URL schéma |
| `js/app.js` | Logika a eventy | Měníš filtrování, klávesy |

---

## 🛠️ Jak přidat nový nástroj

Stačí **jeden objekt** do pole `TOOLS` v `js/data.js`. Šablona:

```javascript
{
  id: 'muj-nastroj',                    // unikátní ID (pro URL)
  name: 'Můj nástroj',                  // zobrazovaný název
  scenarios: ['stalking', 'email'],     // do kterých scénářů patří
  type: 'CLI',                          // CLI | WEB | AI | TOOL | PLUGIN
  platforms: ['Linux', 'macOS'],        // volitelné – jen pro CLI/TOOL
  tags: ['username', 'social'],         // volitelné – pro hledání

  description: 'Co nástroj dělá a k čemu je dobrý.',

  // Volitelné – instalační příkazy (CLI nástroje)
  install: [
    { label: 'pip', command: 'pip install muj-nastroj' },
    { label: 'Docker', command: 'docker pull user/muj-nastroj' },
  ],

  // Volitelné – příklady použití
  usage: [
    { label: 'Základní scan', command: 'muj-nastroj scan target' },
    { label: 'Pokročilé', command: 'muj-nastroj --verbose --json' },
  ],

  // Volitelné – externí odkazy
  links: [
    { label: 'GitHub', url: 'https://github.com/user/repo' },
    { label: 'Dokumentace', url: 'https://docs.example.com' },
  ],
},
```

**Žádné kopírování HTML, žádná registrace.** Po obnovení stránky (Ctrl+F5) se nástroj objeví:
- ✅ v seznamu svého scénáře
- ✅ v globálním hledání
- ✅ ve filtru podle typu
- ✅ ve statistikách
- ✅ na detailu s příkazy a odkazy

### Jak přidat nový scénář

Jeden objekt do pole `SCENARIOS`:

```javascript
{
  id: 'muj-scenario',              // unikátní ID
  icon: '🎯',                      // emoji
  name: 'Můj scénář',              // zobrazovaný název
  desc: 'Krátký popis scénáře',    // jeden řádek
},
```

Automaticky se objeví v sidebaru, na home page i v breadcrumbu.

---

## 🎨 Přizpůsobení

### Změna barevné palety

Uprav CSS proměnné v `css/base.css`:

```css
:root {
  --accent: #00ff9d;     /* hlavní zelená */
  --accent-2: #00b8ff;   /* modrá */
  --accent-3: #7c5cfc;   /* fialová */
  --bg: #080c18;         /* pozadí */
  --panel: #101624;      /* karty */
  --text: #dce8f6;       /* text */
}
```

### Změna avataru / brandu

**Avatar** je nastavený na GitHub profilovku (`https://github.com/jablkooo.png?size=200`). Změň ve **dvou místech**:

1. `index.html` – `.brand-avatar` (`<img src="...">`)
2. `js/render.js` – funkce `homeView()`, `.home-avatar` (`<img src="...">`)

**GitHub odkaz** v sidebaru: `index.html`, hledej `sidebar-github`.

---

## ⌨️ Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `/` | Otevře globální hledání |
| `?` | Zobrazí modal s nápovědou |
| `Esc` | Zavře hledání / jde o úroveň zpět |
| `Ctrl + S` | Alternativní hledání (pro nerdy) |

---

## 🧪 Testování

Projekt nemá testovací framework, ale obsahuje **checklist** pro ruční testování:

- [ ] Home page zobrazuje avatar, GitHub odkaz a karty scénářů
- [ ] Sidebar obsahuje všech 14 scénářů + Statistiky + Oblíbené
- [ ] Klik na scénář otevře seznam nástrojů
- [ ] Klik na nástroj otevře detail s instalací a použitím
- [ ] Tlačítko „Kopírovat" zkopíruje příkaz do schránky
- [ ] Hvězdička přidá nástroj do oblíbených (přežije refresh)
- [ ] `/` otevře globální hledání
- [ ] `?` otevře modal s nápovědou
- [ ] `Esc` funguje jako „zpět"
- [ ] Filtry typu (CLI / WEB / AI) správně skrývají karty
- [ ] Statistiky zobrazují správné počty
- [ ] Responzivita na mobilu (DevTools → Toggle device)

---

## 🛣️ Roadmap

- [x] Základní katalog se scénáři
- [x] Vyhledávání a filtrování
- [x] Oblíbené (localStorage)
- [x] Statistiky
- [x] Klávesové zkratky
- [x] Responzivní design
- [ ] 🌙/☀️ Přepínač dark/light tématu
- [ ] 📤 Export oblíbených do JSON
- [ ] 🖨️ Tisk do PDF (report)
- [ ] 🔗 Sdílení filtru přes URL hash
- [ ] 🌐 Anglická lokalizace
- [ ] 🤖 AI doporučování nástrojů podle zadání

---

## 🤝 Přispívání

Máš nápad na nový nástroj, scénář nebo vylepšení? **Pull requesty jsou vítány!**

1. **Fork** tento repozitář
2. Vytvoř branch: `git checkout -b feature/novy-nastroj`
3. Přidej nástroj do `js/data.js` (viz [Jak přidat nový nástroj](#-jak-přidat-nový-nástroj))
4. Zkontroluj, že funguje (otevři `index.html`, projdi checklist)
5. Commitni: `git commit -m "feat: přidán nástroj XYZ"`
6. Pushni: `git push origin feature/novy-nastroj`
7. Otevři **Pull Request**

### Pravidla pro nové nástroje

- ✅ Musí být **funkční** a **veřejně dostupný**
- ✅ Musí být **legální** – žádné nástroje pro hacking bez svolení
- ✅ Krátký, výstižný popis (1–2 věty)
- ✅ Reálné příklady použití (ne `--help`)
- ✅ Odkaz na **oficiální zdroj** nebo **GitHub**

---

## 📜 Licence

Tento projekt je licencován pod **MIT licencí** – viz soubor [LICENSE](LICENSE).

Stručně: Můžeš kód **volně používat, upravovat a distribuovat**, ale **bez záruky**.

---

## 🙏 Poděkování

- Komunitě OSINT nadšenců za tipy na nástroje
- Všem, kdo přispěli nápady nebo PR
- [Shodan](https://www.shodan.io/), [OSINT Framework](https://osintframework.com/) a dalším za inspiraci

---

## ⚠️ Právní upozornění

> **Tento nástroj je určen výhradně pro vzdělávací a etické účely.**
>
> - Nepoužívej ho pro **stalking**, **obtěžování** nebo **neoprávněné sledování** osob
> - Respektuj **GDPR**, **autorská práva** a **zákony** své země
> - Některé nástroje (PimEyes, Shodan, Dehashed…) mají svá vlastní **Terms of Service** – čti je
> - Za **zneužití** nástrojů nese plnou odpovědnost **uživatel**

**OSINT ≠ hacking. OSINT = práce s veřejně dostupnými informacemi.**

---

<div align="center">

**Vytvořeno s ❤️ pro OSINT komunitu**

[⬆ Zpět nahoru](#-osint-toolkit)

</div>
