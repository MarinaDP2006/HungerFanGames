import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appPath = path.join(root, 'La_Cosecha_Juego_Android/js/app.js');
const workflowPath = path.join(root, '.github/workflows/android-apk.yml');
let app = fs.readFileSync(appPath, 'utf8');

const importLine = "import {makeApi,isProtected,chapterEvent,adaptCampaignEvent,applyChapterChoice,runChapterPre,composeEnding} from './campaigns.js';";
const newImport = importLine + "\nimport {buildRoster50,createPreArena50State,getPreArena50Scene,applyPreArena50Choice,applyPreArena50ToGame,renderPreArena50Panel} from './campaign-50th-prearena.js';";
if (!app.includes("from './campaign-50th-prearena.js'")) {
  if (!app.includes(importLine)) throw new Error('No se encuentra la línea de importación de campaigns.js');
  app = app.replace(importLine, newImport);
}

const oldRoster = "if(cfg.edition===50)game.tributes=Array.from({length:48},(_,i)=>{const d=Math.floor(i/4)+1,slot=i%4;const name=d===12&&slot===0?'Haymitch Abernathy':d===12&&slot===1?'Maysilee Donner':`Tributo/a no identificado/a · Distrito ${d}`;return {id:'t'+i,district:d,name,alive:true,hp:100,skill:5+Math.floor(Math.random()*5),x:10+Math.random()*80,y:10+Math.random()*80,portrait:null,canon:true,alliance:null};});";
const newRoster = "if(cfg.edition===50){game.tributes=buildRoster50();game.preArena50=createPreArena50State();}";
if (app.includes(oldRoster)) app = app.replace(oldRoster, newRoster);
else if (!app.includes("game.tributes=buildRoster50()")) throw new Error('No se encuentra el bloque de roster 50.º esperado');

const renderFn = `
function renderPreArena50Game(){
 const state=game.preArena50??(game.preArena50=createPreArena50State());
 const scene=getPreArena50Scene(state);
 if(!scene){applyPreArena50ToGame(state,game);game.phase='arena';game.day=1;renderGame();return;}
 shell(\`<div class="eyebrow">CAMPAÑA CANÓNICA · 50.º VASALLAJE · HAYMITCH ABERNATHY</div>
 <h1 class="display">\${game.phase==='harvest'?'LA COSECHA':game.phase==='training'?'EL CAPITOLIO':'LA VÍSPERA DE LA ARENA'}</h1>
 <div class="layout"><section>\${renderPreArena50Panel(state,game.phase)}
 <div class="panel" style="margin-top:12px"><h3 class="section-title">CRÓNICA</h3><div class="log">\${(game.log||[]).slice(-8).reverse().map(x=>\`<p>\${esc(x)}</p>\`).join('')}</div></div></section>
 <aside class="panel"><h2 class="section-title">REGISTRO DEL DISTRITO 12</h2>
 <p class="card-desc">Haymitch · Maysilee · Wyatt · Louella (sustituida por Lou Lou tras el accidente).</p>
 <div class="stat-grid">\${stat('Salud',game.health)}\${stat('Habilidad',game.skill)}\${stat('Apoyo',game.support)}\${stat('Rebelión',game.rebellion)}</div>
 <button class="btn ghost" data-a="save">Guardar partida</button><button class="btn ghost" data-a="home">Abandonar campaña</button></aside></div>\`);
}
`;
if (!app.includes('function renderPreArena50Game()')) {
  const marker = 'function renderGame(){';
  if (!app.includes(marker)) throw new Error('No se encuentra renderGame()');
  app = app.replace(marker, renderFn + '\n' + marker);
}

const renderMarker = "function renderGame(){if(game.phase==='ending')";
const renderReplacement = "function renderGame(){if(game.mode==='story'&&game.edition===50&&['harvest','training','interview'].includes(game.phase)){renderPreArena50Game();return;}if(game.phase==='ending')";
if (app.includes(renderMarker)) app = app.replace(renderMarker, renderReplacement);
else if (!app.includes("renderPreArena50Game();return;}if(game.phase==='ending')")) throw new Error('No se encuentra el inicio esperado de renderGame()');

const clickMarker = "document.addEventListener('click',e=>{const b=e.target.closest('[data-a],[data-ed],[data-d],[data-train]";
if (app.includes(clickMarker)) app = app.replace(clickMarker, "document.addEventListener('click',e=>{const b=e.target.closest('[data-pre50-choice],[data-a],[data-ed],[data-d],[data-train]");
else if (!app.includes('[data-pre50-choice]')) throw new Error('No se encuentra el selector de eventos click');

const trainingMarker = "else if(b.dataset.train){const k=b.dataset.train;game.skill=Math.min(20,game.skill+(k==='combat'?3:k==='survival'?2:1));";
const trainingReplacement = "else if(b.dataset.train){const k=b.dataset.train;game.preArena50Training??=[];if(game.edition===50&&game.preArena50Training.includes(k)){log('Ya has completado este ejercicio.');renderGame();return;}if(game.edition===50)game.preArena50Training.push(k);game.skill=Math.min(20,game.skill+(k==='combat'?3:k==='survival'?2:1));";
if (app.includes(trainingMarker)) app = app.replace(trainingMarker, trainingReplacement);
else if (!app.includes('game.preArena50Training.includes(k)')) throw new Error('No se encuentra el bloque de entrenamiento esperado');

const branchMarker = "else if(b.dataset.storyChoice){resolveStoryChoice(b.dataset.storyChoice);}";
const branch = `else if(b.dataset.pre50Choice){const result=applyPreArena50Choice(game.preArena50,b.dataset.pre50Choice);if(!result.ok){alert('No se pudo registrar esa decisión.');return;}if(result.next){game.phase=result.next.phase;log('Decisión registrada: '+result.scene.title+'.');}else{applyPreArena50ToGame(game.preArena50,game);game.phase='arena';game.day=1;log('La preparación ha terminado. Las plataformas del Segundo Vasallaje comienzan a elevarse.');sound('anthem');}renderGame();}else if(b.dataset.storyChoice){resolveStoryChoice(b.dataset.storyChoice);}`;
if (app.includes(branchMarker)) app = app.replace(branchMarker, branch);
else if (!app.includes('applyPreArena50Choice(game.preArena50')) throw new Error('No se encuentra el punto de inserción de decisiones narrativas');

fs.writeFileSync(appPath, app, 'utf8');

// Add the focused test to the Android CI workflow once.
if (fs.existsSync(workflowPath)) {
  let workflow = fs.readFileSync(workflowPath, 'utf8');
  if (!workflow.includes('tests/campaign-50th-prearena.mjs')) {
    const marker = 'node tests/campaigns.mjs';
    if (!workflow.includes(marker)) throw new Error('No se encuentra el paso de pruebas de campañas en android-apk.yml');
    workflow = workflow.replace(marker, marker + '\n          node tests/campaign-50th-prearena.mjs');
    fs.writeFileSync(workflowPath, workflow, 'utf8');
  }
}
console.log('Integración 5.1 del Segundo Vasallaje aplicada.');
