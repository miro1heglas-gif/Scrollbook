const IC = {
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  back: 'M15 18l-6-6 6-6', next: 'M9 18l6-6-6-6', plus: 'M12 5v14M5 12h14', close: 'M6 6l12 12M18 6L6 18',
  play: 'M7 4l13 8-13 8z', pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  msg: 'M3 11v2a1 1 0 0 0 1 1h3l8 5V5L7 10H4a1 1 0 0 0-1 1zM19 8a5 5 0 0 1 0 8',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3', home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  image: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  more: 'M5 12h.01M12 12h.01M19 12h.01', search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16v-4M12 8h.01', up: 'M12 19V5M5 12l7-7 7 7', down: 'M12 5v14M19 12l-7 7-7-7',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6', camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12', monitor: 'M2 4h20v13H2zM8 21h8M12 17v4',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9', warn: 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
  pin: 'M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  speaker: 'M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14', gear: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  film: 'M3 5h18v14H3zM10 9l5 3-5 3z', music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', db: 'M12 8c4.4 0 8-1.1 8-2.5S16.4 3 12 3 4 4.1 4 5.5 7.6 8 12 8zM4 5.5v13C4 19.9 7.6 21 12 21s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5',
  spark: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z', send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z', edit: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z', ctext: 'M4 7V5h16v2M12 5v14M9 19h6', bus: 'M6 17V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11zM6 11h12M8 20v-3M16 20v-3', table: 'M3 5h18v14H3zM3 10h18M9 10v9M15 10v9', link: 'M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1', map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14', route: 'M6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 17V11a4 4 0 0 1 4-4h6M18 7v6a4 4 0 0 1-4 4H8', grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', drop: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z', clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', vbus: 'M5 16V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9zM5 12h14M8 19v-3M16 19v-3M9 8h6', remove: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12h8', globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18', tick: 'M5 13l4 4L19 7', none: 'M0 0', chevD: 'M6 9l6 6 6-6', chevU: 'M6 15l6-6 6 6', wifi: 'M1 1l22 22M16.7 11.1A10.9 10.9 0 0 1 19 12.6M5 12.6a10.9 10.9 0 0 1 5.2-2.4M10.7 5.1A16 16 0 0 1 22.6 9M1.4 9a15.9 15.9 0 0 1 4.7-2.9M8.5 16.1a6 6 0 0 1 7 0M12 20h.01'
};
// číslo verzie a čas zostavenia doplní build.py; podľa času sa spozná, že na serveri je novšia verzia
const WZ_V = ['__VER__', '__BUILD__'];
try { window.WZ_MAIN_BUILD = WZ_V[1]; } catch (e) {}
const plural = (n, a) => n === 1 ? a[0] : (n >= 2 && n <= 4 ? a[1] : a[2]);
const mmss = (t) => Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
const BG = ['#0E8080', '#0B6E6E', '#1E2A5A', '#2F62B0', '#5B2A86', '#E07A2B', '#C8322B', '#1A1F1F'];
const GRAD = (c) => 'radial-gradient(circle at 70% 30%, rgba(255,255,255,.4), rgba(255,255,255,0) 40%), linear-gradient(135deg,' + c + ',#1A1F1F 170%)';
const TAB_OF = { home: 'home', pls: 'pls', pl: 'pls', sl: 'pls', pv: 'pls', plc: 'plc', gal: 'more', more: 'more', apv: 'more', ad: 'more', set: 'more', ai: 'ai', hist: 'more', pd: 'plc', act: 'more' };
const ROOT = { home: 'home', pls: 'pls', plc: 'plc', ai: 'ai', more: 'more' };
const GRP = ['Hlavná stanica', 'Centrum', 'Električky', 'Parkoviská', 'Nemocnica a univerzita'];
const HM = (add) => { const d = new Date(Date.now() + (add || 0) * 60000); return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); };
// účty na prepnutie – rovnaké roly ako vo webovej aplikácii (Menu používateľa › Prepnúť účet)
// apv = schvaľuje obsah partnerov, pub = zverejňuje sám (bez schválenia), scope = pridelené miesta (null = všetky)
const MACC = {
  admin: { name: 'Miroslav Heglas', first: 'Miroslav', ini: 'MH', role: 'Admin', desc: 'vidí a ovláda všetko', apv: true, pub: true, scope: null },
  director: { name: 'Jana Kováčová', first: 'Jana', f: true, ini: 'JK', role: 'Director', desc: 'zverejňuje a schvaľuje', apv: true, pub: true, scope: null },
  worker: { name: 'Peter Novák', first: 'Peter', ini: 'PN', role: 'Worker', desc: 'len pridelené miesta', apv: false, pub: true, scope: ['hs1', 'hs2', 'hs3', 'hsv', 'snp', 'snpk'] },
  partner: { name: 'Mesto Riečany', first: '', ini: 'MR', role: 'Partner', desc: 'len pridelené plochy · zmeny idú na schválenie', apv: false, pub: false, scope: ['ash', 'pc', 'ps'], partner: true }
};
const ME = { org: 'DP Riečany' };
const DOWN = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'];
const MONG = ['januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'];
const DOWAGO = (n) => DOWN[new Date(Date.now() - n * 864e5).getDay()];
// „z 5“, ale „zo 6“ (číslovka sa začína na s, š, z)
const zN = (n) => (n === 4 || n === 6 || n === 7 || n === 14 || n === 16 || n === 17 || (n >= 40 && n < 50) || (n >= 60 && n < 80) || (n >= 100 && n < 200)) ? 'zo' : 'z';
const DM = (add) => { const d = new Date(Date.now() + (add || 0) * 864e5); return d.getDate() + '. ' + (d.getMonth() + 1) + '.'; };
const QDEF = () => ({ text: '', prio: 'warn', pos: 'top', dur: 'day', all: true, ids: [], tpl: null, tL: '', tM: 0 });
const DURS = { get m15() { return ['15 minút', 'do ' + HM(15)]; }, get h1() { return ['1 hodinu', 'do ' + HM(60)]; }, day: ['Do konca dňa', 'do 23:59'], rev: ['Do zrušenia', 'do zrušenia'], custom: ['Vlastný čas', ''] };
const SWD = { today: ['Len dnes', 'do 23:59, potom sa vráti pôvodný plán'], get h1() { return ['Na 1 hodinu', 'do ' + HM(60)]; }, get h4() { return ['Na 4 hodiny', 'do ' + HM(240)]; }, rev: ['Do odvolania', 'kým ho nevrátite ručne'], custom: ['Vlastný čas', 'Vyberte začiatok a koniec'] };
// zariadenie, pre ktoré je playlist vytvorený: [celý názov, krátky názov, šírka náhľadu, šírka miniatúry, šírka v páse]
const DEV = {
  portrait: ['32″ kiosk – dotyk, reproduktor, APEX, 4 HW tlačidlá', '32″ kiosk', 210, 44, 84],
  p31: ['31″ nedotykový', '31″ nedotykový', 210, 44, 84],
  lcd: ['55″ nedotykový na šírku', '55″ nedotykový', 358, 92, 150],
  stop: ['LED tabuľa 192 × 64 – zastávka (odchody)', 'LED tabuľa 192 × 64', 358, 96, 180],
  totem: ['Označník: LED čas a dátum + LED odchody + e-papier', 'Označník LED + e-papier', 104, 44, 84],
  vehicle: ['Vozidlo: LED čelná tabuľa 288 × 48', 'Vozidlo: LED 288 × 48', 358, 120, 240]
};
// vzory rozloženia snímky: riadky [výška %, [šírky stĺpcov %]] – v mobile sa nemenia, len sa upravuje obsah sekcií
const VZ = { 'Kiosk s menu': [[12, [100]], [73, [100]], [15, [100]]], 'Hlavička + 2': [[15, [100]], [85, [50, 50]]], '3 riadky – zastávka': [[14, [100]], [66, [100]], [20, [100]]], 'Hore 1 + dole 2': [[50, [100]], [50, [50, 50]]], '2 × 2': [[50, [50, 50]], [50, [50, 50]]], 'Pás – nástupište': [[100, [35, 65]]], 'Nástenka 2 × 2 na šírku': [[50, [50, 50]], [50, [50, 50]]], 'Odchody + 2 info': [[60, [100]], [40, [50, 50]]], 'Hlavička + 3 riadky': [[13, [100]], [29, [100]], [29, [100]], [29, [100]]], 'Veľký obsah + pruh': [[85, [100]], [15, [100]]] };
// typy obsahu sekcie: [kľúč, názov, popis, ikona, zdroj dát, potrebná schopnosť zariadenia]
const CT = [['text', 'Text', 'Nadpis alebo oznam', 'ctext', '', ''], ['photo', 'Obrázok', 'Fotka alebo grafika', 'image', '', ''], ['video', 'Video', 'Krátke video v slučke', 'film', '', 'video'], ['deps', 'Odchody vozidiel', 'Živé odchody zo zastávky', 'bus', 'cis', ''], ['tt', 'Cestovné poriadky', 'Tabuľka odchodov podľa liniek', 'table', 'gtfs', ''], ['web', 'Odkaz', 'Zobrazí webovú stránku', 'link', '', 'web'], ['map', 'Mapa', 'Mapa okolia zastávky', 'map', 'map', ''], ['weather', 'Počasie', 'Teplota a predpoveď', 'sun', 'weather', ''], ['line', 'Detail linky', 'Trasa a zastávky linky', 'route', 'gtfs', ''], ['menu', 'Info menu', 'Dotykové dlaždice s ponukou', 'grid', '', 'touch'], ['vroute', 'Vozidlová trasa', 'Trasa vozidla z palubného počítača', 'vbus', 'obc', 'vehicle'], ['cal', 'Kalendár', 'Mesiac so sviatkami a udalosťami', 'cal', '', ''], ['water', 'Vodné merania', 'Hladiny a prietoky tokov', 'drop', 'water', ''], ['clock', 'Čas', 'Hodiny a dátum', 'clock', '', '']];
// zdroje dát organizácie (nastavujú sa v desktope: Nastavenia › Zdroje dát)
const SRC = { cis: ['Odchody – CIS DP Riečany', true], gtfs: ['Cestovné poriadky – GTFS', true], map: ['Mapové podklady – OpenStreetMap', true], weather: ['Počasie – SHMÚ', true], water: ['Vodné merania – SHMÚ', false], obc: ['Palubný počítač vozidla', false] };
// čo zariadenie zvládne
const DCAP = { portrait: { touch: 1, video: 1, web: 1 }, p31: { video: 1, web: 1 }, lcd: { video: 1, web: 1 }, vehicle: { vehicle: 1 }, stop: {}, totem: {} };
const NEEDT = { touch: 'Zariadenie nie je dotykové', video: 'Zariadenie neprehráva video', web: 'Zariadenie nemá prehliadač', vehicle: 'Len pre displej vo vozidle' };
const isPort = (d) => d === 'portrait' || d === 'p31';
// zariadenie s viacerými displejmi pod sebou: [id displeja, názov, vykreslenie, šírka miniatúry, šírka v páse, šírka v editore]
const PARTS = { totem: [['cas', 'LED čas a dátum', 'ledclock', 72, 150, 300], ['odch', 'LED odchody', 'ledtall', 44, 84, 200], ['ep', 'e-papier 31,5″', 'epaper', 40, 84, 190]] };
const isLedR = (d) => d === 'stop' || d === 'vehicle' || d === 'ledclock' || d === 'ledtall';
const PDEV = { stop: 'stop', info: 'portrait', bus: 'lcd', park: 'lcd', tram: 'vehicle' };
const isLedDev = (d) => d === 'stop' || d === 'vehicle';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    let id = 100;
    this.nid = () => ++id;
    this.uid = 'app' + Math.random().toString(36).slice(2, 8);
    const SL = (kind, title, text, dur, bg, ex) => Object.assign({ id: this.nid(), kind, title, text, dur, bg, img: '', imgName: '', ledSize: 'M', ledAlign: 'left', ledCol: '', ledBg: '', d: '' }, ex || {});
    const PH = (title, dur, col, name) => SL('photo', title, '', dur, '#1A1F1F', { img: col, imgName: name });
    const LED = (text, dur, ex) => SL('led', text, '', dur, '#050505', ex);
    const PL = (pid, name, dev, st, slides, where, ex) => Object.assign({ id: pid, name, dev, st, slides, where, flow: 'none', plan: 'Po–Pi 6:00–22:00 · bez obmedzenia dátumu', touch: false, log: [] }, ex || {});
    const pls = [
      PL('p7', 'Aquapark – leto', 'portrait', 'expirovany', [PH('Akcia leto -20 %', 12, '#F2A65A', 'leto-akcia.jpg'), SL('info', 'Otváracie hodiny', 'Denne 9:00 – 21:00', 10, '#2F62B0'), SL('info', 'Cenník', 'Dospelí 8 €, deti 5 €', 10, '#0E8080')], [], { plan: 'Platnosť skončila 31. 8.' }),
      PL('p2', 'Autobusová stanica – nástupištia', 'lcd', 'nahraty', [SL('tpl', 'Nástupište A – odchody a oznam', '', 20, '#1E2A5A', { vz: 'Hlavička + 2', secs: [{ name: 'Hlavička', type: 'text', text: 'Autobusová stanica – nástupište A', bg: '#0E8080' }, { name: 'Odchody', type: 'deps', text: 'Linky 3 · 5 · 14', bg: '#1E2A5A' }, { name: 'Oznam', type: 'text', text: 'Mestské trhy každú sobotu na Námestí SNP.', bg: '#5B2A86', owner: 'Mesto Riečany' }] }), PH('Letná akcia – nástupište', 12, '#F2A65A', 'leto-akcia.jpg'), SL('info', 'Výluka linky 5', 'Linka 5 je odklonená cez Bulvár.', 10, '#C8322B'), SL('tpl', 'Nástupište – odchody a akcia', '', 15, '#1E2A5A', { vz: 'Pás – nástupište', secs: [{ name: 'Odchody', type: 'deps', text: 'Linky 3 · 5 · 14', bg: '#1E2A5A' }, { name: 'Reklama', type: 'photo', img: '#F2A65A', imgName: 'leto-akcia.jpg', cap: 'Letná akcia -20 %', owner: 'Mesto Riečany' }] })], ['asa', 'asb', 'ash']),
      PL('p16', 'Autobusy a trolejbusy – vo vozidle', 'vehicle', 'nahraty', [LED('Nasledujúca zastávka: Hlavná stanica', 8, { ledSize: 'L' }), LED('Nezabudnite si označiť lístok', 8, { ledSize: 'L', ledCol: '#34D8FF' }), LED('Prajeme príjemnú cestu', 6, { ledCol: '#4CFF4C', ledSize: 'L', ledAlign: 'center' })], ['tb12', 'a31']),
      PL('p3', 'Cestovný poriadok – zima', 'portrait', 'nahraty', [SL('info', 'Cestovný poriadok 12', 'Platný od 1. 11. do 31. 3.', 20, '#0B6E6E'), SL('deps', 'Najbližšie odchody', 'Linky 3 · 5 · 14 · 25', 15, '#1E2A5A'), SL('tpl', 'Info menu – kiosk', '', 15, '#2F62B0', { vz: 'Kiosk s menu', secs: [{ name: 'Hlavička', type: 'text', text: 'Hlavná stanica – informácie', bg: '#0B6E6E' }, { name: 'Obsah', type: 'photo', img: '#0E8080', imgName: 'autobus.jpg', cap: 'Vitajte v Riečanoch' }, { name: 'Menu', type: 'text', text: 'Odchody · Mapa · Cenník', bg: '#1A1F1F' }] }), SL('tpl', 'Odchody a mapa liniek', '', 20, '#1E2A5A', { vz: 'Hore 1 + dole 2', secs: [{ name: 'Odchody', type: 'deps', text: 'Linky 3 · 5 · 14 · 25', bg: '#1E2A5A' }, { name: 'Oznam', type: 'text', text: 'Zimný cestovný poriadok platí do 31. 3.', bg: '#0B6E6E' }, { name: 'Mapa', type: 'photo', img: '#0E8080', imgName: 'autobus.jpg', cap: 'Mapa liniek' }] })], ['hsv', 'nema', 'let'], { touch: true }),
      PL('p4', 'Cyklotrasa – mapa', 'lcd', 'nahraty', [PH('Mapa trasy', 15, '#4F7A5A', 'mala-fatra.jpg'), SL('info', 'Servisné body', 'Požičovňa a servis pri stanici', 10, '#0E8080'), SL('info', 'Počasie – Žilina', 'Dnes 7 °C, zamračené', 10, '#2F62B0'), SL('tpl', 'Cyklotrasa – nástenka', '', 15, '#0E8080', { vz: 'Nástenka 2 × 2 na šírku', secs: [{ name: 'Mapa', type: 'photo', img: '#4F7A5A', imgName: 'mala-fatra.jpg', cap: 'Trasa Malá Fatra' }, { name: 'Servis', type: 'text', text: 'Požičovňa a servis pri stanici', bg: '#0E8080' }, { name: 'Počasie', type: 'text', text: 'Dnes 7 °C, zamračené', bg: '#2F62B0' }, { name: 'Park', type: 'photo', img: '#7FA65A', imgName: 'park.jpg', cap: 'Oddych v parku', owner: 'Mesto Riečany' }] })], ['pc']),
      PL('p10', 'Divadlo – program', 'portrait', 'nenahraty', [SL('info', 'Divadlo – program', 'Piatok 19:00 · Hlavná scéna', 15, '#5B2A86'), SL('info', 'Vstupenky', 'Predaj v pokladnici od 9:00', 10, '#0E8080')], [], { plan: 'Plán ešte nie je nastavený' }),
      PL('p11', 'Dočasná zastávka Mostná', 'p31', 'nenahraty', [SL('tpl', 'Presunutá zastávka', '', 15, '#C8322B', { vz: 'Hore 1 + dole 2', secs: [{ name: 'Oznam', type: 'text', text: 'Zastávka je presunutá o 50 m v smere jazdy.', bg: '#C8322B' }, { name: 'Mapa', type: 'photo', img: '#7FA65A', imgName: 'park.jpg', cap: 'Nová zastávka' }, { name: 'Odchody', type: 'deps', text: 'Linky 5 · 14', bg: '#1E2A5A' }] }), SL('info', 'Ďakujeme za pochopenie', 'Úprava potrvá do 15. 12.', 10, '#2F62B0')], ['mos'], { owner: 'Mesto Riečany' }),
      PL('p6', 'Električky – vo vozidle', 'vehicle', 'nahraty', [LED('Nasledujúca zastávka: Námestie SNP', 8, { ledSize: 'L' }), LED('Linka 5 je dnes odklonená cez Bulvár', 10, { ledBg: '#E07A2B', ledSize: 'L' }), LED('Prajeme príjemnú cestu', 6, { ledCol: '#4CFF4C', ledSize: 'L', ledAlign: 'center' })], ['t1', 't2', 't3'], { soon: 3, plan: 'Po–Ne 5:00–23:00 · platnosť do ' + DM(3) }),
      PL('p8', 'Futbalový štadión', 'lcd', 'expirovany', [SL('info', 'Zápas – program', 'Sobota 15:00 · Štadión mesta', 15, '#1E7A3A'), SL('info', 'Vstupenky', 'Pokladňa otvorená od 13:00', 10, '#0E8080'), SL('tpl', 'Zápas – pozvánka', '', 12, '#1E7A3A', { vz: 'Veľký obsah + pruh', secs: [{ name: 'Obsah', type: 'text', text: 'Sobota 15:00 · Štadión mesta', bg: '#1E7A3A' }, { name: 'Pruh', type: 'text', text: 'Vstupenky v pokladni od 13:00', bg: '#1A1F1F' }] })], ['ps'], { plan: 'Platnosť skončila 30. 10.' }),
      PL('p9', 'Halloween v meste', 'portrait', 'expirovany', [PH('Halloween v meste', 15, '#2A1B3D', 'halloween.png'), SL('info', 'Program', 'Sprievod o 18:00 z Námestia SNP', 12, '#E07A2B')], [], { plan: 'Platnosť skončila 1. 11.', owner: 'Mesto Riečany' }),
      PL('p1', 'Hlavná stanica – odchody', 'stop', 'nahraty', [SL('deps', 'Najbližšie odchody', 'Linky 3 · 5 · 14', 20, '#050505'), LED('Od pondelka platí nový cestovný poriadok', 10, { ledBg: '#E07A2B', ledSize: 'S' }), LED('Vitajte na Hlavnej stanici', 8, { ledAlign: 'center' })], ['hs1', 'hs2', 'hs3']),
      PL('p12', 'Nová linka 25', 'portrait', 'nenahraty', [SL('info', 'Nová linka 25', 'Od 1. 12. premáva na Letisko', 15, '#0E8080'), SL('deps', 'Najbližšie odchody', 'Linky 25', 15, '#1E2A5A'), SL('info', 'Mapa linky', 'Stanica – Centrum – Letisko', 10, '#2F62B0')], ['let'], { flow: 'pending', plan: 'Platnosť od 1. 12. 2026', owner: 'Letisko Riečany' }),
      PL('p5', 'Kultúra – november', 'portrait', 'nahraty', [SL('info', 'Divadlo – program', 'Piatok 19:00 · Hlavná scéna', 15, '#5B2A86'), SL('info', 'Letné kino – program', 'Streda a štvrtok 21:00', 15, '#1E2A5A'), SL('info', 'Kultúrny program', 'Víkendový program v meste', 15, '#0E8080'), SL('tpl', 'Program na týždeň', '', 15, '#5B2A86', { vz: '2 × 2', secs: [{ name: 'Divadlo', type: 'text', text: 'Divadlo: piatok 19:00', bg: '#5B2A86' }, { name: 'Kino', type: 'text', text: 'Kino: streda 21:00', bg: '#1E2A5A' }, { name: 'Koncert', type: 'text', text: 'Koncert: sobota 18:00', bg: '#C8322B' }, { name: 'Výstava', type: 'text', text: 'Výstava: denne 10 – 18', bg: '#0E8080' }] })], ['snpk', 'rad'], { flow: 'pending', owner: 'Kultúrne centrum Riečany' }),
      PL('p13', 'Zastávky – odchody a oznamy', 'p31', 'nahraty', [SL('tpl', 'Odchody a oznamy', '', 20, '#1E2A5A', { vz: 'Odchody + 2 info', secs: [{ name: 'Odchody', type: 'deps', text: 'Linky 3 · 5 · 14', bg: '#1E2A5A' }, { name: 'Oznam', type: 'text', text: 'Cestujte výhodnejšie s mestskou kartou.', bg: '#0E8080' }, { name: 'Počasie', type: 'text', text: 'Dnes 7 °C, zamračené', bg: '#2F62B0' }] }), SL('tpl', 'Zastávka – prehľad', '', 15, '#1E2A5A', { vz: 'Hlavička + 3 riadky', secs: [{ name: 'Hlavička', type: 'text', text: 'Zastávka MHD', bg: '#0B6E6E' }, { name: 'Odchody', type: 'deps', text: 'Linky 5 · 14', bg: '#1E2A5A' }, { name: 'Oznam', type: 'text', text: 'Linka 5 je dnes odklonená cez Bulvár.', bg: '#C8322B' }, { name: 'Cestovný poriadok', type: 'tt', line: '14', dir: 'Sídlisko Sever', bg: '#1A1F1F' }] })], ['nem', 'ss', 'bul']),
      PL('p15', 'Zastávky MHD – zima', 'p31', 'nahraty', [SL('deps', 'Najbližšie odchody', 'Linky 3 · 5 · 14 · 25', 20, '#1E2A5A'), SL('info', 'Zimná údržba', 'Na zastávkach môže byť poľadovica.', 10, '#2F62B0'), SL('info', 'Cestovný poriadok 12', 'Platný od 1. 11. do 31. 3.', 15, '#0B6E6E'), SL('tpl', 'Zastávka – odchody', '', 20, '#1E2A5A', { vz: '3 riadky – zastávka', secs: [{ name: 'Hlavička', type: 'text', text: 'Zastávka MHD', bg: '#0B6E6E' }, { name: 'Odchody', type: 'deps', text: 'Linky 3 · 5 · 14 · 25', bg: '#1E2A5A' }, { name: 'Pätička', type: 'text', text: 'Na zastávkach môže byť poľadovica.', bg: '#2F62B0', owner: 'Mesto Riečany' }] })], ['uni', 'ocj', 'aq', 'letz'], { flow: 'pending' }),
      PL('p14', 'Označníky – centrum', 'totem', 'nahraty', [SL('clock', 'Čas a dátum', 'y', 10, '#050505', { d: 'cas' }), SL('deps', 'Odchody', 'Linky 3 · 5 · 14 · 25 · 31', 20, '#050505', { d: 'odch' }), LED('Linka 5 je dnes odklonená cez Bulvár', 10, { d: 'odch', ledBg: '#E07A2B', ledSize: 'L' }), SL('info', 'Cestovný poriadok – linka 5', 'Platný od 1. 11. do 31. 3.', 30, '#0E8080', { d: 'ep' }), SL('deps', 'Odchody – všetky linky', 'Linky 3 · 5 · 14 · 25 · 31 · N1', 30, '#1E2A5A', { d: 'ep' })], ['snp', 'zst', 'vlc'])
    ];
    pls.sort((x, y) => x.name.localeCompare(y.name, 'sk'));
    // zoznam snímok = snímky zo všetkých playlistov + tieto samostatné (každá je robená pre jeden typ zariadenia)
    const libX = [
      ['lcd', SL('info', 'Vitajte v Riečanoch', 'Informácie pre cestujúcich', 10, '#0E8080')], ['lcd', SL('deps', 'Odchody – bus stanica', 'Linky 3 · 5 · 14 · 25', 20, '#1E2A5A')], ['lcd', SL('info', 'Zimná údržba', 'Na zastávkach môže byť poľadovica.', 10, '#2F62B0')], ['lcd', PH('Halloween – reklama', 12, '#2A1B3D', 'halloween.png')],
      ['portrait', SL('info', 'Počasie Riečany', 'Dnes 7 °C, zamračené', 10, '#2F62B0')], ['portrait', SL('deps', 'Odchody – hlavná stanica', 'Linky 3 · 5 · 14 · 25 · 31', 20, '#1E2A5A')], ['portrait', SL('info', 'Vianočné trhy', 'Od 28. 11. na Námestí SNP', 12, '#C8322B')],
      ['stop', LED('Mimoriadna udalosť – sledujte hlásenia', 10, { ledBg: '#C8322B', ledSize: 'S' })], ['stop', LED('Nočné linky premávajú od 23:30', 8, { ledSize: 'S' })], ['stop', SL('deps', 'Odchody – všetky linky', 'Linky 3 · 5 · 14 · 25', 20, '#050505')],
      ['vehicle', LED('Držte sa, prosím, počas jazdy', 8, { ledSize: 'L' })], ['vehicle', LED('Nezabudnite si označiť lístok', 8, { ledSize: 'L', ledCol: '#34D8FF' })],
      ['totem', LED('Mimoriadna udalosť – sledujte hlásenia', 10, { d: 'odch', ledBg: '#C8322B', ledSize: 'L' })], ['totem', LED('Nočné linky premávajú od 23:30', 8, { d: 'odch', ledSize: 'L' })], ['totem', SL('info', 'Zmena trasy linky 14', 'Od 1. 12. cez Bulvár a Námestie SNP.', 30, '#0E8080', { d: 'ep' })], ['totem', SL('info', 'Cenník cestovného', 'Základný lístok 1 €, zľavnený 0,50 €.', 30, '#0E8080', { d: 'ep' })]
    ].map((a) => Object.assign({ dev: a[0] }, a[1]));
    const gal = [
      { id: 'g1', name: 'leto-akcia.jpg', title: 'Akcia leto', type: 'img', size: '420 kB', used: 2, usedIn: ['Aquapark – leto', 'Autobusová stanica – nástupištia'], folder: 'Reklamy', col: '#F2A65A' },
      { id: 'g2', name: 'autobus.jpg', title: 'Autobus', type: 'img', size: '610 kB', used: 2, usedIn: ['Futbalový štadión', 'Cestovný poriadok – zima'], folder: 'Reklamy', col: '#0E8080' },
      { id: 'g3', name: 'namestie.jpg', title: 'Námestie', type: 'img', size: '540 kB', used: 0, usedIn: [], folder: 'Oznamy', col: '#6C8EAD' },
      { id: 'g4', name: 'mala-fatra.jpg', title: 'Malá Fatra', type: 'img', size: '880 kB', used: 1, usedIn: ['Cyklotrasa – mapa'], folder: 'Sezónne', col: '#4F7A5A' },
      { id: 'g5', name: 'park.jpg', title: 'Park', type: 'img', size: '470 kB', used: 2, usedIn: ['Dočasná zastávka Mostná', 'Cyklotrasa – mapa'], folder: 'Oznamy', col: '#7FA65A' },
      { id: 'g6', name: 'halloween.png', title: 'Halloween', type: 'img', size: '1,2 MB', used: 1, usedIn: ['Halloween v meste'], folder: 'Sezónne', col: '#2A1B3D' },
      { id: 'g7', name: 'spot-tram.mp4', title: 'Spot – električka', type: 'vid', size: '14 MB', dur: '0:20', used: 2, usedIn: ['Cestovný poriadok – zima', 'Kultúra – november'], folder: 'Reklamy', col: '#0E8080' },
      { id: 'g8', name: 'mesto-timelapse.mp4', title: 'Mesto – timelapse', type: 'vid', size: '38 MB', dur: '0:45', used: 0, usedIn: [], folder: 'Reklamy', col: '#2F62B0' },
      { id: 'g9', name: 'gong-hlasenie.mp3', title: 'Gong', type: 'aud', size: '60 kB', dur: '0:03', used: 4, usedIn: ['Palubné hlásenia (4 udalosti)'], folder: 'Zvukové hlásenia', col: '#1F2323' },
      { id: 'g10', name: 'vyluka-linka-5.mp3', title: 'Výluka linky 5', type: 'aud', size: '290 kB', dur: '0:18', used: 1, usedIn: ['Palubné hlásenia – výluka linky 5'], folder: 'Zvukové hlásenia', col: '#1F2323' },
      { id: 'g11', name: 'znelka-leto.mp3', title: 'Znelka – leto', type: 'aud', size: '190 kB', dur: '0:12', used: 0, usedIn: [], folder: 'Sezónne', col: '#1F2323' }
    ];
    // miesta sú rovnaké ako v desktopovej verzii: [id, názov, typ, skupina, počet zariadení, stav, aktuálny playlist]
    const OFF = { nem: 'od včera 22:10', tb12: 'od dnes 11:05' };
    const TOT = { snp: 1, zst: 1, vlc: 1 };
    const P31 = { uni: 1, ocj: 1, aq: 1, letz: 1, mos: 1, nem: 1, ss: 1, bul: 1 };
    const places = [
      ['hs1', 'Hlavná stanica – nástupište 1', 'stop', 0, 2, 'up', 'p1'], ['hs2', 'Hlavná stanica – nástupište 2', 'stop', 0, 2, 'up', 'p1'], ['hs3', 'Hlavná stanica – nástupište 3', 'stop', 0, 1, 'exp', 'p1'], ['hsv', 'Hlavná stanica – vestibul', 'info', 0, 1, 'up', 'p3'],
      ['snp', 'Námestie SNP', 'stop', 1, 1, 'up', 'p13'], ['snpk', 'Námestie SNP – kiosk', 'info', 1, 1, 'up', 'p5'], ['mos', 'Mostná – dočasná zastávka', 'stop', 1, 1, 'no', 'p11'], ['rad', 'Radnica', 'info', 1, 1, 'up', 'p5'], ['div', 'Divadlo', 'stop', 1, 0, '', ''],
      ['nem', 'Nemocnica – hlavný vchod', 'stop', 4, 1, 'up', 'p13'], ['nema', 'Nemocnica – ambulancie', 'info', 4, 1, 'exp', 'p3'], ['uni', 'Univerzita – kampus', 'stop', 4, 2, 'up', 'p15'], ['unik', 'Univerzita – knižnica', 'info', 4, 0, '', ''],
      ['ocj', 'Obchodné centrum Juh', 'stop', -1, 1, 'up', 'p15'], ['asa', 'Autobusová stanica – stanovište A', 'bus', -1, 2, 'up', 'p2'], ['asb', 'Autobusová stanica – stanovište B', 'bus', -1, 1, 'no', 'p2'], ['ash', 'Autobusová stanica – hala', 'bus', -1, 1, 'up', 'p2'],
      ['pc', 'Parkovisko Centrum', 'park', 3, 1, 'up', 'p4'], ['ps', 'Parkovisko Štadión', 'park', 3, 1, 'exp', 'p8'], ['ppr', 'Parkovisko P+R Juh', 'park', 3, 0, '', ''],
      ['t1', 'Električka T1', 'tram', 2, 1, 'up', 'p6'], ['t2', 'Električka T2', 'tram', 2, 1, 'up', 'p6'], ['t3', 'Električka T3', 'tram', 2, 1, 'no', 'p6'], ['tb12', 'Trolejbus 12', 'tram', -1, 1, 'up', 'p16'], ['a31', 'Autobus 31', 'tram', -1, 1, 'up', 'p16'],
      ['let', 'Letisko – príchody', 'info', -1, 2, 'up', 'p3'], ['zs', 'Zimný štadión', 'stop', -1, 0, '', ''], ['aq', 'Aquapark', 'stop', -1, 1, 'up', 'p15'], ['cin', 'Cintorín', 'stop', -1, 0, '', ''], ['pp', 'Priemyselný park', 'stop', -1, 0, '', ''],
      ['ss', 'Sídlisko Sever', 'stop', -1, 1, 'exp', 'p13'], ['zu', 'Železničná ulica', 'stop', -1, 0, '', ''], ['hr', 'Hrádok', 'stop', -1, 0, '', ''], ['bul', 'Bulvár', 'stop', 1, 1, 'up', 'p13'], ['vlc', 'Vlčince', 'stop', -1, 1, 'up', 'p13'], ['zst', 'Železničná stanica', 'stop', -1, 1, 'up', 'p13'], ['letz', 'Letisko – zastávka', 'stop', -1, 1, 'up', 'p15']
    ].map((a, i) => ({ id: a[0], name: a[1], dev: TOT[a[0]] ? 'totem' : P31[a[0]] ? 'p31' : PDEV[a[2]], g: a[3], n: a[4], st: a[5], pl: TOT[a[0]] ? 'p14' : a[6], on: !OFF[a[0]], off: OFF[a[0]] || '', seen: OFF[a[0]] ? '' : 'pred ' + (1 + i % 3) + ' min', temp: null }));
    const apvs = [
      { id: 'a1', plId: 'p5', name: 'Kultúra – november', author: 'Kultúrne centrum Riečany', when: 'pred 2 h', own: false, state: 'pending', note: '', changes: [['mod', 'Upravený text snímky „Divadlo – program“ (začiatok o 19:00)'], ['del', 'Snímka „Festival – plagát“ odstránená z playlistu']], valid: 'Platnosť: ihneď po schválení, do 30. 11.' },
      { id: 'a2', plId: 'p12', name: 'Nová linka 25', author: 'Letisko Riečany', when: 'pred 5 h', own: false, state: 'pending', note: '', changes: [['add', 'Pridaná snímka „Nová linka 25“'], ['add', 'Pridaná snímka „Najbližšie odchody“ (linka 25)'], ['add', 'Pridaná snímka „Mapa linky“']], valid: 'Platnosť: od 1. 12. 2026' },
      { id: 'a3', plId: 'p15', name: 'Zastávky MHD – zima', author: 'Mesto Riečany', acc: 'partner', when: 'včera 16:10', own: false, state: 'pending', note: '', changes: [['mod', 'Upravená sekcia „Pätička“ v snímke „Zastávka – odchody“']], valid: 'Platnosť: ihneď po schválení' },
      { id: 'a4', plId: 'p9', name: 'Halloween v meste', author: 'Mesto Riečany', acc: 'partner', when: '29. 10.', own: false, state: 'approved', note: 'Vyzerá dobre, schvaľujem.', changes: [['add', 'Pridaná snímka „Halloween v meste“ (halloween.png)']], valid: 'Platnosť: 29. 10. – 1. 11.', doneT: 'Schválil Miroslav Heglas · 29. 10. Playlist bol nahratý na 1 miesto.' },
      { id: 'a5', plId: 'p11', name: 'Dočasná zastávka Mostná', author: 'Mesto Riečany', acc: 'partner', when: '27. 10.', own: false, state: 'returned', note: 'Doplňte vzdialenosť k novej zastávke.', changes: [['add', 'Pridaný text „Zastávka je presunutá“']], valid: 'Platnosť: od 28. 10.', doneT: 'Vrátil na úpravu Miroslav Heglas · 27. 10.' }
    ];
    const qa = [{ id: 'q1', text: 'Linka 5 je dnes odklonená cez Bulvár.', prio: 'warn', pos: 'top', dur: 'day', all: true, ids: [], by: 'Jana Kováčová', byRole: 'Director', sentT: 'Dnes 6:40' }];
    const qh = [
      { id: 'h1', text: 'Nemocnica: hlavný vchod je uzavretý, použite vchod B.', prio: 'info', pos: 'bottom', dur: 'h1', all: false, ids: ['nem', 'nema', 'uni'], when: 'Včera 14:20', by: 'Miroslav Heglas', byRole: 'Admin', sentT: 'Včera 14:20', endKind: 'exp', endT: 'Včera 15:20' },
      { id: 'h2', text: 'Električky T1 a T2 nepremávajú, nahrádza ich autobus.', prio: 'warn', pos: 'top', dur: 'day', all: false, ids: ['t1', 't2', 't3'], when: DOWAGO(3) + ' 7:05', by: 'Jana Kováčová', byRole: 'Director', sentT: DOWAGO(3) + ' 7:05', endKind: 'cancel', endT: DOWAGO(3) + ' 16:40', endBy: 'Miroslav Heglas' },
      { id: 'h3', text: 'Dnes bezplatná doprava pre deti do 15 rokov.', prio: 'info', pos: 'bottom', dur: 'day', all: true, ids: [], when: DOWAGO(3) + ' 6:30', by: 'Miroslav Heglas', byRole: 'Admin', sentT: DOWAGO(3) + ' 6:30', endKind: 'exp', endT: DOWAGO(3) + ' 23:59' }
    ];
    // stav doručenia: komu (miesta) a kedy; stav po miestach sa počíta z toho, či je zariadenie online
    const dlv = [{ id: 'd1', kind: 'msg', ref: 'q1', name: qa[0].text, at: Date.now() - 4 * 3600000, tT: 'Dnes 6:40', by: 'Jana Kováčová', pcs: places.filter((p) => p.n > 0).map((p) => p.id) }, { id: 'd0', kind: 'pl', ref: 'p13', name: 'Zastávky – odchody a oznamy', at: Date.now() - 12 * 3600000, tT: 'Včera 22:30', by: 'Miroslav Heglas', pcs: ['nem', 'ss', 'bul'] }];
    // záznam aktivít (len Admin a Director): typ, čo sa stalo, čoho sa to týka, kto, rola, kedy, rozsah
    const A = (k, t, name, by, role, when, extra) => ({ id: 'l' + this.nid(), k, t, name, by, role, when, extra: extra || '' });
    const acts = [
      A('msg', 'Odoslaná rýchla správa', qa[0].text, 'Jana Kováčová', 'Director', 'Dnes 6:40', 'Všetky miesta'),
      A('pl', 'Zverejnený playlist', 'Hlavná stanica – odchody', 'Peter Novák', 'Worker', 'Dnes 6:12', '3 miesta'),
      A('apv', 'Odoslané na schválenie', 'Zastávky MHD – zima', 'Mesto Riečany', 'Partner', 'Včera 16:10', ''),
      A('sw', 'Prepnutý playlist', 'Cestovný poriadok – zima', 'Peter Novák', 'Worker', 'Včera 15:02', '1 miesto'),
      A('msg', 'Odoslaná rýchla správa', qh[0].text, 'Miroslav Heglas', 'Admin', 'Včera 14:20', '3 miesta'),
      A('msg', 'Zrušená rýchla správa', qh[1].text, 'Miroslav Heglas', 'Admin', DOWAGO(3) + ' 16:40', ''),
      A('msg', 'Odoslaná rýchla správa', qh[1].text, 'Jana Kováčová', 'Director', DOWAGO(3) + ' 7:05', '3 miesta'),
      A('apv', 'Schválené zmeny', 'Halloween v meste', 'Miroslav Heglas', 'Admin', '29. 10.', ''),
      A('apv', 'Vrátené na úpravu', 'Dočasná zastávka Mostná', 'Miroslav Heglas', 'Admin', '27. 10.', '')
    ];
    this.state = {
      screen: 'home', stack: [], pls, libX, libQ: '', gal, places, apvs, qa, qh, dlv, dlId: 'd1', acts, actF: 'all', pdId: 'hsv', pcCol: {}, qEditId: null, qUser: [], toastDl: null,
      netSim: false, netReal: (() => { try { return navigator.onLine !== false; } catch (e) { return true; } })(), netAt: '', q: '', filt: 'all', plId: 'p2', slId: null, reorder: false, confirm: '',
      apvTab: 'pending', adId: 'a1', apvNote: '', galF: 'all', galId: null, pq: '', pcF: 'all', sheet: null, addMode: 'slide', pickMode: 'add', gplFile: null,
      sw: { step: 'pl', from: 'pl', places: [], pl: 'p2', dur: 'today' }, quick: QDEF(), qStep: 'main', qSearch: '', qTplAll: false,
      snap: {}, qdId: 'h2', pvPl: 'p2', pvI: 0, pvT: 0, pvE: 0, pvPlay: true, notif: { n1: true, n5: true, n2: true, n3: true, n4: false }, aiOn: { a1: true, a2: true }, aiChat: [], aiQ: '', aiTyping: false, edSec: 0, toast: '', push: null,
      role: (p && MACC[p.role]) ? p.role : 'admin',
      theme: (p && p.theme) || (() => { try { return localStorage.getItem('wz_m_theme') || 'light'; } catch (e) { return 'light'; } })(),
      fdark: false, samsung: (() => { try { return /SamsungBrowser/i.test(navigator.userAgent || ''); } catch (e) { return false; } })(), fdOk: (() => { try { return localStorage.getItem('wz_m_fdark_ok') === '1'; } catch (e) { return false; } })()
    };
    const st = this.state;
    const P = (pid) => pls.find((x) => x.id === pid);
    const start = (p && p.start) || 'home';
    const S = {
      home: {}, totem: { screen: 'pl', plId: 'p14', stack: ['pls'] }, totempreview: { screen: 'pv', pvPl: 'p14', stack: ['pls', 'pl'] }, playlists: { screen: 'pls' }, playlist: { screen: 'pl', plId: 'p2', stack: ['pls'] }, ledplaylist: { screen: 'pl', plId: 'p1', stack: ['pls'] },
      slide: { screen: 'sl', plId: 'p2', slId: P('p2').slides[2].id, stack: ['pls', 'pl'] }, tplslide: { screen: 'sl', plId: 'p3', slId: P('p3').slides[2].id, stack: ['pls', 'pl'], edSec: 1 }, tplplaylist: { screen: 'pl', plId: 'p13', stack: ['pls'] }, vzpol: { screen: 'sl', plId: 'p11', slId: P('p11').slides[0].id, stack: ['pls', 'pl'], edSec: 1 }, vzodch: { screen: 'sl', plId: 'p13', slId: P('p13').slides[0].id, stack: ['pls', 'pl'], edSec: 0 }, vzpas: { screen: 'sl', plId: 'p2', slId: P('p2').slides[3].id, stack: ['pls', 'pl'], edSec: 1 }, vz22: { screen: 'sl', plId: 'p4', slId: P('p4').slides[3].id, stack: ['pls', 'pl'], edSec: 1 }, led: { screen: 'sl', plId: 'p1', slId: P('p1').slides[1].id, stack: ['pls', 'pl'] },
      addphoto: { screen: 'pl', plId: 'p2', stack: ['pls'], sheet: 'add' }, lib: { screen: 'pl', plId: 'p2', stack: ['pls'], sheet: 'lib' }, quick: { sheet: 'quick' }, quickplaces: { sheet: 'quick', qStep: 'places', quick: Object.assign({}, st.quick, { all: false, ids: ['snp', 'snpk', 'mos', 'rad', 'bul'] }) },
      switch: { screen: 'plc', sheet: 'sw', sw: { step: 'dur', from: 'pl', dev: 'portrait', places: ['hsv'], pl: 'p10', cur: 'p3', dur: 'custom' } },
      approvals: { screen: 'apv', stack: ['more'] }, approval: { screen: 'ad', adId: 'a1', stack: ['more', 'apv'] }, preview: { screen: 'pv', pvPl: 'p2', stack: ['pls', 'pl'] }, gallery: { screen: 'gal', stack: ['more'] },
      places: { screen: 'plc' }, settings: { screen: 'set', stack: ['more'] }, history: { screen: 'hist', stack: ['more'] }, msgdetail: { screen: 'hist', stack: ['more'], sheet: 'qd', qdId: 'h2' }, place: { screen: 'pd', pdId: 'hsv', stack: ['plc'] }, placeoff: { screen: 'pd', pdId: 'nem', stack: ['plc'] }, delivery: { sheet: 'dl', dlId: 'd1' }, activity: { screen: 'act', stack: ['more'] }, offline: { netSim: true, netAt: HM() },
      msgedit: { sheet: 'quick', qEditId: 'q1', quick: Object.assign(QDEF(), { text: qa[0].text, prio: 'warn', pos: 'top', dur: 'keep', all: true, ids: [], cEd: 't' }) },
      quicktpl: { sheet: 'quick', quick: Object.assign(QDEF(), { text: 'Linka 14 mešká približne 15 minút. Ďakujeme za trpezlivosť.', prio: 'warn', pos: 'bottom', dur: 'h1', all: false, ids: ['snp', 'snpk', 'rad', 'bul', 'hs1'], tpl: 't0', tL: '14', tM: 15 }) },
      more: { screen: 'more' }, lang: { screen: 'more', sheet: 'lang' }, accounts: { screen: 'more', sheet: 'acc' }, ai: { screen: 'ai', aiChat: [{ id: 1, who: 'me', text: 'Napíš správu o odklone', chip: true }, { id: 2, who: 'ai', kind: 'draft', sit: 'detour' }, { id: 3, who: 'me', text: 'Ktoré miesta majú hlásenie?', chip: true }, { id: 4, who: 'ai', kind: 'prob' }] }
    };
    Object.assign(st, S[start] || {});
    if (start === 'quickplaces') { const wd = st.places.filter((p) => p.n > 0); const sel = st.quick.ids; st.qOrd = wd.filter((p) => sel.indexOf(p.id) >= 0).concat(wd.filter((p) => sel.indexOf(p.id) < 0)).map((p) => p.id); }
  }
  componentDidMount() { this._tm = setInterval(() => this.tick(), 1000); try { this._mq = window.matchMedia('(prefers-color-scheme: dark)'); this._mqf = () => { if (this.state.theme === 'auto') this.forceUpdate(); }; if (this._mq.addEventListener) this._mq.addEventListener('change', this._mqf); } catch (e) {} try { if (window.WZ_LANG) { this._unL = window.WZ_LANG.on(() => this.forceUpdate()); const fl = this.props && this.props.lang; if (fl) window.WZ_LANG.force(fl); } } catch (e) {} try { this._on = () => { const was = this.state.netReal === false; this.setState({ netReal: true }); if (was && !this.state.netSim) this.flash('Pripojenie je späť. Môžete pokračovať.'); }; this._off = () => this.setState({ netReal: false, netAt: HM() }); window.addEventListener('online', this._on); window.addEventListener('offline', this._off); } catch (e) {} this.detectForcedDark(); if (this.state.sheet === 'sw' && this.state.sw && this.state.sw.dur === 'custom') { this.whSync(); this._twb = setTimeout(() => this.whSync(), 500); } }
  detectForcedDark() {
    const hit = () => this.setState({ fdark: true });
    try {
      if (localStorage.getItem('wz_m_fdark_test') === '1') { hit(); return; }
      if (!/SamsungBrowser/i.test(navigator.userAgent || '')) return;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return;
      const img = new Image();
      img.onload = () => { try { const c = document.createElement('canvas'); c.width = 1; c.height = 1; const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, 1, 1).data; if ((d[0] & d[1] & d[2]) < 255) hit(); } catch (e) {} };
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
    } catch (e) {}
  }
  componentWillUnmount() { try { if (this._unL) this._unL(); if (this._mq && this._mq.removeEventListener) this._mq.removeEventListener('change', this._mqf); } catch (e) {} try { window.removeEventListener('online', this._on); window.removeEventListener('offline', this._off); } catch (e) {} clearInterval(this._td); clearInterval(this._tm); clearTimeout(this._tt); clearTimeout(this._tp); clearTimeout(this._tp2); clearTimeout(this._ta); clearTimeout(this._tai); clearTimeout(this._tc); clearTimeout(this._twa); clearTimeout(this._twb); if (this._tw) Object.keys(this._tw).forEach((k) => clearTimeout(this._tw[k])); }
  flash(m) { this.setState({ toast: m, toastDl: null, toastBad: false }); clearTimeout(this._tt); this._tt = setTimeout(() => this.setState({ toast: '', toastDl: null }), 3800); }
  // priebeh doručenia sa prekresľuje, kým sa odosiela (pár sekúnd po akcii)
  dlvTick() { if (this._td) return; this._td = setInterval(() => { const live = (this.state.dlv || []).some((d) => Date.now() - d.at < 8000); if (!live) { clearInterval(this._td); this._td = null; } this.forceUpdate(); }, 500); }
  // vlastný čas prepnutia: predvolený začiatok (najbližšia štvrťhodina) a koniec o 2 hodiny
  // now = true: začiatok je teraz (zaokrúhlený nadol na 5 minút) – rýchla správa sa má zobraziť hneď
  cDef(now) { const p2 = (n) => String(n).padStart(2, '0'); const iD = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); const iT = (d) => p2(d.getHours()) + ':' + p2(d.getMinutes()); const a = new Date(); a.setSeconds(0, 0); if (now) a.setMinutes(Math.floor(a.getMinutes() / 5) * 5); else a.setMinutes(Math.ceil((a.getMinutes() + 1) / 15) * 15); const b = new Date(a.getTime() + 2 * 3600000); return { cFd: iD(a), cFt: iT(a), cTd: iD(b), cTt: iT(b) }; }
  // kolieska dátumu a času: poloha podľa zvolenej hodnoty (deň od dneška, hodina, minúty po 5)
  whIdx(w0) { const b = w0 && w0.cFd ? w0 : Object.assign({}, w0 || {}, this.cDef()); const ed = b.cEd === 't' ? 't' : 'f'; const ds = ed === 'f' ? b.cFd : b.cTd; const t = (ed === 'f' ? b.cFt : b.cTt) || '00:00'; const d0 = new Date(); d0.setHours(0, 0, 0, 0); const dd = new Date(ds + 'T00:00'); return { d: Math.max(0, Math.min(60, Math.round((dd - d0) / 864e5) || 0)), h: Math.max(0, Math.min(23, parseInt(t.slice(0, 2), 10) || 0)), m: Math.max(0, Math.min(11, Math.round((parseInt(t.slice(3, 5), 10) || 0) / 5))) }; }
  whSync(smooth) { clearTimeout(this._twa); this._twa = setTimeout(() => { try { const ix = this.whIdx(this.state.sheet === 'quick' ? this.state.quick : this.state.sw); document.querySelectorAll('.sheet .whc').forEach((el) => { const top = (ix[el.getAttribute('data-k')] || 0) * 44; if (Math.abs(el.scrollTop - top) > 1) { if (smooth && el.scrollTo) el.scrollTo({ top, behavior: 'smooth' }); else el.scrollTop = top; } }); } catch (e) {} }, 40); }
  // kolieska sa po každom novom vykreslení (otvorenie panela, návrat z iného kroku) nastavia na zvolenú hodnotu
  componentDidUpdate() { try { const els = document.querySelectorAll('.sheet .whc'); if (els.length && !els[0].__wzAl) { els.forEach((e) => { e.__wzAl = 1; }); this.whSync(false); } } catch (e) {} }
  tick() {
    this.setState((st) => {
      if (st.screen !== 'pv' || !st.pvPlay) return null;
      const pl = st.pls.find((p) => p.id === st.pvPl);
      const sl = pl ? pl.slides : [];
      if (!sl.length) return null;
      let i = Math.min(st.pvI, sl.length - 1), t = st.pvT + 1;
      if (t >= sl[i].dur) { i = (i + 1) % sl.length; t = 0; }
      return { pvT: t, pvI: i, pvE: (st.pvE || 0) + 1 };
    });
  }
