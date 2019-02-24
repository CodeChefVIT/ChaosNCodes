var expectedCaches = ['static-v2'];

self.addEventListener('install', function(event) {
  console.log('V2 installing…');
  event.waitUntil(
    caches.open('static-v2')
      .then(function(cache) {
        console.log("Cache opened")
      return cache.addAll(['/','/newsfeed','/css/style.css','/js/add.js','/js/bid.js','/js/dashboard.js','/js/index.js','/js/login.js','/js/logout.js','/js/marketplace.js','/js/prediction.js']);
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      Promise.all(
      keys.map(function(key) {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
      )
    })
    .then(function(){
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  console.log(url);
  event.respondWith(caches.match(event.request).then(function(response){
    return response || fetch(event.request);
  }));
});
