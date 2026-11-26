import { cp, mkdir, rm } from 'node:fs/promises';
const files=['index.html','manifest.webmanifest','sw.js','css','js','assets'];
await rm('www',{recursive:true,force:true});
await mkdir('www',{recursive:true});
// Los másteres de audio (WAV) se conservan en el repositorio, pero no viajan en el APK:
// el juego usa la versión comprimida OGG.
const excluded=src=>/-master\.wav$/i.test(src);
for(const f of files) await cp(f,`www/${f}`,{recursive:true,filter:src=>!excluded(src)});
console.log('Web bundle copied to www/ (másteres WAV excluidos)');
