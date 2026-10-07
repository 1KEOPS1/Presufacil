const CACHE_NAME = "presufacil-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.json"
];

self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(ARCHIVOS);

            })

    );

    self.skipWaiting();

});

self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys()
            .then(function(keys) {

                return Promise.all(

                    keys
                        .filter(function(key) {

                            return key !== CACHE_NAME;

                        })
                        .map(function(key) {

                            return caches.delete(key);

                        })

                );

            })

    );

    self.clients.claim();

});

self.addEventListener("fetch", function(event) {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        fetch(event.request)
            .catch(function() {

                return caches.match(event.request);

            })

    );

});
