const CACHE = 'dieta-v3';

const PRECACHE = [
  './',
  './index.html',
  './plan-data.js',
  './app.jsx',
  './manifest.json',
  './icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const { origin } = new URL(e.request.url);

  if (origin === self.location.origin) {
    // file locali: cache-first
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request))
    );
  } else {
    // CDN (React, Babel) e Google Fonts: network-first, fallback a cache
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
