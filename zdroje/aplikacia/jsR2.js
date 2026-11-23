
    // ---------- EDITOR SNÍMKY ----------
    const ed = pl.slides.find((x) => x.id === s.slId) || BLANK;
    const upd = (patch) => updSlide(ed.id, patch);
    const swatch = (c, label, cur, patchKey, show) => ({ label, on: cur === c, pick: () => upd({ [patchKey]: c }), s: 'display:block;width:30px;height:30px;border-radius:50%;background:' + (show || c) + ';box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)' });
    const BGN = ['Tyrkysová', 'Tmavá tyrkysová', 'Tmavomodrá', 'Modrá', 'Fialová', 'Oranžová', 'Červená', 'Čierna'];
    const bgSw = BG.map((c, i) => swatch(c, 'Pozadie: ' + BGN[i], ed.bg, 'bg'));
    const LEDC = [['', 'Predvolená (jantárová)', '#FFB000'], ['#4CFF4C', 'Zelená', '#4CFF4C'], ['#FF4040', 'Červená', '#FF4040'], ['#FFFFFF', 'Biela', '#FFFFFF'], ['#34D8FF', 'Azúrová', '#34D8FF']];
    const LEDB = [['', 'Bez farby (čierne)', '#050505'], ['#E07A2B', 'Oranžové pole', '#E07A2B'], ['#C8322B', 'Červené pole', '#C8322B'], ['#2E9E4F', 'Zelené pole', '#2E9E4F'], ['#2F62B0', 'Modré pole', '#2F62B0'], ['#FFD27A', 'Žlté pole', '#FFD27A']];
    const ledColSw = LEDC.map((c) => swatch(c[0], 'Text: ' + c[1], ed.ledCol, 'ledCol', c[2]));
    const ledBgSw = LEDB.map((c) => swatch(c[0], c[1], ed.ledBg, 'ledBg', c[2]));
    const ledSizes = ['XS', 'S', 'M', 'L', 'XL'].map((z) => ({ label: z, on: ed.ledSize === z, pick: () => upd({ ledSize: z }) }));
    const ledAligns = [['left', 'Vľavo'], ['center', 'Stred'], ['right', 'Vpravo']].map((z) => ({ label: z[1], on: ed.ledAlign === z[0], pick: () => upd({ ledAlign: z[0] }) }));
    const edR = rdev(pl, ed); const edLedR = isLedR(edR);
    const edLedText = edLedR && ed.kind === 'led';
    const edClock = ed.kind === 'clock';
    const flag = (ch) => String(ed.text || '').indexOf(ch) >= 0;
    const flip = (ch) => upd({ text: flag(ch) ? String(ed.text).replace(ch, '') : String(ed.text || '') + ch });
    const clkOpts = [['n', 'Dátum', true], ['s', 'Sekundy', false], ['w', 'Deň v týždni', false], ['y', 'Rok', false]].filter((o) => o[0] === 'n' || o[0] === 's' || !flag('n')).map((o) => ({ title: o[1], on: o[2] ? !flag(o[0]) : flag(o[0]), toggle: () => flip(o[0]) }));
    const edPart = partBy(pl.dev, ed.d);
    const edCanDel = canDel(ed);
    const delEd = () => { if (!edCanDel) return; if (s.confirm === 'ed') { const sid = ed.id; clearTimeout(self._tc); delSlide(sid); set(Object.assign({ confirm: '' }, backState())); } else armConfirm('ed'); };
    // zobrazené linky sa vyberajú ťuknutím (žiadne písanie čísel), aspoň jedna musí ostať
    const LINES = ['3', '5', '14', '25', '31', 'N1'];
    const linesOf = (t) => String(t || '').match(/N?\d+/g) || [];
    const lineSel = (cur, setFn) => LINES.map((l) => { const on = cur.indexOf(l) >= 0; return { label: l, aria: 'Linka ' + l, on, pick: () => { const nx = LINES.filter((x) => x === l ? !on : cur.indexOf(x) >= 0); if (!nx.length) { say('Musí ostať aspoň jedna linka.'); return; } setFn('Linky ' + nx.join(' · ')); } }; });
    // sekcie podľa vzoru: ťuknutím na sekciu v náhľade sa upravuje jej obsah; vzor (rozloženie) sa v mobile nemení
    const edTpl = ed.kind === 'tpl' && !edLedR;
    const edGeo = edTpl ? tplGeo(ed) : [];
    const edSel = edGeo.length ? Math.min(s.edSec || 0, edGeo.length - 1) : 0;
    const sec = edGeo[edSel] || { name: '', type: 'text', text: '', bg: '', img: '', imgName: '', cap: '' };
    const updSec = (patch) => mutate(pl.id, (p) => { const key = 'c' + ed.id + '_' + edSel; const added = p.log.some((x) => x[2] === 'a' + ed.id); return Object.assign({}, p, { slides: p.slides.map((x) => x.id === ed.id ? Object.assign({}, x, { secs: (x.secs || []).map((c, j) => j === edSel ? Object.assign({}, c, patch) : c) }) : x), log: added ? p.log : p.log.filter((x) => x[2] !== key).concat([['mod', 'Upravená sekcia „' + sec.name + '“ v snímke „' + ed.title + '“', key]]) }); });
    const edFull = fullEd(pl);
    const canSec = (c) => ACC.partner ? (edFull || secOwn(c)) : !c.owner;
    const edWn = edPart ? edPart[5] : isPort(pl.dev) ? 190 : fw(338); const edHn = edWn * (isPort(pl.dev) ? 480 / 270 : 270 / 480);
    const zPad = (px) => Math.max(0, Math.ceil((44 - px) / 2));
    const edZones = edGeo.map((c, j) => ({ name: c.name, label: c.owner || c.name, chip: c.name + (c.owner ? ' · ' + c.owner : ''), own: c.owner ? '3' : '', on: j === edSel, aria: c.owner ? 'Upraviť sekciu: ' + c.name + ' (tretia strana: ' + c.owner + ')' : 'Upraviť sekciu: ' + c.name, pick: () => set({ edSec: j }), s: 'left:' + c.x + '%;top:' + c.y + '%;width:' + c.w + '%;height:' + c.h + '%' + (zPad(edHn * c.h / 100) || zPad(edWn * c.w / 100) ? ';z-index:2;--zy:' + zPad(edHn * c.h / 100) + 'px;--zx:' + zPad(edWn * c.w / 100) + 'px' : '') }));
    const edOwners = edGeo.filter((c) => c.owner).map((c) => c.owner).filter((v, k, a) => a.indexOf(v) === k);
    const secCan = canSec(sec);
    const TTD = { '3': ['Železničná stanica', 'Centrum'], '5': ['Vlčince', 'Centrum'], '14': ['Sídlisko Sever', 'Centrum'], '25': ['Letisko', 'Centrum'], '31': ['Univerzita', 'Centrum'] };
    const edDevCap = DCAP[pl.dev] || {};
    const ctWhy = (t) => t[5] && !edDevCap[t[5]] ? NEEDT[t[5]] : t[4] && !(SRC[t[4]] || [0, false])[1] ? 'Chýba zdroj dát: ' + SRC[t[4]][0] : '';
    const ctOf = (k) => CT.find((t) => t[0] === k) || CT[0];
    const ctDef = (k) => { const o = { type: k }; const dark = ['deps', 'tt', 'line', 'clock', 'cal']; if (dark.indexOf(k) >= 0 && (!sec.bg || ['photo', 'video', 'web', 'map', 'weather', 'menu'].indexOf(sec.type) >= 0)) o.bg = '#1E2A5A'; if (k === 'text' && !sec.bg) o.bg = '#0E8080'; if (k === 'deps' && !/\d/.test(sec.text || '')) o.text = 'Linky 3 · 5 · 14'; if (k === 'tt' || k === 'line') { o.line = sec.line || '5'; o.dir = sec.dir || TTD[o.line][0]; } if (k === 'video' && !sec.vid) { const v = s.gal.find((g) => g.type === 'vid'); if (v) { o.vid = v.name; o.img = v.col; } } if (k === 'web' && !sec.url) o.url = 'https://www.dpriecany.sk/odchody'; if (k === 'map' && !sec.rad) o.rad = '500 m'; if (k === 'menu' && !sec.tiles) o.tiles = 'Odchody, Mapa, Cenník, Kontakt'; return o; };
    const ctAll = CT.map((t) => ({ k: t[0], label: t[1], sub: t[2], d: IC[t[3]], why: ctWhy(t), on: sec.type === t[0], pick: () => { if (sec.type !== t[0]) updSec(ctDef(t[0])); set({ sheet: null }); } }));
    const ctCur = ctOf(sec.type);
    const secTypes = ctAll.filter((x) => !x.why);
    const ttLines = Object.keys(TTD).map((l) => ({ label: l, on: sec.line === l, aria: 'Linka ' + l, pick: () => updSec({ line: l, dir: TTD[l][0] }) }));
    const ttDirs = (TTD[sec.line] || TTD['5']).map((d) => ({ label: d, on: sec.dir === d, pick: () => updSec({ dir: d }) }));
    const edLines = lineSel(linesOf(ed.text), (t) => upd({ text: t }));
    const secLines = lineSel(linesOf(sec.text), (t) => updSec({ text: t }));
    const secBgSw = BG.map((c, i) => ({ label: 'Pozadie: ' + BGN[i], on: sec.bg === c, pick: () => updSec({ bg: c }), s: 'display:block;width:30px;height:30px;border-radius:50%;background:' + c + ';box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)' }));

    // ---------- SCHVAĽOVANIE ----------
    const AS = { pending: ['warn', 'Čaká'], approved: ['ok', 'Schválené'], returned: ['blue', 'Vrátené'], rejected: ['bad', 'Zamietnuté'] };
    const apvMine = ACC.apv ? s.apvs : s.apvs.filter(isOwn);
    const pendAll = apvMine.filter((a) => a.state === 'pending');
    const doneAll = apvMine.filter((a) => a.state !== 'pending');
    const apvTabs = [['pending', 'Čaká (' + pendAll.length + ')'], ['done', 'Vybavené (' + doneAll.length + ')']].map((t) => ({ label: t[1], on: s.apvTab === t[0], pick: () => set({ apvTab: t[0] }) }));
    const apvRows = (s.apvTab === 'pending' ? pendAll : doneAll).map((a) => { const p = plById(a.plId) || { where: [], dev: 'lcd' }; return { open: () => nav('ad', { adId: a.id, apvNote: '' }), name: a.name, by: isOwn(a) ? 'Odoslané vami · ' + a.when : a.author + ' · ' + a.when, k: AS[a.state][0], stT: isOwn(a) && a.state === 'pending' ? 'Odoslané vami' : AS[a.state][1], devT: DEV[p.dev][1], nChg: a.changes.length + ' ' + plural(a.changes.length, ['zmena', 'zmeny', 'zmien']), nPl: p.where.length ? nPlaces(p.where.length) : '' }; });
    const at = (list, e) => { const tot = list.reduce((a, x) => a + x.dur, 0); if (!tot) return null; let t = e % tot; for (let k = 0; k < list.length; k++) { if (t < list[k].dur) return list[k]; t -= list[k].dur; } return list[0]; };
    const ad = s.apvs.find((a) => a.id === s.adId) || s.apvs[0];
    const adPl = plById(ad.plId) || pl;
    const CHG = { add: ['add', '+'], del: ['del', '−'], mod: ['mod', '~'], ord: ['ord', '↕'] };
    const adCanAct = ad.state === 'pending' && !isOwn(ad) && ACC.apv;
    const decide = (state, doneT, toastT) => {
      if (needNet()) return;
      const approved = state === 'approved';
      set(Object.assign({ apvs: s.apvs.map((a) => a.id === ad.id ? Object.assign({}, a, { state, note: s.apvNote.trim(), doneT }) : a), pls: s.pls.map((p) => p.id === ad.plId ? Object.assign({}, p, approved ? { st: 'nahraty', flow: 'none', log: [] } : state === 'returned' ? { flow: 'draft', log: backLog(ad) } : Object.assign({ flow: 'none', log: [] }, (s.snap || {})[ad.plId] ? { slides: s.snap[ad.plId].slides } : {})) : p), snap: state === 'returned' ? (s.snap || {}) : snapDrop(ad.plId), places: approved ? deliver(s.places, adPl) : s.places, apvTab: 'pending', apvNote: '', sheet: null }, backState()));
      logAct('apv', approved ? 'Schválené zmeny' : state === 'returned' ? 'Vrátené na úpravu' : 'Zamietnuté zmeny', ad.name);
      const did = approved && adPl.where.length ? addDlv('pl', adPl.name, adPl.where, { ref: adPl.id }) : '';
      say(toastT, did ? dlvAct(did) : null);
      if (approved && onIds(adPl.where).length) notify(deliveredT(adPl, onIds(adPl.where)));
    };
    const needNote = (fn) => () => { if (!s.apvNote.trim()) { set({ apvErr: true }); setTimeout(() => { try { const el = document.getElementById('ad-note'); if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); } } catch (e) {} }, 60); return; } fn(); };
    const adObj = {
      name: ad.name, by: isOwn(ad) ? 'Odoslané vami · ' + ad.when : ad.author + ' · ' + ad.when, k: AS[ad.state][0], stT: isOwn(ad) && ad.state === 'pending' ? 'Odoslané vami' : AS[ad.state][1], devT: DEV[adPl.dev][0],
      whereT: adPl.where.length ? names(adPl.where).join(' · ') : 'Zatiaľ žiadne miesto', valid: ad.valid, doneT: ad.doneT || '', hasNote: !!(ad.note && ad.state !== 'pending'), note: ad.note || ''
    };

    // ---------- GALÉRIA ----------
    const FT = { img: ['Obrázok', IC.image], vid: ['Video', IC.film], aud: ['Zvuk', IC.music] };
    const galOk = (g, f) => f === 'all' || (f === 'unused' ? g.used === 0 : g.type === f);
    const galChips = [['all', 'Všetko'], ['img', 'Obrázky'], ['vid', 'Videá'], ['aud', 'Zvuky'], ['unused', 'Nepoužité']].map((c) => ({ label: c[1], n: s.gal.filter((g) => galOk(g, c[0])).length, on: s.galF === c[0], pick: () => set({ galF: c[0] }) }));
    const thFile = (g) => 'position:relative;width:100%;aspect-ratio:4/3;border-radius:12px;display:flex;align-items:center;justify-content:center;background:' + (g.type === 'aud' ? 'linear-gradient(135deg,#1F2323,#0B6E6E)' : GRAD(g.col));
    const galRows = s.gal.filter((g) => galOk(g, s.galF)).map((g) => ({ open: () => set({ sheet: 'gd', galId: g.id, confirm: '' }), aria: 'Detail súboru ' + g.name, thS: thFile(g), d: FT[g.type][1], hasDur: !!g.dur, dur: g.dur || '', name: g.name, size: g.size, unused: g.used === 0 }));
    const galFile = s.gal.find((g) => g.id === s.galId) || s.gal[0] || { id: '', name: '', type: 'img', size: '', folder: '', used: 0, usedIn: [], col: '#C9D2D2' };
    const gd = {
      name: galFile.name, bigS: 'width:100%;height:190px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none;background:' + (galFile.type === 'aud' ? 'linear-gradient(135deg,#1F2323,#0B6E6E)' : GRAD(galFile.col)), d: FT[galFile.type][1], typeT: FT[galFile.type][0] + (galFile.dur ? ' · ' + galFile.dur : ''),
      size: galFile.size, folder: galFile.folder, usedT: galFile.used ? galFile.used + '×' : 'Nepoužité', hasUse: galFile.used > 0, useList: galFile.usedIn.join(' · ')
    };

    // ---------- MIESTA ----------
    const PST = { up: ['ok', 'Aktívny'], exp: ['bad', 'Expirovaný'], no: ['grey', 'Nenahratý'] };
    const pcProb = (p) => p.n > 0 && (!p.on || p.st === 'exp');
    const pcOk = (p, f) => f === 'all' || (f === 'prob' ? pcProb(p) : f === 'off' ? p.n > 0 && !p.on : f === 'none' ? p.n === 0 : p.st === f);
    const pcChips = [['all', 'Všetky'], ['prob', 'Hlásenia'], ['up', 'Aktívne'], ['exp', 'Expirované'], ['no', 'Nenahraté'], ['off', 'Offline'], ['none', 'Bez zariadenia']].map((c) => ({ label: c[1], n: vPlaces.filter((p) => pcOk(p, c[0])).length, on: s.pcF === c[0], pick: () => set({ pcF: c[0] }) }));
    const pql = s.pq.trim().toLowerCase();
    const pcList = vPlaces.filter((p) => pcOk(p, s.pcF) && (!pql || p.name.toLowerCase().indexOf(pql) >= 0));
    const devLine = (p) => p.n === 0 ? 'Bez zariadenia' : DEV[p.dev][1] + (p.g >= 0 ? ' · ' + GRP[p.g] : '');
    const revertAt = (p) => { if (needNet()) return; set({ places: s.places.map((x) => x.id === p.id ? Object.assign({}, x, { temp: null }) : x) }); logAct('sw', 'Vrátený pôvodný playlist', p.name); say(p.name + ': vrátený pôvodný playlist.'); };
    const pcRowOf = (p) => { const ep = p.n ? effPl(p) : null; return {
      open: () => nav('pd', { pdId: p.id }), openA: 'Detail miesta: ' + p.name,
      dotK: p.n === 0 ? '' : p.on ? 'ok' : 'bad', name: p.name, devT: devLine(p), plNm: p.n && ep ? ep.name : '', plT: (p.n === 0 ? 'Miesto zatiaľ nemá zariadenie' : ep ? '' : 'Bez playlistu') + (p.n > 0 && !p.on ? ' · offline ' + p.off : ''), hasDev: p.n > 0, offline: p.n > 0 && !p.on,
      stK: (PST[p.st] || ['grey', ''])[0], stT: (PST[p.st] || ['grey', ''])[1], temp: !!p.temp, until: p.temp ? p.temp.until : '',
      revert: () => revertAt(p), change: () => swForPlace(p.id), canSw: ACC.pub, changeA: 'Prepnúť playlist na mieste: ' + p.name, edit: () => editAtPlace(p.id), canEdit: plBtn(ep).canEdit, editT: plBtn(ep).editT, editA: plBtn(ep).editA, editK: plBtn(ep).editK
    }; };
    const pcRows = pcList.map(pcRowOf);
    // miesta po skupinách (ako v desktope), v skupine sú miesta s hlásením navrchu; skupina sa dá zbaliť
    const pcGs = GRP.map((g, i) => i).concat([-1]).map((gi) => ({ gi, ps: pcList.filter((p) => p.g === gi) })).filter((G) => G.ps.length > 0);
    const pcFlat = pcGs.length < 2;
    const pcGroups = pcGs.map((G) => { const key = 'g' + G.gi; const open = pcFlat || !!pql || !(s.pcCol || {})[key]; const probN = G.ps.filter(pcProb).length; return {
      name: G.gi >= 0 ? GRP[G.gi] : 'Bez skupiny', nameTr: G.gi >= 0 ? 'no' : 'yes', n: String(G.ps.length), showHead: !pcFlat, hasProb: probN > 0, probT: probN + ' ' + plural(probN, ['hlásenie', 'hlásenia', 'hlásení']),
      openA: open ? 'true' : 'false', chev: open ? IC.chevU : IC.chevD, toggle: () => set({ pcCol: Object.assign({}, s.pcCol || {}, { [key]: open }) }),
      rows: open ? G.ps.slice().sort((a, b) => (pcProb(b) ? 1 : 0) - (pcProb(a) ? 1 : 0)).map(pcRowOf) : []
    }; });

    // ---------- NASTAVENIA A AI ----------
    const NT = [['n1', 'Čaká na schválenie', 'Keď niekto odošle playlist na schválenie'], ['n5', 'Playlist je na zariadení', 'Keď sa playlist poslaný z telefónu nahrá na zariadenie'], ['n2', 'Miesto je offline', 'Keď zariadenie na mieste prestane odpovedať'], ['n3', 'Playlist čoskoro expiruje', '3 dni pred koncom platnosti'], ['n4', 'Potvrdenie rýchlej správy', 'Po odoslaní alebo zrušení správy']];
    const notifRows = NT.filter((n) => canQuick || n[0] !== 'n4').map((n) => ({ title: n[1], sub: n[2], on: !!s.notif[n[0]], toggle: () => set({ notif: Object.assign({}, s.notif, { [n[0]]: !s.notif[n[0]] }) }) }));
    const protoRows = [{ title: 'Simulovať výpadok pripojenia', sub: 'Aplikácia sa správa, ako keby telefón stratil signál.', on: !!s.netSim, toggle: () => { const on = !s.netSim; set({ netSim: on, netAt: on ? HM() : s.netAt }); if (!on && s.netReal !== false) say('Pripojenie je späť. Môžete pokračovať.'); } }];
    const AIT = [['a1', 'Návrh textu správy', 'AI navrhne stručný text správy podľa situácie (meškanie, odklon…).'], ['a2', 'Kontrola pred odoslaním', 'AI upozorní na preklepy, nečitateľné farby a chýbajúce údaje.']];
    const aiRows = AIT.filter((n) => canQuick || n[0] !== 'a1').map((n) => ({ title: n[1], sub: n[2], on: !!s.aiOn[n[0]], toggle: () => set({ aiOn: Object.assign({}, s.aiOn, { [n[0]]: !s.aiOn[n[0]] }) }) }));
    const AIS = {
      delay: ['Meškanie', 'info', ['Linka 5 mešká približne 10 minút. Ďakujeme za trpezlivosť.', 'Spoje linky 5 majú meškanie do 10 minút.', 'Meškanie linky 5: asi 10 minút. Sledujte odchody na tabuli.']],
      detour: ['Odklon', 'warn', ['Linka 5 je dnes odklonená cez Bulvár.', 'Odklon linky 5: zastávka Mostná sa neobsluhuje, použite Bulvár.', 'Linka 5 dnes nejde cez Mostnú. Nastúpte na zastávke Bulvár.']],
      outage: ['Výluka', 'warn', ['Električky T1 a T2 dnes nepremávajú, nahrádza ich autobus.', 'Výluka električiek T1 a T2. Náhradná doprava odchádza zo zastávky Bulvár.', 'T1 a T2 dnes nejazdia. Použite náhradný autobus.']],
      closed: ['Zatvorená zastávka', 'warn', ['Zastávka Mostná je dočasne zatvorená. Použite zastávku Bulvár.', 'Mostná: zastávka je presunutá o 50 m v smere jazdy.', 'Zastávka Mostná sa dnes neobsluhuje.']]
    };

    // ---------- NÁHĽAD ----------
    const pvPl = plById(s.pvPl) || pl;
    const pvSl = pvPl.slides[Math.min(s.pvI, Math.max(0, pvPl.slides.length - 1))];
    const pvSegs = pvPl.slides.map((x, i) => ({ s: 'flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.25);overflow:hidden', f: 'display:block;height:100%;background:#2BD0D0;width:' + (i < s.pvI ? 100 : i === s.pvI ? Math.round(100 * s.pvT / x.dur) : 0) + '%' }));
    const pvTot = !!partsOf(pvPl);
    const pvStep = (d) => pvTot ? set({ pvE: Math.max(0, (s.pvE || 0) + d * 5) }) : set({ pvI: (s.pvI + d + pvPl.slides.length) % Math.max(1, pvPl.slides.length), pvT: 0 });
    const pvObj = pvSl || BLANK;
    const pvParts = pvTot ? partsOf(pvPl).map((q) => { const x = at(pvPl.slides.filter((z) => z.d === q[0]), s.pvE || 0); return x ? Object.assign({}, x, { dev: q[2], w: '112', r: '3', sx: '' }) : null; }).filter(Boolean) : (pvSl ? [Object.assign({}, pvSl, { dev: pvPl.dev, w: String(isPort(pvPl.dev) ? 230 : fw(358)), r: '10', sx: SX(pvSl) })] : []);

    // ---------- RÝCHLA SPRÁVA ----------
    const Q = s.quick;
    const setQ = (o) => set({ quick: Object.assign({}, Q, o) });
    // úprava správy, ktorá už beží alebo je naplánovaná (rovnaký panel ako nová správa)
    const qEditM = s.qEditId ? (s.qa.find((m) => m.id === s.qEditId) || null) : null;
    const qIsEdit = !!qEditM;
    const qRun = qIsEdit && !(qEditM.from && qEditM.from > Date.now());
    // šablóny rýchlej správy: [názov, text ({L} = linka, {M} = minúty), priorita, poloha, predvolená linka, predvolené minúty]
    // linka a minúty sa volia ťuknutím, text sa neprepisuje ručne; zobrazí sa prvých päť šablón, ostatné po ťuknutí na „Viac“
    const QTPL = [['Meškanie', 'Linka {L} mešká približne {M} minút. Ďakujeme za trpezlivosť.', 'warn', 'bottom', '5', 10], ['Odklon', 'Linka {L} je dnes odklonená. Zastávka je dočasne presunutá.', 'warn', 'top', '5', 0], ['Výpadok', 'Pre technickú poruchu je premávka obmedzená. Sledujte pokyny personálu.', 'warn', 'full', '', 0], ['Info', 'Od pondelka platí nový cestovný poriadok.', 'info', 'bottom', '', 0], ['Výluka', 'Električky T1 a T2 nepremávajú, nahrádza ich autobus.', 'warn', 'full', '', 0],
      ['Zatvorená zastávka', 'Zastávka Mostná je dočasne zatvorená. Použite zastávku Bulvár.', 'warn', 'top', '', 0], ['Náhradná doprava', 'Náhradná doprava odchádza zo zastávky Bulvár.', 'info', 'bottom', '', 0], ['Bezplatná doprava', 'Dnes je doprava pre deti zadarmo.', 'info', 'bottom', '', 0], ['Podujatie', 'Dnes od 18:00 je Hlavná ulica uzavretá pre podujatie. Spoje idú obchádzkou.', 'info', 'bottom', '', 0]];
    const tplFill = (c, L, M) => Tx(c[1]).replace('{L}', L || c[4] || '').replace('{M}', String(M || c[5] || ''));
    // vlastné šablóny používateľa sú pred pripravenými
    const qAll = (s.qUser || []).map((u) => ({ u: true, id: u.id, c: [u.name, u.text, u.prio, u.pos, '', 0] })).concat(QTPL.map((c, i) => ({ u: false, id: 't' + i, c })));
    const TPL_N = 5;
    const qTplRest = Math.max(0, qAll.length - TPL_N);
    const qTplCur = Q.tpl ? (qAll.find((x) => x.id === Q.tpl) || null) : null;
    const qTpls = (s.qTplAll ? qAll : qAll.slice(0, TPL_N)).map((x) => ({ label: x.c[0], tr: x.u ? 'no' : 'yes', on: Q.tpl === x.id, pick: () => setQ({ tpl: x.id, tL: x.c[4], tM: x.c[5], text: x.u ? x.c[1] : tplFill(x.c, x.c[4], x.c[5]), prio: x.c[2], pos: x.c[3] }) }));
    const qHasL = !!qTplCur && !qTplCur.u && qTplCur.c[1].indexOf('{L}') >= 0;
    const qHasM = !!qTplCur && !qTplCur.u && qTplCur.c[1].indexOf('{M}') >= 0;
    const qTL = qHasL ? LINES.map((l) => ({ label: l, aria: 'Linka ' + l, on: Q.tL === l, pick: () => setQ({ tL: l, text: tplFill(qTplCur.c, l, Q.tM) }) })) : [];
    const qTMSet = (d) => () => { if (!qHasM) return; const m = Math.max(5, Math.min(90, (Q.tM || 10) + d)); setQ({ tM: m, text: tplFill(qTplCur.c, Q.tL, m) }); };
    const qCanSaveTpl = !qIsEdit && !!Q.text.trim() && !qTplCur && !(s.qUser || []).some((u) => u.text === Q.text.trim());
    const qSaveTpl = () => { const tx = Q.text.trim(); if (!tx) return; const w = tx.split(/\s+/).slice(0, 3).join(' ').replace(/[.,:;!?]+$/, ''); const name = w.length > 24 ? w.slice(0, 23) + '…' : w; const id = 'u' + self.nid(); set({ qUser: [{ id, name, text: tx, prio: Q.prio, pos: Q.pos }].concat(s.qUser || []), quick: Object.assign({}, Q, { tpl: id, tL: '', tM: 0 }) }); say('Šablóna „' + name + '“ je uložená.'); };
    const qTplMine = !!qTplCur && qTplCur.u;
    const qDelTpl = () => { if (!qTplMine) return; if (s.confirm !== 'qt') { armConfirm('qt'); return; } clearTimeout(self._tc); set({ qUser: (s.qUser || []).filter((u) => u.id !== Q.tpl), quick: Object.assign({}, Q, { tpl: null }), confirm: '' }); say('Šablóna je odstránená.'); };
    const qPrios = [['info', 'Oznam'], ['warn', 'Výstraha']].map((c) => ({ label: c[1], on: Q.prio === c[0], pick: () => setQ({ prio: c[0] }) }));
    const qPoss = [['top', 'Horný pás'], ['bottom', 'Dolný pás'], ['full', 'Celá obrazovka']].map((c) => ({ label: c[1], on: Q.pos === c[0], pick: () => setQ({ pos: c[0] }) }));
    const qDurs = (qRun ? ['keep'] : []).concat(['m15', 'h1', 'day', 'rev', 'custom']).map((k) => ({ label: k === 'keep' ? 'Bez zmeny' : DURS[k][0], on: Q.dur === k, pick: () => { setQ(k === 'custom' ? Object.assign({ dur: k }, Q.cFd ? {} : self.cDef(true), qRun ? { cEd: 't' } : {}) : { dur: k }); if (k === 'custom') { self.whSync(false); setTimeout(() => { try { const el = document.querySelector('.sheet .dtc'); if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }, 80); } } }));
    const qSel = Q.all ? devIds : Q.ids.filter((id) => devIds.indexOf(id) >= 0);
    const setSel = (ids) => setQ(ids.length === devIds.length ? { all: true, ids: [] } : { all: false, ids });
    const qGrps = GRP.map((g, i) => { const gi = grpIds(i); const on = gi.length > 0 && gi.every((x) => qSel.indexOf(x) >= 0); return { label: g + ' (' + gi.length + ')', on, pick: () => setSelOrd(on ? qSel.filter((x) => gi.indexOf(x) < 0) : qSel.concat(gi.filter((x) => qSel.indexOf(x) < 0))) }; });
    const qsl = s.qSearch.trim().toLowerCase();
    // vybrané miesta hore: poradie sa určí pri otvorení zoznamu a pri výbere skupiny (jednotlivé ťuknutie zoznam nepreskladá)
    const snapOrd = (sel) => withDev.filter((p) => sel.indexOf(p.id) >= 0).concat(withDev.filter((p) => sel.indexOf(p.id) < 0)).map((p) => p.id);
    const ordIx = (id) => { const k = (s.qOrd || []).indexOf(id); return k < 0 ? 1e6 : k; };
    const withDevO = s.qOrd ? withDev.slice().sort((a, b) => ordIx(a.id) - ordIx(b.id)) : withDev;
    const toTop = () => setTimeout(() => { try { const e = document.querySelector('.sheet .sheet-b'); if (e) e.scrollTop = 0; } catch (x) {} }, 30);
    const setSelOrd = (ids) => { set({ quick: Object.assign({}, Q, ids.length === devIds.length ? { all: true, ids: [] } : { all: false, ids }), qOrd: snapOrd(ids) }); toTop(); };
    const qPcs = withDevO.filter((p) => !qsl || p.name.toLowerCase().indexOf(qsl) >= 0).map((p) => { const on = qSel.indexOf(p.id) >= 0; return { name: p.name, sub: DEV[p.dev][1] + (p.g >= 0 ? ' · ' + GRP[p.g] : '') + (p.on ? '' : ' · offline'), on, pick: () => setSel(on ? qSel.filter((x) => x !== p.id) : qSel.concat([p.id])) }; });
    const qN = qSel.length;
    const qSend = () => {
      if (!Q.text.trim() || !qN || qcErrT || !qDirty) return;
      if (needNet()) return;
      const cust = Q.dur === 'custom', keep = Q.dur === 'keep'; const text = Q.text.trim();
      const tgt = { all: SCOPE ? false : Q.all, ids: SCOPE && Q.all ? devIds.slice() : qSel.slice() };
      const today = (d) => d.toDateString() === new Date().toDateString();
      const time = keep ? {} : { dur: Q.dur, until: cust ? (qRun ? 'do ' + (today(qcTo) ? qcTo.getHours() + ':' + p2d(qcTo.getMinutes()) : fdt(qcTo)) : qcLbl) : DURS[Q.dur][1], from: cust && !qRun ? qcFrom.getTime() : 0, to: cust ? qcTo.getTime() : 0 };
      const pcs = tgt.all ? allDev.slice() : tgt.ids.slice();
      if (qIsEdit) {
        set({ qa: s.qa.map((m) => m.id === qEditM.id ? Object.assign({}, m, { text, prio: Q.prio, pos: Q.pos }, tgt, time, { editT: 'Dnes ' + HM(), editBy: ACC.name }) : m), sheet: null, qStep: 'main', qSearch: '', qTplAll: false, qEditId: null, quick: QDEF() });
        const fromE = keep ? (qEditM.from || 0) : time.from;
        const did = addDlv('msg', text, pcs, { ref: qEditM.id, from: fromE });
        logAct('msg', 'Upravená rýchla správa', text, tgt.all ? 'Všetky miesta' : nPlaces(qN));
        say(fromE > Date.now() ? 'Naplánovaná správa je upravená.' : 'Správa je upravená. Na displejoch sa zmení do pár sekúnd.', dlvAct(did));
        return;
      }
      const m = Object.assign({ id: 'q' + self.nid(), text, prio: Q.prio, pos: Q.pos, by: ACC.name, byRole: ACC.role, sentT: 'Dnes ' + HM(), acc: s.role }, tgt, time);
      // po odoslaní sa vlastný čas vráti na predvolené „Do konca dňa“, aby pri ďalšej správe neostal starý termín
      set({ qa: [m].concat(s.qa), sheet: null, qStep: 'main', qSearch: '', qTplAll: false, quick: Object.assign({}, Q, { text: '', tpl: null, tL: '', tM: 0, dur: cust ? 'day' : Q.dur, cFd: '', cFt: '', cTd: '', cTt: '', cEd: 'f' }) });
      const did = addDlv('msg', text, pcs, { ref: m.id, from: m.from });
      logAct('msg', qPlan ? 'Naplánovaná rýchla správa' : 'Odoslaná rýchla správa', text, tgt.all ? 'Všetky miesta' : nPlaces(qN));
      say(qPlan ? 'Správa je naplánovaná na ' + nPlaces(qN) + ' ' + qcLbl + '.' : 'Správa je odoslaná na ' + nPlaces(qN) + ' a zobrazí sa do pár sekúnd.', dlvAct(did));
    };
    // náhľad správy: aké typy zariadení ju dostanú (displej na šírku, na výšku, LED tabuľa)
    const qSelP = qSel.map(placeById).filter(Boolean);
    const qNL = qSelP.filter((p) => p.dev === 'lcd').length, qNP = qSelP.filter((p) => p.dev === 'portrait' || p.dev === 'p31').length, qNLed = qSelP.filter((p) => p.dev === 'stop' || p.dev === 'vehicle' || p.dev === 'totem').length;
    const qPvText = Q.text.trim() || Tx('Text správy');
    const qLedDev = qSelP.some((p) => p.dev === 'stop' || p.dev === 'totem') || !qNLed ? 'stop' : 'vehicle';

    // ---------- PREPNUTIE PLAYLISTU ----------
    const W = s.sw;
    const setW = (o) => set({ sw: Object.assign({}, W, o) });
    const swPlObj = plById(W.pl);
    const swDev = W.dev || (W.from === 'pl' ? (placeById(W.places[0]) || {}).dev : (swPlObj || {}).dev);
    const swPlsRows = vPls.filter((p) => p.slides.length && p.dev === swDev && p.st !== 'expirovany').map((p) => ({ name: p.name, meta: slMeta(p) + ' · ' + ST[p.st][1], on: W.pl === p.id, cur: p.id === W.cur, off: p.id === W.cur ? 'true' : 'false', pick: () => { if (p.id !== W.cur) setW({ pl: p.id }); } }));
    const swNoOther = W.step === 'pl' && !swPlsRows.some((r) => !r.cur);
    // z playlistu: miesta, kde sa už prehráva, sa neponúkajú (nebolo by čo prepnúť)
    const swCand = withDev.filter((p) => p.dev === swDev && !(W.from === 'pc' && (effPl(p) || {}).id === W.pl));
    const swPcs = swCand.map((p) => { const ep = effPl(p); return { name: p.name, subD: ep ? ep.name : '', sub: (ep ? '' : 'Bez playlistu') + (p.on ? '' : ' · offline'), on: W.places.indexOf(p.id) >= 0, pick: () => setW({ places: W.places.indexOf(p.id) >= 0 ? W.places.filter((x) => x !== p.id) : W.places.concat([p.id]) }) }; });
    const swAll = swCand.map((p) => p.id);
    const swToggle = (ids) => { const on = ids.length > 0 && ids.every((x) => W.places.indexOf(x) >= 0); setW({ places: on ? W.places.filter((x) => ids.indexOf(x) < 0) : W.places.concat(ids.filter((x) => W.places.indexOf(x) < 0)) }); };
    const swGrps = [['Všetky', swAll]].concat(GRP.map((g, i) => [g, swCand.filter((p) => p.g === i).map((p) => p.id)])).filter((x) => x[1].length > 0 && (x[0] === 'Všetky' ? swAll.length > 1 : true))
      .map((x) => ({ label: x[0] + ' (' + x[1].length + ')', on: x[1].every((id) => W.places.indexOf(id) >= 0), pick: () => swToggle(x[1]) }));
    const p2d = (n) => String(n).padStart(2, '0');
    const isoD = (d) => d.getFullYear() + '-' + p2d(d.getMonth() + 1) + '-' + p2d(d.getDate()); const isoT = (d) => p2d(d.getHours()) + ':' + p2d(d.getMinutes());
    const cDef = () => self.cDef();
    const CV = W.cFd ? W : Object.assign({}, W, cDef());
    const cFrom = new Date(CV.cFd + 'T' + (CV.cFt || '00:00')), cTo = new Date(CV.cTd + 'T' + (CV.cTt || '00:00'));
    const cErrT = isNaN(cFrom) || isNaN(cTo) ? 'Vyberte začiatok a koniec' : cTo <= cFrom ? 'Koniec musí byť neskôr ako začiatok.' : cTo <= new Date() ? 'Koniec už uplynul. Zvoľte neskorší čas.' : '';
    const fdt = (d) => d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getHours() + ':' + p2d(d.getMinutes());
    const cLbl = 'od ' + fdt(cFrom) + ' do ' + fdt(cTo);
    const swDurs = Object.keys(SWD).map((k) => ({ label: SWD[k][0], sub: k === 'custom' && W.dur === 'custom' && !cErrT ? cLbl : SWD[k][1], on: W.dur === k, pick: () => { setW(k === 'custom' && !W.cFd ? Object.assign({ dur: k }, cDef()) : { dur: k }); if (k === 'custom') { self.whSync(false); setTimeout(() => { try { const el = document.querySelector('.sheet .dtc'); if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }, 80); } } }));
    // dátum a čas sa vyberajú kolieskami priamo v aplikácii – rovnako vo všetkých prehliadačoch (bez výberu systému)
    const cEd = W.cEd === 't' ? 't' : 'f';
    const whLang = { sk: 'sk-SK', cs: 'cs-CZ', pl: 'pl-PL', en: 'en-GB', de: 'de-DE' }[WL ? WL.get() : 'sk'] || 'sk-SK';
    const day0 = new Date(); day0.setHours(0, 0, 0, 0);
    const dayAt = (i) => { const d = new Date(day0.getTime()); d.setDate(d.getDate() + i); return d; };
    const dayLbl = (i) => { if (i === 0) return Tx('Dnes'); if (i === 1) return Tx('Zajtra'); const d = dayAt(i); try { return d.toLocaleDateString(whLang, { weekday: 'short', day: 'numeric', month: 'numeric' }); } catch (e) { return d.getDate() + '. ' + (d.getMonth() + 1) + '.'; } };
    // kolieska patria panelu, ktorý je práve otvorený: prepnutie playlistu alebo rýchla správa
    const whIx = self.whIdx(s.sheet === 'quick' ? Q : W);
    const whApply = (k, i) => self.setState((st) => { const hk = st.sheet === 'quick' ? 'quick' : 'sw'; const w0 = st[hk]; const b0 = w0.cFd ? w0 : Object.assign({}, w0, self.cDef()); const ed = b0.cEd === 't' ? 't' : 'f'; const dK = ed === 'f' ? 'cFd' : 'cTd', tK = ed === 'f' ? 'cFt' : 'cTt'; const nx = Object.assign({}, self.whIdx(b0), { [k]: i }); const nd = isoD(dayAt(Math.max(0, Math.min(60, nx.d)))); const nt = p2d(Math.max(0, Math.min(23, nx.h))) + ':' + p2d(Math.max(0, Math.min(11, nx.m)) * 5); if (w0.cFd && nd === b0[dK] && nt === b0[tK]) return null;
      // posun začiatku posunie aj koniec, aby dĺžka prehrávania ostala rovnaká (koniec sa tak nedostane pred začiatok)
      const ex = {}; if (ed === 'f') { const oS = new Date(b0.cFd + 'T' + b0.cFt), nS = new Date(nd + 'T' + nt), oE = new Date(b0.cTd + 'T' + b0.cTt); if (!isNaN(oS) && !isNaN(nS) && !isNaN(oE) && oE > oS) { const nE = new Date(oE.getTime() + (nS - oS)); ex.cTd = isoD(nE); ex.cTt = p2d(nE.getHours()) + ':' + p2d(nE.getMinutes()); } }
      return { [hk]: Object.assign({}, b0, ex, { [dK]: nd, [tK]: nt }) }; });
    self._tw = self._tw || {};
    const whScroll = (k) => (e) => { const el = e.currentTarget; clearTimeout(self._tw[k]); self._tw[k] = setTimeout(() => whApply(k, Math.round(el.scrollTop / 44)), 130); };
    const whKey = (k) => (e) => { const dlt = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0; if (!dlt) return; e.preventDefault(); whApply(k, Math.max(0, Math.min({ d: 60, h: 23, m: 11 }[k], self.whIdx(self.state.sheet === 'quick' ? self.state.quick : self.state.sw)[k] + dlt))); self.whSync(false); };
    const whCol = (k, n, lbl) => Array.from({ length: n }, (_, i) => ({ label: lbl(i), on: whIx[k] === i, pick: () => { whApply(k, i); self.whSync(true); } }));
    const whDays = whCol('d', 61, dayLbl), whHours = whCol('h', 24, (i) => String(i)), whMins = whCol('m', 12, (i) => p2d(i * 5));
    const dtT = (ds, t) => { const d1 = new Date(ds + 'T00:00'); const i = Math.round((d1 - day0) / 864e5); const tt = t || '00:00'; return (i >= 0 && i <= 60 ? dayLbl(i) : d1.getDate() + '. ' + (d1.getMonth() + 1) + '.') + ' ' + parseInt(tt.slice(0, 2), 10) + ':' + tt.slice(3, 5); };
    const swEd = (x) => () => { setW(Object.assign({}, W.cFd ? {} : cDef(), { cEd: x })); self.whSync(false); };
    // rýchla správa: vlastný čas od – do (rovnaké kolieska)
    const QV = Q.cFd ? Q : Object.assign({}, Q, self.cDef(true));
    const qcFrom = new Date(QV.cFd + 'T' + (QV.cFt || '00:00')), qcTo = new Date(QV.cTd + 'T' + (QV.cTt || '00:00'));
    const qcErrT = Q.dur !== 'custom' ? '' : isNaN(qcFrom) || isNaN(qcTo) ? 'Vyberte začiatok a koniec' : qcTo <= qcFrom ? 'Koniec musí byť neskôr ako začiatok.' : qcTo <= new Date() ? 'Koniec už uplynul. Zvoľte neskorší čas.' : '';
    const qcLbl = 'od ' + fdt(qcFrom) + ' do ' + fdt(qcTo);
    const qPlan = Q.dur === 'custom' && !qcErrT && !qRun && qcFrom.getTime() > Date.now() + 30000;
    // úprava bez zmeny sa neukladá (nevznikne zbytočné doručenie ani záznam)
    const qEditIds = qIsEdit ? mIds(qEditM).filter((id) => devIds.indexOf(id) >= 0) : [];
    const qDirty = !qIsEdit || Q.text.trim() !== qEditM.text || Q.prio !== qEditM.prio || Q.pos !== qEditM.pos || !sameSet(qSel, qEditIds) || (Q.dur === 'custom' ? (qRun ? qcTo.getTime() !== (qEditM.to || 0) : qcFrom.getTime() !== (qEditM.from || 0) || qcTo.getTime() !== (qEditM.to || 0)) : Q.dur !== 'keep');
    const editMsg = (m) => { const plan = !!m.from && m.from > Date.now(); const dt = (ms) => { const d = new Date(ms); return [isoD(d), isoT(d)]; };
      const q = Object.assign(QDEF(), { text: m.text, prio: m.prio, pos: m.pos, all: !SCOPE && !!m.all, ids: m.all ? (SCOPE ? devIds.slice() : []) : m.ids.slice(), dur: plan ? 'custom' : 'keep', cEd: plan ? 'f' : 't' }, self.cDef(true));
      if (m.to && m.to > Date.now()) { const e = dt(m.to); q.cTd = e[0]; q.cTt = e[1]; }
      if (plan) { const b0 = dt(m.from); q.cFd = b0[0]; q.cFt = b0[1]; }
      set({ sheet: 'quick', qStep: 'main', qSearch: '', qTplAll: false, qEditId: m.id, quick: q, qOrd: null, confirm: '' }); };
    const qEd = Q.cEd === 't' ? 't' : 'f';
    const qEdSet = (x) => () => { setQ(Object.assign({}, Q.cFd ? {} : self.cDef(true), { cEd: x })); self.whSync(false); };
    const UNTIL = { today: 'do 23:59', h1: 'do ' + HM(60), h4: 'do ' + HM(240), rev: 'do odvolania', custom: cLbl };
    const swPlaces = shortList(names(W.places));
    const swApply = () => {
      if (!swPlObj) return;
      if (needNet()) return;
      set({ places: s.places.map((p) => W.places.indexOf(p.id) >= 0 ? Object.assign({}, p, { temp: { pl: W.pl, until: UNTIL[W.dur] } }) : p), sheet: null });
      const n = W.places.length;
      const did = addDlv('sw', swPlObj.name, W.places, { from: W.dur === 'custom' && cFrom.getTime() > Date.now() + 30000 ? cFrom.getTime() : 0 });
      logAct('sw', 'Prepnutý playlist', swPlObj.name, nPlaces(n));
      say('Odoslané – „' + swPlObj.name + '“ sa prepne na ' + n + ' ' + (n === 1 ? 'mieste' : 'miestach') + ' ' + UNTIL[W.dur] + '.', dlvAct(did));
      if (onIds(W.places).length) notify(deliveredT(swPlObj, onIds(W.places)));
    };
    const swTitle = W.step === 'pl' ? 'Čo prehrávať' : W.step === 'pc' ? 'Kde prehrávať' : 'Ako dlho';
    const swSub = W.step === 'pl' ? 'Miesto:' : W.step === 'pc' ? 'Playlist:' : 'Po skončení sa vráti pôvodný plán prehrávania.';
    const swSubD = W.step === 'pl' ? swPlaces : W.step === 'pc' ? (swPlObj ? swPlObj.name : '') : '';
    const swSub2 = W.step === 'pl' ? 'Ponúkajú sa len playlisty pre zariadenie ' + (DEV[swDev] || [''])[1] + '.' : W.step === 'pc' ? 'Ponúkajú sa len miesta so zariadením ' + (DEV[swDev] || [''])[1] + '.' : '';
    const swBtn = W.step === 'dur' && offline ? 'Bez pripojenia – nedá sa odoslať' : W.step === 'dur' ? 'Prepnúť na ' + W.places.length + ' ' + plural(W.places.length, ['mieste', 'miestach', 'miestach']) : W.step === 'pl' && (!W.pl || W.pl === W.cur) ? 'Vyberte playlist' : W.step === 'pc' && !W.places.length ? 'Vyberte miesto' : 'Ďalej';
    const swNext = () => { if (W.step === 'dur') swApply(); else setW({ step: W.step === 'pl' && W.from !== 'pl' ? 'pc' : 'dur' }); };

    // ---------- PRIDANIE FOTKY / NAHRATIE ----------
    const gmode = s.addMode === 'gallery';
    const addFile = (kind) => {
      if (needNet()) return;
      const f = makeFile(kind);
      if (gmode) { set({ gal: s.gal.concat([f]), sheet: null }); say('Súbor „' + f.name + '“ je nahratý do galérie.'); return; }
      if (s.addMode === 'ed') { const f4 = Object.assign({}, f, { used: 1, usedIn: [pl.name] }); set({ snap: snapFor(pl.id), pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { flow: 'draft', slides: p.slides.map((x) => x.id === ed.id ? Object.assign({}, x, { img: f4.col, imgName: f4.name, imgSrc: 'tel' }) : x), log: logSlide(p.log, ed.id, ed.title) }) : p), gal: s.gal.concat([f4]), sheet: null }); say('Obrázok je zmenený na „' + f4.name + '“.'); return; }
      if (s.addMode === 'sec') { const f3 = Object.assign({}, f, { used: 1, usedIn: [pl.name] }); updSec({ type: 'photo', img: f3.col, imgName: f3.name, imgSrc: 'tel' }); set({ gal: s.gal.concat([f3]), sheet: null }); say('Fotka „' + f3.name + '“ je v sekcii „' + sec.name + '“.'); return; }
      const f2 = Object.assign({}, f, { used: 1, usedIn: [pl.name] });
      addPhotoSlide(pl.id, f2, s.gal.concat([f2]), true);
      say('Fotka je pridaná na koniec playlistu. Upravte popis a trvanie.');
    };
    const addOpts = [
      { d: IC.camera, title: 'Odfotiť', sub: 'Otvorí fotoaparát telefónu', pick: () => addFile('cam') },
      { d: IC.image, title: 'Z fotiek v telefóne', sub: 'Vyberte hotovú fotku', pick: () => addFile('ph') },
      gmode ? { d: IC.upload, title: 'Zo súborov', sub: 'Video z telefónu', pick: () => addFile('vid') } : { d: IC.list, title: 'Z galérie', sub: 'Obrázky a videá už nahraté v systéme', pick: () => set({ sheet: 'pick', pickMode: s.addMode === 'sec' ? 'replaceSec' : 'add' }) }
    ].filter((o, i) => !((s.addMode === 'sec' || s.addMode === 'ed') && i === 2));
    const pickRows = s.gal.filter((g) => s.pickMode === 'secVid' ? g.type === 'vid' : s.pickMode === 'replaceSec' ? g.type === 'img' : s.pickMode === 'replace' ? g.type === (ed.isVid ? 'vid' : 'img') : g.type !== 'aud').map((g) => ({ aria: 'Vybrať ' + g.name, thS: thFile(g), d: FT[g.type][1], name: g.name, size: g.size, pick: () => {
      if (s.pickMode === 'secVid') { updSec({ type: 'video', vid: g.name, img: g.col }); set({ gal: bumpGal(s.gal, g.id, pl.name), sheet: null }); say('Video „' + g.name + '“ je v sekcii „' + sec.name + '“.'); }
      else if (s.pickMode === 'replaceSec') { updSec({ type: 'photo', img: g.col, imgName: g.name, imgSrc: 'gal' }); set({ gal: bumpGal(s.gal, g.id, pl.name), sheet: null }); say('Obrázok v sekcii „' + sec.name + '“ je zmenený na „' + g.name + '“.'); }
      else if (s.pickMode === 'replace') { set({ snap: snapFor(pl.id), pls: s.pls.map((p) => p.id === pl.id ? Object.assign({}, p, { flow: 'draft', slides: p.slides.map((x) => x.id === ed.id ? Object.assign({}, x, { img: g.col, imgName: g.name, imgSrc: 'gal' }) : x), log: logSlide(p.log, ed.id, ed.title) }) : p), gal: bumpGal(s.gal, g.id, pl.name), sheet: null }); say(ed.isVid ? 'Video je zmenené na „' + g.name + '“.' : 'Obrázok je zmenený na „' + g.name + '“.'); }
      else { addPhotoSlide(pl.id, g, bumpGal(s.gal, g.id, pl.name), true); say(g.type === 'vid' ? 'Video je pridané na koniec playlistu. Upravte názov a trvanie.' : 'Fotka je pridaná na koniec playlistu. Upravte popis a trvanie.'); }
    } }));
    const isLang = s.sheet === 'lang'; const isAcc = s.sheet === 'acc';
    const curLang = WL ? WL.get() : 'sk';
    const pickAcc = (k) => { set({ role: k, sheet: null, screen: 'home', stack: [], reorder: false, confirm: '', pcF: 'all', pq: '', filt: 'all', q: '', apvTab: 'pending', toast: '', toastDl: null, quick: QDEF(), qEditId: null, qStep: 'main', qSearch: '', qOrd: null, pcCol: {}, actF: 'all' }); say('Prepnuté na účet ' + MACC[k].name + '.'); };
    const lsRows = isAcc ? Object.keys(MACC).map((k) => ({ name: MACC[k].name, meta: MACC[k].role + ' · ' + MACC[k].desc, d: k === s.role ? IC.tick : IC.none, pick: () => pickAcc(k) })) : isLang ? (WL ? WL.list : ['sk']).map((k) => ({ name: WL ? WL.names[k] : 'Slovenčina', meta: '', d: k === curLang ? IC.tick : IC.none, pick: () => { if (WL) WL.set(k); set({ sheet: null }); } }))
      : vPls.filter((p) => p.flow !== 'pending' && !isLedDev(p.dev) && !PARTS[p.dev]).map((p) => ({ d: IC.plus, name: p.name, meta: DEV[p.dev][1] + ' · ' + slMeta(p), pick: () => { addPhotoSlide(p.id, galFile, bumpGal(s.gal, galFile.id, p.name), false); say('Pridané do playlistu „' + p.name + '“. ' + (ACC.pub ? 'Nezabudnite ho zverejniť.' : 'Nezabudnite ho odoslať na schválenie.')); } }));

    const tabs = [['home', 'Domov', IC.home], ['pls', 'Playlisty', IC.list], ['plc', 'Miesta', IC.pin], ['ai', 'AI asistent', IC.spark], ['more', 'Viac', IC.more]].map((t) => ({ label: t[1], d: t[2], cur: tabOf === t[0] ? 'page' : false, pick: () => goTab(t[0]), hasBadge: t[0] === 'more' && pendingOthers.length > 0, badge: String(pendingOthers.length) }));
    const myPend = pendAll.length;
    const moreRows = [
      { d: IC.users, title: 'Prepnúť účet', sub: ACC.name + ' · ' + ACC.role, hasBadge: false, badge: '', open: () => set({ sheet: 'acc' }) }
    ].concat(ACC.apv ? [{ d: IC.check, title: 'Schvaľovanie', sub: pendingOthers.length ? pendingOthers.length + ' ' + plural(pendingOthers.length, ['playlist čaká', 'playlisty čakajú', 'playlistov čaká']) + ' na schválenie' : 'Nič nečaká na schválenie', hasBadge: pendingOthers.length > 0, badge: String(pendingOthers.length), open: () => nav('apv', { apvTab: 'pending' }) }]
      : ACC.partner ? [{ d: IC.check, title: 'Odoslané na schválenie', sub: myPend ? myPend + ' ' + plural(myPend, ['playlist čaká', 'playlisty čakajú', 'playlistov čaká']) + ' na schválenie' : 'Nič nečaká na schválenie', hasBadge: false, badge: '', open: () => nav('apv', { apvTab: 'pending' }) }] : []).concat([
      { d: IC.image, title: 'Galéria', sub: 'Obrázky, videá a zvuky, nahratie nových súborov', hasBadge: false, badge: '', open: () => nav('gal') },
    ]).concat(canHist ? [{ d: IC.msg, title: 'História správ', sub: 'Skončené a zrušené rýchle správy, poslať znova', hasBadge: false, badge: '', open: () => nav('hist') }, { d: IC.clock, title: 'Záznam aktivít', sub: 'Kto čo zverejnil, prepol, odoslal alebo schválil', hasBadge: false, badge: '', open: () => nav('act', { actF: 'all' }) }] : []).concat([
      { d: IC.gear, title: 'Nastavenia', sub: 'Vzhľad, upozornenia, AI asistent a úložisko', hasBadge: false, badge: '', open: () => nav('set') },
      { d: IC.globe, title: 'Jazyk: ' + (WL ? WL.name() : 'Slovenčina'), sub: 'Jazyk aplikácie', hasBadge: false, badge: '', open: () => set({ sheet: 'lang' }) }
    ]);
    const pvDev = pvPl.dev;
    // detail správy z histórie: text, komu, ako dlho, kto a kedy ju odoslal a ako skončila
    const qdM = s.qh.find((h) => h.id === s.qdId) || s.qh[0] || { id: '', text: '', prio: 'info', pos: 'top', dur: 'day', all: true, ids: [] };
    const POSL = { top: 'Horný pás', bottom: 'Dolný pás', full: 'Celá obrazovka' };
    const qdObj = { text: qdM.text, prioK: PRIO[qdM.prio][1], prioT: PRIO[qdM.prio][0], posT: POSL[qdM.pos] || '', durT: qdM.dur === 'custom' ? (qdM.until || DURS.custom[0]) : (DURS[qdM.dur] || ['', ''])[0],
      by: qdM.by || '—', byRole: qdM.byRole || '', sentT: qdM.sentT || qdM.when || '—', endLbl: qdM.endKind === 'cancel' ? 'Zrušená' : 'Skončila', endT: qdM.endT || '—', hasEndBy: qdM.endKind === 'cancel' && !!qdM.endBy, endBy: qdM.endBy || '',
      allT: 'Všetky miesta (' + allDev.length + ')', isAll: !!qdM.all, notAll: !qdM.all, places: (qdM.all ? [] : qdM.ids.map(placeById).filter(Boolean)).map((x) => ({ name: x.name, sub: DEV[x.dev][1] })), whereH: 'Kam bola poslaná' + (qdM.all ? '' : ' (' + qdM.ids.length + ')') };
    const qdAgain = () => set({ sheet: 'quick', qStep: 'main', qSearch: '', qEditId: null, quick: Object.assign(QDEF(), { text: qdM.text, prio: qdM.prio, pos: qdM.pos, dur: qdM.dur === 'custom' ? 'day' : qdM.dur, all: qdM.all, ids: qdM.ids.slice() }) });

    // ---------- AI ASISTENT: chat ----------
    const AIQ = { delay: 'Napíš správu o meškaní', detour: 'Napíš správu o odklone', outage: 'Napíš správu o výluke', closed: 'Napíš správu o zatvorenej zastávke' };
    const AIH = { delay: 'Návrhy správy o meškaní:', detour: 'Návrhy správy o odklone:', outage: 'Návrhy správy o výluke:', closed: 'Návrhy správy o zatvorenej zastávke:' };
    const AIK = {
      delay: ['mesk', 'zpozd', 'opozn', 'delay', 'late', 'verspat'],
      detour: ['odklon', 'objizd', 'objazd', 'detour', 'umleit'],
      outage: ['vyluk', 'nepremav', 'nejazd', 'nejezd', 'outage', 'ausfall', 'sperrung', 'wylacz'],
      closed: ['zatvoren', 'uzavret', 'zavren', 'closed', 'zamkniet', 'geschlossen', 'gesperrt']
    };
    const aiNorm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const aiAny = (q, ws) => ws.some((w) => q.indexOf(w) >= 0);
    const aiPlaces = (q) => {
      let best = 0; const hit = [];
      vPlaces.forEach((p) => { const n = aiNorm(p.name).split(/[^a-z0-9]+/).filter((w) => w.length >= 4).filter((w) => q.indexOf(w.slice(0, 5)) >= 0).length; if (n > best) { best = n; hit.length = 0; } if (n && n === best) hit.push(p.id); });
      return hit.slice(0, 8);
    };
    const aiAnswer = (raw) => {
      const q = aiNorm(raw); const words = q.split(/[^a-z0-9]+/);
      if (aiAny(q, ['schval', 'approv', 'zatwierdz', 'genehmig', 'freigab'])) return { kind: 'apv' };
      const sit = Object.keys(AIK).find((k) => aiAny(q, AIK[k]));
      if (sit) return !canQuick ? { kind: 'noquick' } : s.aiOn.a1 ? { kind: 'draft', sit } : { kind: 'aioff' };
      if (aiAny(q, ['napis', 'navrh', 'write', 'draft', 'napisz', 'schreib', 'formul'])) return !canQuick ? { kind: 'noquick' } : s.aiOn.a1 ? { kind: 'sitask' } : { kind: 'aioff' };
      if (aiAny(q, ['expir', 'vyprs', 'abgelauf', 'wygas'])) return { kind: 'exp' };
      if (aiAny(q, ['hlasen', 'offline', 'problem', 'porucha', 'nefung', 'alert', 'storung', 'zglosz', 'meldung', 'nedzia'])) return { kind: 'prob' };
      if (aiAny(q, ['zobrazen', 'na displej', 'displayed', 'on display', 'wyswietl', 'angezeigt'])) return { kind: 'qa' };
      const ids = aiPlaces(q);
      if (ids.length) return { kind: 'play', ids };
      if (aiAny(q, ['hra', 'prehrav', 'bezi', 'playing', 'hraje', 'odtwarz', 'lauft', 'spielt'])) return { kind: 'noplace' };
      if (aiAny(q, ['pomoc', 'help', 'co vies', 'co umis', 'hilfe', 'what can'])) return { kind: 'help' };
      if (aiAny(q, ['dakuj', 'diky', 'dekuj', 'thank', 'dziek', 'danke', 'vdaka'])) return { kind: 'thanks' };
      if (words.some((w) => ['ahoj', 'cau', 'hello', 'hallo', 'hi', 'zdravim', 'czesc'].indexOf(w) >= 0) || aiAny(q, ['dobry den', 'dzien dobry', 'guten tag'])) return { kind: 'hi' };
      return { kind: 'fallback' };
    };
    const aiScroll = () => setTimeout(() => { try { const el = document.getElementById('ai-chat'); if (el) el.scrollTop = el.scrollHeight; } catch (e) {} }, 40);
    const aiAsk = (text, chip) => {
      const t = String(text || '').trim(); if (!t || s.aiTyping) return;
      if (needNet()) return;
      const ans = aiAnswer(t); const n = s.aiChat.length;
      set({ aiChat: s.aiChat.concat([{ id: n + 1, who: 'me', text: t, chip: !!chip }]), aiQ: '', aiTyping: true }); aiScroll();
      clearTimeout(self._tai); self._tai = setTimeout(() => { const c = self.state.aiChat; self.setState({ aiTyping: false, aiChat: c.concat([Object.assign({ id: c.length + 1, who: 'ai' }, ans)]) }); aiScroll(); }, 650);
    };
    const aiUse = (sit, t) => () => set({ sheet: 'quick', qStep: 'main', qSearch: '', qEditId: null, quick: Object.assign({}, s.qEditId ? QDEF() : s.quick, { text: Tx(t), tpl: null, prio: AIS[sit][1], pos: AIS[sit][1] === 'warn' ? 'top' : 'bottom' }) });
    const aiItemP = (p) => { const ep = p.n ? effPl(p) : null; return { name: p.name, subD: p.n && ep ? ep.name : '', sub: (p.n === 0 ? 'Miesto zatiaľ nemá zariadenie' : ep ? '' : 'Bez playlistu') + (p.n > 0 && !p.on ? ' · offline ' + p.off : ''), canTap: !!ep, noTap: !ep, tap: () => { if (ep) editAtPlace(p.id); }, aria: ep ? 'Upraviť playlist: ' + ep.name : '' }; };
    const aiBuild = (m) => {
      const base = { id: m.id, who: m.who, me: m.who === 'me', meChip: m.who === 'me' && !!m.chip, meTyped: m.who === 'me' && !m.chip, ai: m.who === 'ai', text: '', items: [], sugg: [], acts: [], note: '' };
      if (m.who === 'me') return Object.assign(base, { text: m.text });
      const r = base; const A = (label, fn) => r.acts.push({ label, fn });
      if (m.kind === 'draft') { r.text = AIH[m.sit]; r.sugg = AIS[m.sit][2].map((t) => ({ text: t, use: aiUse(m.sit, t), useA: 'Použiť návrh: ' + t })); r.note = 'Tlačidlo Použiť otvorí rýchlu správu s týmto textom. Pred odoslaním ho môžete upraviť.'; }
      else if (m.kind === 'sitask') { r.text = 'O čom má byť správa? Vyberte situáciu.'; Object.keys(AIS).forEach((k) => A(AIS[k][0], () => aiAsk(AIQ[k], true))); }
      else if (m.kind === 'aioff') { r.text = 'Návrh textu správy je vypnutý v nastavení AI asistenta.'; A('Otvoriť nastavenie', () => nav('set')); }
      else if (m.kind === 'prob') { const ps = vPlaces.filter(pcProb); if (!ps.length) r.text = 'Všetky miesta sú v poriadku.'; else { r.text = 'Tieto miesta majú hlásenie:'; r.items = ps.map((p) => Object.assign(aiItemP(p), { subD: '', sub: p.on ? 'Expirovaný playlist' : 'offline ' + p.off })); A('Zobraziť v Miestach', () => set({ screen: 'plc', stack: [], sheet: null, pcF: 'prob', pq: '' })); } }
      else if (m.kind === 'exp') { const ps = vPls.filter((p) => p.st === 'expirovany'); if (!ps.length) r.text = 'Žiadny playlist neexpiroval.'; else { r.text = 'Tieto playlisty expirovali:'; r.items = ps.map((p) => ({ name: p.name, subD: '', sub: DEV[p.dev][1], canTap: true, noTap: false, tap: () => nav('pl', { plId: p.id }), aria: 'Upraviť playlist: ' + p.name })); A('Zobraziť v Playlistoch', () => set({ screen: 'pls', stack: [], sheet: null, filt: 'expirovany', q: '' })); } }
      else if (m.kind === 'play') { r.text = 'Na týchto miestach sa teraz prehráva:'; r.items = m.ids.map(placeById).filter(Boolean).filter((p) => vPlaces.indexOf(p) >= 0).map(aiItemP); }
      else if (m.kind === 'noplace') r.text = 'Ktoré miesto myslíte? Napíšte jeho názov, napríklad Hlavná stanica alebo Nemocnica.';
      else if (m.kind === 'apv') {
        if (ACC.apv) { if (!pendingOthers.length) r.text = 'Nič nečaká na schválenie.'; else { r.text = 'Na schválenie čaká:'; r.items = pendingOthers.map((a) => ({ name: a.name, subD: a.author, sub: ' · ' + a.when, canTap: true, noTap: false, tap: () => nav('ad', { adId: a.id, apvNote: '' }), aria: a.name })); A('Otvoriť schvaľovanie', () => nav('apv', { apvTab: 'pending' })); } }
        else if (ACC.partner) { if (!pendAll.length) r.text = 'Nič nečaká na schválenie.'; else { r.text = 'Na schválenie ste odoslali:'; r.items = pendAll.map((a) => ({ name: a.name, subD: '', sub: a.when, canTap: false, noTap: true, tap: () => {}, aria: '' })); A('Otvoriť schvaľovanie', () => nav('apv', { apvTab: 'pending' })); } }
        else r.text = 'Zmeny zverejňujete priamo, schvaľovanie robí správca.';
      }
      else if (m.kind === 'qa') { r.text = qaRows.some((x) => !x.plan) ? 'Na displejoch sú teraz tieto správy:' : 'Teraz nie je zobrazená žiadna rýchla správa.'; r.items = qaRows.filter((x) => !x.plan).concat(qaRows.filter((x) => x.plan)).map((x) => ({ name: x.text, subD: '', sub: (x.plan ? 'Naplánovaná · ' : '') + x.prioT + ' · ' + x.meta, canTap: false, noTap: true, tap: () => {}, aria: '' })); if (canQuick) A('Nová rýchla správa', openQuick); }
      else if (m.kind === 'noquick') r.text = 'Rýchle správy posiela len dopravca. Váš účet ich písať nemôže.';
      else if (m.kind === 'help') r.text = canQuick ? 'Viem napísať text rýchlej správy, nájsť miesta s hlásením, povedať, čo sa kde prehráva, a ukázať, čo čaká na schválenie alebo je zobrazené.' : 'Viem nájsť miesta s hlásením, povedať, čo sa kde prehráva, a ukázať, čo ste odoslali na schválenie alebo čo je zobrazené.';
      else if (m.kind === 'thanks') r.text = 'Rado sa stalo. Ak treba, pýtajte sa ďalej.';
      else if (m.kind === 'hi') r.text = 'Dobrý deň. S čím vám pomôžem?';
      else r.text = 'Tomuto zatiaľ nerozumiem. Skúste jednu z otázok nad poľom na písanie.';
      return Object.assign(r, { hasItems: r.items.length > 0, hasSugg: r.sugg.length > 0, hasActs: r.acts.length > 0, hasNote: !!r.note });
    };
    const aiMsgs = s.aiChat.map(aiBuild);
    const aiChipQ = (canQuick ? ['Napíš správu o meškaní', 'Napíš správu o odklone'] : []).concat(['Ktoré miesta majú hlásenie?', ACC.partner ? 'Čo sa hrá na Parkovisku Centrum?' : 'Čo sa hrá na Hlavnej stanici?', 'Ktoré playlisty expirovali?']).concat(ACC.apv || ACC.partner ? ['Čo čaká na schválenie?'] : []).concat(['Ktoré správy sú zobrazené?']);
    const aiChips = aiChipQ.map((t) => ({ label: t, ask: () => aiAsk(t, true) }));

    // ---------- DETAIL MIESTA ----------
    const pdEp = pdP.n ? effPl(pdP) : null; const pdBase = pdP.n ? plById(pdP.pl) : null; const pdBtn = plBtn(pdEp);
    const pdMsgs = s.qa.filter((m) => mIds(m).indexOf(pdP.id) >= 0).map(qaRow);
    const pdDl = (s.dlv || []).filter((d) => d.pcs.indexOf(pdP.id) >= 0).slice(0, 3).map((d) => { const k = dSt(d, pdP.id, 0); return { kindT: DKIND[d.kind], name: d.name, tT: d.tT, k: DST[k], t: dStT(d, k), open: () => openDl(d.id), openA: 'Stav doručenia: ' + d.name }; });
    const pd = {
      hasDev: pdP.n > 0, noDev: pdP.n === 0, isOff: pdP.n > 0 && !pdP.on, dotK: pdP.on ? 'ok' : 'bad', stT: pdP.on ? 'Online' : 'Offline', seenT: pdP.on ? 'Posledný kontakt ' + pdP.seen : 'Bez spojenia ' + pdP.off,
      devT: DEV[pdP.dev][0], devN: pdP.n + ' ' + plural(pdP.n, ['zariadenie', 'zariadenia', 'zariadení']), grpT: pdP.g >= 0 ? GRP[pdP.g] : 'Bez skupiny', grpTr: pdP.g >= 0 ? 'no' : 'yes',
      hasPl: !!pdEp, noPl: pdP.n > 0 && !pdEp, thS: 'width:56px;height:56px;border-radius:12px;flex:none;background:' + tile(pdEp), plName: pdEp ? pdEp.name : '', hasSt: !!PST[pdP.st], stK: (PST[pdP.st] || ['grey', ''])[0], plStT: (PST[pdP.st] || ['grey', ''])[1],
      temp: !!pdP.temp, until: pdP.temp ? pdP.temp.until : '', revert: () => revertAt(pdP), planT: pdEp ? pdEp.plan : '',
      canEdit: pdBtn.canEdit, editT: pdBtn.editT, editA: pdBtn.editA, editK: pdBtn.editK, edit: () => editAtPlace(pdP.id), canSw: ACC.pub, change: () => swForPlace(pdP.id), changeA: 'Prepnúť playlist na mieste: ' + pdP.name,
      prev: () => { if (pdEp) openPrev(pdEp.id); }, prevA: 'Náhľad playlistu: ' + (pdEp ? pdEp.name : ''),
      nextT: pdP.temp ? 'Po skončení dočasného prepnutia sa vráti playlist:' : 'Bez zmeny. Playlist pokračuje podľa plánu.', hasNextName: !!pdP.temp && !!pdBase, nextName: pdP.temp && pdBase ? pdBase.name : '',
      msgs: pdMsgs, hasMsgs: pdMsgs.length > 0, noMsgs: pdMsgs.length === 0, canQuick,
      quick: () => set({ sheet: 'quick', qStep: 'main', qSearch: '', qTplAll: false, qEditId: null, confirm: '', quick: Object.assign(QDEF(), { all: false, ids: [pdP.id] }) }),
      dl: pdDl, hasDl: pdDl.length > 0
    };

    // ---------- DOMOV: čo vyžaduje pozornosť ----------
    const goPlc = (f) => () => set({ screen: 'plc', stack: [], sheet: null, reorder: false, confirm: '', pq: '', pcF: f, pcCol: {} });
    const goPls = (f) => () => set({ screen: 'pls', stack: [], sheet: null, reorder: false, confirm: '', q: '', filt: f });
    const offPs = withDev.filter((p) => !p.on), expPs = withDev.filter((p) => p.st === 'exp');
    const noUp = ACC.pub ? vPls.filter((p) => p.st === 'nenahraty' && p.where.length > 0 && p.flow !== 'pending') : [];
    const soonA = ACC.pub ? soonPls : [];
    // partner: playlist vrátený na úpravu (kým ho znova neodošle)
    const retApv = ACC.partner ? s.apvs.filter((a) => isOwn(a) && a.state === 'returned' && s.apvs.find((b) => b.plId === a.plId && isOwn(b)) === a) : [];
    const AT = (k, d, n, forms, list, fn) => ({ k, d, title: n + ' ' + plural(n, forms), sub: shortList(list), fn });
    const attn = []
      .concat(offPs.length ? [AT('bad', IC.warn, offPs.length, ['miesto je offline', 'miesta sú offline', 'miest je offline'], offPs.map((p) => p.name), goPlc('off'))] : [])
      .concat(expPs.length ? [AT('bad', IC.clock, expPs.length, ['miesto má expirovaný playlist', 'miesta majú expirovaný playlist', 'miest má expirovaný playlist'], expPs.map((p) => p.name), goPlc('exp'))] : [])
      .concat(soonA.length ? [AT('warn', IC.clock, soonA.length, ['playlist čoskoro expiruje', 'playlisty čoskoro expirujú', 'playlistov čoskoro expiruje'], soonA.map((p) => p.name), goPls('soon'))] : [])
      .concat(noUp.length ? [AT('warn', IC.upload, noUp.length, ['playlist čaká na nahratie', 'playlisty čakajú na nahratie', 'playlistov čaká na nahratie'], noUp.map((p) => p.name), goPls('nenahraty'))] : [])
      .concat(pendingOthers.length ? [AT('warn', IC.check, pendingOthers.length, ['playlist čaká na schválenie', 'playlisty čakajú na schválenie', 'playlistov čaká na schválenie'], pendingOthers.map((a) => a.name), () => nav('apv', { apvTab: 'pending' }))] : [])
      .concat(retApv.length ? [AT('blue', IC.edit, retApv.length, ['playlist je vrátený na úpravu', 'playlisty sú vrátené na úpravu', 'playlistov je vrátených na úpravu'], retApv.map((a) => a.name), () => (retApv.length === 1 ? nav('ad', { adId: retApv[0].id, apvNote: '' }) : nav('apv', { apvTab: 'done' })))] : []);
    // posledné nahratia playlistov a prepnutia (správy majú stav doručenia priamo pri sebe)
    const dlRecent = (s.dlv || []).filter((d) => d.kind !== 'msg' && dPcs(d).length > 0).slice(0, 3).map((d) => { const u = dSum(d); return { kindT: DKIND[d.kind], name: d.name, tT: d.tT, pillK: u.pillK, pillT: u.pillT, t: u.t, hasWait: u.hasWait, waitT: u.waitT, open: () => openDl(d.id), openA: 'Stav doručenia: ' + d.name }; });

    // ---------- STAV DORUČENIA (panel) ----------
    const dlM = (s.dlv || []).find((d) => d.id === s.dlId) || (s.dlv || [])[0] || { id: '', kind: 'msg', name: '', at: 0, tT: '', by: '', pcs: [] };
    const dlU = dSum(dlM);
    const dlObj = { kindT: DKIND[dlM.kind], name: dlM.name, tT: dlM.tT, by: dlM.by, pillK: dlU.pillK, pillT: dlU.pillT, t: dlU.t, hasWait: dlU.hasWait, waitT: dlU.waitT, whereH: 'Miesta (' + dlU.n + ')',
      rows: dlU.ids.map((id, i) => { const p = placeById(id) || { name: '', dev: 'lcd', off: '' }; const k = dlU.st[i]; return { name: p.name, sub: DEV[p.dev][1] + (k === 'wait' ? ' · offline ' + p.off : ''), k: DST[k], t: dStT(dlM, k), ord: k === 'wait' ? 0 : k === 'send' ? 1 : 2 }; }).sort((a, b) => a.ord - b.ord),
      hasNote: dlU.hasWait || dlU.k === 'plan', note: dlU.k === 'plan' ? 'Obsah sa na zariadenia pošle v naplánovanom čase.' : 'Na offline miesta sa obsah doručí hneď po pripojení zariadenia.' };

    // ---------- ZÁZNAM AKTIVÍT (len Admin a Director) ----------
    const ACK = { pl: IC.list, sw: IC.pin, msg: IC.msg, apv: IC.check };
    const actOk = (a, f) => f === 'all' || (f === 'pl' ? a.k === 'pl' || a.k === 'sw' : a.k === f);
    const actChips = [['all', 'Všetko'], ['pl', 'Playlisty'], ['msg', 'Správy'], ['apv', 'Schvaľovanie']].map((c) => ({ label: c[1], n: (s.acts || []).filter((a) => actOk(a, c[0])).length, on: s.actF === c[0], pick: () => set({ actF: c[0] }) }));
    const actRows = (s.acts || []).filter((a) => actOk(a, s.actF)).map((a) => ({ d: ACK[a.k] || IC.info, t: a.t, name: a.name, by: a.by, role: a.role, meta: a.when + (a.extra ? ' · ' + a.extra : '') }));

    const tDl = s.toastDl ? (s.dlv || []).find((d) => d.id === s.toastDl) : null; const tDlU = tDl ? dSum(tDl) : null;

    return {
      ic: IC, meName: ACC.name, meIni: ACC.ini, meRole: ACC.role + ' · ' + (ACC.partner ? 'zmluvný partner DP Riečany' : ME.org), homeHi: ACC.first ? 'Dobrý deň, ' + ACC.first : 'Dobrý deň', canSwPl: ACC.pub && pl.st !== 'expirovany' && pl.slides.length > 0,
      themeAttr: s.theme === 'dark' || s.theme === 'auto' ? s.theme : 'light',
      fdHome: s.fdark && !s.fdOk, fdSet: s.fdark || s.samsung, fdHide: () => { set({ fdOk: true }); try { localStorage.setItem('wz_m_fdark_ok', '1'); } catch (e) {} },
      themeOpts: [['light', 'Svetlý'], ['dark', 'Tmavý'], ['auto', 'Podľa telefónu']].map((t) => ({ label: t[1], on: s.theme === t[0], pick: () => { set({ theme: t[0] }); try { localStorage.setItem('wz_m_theme', t[0]); } catch (e) {} } })), homeDate: ((d) => DOWN[d.getDay()] + ' ' + d.getDate() + '. ' + MONG[d.getMonth()])(new Date()) + ' · DP Riečany',
      hdS: 'background:' + (dark ? 'var(--hddk)' : 'var(--sf)') + ';color:' + (dark ? '#fff' : 'var(--tx)') + ';' + (dark ? '' : 'border-bottom:1px solid var(--ln)'),
      subS: 'color:' + (dark ? '#B4C6C6' : 'var(--mut)'),
      hasBack: !tabRoot, goBack, hdLogo, hdTitle, hasSub: !!hdSub, hdSub, hdActs, tabs, hdT1Tr: sc === 'pl' || sc === 'pd' ? 'no' : 'yes', hdT2Tr: sc === 'sl' || sc === 'pv' ? 'no' : 'yes',
      s_home: sc === 'home', s_pls: sc === 'pls', s_pl: sc === 'pl', s_sl: sc === 'sl', s_apv: sc === 'apv', s_ad: sc === 'ad', s_gal: sc === 'gal', s_more: sc === 'more', s_hist: sc === 'hist', s_act: sc === 'act' && canHist, s_pd: sc === 'pd', s_plc: sc === 'plc', s_set: sc === 'set', s_ai: sc === 'ai', s_pv: sc === 'pv',
      sh_quick: s.sheet === 'quick', sh_sw: s.sheet === 'sw', sh_add: s.sheet === 'add', sh_pick: s.sheet === 'pick', sh_gd: s.sheet === 'gd', sh_lib: s.sheet === 'lib', sh_list: s.sheet === 'gpl' || isLang || isAcc, sh_qd: s.sheet === 'qd' && canHist, qd: qdObj, qdAgain, sh_dl: s.sheet === 'dl', dl: dlObj,
      closeSheet, bgClose: (e) => { if (e && e.target === e.currentTarget) closeSheet(); }, hasToast: !!s.toast, toast: s.toast, toastOk: !s.toastBad, toastBad: !!s.toastBad, hasToastDl: !!s.toast && !!tDlU, toastDlT: tDlU ? tDlU.t : '', toastDlHasW: !!tDlU && tDlU.hasWait, toastDlW: tDlU ? tDlU.waitT : '',
      offline, netSim: !!s.netSim, netAtT: s.netAt ? 'Údaje sú z ' + s.netAt + '.' : '', netEnd: () => { set({ netSim: false }); if (s.netReal !== false) say('Pripojenie je späť. Môžete pokračovať.'); },
      attn, hasAttn: attn.length > 0, attnOk: attn.length === 0, dlRecent, hasDlRecent: dlRecent.length > 0, pd, actChips, actRows, actEmpty: actRows.length === 0, protoRows, hasPush: !!s.push, pushTitle: s.push ? s.push.title : '', pushText: s.push ? s.push.text : '', closePush: () => set({ push: null }),
      // domov
      openQuick, hasQa: qaRows.some((x) => !x.plan), qa: qaRows.filter((x) => !x.plan), hasQaPlan: qaRows.some((x) => x.plan), qaPlan: qaRows.filter((x) => x.plan), hasPend: pendingOthers.length > 0, goApprovals: () => nav('apv', { apvTab: 'pending' }), pendT: pendingOthers.map((a) => a.name).slice(0, 2).join(' · ') + (pendingOthers.length > 2 ? ' · …' : ''), pendN: String(pendingOthers.length),
      nowRows, pcOn: String(pcOnN), pcDev: String(withDev.length), goPlaces: () => set({ screen: 'plc', stack: [], sheet: null, reorder: false, confirm: '', pq: '', pcF: withDev.some(pcProb) ? 'prob' : 'all' }), pcBarS: 'height:100%;border-radius:4px;background:#2E9E4F;width:' + (withDev.length ? Math.round(100 * pcOnN / withDev.length) : 0) + '%',
      pcOff: withDev.filter((p) => !p.on).map((p) => ({ name: p.name, since: p.off })), pcHasExp: expN > 0, pcExpT: expN + ' ' + plural(expN, ['miesto má', 'miesta majú', 'miest má']) + ' expirovaný playlist', qh: qhRows, qhHas: qhRows.length > 0, qhEmpty: qhRows.length === 0,
      // playlisty
      q: s.q, setQ: (e) => set({ q: e.target.value }), plChips, plRows, plEmpty: plRows.length === 0,
      // detail playlistu
      hasSlides: pl.slides.length > 0, noSlides: pl.slides.length === 0, prvParts: prvOf(pl, 104), prvS: stackS(pl), noSlidesT: plTotem ? 'Playlist zatiaľ nemá žiadnu snímku. Pridajte snímku zo zoznamu.' : plLed ? 'Playlist zatiaľ nemá žiadnu snímku. Pridajte text alebo snímku zo zoznamu.' : 'Playlist zatiaľ nemá žiadnu snímku. Pridajte fotku alebo snímku zo zoznamu.',
      plNotLed: !plLed && !plTotem, plDevT: DEV[pl.dev][0],
      openPrev: () => openPrev(pl.id), plStK: ST[pl.st][0], plStT: ST[pl.st][1], plSoon: isSoon(pl), plSoonT: isSoon(pl) ? soonT(pl) : '', plSoonNote: isSoon(pl) ? 'Platnosť playlistu skončí o ' + pl.soon + ' ' + plural(pl.soon, ['deň', 'dni', 'dní']) + '. Potom sa na miestach prestane prehrávať.' : '', plCanExt: isSoon(pl) && ACC.pub && plFull && !locked, extend, whereRows, plTouch: pl.touch, plHasFlow: pl.flow !== 'none', plFlowK: (FLOW[pl.flow] || ['', ''])[0], plFlowT: (FLOW[pl.flow] || ['', ''])[1],
      plMeta: slMeta(pl), locked, lockT, swFromPl: () => swForPl(pl.id), whereT, hasWhere: !!whereT, whereNoneT, hasWhereNone: !!whereNoneT, plTemp, planT: pl.plan, slCount: String(pl.slides.length), canReorder: canEdit && plFull && (pl.slides.length > 1 || s.reorder), toggleReorder: () => set({ reorder: !s.reorder, confirm: '' }), reorderT: s.reorder ? 'Hotovo' : 'Upraviť poradie',
      slRows, canAddLcd: canEdit && plFull && !plLed && !plTotem, canAddLed: canEdit && plFull && plLed, canAddTotem: canEdit && plFull && plTotem, openAdd, addLed, mainAct: mainAct || { k: '', label: '', fn: () => {} }, hasMain: !!mainAct, prevBtnS: mainAct ? '' : 'flex:1',
      plHasOwner: !!pl.owner, plOwnerT: plOwnBy(pl) ? 'Váš playlist' : 'Tretia strana: ' + (pl.owner || ''),
      plScope: !plFull, plScopeT: pl.slides.some(slOwn) ? 'Playlist spravuje DP Riečany. Upravovať môžete len svoje sekcie – snímky s vašou sekciou sú označené.' : 'Playlist spravuje DP Riečany. Môžete si ho len pozrieť.',
      plChg: pl.log.map((x) => ({ k: CHG[x[0]][0], sym: CHG[x[0]][1], text: x[1] })), hasPlChg: pl.flow === 'draft' && (pl.log.length > 0 || canDiscard), plChgH: (ACC.pub ? 'Nezverejnené zmeny' : 'Neodoslané zmeny') + ' · ' + pl.log.length,
      canDiscard, discard, discardT: s.confirm === 'dz' ? 'Potvrdiť zahodenie' : 'Zahodiť zmeny', discardK: s.confirm === 'dz' ? 'df' : 'd', discardCf: s.confirm === 'dz',
      openLib, libRows, libEmpty: libRows.length === 0, libEmptyT: lql ? 'Žiadna snímka nezodpovedá hľadaniu.' : 'Pre toto zariadenie zatiaľ nie je v zozname žiadna ďalšia snímka.', libQ: s.libQ, setLibQ: (e) => set({ libQ: e.target.value }), libDevT: 'Pre zariadenie: ' + DEV[pl.dev][1],
      // editor
      ed, edRdev: edR, edW: String(edPart ? edPart[5] : isPort(pl.dev) ? 190 : fw(338)), edDevT: DEV[pl.dev][0] + (edPart ? ' · ' + edPart[1] : ''), edClock, clkOpts, edHasDur: !edClock, edLedField: edLedR && !edClock, setTitle: (e) => upd({ title: e.target.value }), setText: (e) => upd({ text: e.target.value }),
      edLcd: !edLedR, edFull, edRo: !edFull, edLedText, edLedLen: ed.title.length + ' znakov' + (edR === 'vehicle' ? ' · dlhší text po tabuli beží' : ' · dlhší text sa zalomí do riadkov'),
      edHasText: !edLedR && ed.kind === 'info', edTextLbl: 'Text snímky', edTextRows: 3, edIsDeps: ed.kind === 'deps', edLines, secLines,
      edTitleErr: edEmpty, edTitleErrT: ed.kind === 'led' ? 'Text nemôže byť prázdny.' : 'Názov nemôže byť prázdny.',
      edIsPhoto: !edLedR && ed.kind === 'photo', edImgLbl: ed.isVid ? 'Video' : 'Obrázok', edNotVid: !ed.isVid, edImgS: 'display:block;width:56px;height:56px;border-radius:10px;flex:none;background:' + GRAD(ed.img || '#C9D2D2'), edImgName: ed.imgName || 'bez obrázka', edImgSrcT: ed.isVid ? 'Video z galérie · prehráva sa bez zvuku' : ed.imgSrc === 'tel' ? 'Nová fotka z telefónu · uložená v galérii' : 'Z galérie', openPickReplace: () => set({ sheet: 'pick', pickMode: 'replace', addMode: null }), openAddEd: () => set({ sheet: 'add', addMode: 'ed' }),
      edHasBg: !edLedR && ed.kind !== 'photo' && ed.kind !== 'tpl', bgSw, durMinus: () => upd({ dur: Math.max(5, ed.dur - 5) }), durPlus: () => upd({ dur: Math.min(120, ed.dur + 5) }),
      edLed: edLedR, edFieldLbl: ed.kind === 'deps' ? 'Pole za číslom linky' : 'Pole (pozadie za textom)', ledSizes, ledAligns, ledColSw, ledBgSw,
      ledHint: ed.kind === 'deps' ? 'Číslo linky je vždy tmavé na farebnom poli.' : 'S poľom je text tmavý na farebnom podklade. Bez poľa je pozadie čierne.', delSlideEd: delEd, delEdT: s.confirm === 'ed' ? 'Potvrdiť odstránenie' : 'Odstrániť z playlistu', delEdK: s.confirm === 'ed' ? 'df' : 'd', edCanDel, edNoDel: !edCanDel,
      delEdNote: s.confirm === 'ed' ? 'Ťuknite ešte raz a snímka sa odstráni z playlistu.' : 'Snímka sa nezmaže, ostane v zozname snímok a môžete ju znova pridať.',
      edNoDelT: ed.kind === 'clock' ? 'Čas a dátum sa z tohto displeja nedá odstrániť.' : plTotem ? 'Je to jediná snímka tohto displeja, preto sa nedá odstrániť. Najprv pridajte inú.' : 'Je to jediná snímka playlistu, preto sa nedá odstrániť. Najprv pridajte inú.',
      edTpl, edSx: SX(ed), edZones, edSecName: sec.name, edSecT: 'Sekcia: ' + sec.name, secCan, secLocked: edTpl && !secCan, secLockT: sec.owner && !ACC.partner ? 'Túto sekciu spravuje tretia strana – ' + sec.owner + '. Jej obsah meniť nemôžete.' : 'Túto sekciu spravuje DP Riečany. Upravovať môžete len sekcie svojej plochy.', secMine: ACC.partner && sec.owner === ACC.name, edHasOwn: edOwners.length > 0, edOwnT: 'Šrafované sekcie patria tretej strane: ' + edOwners.join(', ') + '.', secTypes, ctDevT: 'Ponuka podľa zdrojov dát a zariadenia: ' + DEV[pl.dev][1] + '.', openCt: () => set({ sheet: 'ct' }), ctCurT: ctCur[1], ctCurSub: ctCur[2], ctCurD: IC[ctCur[3]], ctCurA: 'Zmeniť obsah sekcie: ' + ctCur[1], secSrcHas: secCan && !!ctCur[4], secSrcT: ctCur[4] ? 'Zdroj dát: ' + SRC[ctCur[4]][0] : '', secIsVideo: secCan && sec.type === 'video', secIsWeb: secCan && sec.type === 'web', secIsMap: secCan && sec.type === 'map', secIsWeather: secCan && sec.type === 'weather', secIsLine: secCan && sec.type === 'line', secIsMenu: secCan && sec.type === 'menu', secIsCal: secCan && sec.type === 'cal', secIsClock: secCan && sec.type === 'clock', setSecUrl: (e) => updSec({ url: e.target.value }), setSecTiles: (e) => updSec({ tiles: e.target.value }), mapRads: ['200 m', '500 m', '1 km'].map((r) => ({ label: r, on: sec.rad === r, pick: () => updSec({ rad: r }) })), lineChips: Object.keys(TTD).map((l) => ({ label: l, aria: 'Linka ' + l, on: sec.line === l, pick: () => updSec({ line: l, dir: TTD[l][0] }) })), openPickVid: () => set({ sheet: 'pick', pickMode: 'secVid' }), secVidName: sec.vid || 'bez videa', secVidS: 'display:block;width:56px;height:56px;border-radius:10px;flex:none;background:' + GRAD(sec.img || '#2F62B0'), sh_ct: s.sheet === 'ct', srcRows: Object.keys(SRC).map((k) => ({ name: SRC[k][0], on: SRC[k][1], stK: SRC[k][1] ? 'ok' : 'grey', stT: SRC[k][1] ? 'Pripojený' : 'Nepripojený' })),
      secIsText: secCan && sec.type === 'text', secIsPhoto: secCan && sec.type === 'photo', secIsDeps: secCan && sec.type === 'deps', secIsTt: secCan && sec.type === 'tt', secHasImg: !!sec.img, secNoImg: !sec.img, ttLines, ttDirs, sec, secBgSw, secBgOn: secCan && ['text', 'deps', 'tt', 'line', 'clock', 'cal'].indexOf(sec.type) >= 0, setSecText: (e) => updSec({ text: e.target.value }), setSecCap: (e) => updSec({ cap: e.target.value }), secImgS: 'display:block;width:56px;height:56px;border-radius:10px;flex:none;background:' + GRAD(sec.img || '#C9D2D2'), secImgName: sec.imgName || 'bez obrázka', openPickSec: () => set({ sheet: 'add', addMode: 'sec' }), openGalSec: () => set({ sheet: 'pick', pickMode: 'replaceSec', addMode: null }), secImgSrcT: sec.imgSrc === 'tel' ? 'Nová fotka z telefónu · uložená v galérii' : 'Z galérie', edVzT: 'Rozloženie plochy určuje vzor „' + (ed.vz || '') + '“. V mobilnej aplikácii sa vzor nedá zmeniť ani ďalej rozdeliť.',
      // schvaľovanie
      apvTabs, apvRows, apvEmpty: apvRows.length === 0, apvEmptyT: s.apvTab === 'pending' ? (ACC.apv ? 'Všetko je vybavené. Nič nečaká na schválenie.' : 'Nič nečaká na schválenie.') : 'Zatiaľ tu nie je nič vybavené.',
      ad: adObj,
      adSlides: adPl.slides.map((x) => ({ sx: SX(x), dev: rdev(adPl, x), w: String(stW(adPl, x)), itemS: 'flex:none;width:' + stW(adPl, x) + 'px', kind: x.kind, title: x.title, text: x.text, bg: x.bg, img: x.img, ledSize: x.ledSize, ledAlign: x.ledAlign, ledCol: x.ledCol, ledBg: x.ledBg })), adChanges: ad.changes.map((c) => ({ k: CHG[c[0]][0], sym: CHG[c[0]][1], text: c[1] })),
      adCanAct, apvNote: s.apvNote, setApvNote: (e) => set({ apvNote: e.target.value }), adDone: ad.state !== 'pending',
      apvApprove: () => decide('approved', (ACC.f ? 'Schválila ' : 'Schválil ') + ACC.name + ' · teraz. Playlist sa nahráva na ' + nPlaces(adPl.where.length || 1) + '.', 'Schválené a zverejnené: ' + ad.name),
      apvReturn: needNote(() => decide('returned', (ACC.f ? 'Vrátila na úpravu ' : 'Vrátil na úpravu ') + ACC.name + ' · teraz.', 'Vrátené autorovi na úpravu: ' + ad.name)),
      apvReject: needNote(() => decide('rejected', (ACC.f ? 'Zamietla ' : 'Zamietol ') + ACC.name + ' · teraz.', 'Zamietnuté: ' + ad.name)),
      apvErr: !!s.apvErr && !s.apvNote.trim(),
      adOwn: isOwn(ad) && ad.state === 'pending', apvWithdraw: () => { if (needNet()) return; logAct('apv', 'Vzaté späť zo schvaľovania', ad.name); set(Object.assign({ apvs: s.apvs.filter((a) => a.id !== ad.id), pls: s.pls.map((p) => p.id === ad.plId ? Object.assign({}, p, { flow: 'draft', log: backLog(ad) }) : p) }, backState())); say('Vzaté späť. Playlist môžete znova upravovať.'); },
      // galéria
      galChips, galRows, galEmpty: galRows.length === 0, openUpload: () => set({ sheet: 'add', addMode: 'gallery' }),
      gd, gdUsed: galFile.used > 0, gdUseRows: galFile.usedIn.map((n) => { const p = s.pls.find((x) => x.name === n); return { name: n, sub: p ? DEV[p.dev][1] + ' · ' + slMeta(p) : '', canOpen: !!p && vPls.indexOf(p) >= 0, noOpen: !(p && vPls.indexOf(p) >= 0), open: () => { if (p) nav('pl', { plId: p.id, sheet: null }); }, aria: 'Upraviť playlist: ' + n }; }), gdUseH: (galFile.type === 'aud' ? 'Použité v hláseniach (' : 'Použité v playlistoch (') + galFile.usedIn.length + ')', gdCanUse: galFile.type !== 'aud', gdAddToPl: () => set({ sheet: 'gpl', gplFile: galFile.id }),
      lsTitle: isAcc ? 'Prepnúť účet' : isLang ? 'Jazyk aplikácie' : 'Pridať do playlistu', lsSub: isAcc ? 'Prototyp: aplikácia sa zobrazí tak, ako ju vidí vybraný účet.' : isLang ? 'Zmení sa jazyk tlačidiel, nadpisov a hlásení. Obsah playlistov a názvy miest ostávajú tak, ako ste ich napísali.' : 'Súbor „' + galFile.name + '“ sa pridá ako nová snímka na koniec playlistu. Ponúkajú sa len playlisty pre displeje.', lsRows,
      // viac / miesta / nastavenia / AI
      moreRows, logout: () => say('Prototyp: odhlásenie nie je zapojené.'), pq: s.pq, setPq: (e) => set({ pq: e.target.value }), pcChips, pcRows, pcGroups, pcEmpty: pcRows.length === 0, pcFootT: 'Zobrazených ' + pcRows.length + ' z ' + vPlaces.length + ' miest',
      notifRows, aiRows,
      aiHi: ACC.first ? 'Dobrý deň, ' + ACC.first + '. S čím vám pomôžem?' : 'Dobrý deň. S čím vám pomôžem?', aiIntro: canQuick ? 'Napíšem text rýchlej správy, nájdem miesta s hlásením, poviem, čo sa kde prehráva, a ukážem, čo čaká na schválenie.' : 'Nájdem miesta s hlásením, poviem, čo sa kde prehráva, a ukážem, čo ste odoslali na schválenie.', canQuick, aiMsgs, aiChips, aiTyping: s.aiTyping, aiQ: s.aiQ, aiNoQ: !s.aiQ.trim() || s.aiTyping, setAiQ: (e) => set({ aiQ: e.target.value }), aiSend: () => aiAsk(s.aiQ, false), aiKey: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); aiAsk(s.aiQ, false); } },
      // náhľad
      pvHas: pvParts.length > 0, pvNone: pvParts.length === 0, pvParts, pvWrapS: stackS(pvPl), pvDevT: DEV[pvDev][0], pvSegs: pvTot ? [] : pvSegs,
      pvCap: pvTot ? 'Tri displeje sa prehrávajú súčasne' : pvPl.slides.length ? (Math.min(s.pvI, pvPl.slides.length - 1) + 1) + '/' + pvPl.slides.length + ' · ' : '', pvCapD: pvTot || !pvPl.slides.length ? '' : pvObj.title, pvTime: pvTot ? mmss(s.pvE || 0) : pvPl.slides.length ? s.pvT + ' / ' + pvObj.dur + ' s' : '',
      pvPrev: () => pvStep(-1), pvNext: () => pvStep(1), pvToggle: () => set({ pvPlay: !s.pvPlay }), pvPlayLbl: s.pvPlay ? 'Pozastaviť' : 'Prehrať', pvPlayD: s.pvPlay ? IC.pause : IC.play,
      // rýchla správa
      qMain: s.qStep !== 'places', qPlaces: s.qStep === 'places', qText: Q.text, setQText: (e) => setQ({ text: e.target.value, tpl: null }), qHasText: !!Q.text, qClear: () => setQ({ text: '', tpl: null }), qTpls,
      qTitle: qIsEdit ? 'Upraviť správu' : 'Nová rýchla správa', qIsEdit, qEditNote: qIsEdit ? (qRun ? 'Správa je práve zobrazená. Po uložení sa na displejoch zmení do pár sekúnd.' : 'Správa je naplánovaná. Zmeny sa použijú pri zobrazení.') : '',
      qHasL, qTL, qHasM, qTMT: (Q.tM || 10) + ' min', qTMMinus: qTMSet(-5), qTMPlus: qTMSet(5), qTMMinOff: (Q.tM || 10) <= 5, qTMMaxOff: (Q.tM || 10) >= 90, qHasPar: qHasL || qHasM,
      qCanSaveTpl, qSaveTpl, qTplMine, qDelTpl, qDelTplT: s.confirm === 'qt' ? 'Potvrdiť odstránenie šablóny' : 'Odstrániť šablónu', qDelTplK: s.confirm === 'qt' ? 'df' : 'd', qTplActs: qCanSaveTpl || qTplMine,
      qShowFrom: !qRun, qKeep: Q.dur === 'keep', qKeepT: qIsEdit ? 'Správa ostane zobrazená ' + (qEditM.until || (DURS[qEditM.dur] || ['', ''])[1]) + '.' : '',
      qPvL: qNL > 0 || (!qNP && !qNLed), qPvP: qNP > 0, qPvLed: qNLed > 0, qPvLT: 'Displej na šírku' + (qNL ? ' · ' + nPlaces(qNL) : ''), qPvPT: 'Displej na výšku · ' + nPlaces(qNP), qPvLedT: 'LED tabuľa · ' + nPlaces(qNLed), qPvText, qPvK: PRIO[Q.prio][1], qPvPos: Q.pos, qLedDev, qLedBg: Q.prio === 'warn' ? '#C8322B' : '', qLedW: qLedDev === 'stop' ? '168' : '200', qTplMore: qTplRest > 0, qTplMoreT: s.qTplAll ? 'Menej' : 'Viac (' + qTplRest + ')', qTplAllA: s.qTplAll ? 'true' : 'false', qTplToggle: () => set({ qTplAll: !s.qTplAll }), qPrios, qPoss, qDurs,
      qTgtT: Q.all ? 'Všetky miesta (' + devIds.length + ')' : qN ? tgtLabel(Q) : 'Nie je vybrané žiadne miesto', qTgtSub: Q.all ? 'Každé miesto, ktoré má zariadenie' : qN ? shortList(names(Q.ids)) : 'Vyberte aspoň jedno miesto',
      qOpenPlaces: () => set({ qStep: 'places', qSearch: '', qOrd: snapOrd(qSel) }), qClosePlaces: () => set({ qStep: 'main', qSearch: '' }), qSearch: s.qSearch, setQSearch: (e) => set({ qSearch: e.target.value }), qGrps,
      qShowAll: !qsl, qAllOn: Q.all, qToggleAll: () => set({ quick: Object.assign({}, Q, Q.all ? { all: false, ids: [] } : { all: true, ids: [] }), qOrd: null }), qAllT: 'Všetky miesta (' + devIds.length + ')', qPcs, qPcEmpty: qPcs.length === 0,
      qPcOff: qN === 0, qPcBtn: qN ? 'Hotovo · ' + nPlaces(qN) : 'Vyberte aspoň jedno miesto', qOff: !Q.text.trim() || !qN || !!qcErrT || offline || !qDirty, qSend, qSendT: offline ? 'Bez pripojenia – nedá sa odoslať' : !Q.text.trim() ? 'Napíšte text správy' : !qN ? 'Vyberte miesto' : qcErrT ? 'Opravte začiatok a koniec' : qIsEdit ? 'Uložiť zmeny' : (qPlan ? 'Naplánovať na ' : 'Odoslať na ') + nPlaces(qN),
      qCustom: Q.dur === 'custom', qFOn: qEd === 'f', qTOn: qEd === 't', qEdF: qEdSet('f'), qEdT: qEdSet('t'), qFT: dtT(QV.cFd, QV.cFt), qTT: dtT(QV.cTd, QV.cTt), qCErr: !!qcErrT, qCErrT: qcErrT,
      // prepnutie playlistu
      swCanBack: W.step === 'dur' || (W.step === 'pc' && W.from === 'pl'), swBack: () => setW({ step: W.step === 'dur' && W.from !== 'pl' ? 'pc' : 'pl' }), swGrps, swTitle, swSub, swSubD, swSub2, swIsPl: W.step === 'pl', swPls: swPlsRows, swIsPc: W.step === 'pc', swPcs, swIsDur: W.step === 'dur', swPlName: swPlObj ? swPlObj.name : '', swPlaces, swDurs,
      swOff: (W.step === 'pc' && W.places.length === 0) || !swPlObj || (W.step === 'pl' && W.pl === W.cur) || (W.step === 'dur' && W.dur === 'custom' && !!cErrT) || (W.step === 'dur' && offline), swNext, swBtn, swNoOther, swNoPc: W.step === 'pc' && swCand.length === 0,
      swCustom: W.dur === 'custom', swFOn: cEd === 'f', swTOn: cEd === 't', swEdF: swEd('f'), swEdT: swEd('t'), swFT: dtT(CV.cFd, CV.cFt), swTT: dtT(CV.cTd, CV.cTt), whDays, whHours, whMins,
      whScD: whScroll('d'), whScH: whScroll('h'), whScM: whScroll('m'), whKeyD: whKey('d'), whKeyH: whKey('h'), whKeyM: whKey('m'), swCErr: W.dur === 'custom' && !!cErrT, swCErrT: cErrT,
      addTitle: gmode ? 'Nahrať do galérie' : s.addMode === 'sec' ? 'Fotka do sekcie' : s.addMode === 'ed' ? 'Fotka do snímky' : 'Pridať fotku', addOpts, pickFromAdd: s.pickMode === 'add' || (s.pickMode === 'replaceSec' && s.addMode === 'sec'), pickBack: () => set({ sheet: 'add' }), pickRows
    };
  }
}
