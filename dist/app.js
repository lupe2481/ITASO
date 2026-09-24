(() => {
'use strict';
const $ = id => document.getElementById(id);
const names = ['Betabel','Aguacate','Limón','Huevo','Jitomate','Plátanos','Uvas','Zanahoria','Agua simple','Leche'];
const foods = names.map((name,i) => ({id:`sano-${i+1}`,name,healthy:true,image:`assets/alimentos/sano-${i+1}.svg`}));
foods.push({id:'chatarra-1',name:'Refresco',healthy:false,image:'assets/alimentos/chatarra-1.svg'});
const game = new window.ReactionGame({foods});
let countdownId, countdownRunning=false, activeFood=null, lastFeedback=null, lastTime=null, pausedForLearn=false;
const held = new Set();
const show = (id,visible) => $(id).hidden=!visible;
const formatTime = value => `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`;

function render() {
  const seconds = game.remainingSeconds;
  if(seconds !== lastTime) { $('timer').textContent=formatTime(seconds);lastTime=seconds; }
  document.querySelector('.timer').classList.toggle('urgent',seconds<=10 && game.phase==='playing');
  for(let i=0;i<2;i++) $('score-'+i).textContent=game.players[i].score;
  const food = game.current?.food;
  show('food-slot',Boolean(food));
  if(food && food.id!==activeFood) {
    const img=$('food-image'); img.src=food.image;img.alt=food.name;
    $('food-name').textContent=food.name;
    img.style.animation='none';void img.offsetWidth;img.style.animation='';
  }
  activeFood=food?.id ?? null;
  if(game.feedback!==lastFeedback) {
    lastFeedback=game.feedback;
    $('feedback').textContent=lastFeedback ? `Jugador ${lastFeedback.playerIndex+1} · ${lastFeedback.points>0?'+':''}${lastFeedback.points} puntos` : '';
    $('feedback').style.color=lastFeedback?.playerIndex===1?'#b4360b':'#007dab';
  }
  for(let i=0;i<2;i++) $('catch-'+i).disabled=game.phase!=='playing';
}

function startCountdown() {
  clearInterval(countdownId);game.reset();held.clear();lastTime=null;lastFeedback=null;
  document.body.classList.remove('results-open');show('results',false);show('start-card',false);show('countdown',true);show('pause',false);
  $('feedback').textContent='';$('countdown').textContent='3';countdownRunning=true;
  $('juego').focus({preventScroll:true});render();
  let count=3;
  countdownId=setInterval(()=>{
    count--;
    if(count>0) $('countdown').textContent=count;
    else {clearInterval(countdownId);countdownRunning=false;show('countdown',false);game.start();show('pause',true);render();}
  },1000);
}

function catchFood(index) {
  const result=game.catch(index);
  if(!result) return;
  const hand=$('hand-'+index);hand.classList.add('caught');
  setTimeout(()=>hand.classList.remove('caught'),160);
  render();
}

function resultCard(player,index) {
  const card=document.createElement('article');card.className='result-card';
  const healthy=player.healthy.length, occasional=player.occasional.length;
  card.innerHTML=`<div class="result-heading"><h2>Jugador ${index+1}</h2><strong>${player.score} pts</strong></div><h3>Atrapaste:</h3><div class="result-count"><span>${healthy} alimento${healthy===1?'':'s'} saludable${healthy===1?'':'s'}</span><b>+${healthy*10}</b></div><div class="result-count"><span>${occasional} alimento${occasional===1?'':'s'} ocasional${occasional===1?'':'es'}</span><b>${occasional?'−':' '}${occasional*5}</b></div>`;
  const details=document.createElement('details');details.open=true;
  const summary=document.createElement('summary');summary.textContent='Alimentos que elegiste';details.append(summary);
  if(!player.catches.length){const p=document.createElement('p');p.textContent='No atrapaste alimentos esta ronda.';details.append(p);}
  else {
    const list=document.createElement('ul');list.className='captured-list';
    const groups=new Map();
    player.catches.forEach(food=>{const entry=groups.get(food.id);if(entry)entry.count++;else groups.set(food.id,{...food,count:1});});
    [...groups.values()].sort((a,b)=>Number(b.healthy)-Number(a.healthy)).forEach(food=>{
      const li=document.createElement('li');const img=document.createElement('img');img.src=food.image;img.alt='';
      const label=document.createElement('span');label.textContent=`${food.name} × ${food.count}`;
      const score=document.createElement('b');score.textContent=`${food.healthy?'+':'−'}${food.count*Math.abs(food.points)}`;
      li.append(img,label,score);list.append(li);
    });details.append(list);
  }
  card.append(details);return card;
}

function finish() {
  show('pause',false);show('food-slot',false);held.clear();
  const result=game.result;
  $('winner').textContent=result.winner===null?'¡Es un empate!':`¡Ganó el Jugador ${result.winner+1}!`;
  $('result-columns').replaceChildren(...result.players.map(resultCard));
  document.body.classList.add('results-open');show('results',true);$('winner').focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
  if(window.parent!==window && location.protocol!=='file:') {
    window.parent.postMessage({type:'itaso:round-finished',scores:result.players.map(p=>p.score),winner:result.winner===null?null:result.winner+1},location.origin);
  }
}

function pause() {
  if(game.phase!=='playing')return;
  game.pause();
  if(game.phase==='finished'){render();finish();return;}
  held.clear();$('pause-dialog').showModal();render();
}
function resume() {if($('pause-dialog').open)$('pause-dialog').close();game.resume();held.clear();$('juego').focus({preventScroll:true});render();}
function learn() {
  if(countdownRunning){clearInterval(countdownId);countdownRunning=false;show('countdown',false);show('start-card',true);}
  pausedForLearn=game.phase==='playing';
  if(pausedForLearn)game.pause();
  $('learn-dialog').showModal();
}
$('learn-dialog').addEventListener('close',()=>{if(pausedForLearn){game.resume();pausedForLearn=false;held.clear();} });
$('learn-dialog').querySelector('.close-dialog').addEventListener('click',()=>$('learn-dialog').close());
$('learn-nav').addEventListener('click',learn);$('discover').addEventListener('click',learn);
$('start').addEventListener('click',startCountdown);$('replay').addEventListener('click',startCountdown);
$('pause').addEventListener('click',pause);$('resume').addEventListener('click',resume);
$('pause-dialog').addEventListener('cancel',event=>{event.preventDefault();resume();});
for(let i=0;i<2;i++) {
  $('catch-'+i).addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();catchFood(i);});
  $('catch-'+i).addEventListener('click',event=>{if(event.detail===0)catchFood(i);});
}
document.addEventListener('keydown',event=>{
  if(event.altKey || event.ctrlKey || event.metaKey)return;
  if(event.key==='Escape' && game.phase==='playing') {event.preventDefault();pause();return;}
  if(!['Tab','Enter'].includes(event.key) || !(game.phase==='playing'||countdownRunning))return;
  if($('learn-dialog').open || $('pause-dialog').open)return;
  event.preventDefault();
  if(event.repeat||held.has(event.key))return;
  held.add(event.key);
  if(game.phase==='playing')catchFood(event.key==='Tab'?0:1);
},true);
document.addEventListener('keyup',event=>held.delete(event.key));
function onLeave() {
  held.clear();
  if(countdownRunning){clearInterval(countdownId);countdownRunning=false;show('countdown',false);show('start-card',true);}
  if(game.phase==='playing')pause();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)onLeave();});
window.addEventListener('blur',onLeave);
function frame() {
  if(game.phase==='playing') {game.tick();render();}
  if(game.phase==='finished' && $('results').hidden){render();finish();}
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
if(document.modelContext?.registerTool) {
  const lifecycle=new AbortController();
  try { Promise.resolve(document.modelContext.registerTool({
    name:'read_reaction_round',title:'Leer la ronda de reacción',
    description:'Consulta el tiempo, los puntos y las capturas de la ronda actual sin modificar el juego.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},
    annotations:{readOnlyHint:true,untrustedContentHint:false},
    execute(input){
      if(!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).length)throw new Error('Se espera un objeto vacío.');
      return {phase:countdownRunning?'countdown':game.phase,seconds:game.remainingSeconds,players:game.players.map((p,i)=>({player:i+1,score:p.score,foods:p.catches.map(f=>({name:f.name,points:f.points}))})),winner:game.result?.winner===null?'tie':game.result?game.result.winner+1:null};
    }
  },{signal:lifecycle.signal})).catch(()=>{}); }catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
const assets=[...foods.map(food=>food.image),...document.querySelectorAll('.art,.logo,.catch img')].map(item=>typeof item==='string'?item:item.getAttribute('src'));
Promise.all(assets.map(src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=reject;image.src=src;}))).then(()=>{ $('start').disabled=false;$('start').textContent='¡A jugar!'; }).catch(()=>{$('start').textContent='Recarga para cargar las imágenes';});
// Optional links supplied by the host page when embedding this standalone game.
const navigation=window.ITASO_CONFIG?.navigation || {};
for(const label of document.querySelectorAll('[data-nav]')) {
  const href=navigation[label.dataset.nav];
  if(!href)continue;
  try {const url=new URL(href,location.href);if(!['http:','https:'].includes(url.protocol))continue;const link=document.createElement('a');link.href=url.href;link.textContent=label.textContent;link.className=label.className;label.replaceWith(link);}catch{}
}
})();
