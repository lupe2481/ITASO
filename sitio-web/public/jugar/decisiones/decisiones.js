(function(){
'use strict';
const D=window.DecisionData,E=window.DecisionEngine,$=id=>document.getElementById(id),key='itaso-decisiones-v2';
let state=E.fresh();
try{localStorage.removeItem('itaso-decisiones-v1');state=E.restore(localStorage.getItem(key));}catch{$('storage-note').hidden=false;}
let day=E.activeDay(state),period=state.days[day].findIndex(n=>n===null),view='play',previousView='play';
if(period<0)period=2;
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{$('storage-note').hidden=false;}}
function el(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
function focus(id){$(id).focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function show(name){view=name;$('pause').hidden=name!=='play';for(const n of ['intro','play','end','history'])$(n+'-view').hidden=n!==name;$('juego').classList.toggle('is-history',name==='history');}
function points(value){return (value>0?'+':'')+value+' puntos';}
function setProgress(done){$('progress-text').textContent=done+' de 3 decisiones completadas';$('decision-progress').setAttribute('aria-valuenow',done);$('decision-progress').querySelector('.progress-fill').style.width=(done/3*100)+'%';}
function renderFeedback(option){$('feedback').hidden=!option;if(!option)return;$('delta').textContent=points(option.points)+' · puntaje del juego';$('explanation').textContent=option.effect;$('suggestion').textContent=option.suggestion;$('continue').textContent=E.completed(state,day)?'Ver resultados del día':'Continuar a '+D.periods[state.days[day].findIndex(n=>n===null)].toLowerCase();}
function renderPlay(moveFocus=false){show('play');const count=state.days[day].filter(n=>n!==null).length;$('day-label').textContent=D.days[day]+' · Un día para acompañar';setProgress(count);$('today-score').textContent=count?points(E.score(state,day)):'Se muestra después de elegir';$('question-title').textContent='Una decisión para '+D.periods[period].toLowerCase();$('question').textContent=D.questions[day][period].prompt;
 document.querySelectorAll('[data-period]').forEach(b=>{const p=Number(b.dataset.period),canOpen=state.days[day].slice(0,p).every(n=>n!==null);b.setAttribute('aria-pressed',String(p===period));b.classList.toggle('done',state.days[day][p]!==null);b.disabled=!canOpen;});
 const selected=state.days[day][period];$('options').replaceChildren();$('options').classList.toggle('answered',selected!==null);
 D.questions[day][period].options.forEach((option,index)=>{const button=el('button',option.text,'option');button.disabled=selected!==null;button.setAttribute('aria-pressed',String(selected===index));button.addEventListener('click',()=>{if(!E.choose(state,day,period,index))return;save();renderPlay();$('continue').focus({preventScroll:true});$('feedback').scrollIntoView({block:'nearest',behavior:'instant'});});$('options').append(button);});
 renderFeedback(selected===null?null:D.questions[day][period].options[selected]);if(moveFocus)focus('question-title');
}
function renderEnd(moveFocus=true){show('end');const value=E.score(state,day);$('end-day').textContent=D.days[day]+' · 3 de 3 decisiones completadas';$('end-title').textContent='Así cerramos el día';$('end-message').textContent='Este resumen reúne las opciones que elegiste como cuidador. Cada familia puede ajustar las ideas a su tiempo, presupuesto y preferencias.';$('end-score').textContent='Puntaje del juego: '+points(value);$('end-decisions').replaceChildren();let ideaChoice=null;D.periods.forEach((name,p)=>{const option=D.questions[day][p].options[state.days[day][p]],a=el('article');a.append(el('h3',name),el('p',option.text),el('strong',points(option.points)));$('end-decisions').append(a);if(!ideaChoice||option.points<ideaChoice.points)ideaChoice=option;});$('end-idea').textContent=ideaChoice.suggestion;$('next-day').textContent='Jugar otro día';if(moveFocus)focus('end-title');}
function openHistory(index){if(view!=='history')previousView=view;show('history');$('history-title').textContent=D.days[index];$('day-tile').textContent=D.shortDays[index];const count=state.days[index].filter(n=>n!==null).length;$('history-status').textContent=count?('Puntaje del juego: '+points(E.score(state,index))):'Aún no hay decisiones guardadas para este día';$('history-progress-text').textContent=count+' de 3 decisiones completadas';$('history-progress-fill').style.width=(count/3*100)+'%';$('week-total').textContent='Puntaje acumulado de la semana: '+points(state.days.reduce((sum,_,d)=>sum+E.score(state,d),0));$('history-periods').replaceChildren();D.periods.forEach((name,p)=>{const card=el('section',undefined,'history-period');card.append(el('h2',name));const n=state.days[index][p];if(n===null)card.append(el('p','Todavía no hay una decisión para este momento.'));else{const option=D.questions[index][p].options[n];card.append(el('p',option.text),el('p',points(option.points)+' · puntaje del juego','effect'));const details=el('details');details.append(el('summary','Ver explicación y sugerencia'),el('p',option.effect),el('p',option.suggestion));card.append(details);}$('history-periods').append(card);});$('history-days').replaceChildren();D.days.forEach((name,i)=>{if(i===index)return;const b=el('button',name,'history-day');b.append(el('small',E.completed(state,i)?points(E.score(state,i))+' · Día completo':state.days[i].some(n=>n!==null)?points(E.score(state,i))+' · En curso':'Sin jugar'));b.addEventListener('click',()=>openHistory(i));$('history-days').append(b);});focus('history-title');}
$('start-game').addEventListener('click',()=>{if(E.completed(state,day))renderEnd();else renderPlay(true);});
$('continue').addEventListener('click',()=>{if(E.completed(state,day))renderEnd();else{period=state.days[day].findIndex(n=>n===null);renderPlay(true);}});
document.querySelectorAll('[data-period]').forEach(b=>b.addEventListener('click',()=>{const next=Number(b.dataset.period);if(state.days[day].slice(0,next).some(n=>n===null))return;period=next;renderPlay(true);}));
$('next-day').addEventListener('click',()=>{if(day===6){$('reset-dialog').showModal();return;}day++;period=0;renderPlay(true);});
$('see-week').addEventListener('click',()=>openHistory(day));$('back-game').addEventListener('click',()=>{if(previousView==='end'&&E.completed(state,day))renderEnd();else renderPlay(true);});
for(const id of ['learn-nav','discover'])$(id).addEventListener('click',()=>$('learn-dialog').showModal());document.querySelector('.close-dialog').addEventListener('click',()=>$('learn-dialog').close());$('reset-week').addEventListener('click',()=>$('reset-dialog').showModal());$('cancel-reset').addEventListener('click',()=>$('reset-dialog').close());$('confirm-reset').addEventListener('click',()=>{state=E.fresh();day=0;period=0;save();$('reset-dialog').close();renderPlay(true);});
const navigation=window.ITASO_CONFIG?.navigation||{};for(const label of document.querySelectorAll('[data-nav]')){const href=navigation[label.dataset.nav];if(!href)continue;try{const url=new URL(href,location.href);if(!['https:','http:'].includes(url.protocol))continue;const link=el('a',label.textContent,label.className);link.href=url.href;label.replaceWith(link);}catch{}}
$('pause').addEventListener('click',()=>{
  $('pause-time').textContent=state.days[day].filter(n=>n!==null).length+'/3';
  $('pause-detail').textContent=D.days[day]+' · '+D.periods[period]+' · '+points(E.score(state,day))+'. Reiniciar día conserva los demás días de tu semana.';
  $('pause-dialog').showModal();
});
$('resume').addEventListener('click',()=>$('pause-dialog').close());
$('pause-restart').addEventListener('click',()=>{
  state.days[day]=[null,null,null];period=0;save();$('pause-dialog').close();renderPlay(true);
});
$('pause-dialog').addEventListener('cancel',event=>{event.preventDefault();$('pause-dialog').close();});
show('intro');
})();
