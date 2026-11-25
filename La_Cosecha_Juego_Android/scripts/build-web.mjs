import { cp, mkdir, rm } from 'node:fs/promises';
const files=['index.html','manifest.webmanifest','sw.js','css','js','assets'];
await rm('www',{recursive:true,force:true});
await mkdir('www',{recursive:true});
for(const f of files) await cp(f,`www/${f}`,{recursive:true});
console.log('Web bundle copied to www/');
