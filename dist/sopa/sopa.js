(()=>{
'use strict';
const $=id=>document.getElementById(id),data=window.ITASO_WORD_SEARCH;
const game=new window.ItasoWordSearch(data),buttons=new Map();
const svgNS='http://www.w3.org/2000/svg';
let anchor=null,gesture=null,completionTimer=null,messageTimer=null,returnToCompletion=false;
const points=ids=>ids.map(id=>{const c=game.cells.get(id);return `${c.x},${c.y}`;}).join(' ');
function selection(first,last=first){
  const exact=data.words.find(w=>(w.path[0]===first&&w.path.at(-1)===last)||(w.path[0]===last&&w.path.at(-1)===first));
  $('selection-line').setAttribute('points',points(exact?exact.path:[first,last]));
  $('selection-line').removeAttribute('hidden');
}
function clearSelection(){
  anchor=null;gesture=null;$('selection-line').setAttribute('hidden','');
  buttons.forEach(button=>button.classList.remove('is-start'));
}
function setAnchor(id){anchor=id;buttons.forEach((button,key)=>button.classList.toggle('is-start',key===id));selection(id);$('selection-status').textContent='Ahora selecciona la última letra de la palabra.';}
function focusCell(id){buttons.forEach((button,key)=>button.tabIndex=key===id?0:-1);buttons.get(id).focus({preventScroll:true});}
function showMessage(word){
  clearTimeout(messageTimer);
  $('word-message-title').textContent=`¡Encontraste ${word.label}!`;
  $('word-message-body').textContent=word.message;
  $('word-message').hidden=false;
  messageTimer=setTimeout(()=>$('word-message').hidden=true,6500);
}
function renderFound(){
  $('count').textContent=`${game.found.size}/${data.words.length}`;
  $('progress').setAttribute('aria-label',`${game.found.size} de ${data.words.length} palabras encontradas. Ver mis palabras`);
  const foundIds=new Set();
  $('found-lines').replaceChildren();
  for(const word of data.words){
    const found=game.found.has(word.id),li=$('clue-'+word.id);
    li.classList.toggle('is-found',found);
    li.querySelector('.clue-word').hidden=!found;
    if(found){
      word.path.forEach(id=>foundIds.add(id));
      const line=document.createElementNS(svgNS,'polyline');line.setAttribute('points',points(word.path));line.dataset.word=word.id;$('found-lines').append(line);
    }
  }
  data.cells.forEach(cell=>buttons.get(cell.id).setAttribute('aria-label',`Fila ${cell.row+1}, letra ${cell.col+1}: ${cell.letter}${foundIds.has(cell.id)?', encontrada':''}`));
}
function complete(){
  $('word-message').hidden=true;
  if(!$('completion').open)$('completion').showModal();
}
function choose(first,last){
  clearSelection();
  if(game.complete)return;
  const result=game.select(first,last);
  if(result.status==='invalid'){$('selection-status').textContent='Inténtalo de nuevo: elige la primera y la última letra de una respuesta.';return;}
  if(result.status==='duplicate'){$('selection-status').textContent=`Ya encontraste ${result.word.label}. Busca otra palabra.`;return;}
  $('selection-status').textContent='';renderFound();showMessage(result.word);
  if(result.complete)completionTimer=setTimeout(complete,3300);
}
function tap(id){
  if(anchor===id){clearSelection();$('selection-status').textContent='Selección cancelada.';}
  else if(anchor)choose(anchor,id);
  else setAnchor(id);
}
function cellAt(event){
  const rect=$('letters').getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width*data.width,y=(event.clientY-rect.top)/rect.height*data.height;
  if(x<0||y<0||x>data.width||y>data.height)return null;
  let best=null,distance=Infinity;
  for(const cell of data.cells){const d=(cell.x-x)**2+(cell.y-y)**2;if(d<distance){distance=d;best=cell;}}
  return distance<45**2?best.id:null;
}
for(const cell of data.cells){
  const row=data.cells.filter(c=>c.row===cell.row),index=row.indexOf(cell);
  const gap=Math.min(index>0?cell.x-row[index-1].x:60,index<row.length-1?row[index+1].x-cell.x:60);
  const width=Math.min(58,gap*.95),height=55;
  const b=document.createElement('button');b.type='button';b.className='letter';b.dataset.cell=cell.id;
  b.style.left=`${Math.max(0,cell.x-width/2)/data.width*100}%`;b.style.top=`${Math.max(0,cell.y-height/2)/data.height*100}%`;
  b.style.width=`${Math.min(width,data.width-Math.max(0,cell.x-width/2))/data.width*100}%`;b.style.height=`${Math.min(height,data.height-Math.max(0,cell.y-height/2))/data.height*100}%`;
  b.tabIndex=buttons.size===0?0:-1;buttons.set(cell.id,b);$('letter-buttons').append(b);
  b.addEventListener('click',event=>{if(event.detail===0&&!game.complete)tap(cell.id);});
  b.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();clearSelection();$('selection-status').textContent='Selección cancelada.';return;}
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    event.preventDefault();let next;
    if(event.key==='ArrowLeft')next=row[Math.max(0,index-1)];
    if(event.key==='ArrowRight')next=row[Math.min(row.length-1,index+1)];
    if(event.key==='Home')next=row[0];
    if(event.key==='End')next=row.at(-1);
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){
      const target=cell.row+(event.key==='ArrowUp'?-1:1);
      next=data.cells.filter(c=>c.row===target).sort((a,b)=>Math.abs(a.x-cell.x)-Math.abs(b.x-cell.x))[0];
    }
    if(next)focusCell(next.id);
  });
}
for(const word of data.words){
  const li=document.createElement('li');li.id='clue-'+word.id;
  const clue=document.createElement('span');clue.textContent=word.clue;
  const label=document.createElement('strong');label.className='clue-word';label.textContent='✓ '+word.label;label.hidden=true;
  li.append(clue,label);$('clues').append(li);
}
$('letters').addEventListener('pointerdown',event=>{
  if(event.button!==0||gesture||game.complete)return;
  const button=event.target.closest('.letter');if(!button)return;
  event.preventDefault();focusCell(button.dataset.cell);
  gesture={id:event.pointerId,first:button.dataset.cell,prior:anchor,moved:false,x:event.clientX,y:event.clientY};
  $('letters').setPointerCapture(event.pointerId);selection(anchor||gesture.first,gesture.first);
});
$('letters').addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  if(Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>5)gesture.moved=true;
  const id=cellAt(event);
  if(id)selection(gesture.moved?gesture.first:(gesture.prior||gesture.first),id);
});
$('letters').addEventListener('pointerup',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const current=gesture,id=cellAt(event);gesture=null;
  if($('letters').hasPointerCapture(event.pointerId))$('letters').releasePointerCapture(event.pointerId);
  if(!id){clearSelection();$('selection-status').textContent='Selección cancelada. Vuelve a intentarlo sobre las letras.';return;}
  if(current.moved){choose(current.first,id);return;}
  anchor=current.prior;tap(current.first);
});
$('letters').addEventListener('pointercancel',()=>{clearSelection();$('selection-status').textContent='Selección cancelada.';});
$('letters').addEventListener('lostpointercapture',()=>{if(gesture)clearSelection();});
window.addEventListener('blur',()=>{if(gesture)clearSelection();});
$('dismiss-message').addEventListener('click',()=>{$('word-message').hidden=true;});
function openInformation(mode){
  clearSelection();
  const words=mode==='found'?data.words.filter(w=>game.found.has(w.id)):data.words;
  $('information-title').textContent=mode==='found'?'Tus palabras encontradas':'Pequeños hábitos para cuidarnos';
  const content=$('information-content');content.replaceChildren();
  if(mode==='found'){
    const p=document.createElement('p');p.className='information-progress';p.textContent=words.length?`${words.length} de 9 palabras encontradas`:'Aún no has encontrado palabras. Resuelve las pistas y búscalas en el plato.';content.append(p);
  }
  for(const word of words){const article=document.createElement('article'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=word.label;p.textContent=word.message;article.append(h,p);content.append(article);}
  returnToCompletion=game.complete;
  if(game.complete)clearTimeout(completionTimer);
  if($('completion').open)$('completion').close();
  $('word-message').hidden=true;
  $('close-information-bottom').textContent=game.complete?'Volver al resultado':'Seguir jugando';
  $('information').showModal();
}
$('progress').addEventListener('click',()=>openInformation('found'));
$('learn-nav').addEventListener('click',()=>openInformation('all'));
$('discover').addEventListener('click',()=>openInformation('all'));
for(const id of ['close-information','close-information-bottom'])$(id).addEventListener('click',()=>$('information').close());
$('information').addEventListener('close',()=>{if(returnToCompletion){returnToCompletion=false;complete();}});
$('completion').addEventListener('cancel',()=>{clearTimeout(completionTimer);});
$('replay').addEventListener('click',()=>{
  clearTimeout(completionTimer);clearTimeout(messageTimer);$('completion').close();$('word-message').hidden=true;
  game.reset();clearSelection();renderFound();$('selection-status').textContent='¡Una nueva oportunidad para encontrar las nueve palabras!';
  $('board-scroll').scrollLeft=0;focusCell(data.cells[0].id);
});
$('zoom').addEventListener('click',()=>{
  const active=document.querySelector('.board-section').classList.toggle('is-zoomed');
  $('zoom').setAttribute('aria-pressed',String(active));$('zoom').textContent=active?'Reducir tablero':'Ampliar tablero';
  $('selection-help').textContent=active?'Mueve la barra horizontal para recorrer el plato. Selecciona los extremos de una palabra.':'Arrastra sobre una palabra o toca su primera y última letra.';
});
document.addEventListener('click',event=>{if(!event.target.closest('.games-menu'))document.querySelector('.games-menu').open=false;});
renderFound();
})();
