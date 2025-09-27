// A basic service worker to make the site installable.

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // You can add pre-caching logic here if needed in the future.
});

self.addEventListener('fetch', (event) => {
  // This basic fetch handler is sufficient to make the app installable.
  event.respondWith(fetch(event.request));
});