// ============================================================
// DATA – scénáře a nástroje
// Přidání nástroje = 1 objekt do TOOLS
// ============================================================

const SCENARIOS = [
  { id: 'stalking',  icon: '🕵️',  name: 'Stalking / stopa',        desc: 'Sledování uživatelů napříč sociálními sítěmi' },
  { id: 'email',     icon: '📧',  name: 'E-maily a identity',      desc: 'Co všechno prozradí e-mailová adresa' },
  { id: 'phone',     icon: '📱',  name: 'Telefonní čísla',         desc: 'Analýza mezinárodních čísel' },
  { id: 'meta',      icon: '🖼️',  name: 'Metadata a média',        desc: 'Skrytá data ve fotkách, videích a PDF' },
  { id: 'domain',    icon: '🌐',  name: 'Domény a weby',           desc: 'Průzkum infrastruktury, DNS, historie' },
  { id: 'geo',       icon: '📍',  name: 'Geolokace',               desc: 'Kde vznikla fotka, kde je ta WiFi' },
  { id: 'cz',        icon: '🇨🇿', name: 'České OSINT',             desc: 'Registr smluv, dotace, veřejné zakázky' },
  { id: 'viz',       icon: '🕸️',  name: 'Vizualizace',             desc: 'Grafy vztahů mezi entitami' },
  { id: 'network',   icon: '🔌',  name: 'Sítě a infrastruktura',   desc: 'Shodan, Censys, skenování portů' },
  { id: 'darkweb',   icon: '🧅',  name: 'Dark Web / Leaky',        desc: 'Úniky dat, darkweb indexery, breached DB' },
  { id: 'crypto',    icon: '🪙',  name: 'Krypto a blockchain',     desc: 'Sledování transakcí, peněženek a smart kontraktů' },
  { id: 'people',    icon: '👤',  name: 'Osoby a jména',           desc: 'Vyhledávání fyzických osob, adres a rodinných vazeb' },
  { id: 'company',   icon: '🏢',  name: 'Firmy a organizace',      desc: 'Průzkum firem, vlastníků, struktur a financí' },
  { id: 'ai',        icon: '🤖',  name: 'AI OSINT nástroje',       desc: 'Nástroje využívající AI pro zpravodajství' },
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
    tags: ['username', 'social', 'popular'],
    description: 'Prohledá stovky sociálních sítí a najde profily podle uživatelského jména. Jeden z nejpopulárnějších OSINT nástrojů.',
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
      { label: 'Timeout nastavení', command: 'sherlock prezdivka --timeout 5' },
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
    tags: ['username', 'social', 'report'],
    description: 'Extrémní verze Sherlocka – prohledává 3000+ webů a umí generovat HTML/PDF reporty s grafy vztahů.',
    install: [
      { label: 'pip', command: 'pip install maigret' },
    ],
    usage: [
      { label: 'Základní hledání', command: 'maigret cilova_prezdivka' },
      { label: 'HTML report', command: 'maigret cilova_prezdivka --html' },
      { label: 'PDF report', command: 'maigret cilova_prezdivka --pdf' },
      { label: 'Rychlý režim', command: 'maigret cilova_prezdivka --top-sites 100' },
      { label: 'Graf vztahů', command: 'maigret cilova_prezdivka --graph' },
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
    tags: ['username', 'social'],
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
    tags: ['username', 'email', 'report'],
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
    tags: ['archive', 'history', 'cache'],
    description: 'Archiv internetu – najde staré profily, smazané texty a historické podoby webů. Přes 800 miliard uložených stránek.',
    links: [
      { label: 'Otevřít web', url: 'https://web.archive.org' },
    ],
  },
  {
    id: 'osintframework',
    name: 'OSINT Framework',
    scenarios: ['stalking', 'email', 'domain', 'geo'],
    type: 'WEB',
    tags: ['overview', 'reference', 'framework'],
    description: 'Interaktivní strom stovek OSINT nástrojů a zdrojů – perfektní jako startovní mapa pro každé vyšetřování.',
    links: [
      { label: 'Otevřít web', url: 'https://osintframework.com' },
      { label: 'GitHub', url: 'https://github.com/lockfale/osint-framework' },
    ],
  },
  {
    id: 'socialsearcher',
    name: 'Social Searcher',
    scenarios: ['stalking'],
    type: 'WEB',
    tags: ['social', 'monitoring', 'mentions'],
    description: 'Monitoruje zmínky osoby nebo klíčového slova napříč sociálními sítěmi v reálném čase.',
    links: [
      { label: 'Otevřít web', url: 'https://www.social-searcher.com' },
    ],
  },
  {
    id: 'namechk',
    name: 'Namechk',
    scenarios: ['stalking'],
    type: 'WEB',
    tags: ['username', 'availability', 'domain'],
    description: 'Zjistí dostupnost uživatelského jména na desítkách platforem a domén najednou.',
    links: [
      { label: 'Otevřít web', url: 'https://namechk.com' },
    ],
  },
  {
    id: 'usersearch',
    name: 'UserSearch.org',
    scenarios: ['stalking'],
    type: 'WEB',
    tags: ['username', 'social', 'search'],
    description: 'Hledání uživatelského jména na 2000+ webových stránkách bez registrace.',
    links: [
      { label: 'Otevřít web', url: 'https://usersearch.org' },
    ],
  },
  {
    id: 'spokeo',
    name: 'Spokeo',
    scenarios: ['stalking', 'people'],
    type: 'WEB',
    tags: ['people', 'address', 'phone', 'email'],
    description: 'Agregátor veřejných dat o osobách – adresa, telefon, e-mail, sociální sítě, příbuzní (primárně USA).',
    links: [
      { label: 'Otevřít web', url: 'https://www.spokeo.com' },
    ],
  },
  {
    id: 'pipl',
    name: 'Pipl',
    scenarios: ['stalking', 'people', 'email'],
    type: 'WEB',
    tags: ['people', 'identity', 'deep-web'],
    description: 'Profesionální vyhledávač osob indexující i hluboký web – propojuje identity napříč sítěmi.',
    links: [
      { label: 'Otevřít web', url: 'https://pipl.com' },
    ],
  },
  {
    id: 'twitterosint',
    name: 'TweetDeck / X Advanced Search',
    scenarios: ['stalking'],
    type: 'WEB',
    tags: ['twitter', 'x', 'social', 'search'],
    description: 'Pokročilé vyhledávání na X/Twitter – filtrování podle data, místa, jazyka, účtu nebo klíčového slova.',
    links: [
      { label: 'X Advanced Search', url: 'https://x.com/search-advanced' },
    ],
    usage: [
      { label: 'Tweety od uživatele', command: 'from:uzivatel klicove_slovo' },
      { label: 'Tweety na uživatele', command: 'to:uzivatel' },
      { label: 'Geolokace', command: 'geocode:50.08,14.42,10km' },
      { label: 'Časové rozmezí', command: 'since:2023-01-01 until:2023-12-31 from:uzivatel' },
    ],
  },
  {
    id: 'instaloader',
    name: 'Instaloader',
    scenarios: ['stalking'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['instagram', 'download', 'metadata'],
    description: 'Stahuje Instagram profily, followery, příběhy a metadata fotek včetně GPS souřadnic.',
    install: [
      { label: 'pip', command: 'pip3 install instaloader' },
    ],
    usage: [
      { label: 'Profil', command: 'instaloader profile uzivatel' },
      { label: 'Followeři', command: 'instaloader profile uzivatel --followers' },
      { label: 'Tagged posty', command: 'instaloader tagged uzivatel' },
      { label: 'Stories', command: 'instaloader stories uzivatel' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/instaloader/instaloader' },
    ],
  },
  {
    id: 'twint',
    name: 'Twint',
    scenarios: ['stalking'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['twitter', 'scraping', 'history'],
    description: 'Scrapuje tweety bez API klíče – historické tweety, followery, oblíbené, bez omezení.',
    install: [
      { label: 'pip', command: 'pip3 install twint' },
    ],
    usage: [
      { label: 'Tweety uživatele', command: 'twint -u uzivatel' },
      { label: 'Hledat klíčové slovo', command: 'twint -s "klicove slovo"' },
      { label: 'Do CSV', command: 'twint -u uzivatel -o tweety.csv --csv' },
      { label: 'Followeři', command: 'twint -u uzivatel --followers' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/twintproject/twint' },
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
    tags: ['email', 'registration', 'accounts'],
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
    tags: ['email', 'subdomain', 'recon'],
    description: 'Mapuje firemní infrastrukturu – sbírá e-maily, jména zaměstnanců a subdomény z Google, LinkedIn, Bing.',
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
  {
    id: 'emailrep',
    name: 'EmailRep.io',
    scenarios: ['email'],
    type: 'WEB',
    tags: ['email', 'reputation', 'score'],
    description: 'Reputace e-mailové adresy – spam skóre, breach, věk domény, propojené profily.',
    links: [
      { label: 'Otevřít web', url: 'https://emailrep.io' },
      { label: 'API', url: 'https://docs.emailrep.io' },
    ],
  },
  {
    id: 'hunter',
    name: 'Hunter.io',
    scenarios: ['email', 'company'],
    type: 'WEB',
    tags: ['email', 'company', 'verify', 'pattern'],
    description: 'Najde firemní e-mailové adresy podle domény – formáty, jména zaměstnanců, verifikace.',
    links: [
      { label: 'Otevřít web', url: 'https://hunter.io' },
    ],
  },
  {
    id: 'skymem',
    name: 'Skymem',
    scenarios: ['email'],
    type: 'WEB',
    tags: ['email', 'breach', 'search'],
    description: 'Vyhledávač e-mailů v uniklých databázích a pastebinu – bez registrace.',
    links: [
      { label: 'Otevřít web', url: 'https://www.skymem.info' },
    ],
  },
  {
    id: 'epieos',
    name: 'Epieos',
    scenarios: ['email'],
    type: 'WEB',
    tags: ['email', 'google', 'accounts', 'reverse'],
    description: 'Reverzní lookup e-mailu – najde propojené Google účty, Gravatar, LinkedIn a další.',
    links: [
      { label: 'Otevřít web', url: 'https://epieos.com' },
    ],
  },
  {
    id: 'ghunt',
    name: 'GHunt',
    scenarios: ['email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['google', 'gmail', 'accounts', 'osint'],
    description: 'Z Gmail adresy vytáhne propojené Google služby – YouTube, Mapy, Fotky, Meet jméno, fotku profilu.',
    install: [
      { label: 'pip', command: 'pip3 install ghunt' },
      { label: 'Setup', command: 'ghunt login' },
    ],
    usage: [
      { label: 'Email lookup', command: 'ghunt email cilovy@gmail.com' },
      { label: 'Gaia ID lookup', command: 'ghunt gaia 123456789' },
      { label: 'Drive lookup', command: 'ghunt drive DRIVE_ID' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/mxrch/GHunt' },
    ],
  },
  {
    id: 'mosint',
    name: 'Mosint',
    scenarios: ['email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['email', 'automated', 'breach'],
    description: 'Automatizovaný e-mail OSINT nástroj – prohledá HIBP, Pastebin, Truecaller a sociální sítě.',
    install: [
      { label: 'go install', command: 'go install github.com/alpkeskin/mosint/v3/cmd/mosint@latest' },
    ],
    usage: [
      { label: 'Základní scan', command: 'mosint target@example.com' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/alpkeskin/mosint' },
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
    tags: ['phone', 'lookup', 'carrier'],
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
  {
    id: 'numverify',
    name: 'Numverify',
    scenarios: ['phone'],
    type: 'WEB',
    tags: ['phone', 'verify', 'api', 'carrier'],
    description: 'API pro validaci telefonních čísel – země, operátor, typ (mobil/pevná), formát.',
    links: [
      { label: 'Otevřít web', url: 'https://numverify.com' },
    ],
  },
  {
    id: 'callerid',
    name: 'Caller ID Test',
    scenarios: ['phone'],
    type: 'WEB',
    tags: ['phone', 'caller-id', 'lookup'],
    description: 'Zjistí jméno majitele telefonního čísla z veřejných Caller ID databází.',
    links: [
      { label: 'Otevřít web', url: 'https://www.calleridsearch.com' },
    ],
  },
  {
    id: 'truecaller',
    name: 'Truecaller',
    scenarios: ['phone'],
    type: 'WEB',
    tags: ['phone', 'name', 'spam', 'identity'],
    description: 'Globální databáze telefonních čísel – jméno majitele, spam rating, lokace.',
    links: [
      { label: 'Otevřít web', url: 'https://www.truecaller.com' },
    ],
  },
  {
    id: 'sync_me',
    name: 'Sync.me',
    scenarios: ['phone'],
    type: 'WEB',
    tags: ['phone', 'social', 'identity'],
    description: 'Identifikátor volajícího napojený na sociální sítě – z čísla najde jméno, foto, profily.',
    links: [
      { label: 'Otevřít web', url: 'https://sync.me' },
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
    tags: ['metadata', 'image', 'gps', 'pdf', 'video'],
    description: 'Přečte skrytá metadata z fotek, videí a PDF – GPS, fotoaparát, software, datum. Zlatý standard.',
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
      { label: 'Hromadné zpracování', command: 'exiftool -r -GPS* /cesta/ke/slozce/' },
    ],
    links: [
      { label: 'Oficiální web', url: 'https://exiftool.org' },
    ],
  },
  {
    id: 'tineye',
    name: 'TinEye',
    scenarios: ['meta', 'geo'],
    type: 'WEB',
    tags: ['image', 'reverse-search', 'source'],
    description: 'Reverzní vyhledávání obrázků – najde původní zdroj, kopie a podobné snímky na internetu.',
    links: [
      { label: 'Otevřít web', url: 'https://tineye.com' },
    ],
  },
  {
    id: 'invid',
    name: 'InVID-WeVerify',
    scenarios: ['meta'],
    type: 'PLUGIN',
    tags: ['video', 'verification', 'forensics', 'frames'],
    description: 'Browser plugin pro forenzní analýzu videa – rozdělení na snímky, metadata, reverzní hledání klíčových framů.',
    links: [
      { label: 'Instalace', url: 'https://www.invid-project.eu/tools-and-services/invid-verification-plugin' },
    ],
  },
  {
    id: 'foca',
    name: 'FOCA',
    scenarios: ['meta', 'domain'],
    type: 'TOOL',
    platforms: ['Windows'],
    tags: ['metadata', 'document', 'fingerprint', 'office'],
    description: 'Extrahuje metadata z dokumentů (Word, PDF, Excel) dostupných na webu – autor, software, interní cesty, verze.',
    links: [
      { label: 'GitHub', url: 'https://github.com/ElevenPaths/FOCA' },
    ],
  },
  {
    id: 'metagoofil',
    name: 'Metagoofil',
    scenarios: ['meta', 'domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS'],
    tags: ['metadata', 'google', 'documents', 'recon'],
    description: 'Stáhne dokumenty z webu přes Google a extrahuje z nich metadata – jména autorů, software, cesty.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/laramies/metagoofil && cd metagoofil' },
      { label: 'Závislosti', command: 'pip3 install -r requirements.txt' },
    ],
    usage: [
      { label: 'PDF dokumenty', command: 'python3 metagoofil.py -d example.com -t pdf -l 10 -o output/' },
      { label: 'Word dokumenty', command: 'python3 metagoofil.py -d example.com -t docx -l 20 -o output/' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/laramies/metagoofil' },
    ],
  },
  {
    id: 'forensically',
    name: 'Forensically',
    scenarios: ['meta'],
    type: 'WEB',
    tags: ['image', 'forensics', 'manipulation', 'ela'],
    description: 'Forenzní analýza obrázků přímo v prohlížeči – Error Level Analysis, klonování oblastí, metadata.',
    links: [
      { label: 'Otevřít web', url: 'https://29a.ch/photo-forensics/' },
    ],
  },
  {
    id: 'imageforensic',
    name: 'FotoForensics',
    scenarios: ['meta'],
    type: 'WEB',
    tags: ['image', 'ela', 'jpeg', 'manipulation'],
    description: 'ELA analýza JPEG obrázků – odhalí upravené nebo přidané části fotky podle kompresní chyby.',
    links: [
      { label: 'Otevřít web', url: 'https://fotoforensics.com' },
    ],
  },
  {
    id: 'jimpl',
    name: 'Jeffrey\'s Exif Viewer',
    scenarios: ['meta'],
    type: 'WEB',
    tags: ['exif', 'image', 'online', 'metadata'],
    description: 'Online prohlížeč EXIF dat z obrázků – GPS mapa, fotoaparát, nastavení expozice, vše přehledně.',
    links: [
      { label: 'Otevřít web', url: 'https://exif.regex.info/exif.cgi' },
    ],
  },

  // =========================================================
  // DOMÉNY A WEBY
  // =========================================================
  {
    id: 'photon',
    name: 'Photon',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['crawler', 'links', 'api-keys', 'emails'],
    description: 'Crawler webu – vytáhne URL, e-maily, účty, API klíče, sociální odkazy a skryté endpointy.',
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
    tags: ['domain', 'registrar', 'expiry', 'owner'],
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
    tags: ['dns', 'mx', 'ns', 'txt', 'cname'],
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
      { label: 'Reverzní DNS', command: 'dig -x 1.2.3.4' },
    ],
    links: [],
  },
  {
    id: 'crtsh',
    name: 'crt.sh',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['ssl', 'certificate', 'subdomain', 'ct-logs'],
    description: 'Databáze TLS/SSL certifikátů (Certificate Transparency) – odhalí skryté subdomény, které v DNS nejsou.',
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
    tags: ['automated', 'recon', 'comprehensive', 'web-ui'],
    description: 'Automatický OSINT – propojí domény, IP, e-maily, telefonní čísla a další entity. Má webové rozhraní.',
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
  {
    id: 'reconng',
    name: 'Recon-ng',
    scenarios: ['domain', 'email'],
    type: 'CLI',
    platforms: ['Linux', 'macOS'],
    tags: ['recon', 'framework', 'modular', 'professional'],
    description: 'Modulární framework pro průzkum – podobný Metasploitu, ale čistě pro OSINT. 150+ modulů.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/lanmaster53/recon-ng && cd recon-ng' },
      { label: 'Závislosti', command: 'pip3 install -r REQUIREMENTS' },
    ],
    usage: [
      { label: 'Spustit', command: 'python3 recon-ng' },
      { label: 'Nový workspace', command: 'workspaces create cil' },
      { label: 'Přidat doménu', command: "db insert domains -- domain='example.com'" },
      { label: 'Spustit modul', command: 'modules load recon/domains-hosts/hackertarget && run' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/lanmaster53/recon-ng' },
    ],
  },
  {
    id: 'googledorks',
    name: 'Google Dorks',
    scenarios: ['domain', 'stalking'],
    type: 'WEB',
    tags: ['search', 'dork', 'google', 'sensitive-data'],
    description: 'Pokročilé vyhledávání v Googlu – operátory site:, filetype:, inurl:, intext: pro hledání citlivých dat.',
    usage: [
      { label: 'Soubory na doméně', command: 'site:example.com filetype:pdf' },
      { label: 'Přihlašovací stránky', command: 'site:example.com inurl:login OR inurl:admin' },
      { label: 'Emaily v dokumentech', command: 'site:example.com "@example.com" filetype:xlsx' },
      { label: 'Exponovaný index', command: 'intitle:"index of" site:example.com' },
      { label: 'Zálohovací soubory', command: 'site:example.com ext:bak OR ext:sql OR ext:zip' },
    ],
    links: [
      { label: 'Google Hacking DB', url: 'https://www.exploit-db.com/google-hacking-database' },
    ],
  },
  {
    id: 'subfinder',
    name: 'Subfinder',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['subdomain', 'enumeration', 'passive', 'fast'],
    description: 'Pasivní vyhledávač subdomén – použije veřejné zdroje (certifikáty, DNS, Shodan) pro enumeraci.',
    install: [
      { label: 'go install', command: 'go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest' },
      { label: 'Docker', command: 'docker pull projectdiscovery/subfinder:latest' },
    ],
    usage: [
      { label: 'Základní scan', command: 'subfinder -d example.com' },
      { label: 'Uložit výstup', command: 'subfinder -d example.com -o subdomeny.txt' },
      { label: 'Více domén', command: 'subfinder -dL domeny.txt -o vysledky.txt' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/projectdiscovery/subfinder' },
    ],
  },
  {
    id: 'amass',
    name: 'Amass',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['subdomain', 'enumeration', 'active', 'graph'],
    description: 'Výkonný průzkum sítě – mapuje attack surface, subdomény, ASN, IP rozsahy a jejich vztahy.',
    install: [
      { label: 'go install', command: 'go install github.com/owasp-amass/amass/v4/...@master' },
      { label: 'apt (Kali)', command: 'sudo apt install amass' },
    ],
    usage: [
      { label: 'Pasivní enum', command: 'amass enum -passive -d example.com' },
      { label: 'Aktivní enum', command: 'amass enum -active -d example.com' },
      { label: 'Intel (WHOIS)', command: 'amass intel -whois -d example.com' },
      { label: 'Vizualizace', command: 'amass viz -d3 -d example.com' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/owasp-amass/amass' },
    ],
  },
  {
    id: 'dnsx',
    name: 'dnsx',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['dns', 'resolution', 'bulk', 'fast'],
    description: 'Rychlý hromadný DNS resolver – ověří tisíce subdomén nebo IP adres za sekundu.',
    install: [
      { label: 'go install', command: 'go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest' },
    ],
    usage: [
      { label: 'Resolve liste', command: 'dnsx -l subdomeny.txt -a -resp' },
      { label: 'Reverzní DNS', command: 'dnsx -l ips.txt -ptr -resp-only' },
      { label: 'CNAME záznamy', command: 'dnsx -l subdomeny.txt -cname' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/projectdiscovery/dnsx' },
    ],
  },
  {
    id: 'httpx',
    name: 'httpx',
    scenarios: ['domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['http', 'probe', 'status', 'title', 'fast'],
    description: 'Rychlý HTTP prober – ověří živé webové servery, zjistí title, status kódy, tech stack.',
    install: [
      { label: 'go install', command: 'go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest' },
    ],
    usage: [
      { label: 'Probe URL liste', command: 'httpx -l subdomeny.txt' },
      { label: 'Zobrazit titulky', command: 'httpx -l subdomeny.txt -title' },
      { label: 'Tech fingerprint', command: 'httpx -l subdomeny.txt -tech-detect' },
      { label: 'Screenshots', command: 'httpx -l subdomeny.txt -screenshot' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/projectdiscovery/httpx' },
    ],
  },
  {
    id: 'builtwith',
    name: 'BuiltWith',
    scenarios: ['domain', 'company'],
    type: 'WEB',
    tags: ['tech-stack', 'cms', 'analytics', 'fingerprint'],
    description: 'Zjistí technologický stack webu – CMS, frameworky, analytiku, CDN, platební brány.',
    links: [
      { label: 'Otevřít web', url: 'https://builtwith.com' },
    ],
  },
  {
    id: 'shodan_domain',
    name: 'Shodan (Domain view)',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['shodan', 'dns', 'subdomains', 'ports'],
    description: 'Shodan DNS lookup – zobrazí subdomény, historické DNS záznamy a otevřené porty pro doménu.',
    links: [
      { label: 'DNS search', url: 'https://www.shodan.io/domain/' },
    ],
  },
  {
    id: 'urlscan',
    name: 'urlscan.io',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['url', 'scan', 'screenshot', 'requests'],
    description: 'Naskenuje URL a zobrazí screenshot, DOM, všechny HTTP požadavky, cookies, IP adresy.',
    links: [
      { label: 'Otevřít web', url: 'https://urlscan.io' },
    ],
  },
  {
    id: 'virustotal',
    name: 'VirusTotal',
    scenarios: ['domain', 'network'],
    type: 'WEB',
    tags: ['malware', 'ip', 'domain', 'file', 'reputation'],
    description: 'Reputace domén, IP adres, URL a souborů – analýza 70+ antivirovými enginy.',
    links: [
      { label: 'Otevřít web', url: 'https://www.virustotal.com' },
    ],
  },
  {
    id: 'securitytrails',
    name: 'SecurityTrails',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['dns', 'history', 'subdomain', 'whois'],
    description: 'Historické DNS záznamy a WHOIS – zjistí původní IP adresy skryté za Cloudflare a staré subdomény.',
    links: [
      { label: 'Otevřít web', url: 'https://securitytrails.com' },
      { label: 'API', url: 'https://docs.securitytrails.com' },
    ],
  },
  {
    id: 'dnsdumpster',
    name: 'DNSDumpster',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['dns', 'subdomain', 'map', 'visualization'],
    description: 'Mapuje DNS infrastrukturu domény – subdomény, MX, NS záznamy a vizuální graf.',
    links: [
      { label: 'Otevřít web', url: 'https://dnsdumpster.com' },
    ],
  },
  {
    id: 'similarweb',
    name: 'SimilarWeb',
    scenarios: ['domain', 'company'],
    type: 'WEB',
    tags: ['traffic', 'analytics', 'competitors', 'audience'],
    description: 'Analytika webu – traffic, zdroje návštěvnosti, demografie, konkurenční weby.',
    links: [
      { label: 'Otevřít web', url: 'https://www.similarweb.com' },
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
    tags: ['ai', 'image', 'geolocation', 'photo'],
    description: 'AI lokalizace fotky – z obsahu snímku odhadne, kde na světě vznikla. Velmi přesné.',
    links: [
      { label: 'Otevřít web', url: 'https://geospy.ai/' },
    ],
  },
  {
    id: 'suncalc',
    name: 'SunCalc',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['shadow', 'sun', 'time', 'angle'],
    description: 'Podle stínů a úhlu slunce na fotce určí denní dobu a přibližnou zeměpisnou polohu.',
    links: [
      { label: 'Otevřít web', url: 'https://www.suncalc.org' },
    ],
  },
  {
    id: 'wigle',
    name: 'WiGle.net',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['wifi', 'ssid', 'bssid', 'location'],
    description: 'Mapa WiFi sítí – podle SSID/BSSID najde fyzickou polohu routeru.',
    links: [
      { label: 'Otevřít web', url: 'https://wigle.net/' },
    ],
  },
  {
    id: 'geonames',
    name: 'GeoNames',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['geocoding', 'api', 'location', 'coordinates'],
    description: 'Geografická databáze s API – konverze souřadnic, názvy míst, časová pásma.',
    links: [
      { label: 'Otevřít web', url: 'https://www.geonames.org' },
      { label: 'API dokumentace', url: 'https://www.geonames.org/export/web-services.html' },
    ],
  },
  {
    id: 'ipgeolocation',
    name: 'ip-api.com',
    scenarios: ['geo', 'network'],
    type: 'WEB',
    tags: ['ip', 'geolocation', 'isp', 'api'],
    description: 'Geolokace IP adresy – město, stát, ISP, ASN, časové pásmo. API zdarma.',
    links: [
      { label: 'Otevřít web', url: 'https://ip-api.com' },
    ],
    usage: [
      { label: 'Geolokace IP', command: 'curl http://ip-api.com/json/1.2.3.4' },
      { label: 'Vlastní IP', command: 'curl http://ip-api.com/json' },
    ],
  },
  {
    id: 'google_maps_osint',
    name: 'Google Maps (OSINT)',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['streetview', 'satellite', 'location', 'photo'],
    description: 'Street View pro ověření míst, historické snímky satelitu (přes Google Earth), porovnání s fotkámi.',
    links: [
      { label: 'Otevřít', url: 'https://maps.google.com' },
      { label: 'Google Earth', url: 'https://earth.google.com/web/' },
    ],
  },
  {
    id: 'overpass_turbo',
    name: 'Overpass Turbo',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['openstreetmap', 'osm', 'query', 'poi'],
    description: 'Dotazovací nástroj pro OpenStreetMap – hledá budovy, firmy, infrastrukturu podle atributů.',
    links: [
      { label: 'Otevřít web', url: 'https://overpass-turbo.eu' },
    ],
  },
  {
    id: 'geohints',
    name: 'GeoHints',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['geoguessr', 'clues', 'reference', 'country'],
    description: 'Databáze vizuálních vodítek pro geolokaci – silniční značky, sloupy, flora, architektura po zemích.',
    links: [
      { label: 'Otevřít web', url: 'https://geohints.com' },
    ],
  },
  {
    id: 'suncalc_pro',
    name: 'Shadowmap.app',
    scenarios: ['geo'],
    type: 'WEB',
    tags: ['shadow', 'building', '3d', 'time'],
    description: '3D simulace stínů budov v čase – ověří, zda stíny na fotce odpovídají danému místu a datu.',
    links: [
      { label: 'Otevřít web', url: 'https://app.shadowmap.org' },
    ],
  },

  // =========================================================
  // ČESKÉ OSINT
  // =========================================================
  {
    id: 'hlidacstatu',
    name: 'Hlídač Státu',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'smlouvy', 'firmy', 'politici', 'vazby'],
    description: 'Registr smluv, dotací a veřejných zakázek – najde vazby firem na politiky a úřady.',
    links: [
      { label: 'Otevřít web', url: 'https://www.hlidacstatu.cz/' },
      { label: 'API dokumentace', url: 'https://www.hlidacstatu.cz/api' },
    ],
  },
  {
    id: 'ares',
    name: 'ARES (MFČR)',
    scenarios: ['cz', 'company'],
    type: 'WEB',
    tags: ['cz', 'ico', 'firma', 'rejstrik', 'dic'],
    description: 'Administrativní registr ekonomických subjektů – vyhledávání firem podle IČO, jména nebo sídla.',
    links: [
      { label: 'Otevřít web', url: 'https://ares.gov.cz' },
      { label: 'API', url: 'https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty' },
    ],
  },
  {
    id: 'justice',
    name: 'Veřejný rejstřík (justice.cz)',
    scenarios: ['cz', 'company'],
    type: 'WEB',
    tags: ['cz', 'firma', 'rejstrik', 'dokumenty', 'jednatel'],
    description: 'Obchodní rejstřík – zakladatelé, jednatelé, historické zápisy, účetní závěrky.',
    links: [
      { label: 'Otevřít web', url: 'https://www.justice.cz' },
    ],
  },
  {
    id: 'dotaceeu',
    name: 'DotaceEU.cz',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'dotace', 'eu', 'granty', 'projekty'],
    description: 'Databáze EU dotací přidělených v ČR – kdo co dostal, z jakého programu, za kolik.',
    links: [
      { label: 'Otevřít web', url: 'https://dotaceeu.cz' },
    ],
  },
  {
    id: 'majetekstatu',
    name: 'Majetek státu',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'majetek', 'stat', 'nemovitosti'],
    description: 'Centrální registr administrativního majetku – budovy, pozemky a vozidla ve vlastnictví státu.',
    links: [
      { label: 'Otevřít web', url: 'https://www.majetekstatu.cz' },
    ],
  },
  {
    id: 'kt_cuzk',
    name: 'Katastr nemovitostí (ČÚZK)',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'katastr', 'nemovitosti', 'pozemky', 'majitel'],
    description: 'Nahlížení do katastru – kdo vlastní danou nemovitost nebo pozemek, zástavy, věcná břemena.',
    links: [
      { label: 'Nahlížení do KN', url: 'https://nahlizenidokn.cuzk.cz' },
    ],
  },
  {
    id: 'insolvence',
    name: 'Insolvenční rejstřík',
    scenarios: ['cz', 'company'],
    type: 'WEB',
    tags: ['cz', 'insolvence', 'bankrot', 'dluh', 'firma'],
    description: 'Databáze insolvenčních řízení – fyzické osoby i firmy v insolvenci nebo osobním bankrotu.',
    links: [
      { label: 'Otevřít web', url: 'https://isir.justice.cz' },
    ],
  },
  {
    id: 'exekuce',
    name: 'Centrální evidence exekucí',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'exekuce', 'dluh', 'osoba'],
    description: 'Ověření, zda je fyzická nebo právnická osoba v exekuci – přes registr CEECR.',
    links: [
      { label: 'Otevřít web', url: 'https://www.ceecr.cz' },
    ],
  },
  {
    id: 'nkod',
    name: 'NKOD – Národní katalog otevřených dat',
    scenarios: ['cz'],
    type: 'WEB',
    tags: ['cz', 'open-data', 'katalog', 'dataset'],
    description: 'Katalog otevřených dat státní správy ČR – tisíce datasetů od ministerstev a úřadů ke stažení.',
    links: [
      { label: 'Otevřít web', url: 'https://data.gov.cz' },
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
    tags: ['graph', 'entities', 'relations', 'professional'],
    description: 'Vizuální propojování entit – z emailu, domény nebo jména udělá interaktivní graf vztahů. Zlatý standard.',
    links: [
      { label: 'Oficiální web (CE zdarma)', url: 'https://www.maltego.com' },
      { label: 'Registrace CE', url: 'https://www.maltego.com/ce-registration' },
    ],
  },
  {
    id: 'gephi',
    name: 'Gephi',
    scenarios: ['viz'],
    type: 'TOOL',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['graph', 'network', 'visualization', 'open-source'],
    description: 'Open-source vizualizace grafů sítí – perfektní pro analýzu vztahů z CSV exportů.',
    links: [
      { label: 'Stáhnout', url: 'https://gephi.org/users/download/' },
      { label: 'GitHub', url: 'https://github.com/gephi/gephi' },
    ],
  },
  {
    id: 'obsidian_osint',
    name: 'Obsidian (pro OSINT)',
    scenarios: ['viz'],
    type: 'TOOL',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['notes', 'graph', 'investigation', 'links'],
    description: 'Propojené poznámky s grafovým pohledem – ideální pro vizualizaci OSINT vyšetřování a vazeb.',
    links: [
      { label: 'Stáhnout', url: 'https://obsidian.md' },
    ],
  },
  {
    id: 'kumu',
    name: 'Kumu',
    scenarios: ['viz'],
    type: 'WEB',
    tags: ['graph', 'systems', 'relations', 'online'],
    description: 'Online nástroj pro mapování systémů a vztahů – sdílitelné interaktivní grafy entit.',
    links: [
      { label: 'Otevřít web', url: 'https://kumu.io' },
    ],
  },

  // =========================================================
  // SÍTĚ A INFRASTRUKTURA
  // =========================================================
  {
    id: 'shodan',
    name: 'Shodan',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['iot', 'ports', 'banners', 'cameras', 'popular'],
    description: 'Vyhledávač připojených zařízení – kamery, routery, průmyslové systémy, servery. Nejsilnější síťový OSINT.',
    links: [
      { label: 'Otevřít web', url: 'https://www.shodan.io' },
      { label: 'CLI dokumentace', url: 'https://cli.shodan.io' },
    ],
    usage: [
      { label: 'Instalace CLI', command: 'pip install shodan' },
      { label: 'Inicializace', command: 'shodan init YOUR_API_KEY' },
      { label: 'Hledat', command: 'shodan search "apache country:CZ"' },
      { label: 'Info o IP', command: 'shodan host 1.2.3.4' },
      { label: 'Stáhnout výsledky', command: 'shodan download vysledky "port:22 country:CZ"' },
    ],
  },
  {
    id: 'censys',
    name: 'Censys',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['certificates', 'ports', 'hosts', 'fingerprint'],
    description: 'Alternativa Shodanu – zaměřená na certifikáty a fingerprinting hostů. API pro výzkumníky zdarma.',
    links: [
      { label: 'Otevřít web', url: 'https://search.censys.io' },
      { label: 'API dokumentace', url: 'https://search.censys.io/api' },
    ],
  },
  {
    id: 'nmap',
    name: 'Nmap',
    scenarios: ['network'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['ports', 'scan', 'services', 'os', 'scripts'],
    description: 'Legendární síťový skener – otevřené porty, OS fingerprinting, detekce služeb a NSE skripty.',
    install: [
      { label: 'Debian/Ubuntu', command: 'sudo apt install nmap' },
      { label: 'macOS', command: 'brew install nmap' },
      { label: 'Windows', command: 'winget install nmap' },
    ],
    usage: [
      { label: 'Rychlý scan', command: 'nmap -F 192.168.1.1' },
      { label: 'Detekce služeb', command: 'nmap -sV 192.168.1.1' },
      { label: 'OS fingerprint', command: 'nmap -O 192.168.1.1' },
      { label: 'NSE skripty', command: 'nmap --script=http-title 192.168.1.0/24' },
      { label: 'Stealth scan', command: 'nmap -sS -T4 192.168.1.0/24' },
    ],
    links: [
      { label: 'Oficiální web', url: 'https://nmap.org' },
    ],
  },
  {
    id: 'masscan',
    name: 'Masscan',
    scenarios: ['network'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['ports', 'fast', 'internet-scale', 'tcp'],
    description: 'Extrémně rychlý port scanner – dokáže projít celý internet za 6 minut. Používej zodpovědně!',
    install: [
      { label: 'Debian/Ubuntu', command: 'sudo apt install masscan' },
      { label: 'git + make', command: 'git clone https://github.com/robertdavidgraham/masscan && cd masscan && make' },
    ],
    usage: [
      { label: 'Scan rozsahu', command: 'sudo masscan 192.168.0.0/16 -p80,443' },
      { label: 'Rychlost', command: 'sudo masscan 10.0.0.0/8 -p22 --rate=10000' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/robertdavidgraham/masscan' },
    ],
  },
  {
    id: 'bgpview',
    name: 'BGPView',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['bgp', 'asn', 'ip', 'routing', 'prefix'],
    description: 'Průzkum BGP routování – IP rozsahy organizace, ASN čísla, upstream providery, geolokace prefixů.',
    links: [
      { label: 'Otevřít web', url: 'https://bgpview.io' },
    ],
  },
  {
    id: 'fofa',
    name: 'FOFA',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['iot', 'search', 'banners', 'china', 'shodan-alt'],
    description: 'Čínská alternativa Shodanu – indexuje miliardy zařízení a služeb, silná pro asijskou infrastrukturu.',
    links: [
      { label: 'Otevřít web', url: 'https://en.fofa.info' },
    ],
  },
  {
    id: 'zoomeye',
    name: 'ZoomEye',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['iot', 'search', 'devices', 'services'],
    description: 'Čínský vyhledávač kybernetického prostoru – vyhledává zařízení, komponenty a webové servery.',
    links: [
      { label: 'Otevřít web', url: 'https://www.zoomeye.org' },
    ],
  },
  {
    id: 'ipcow',
    name: 'ipinfo.io',
    scenarios: ['network'],
    type: 'WEB',
    tags: ['ip', 'asn', 'organization', 'geolocation', 'api'],
    description: 'Detailní info o IP – ASN, organizace, geolokace, typ (hosting/ISP/VPN), rozsah.',
    links: [
      { label: 'Otevřít web', url: 'https://ipinfo.io' },
    ],
    usage: [
      { label: 'Lookup IP', command: 'curl https://ipinfo.io/1.2.3.4' },
    ],
  },

  // =========================================================
  // DARK WEB / LEAKY DATA
  // =========================================================
  {
    id: 'haveibeenpwned',
    name: 'HaveIBeenPwned',
    scenarios: ['darkweb', 'email'],
    type: 'WEB',
    tags: ['breach', 'email', 'password', 'leak', 'popular'],
    description: 'Zkontroluje, jestli byl e-mail uniklý v databázovém breachi. Databáze miliard kompromitovaných účtů.',
    links: [
      { label: 'Otevřít web', url: 'https://haveibeenpwned.com' },
      { label: 'API', url: 'https://haveibeenpwned.com/API/v3' },
    ],
  },
  {
    id: 'intelx',
    name: 'Intelligence X',
    scenarios: ['darkweb', 'email', 'domain'],
    type: 'WEB',
    tags: ['darkweb', 'leak', 'search', 'archive', 'tor'],
    description: 'Prohledává dark web, Tor, I2P, paste sites a uniklé databáze. E-maily, IP, domény, pojmy.',
    links: [
      { label: 'Otevřít web', url: 'https://intelx.io' },
    ],
  },
  {
    id: 'dehashed',
    name: 'Dehashed',
    scenarios: ['darkweb'],
    type: 'WEB',
    tags: ['breach', 'password', 'hash', 'leak', 'database'],
    description: 'Prohledávač uniklých databází – podle e-mailu, jména, uživatelského jména, hesla nebo IP.',
    links: [
      { label: 'Otevřít web', url: 'https://www.dehashed.com' },
    ],
  },
  {
    id: 'leakix',
    name: 'LeakIX',
    scenarios: ['darkweb', 'network'],
    type: 'WEB',
    tags: ['exposed', 'services', 'misconfig', 'elasticsearch', 's3'],
    description: 'Indexuje chybně nakonfigurované nebo uniklé servery, Elasticsearch, S3 buckety, MongoDB.',
    links: [
      { label: 'Otevřít web', url: 'https://leakix.net' },
    ],
  },
  {
    id: 'pastebin_search',
    name: 'Pastebin Search (OSINT)',
    scenarios: ['darkweb'],
    type: 'WEB',
    tags: ['paste', 'leak', 'credentials', 'public'],
    description: 'Prohledávání veřejných paste stránek (Pastebin, Hastebin, Ghostbin) pro uniklá data.',
    links: [
      { label: 'Pastebin Search', url: 'https://psbdmp.ws' },
      { label: 'Google Dork', url: 'https://www.google.com/search?q=site:pastebin.com' },
    ],
  },
  {
    id: 'grep_app',
    name: 'grep.app',
    scenarios: ['darkweb', 'domain'],
    type: 'WEB',
    tags: ['code', 'search', 'github', 'secrets', 'leak'],
    description: 'Prohledává přes 500 000 GitHub repozitářů – hledá API klíče, tokeny, hesla v kódu.',
    links: [
      { label: 'Otevřít web', url: 'https://grep.app' },
    ],
  },
  {
    id: 'gitdorker',
    name: 'GitDorker',
    scenarios: ['darkweb', 'domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['github', 'secrets', 'api-keys', 'dorks'],
    description: 'Automaticky prohledá GitHub pro citlivá data pomocí sady dorks – tokeny, hesla, klíče.',
    install: [
      { label: 'git clone', command: 'git clone https://github.com/obheda12/GitDorker && cd GitDorker' },
      { label: 'Závislosti', command: 'pip3 install -r requirements.txt' },
    ],
    usage: [
      { label: 'Základní hledání', command: 'python3 gitdorker.py -tf TOKENS -q example.com -d dorks/BHIS_top_dorks.txt' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/obheda12/GitDorker' },
    ],
  },
  {
    id: 'trufflehog',
    name: 'TruffleHog',
    scenarios: ['darkweb', 'domain'],
    type: 'CLI',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['github', 'secrets', 'credentials', 'git-history'],
    description: 'Prohledá git historii repozitáře pro náhodně commitnuté secrets – API klíče, tokeny, hesla.',
    install: [
      { label: 'pip', command: 'pip3 install trufflehog' },
      { label: 'Docker', command: 'docker pull trufflesecurity/trufflehog:latest' },
    ],
    usage: [
      { label: 'Scan GitHub repo', command: 'trufflehog git https://github.com/user/repo' },
      { label: 'Scan lokálně', command: 'trufflehog git file://./cesta/k/repo' },
      { label: 'Docker scan', command: 'docker run trufflesecurity/trufflehog:latest git https://github.com/user/repo' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/trufflesecurity/trufflehog' },
    ],
  },

  // =========================================================
  // KRYPTO A BLOCKCHAIN
  // =========================================================
  {
    id: 'btcparser',
    name: 'Blockchain Explorer (btc)',
    scenarios: ['crypto'],
    type: 'WEB',
    tags: ['bitcoin', 'transactions', 'wallet', 'explorer'],
    description: 'Prohledá Bitcoin blockchain – transakce, zůstatky peněženek, původ a cíl coinů.',
    links: [
      { label: 'Blockchain.com', url: 'https://www.blockchain.com/explorer' },
      { label: 'Blockchair', url: 'https://blockchair.com' },
    ],
  },
  {
    id: 'etherscan',
    name: 'Etherscan',
    scenarios: ['crypto'],
    type: 'WEB',
    tags: ['ethereum', 'transactions', 'contracts', 'nft'],
    description: 'Ethereum blockchain explorer – transakce, smart kontrakty, tokeny, NFT, interakce peněženek.',
    links: [
      { label: 'Otevřít web', url: 'https://etherscan.io' },
    ],
  },
  {
    id: 'maltego_crypto',
    name: 'Crystal Blockchain',
    scenarios: ['crypto'],
    type: 'WEB',
    tags: ['bitcoin', 'analytics', 'aml', 'tracing'],
    description: 'Profesionální sledování krypto transakcí – vizualizace toků, risk scoring, AML analýza.',
    links: [
      { label: 'Otevřít web', url: 'https://crystalblockchain.com' },
    ],
  },
  {
    id: 'bitquery',
    name: 'Bitquery',
    scenarios: ['crypto'],
    type: 'WEB',
    tags: ['blockchain', 'graphql', 'multi-chain', 'analytics'],
    description: 'GraphQL API pro analýzu 40+ blockchainů – DEX obchody, wallet analýzy, token toky.',
    links: [
      { label: 'Otevřít web', url: 'https://bitquery.io' },
    ],
  },
  {
    id: 'chainalysis',
    name: 'Chainalysis Reactor (Crypto Investigations)',
    scenarios: ['crypto'],
    type: 'WEB',
    tags: ['professional', 'crypto', 'investigations', 'aml'],
    description: 'Profesionální krypto investigační platforma – sledování peněženek, identifikace burz, risk scoring.',
    links: [
      { label: 'Otevřít web', url: 'https://www.chainalysis.com/chainalysis-reactor/' },
    ],
  },

  // =========================================================
  // OSOBY A JMÉNA
  // =========================================================
  {
    id: 'intelius',
    name: 'Intelius',
    scenarios: ['people'],
    type: 'WEB',
    tags: ['people', 'address', 'background', 'usa'],
    description: 'Americká databáze osob – adresy, telefonní čísla, příbuzní, sousedé, kriminální záznamy.',
    links: [
      { label: 'Otevřít web', url: 'https://www.intelius.com' },
    ],
  },
  {
    id: 'webmii',
    name: 'WebMii',
    scenarios: ['people'],
    type: 'WEB',
    tags: ['people', 'web-presence', 'name', 'search'],
    description: 'Prohledá web pro výskyt jména – agreguje výsledky, fotky a profily z celého internetu.',
    links: [
      { label: 'Otevřít web', url: 'https://webmii.com' },
    ],
  },
  {
    id: 'peekyou',
    name: 'PeekYou',
    scenarios: ['people'],
    type: 'WEB',
    tags: ['people', 'social', 'name', 'usa'],
    description: 'Vyhledávač osob propojující jména se sociálními sítěmi, blogy a veřejnými záznamy.',
    links: [
      { label: 'Otevřít web', url: 'https://www.peekyou.com' },
    ],
  },
  {
    id: 'linkedin_osint',
    name: 'LinkedIn OSINT',
    scenarios: ['people', 'company'],
    type: 'WEB',
    tags: ['linkedin', 'professional', 'company', 'career'],
    description: 'Pokročilé vyhledávání na LinkedIn bez přihlášení – přes Google dorks nebo Cache.',
    links: [
      { label: 'LinkedIn Search', url: 'https://www.linkedin.com/search/results/people/' },
    ],
    usage: [
      { label: 'Jméno + firma (Google)', command: 'site:linkedin.com "jmeno prijmeni" "nazev firmy"' },
      { label: 'Zaměstnanci firmy', command: 'site:linkedin.com/in "nazev firmy"' },
      { label: 'Vedoucí pracovníci', command: 'site:linkedin.com "CEO" OR "CTO" "nazev firmy"' },
    ],
  },
  {
    id: 'recruitin',
    name: 'Recruitin',
    scenarios: ['people'],
    type: 'WEB',
    tags: ['linkedin', 'search', 'professional', 'boolean'],
    description: 'Generátor Boolean search dotazů pro LinkedIn – hledání lidí podle role, lokace, firmy, skills.',
    links: [
      { label: 'Otevřít web', url: 'https://recruitin.net' },
    ],
  },

  // =========================================================
  // FIRMY A ORGANIZACE
  // =========================================================
  {
    id: 'opencorporates',
    name: 'OpenCorporates',
    scenarios: ['company'],
    type: 'WEB',
    tags: ['company', 'global', 'directors', 'registration'],
    description: 'Největší veřejná databáze firem – 200+ milionů záznamů ze 140+ jurisdikcí. Propojení vlastníků.',
    links: [
      { label: 'Otevřít web', url: 'https://opencorporates.com' },
      { label: 'API', url: 'https://api.opencorporates.com' },
    ],
  },
  {
    id: 'icij_offshoreleaks',
    name: 'ICIJ Offshore Leaks DB',
    scenarios: ['company'],
    type: 'WEB',
    tags: ['offshore', 'panama-papers', 'pandora-papers', 'shell-company'],
    description: 'Databáze Panama Papers, Pandora Papers a dalších úniků – offshore firmy, beneficiální vlastníci.',
    links: [
      { label: 'Otevřít web', url: 'https://offshoreleaks.icij.org' },
    ],
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase',
    scenarios: ['company'],
    type: 'WEB',
    tags: ['startup', 'funding', 'investors', 'founders'],
    description: 'Databáze startupů a investic – zakladatelé, financování, investoři, akvizice, klíčoví lidé.',
    links: [
      { label: 'Otevřít web', url: 'https://www.crunchbase.com' },
    ],
  },
  {
    id: 'orbis',
    name: 'Bureau van Dijk – Orbis',
    scenarios: ['company'],
    type: 'WEB',
    tags: ['company', 'financial', 'ownership', 'professional'],
    description: 'Profesionální databáze 400M+ firem – vlastnické struktury, finanční výkazy, pobočky.',
    links: [
      { label: 'Otevřít web', url: 'https://orbis.bvdinfo.com' },
    ],
  },
  {
    id: 'opensanctions',
    name: 'OpenSanctions',
    scenarios: ['company', 'people'],
    type: 'WEB',
    tags: ['sanctions', 'pep', 'watchlist', 'risk'],
    description: 'Prohledává sankční listiny, PEP databáze a watchlisty 100+ zdrojů. API zdarma.',
    links: [
      { label: 'Otevřít web', url: 'https://www.opensanctions.org' },
      { label: 'API', url: 'https://api.opensanctions.org' },
    ],
  },
  {
    id: 'tedec',
    name: 'TED – EU Procurement',
    scenarios: ['company'],
    type: 'WEB',
    tags: ['eu', 'procurement', 'tender', 'contracts', 'public'],
    description: 'EU databáze veřejných zakázek – kdo vyhral jakou zakázku v EU, hodnoty smluv, dodavatelé.',
    links: [
      { label: 'Otevřít web', url: 'https://ted.europa.eu' },
    ],
  },
  {
    id: 'occrp_aleph',
    name: 'OCCRP Aleph',
    scenarios: ['company', 'people'],
    type: 'WEB',
    tags: ['investigative', 'journalism', 'corruption', 'leaks'],
    description: 'Investigativní OSINT platforma – prohledá statní registry, uniklé databáze, justice dokumenty.',
    links: [
      { label: 'Otevřít web', url: 'https://aleph.occrp.org' },
    ],
  },

  // =========================================================
  // AI OSINT NÁSTROJE
  // =========================================================
  {
    id: 'osint_gpt',
    name: 'ChatGPT / Claude pro OSINT',
    scenarios: ['ai'],
    type: 'AI',
    tags: ['ai', 'llm', 'analysis', 'summarize'],
    description: 'Velké jazykové modely pro analýzu a shrnutí OSINT dat – generování hypotéz, parsování výstupů.',
    links: [
      { label: 'ChatGPT', url: 'https://chatgpt.com' },
      { label: 'Claude', url: 'https://claude.ai' },
    ],
  },
  {
    id: 'pimeyes',
    name: 'PimEyes',
    scenarios: ['ai', 'stalking'],
    type: 'AI',
    tags: ['face', 'recognition', 'reverse-image', 'powerful'],
    description: 'Reverzní vyhledávání obličejů – najde výskyty tváře na internetu. Velmi silný, přísně jen legálně.',
    links: [
      { label: 'Otevřít web', url: 'https://pimeyes.com' },
    ],
  },
  {
    id: 'facecheck',
    name: 'FaceCheck.ID',
    scenarios: ['ai', 'stalking'],
    type: 'AI',
    tags: ['face', 'recognition', 'search', 'free'],
    description: 'Bezplatné reverzní vyhledávání obličejů – najde výskyty osoby na webu, sociálních sítích.',
    links: [
      { label: 'Otevřít web', url: 'https://facecheck.id' },
    ],
  },
  {
    id: 'deepfakedetector',
    name: 'Deepfake Detector',
    scenarios: ['ai', 'meta'],
    type: 'AI',
    tags: ['deepfake', 'video', 'verification', 'synthetic'],
    description: 'AI analýza videa pro detekci deepfake obsahu – pravděpodobnost, že je video synteticky generované.',
    links: [
      { label: 'Sensity AI', url: 'https://sensity.ai' },
      { label: 'Hive Moderation', url: 'https://hivemoderation.com' },
    ],
  },
  {
    id: 'skopenow',
    name: 'Skopenow',
    scenarios: ['ai'],
    type: 'AI',
    tags: ['automated', 'social', 'ai', 'professional'],
    description: 'AI-powered automatizovaný OSINT – prohledává sociální sítě, veřejné záznamy a deep web.',
    links: [
      { label: 'Otevřít web', url: 'https://www.skopenow.com' },
    ],
  },
  {
    id: 'xposedornot',
    name: 'XposedOrNot',
    scenarios: ['ai', 'darkweb'],
    type: 'WEB',
    tags: ['breach', 'email', 'exposure', 'free'],
    description: 'Prohledá 13+ miliard řádků z uniklých databází – e-mail, heslo, jméno. Bezplatné API.',
    links: [
      { label: 'Otevřít web', url: 'https://xposedornot.com' },
      { label: 'API', url: 'https://api.xposedornot.com' },
    ],
  },

  // =========================================================
  // EXTRA – RŮZNÉ / GENERAL
  // =========================================================
  {
    id: 'osintcombine',
    name: 'OSINT Combine Tools',
    scenarios: ['stalking', 'geo', 'domain'],
    type: 'WEB',
    tags: ['collection', 'free-tools', 'reference'],
    description: 'Sbírka 30+ bezplatných OSINT mini-nástrojů – export Twitteru, YouTube metadata, Google cache…',
    links: [
      { label: 'Otevřít web', url: 'https://www.osintcombine.com/tools' },
    ],
  },
  {
    id: 'search_engines',
    name: 'Alternativní vyhledávače',
    scenarios: ['stalking', 'domain'],
    type: 'WEB',
    tags: ['search', 'bing', 'yandex', 'baidu', 'uncensored'],
    description: 'Yandex, Bing, Baidu a DuckDuckGo vrací jiné výsledky než Google – Yandex výborný pro obličeje.',
    links: [
      { label: 'Yandex Images', url: 'https://yandex.com/images/' },
      { label: 'Bing Images', url: 'https://www.bing.com/images/' },
    ],
  },
  {
    id: 'archive_today',
    name: 'Archive.today',
    scenarios: ['domain', 'stalking'],
    type: 'WEB',
    tags: ['archive', 'snapshot', 'cache', 'deleted'],
    description: 'Alternativní archiv webu – uloží nebo najde snapshot stránky. Funguje i kde Wayback selhává.',
    links: [
      { label: 'Otevřít web', url: 'https://archive.today' },
    ],
  },
  {
    id: 'cachedview',
    name: 'Google Cache / Cached View',
    scenarios: ['domain'],
    type: 'WEB',
    tags: ['cache', 'google', 'deleted', 'snapshot'],
    description: 'Zobrazí Google Cache stránky – obsah webu jak ho naposledy indexoval Google.',
    links: [
      { label: 'CachedView', url: 'https://cachedview.nl' },
    ],
    usage: [
      { label: 'Google Cache dork', command: 'cache:example.com' },
    ],
  },
  {
    id: 'maltego_ce_transforms',
    name: 'Maltego Community Transforms',
    scenarios: ['viz', 'domain', 'email'],
    type: 'TOOL',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['maltego', 'transforms', 'community', 'integrations'],
    description: 'Bezplatné transformace pro Maltego CE – Shodan, VirusTotal, HIBP, Whois a desítky dalších.',
    links: [
      { label: 'Transform Hub', url: 'https://www.maltego.com/transform-hub/' },
    ],
  },
  {
    id: 'creepy',
    name: 'Creepy',
    scenarios: ['geo', 'stalking'],
    type: 'TOOL',
    platforms: ['Linux', 'macOS', 'Windows'],
    tags: ['geolocation', 'social', 'map', 'aggregation'],
    description: 'Agreguje geolokační data z Twitter a Instagram příspěvků a zobrazí je na mapě.',
    links: [
      { label: 'GitHub', url: 'https://github.com/ilektrojohn/creepy' },
    ],
  },
];
