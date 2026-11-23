/* Wertyz Info Designer – jazykové mutácie rozhrania (sk → cs, pl, en, de).
   Zdrojové texty obrazoviek ostávajú po slovensky; pri inom jazyku sa preložia až vykreslené texty a popisy. */
(function () {
  if (window.WZ_LANG) return;
  var NAMES = { sk: 'Slovenčina', cs: 'Čeština', pl: 'Polski', en: 'English', de: 'Deutsch' };
  var LIST = ['sk', 'cs', 'pl', 'en', 'de'];
  var IDX = { cs: 0, pl: 1, en: 2, de: 3 };
  var D = /*WZ_DICT*/{};
  var PATS = /*WZ_PATS*/[];
  var PLUR = /*WZ_PLUR*/[];
  var KEY = 'wz_lang';
  var ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];
  var lang = 'sk', picked = false, subs = [], miss = {}, cache = {};
  var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  // vzory: {0} = ľubovoľný text, {0w} = jedno slovo bez medzery, # = číslo
  var pats = PATS.map(function (p) {
    var kinds = [];
    var src = esc(p[0]).replace(/\\\{(\d)(w?)\\\}|#/g, function (m, d, w) { if (m === '#') { kinds.push('#'); return '(\\d+(?:[.,:]\\d+)*)'; } kinds.push(+d); return w ? '(\\S+)' : '([\\s\\S]+?)'; });
    return { re: new RegExp('^' + src + '$'), kinds: kinds, out: p[1] };
  });
  var plur = PLUR.map(function (p) { return { re: new RegExp('^(\\d+)(\\s)(' + p[0].map(esc).join('|') + ')$'), out: p[1] }; });
  function pidx(l, n) {
    if (l === 'en' || l === 'de') return n === 1 ? 0 : 2;
    if (l === 'pl') { if (n === 1) return 0; var a = n % 10, b = n % 100; return (a >= 2 && a <= 4 && !(b >= 12 && b <= 14)) ? 1 : 2; }
    return n === 1 ? 0 : (n >= 2 && n <= 4 ? 1 : 2);
  }
  // presná zhoda, množné číslo alebo text s číslami (kľúč s #) – bez vzorov
  function lite(s, l) {
    var i = IDX[l], e = D[s], k, m;
    if (e && e[i]) return e[i];
    for (k = 0; k < plur.length; k++) { m = plur[k].re.exec(s); if (m) return m[1] + m[2] + plur[k].out[i][pidx(l, +m[1])]; }
    if (/\d/.test(s)) { var nums = []; var nk = s.replace(/\d+(?:[.,:]\d+)*/g, function (x) { nums.push(x); return '#'; }); var en = D[nk]; if (en && en[i]) { var ni = 0; return en[i].replace(/#/g, function () { return nums[ni++] || ''; }); } }
    return null;
  }
  // vzory a zložené texty
  function deep(s, l, depth) {
    var i = IDX[l], k, m;
    if (depth > 3) return null;
    var seps = [' · ', ' | ', ' › ', ' – ', ', '];
    // rozdelenie oddeľovačom: pass 0 = len keď sa dajú preložiť všetky časti; pass 1 (po vzoroch) = pri · | › stačí aj časť
    function split(pass) {
      for (var k2 = 0; k2 < seps.length; k2++) {
        if (s.indexOf(seps[k2]) <= 0 || (pass === 1 && k2 >= 3)) continue;
        var hit = false, whole = true;
        var parts = s.split(seps[k2]).map(function (x) { var t = edge(x, l, depth + 1); if (t !== null) hit = true; else if (/[A-Za-zÀ-ž]{2}/.test(x)) whole = false; return t === null ? x : t; });
        if (hit && (pass === 1 || whole)) return parts.join(seps[k2]);
      }
      return null;
    }
    var r = split(0); if (r !== null) return r;
    for (k = 0; k < pats.length; k++) {
      m = pats[k].re.exec(s);
      if (m && pats[k].out[i]) {
        var o = pats[k].out[i], kinds = pats[k].kinds, nums = [], j;
        for (j = 0; j < kinds.length; j++) if (kinds[j] === '#') nums.push(m[j + 1]);
        if (nums.length) { var q = 0; o = o.replace(/#/g, function () { return nums[q++] || ''; }); }
        for (j = 0; j < kinds.length; j++) if (kinds[j] !== '#') o = o.split('{' + kinds[j] + '}').join(one(m[j + 1], l, depth + 1));
        return o;
      }
    }
    return split(1);
  }
  // text s okrajovými medzerami, interpunkciou alebo symbolmi (↑ ✓ › … : × ÷): najprv presná zhoda (aj bez okrajov), až potom vzory
  function edge(s, l, depth) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s); var mid = m[2]; if (!mid) return null; depth = depth || 0;
    var q = /^((?:[^0-9A-Za-zÀ-ž{]|[×÷])*)([\s\S]*?)((?:[^0-9A-Za-zÀ-ž}%″)]|[×÷])*)$/.exec(mid);
    var tries = (q && q[2] && q[2] !== mid) ? [[q[1], q[2] + q[3], ''], [q[1], q[2], q[3]], ['', q[1] + q[2], q[3]]].filter(function (x) { return x[1] !== mid; }) : [];
    var t = lite(mid, l), z, t2;
    for (z = 0; z < tries.length && t === null; z++) { t2 = lite(tries[z][1], l); if (t2 !== null) t = tries[z][0] + t2 + tries[z][2]; }
    if (t === null) t = deep(mid, l, depth);
    for (z = 0; z < tries.length && t === null; z++) { t2 = deep(tries[z][1], l, depth); if (t2 !== null) t = tries[z][0] + t2 + tries[z][2]; }
    return t === null ? null : m[1] + t + m[3];
  }
  function one(s, l, depth) { var t = edge(s, l, depth); return t === null ? s : t; }
  function tr(s) {
    if (lang === 'sk' || !s) return s;
    var c = cache[lang] || (cache[lang] = {});
    if (c[s] !== undefined) return c[s] === null ? s : c[s];
    var t = edge(s, lang, 0);
    c[s] = t;
    if (t === null && /[A-Za-zÀ-ž]{2}/.test(s)) miss[s.trim()] = 1;
    return t === null ? s : t;
  }
  function skip(el) { for (var e = el; e && e.nodeType === 1; e = e.parentNode) { var tn = e.tagName; if (tn === 'SCRIPT' || tn === 'STYLE' || tn === 'TEXTAREA' || e.getAttribute('translate') === 'no') return true; } return false; }
  // Poistky: ak by iný skript vracal preložené texty späť, preklad uzla sa po pár pokusoch vzdá
  // a pri priveľa zápisoch naraz sa preklad na chvíľu odloží (stránka nikdy nezamrzne).
  var burst = 0, burstT = 0, paused = false, pauses = 0, pauseAt = 0, off = false, inAll = false;
  function wrote() {
    if (inAll) return;
    burst++;
    if (!burstT) burstT = setTimeout(function () { burst = 0; burstT = 0; }, 0);
    if (burst > 4000 && !paused) {
      paused = true; var now = Date.now();
      if (now - pauseAt > 10000) pauses = 0;
      pauseAt = now; pauses++;
      if (pauses > 4) { off = true; return; }
      setTimeout(function () { paused = false; burst = 0; all(); }, 400);
    }
  }
  function reverted(o, cur, sk) {
    if (cur !== sk) return false;
    var now = Date.now();
    if (now - (o.__wzRt || 0) > 3000) o.__wzR = 0;
    o.__wzRt = now; o.__wzR = (o.__wzR || 0) + 1;
    return o.__wzR > 6;
  }
  function skipA(el) { for (var e = el; e && e.nodeType === 1; e = e.parentNode) { var tn = e.tagName; if (tn === 'SCRIPT' || tn === 'STYLE' || e.getAttribute('translate') === 'no') return true; } return false; }
  function txt(n) {
    var cur = n.nodeValue; if (n.__wzT === cur && n.__wzL === lang) return;
    if (n.__wzX === lang || paused || off) return;
    if (!n.parentNode || skip(n.parentNode)) return;
    if (n.__wzL === lang && n.__wzT !== undefined && n.__wzT !== n.__wzS && reverted(n, cur, n.__wzS)) { n.__wzX = lang; return; }
    var sk = (n.__wzT === cur && n.__wzS !== undefined) ? n.__wzS : cur;
    var p = n.parentNode;
    if (p.tagName === 'OPTION' && !p.hasAttribute('value')) p.setAttribute('value', sk);
    var out = tr(sk); n.__wzS = sk; n.__wzT = out; n.__wzL = lang;
    if (out !== cur) { n.nodeValue = out; wrote(); }
  }
  function attr(el, a) {
    var cur = el.getAttribute(a); if (cur === null) return;
    var st = el.__wzA || (el.__wzA = {}); var r = st[a];
    if (r && r.t === cur && r.l === lang) return;
    if (paused || off || (r && r.x === lang)) return;
    if (skipA(el)) return;
    if (r && r.l === lang && r.t !== r.s && reverted(r, cur, r.s)) { r.x = lang; return; }
    var sk = (r && r.t === cur) ? r.s : cur; var out = tr(sk);
    st[a] = { s: sk, t: out, l: lang, __wzR: r ? r.__wzR : 0, __wzRt: r ? r.__wzRt : 0 };
    if (out !== cur) { el.setAttribute(a, out); wrote(); }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { txt(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, 5, null), n = root;
    while (n) { if (n.nodeType === 3) txt(n); else if (n.nodeType === 1) { for (var i = 0; i < ATTRS.length; i++) if (n.hasAttribute(ATTRS[i])) attr(n, ATTRS[i]); } n = w.nextNode(); }
  }
  var touched = false;
  function all() { if (lang !== 'sk') touched = true; if (!touched) return; inAll = true; try { walk(document.body); } finally { inAll = false; } }
  function start() {
    try {
      new MutationObserver(function (ms) {
        if (lang === 'sk' || paused || off) return;
        for (var i = 0; i < ms.length; i++) { var m = ms[i];
          if (m.type === 'characterData') txt(m.target);
          else if (m.type === 'attributes') attr(m.target, m.attributeName);
          else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]); }
      }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    } catch (e) {}
    all();
  }
  function stored() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function apply(l, save) {
    if (!NAMES[l]) l = 'sk';
    lang = l; off = false; paused = false; burst = 0; pauses = 0;
    if (save) { try { localStorage.setItem(KEY, l); } catch (e) {} }
    all(); subs.forEach(function (f) { try { f(l); } catch (e) {} });
  }
  window.WZ_LANG = {
    list: LIST, names: NAMES,
    get: function () { return lang; },
    name: function () { return NAMES[lang]; },
    set: function (l) { picked = true; apply(l, true); },
    // pevný jazyk pre jednu obrazovku na plátne (neukladá sa)
    force: function (l) { picked = true; apply(l, false); },
    t: function (s) { return tr(s); },
    probe: function (s, l) { return edge(s, l || 'en', 0); },
    on: function (f) { subs.push(f); return function () { subs = subs.filter(function (x) { return x !== f; }); }; },
    missing: function () { return Object.keys(miss); }
  };
  lang = NAMES[stored()] ? stored() : 'sk';
  try { window.addEventListener('storage', function (e) { if (e.key === KEY && !picked) apply(e.newValue || 'sk', false); }); } catch (e) {}
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
