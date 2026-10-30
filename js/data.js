// ============================================================
// DATA – scénáře a nástroje
// Přidání nástroje = 1 objekt do TOOLS
// ============================================================

const SCENARIOS = [
  { id: 'stalking',  icon: '🕵️',  name: 'Stalking / stopa',       desc: 'Sledování uživatelů napříč sociálními sítěmi' },
  { id: 'email',     icon: '📧',  name: 'E-maily a identity',     desc: 'Co všechno prozradí e-mailová adresa' },
  { id: 'phone',     icon: '📱',  name: 'Telefonní čísla',        desc: 'Analýza mezinárodních čísel' },
  { id: 'meta',      icon: '🖼️',  name: 'Metadata a média',       desc: 'Skrytá data ve fotkách, videích a PDF' },
  { id: 'domain',    icon: '🌐',  name: 'Domény a weby',          desc: 'Průzkum infrastruktury, DNS, historie' },
  { id: 'geo',       icon: '📍',  name: 'Geolokace',              desc: 'Kde vznikla fotka, kde je ta WiFi' },
  { id: 'cz',        icon: '🇨🇿', name: 'České OSINT',            desc: 'Registr smluv, dotace, veřejné zakázky' },
  { id: 'viz',       icon: '🕸️',  name: 'Vizualizace',            desc: 'Grafy vztahů mezi entitami' },
];

const TOOLS = [
  // =========================================================
  // STALKING / UŽIVATELSKÁ JMÉNA
  // =========================================================
  {
    id: 'sherlock',
    name: 'Sherlock',
    scenarios: ['stalking'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Prohledá stovky sociálních sítí a najde profily podle uživatelského jména.',
    install: [
      { label: 'pip', command: 'pip install sherlock-project' },
      { label: 'Docker', command: 'docker pull sherlock/sherlock' },
      { label: 'Kali', command: 'sudo apt install sherlock' },
    ],
    usage: [
      { label: 'Základní hledání', command: 'sherlock prezdivka' },
      { label: 'Více jmen najednou', command: 'sherlock jmeno1 jmeno2 jmeno3' },
      { label: 'Uložit do CSV', command: 'sherlock prezdivka --csv' },
      { label: 'Jen konkrétní síť', command: 'sherlock prezdivka --site Twitter' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/sherlock-project/sherlock' },
    ],
  },
  {
    id: 'maigret',
    name: 'Maigret',
    scenarios: ['stalking'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Extrémní verze Sherlocka – prohledává ještě více webů a umí generovat reporty.',
    install: [
      { label: 'pip', command: 'pip install maigret' },
    ],
    usage: [
      { label: 'Základní hledání', command: 'maigret cilova_prezdivka' },
      { label: 'HTML report', command: 'maigret cilova_prezdivka --html' },
      { label: 'PDF report', command: 'maigret cilova_prezdivka --pdf' },
      { label: 'Rychlý režim', command: 'maigret cilova_prezdivka --top-sites 100' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/soxoj/maigret' },
    ],
  },
  {
    id: 'whatsmyname',
    name: 'WhatsMyName',
    scenarios: ['stalking'],
    type: 'WEB',
    description: 'Webová verze – vyhledává uživatelská jména na stovkách webů bez instalace.',
    links: [
      { label: 'Otevřít web', url: 'https://whatsmyname.app' },
      { label: 'GitHub', url: 'https://github.com/WebBreacher/WhatsMyName' },
    ],
  },
  {
    id: 'blackbird',
    name: 'Blackbird',
    scenarios: ['stalking', 'email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Hledá účty podle uživatelského jména i e-mailu. Umí generovat PDF report.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/p1ngul1n0/blackbird && cd blackbird' },
      { label: 'Závislosti', command: 'pip install -r requirements.txt' },
    ],
    usage: [
      { label: 'Hledat username', command: 'python blackbird.py --username johndoe' },
      { label: 'Hledat e-mail', command: 'python blackbird.py --email johndoe@example.com' },
      { label: 'PDF report', command: 'python blackbird.py --email johndoe@example.com --pdf' },
      { label: 'CSV výstup', command: 'python blackbird.py --username johndoe --csv' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/p1ngul1n0/blackbird' },
    ],
  },
  {
    id: 'wayback',
    name: 'Wayback Machine',
    scenarios: ['stalking', 'domain'],
    type: 'WEB',
    description: 'Archiv internetu – najde staré profily, smazané texty a historické podoby webů.',
    links: [
      { label: 'Otevřít web', url: 'https://web.archive.org' },
    ],
  },

  // =========================================================
  // E-MAILY
  // =========================================================
  {
    id: 'holehe',
    name: 'Holehe',
    scenarios: ['email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Zjistí, na kterých službách (Twitter, Instagram, Amazon…) je daný e-mail registrovaný.',
    install: [
      { label: 'pip', command: 'pip3 install holehe' },
    ],
    usage: [
      { label: 'Základní scan', command: 'holehe cilovy-email@gmail.com' },
      { label: 'Jen registrované', command: 'holehe email@gmail.com --only-used' },
      { label: 'Bez barev', command: 'holehe email@gmail.com --no-color' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/megadose/holehe' },
    ],
  },
  {
    id: 'theharvester',
    name: 'theHarvester',
    scenarios: ['email', 'domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Mapuje firemní infrastrukturu – sbírá e-maily, jména zaměstnanců a subdomény.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/laramies/theHarvester && cd theHarvester' },
      { label: 'Závislosti', command: 'pip install -r requirements.txt' },
    ],
    usage: [
      { label: 'LinkedIn', command: 'theHarvester -d nazevfirmy.cz -b linkedin' },
      { label: 'Všechny zdroje', command: 'theHarvester -d nazevfirmy.cz -b all' },
      { label: 'Uložit do HTML', command: 'theHarvester -d nazevfirmy.cz -b all -f report' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/laramies/theHarvester' },
    ],
  },

  // =========================================================
  // TELEFONY
  // =========================================================
  {
    id: 'phoneinfoga',
    name: 'PhoneInfoga',
    scenarios: ['phone'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Analýza mezinárodních telefonních čísel – operátor, země, formát, veřejné zmínky.',
    install: [
      { label: 'Docker', command: 'docker pull sundowndev/phoneinfoga:latest' },
      { label: 'Binárka', command: 'curl -sSL https://raw.githubusercontent.com/sundowndev/phoneinfoga/master/install.sh | bash' },
    ],
    usage: [
      { label: 'Základní scan', command: 'phoneinfoga scan -n +420123456789' },
      { label: 'JSON výstup', command: 'phoneinfoga scan -n +420123456789 -o json' },
      { label: 'Přes Docker', command: 'docker run sundowndev/phoneinfoga scan -n +420123456789' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/sundowndev/phoneinfoga' },
    ],
  },

  // =========================================================
  // METADATA
  // =========================================================
  {
    id: 'exiftool',
    name: 'ExifTool',
    scenarios: ['meta'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Přečte skrytá metadata z fotek, videí a PDF – GPS, fotoaparát, software, datum.',
    install: [
      { label: 'Debian/Ubuntu', command: 'sudo apt install libimage-exiftool-perl' },
      { label: 'macOS', command: 'brew install exiftool' },
      { label: 'Windows', command: 'winget install exiftool' },
    ],
    usage: [
      { label: 'Základní čtení', command: 'exiftool jmeno_fotky.jpg' },
      { label: 'Všechna metadata', command: 'exiftool -a -G1 jmeno_fotky.jpg' },
      { label: 'Jen GPS', command: 'exiftool -GPS* jmeno_fotky.jpg' },
      { label: 'Smazat metadata', command: 'exiftool -all= jmeno_fotky.jpg' },
    ],
    links: [
      { label: 'Oficiální web', url: 'https://exiftool.org' },
    ],
  },
  {
    id: 'tineye',
    name: 'TinEye',
    scenarios: ['meta'],
    type: 'WEB',
    description: 'Reverzní vyhledávání obrázků – najde původní zdroj a podobné snímky.',
    links: [
      { label: 'Otevřít web', url: 'https://tineye.com' },
    ],
  },
  {
    id: 'invid',
    name: 'InVID-WeVerify',
    scenarios: ['meta'],
    type: 'PLUGIN',
    description: 'Browser plugin pro forenzní analýzu videa – rozdělení na snímky, metadata, klíčové framy.',
    links: [
      { label: 'Instalace', url: 'https://www.invid-project.eu/tools-and-services/invid-verification-plugin' },
    ],
  },

  // =========================================================
  // DOMÉNY
  // =========================================================
  {
    id: 'photon',
    name: 'Photon',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Crawler webu – vytáhne URL, e-maily, účty, API klíče, sociální odkazy.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/s0md3v/Photon && cd Photon' },
    ],
    usage: [
      { label: 'Základní crawl', command: 'python3 photon.py -u https://example.com' },
      { label: 'Hloubka + vlákna', command: 'python3 photon.py -u https://example.com -l 3 -t 200' },
      { label: 'Přes Wayback', command: 'python3 photon.py -u https://example.com --wayback' },
      { label: 'Export do JSON', command: 'python3 photon.py -u https://example.com -o vysledek' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/s0md3v/Photon' },
    ],
  },
  {
    id: 'whois',
    name: 'WHOIS',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Zjistí registrátora a majitele domény, datum expirace, nameservery.',
    install: [
      { label: 'Debian/Ubuntu', command: 'sudo apt install whois' },
      { label: 'macOS', command: 'brew install whois' },
    ],
    usage: [
      { label: 'Základní dotaz', command: 'whois seznam.cz' },
      { label: 'Jen klíčové řádky', command: 'whois seznam.cz | grep -Ei "registrar|expir|name server"' },
    ],
    links: [],
  },
  {
    id: 'dig',
    name: 'DIG',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Průzkum DNS záznamů – MX, TXT, NS, A, CNAME a skrytých serverů.',
    install: [
      { label: 'Debian/Ubuntu', command: 'sudo apt install dnsutils' },
      { label: 'macOS', command: 'brew install bind' },
    ],
    usage: [
      { label: 'MX záznamy', command: 'dig seznam.cz MX' },
      { label: 'Všechny záznamy', command: 'dig seznam.cz ANY' },
      { label: 'Krátce', command: 'dig seznam.cz +short' },
      { label: 'Konkrétní server', command: 'dig @8.8.8.8 seznam.cz' },
    ],
    links: [],
  },
  {
    id: 'crtsh',
    name: 'crt.sh',
    scenarios: ['domain'],
    type: 'WEB',
    description: 'Databáze TLS/SSL certifikátů – odhalí skryté subdomény, které v DNS nejsou.',
    links: [
      { label: 'Otevřít web', url: 'https://crt.sh' },
    ],
  },
  {
    id: 'spiderfoot',
    name: 'SpiderFoot',
    scenarios: ['domain', 'email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Automatický OSINT – propojí domény, IP, e-maily, telefonní čísla a další entity.',
    install: [
      { label: 'Docker', command: 'docker pull spiderfoot/spiderfoot' },
      { label: 'pip', command: 'pip install spiderfoot' },
    ],
    usage: [
      { label: 'Web UI', command: 'python3 sf.py -l 127.0.0.1:5001' },
      { label: 'Docker', command: 'docker run --rm -p 5001:5001 spiderfoot/spiderfoot' },
      { label: 'CLI scan', command: 'python3 sf.py -s example.com -t DOMAIN_NAME -o tab' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/smicallef/spiderfoot' },
    ],
  },

  // =========================================================
  // GEOLOKACE
  // =========================================================
  {
    id: 'geospy',
    name: 'GeoSpy.ai',
    scenarios: ['geo'],
    type: 'AI',
    description: 'AI lokalizace fotky – z obsahu snímku odhadne, kde na světě vznikla.',
    links: [
      { label: 'Otevřít web', url: 'https://geospy.ai/' },
    ],
  },
  {
    id: 'suncalc',
    name: 'SunCalc',
    scenarios: ['geo'],
    type: 'WEB',
    description: 'Podle stínů a úhlu slunce na fotce určí denní dobu a přibližnou polohu.',
    links: [
      { label: 'Otevřít web', url: 'https://www.suncalc.org' },
    ],
  },
  {
    id: 'wigle',
    name: 'WiGle.net',
    scenarios: ['geo'],
    type: 'WEB',
    description: 'Mapa WiFi sítí – podle SSID/BSSID najde fyzickou polohu routeru.',
    links: [
      { label: 'Otevřít web', url: 'https://wigle.net/' },
    ],
  },

  // =========================================================
  // ČESKÉ
  // =========================================================
  {
    id: 'hlidacstatu',
    name: 'Hlídač Státu',
    scenarios: ['cz'],
    type: 'WEB',
    description: 'Registr smluv, dotací a veřejných zakázek – najde vazby firem na politiky a úřady.',
    links: [
      { label: 'Otevřít web', url: 'https://www.hlidacstatu.cz/' },
      { label: 'API dokumentace', url: 'https://www.hlidacstatu.cz/api' },
    ],
  },

  // =========================================================
  // VIZUALIZACE
  // =========================================================
  {
    id: 'maltego',
    name: 'Maltego',
    scenarios: ['viz'],
    type: 'TOOL',
    platforms: ['Linux', 'macOS', 'Windows'],
    description: 'Vizuální propojování entit – z emailu, domény nebo jména udělá graf vztahů.',
    links: [
      { label: 'Oficiální web (Community Edition zdarma)', url: 'https://www.maltego.com' },
      { label: 'Registrace CE verze', url: 'https://www.maltego.com/ce-registration' },
    ],
  },
];
