const dynamicCacheName = 'd-app-v1'

const assetUrls = [
  './index.html',
  './style.css',
  './main.js',
  './offline.html',
  './manifest.json',
  './app.js',
  './sw.js',
  './js/custom-styles.js',
  './js/add-todo-btn.js',
  './js/add-todo-window.js',
  './js/categories.js',
  './js/completed-tasks.js',
  './js/delete-todo.js',
  './js/left-menu.js',
  './js/lists-context-menu.js',
  './js/saves/localStorage.js',
  './img/iconsfont/iconsfont.css',
  './img/iconsfont/fonts/icons.eot',
  './img/iconsfont/fonts/icons.svg',
  './img/iconsfont/fonts/icons.ttf',
  './img/iconsfont/fonts/icons.woff',
  './img/logo/icon-48x48.png',
  './img/logo/icon-72x72.png',
  './img/logo/icon-96x96.png',
  './img/logo/icon-128x128.png',
  './img/logo/icon-144x144.png',
  './img/logo/icon-152x152.png',
  './img/logo/icon-192x192.png',
  './img/logo/icon-384x384.png',
  './img/logo/icon-512x512.png',
  './img/logo/favicon.ico'
]


self.addEventListener('install', async event => {
  const cache = await caches.open(dynamicCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  event.respondWith(networkFirst(request))
})

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('./offline.html')
  }
}
