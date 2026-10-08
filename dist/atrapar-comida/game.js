'use strict';
(()=>{
const $=id=>document.getElementById(id);
const groups=[
{id:'produce',name:'Verduras y frutas',color:'#1ba238',target:6,weight:50,advice:'Incluye verduras con frecuencia y elige fruta entera. Para la escuela: pepino y manzana en trozos.'},
{id:'fat',name:'Aceites y grasas saludables',color:'#c47510',target:1,weight:5,advice:'Usa pequeñas cantidades. El aguacate puede acompañar una tostada con frijoles.'},
{id:'animal',name:'Alimentos de origen animal',color:'#e10b16',target:1,weight:5,advice:'Alterna huevo, pescado y otras opciones. Prefiere preparaciones asadas o a la plancha.'},
{id:'legume',name:'Leguminosas',color:'#f18809',target:2,weight:15,advice:'Incluye frijoles, lentejas o habas regularmente. Combínalos con verduras y cereales.'},
{id:'grain',name:'Cereales y tubérculos',color:'#f8b315',target:3,weight:25,advice:'Prefiere cereales integrales por su fibra. Para la escuela: un sándwich de pan integral con verduras.'},
{id:'limit',name:'Productos para limitar',color:'#ff6029',target:0,weight:0,advice:'Limita las bebidas azucaradas. Revisa los sellos y elige agua simple para acompañar tus comidas.'},
{id:'water',name:'Agua simple',color:'#37bcf7',target:0,weight:0,advice:'El agua ayuda a hidratarte. Lleva una botella reutilizable a la escuela; no ocupa un grupo del plato.'}
];
// Recetas explícitas para esta dinámica; no se infieren rellenos ocultos.
const foods=[
  {
    "name": "Zanahoria",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-zanahoria.svg"
  },
  {
    "name": "Aguacate",
    "group": "fat",
    "groups": [
      "fat"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-aguacate.svg"
  },
  {
    "name": "Huevo",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-huevo.svg"
  },
  {
    "name": "Huevo cocido",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-huevo-2.svg"
  },
  {
    "name": "Plátano",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-platanos.svg"
  },
  {
    "name": "Carne",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-carne.svg"
  },
  {
    "name": "Carne de res asada",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-carne-res.svg"
  },
  {
    "name": "Pera",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pera.svg"
  },
  {
    "name": "Pepitas",
    "group": "fat",
    "groups": [
      "fat"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pepitas.svg"
  },
  {
    "name": "Limón",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-limon.svg"
  },
  {
    "name": "Habas",
    "group": "legume",
    "groups": [
      "legume"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-habas.svg"
  },
  {
    "name": "Uvas",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-uva.svg"
  },
  {
    "name": "Pasta",
    "group": "grain",
    "groups": [
      "grain"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pasta.svg"
  },
  {
    "name": "Pescado",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-filete-de-pescado.svg"
  },
  {
    "name": "Sandía",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-sandia.svg"
  },
  {
    "name": "Brócoli",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-brocoli.svg"
  },
  {
    "name": "Betabel",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-betabel.svg"
  },
  {
    "name": "Lentejas",
    "group": "legume",
    "groups": [
      "legume"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-lentejas.svg"
  },
  {
    "name": "Jitomate",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-jitomate.svg"
  },
  {
    "name": "Nopal",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-nopal.svg"
  },
  {
    "name": "Bolillo",
    "group": "grain",
    "groups": [
      "grain"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-bolillo.svg"
  },
  {
    "name": "Pollo",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pollo.svg"
  },
  {
    "name": "Pepino",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pepino.svg"
  },
  {
    "name": "Chayote",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-chayote.svg"
  },
  {
    "name": "Maíz",
    "group": "grain",
    "groups": [
      "grain"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-elote.svg"
  },
  {
    "name": "Tortillas de maíz",
    "group": "grain",
    "groups": [
      "grain"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-tortillas.svg"
  },
  {
    "name": "Pimiento",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-pimiento.svg"
  },
  {
    "name": "Garbanzos",
    "group": "legume",
    "groups": [
      "legume"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/nuevo-garbanzos.svg"
  },
  {
    "name": "Arroz con verduras",
    "group": "grain",
    "groups": [
      "grain",
      "produce"
    ],
    "ingredients": {
      "grain": "arroz",
      "produce": "zanahoria y chícharos tiernos"
    },
    "note": "",
    "src": "assets/comida/nuevo-arroz.svg"
  },
  {
    "name": "Quesadilla con queso",
    "group": "grain",
    "groups": [
      "grain",
      "animal"
    ],
    "ingredients": {
      "grain": "tortilla de maíz",
      "animal": "queso"
    },
    "note": "En este juego usamos la versión con queso; otros rellenos cambian los grupos.",
    "src": "assets/comida/nuevo-quesadillas.svg"
  },
  {
    "name": "Torta de jamón con verduras",
    "group": "grain",
    "groups": [
      "grain",
      "animal",
      "produce"
    ],
    "ingredients": {
      "grain": "bolillo",
      "animal": "jamón",
      "produce": "lechuga y jitomate"
    },
    "note": "Versión del juego. Alterna el jamón con rellenos como frijoles o pollo.",
    "src": "assets/comida/nuevo-torta.svg"
  },
  {
    "name": "Tacos de canasta de frijol",
    "group": "legume",
    "groups": [
      "grain",
      "legume"
    ],
    "ingredients": {
      "grain": "tortilla de maíz",
      "legume": "frijoles"
    },
    "note": "Versión de frijol en este juego; los de papa o carne pertenecen a otros grupos.",
    "src": "assets/comida/nuevo-tacos-de-canasta.svg"
  },
  {
    "name": "Tamal de pollo",
    "group": "animal",
    "groups": [
      "grain",
      "animal"
    ],
    "ingredients": {
      "grain": "masa de maíz",
      "animal": "pollo"
    },
    "note": "El relleno no se distingue en la imagen: para el juego usamos la versión de pollo.",
    "src": "assets/comida/nuevo-tamales.svg"
  },
  {
    "name": "Elote con queso",
    "group": "grain",
    "groups": [
      "grain",
      "animal"
    ],
    "ingredients": {
      "grain": "maíz",
      "animal": "queso"
    },
    "note": "Versión del juego con queso. Modera la sal y los aderezos.",
    "src": "assets/comida/nuevo-elote-preparado.svg"
  },
  {
    "name": "Esquites con queso",
    "group": "grain",
    "groups": [
      "grain",
      "animal"
    ],
    "ingredients": {
      "grain": "maíz",
      "animal": "queso"
    },
    "note": "Versión del juego con queso. Modera la sal y los aderezos.",
    "src": "assets/comida/nuevo-esquites.svg"
  },
  {
    "name": "Chicharrón preparado",
    "group": "grain",
    "groups": [
      "grain",
      "produce",
      "animal"
    ],
    "ingredients": {
      "grain": "base de harina de trigo",
      "produce": "col y jitomate",
      "animal": "cueritos"
    },
    "note": "Versión del juego con cueritos. Es una preparación frita; modera la frecuencia y los aderezos.",
    "src": "assets/comida/nuevo-chicharron-preparado.svg"
  },
  {
    "name": "Jicaleta",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {
      "produce": "jícama"
    },
    "note": "La jícama cuenta como verdura. Modera las coberturas dulces y saladas.",
    "src": "assets/comida/nuevo-jicaleta.svg"
  },
  {
    "name": "Pepino con chile",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {
      "produce": "pepino"
    },
    "note": "Modera la sal del sazonador.",
    "src": "assets/comida/nuevo-pepino-con-chile--tajin.svg"
  },
  {
    "name": "Vaso de fruta",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {
      "produce": "fruta en trozos"
    },
    "note": "Prefiere la fruta sin jarabes ni azúcar añadida.",
    "src": "assets/comida/nuevo-vaso-de-fruta.svg"
  },
  {
    "name": "Hielo saborizado",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-bonice.svg"
  },
  {
    "name": "Chocolate",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-chocolate.svg"
  },
  {
    "name": "Mazapán",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-mazapan.svg"
  },
  {
    "name": "Paleta de caramelo",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-paleta-de-caramelo.svg"
  },
  {
    "name": "Barritas dulces",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-barritas.svg"
  },
  {
    "name": "Sopa instantánea",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-comida-corrida--maruchan.svg"
  },
  {
    "name": "Pan dulce",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-pan-dulce.svg"
  },
  {
    "name": "Gelatina dulce",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-gelatina.svg"
  },
  {
    "name": "Gomitas enchiladas",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-gomitas-enchiladas.svg"
  },
  {
    "name": "Congelada saborizada",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-congeladas.svg"
  },
  {
    "name": "Cereal azucarado",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-cereal.svg"
  },
  {
    "name": "Galletas",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-galletas.svg"
  },
  {
    "name": "Salsa de soya",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "Producto para limitar en esta dinámica. Revisa sus ingredientes y su contenido de azúcar o sodio.",
    "src": "assets/comida/nuevo-soya.svg"
  },
  {
    "name": "Manzana",
    "group": "produce",
    "groups": [
      "produce"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/fruta-1.svg"
  },
  {
    "name": "Leche",
    "group": "animal",
    "groups": [
      "animal"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/animal-3.svg"
  },
  {
    "name": "Refresco",
    "group": "limit",
    "groups": [
      "limit"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/chatarra-1.svg"
  },
  {
    "name": "Agua simple",
    "group": "water",
    "groups": [
      "water"
    ],
    "ingredients": {},
    "note": "",
    "src": "assets/comida/sano-9.svg"
  }
];
const tips=['Para la escuela: fruta entera y agua simple.','Prueba una torta de frijoles con verduras.','Elige pan integral para tu sándwich.'];
let state='intro',items=[],counts={},caught={},points=0,elapsed=0,last=0,nextSpawn=0,frame=0,basketX=.5,tipIndex=0,messageUntil=0,tipUntil=0,deck=[],selectedGroup=null,foodBags={};
const keys=new Set();const field=$('field');const basket=$('basket');
function reset(){items.forEach(f=>f.el.remove());items=[];counts=Object.fromEntries(groups.map(g=>[g.id,0]));caught={};points=0;elapsed=0;nextSpawn=.2;basketX=.5;tipIndex=0;messageUntil=0;tipUntil=0;deck=[];selectedGroup=null;foodBags={};keys.clear();$('tip').hidden=true;$('catch-message').classList.remove('visible');updateHud();positionBasket();}
function progress(){return Math.round(groups.reduce((sum,g)=>sum+(g.target?Math.min(counts[g.id]/g.target,1)*g.weight:0),0));}
function updateHud(){$('timer').textContent=`00:${String(Math.max(0,Math.ceil(30-elapsed))).padStart(2,'0')}`;const n=progress();$('percent').textContent=n+'%';$('ring').style.strokeDashoffset=295.31*(1-n/100);}
function geometry(){const w=field.clientWidth,h=field.clientHeight,bw=basket.clientWidth,bh=basket.clientHeight;return {w,h,bw,bh,left:basketX*w-bw/2,top:h*.92-bh};}
function positionBasket(){const {w,bw}=geometry();if(!w)return;basketX=Math.max(bw/(2*w),Math.min(1-bw/(2*w),basketX));basket.style.left=`${basketX*w-bw/2}px`;}
function nextFood(){if(!deck.length){deck=['produce','grain','produce','legume','produce','animal','grain','fat','produce','legume','grain','water','limit'];for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}}const category=deck.pop();if(!foodBags[category]?.length){foodBags[category]=foods.filter(f=>f.group===category);for(let i=foodBags[category].length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[foodBags[category][i],foodBags[category][j]]=[foodBags[category][j],foodBags[category][i]];}}return foodBags[category].pop();}
function foodSize(width,desktop){return desktop?Math.max(72,Math.min(112,width*.115)):Math.max(40,Math.min(72,width*.075));}
function spawn(){const food=nextFood(),{w,h}=geometry();const size=foodSize(w,window.matchMedia('(min-width: 701px)').matches);const el=document.createElement('img');el.src=food.src;el.alt=food.name;el.className='food';el.style.width=el.style.height=size+'px';field.append(el);items.push({food,el,size,x:Math.random()*Math.max(0,w-size),y:-size,speed:h*(.43+elapsed*.005)});}
function capture(food){const fresh=!caught[food.name];const gain=food.group==='limit'?0:food.group==='water'?5:fresh?15:10;for(const id of new Set(food.groups))counts[id]++;caught[food.name]=(caught[food.name]||0)+1;points+=gain;const categoryNames=food.groups.map(id=>groups.find(g=>g.id===id).name).join(' + ');$('catch-message').textContent=`${food.name} · ${categoryNames} · +${gain} pts${fresh&&gain===15?' ¡Variedad!':''}`;$('catch-message').classList.add('visible');messageUntil=elapsed+1.5;updateHud();}
function start(){cancelAnimationFrame(frame);reset();state='playing';$('pause-dialog').close();$('pause').hidden=false;$('intro').hidden=true;$('results').hidden=true;$('learn').hidden=true;field.focus({preventScroll:true});last=performance.now();frame=requestAnimationFrame(tick);}
function pauseGame(){
 if(state!=='playing')return;
 state='paused';cancelAnimationFrame(frame);keys.clear();
 $('pause-time').textContent=$('timer').textContent;$('pause-detail').textContent=`Canasta: ${points} puntos · ${$('percent').textContent} completo`;
 $('pause-dialog').showModal();$('resume').focus({preventScroll:true});
}
function resumeGame(){
 if(state!=='paused'||document.hidden)return;
 keys.clear();last=performance.now();state='playing';
 $('pause-dialog').close();field.focus({preventScroll:true});
 frame=requestAnimationFrame(tick);
}
function tick(now){if(state!=='playing')return;if(document.hidden){pauseGame();return;}const dt=Math.max(0,(now-last)/1000);last=now;elapsed=Math.min(30,elapsed+dt);if(elapsed>=30){finish();return;}const {w,h,bw,bh,top}=geometry();const move=(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0);basketX+=move*dt*1.1;positionBasket();const newLeft=basketX*w-bw/2;const rim=top+bh*.52;
if(elapsed>=nextSpawn){spawn();nextSpawn=elapsed+.40;}
items=items.filter(f=>{const before=f.y+f.size;f.y+=f.speed*dt;const after=f.y+f.size;const x=f.x+f.size/2; // Swept crossing prevents missing a fast falling food.
if(before<=rim&&after>=rim&&x>=newLeft+bw*.07&&x<=newLeft+bw*.93){capture(f.food);f.el.remove();return false;}if(f.y>h){f.el.remove();return false;}f.el.style.transform=`translate(${f.x}px,${f.y}px)`;return true;});
if(elapsed>messageUntil)$('catch-message').classList.remove('visible');if(tipIndex<tips.length&&elapsed>6+tipIndex*9){$('tip-text').textContent=tips[tipIndex++];$('tip').hidden=false;tipUntil=elapsed+3.5;}if(elapsed>tipUntil)$('tip').hidden=true;updateHud();frame=requestAnimationFrame(tick);}
function selectGroup(group){if(selectedGroup===group.id){showSummary();return;}selectedGroup=group.id;$('show-summary').hidden=false;document.querySelectorAll('.group-bar').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===group.id)));$('detail-title').textContent=group.name;$('summary').textContent=`Atrapaste ${counts[group.id]} ${counts[group.id]===1?'alimento o bebida':'alimentos o bebidas'} de esta categoría.`;$('advice').textContent=group.advice;const list=$('food-list');list.replaceChildren();list.className='food-list';for(const food of foods.filter(f=>f.groups.includes(group.id)&&caught[f.name])){const chip=document.createElement('div');chip.className='food-chip';const img=document.createElement('img');img.src=food.src;img.alt='';const label=document.createElement('span');label.textContent=`${food.name} × ${caught[food.name]}`;if(food.ingredients[group.id]){const detail=document.createElement('small');detail.textContent=`Cuenta aquí por: ${food.ingredients[group.id]}. ${food.note}`;label.append(detail);}else if(food.note){const detail=document.createElement('small');detail.textContent=food.note;label.append(detail);}chip.append(img,label);list.append(chip);}if(!list.children.length)list.textContent='Esta vez no atrapaste alimentos de esta categoría.';}
function finish(){state='results';$('pause').hidden=true;keys.clear();updateHud();$('tip').hidden=true;$('catch-message').classList.remove('visible');$('results').hidden=false;$('score').textContent=`Tus elecciones suman ${points} pts · ${progress()}% completo`;$('bars').replaceChildren();const max=Math.max(1,...Object.values(counts));for(const group of groups){const button=document.createElement('button');button.className='group-bar';button.dataset.group=group.id;button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','food-list');button.style.setProperty('--color',group.color);const label=document.createElement('span');label.className='bar-label';label.textContent=group.name;const count=document.createElement('span');count.textContent=counts[group.id];label.append(count);const track=document.createElement('div');track.className='bar-track';const fill=document.createElement('span');fill.className='bar-fill';fill.style.width=(counts[group.id]/max*100)+'%';track.append(fill);button.append(label,track);button.addEventListener('click',()=>selectGroup(group));$('bars').append(button);}
showSummary();$('results-title').focus({preventScroll:true});}
function showSummary(){selectedGroup=null;$('show-summary').hidden=true;document.querySelectorAll('.group-bar').forEach(b=>b.setAttribute('aria-pressed','false'));
const variety=groups.filter(g=>g.target&&counts[g.id]>0).length;$('detail-title').textContent='¿Qué nos dicen tus elecciones?';$('summary').textContent=`Atrapaste ${Object.values(caught).reduce((a,b)=>a+b,0)} alimentos y bebidas: cubriste ${variety} de los 5 grupos del plato y recogiste ${counts.limit} productos para limitar. Un platillo puede aparecer en varias barras según sus ingredientes; sus puntos se cuentan una sola vez.`;$('food-list').replaceChildren();$('advice').textContent='Da más espacio a verduras y frutas, elige cereales integrales e incluye leguminosas. Combina distintos alimentos durante el día.';}
window.addEventListener('keydown',e=>{if(state==='playing'&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();keys.add(e.key);}});window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>{keys.clear();pauseGame();});document.addEventListener('visibilitychange',()=>{keys.clear();if(document.hidden)pauseGame();});
function point(e){if(state!=='playing')return;const r=field.getBoundingClientRect();basketX=(e.clientX-r.left)/r.width;positionBasket();}
field.addEventListener('pointerdown',e=>{if(state==='playing'){field.setPointerCapture(e.pointerId);point(e);}});field.addEventListener('pointermove',e=>{if(field.hasPointerCapture(e.pointerId))point(e);});window.addEventListener('resize',positionBasket);
function openLearn(){state='learn';$('results').hidden=true;$('learn').hidden=false;$('learn').scrollTop=0;$('learn-title').focus({preventScroll:true});}
function closeLearn(){state='results';$('learn').hidden=true;$('results').hidden=false;$('discover').focus({preventScroll:true});}
$('discover').addEventListener('click',openLearn);$('back-results').addEventListener('click',closeLearn);$('show-summary').addEventListener('click',showSummary);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&state==='learn')closeLearn();});
$('pause-restart').addEventListener('click',start);
$('pause').addEventListener('click',pauseGame);$('resume').addEventListener('click',resumeGame);
$('pause-dialog').addEventListener('cancel',e=>{e.preventDefault();resumeGame();});
$('start').addEventListener('click',start);$('restart').addEventListener('click',start);
for(const food of foods){const img=new Image();img.src=food.src;}reset();
})();
