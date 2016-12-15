var CACHE_NAME = 'world-quiz-app-cashe-v1';

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/templates/capitals-quiz.html',
        '/templates/capitals-quiz-detail.html',
        '/templates/help.html',
        '/templates/main.html',
        '/templates/quizzes-list.html',
        '/templates/settings.html',
        '/templates/world-quiz.html',
        '/templates/world-quiz-detail.html',
        '/templates/location.html',
        '/css/combined.css',
        '/js/combined.js',
        '/data/continents.json',
        '/data/africa.json',
        '/data/asia.json',
        '/data/europe.json',
        '/data/oceania.json',
        '/data/north-america.json',
        '/data/south-america.json',
        '/data/world_quiz.json',
        '/bower_components/jquery/dist/jquery.js',
        '/bower_components/angular/angular.js',
        '/bower_components/angular-route/angular-route.js',
        '/bower_components/angular-resource/angular-resource.js',
        '/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '/bower_components/bootstrap/dist/css/bootstrap.min.css',
        '/audio/correct.mp3',
        '/audio/wrong.wav',
        '/images/favicons/favicon.png',
        '/images/bg-big.jpg',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'
      ]);
    }).then(function() {
      console.log('[sw] static files cached!');
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('world-quiz-app') &&
                  cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('[sw] All the old caches has been deleted');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});