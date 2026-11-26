const CACHE='la-cosecha-v4-7';
const ASSETS=['./','./index.html','./css/style.css','./js/app.js','./js/data.js','./js/campaigns.js','./js/whatif.js','./manifest.webmanifest','./assets/optimized/capitolio-960.webp','./assets/optimized/arena-bosque-960.webp','./assets/optimized/arena-bosque-1600.webp','./assets/icons/la-cosecha-192.png','./assets/icons/la-cosecha-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));});
