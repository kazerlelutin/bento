/* eslint-disable no-restricted-globals */
const CACHE = "bento-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
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
      if (res.ok && (path.match(/\.(js|css|png|webp|ico|svg)$/) || path.startsWith("/public/"))) {
        await cache.put(req, res.clone());
      }
      return res;
    })
  );
});
