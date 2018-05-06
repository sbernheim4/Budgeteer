const CACHE_VERSION = 'app-v1';
const CACHE_FILES = [
    '/',
    'budgeteer.js',
    'favicon.ico',
    'manifest.json',
    'loading-gifs/loading-one.gif',
    'loading-gifs/loading-three.gif',
    'https://fonts.googleapis.com/css?family=Lato:300,400',
    'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_VERSION)
		.then(function (cache) {
			console.log('Opened cache');
			console.log(cache);
			return cache.addAll(CACHE_FILES);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function(res){
			if(res){
				return res;
			}
			requestBackend(event);
		})
	)
});

function requestBackend(event){
	const url = event.request.clone();
	return fetch(url).then(function(res){
		//if not a valid response send the error
		if(!res || res.status !== 200 || res.type !== 'basic'){
			return res;
		}

		const response = res.clone();

		caches.open(CACHE_VERSION).then(function(cache){
			if (event.request.method.toUpperCase() === "GET") {
				console.log("MAKING REQUEST");
				cache.put(event.request, response);
			} else {
				console.log("NOT MAKING REQUEST");
				console.log(event.request);
			}
		});

		return res;
	})
}

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function(keys){
			return Promise.all(keys.map(function(key, i){
				if(key !== CACHE_VERSION){
					return caches.delete(keys[i]);
				}
			}))
		})
	)
});
