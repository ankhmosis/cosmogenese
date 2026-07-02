const CACHE_NAME = "cosmogenese-v1";
const APP_SHELL = [
    "./index.html",
    "./manifest.webmanifest",
    "./icon-192.png",
    "./icon-512.png",
    "./icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // App shell: cache-first. External CDN assets (Tailwind/Fonts): network-first with cache fallback.
    const url = new URL(event.request.url);
    const isSameOrigin = url.origin === self.location.origin;

    if (isSameOrigin) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request))
        );
    } else {
        event.respondWith(
            fetch(event.request)
                .then((res) => {
                    const resClone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
                    return res;
                })
                .catch(() => caches.match(event.request))
        );
    }
});
