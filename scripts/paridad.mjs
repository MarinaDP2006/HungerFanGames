// Comprueba que la Web y el Juego Android tienen el mismo juego.
// El código y los recursos del juego deben ser idénticos; solo se permiten diferencias en la
// configuración propia de cada plataforma (Render o Capacitor) y en su documentación.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const WEB=path.join(root,'La_Cosecha_Web_Render'),APP=path.join(root,'La_Cosecha_Juego_Android');
const SHARED=['index.html','sw.js','manifest.webmanifest','css','js','assets','tests'];
const ONLY_WEB=['README_RENDER.md'];
const ONLY_APP=['package.json','capacitor.config.json','scripts','README_ANDROID.md','.gitignore','node_modules','www','android'];

const list=(base,rel)=>{const full=path.join(base,rel);if(!fs.existsSync(full))return [];if(fs.statSync(full).isFile())return [rel];
  return fs.readdirSync(full).flatMap(f=>list(base,path.join(rel,f)));};
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

const problems=[];
for(const rel of SHARED){
  const a=new Set(list(WEB,rel)),b=new Set(list(APP,rel));
  for(const f of a)if(!b.has(f))problems.push(`Solo en Web: ${f}`);
  for(const f of b)if(!a.has(f))problems.push(`Solo en Android: ${f}`);
  for(const f of a)if(b.has(f)&&hash(path.join(WEB,f))!==hash(path.join(APP,f)))problems.push(`Contenido distinto: ${f}`);
}
for(const f of ONLY_WEB)if(!fs.existsSync(path.join(WEB,f)))problems.push(`Falta en Web: ${f}`);
const ry=fs.existsSync(path.join(root,'render.yaml'))?fs.readFileSync(path.join(root,'render.yaml'),'utf8'):'';
if(!/rootDir:\s*La_Cosecha_Web_Render/.test(ry))problems.push('render.yaml (raíz) no apunta a La_Cosecha_Web_Render');
for(const f of ['package.json','capacitor.config.json'])if(!fs.existsSync(path.join(APP,f)))problems.push(`Falta en Android: ${f}`);

// La versión de Android debe coincidir con la última entrada del CHANGELOG de la Web.
const pkg=JSON.parse(fs.readFileSync(path.join(APP,'package.json'),'utf8'));
const last=fs.readFileSync(path.join(WEB,'CHANGELOG.md'),'utf8').match(/^## (\d+\.\d+)/m)?.[1];
if(last&&!pkg.version.startsWith(last))problems.push(`Versión: package.json dice ${pkg.version} y el CHANGELOG ${last}`);
// La caché del service worker debe incluir todos los módulos JS.
const sw=fs.readFileSync(path.join(WEB,'sw.js'),'utf8');
for(const f of fs.readdirSync(path.join(WEB,'js')))if(!sw.includes(`./js/${f}`))problems.push(`sw.js no precarga js/${f}`);

const counted=SHARED.reduce((n,r)=>n+list(WEB,r).length,0);
if(problems.length){console.error(`Paridad: ${problems.length} diferencias\n- `+problems.join('\n- '));process.exit(1);}
console.log(`Paridad Web / Android: OK (${counted} archivos idénticos; diferencias permitidas: render.yaml, ${ONLY_WEB.join(', ')} | ${ONLY_APP.join(', ')})`);
