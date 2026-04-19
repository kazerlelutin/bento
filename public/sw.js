/* eslint-disable no-restricted-globals */
const CACHE = "bento-v2";

/** Ressources stables pour démarrage hors ligne et critères PWA. */
const PRECACHE_URLS = [
  "/public/style.css",
  "/public/manifest.webmanifest",
  "/public/icons/icon32-2.png",
  "/public/icons/icon64-2.png",
  "/public/icons/icon128-2.png",
  "/public/icons/pwa-192.png",
  "/public/icons/pwa-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  if (path.endsWith(".html") || path === "/" || /^\/(fr|en|ko|ch)(\/|$)/.test(path)) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r ?? new Response("offline", { status: 503 })))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok && (path.match(/\.(js|css|png|webp|ico|svg|webmanifest)$/) || path.startsWith("/public/"))) {
        await cache.put(req, res.clone());
      }
      return res;
    })
  );
});
