self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('mi-app').then(cache => {
        return cache.addAll([
          '/app/',
          '/app/index.html',
          '/app/css/style.css',
          '/app/js/main.js'
        ]);
      })
    );
  });
  
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});