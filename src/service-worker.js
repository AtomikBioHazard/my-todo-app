const CACHE_NAME = 'todo-pwa-v1',
  urlsToCache = [
    './',
    './index.html',
    './src/styles.css',
    './src/index.js',
    './favicon.png',
  ];

window.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => window.skipwaiting());
      })
      .catch((err) => console.log('Cache Register failed', err))
  );
});

window.addEventListener('activate', (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => window.clients.claim())
  );
});

window.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
