/* Info Designer – kontrola novej verzie (webová aplikácia otvorená v prehliadači telefónu).
   Prehliadač v telefóne stránku často len obnoví z pamäte (návrat do karty, obnovenie zatvorenej karty) a novú verziu si sám nevypýta.
   Preto sa pri otvorení a pri každom návrate do karty porovná načítaná verzia so súborom version.json na serveri.
   Ak je na serveri novšia, súbory aplikácie sa stiahnu nanovo a stránka sa načíta ešte raz. V claude.ai sa kontrola nespúšťa. */
(function () {
  var BUILD = '__BUILD__', VER = '__VER__';
  try { if (!window.WZ_BUILD || window.WZ_BUILD > BUILD) { window.WZ_BUILD = BUILD; window.WZ_VER = VER; } } catch (e) {}
  if (window.__wzVerOn) return; window.__wzVerOn = 1;
  var loc = window.location, KEY = 'wz_m_upd';
  if (!/^https?:$/.test(loc.protocol) || /claude|anthropic/i.test(loc.hostname)) return;
  if (!window.fetch || !window.Promise) return;
  // vložená v cudzej stránke (plátno claude.ai) sa nekontroluje; v rámčeku úvodnej stránky tej istej adresy áno
  if (window.top !== window.self) { try { void window.top.location.href; } catch (e) { return; } }
  var cs = document.currentScript, base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : loc.href.replace(/[^\/]*$/, '');
  // najstaršia z načítaných častí: tento skript, hlavný súbor aplikácie a samotná stránka
  function loaded() { var a = [window.WZ_BUILD || BUILD]; if (window.WZ_MAIN_BUILD) a.push(String(window.WZ_MAIN_BUILD)); var m = document.querySelector('meta[name="wz-build"]'); if (m && m.content) a.push(m.content); a.sort(); return a[0]; }
  function note() {
    if (document.getElementById('wz-upd')) return;
    var d = document.createElement('div'); d.id = 'wz-upd'; d.setAttribute('role', 'status');
    d.style.cssText = 'position:fixed;left:8px;right:8px;top:8px;z-index:99999;display:flex;align-items:center;gap:10px;padding:10px 10px 10px 14px;border-radius:14px;background:#1F2323;color:#fff;font:600 14px/1.3 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35)';
    var s = document.createElement('span'); s.style.cssText = 'flex:1;min-width:0'; s.textContent = 'Je dostupná nová verzia aplikácie.';
    var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Načítať';
    b.style.cssText = 'flex:none;min-height:44px;padding:0 14px;border-radius:10px;border:0;background:#2BD0D0;color:#0B1F1F;font:700 14px system-ui,sans-serif';
    b.onclick = function () { try { sessionStorage.removeItem(KEY); } catch (e) {} refresh(function () { var u = loc.href.split('#')[0]; loc.replace(u + (u.indexOf('?') < 0 ? '?' : '&') + 'v=' + Date.now()); }); };
    d.appendChild(s); d.appendChild(b); (document.body || document.documentElement).appendChild(d);
  }
  // stiahne súbory aplikácie znova zo servera (obíde pamäť prehliadača a zároveň ju prepíše novým obsahom)
  function refresh(then) {
    var files = [loc.href.split('#')[0]].concat(['Main.dc.html', 'Slide.dc.html', 'i18n.js', 'ver.js', 'support.js', 'manifest.json'].map(function (f) { return base + f; }));
    var one = function (u) { return fetch(u, { cache: 'reload' }).then(function (r) { return r.text(); }).catch(function () {}); };
    Promise.all(files.map(one)).then(then, then);
  }
  function update(b) {
    var st = null; try { st = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) {}
    var n = st && st.b === b ? st.n : 0;
    // poistka proti nekonečnému načítavaniu: najviac dva pokusy na jednu verziu, potom už len oznam s tlačidlom
    if (n >= 2) { note(); return; }
    try { sessionStorage.setItem(KEY, JSON.stringify({ b: b, n: n + 1 })); } catch (e) { note(); return; }
    refresh(function () { if (n === 0) loc.reload(); else { var u = loc.href.split('#')[0].replace(/([?&])v=[^&]*&?/, '$1').replace(/[?&]$/, ''); loc.replace(u + (u.indexOf('?') < 0 ? '?' : '&') + 'v=' + encodeURIComponent(b)); } });
  }
  var busy = false, last = 0;
  function check(force) {
    var now = Date.now(); if (busy || (!force && now - last < 20000) || navigator.onLine === false) return; busy = true; last = now;
    fetch(base + 'version.json?t=' + now, { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      busy = false; if (!j || !j.b) return;
      if (String(j.b) <= loaded()) { try { sessionStorage.removeItem(KEY); } catch (e) {} var o = document.getElementById('wz-upd'); if (o) o.remove(); return; }
      update(String(j.b));
    }).catch(function () { busy = false; });
  }
  window.WZ_CHECK = function () { check(true); };
  setTimeout(function () { check(true); }, 1500);
  window.addEventListener('pageshow', function (e) { if (e.persisted) check(true); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') check(false); });
  window.addEventListener('online', function () { check(false); });
})();
