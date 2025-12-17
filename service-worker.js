const CACHE_NAME = 'osts-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/api.html',
  '/terms.html',
  '/privacy.html',
  '/license.html',
  '/icons/osts-192.png',
  '/icons/osts-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
