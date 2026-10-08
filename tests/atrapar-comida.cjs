const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Element{constructor(){this.listeners={};this.children=[];this.style={setProperty(){}};this.dataset={};this.classList={add(){},remove(){}};this.clientWidth=900;this.clientHeight=650;}append(...c){this.children.push(...c)}replaceChildren(...c){this.children=c}setAttribute(){}addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)}showModal(){this.open=true}close(){this.open=false}focus(){}remove(){this.removed=true}}
const els=new Map();function get(id){if(!els.has(id))els.set(id,new Element());return els.get(id)}get('basket').clientWidth=234;get('basket').clientHeight=225;
let now=0,scheduled=0;const winEvents={},docEvents={};
const sandbox={fs,console,performance:{now:()=>now},setNow:n=>now=n,getScheduled:()=>scheduled,dispatchWindow:(type,e={})=>winEvents[type]?.forEach(fn=>fn(e)),dispatchDocument:type=>docEvents[type]?.forEach(fn=>fn()),requestAnimationFrame:()=>++scheduled,cancelAnimationFrame(){},Image:class{},document:{getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>[],hidden:false,addEventListener(type,fn){(docEvents[type]??=[]).push(fn)}},window:{matchMedia:()=>({matches:true}),addEventListener(type,fn){(winEvents[type]??=[]).push(fn)}},assert};
let code=fs.readFileSync('dist/atrapar-comida/game.js','utf8');
code=code.replace(/\}\)\(\);\s*$/,`assert.equal(foodSize(1000,true),112);assert.equal(foodSize(600,true),72);assert.equal(foodSize(390,false),40);assert.equal(foodSize(700,false),52.5);const apple=foods.find(f=>f.name==='Manzana');
for(let cycle=0;cycle<20;cycle++){const seen=new Set();for(let i=0;i<13;i++){const food=nextFood();assert.ok(food);seen.add(food.group);}assert.equal(seen.size,7);assert.equal(deck.length,0);}assert.equal(progress(),0);capture(apple);assert.equal(points,15);capture(apple);assert.equal(points,25);assert.equal(counts.produce,2);
capture(foods.find(f=>f.group==='limit'));assert.equal(points,25);
capture(foods.find(f=>f.group==='water'));assert.equal(points,30);
for(const g of groups)counts[g.id]=100;assert.equal(progress(),100);
start();assert.equal(points,0);assert.equal(elapsed,0);assert.equal(items.length,0);assert.equal(state,'playing');
basketX=-4;positionBasket();assert.equal(basketX,0.13);basketX=4;positionBasket();assert.equal(basketX,0.87);
basketX=.5;positionBasket();const geo=geometry();const rim=geo.top+geo.bh*.52;const el=new Element();items=[{food:apple,el,size:50,x:425,y:rim-60,speed:500}];nextSpawn=99;tick(100);assert.equal(counts.produce,1);assert.equal(items.length,0);assert.equal(el.removed,true);
const missed=new Element();items=[{food:apple,el:missed,size:50,x:0,y:rim-60,speed:500}];tick(200);assert.equal(counts.produce,1);
tick(30000);assert.equal(state,'results');assert.equal(elapsed,30);assert.equal(get('timer').textContent,'00:00');assert.equal(get('bars').children.length,7);
const originalSummary=get('summary').textContent;selectGroup(groups[0]);assert.equal(get('food-list').children.length,1);assert.ok(get('summary').textContent.includes('1'));
selectGroup(groups[0]);assert.equal(get('summary').textContent,originalSummary);assert.equal(selectedGroup,null);assert.equal(get('show-summary').hidden,true);selectGroup(groups[3]);assert.equal(selectedGroup,'legume');showSummary();assert.equal(get('summary').textContent,originalSummary);selectGroup(groups[0]);const savedPoints=points,savedSummary=get('summary').textContent;openLearn();assert.equal(state,'learn');assert.equal(get('learn').hidden,false);assert.equal(get('results').hidden,true);closeLearn();assert.equal(state,'results');assert.equal(get('learn').hidden,true);assert.equal(get('results').hidden,false);assert.equal(points,savedPoints);assert.equal(get('summary').textContent,savedSummary);
start();assert.equal(counts.produce,0);assert.equal(points,0);assert.equal(get('results').hidden,true);
// Pausa manual: congelar alimentos, puntos y tiempo, incluso ante un frame tardío.
spawn();capture(apple);keys.add('ArrowRight');tick(1000);
const frozen=JSON.stringify({elapsed,points,basketX,positions:items.map(f=>f.y),nextSpawn,tipIndex});
get('pause').listeners.click[0]();assert.equal(state,'paused');assert.equal(keys.size,0);assert.equal(get('pause-dialog').open,true);assert.equal(get('pause-time').textContent,get('timer').textContent);
tick(60000);assert.equal(JSON.stringify({elapsed,points,basketX,positions:items.map(f=>f.y),nextSpawn,tipIndex}),frozen);
setNow(60000);get('resume').listeners.click[0]();assert.equal(state,'playing');assert.equal(get('pause-dialog').open,false);
const resumeFrames=getScheduled();resumeGame();assert.equal(getScheduled(),resumeFrames);tick(61000);assert.equal(elapsed,2);
// Ocultar y volver no reanuda; continuar descuenta solo tiempo de juego.
document.hidden=true;dispatchDocument('visibilitychange');assert.equal(state,'paused');const hiddenElapsed=elapsed;resumeGame();assert.equal(state,'paused');
document.hidden=false;dispatchDocument('visibilitychange');assert.equal(state,'paused');setNow(100000);resumeGame();tick(101000);assert.equal(elapsed,hiddenElapsed+1);
// Salir de la ventana también pausa; eventos repetidos son inocuos.
dispatchWindow('blur');assert.equal(state,'paused');pauseGame();assert.equal(state,'paused');
let prevented=false;setNow(110000);get('pause-dialog').listeners.cancel[0]({preventDefault(){prevented=true}});assert.equal(prevented,true);assert.equal(state,'playing');
// Respaldo si llega un frame oculto antes del evento de visibilidad.
document.hidden=true;tick(150000);assert.equal(state,'paused');assert.equal(elapsed,3);document.hidden=false;setNow(150000);resumeGame();tick(177000);assert.equal(state,'results');assert.equal(elapsed,30);assert.equal(get('pause').hidden,true);
dispatchWindow('blur');assert.equal(state,'results');start();assert.equal(get('pause').hidden,false);assert.equal(get('pause-dialog').open,false);assert.equal(elapsed,0);
reset();assert.equal(foods.length,56);assert.equal(new Set(foods.map(f=>f.name)).size,foods.length);
for(const food of foods){assert.ok(food.groups.length);assert.equal(new Set(food.groups).size,food.groups.length);for(const id of food.groups)assert.ok(groups.some(g=>g.id===id));assert.ok(fs.existsSync('dist/atrapar-comida/'+food.src));}
const meal=foods.find(f=>f.name==='Quesadilla con queso');capture(meal);assert.equal(points,15);assert.equal(counts.grain,1);assert.equal(counts.animal,1);assert.equal(counts.produce,0);assert.equal(caught[meal.name],1);capture(meal);assert.equal(points,25);assert.equal(counts.grain,2);assert.equal(counts.animal,2);assert.equal(caught[meal.name],2);
selectGroup(groups.find(g=>g.id==='grain'));assert.equal(get('food-list').children.length,1);assert.ok(get('food-list').children[0].children[1].children[0].textContent.includes('tortilla'));
selectGroup(groups.find(g=>g.id==='animal'));assert.equal(get('food-list').children.length,1);assert.ok(get('food-list').children[0].children[1].children[0].textContent.includes('queso'));showSummary();assert.ok(get('summary').textContent.includes('Atrapaste 2 alimentos'));
const beforeSweet=progress();capture(foods.find(f=>f.name==='Mazapán'));assert.equal(progress(),beforeSweet);assert.equal(points,25);assert.equal(counts.limit,1);
reset();const rotations={};for(let i=0;i<1300;i++){const food=nextFood(),id=food.group;const count=foods.filter(f=>f.group===id).length;rotations[id]??=new Set();assert.ok(!rotations[id].has(food.name));rotations[id].add(food.name);if(rotations[id].size===count)rotations[id].clear();}
console.log('PASS: 56 recursos, recetas multigrupo, puntos únicos, ingredientes en cada barra y rotación sin repetición');
console.log('PASS: pausa manual, pestaña oculta, ventana sin foco, reanudación sin saltos, posiciones congeladas y fin tras 30 segundos activos');
console.log('PASS: siete categorías por ciclo, alternar barras, resumen general, pantalla informativa y vuelta conservando resultados');console.log('PASS: puntos, variedad, agua/refresco, progreso limitado, límites, captura, fallo, 30 segundos, resumen y reinicio');})();`);
sandbox.get=get;sandbox.Element=Element;vm.runInNewContext(code,sandbox);
const html=fs.readFileSync('dist/atrapar-comida/index.html','utf8');for(const match of html.matchAll(/(?:src|href)="(assets\/[^\"]+)"/g))assert.ok(fs.statSync('dist/atrapar-comida/'+match[1]).size>0);for(const match of code.matchAll(/\['([^']+)','[^']+'\]/g)){if(fs.existsSync('dist/atrapar-comida/assets/comida/'+match[1]+'.svg'))assert.ok(fs.statSync('dist/atrapar-comida/assets/comida/'+match[1]+'.svg').size>0)}console.log('PASS: recursos locales');
