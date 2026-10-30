// ============================================================
// DATA – kategorie a nástroje
// Přidání nového nástroje = 1 objekt do pole TOOLS
// ============================================================

const CATEGORIES = [
  { id: 'social',   name: 'Sociální sítě',            icon: '👤' },
  { id: 'email',    name: 'E-maily a identity',       icon: '📧' },
  { id: 'phone',    name: 'Telefonní čísla',          icon: '📱' },
  { id: 'meta',     name: 'Metadata a média',         icon: '🖼️' },
  { id: 'domain',   name: 'Domény a weby',            icon: '🌐' },
  { id: 'geo',      name: 'Geolokace',                icon: '📍' },
  { id: 'cz',       name: 'České OSINT',              icon: '🇨🇿' },
  { id: 'viz',      name: 'Vizualizace',              icon: '🕸️' },
];

const TOOLS = [
  // ----- SOCIÁLNÍ SÍTĚ -----
  {
    name: 'Sherlock',
    category: 'social',
    type: 'CLI',
    description: 'Stopování digitální stopy uživatelů napříč stovkami sociálních sítí.',
    command: 'sherlock prezdivka',
    link: 'https://github.com/sherlock-project/sherlock',
  },
  {
    name: 'Maigret',
    category: 'social',
    type: 'CLI',
    description: 'Extrémní verze Sherlocka – hledá profily podle uživatelského jména.',
    command: 'maigret cilova_prezdivka',
    link: 'https://github.com/soxoj/maigret',
  },
  {
    name: 'WhatsMyName',
    category: 'social',
    type: 'WEB',
    description: 'Vyhledává uživatelská jména na stovkách webů.',
    url: 'https://whatsmyname.app',
  },
  {
    name: 'Blackbird',
    category: 'social',
    type: 'CLI',
    description: 'Vyhledávání uživatelských jmen a e-mailových stop.',
    command: 'python blackbird.py --username johndoe',
    link: 'https://github.com/p1ngul1n0/blackbird',
  },

  // ----- E-MAILY -----
  {
    name: 'Holehe',
    category: 'email',
    type: 'CLI',
    description: 'Na jakých internetových službách a sociálních sítích je registrován konkrétní e-mail.',
    command: 'holehe cilovy-email@gmail.com',
    link: 'https://github.com/megadose/holehe',
  },
  {
    name: 'theHarvester',
    category: 'email',
    type: 'CLI',
    description: 'Mapování firemní infrastruktury, sběr uniklých e-mailů a jmen zaměstnanců.',
    command: 'theHarvester -d nazevfirmy.cz -b linkedin',
    link: 'https://github.com/laramies/theHarvester',
  },
  {
    name: 'Blackbird (PDF report)',
    category: 'email',
    type: 'CLI',
    description: 'Hledání e-mailových stop a generování PDF reportu.',
    command: 'python blackbird.py --email johndoe@example.com --pdf',
    link: 'https://github.com/p1ngul1n0/blackbird',
  },

  // ----- TELEFONY -----
  {
    name: 'PhoneInfoga',
    category: 'phone',
    type: 'CLI',
    description: 'Hluboká analýza a zjišťování informací z mezinárodních telefonních čísel.',
    command: 'phoneinfoga scan -n +420123456789',
    link: 'https://github.com/sundowndev/phoneinfoga',
  },

  // ----- METADATA -----
  {
    name: 'ExifTool',
    category: 'meta',
    type: 'CLI',
    description: 'Analýza skrytých dat ve fotkách a PDF souborech.',
    command: 'exiftool jmeno_fotky.jpg',
    link: 'https://exiftool.org',
  },
  {
    name: 'TinEye',
    category: 'meta',
    type: 'WEB',
    description: 'Reverzní vyhledávání obrázků – najdi zdroj a podobné snímky.',
    url: 'https://tineye.com',
  },
  {
    name: 'InVID-WeVerify',
    category: 'meta',
    type: 'PLUGIN',
    description: 'Rozdělení videa na jednotlivé snímky pro forenzní analýzu.',
    url: 'https://www.invid-project.eu/tools-and-services/invid-verification-plugin',
  },

  // ----- DOMÉNY -----
  {
    name: 'Photon',
    category: 'domain',
    type: 'CLI',
    description: 'Hloubkový průzkum webových stránek – crawluje URL, e-maily, účty.',
    command: 'python3 photon.py -u https://example.com',
    link: 'https://github.com/s0md3v/Photon',
  },
  {
    name: 'WHOIS',
    category: 'domain',
    type: 'CLI',
    description: 'Zjištění majitele domény a registračních údajů.',
    command: 'whois seznam.cz',
  },
  {
    name: 'DIG',
    category: 'domain',
    type: 'CLI',
    description: 'Průzkum DNS záznamů a skrytých serverů.',
    command: 'dig seznam.cz MX',
  },
  {
    name: 'crt.sh',
    category: 'domain',
    type: 'WEB',
    description: 'Vyhledávání TLS/SSL certifikátů a odhalení subdomén.',
    url: 'https://crt.sh',
  },
  {
    name: 'Wayback Machine',
    category: 'domain',
    type: 'WEB',
    description: 'Staré profily, texty a podoby webů v historii.',
    url: 'https://web.archive.org',
  },
  {
    name: 'SpiderFoot',
    category: 'domain',
    type: 'TOOL',
    description: 'Propojuje domény, IP adresy, e-maily a další veřejné informace.',
    link: 'https://github.com/smicallef/spiderfoot',
  },

  // ----- GEO -----
  {
    name: 'GeoSpy.ai',
    category: 'geo',
    type: 'AI',
    description: 'Automatická lokalizace fotek pomocí umělé inteligence.',
    url: 'https://geospy.ai/',
  },
  {
    name: 'SunCalc',
    category: 'geo',
    type: 'WEB',
    description: 'Určování polohy a času podle stínů na fotce.',
    url: 'https://www.suncalc.org',
  },
  {
    name: 'WiGle.net',
    category: 'geo',
    type: 'WEB',
    description: 'Lokalizace podle názvu WiFi sítě (BSSID / SSID).',
    url: 'https://wigle.net/',
  },

  // ----- ČESKÉ -----
  {
    name: 'Hlídač Státu',
    category: 'cz',
    type: 'WEB',
    description: 'Český registr smluv, dotací a veřejných zakázek.',
    url: 'https://www.hlidacstatu.cz/',
  },

  // ----- VIZUALIZACE -----
  {
    name: 'Maltego',
    category: 'viz',
    type: 'TOOL',
    description: 'Vizuální propojování informací – grafy vztahů mezi entitami.',
    url: 'https://www.maltego.com',
  },
];