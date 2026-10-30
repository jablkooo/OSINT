\# 🕵️ OSINT Toolkit



Katalog OSINT nástrojů v přehledném dashboardu.



\## Struktura

osint-toolkit/

├── index.html # HTML kostra

├── css/

│ ├── base.css # Proměnné, reset, typografie

│ ├── layout.css # Header, footer, sekce

│ ├── components.css # Karty, filtry, tlačítka

│ └── responsive.css # Media queries

└── js/

├── data.js # ⭐ Data (kategorie + nástroje)

├── utils.js # Helper funkce

├── render.js # Generování HTML z dat

└── app.js # Logika, filtry, search



text



\## Spuštění



Stačí otevřít `index.html` v prohlížeči. \*\*Nepotřebuje server.\*\*



\## Přidání nového nástroje



Stačí přidat \*\*jeden objekt\*\* do pole `TOOLS` v `js/data.js`:



```js

{

&#x20; name: 'Název nástroje',

&#x20; category: 'social',      // id z CATEGORIES

&#x20; type: 'CLI',             // CLI | WEB | TOOL | PLUGIN | AI

&#x20; description: 'Co nástroj dělá.',

&#x20; command: 'prikaz --parametr hodnota',  // volitelné (CLI)

&#x20; url: 'https://...',                     // volitelné (WEB)

&#x20; link: 'https://github.com/...',         // volitelné (zdroj)

}

Přidání nové kategorie

Přidej objekt do CATEGORIES v js/data.js



Hotovo – filtr i sekce se vygenerují automaticky.



Funkce

🔍 Živé vyhledávání napříč názvy, popisy i příkazy



🎯 Filtrování podle kategorií



📋 Kopírování příkazů jedním kliknutím



📱 Plně responzivní



🎨 Tmavé "hacker" téma



text



\---



\## 🎯 Shrnutí – co jsi získal



| Vlastnost | Výhoda |

|-----------|--------|

| \*\*Oddělené CSS\*\* | Můžeš změnit barvy v `base.css` bez zásahu do layoutu |

| \*\*Data v `data.js`\*\* | Přidání nástroje = 1 objekt, žádné kopírování HTML |

| \*\*Automatické kategorie\*\* | Nová kategorie se objeví ve filtru i v gridu sama |

| \*\*`render.js`\*\* | Měníš vzhled karty na jednom místě |

| \*\*`app.js`\*\* | Search + filtr + kopírování na jednom místě |

| \*\*`utils.js`\*\* | Znovupoužitelné helpery (escape, copy, debounce) |

| \*\*`file://` ready\*\* | Funguje bez serveru (žádné ES moduly) |



\*\*Bonusy navíc oproti jednosouborové verzi:\*\*

\- ✅ \*\*Tlačítko "Kopírovat"\*\* u každého CLI příkazu

\- ✅ \*\*Odkaz na GitHub\*\* u CLI nástrojů

\- ✅ \*\*Barevné badge\*\* podle typu (CLI = zelená, WEB = modrá, AI = červená)

\- ✅ \*\*Automatické počítadlo\*\* nástrojů v každé kategorii (aktualizuje se při filtrování)

\- ✅ \*\*Escapování HTML\*\* (bezpečné i pro data s `<`, `\&` apod.)



Chceš, abych ti to zabalil do \*\*ZIP struktury\*\* (aby ses jen rozbalil a otevřel `index.html`), nebo chceš ještě něco doplnit – třeba \*\*řazení podle abecedy\*\*, \*\*URL hash pro sdílení filtru\*\* (`#social`), nebo \*\*export do JSON/CSV\*\*?



