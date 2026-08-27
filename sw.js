// DotNet Learning Hub — Service Worker
const CACHE_NAME = 'dotnethub-v2';
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/animations.css',
  './css/code-theme.css',
  './css/components.css',
  './js/app.js',
  './js/progress.js',
  './js/quiz-engine.js',
  './js/animation-controller.js',
  './js/sql-playground.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
