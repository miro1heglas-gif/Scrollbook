  renderVals() {
    const s = this.state;
    const self = this;
    const set = (o) => self.setState(o);
    const WL = window.WZ_LANG || null;
    // texty, ktoré aplikácia sama vytvára ako obsah (názov novej snímky, návrh správy), vznikajú v jazyku rozhrania
    const Tx = (t) => WL ? WL.t(t) : t;
    // hlásenie po odoslaní ukazuje aj priebeh doručenia (dl = id doručenia) – vtedy ostáva dlhšie; ťuknutia neblokuje
    const say = (m, dl, bad) => { set({ toast: m, toastDl: dl || null, toastBad: !!bad }); clearTimeout(self._tt); self._tt = setTimeout(() => self.setState({ toast: '', toastDl: null }), dl ? 8000 : 3800); };
    // upozornenie v telefóne po doručení playlistu na zariadenie
    const notify = (text) => {
      if (!s.notif.n5) return;
      clearTimeout(self._tp); clearTimeout(self._tp2);
      self._tp = setTimeout(() => { self.setState({ push: { title: 'Playlist je na zariadení', text } }); self._tp2 = setTimeout(() => self.setState({ push: null }), 4500); }, 2600);
    };
    const plById = (id) => s.pls.find((p) => p.id === id);
    const pl = plById(s.plId) || s.pls[0];
    const sc = s.screen;
    // šírka telefónu: náhľady na celú šírku sa jej prispôsobia (úzke aj široké telefóny)
    const VW = Math.max(300, Math.min(480, (typeof window !== 'undefined' && window.innerWidth) || 390));
    const fw = (w) => w >= 330 ? Math.round(w + (VW - 390)) : w;
    // záložka dole ostáva tam, odkiaľ sa prišlo (napr. úprava playlistu otvorená z Miest)
    const tabOf = TAB_OF[s.stack.length ? s.stack[0] : sc] || TAB_OF[sc] || 'home';
    const dur = (p) => p.slides.reduce((a, x) => a + x.dur, 0);
    const slMeta = (p) => p.slides.length + ' ' + plural(p.slides.length, ['snímka', 'snímky', 'snímok']) + ' · ' + mmss(dur(p));
    const nPlaces = (n) => n + ' ' + plural(n, ['miesto', 'miesta', 'miest']);
    const nWhere = (n) => n ? nPlaces(n) : 'nikde sa neprehráva';
    const KIND = { info: 'Text', photo: 'Fotka', deps: 'Odchody', led: 'Text', clock: 'Čas a dátum', tpl: 'Sekcie podľa vzoru' };
    const kindT = (x) => x.kind === 'photo' && x.isVid ? 'Video' : KIND[x.kind];
    // snímka podľa vzoru: sekcie s polohou v % (riadky a stĺpce vzoru); SX = údaje pre komponent Slide
    const tplGeo = (x) => { const L = VZ[x.vz] || [[100, [100]]]; const out = []; let y = 0, i = 0; L.forEach((r) => { let xx = 0; r[1].forEach((w) => { const c = (x.secs || [])[i]; if (c) out.push(Object.assign({}, c, { i, x: xx, y, w, h: r[0] })); xx += w; i++; }); y += r[0]; }); return out; };
    const SX = (x) => x && x.kind === 'tpl' ? JSON.stringify({ secs: tplGeo(x).map((c) => ({ x: c.x, y: c.y, w: c.w, h: c.h, type: c.type, text: c.text || '', bg: c.bg || '', img: c.img || '', cap: c.cap || '', line: c.line || '', dir: c.dir || '', own: !!c.owner, vid: c.vid || '', url: c.url || '', rad: c.rad || '', tiles: c.tiles || '' })) }) : '';
    const placeById = (id) => s.places.find((p) => p.id === id);
    const placeName = (id) => (placeById(id) || {}).name || '';
    // prihlásený účet a jeho pridelené miesta (Worker, Partner) – zoznamy ukazujú len ich
    const ACC = MACC[s.role] || MACC.admin;
    const SCOPE = ACC.scope;
    const inScope = (p) => !SCOPE || SCOPE.indexOf(p.id) >= 0;
    const vPlaces = s.places.filter(inScope);
    const withDev = vPlaces.filter((p) => p.n > 0);
    const isOwn = (a) => !!a.acc && a.acc === s.role;
    // Partner: vlastný playlist upravuje celý, v playliste dopravcu len svoje sekcie; rýchle správy nepíše
    const plOwnBy = (p) => !!p && !!p.owner && p.owner === ACC.name;
    const secOwn = (c) => !!c.owner && c.owner === ACC.name;
    const slOwn = (x) => x.kind === 'tpl' && (x.secs || []).some(secOwn);
    const fullEd = (p) => !ACC.partner || plOwnBy(p);
    const canEditPl = (p) => !!p && (fullEd(p) || p.slides.some(slOwn));
    const canQuick = !ACC.partner;
    // históriu správ a ich detail (kto a kedy odoslal) vidí len Admin a Director
    const canHist = !!ACC.apv;
    // ---------- pripojenie, stav doručenia, záznam aktivít ----------
    // bez pripojenia sa nič neodosiela; rozpísané úpravy ostávajú v telefóne
    const offline = !!s.netSim || s.netReal === false;
    const needNet = () => { if (!offline) return false; say('Bez pripojenia. Nič sa neodoslalo – skúste to znova po obnovení signálu.', null, true); return true; };
    const onIds = (ids) => ids.filter((id) => (placeById(id) || {}).on);
    const openDl = (id) => set({ sheet: 'dl', dlId: id, toast: '', toastDl: null, confirm: '' });
    const dlvAct = (id) => id;
    const addDlv = (kind, name, pcs, ex) => { const d = Object.assign({ id: 'd' + self.nid(), kind, name, at: Date.now(), tT: 'Dnes ' + HM(), by: ACC.name, pcs: pcs.slice() }, ex || {}); self.setState((st) => ({ dlv: [d].concat((st.dlv || []).filter((x) => !(d.ref && x.ref === d.ref))).slice(0, 12) })); self.dlvTick(); return d.id; };
    const dPcs = (d) => SCOPE ? d.pcs.filter((id) => SCOPE.indexOf(id) >= 0) : d.pcs;
    // stav na jednom mieste: offline zariadenie čaká, online sa doručí do pár sekúnd (miesta postupne)
    const dSt = (d, id, i) => { if (d.from && d.from > Date.now()) return 'plan'; const p = placeById(id); if (!p || !p.on) return 'wait'; return Date.now() - d.at < 1400 + Math.min(i, 8) * 450 ? 'send' : 'ok'; };
    const DOK = { msg: 'Zobrazené', pl: 'Nahraté', sw: 'Nahraté' };
    const DKIND = { msg: 'Rýchla správa', pl: 'Playlist', sw: 'Prepnutie playlistu' };
    const DST = { ok: 'ok', send: 'blue', wait: 'warn', plan: 'grey' };
    const dStT = (d, k) => k === 'ok' ? DOK[d.kind] : k === 'send' ? 'Odosiela sa…' : k === 'wait' ? 'Čaká – offline' : 'Naplánované';
    const dSum = (d) => {
      const ids = dPcs(d); let oi = 0; const st = ids.map((id) => { const p = placeById(id); return dSt(d, id, p && p.on ? oi++ : 0); });
      const n = st.length; const c = (k) => st.filter((x) => x === k).length; const ok = c('ok'), wait = c('wait'), send = c('send'), plan = c('plan');
      const k = plan ? 'plan' : send ? 'send' : wait ? 'wait' : 'ok';
      const t = plan ? 'Naplánované na ' + nPlaces(n) : send ? 'Odosiela sa… ' + ok + ' ' + zN(n) + ' ' + n : DOK[d.kind] + ' na ' + ok + ' ' + zN(n) + ' ' + n + ' ' + (n === 1 ? 'miesta' : 'miest');
      return { ids, st, n, ok, wait, send, k, pillK: DST[k], pillT: k === 'ok' ? 'Doručené' : k === 'send' ? 'Odosiela sa' : k === 'wait' ? 'Čaká' : 'Naplánované', t, hasWait: wait > 0 && !plan, waitT: wait && !plan ? wait + ' offline – čaká na pripojenie' : '' };
    };
    const logAct = (k, t, name, extra) => { const e = { id: 'l' + self.nid(), k, t, name: name || '', extra: extra || '', by: ACC.name, role: ACC.role, when: 'Dnes ' + HM() }; self.setState((st) => ({ acts: [e].concat(st.acts || []) })); };
    const pdP = (() => { const p = placeById(s.pdId); return p && inScope(p) ? p : (vPlaces[0] || s.places[0]); })();
    const vPls = s.pls.filter((p) => !SCOPE || p.mine === s.role || plOwnBy(p) || p.where.some((id) => SCOPE.indexOf(id) >= 0) || s.apvs.some((a) => a.plId === p.id && isOwn(a)));
    const names = (ids) => ids.map(placeName);
    const shortList = (nm) => nm.length ? (nm.length > 3 ? nm.slice(0, 3).join(' · ') + ' a ' + (nm.length - 3) + ' ' + plural(nm.length - 3, ['ďalšie', 'ďalšie', 'ďalších']) : nm.join(' · ')) : '—';
    const nav = (screen, o) => set(Object.assign({ screen, stack: s.stack.concat(sc), sheet: null, reorder: false, confirm: '', apvErr: false }, o || {}));
    // poka-yoke: z editora sa nedá odísť s prázdnym názvom (snímka by v zozname ostala bez mena)
    const edCur0 = sc === 'sl' ? pl.slides.find((x) => x.id === s.slId) : null;
    const edEmpty = !!edCur0 && edCur0.kind !== 'clock' && !String(edCur0.title || '').trim();
    const edBlock = () => { if (!edEmpty) return false; say(edCur0.kind === 'led' ? 'Doplňte text snímky.' : 'Doplňte názov snímky.'); setTimeout(() => { try { const el = document.getElementById(edCur0.kind === 'led' ? 'ed-led' : 'ed-title'); if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); } } catch (e) {} }, 60); return true; };
    // potvrdenie odstránenia platí len 5 sekúnd, potom sa samo zruší
    const armConfirm = (k) => { set({ confirm: k }); clearTimeout(self._tc); self._tc = setTimeout(() => { if (self.state.confirm === k) self.setState({ confirm: '' }); }, 5000); };
    const goTab = (t) => { if (edBlock()) return; set({ screen: ROOT[t], stack: [], sheet: null, reorder: false, confirm: '' }); };
    const backState = () => s.stack.length ? { screen: s.stack[s.stack.length - 1], stack: s.stack.slice(0, -1) } : { screen: ROOT[tabOf], stack: [] };
    const goBack = () => { if (edBlock()) return; set(Object.assign({ sheet: null, reorder: false, confirm: '' }, backState())); };
    // zatvorenie úpravy správy zahodí rozpracované zmeny (nová správa si text pamätá)
    const closeSheet = () => set(Object.assign({ sheet: null, confirm: '', qStep: 'main', qSearch: '' }, s.qEditId ? { qEditId: null, quick: QDEF() } : {}));
    const pendingOthers = ACC.apv ? s.apvs.filter((a) => a.state === 'pending' && !isOwn(a)) : [];
    const ST = { nahraty: ['ok', 'Nahratý'], expirovany: ['bad', 'Expirovaný'], nenahraty: ['grey', 'Nenahratý'] };
    const FLOW = { draft: ['blue', ACC.pub ? 'Nezverejnené zmeny' : 'Neodoslané zmeny'], pending: ['warn', 'Čaká na schválenie'] };
    const ownApv = (pid) => s.apvs.find((a) => a.plId === pid && a.state === 'pending' && isOwn(a));
    const tabRoot = ['home', 'pls', 'plc', 'ai', 'more'].indexOf(sc) >= 0;
    const dark = tabRoot || sc === 'pv';
    const plLed = isLedDev(pl.dev);
    // zariadenie s viacerými displejmi: každá snímka patrí jednému displeju (x.d)
    const partsOf = (p) => PARTS[p.dev] || null;
    const partBy = (dev, d) => { const ps = PARTS[dev]; return ps ? (ps.find((q) => q[0] === d) || ps[ps.length - 1]) : null; };
    const rdev = (p, x) => { const q = partBy(p.dev, x.d); return q ? q[2] : p.dev; };
    const thW = (p, x) => { const q = partBy(p.dev, x.d); return String(q ? q[3] : DEV[p.dev][3]); };
    const stW = (p, x) => { const q = partBy(p.dev, x.d); return q ? q[4] : DEV[p.dev][4]; };
    const partName = (p, x) => { const q = partBy(p.dev, x.d); return q ? q[1] : ''; };
    const plTotem = !!partsOf(pl);
    const insertSl = (p, sl) => { const ps = partsOf(p); if (!ps || !sl.d) return p.slides.concat([sl]); const ord = (d) => ps.findIndex((q) => q[0] === d); const a = p.slides.slice(); let i = a.length; for (let k = 0; k < a.length; k++) { if (ord(a[k].d) > ord(sl.d)) { i = k; break; } } a.splice(i, 0, sl); return a; };
    const prvOf = (p, w3) => { const ps = partsOf(p); if (!ps) { const x = p.slides[0]; return x ? [Object.assign({}, x, { dev: p.dev, w: String(fw(DEV[p.dev][2])), r: '14', sx: SX(x) })] : []; } return ps.map((q) => { const x = p.slides.find((z) => z.d === q[0]); return x ? Object.assign({}, x, { dev: q[2], w: String(w3), r: '3', sx: '' }) : null; }).filter(Boolean); };
    const stackS = (p) => partsOf(p) ? 'display:flex;flex-direction:column;gap:4px;padding:6px;background:#1B2020;border-radius:10px' : '';
    // playlist nahratý na miesta, pre ktoré je určený
    const deliver = (places, p) => places.map((x) => p.where.indexOf(x.id) >= 0 ? Object.assign({}, x, { pl: p.id, st: 'up', temp: null }) : x);
    const deliveredT = (p, ids) => '„' + p.name + '“ sa už prehráva: ' + shortList(names(ids)) + '.';

    // ---------- úprava playlistu ----------
    const logSlide = (lg, sid, title) => {
      if (lg.some((x) => x[2] === 'a' + sid)) return lg.map((x) => x[2] === 'a' + sid ? [x[0], 'Pridaná snímka „' + title + '“', x[2]] : x);
      return lg.filter((x) => x[2] !== 'm' + sid).concat([['mod', 'Upravená snímka „' + title + '“', 'm' + sid]]);
    };
    const snapFor = (pid) => { const cur = s.snap || {}; const p0 = plById(pid); if (cur[pid] || !p0 || p0.flow !== 'none') return cur; return Object.assign({}, cur, { [pid]: { slides: p0.slides } }); };
    const snapDrop = (pid) => { const cur = Object.assign({}, s.snap || {}); delete cur[pid]; return cur; };
    const mutate = (pid, fn) => set({ pls: s.pls.map((p) => p.id === pid ? Object.assign({}, fn(p), { flow: 'draft' }) : p), snap: snapFor(pid) });
    const updSlide = (sid, patch) => mutate(pl.id, (p) => { const slides = p.slides.map((x) => x.id === sid ? Object.assign({}, x, patch) : x); const t = slides.find((x) => x.id === sid); return Object.assign({}, p, { slides, log: logSlide(p.log, sid, t ? t.title : '') }); });
    const newSl = (kind, title, text, durn, bg, ex) => Object.assign({ id: self.nid(), kind, title, text, dur: durn, bg, img: '', imgName: '', ledSize: 'M', ledAlign: 'left', ledCol: '', ledBg: '', d: '' }, ex || {});
    const delSlide = (sid) => {
      const t0 = pl.slides.find((x) => x.id === sid);
      const keep = t0 && t0.kind !== 'clock' && !s.pls.some((p) => p.id !== pl.id && p.dev === pl.dev && p.slides.some((x) => x.title === t0.title && (x.d || '') === (t0.d || ''))) && !s.libX.some((x) => x.dev === pl.dev && x.title === t0.title && (x.d || '') === (t0.d || ''));
      set({ pls: s.pls.map((p) => { if (p.id !== pl.id) return p; const t = p.slides.find((x) => x.id === sid); const added = p.log.some((x) => x[2] === 'a' + sid); const lg = p.log.filter((x) => x[2] !== 'a' + sid && x[2] !== 'm' + sid && String(x[2]).indexOf('c' + sid + '_') !== 0); return Object.assign({}, p, { slides: p.slides.filter((x) => x.id !== sid), flow: 'draft', log: added ? lg : lg.concat([['del', 'Snímka „' + (t ? t.title : '') + '“ odstránená z playlistu', 'd' + sid]]) }); }), libX: keep ? s.libX.concat([Object.assign({}, t0, { dev: pl.dev })]) : s.libX, snap: snapFor(pl.id) });
      say('Snímka „' + (t0 ? t0.title : '') + '“ je odstránená z playlistu. V zozname snímok ostáva.');
    };
    const moveSlide = (i, d) => mutate(pl.id, (p) => { const a = p.slides.slice(); const t = a[i]; a[i] = a[i + d]; a[i + d] = t; return Object.assign({}, p, { slides: a, log: p.log.filter((x) => x[2] !== 'o').concat([['ord', 'Zmenené poradie snímok', 'o']]) }); });
    const pushSlide = (pid, sl, logT, extra) => set(Object.assign({ pls: s.pls.map((p) => p.id === pid ? Object.assign({}, p, { slides: insertSl(p, sl), flow: 'draft', log: p.log.concat([['add', logT, 'a' + sl.id]]) }) : p), slId: sl.id, sheet: null, snap: snapFor(pid) }, extra || {}));
    const toEditor = { screen: 'sl', stack: s.stack.concat(sc), reorder: false, confirm: '' };
    const addPhotoSlide = (pid, file, galNext, goEdit) => {
      const vid = file.type === 'vid'; const vs = vid ? String(file.dur || '').split(':') : [];
      const sl = newSl('photo', file.title, '', vid && vs.length === 2 ? Math.max(5, parseInt(vs[0], 10) * 60 + parseInt(vs[1], 10)) : 10, '#1A1F1F', { img: file.col, imgName: file.name, isVid: vid });
      pushSlide(pid, sl, 'Pridaná snímka „' + file.title + '“ (' + file.name + ')', Object.assign({ gal: galNext }, goEdit ? toEditor : {}));
    };
    const bumpGal = (gal, fid, pname) => gal.map((g) => g.id === fid ? Object.assign({}, g, { used: g.used + 1, usedIn: g.usedIn.concat([pname]) }) : g);
    const NEWC = ['#7FA65A', '#6C8EAD', '#C27C4A', '#8A6CAD'];
    const makeFile = (kind) => {
      const n = s.gal.length + 1;
      if (kind === 'cam') return { id: 'g' + n + 'x', name: 'IMG_' + ((d) => d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '_' + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0'))(new Date()) + (n > 1 ? '_' + n : '') + '.jpg', title: Tx('Nová fotka'), type: 'img', size: '2,1 MB', used: 0, usedIn: [], folder: 'Z telefónu', col: NEWC[n % 4] };
      if (kind === 'ph') return { id: 'g' + n + 'x', name: 'foto-z-telefonu-' + n + '.jpg', title: Tx('Fotka z telefónu'), type: 'img', size: '1,6 MB', used: 0, usedIn: [], folder: 'Z telefónu', col: NEWC[(n + 1) % 4] };
      return { id: 'g' + n + 'x', name: 'novy-spot-' + n + '.mp4', title: Tx('Nový spot'), type: 'vid', size: '9,4 MB', dur: '0:12', used: 0, usedIn: [], folder: 'Reklamy', col: '#2F62B0' };
    };
    const sendApv = () => {
      if (needNet()) return;
      const lg = pl.log.length ? pl.log : [['mod', 'Úpravy v playliste', 'x']];
      const a = { id: 'a' + self.nid(), plId: pl.id, name: pl.name, author: ACC.name, acc: s.role, when: 'teraz', own: false, state: 'pending', note: '', changes: lg.map((x) => [x[0], x[1]]), valid: 'Platnosť: ihneď po schválení' };
      set({ apvs: [a].concat(s.apvs), pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { flow: 'pending', log: [] }) : p), reorder: false });
      logAct('apv', 'Odoslané na schválenie', pl.name);
      say('Odoslané na schválenie. Dáme vám vedieť, keď ho správca DP Riečany schváli.');
    };
    const backLog = (a) => a ? a.changes.map((c, i) => [c[0], c[1], 'w' + i]) : [];
    const withdraw = () => { if (needNet()) return; const a0 = s.apvs.find((a) => a.plId === pl.id && isOwn(a) && a.state === 'pending'); set({ apvs: s.apvs.filter((a) => a !== a0), pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { flow: 'draft', log: backLog(a0) }) : p) }); logAct('apv', 'Vzaté späť zo schvaľovania', pl.name); say('Vzaté späť. Playlist môžete znova upravovať.'); };

    // ---------- hlavička ----------
    const act = (label, d, fn, badge) => ({ label, d, fn, isIcon: true, isText: false, hasBadge: !!badge, badge: badge || '' });
    const openPrev = (pid) => set({ screen: 'pv', stack: s.stack.concat(sc), pvPl: pid, pvI: 0, pvT: 0, pvE: 0, pvPlay: true, sheet: null, reorder: false });
    let hdTitle = 'Info Designer', hdSub = 'DP Riečany', hdActs = [], hdLogo = false;
    if (sc === 'home') { hdLogo = true; hdActs = ACC.apv ? [act('Schvaľovanie – čaká ' + pendingOthers.length, IC.bell, () => nav('apv', { apvTab: 'pending' }), pendingOthers.length ? String(pendingOthers.length) : '')] : ACC.partner ? [act('Odoslané na schválenie', IC.bell, () => nav('apv', { apvTab: 'pending' }), '')] : []; }
    else if (sc === 'pls') { hdTitle = 'Playlisty'; hdSub = ''; }
    else if (sc === 'pl') { hdTitle = pl.name; hdSub = DEV[pl.dev][1]; hdActs = [act('Náhľad playlistu', IC.eye, () => openPrev(pl.id))]; }
    else if (sc === 'sl') { hdTitle = plLed ? 'Upraviť text' : 'Upraviť snímku'; hdSub = pl.name; hdActs = [{ label: 'Hotovo', d: '', fn: goBack, isIcon: false, isText: true, hasBadge: false, badge: '' }]; }
    else if (sc === 'apv') { hdTitle = ACC.apv ? 'Schvaľovanie' : 'Odoslané na schválenie'; hdSub = ''; }
    else if (sc === 'ad') { hdTitle = 'Schválenie zmien'; hdSub = ''; }
    else if (sc === 'gal') { hdTitle = 'Galéria'; hdSub = ''; }
    else if (sc === 'more') { hdTitle = 'Viac'; hdSub = ''; }
    else if (sc === 'plc') { hdTitle = 'Miesta'; hdSub = ''; }
    else if (sc === 'set') { hdTitle = 'Nastavenia'; hdSub = ''; }
    else if (sc === 'hist') { hdTitle = 'História správ'; hdSub = ''; }
    else if (sc === 'act') { hdTitle = 'Záznam aktivít'; hdSub = ''; }
    else if (sc === 'pd') { hdTitle = pdP.name; hdSub = pdP.n ? DEV[pdP.dev][1] + (pdP.g >= 0 ? ' · ' + GRP[pdP.g] : '') : 'Bez zariadenia'; }
    else if (sc === 'ai') { hdTitle = 'AI asistent'; hdSub = ''; hdActs = s.aiChat.length ? [act('Nová konverzácia', IC.plus, () => { clearTimeout(self._tai); set({ aiChat: [], aiQ: '', aiTyping: false }); })] : []; }
    else if (sc === 'pv') { hdTitle = 'Náhľad'; hdSub = (plById(s.pvPl) || pl).name; }

    // ---------- rýchle správy: kam ----------
    const devIds = withDev.map((p) => p.id);
    const grpIds = (g) => withDev.filter((p) => p.g === g).map((p) => p.id);
    const sameSet = (a, b) => a.length === b.length && a.every((x) => b.indexOf(x) >= 0);
    const tgtN = (m) => m.all ? devIds.length : m.ids.length;
    const tgtLabel = (m) => {
      if (m.all) return 'Všetky miesta';
      for (let g = 0; g < GRP.length; g++) if (sameSet(m.ids, grpIds(g))) return GRP[g];
      return m.ids.length === 1 ? placeName(m.ids[0]) : nPlaces(m.ids.length);
    };
    const PRIO = { warn: ['Výstraha', 'warn'], info: ['Oznam', 'blue'] };
    const POS = { top: 'horný pás', bottom: 'dolný pás', full: 'celá obrazovka' };

    // ---------- DOMOV ----------
    // účet s pridelenými miestami vidí len správy, ktoré sa zobrazujú na jeho miestach; zrušiť ich môže na svojich miestach
    const allDev = s.places.filter((p) => p.n > 0).map((p) => p.id);
    const mIds = (m) => m.all ? allDev : m.ids;
    const mMine = (m) => mIds(m).filter((id) => !SCOPE || SCOPE.indexOf(id) >= 0);
    const endNow = () => ({ when: 'Dnes ' + HM() + ' · zrušená', endKind: 'cancel', endT: 'Dnes ' + HM(), endBy: ACC.name });
    const cancelMsg = (m) => {
      if (needNet()) return;
      const plan = !!m.from && m.from > Date.now(); const mine = mMine(m); const whole = !SCOPE || m.acc === s.role || mine.length === mIds(m).length;
      if (whole) { set({ qa: s.qa.filter((x) => x.id !== m.id), qh: [Object.assign({}, m, endNow())].concat(s.qh), dlv: (s.dlv || []).filter((d) => d.ref !== m.id) }); logAct('msg', plan ? 'Zrušená naplánovaná správa' : 'Zrušená rýchla správa', m.text); say(plan ? 'Naplánovaná správa je zrušená.' : 'Správa je zrušená a z displejov zmizne do pár sekúnd.'); return; }
      // správa ide aj na cudzie miesta: zruší sa len na miestach účtu, inde ostáva
      set({ qa: s.qa.map((x) => x.id === m.id ? Object.assign({}, x, { all: false, ids: mIds(m).filter((id) => mine.indexOf(id) < 0) }) : x), qh: [Object.assign({}, m, endNow(), { id: 'q' + self.nid(), all: false, ids: mine })].concat(s.qh) });
      logAct('msg', 'Zrušená rýchla správa', m.text, nPlaces(mine.length));
      say('Správa je zrušená na vašich miestach (' + mine.length + '). Na ostatných miestach ostáva.');
    };
    // upraviť (text, čas, miesta) môže ten, kto by správu mohol zrušiť celú: Admin, Director, autor alebo účet, ktorému patria všetky jej miesta
    const canEditMsg = (m) => canQuick && (!SCOPE || m.acc === s.role || mMine(m).length === mIds(m).length);
    const qaRow = (m) => { const d = (s.dlv || []).find((x) => x.ref === m.id); const ds = d ? dSum(d) : null; return {
      k: PRIO[m.prio][1], prioT: PRIO[m.prio][0], text: m.text, meta: POS[m.pos] + ' · ' + (m.until || DURS[m.dur][1]) + ' · ' + tgtLabel(m), plan: !!m.from && m.from > Date.now(),
      canCancel: !!ACC.pub, cancelA: 'Zrušiť správu: ' + m.text, cancel: () => cancelMsg(m), canEdit: canEditMsg(m), editA: 'Upraviť správu: ' + m.text, edit: () => editMsg(m), hasActs: !!ACC.pub || canEditMsg(m),
      hasDl: !!ds, dlT: ds ? ds.t : '', dlHasWait: !!ds && ds.hasWait, dlWaitT: ds ? ds.waitT : '', dlA: 'Stav doručenia: ' + m.text, dlOpen: () => { if (d) openDl(d.id); }
    }; };
    const qaRows = s.qa.filter((m) => !SCOPE || mMine(m).length > 0).map(qaRow);
    const openQuick = () => { if (canQuick) set(Object.assign({ sheet: 'quick', qStep: 'main', qSearch: '', qTplAll: false, confirm: '' }, s.qEditId ? { qEditId: null, quick: QDEF() } : {})); };
    const effPl = (pc) => plById(pc.temp ? pc.temp.pl : pc.pl);
    // úprava playlistu, ktorý sa práve prehráva na mieste
    const editAtPlace = (pid) => { const pc = placeById(pid); const ep = effPl(pc); if (!ep) return; nav('pl', { plId: ep.id }); if (ep.where.length > 1 && canEditPl(ep)) say('Zmeny sa prejavia na všetkých ' + ep.where.length + ' miestach, kde sa playlist prehráva.'); };
    const plBtn = (ep) => ({ canEdit: !!ep, editT: ep && !canEditPl(ep) ? 'Zobraziť playlist' : 'Upraviť playlist', editA: (ep && !canEditPl(ep) ? 'Zobraziť playlist: ' : 'Upraviť playlist: ') + (ep ? ep.name : ''), editK: ep && !canEditPl(ep) ? '' : 'p2' });
    const swForPlace = (pid) => { const pc = placeById(pid); const ep = effPl(pc); set({ sheet: 'sw', sw: { step: 'pl', from: 'pl', dev: pc.dev, places: [pid], pl: '', cur: ep ? ep.id : '', dur: 'today' } }); };
    const swForPl = (plid) => set({ sheet: 'sw', sw: { step: 'pc', from: 'pc', dev: (plById(plid) || {}).dev, places: [], pl: plid, dur: 'today' } });
    const ledLook = (d) => isLedDev(d) || !!PARTS[d];
    const tile = (p) => { const f = p && p.slides[0]; return ledLook(p ? p.dev : '') ? '#050505' : GRAD(f ? (f.kind === 'photo' ? f.img : f.bg) : '#C9D2D2'); };
    const nowIds = SCOPE ? withDev.filter((p, i, arr) => { const e = effPl(p); return e && arr.findIndex((q) => (effPl(q) || {}).id === e.id) === i; }).slice(0, 4).map((p) => p.id) : ['hsv', 'snp', 'asa', 't1'];
    const nowRows = nowIds.map((id) => { const pc = placeById(id); const ep = effPl(pc); return Object.assign({ thS: 'width:48px;height:48px;border-radius:10px;flex:none;background:' + tile(ep), place: pc.name, plName: ep ? ep.name : '—', temp: !!pc.temp, until: pc.temp ? pc.temp.until : '', change: () => swForPlace(id), canSw: ACC.pub, changeA: 'Prepnúť playlist na mieste: ' + pc.name, edit: () => editAtPlace(id), open: () => nav('pd', { pdId: id }), openA: 'Detail miesta: ' + pc.name }, plBtn(ep)); });
    const pcOnN = withDev.filter((p) => p.on).length;
    const expN = withDev.filter((p) => p.st === 'exp').length;
    const qhRows = s.qh.map((h) => ({ open: () => set({ sheet: 'qd', qdId: h.id }), openA: 'Detail správy: ' + h.text, againA: 'Poslať znova: ' + h.text, text: h.text, meta: h.when + ' · ' + tgtLabel(h) + ' · ' + PRIO[h.prio][0], again: () => set({ sheet: 'quick', qStep: 'main', qSearch: '', qEditId: null, quick: Object.assign(QDEF(), { text: h.text, prio: h.prio, pos: h.pos, dur: h.dur === 'custom' ? 'day' : h.dur, all: h.all, ids: h.ids.slice() }) }) }));

    // ---------- PLAYLISTY ----------
    const cnt = (k) => vPls.filter((p) => p.st === k).length;
    const isSoon = (p) => !!p.soon && p.st === 'nahraty';
    const soonT = (p) => 'Expiruje o ' + p.soon + ' ' + plural(p.soon, ['deň', 'dni', 'dní']);
    const soonPls = vPls.filter(isSoon);
    const filt = s.filt === 'soon' && !soonPls.length ? 'all' : s.filt;
    const plChips = [['all', 'Všetky', vPls.length], ['nahraty', 'Nahraté', cnt('nahraty')], ['expirovany', 'Expirované', cnt('expirovany')], ['nenahraty', 'Nenahraté', cnt('nenahraty')]].concat(soonPls.length ? [['soon', 'Čoskoro expirujú', soonPls.length]] : []).map((c) => ({ label: c[1], n: c[2], on: filt === c[0], pick: () => set({ filt: c[0] }) }));
    const ql = s.q.trim().toLowerCase();
    const plList = vPls.filter((p) => (filt === 'all' || (filt === 'soon' ? isSoon(p) : p.st === filt)) && (!ql || p.name.toLowerCase().indexOf(ql) >= 0));
    const plRows = plList.map((p) => ({
      open: () => nav('pl', { plId: p.id }), prev: () => openPrev(p.id), canEd: canEditPl(p), editA: 'Upraviť playlist: ' + p.name, openA: (canEditPl(p) ? 'Upraviť playlist: ' : 'Zobraziť playlist: ') + p.name, mineOwn: plOwnBy(p), hasOwner: !!p.owner && !plOwnBy(p), ownerT: 'Tretia strana: ' + (p.owner || ''), prevA: 'Náhľad playlistu: ' + p.name, thS: 'width:52px;height:52px;border-radius:12px;flex:none;font-weight:700;font-size:17px;display:flex;align-items:center;justify-content:center;color:' + (ledLook(p.dev) ? '#FFB000' : '#fff') + ';background:' + tile(p), nSl: String(p.slides.length),
      name: p.name, devT: DEV[p.dev][1], meta: slMeta(p) + ' · ' + nWhere(p.where.length), stK: ST[p.st][0], stT: ST[p.st][1], soon: isSoon(p), soonT: isSoon(p) ? soonT(p) : '', touch: p.touch, hasFlow: p.flow !== 'none', flowK: (FLOW[p.flow] || ['', ''])[0], flowT: (FLOW[p.flow] || ['', ''])[1]
    }));

    // ---------- DETAIL PLAYLISTU ----------
    const locked = pl.flow === 'pending';
    const mineApv = ownApv(pl.id);
    const otherApv = s.apvs.find((a) => a.plId === pl.id && a.state === 'pending' && !isOwn(a));
    const canEdit = !locked;
    const plFull = fullEd(pl);
    const slCanEd = (x) => plFull || slOwn(x);
    // odstrániť sa dá len snímka, po ktorej na displeji ešte niečo ostane (čas a dátum označníka nikdy)
    const canDel = (x) => !!x && x.kind !== 'clock' && pl.slides.filter((y) => (y.d || '') === (x.d || '')).length > 1;
    const inOrd = s.reorder && canEdit && plFull;
    const slRows = pl.slides.map((x, i) => ({
      open: () => locked || !slCanEd(x) ? openPrev(pl.id) : nav('sl', { slId: x.id, edSec: plFull ? 0 : Math.max(0, (x.secs || []).findIndex(secOwn)) }), aria: (locked || !slCanEd(x) ? 'Náhľad: ' : 'Upraviť: ') + x.title, mine: !plFull && slOwn(x), num: String(i + 1), showTh: !inOrd, showNum: inOrd, sx: SX(x), dev: rdev(pl, x), w: thW(pl, x), kind: x.kind, title: x.title, text: x.text, bg: x.bg, img: x.img, ledSize: x.ledSize, ledAlign: x.ledAlign, ledCol: x.ledCol, ledBg: x.ledBg,
      meta: (plTotem ? partName(pl, x) + ' · ' : '') + kindT(x) + (x.kind === 'clock' ? '' : ' · ' + x.dur + ' s') + (x.kind !== 'tpl' ? '' : ACC.partner ? (slOwn(x) ? ((x.secs || []).filter(secOwn).length > 1 ? ' · vaše sekcie: ' : ' · vaša sekcia: ') + (x.secs || []).filter(secOwn).map((c) => c.name).join(', ') : '') : (x.secs || []).some((c) => c.owner) ? ' · tretia strana: ' + (x.secs || []).filter((c) => c.owner).map((c) => c.owner).filter((v, k, a) => a.indexOf(v) === k).join(', ') : ''), showMove: inOrd && s.confirm !== 'd' + x.id, showCf: inOrd && s.confirm === 'd' + x.id, cfDo: () => { clearTimeout(self._tc); set({ confirm: '' }); delSlide(x.id); }, cfA: 'Potvrdiť odstránenie z playlistu: ' + x.title, delOff: !canDel(x), up: () => moveSlide(i, -1), upOff: i === 0 || (pl.slides[i - 1].d || '') !== (x.d || ''), down: () => moveSlide(i, 1), downOff: i === pl.slides.length - 1 || (pl.slides[i + 1].d || '') !== (x.d || ''),
      delLbl: canDel(x) ? 'Odstrániť z playlistu: ' + x.title : 'Jediná snímka sa nedá odstrániť', del: () => { if (canDel(x)) armConfirm('d' + x.id); },
      showChev: !inOrd
    }));
    const BLANK = { id: 0, kind: 'info', title: '', text: '', dur: 10, bg: '#0E8080', img: '', imgName: '', ledSize: 'M', ledAlign: 'left', ledCol: '', ledBg: '', d: '' };
    const curSl = pl.slides[0] || BLANK;
    const upload = (p, toastT) => { if (needNet()) return; set({ pls: s.pls.map((x) => x.id === p.id ? Object.assign({}, x, { st: 'nahraty' }) : x), places: deliver(s.places, p) }); const did = addDlv('pl', p.name, p.where, { ref: p.id }); logAct('pl', 'Nahratý playlist na zariadenia', p.name, nPlaces(p.where.length)); say(toastT, dlvAct(did)); if (onIds(p.where).length) notify(deliveredT(p, onIds(p.where))); };
    const publishNow = () => {
      if (needNet()) return;
      const n = pl.where.length;
      set({ pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, n ? { flow: 'none', st: 'nahraty', log: [] } : { flow: 'none', log: [] }) : p), places: n ? deliver(s.places, pl) : s.places, reorder: false, snap: snapDrop(pl.id) });
      const did = n ? addDlv('pl', pl.name, pl.where, { ref: pl.id }) : '';
      logAct('pl', 'Zverejnený playlist', pl.name, n ? nPlaces(n) : '');
      say(n ? 'Zverejnené. Playlist sa nahráva na ' + nPlaces(n) + '.' : 'Zverejnené. Ťuknite na „Prehrať na mieste“ a vyberte miesta.', n ? dlvAct(did) : null);
      if (n && onIds(pl.where).length) notify(deliveredT(pl, onIds(pl.where)));
    };
    // zahodenie všetkých neodoslaných zmien naraz (druhým ťuknutím)
    const plSnap = (s.snap || {})[pl.id];
    const canDiscard = pl.flow === 'draft' && !!plSnap;
    const discard = () => { if (!canDiscard) return; if (s.confirm !== 'dz') { armConfirm('dz'); return; } clearTimeout(self._tc); set({ pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { slides: plSnap.slides, flow: 'none', log: [] }) : p), snap: snapDrop(pl.id), reorder: false, confirm: '' }); say('Zmeny sú zahodené. Playlist je taký ako pred úpravami.'); };
    const extend = () => { if (needNet()) return; set({ pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { st: 'nahraty', soon: 0, plan: 'Po–Pi 6:00–22:00 · do 31. 12.' }) : p) }); logAct('pl', 'Predĺžená platnosť playlistu', pl.name); say('Platnosť je predĺžená do 31. 12.'); };
    let mainAct;
    if (pl.flow === 'pending') mainAct = mineApv ? { k: '', label: 'Vziať späť', fn: withdraw } : ACC.apv ? { k: 'p', label: 'Otvoriť schválenie', fn: () => otherApv && nav('ad', { adId: otherApv.id, apvNote: '' }) } : { k: '', label: 'Čaká na schválenie správcom', fn: () => say('Playlist schvaľuje správca DP Riečany.') };
    else if (pl.flow === 'draft') mainAct = ACC.pub ? { k: 'p', label: 'Zverejniť', fn: publishNow } : { k: 'p', label: 'Odoslať na schválenie', fn: sendApv };
    else if (!ACC.pub) mainAct = null;
    else if (pl.st === 'nenahraty') mainAct = pl.where.length ? { k: 'p', label: 'Nahrať na zariadenia', fn: () => upload(pl, 'Playlist sa nahráva na ' + nPlaces(pl.where.length) + '.') } : { k: 'p', label: 'Prehrať na mieste', fn: () => swForPl(pl.id) };
    else if (pl.st === 'expirovany') mainAct = { k: 'p', label: 'Predĺžiť platnosť', fn: extend };
    else mainAct = { k: 'p', label: 'Prehrať na mieste', fn: () => swForPl(pl.id) };
    const lockT = mineApv ? 'Playlist ste odoslali na schválenie, preto sa nedá upravovať. Ak chcete niečo zmeniť, vezmite ho späť.' : 'Playlist čaká na schválenie, preto sa nedá upravovať.';
    // miesta, kde sa playlist prehráva len dočasne (prepnutie z mobilu)
    const plTemp = s.places.filter((p) => p.temp && p.temp.pl === pl.id).map((p) => ({ name: p.name, until: p.temp.until }));
    const whereT = pl.where.length ? names(pl.where).join(' · ') : '';
    // stav po miestach: z posledného nahratia playlistu, inak zo stavu zariadenia
    const plDl = (s.dlv || []).find((d) => d.ref === pl.id);
    let wOi = 0;
    const whereRows = pl.where.map(placeById).filter(Boolean).map((p) => { const k = !p.on ? (plDl ? 'wait' : 'off') : plDl ? dSt(plDl, p.id, wOi++) : pl.st === 'nahraty' ? 'ok' : 'st'; return { name: p.name, k: k === 'off' ? 'bad' : k === 'st' ? ST[pl.st][0] : DST[k], t: k === 'off' ? 'Offline' : k === 'st' ? ST[pl.st][1] : dStT({ kind: 'pl' }, k) }; });
    const whereNoneT = pl.where.length || plTemp.length ? '' : 'Zatiaľ sa neprehráva na žiadnom mieste.';
    const openAdd = () => set({ sheet: 'add', addMode: 'slide' });
    // zoznam vytvorených snímok pre zariadenie playlistu: snímky zo všetkých playlistov + samostatné
    const libAll = []; const libSeen = {};
    s.pls.forEach((p) => p.slides.forEach((x) => { const k = p.dev + '|' + (x.d || '') + '|' + x.title; if (x.kind !== 'clock' && !libSeen[k]) { libSeen[k] = 1; libAll.push(Object.assign({}, x, { dev: p.dev, from: p.id === pl.id ? '' : 'z playlistu: ' + p.name, own: p.id === pl.id })); } }));
    s.libX.forEach((x) => { const k = x.dev + '|' + (x.d || '') + '|' + x.title; if (!libSeen[k]) { libSeen[k] = 1; libAll.push(Object.assign({}, x, { from: 'samostatná snímka', own: false })); } });
    const lql = s.libQ.trim().toLowerCase();
    const libRows = libAll.filter((x) => x.dev === pl.dev && !x.own && (!lql || x.title.toLowerCase().indexOf(lql) >= 0)).map((x) => ({
      dev: rdev(pl, x), w: thW(pl, x), kind: x.kind, title: x.title, text: x.text, bg: x.bg, img: x.img, ledSize: x.ledSize, ledAlign: x.ledAlign, ledCol: x.ledCol, ledBg: x.ledBg, meta: (plTotem ? partName(pl, x) + ' · ' : '') + kindT(x) + ' · ' + x.dur + ' s', from: x.from, aria: 'Pridať snímku ' + x.title,
      sx: SX(x), pick: () => { const sl = newSl(x.kind, x.title, x.text, x.dur, x.bg, { img: x.img, imgName: x.imgName, ledSize: x.ledSize, ledAlign: x.ledAlign, ledCol: x.ledCol, ledBg: x.ledBg, d: x.d || '', vz: x.vz, secs: x.secs, isVid: x.isVid }); pushSlide(pl.id, sl, 'Pridaná snímka „' + x.title + '“ (zo zoznamu snímok)', { libQ: '' }); say('Snímka „' + x.title + '“ je pridaná na koniec playlistu.'); }
    }));
    const openLib = () => set({ sheet: 'lib', libQ: '' });
    const addLed = () => { const sl = newSl('led', Tx('Nový text'), '', 10, '#050505', { ledSize: pl.dev === 'vehicle' ? 'L' : 'M' }); pushSlide(pl.id, sl, 'Pridaná snímka „Nový text“', toEditor); };
