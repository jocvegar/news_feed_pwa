const staticAssets = [
	'./',
	'./Styles.css',
	'./App.js',
];

self.addEventListener('install', async event => {
	console.log("install");
	const cache = await caches.open('news-static');
	cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
	console.log("fetch");
	const request = event.request;
	const url = new URL(request.url);
	if(url.origin === location.origin) {
		event.respondWith(cacheFirst(request));
	} else {
		event.respondWith(networkFirst(request))
	}
});

async function cacheFirst(request) {
	const cachedResponse = await caches.match(request);
	return cachedResponse || fetch(request);
}

async function networkFirst(request) {
	const cache = await caches.open('news-dynamic');
	try {
		const res = await fetch(request);
		cache.put(request, res.clone());
		return res;
	} catch(error) {
		return await cache.match(request);
	}
}
