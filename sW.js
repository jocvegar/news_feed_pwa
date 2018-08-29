const staticAssets = [
	'./',
	'./Styles.css',
	'./App.js',
	'./fallback.json',
	'./images/friday_13th_wide.jpg'
];

// Our own code!

// self.addEventListener('install', async event => {
// 	console.log("install");
// 	const cache = await caches.open('news-static');
// 	cache.addAll(staticAssets);
// });

// self.addEventListener('fetch', event => {
// 	console.log("fetch");
// 	const request = event.request;
// 	const url = new URL(request.url);
// 	if(url.origin === location.origin) {
// 		event.respondWith(cacheFirst(request));
// 	} else {
// 		event.respondWith(networkFirst(request))
// 	}
// });

// async function cacheFirst(request) {
// 	const cachedResponse = await caches.match(request);
// 	return cachedResponse || fetch(request);
// }

// async function networkFirst(request) {
// 	const cache = await caches.open('news-dynamic');
// 	try {
// 		const response = await fetch(request);
// 		cache.put(request, response.clone());
// 		return response;
// 	} catch(error) {
// 		const cachedResponse = await cache.match(request);
// 		return cachedResponse || await caches.match('./fallback.json')
// 	}
// }

// Google's ServiceBox

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(
  new RegExp('https://newsapi.org/\(.*)'),
  workbox.strategies.networkFirst()
);
