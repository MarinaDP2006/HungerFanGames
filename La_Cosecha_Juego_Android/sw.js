const CACHE='la-cosecha-android-4.18.0';
// Android (Capacitor): la app ya lleva todos sus archivos dentro del APK, así que no necesita caché.
// Hasta 4.9 había un service worker con caché que, al actualizar el APK, seguía sirviendo la versión
// anterior en el primer arranque. Este lo retira: se activa al momento, borra las cachés, se da de baja
// y recarga la app para que cargue los archivos del APK instalado. No intercepta ninguna petición.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys())await caches.delete(k);
  await self.registration.unregister();
  for(const c of await self.clients.matchAll({type:'window'}))c.navigate(c.url).catch(()=>{});
})()));
