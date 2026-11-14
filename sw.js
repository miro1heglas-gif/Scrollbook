const CACHE = "pantheon-v12";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  // cache:"reload" obíde HTTP cache prehliadača (GitHub Pages drží súbory ~10 min), aby sa stiahla naozaj nová verzia
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(FILES.map((f) => fetch(new Request(f, { cache: "reload" })).then((r) => { if (!r.ok) throw new Error(f); return c.put(f, r); }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stránka: najprv sieť (nová verzia sa ukáže hneď po otvorení online), po 3 s alebo bez internetu uložená kópia.
// Ostatné súbory: najprv uložená kópia.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.mode === "navigate" || /\/(index\.html)?$/.test(url.pathname)) {
    e.respondWith(
      new Promise((resolve) => {
        const fromCache = () => caches.match("index.html").then((hit) => hit || caches.match("./"));
        const timer = setTimeout(() => fromCache().then((h) => h && resolve(h)), 3000);
        fetch(e.request, { cache: "no-cache" }).then((r) => {
          clearTimeout(timer);
          if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => { c.put("index.html", copy.clone()); c.put("./", copy); }); resolve(r); }
          else fromCache().then((h) => resolve(h || r));
        }).catch(() => { clearTimeout(timer); fromCache().then((h) => resolve(h || Response.error())); });
      })
    );
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
