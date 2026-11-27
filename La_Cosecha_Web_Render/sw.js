const CACHE='archivo-panem-1.4.0';
// Archivo de Panem (Web). Precarga la estructura del sitio para consultarlo sin conexión.
// Sustituye al service worker del juego web (la-cosecha-v4-*): se activa al momento y borra sus cachés.
const ASSETS=['./','./index.html','./css/archivo.css','./js/archivo.js','./js/archivo-vistas.js','./js/archivo-datos.js','./js/archivo-contenido.js','./js/data.js','./manifest.webmanifest','./assets/optimized/capitolio-960.webp','./assets/optimized/capitolio-960.jpg','./assets/icons/la-cosecha-192.png','./assets/icons/la-cosecha-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Páginas y código: primero la red (para ver siempre la última versión) y la caché si no hay conexión.
// Imágenes: primero la caché.
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  const imagen=req.destination==='image';
  const desdeRed=()=>fetch(req).then(res=>{if(res.ok){const copia=res.clone();caches.open(CACHE).then(c=>c.put(req,copia));}return res;});
  e.respondWith(imagen
    ?caches.match(req).then(r=>r||desdeRed()).catch(()=>Response.error())
    :desdeRed().catch(()=>caches.match(req).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
