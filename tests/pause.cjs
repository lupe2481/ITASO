const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'../dist');
function harness(){
 const elements=new Map();
 class Element{
  constructor(){this.listeners={};this.style={};this.classList={add(){},remove(){},toggle(){}};this.children=[];this.dataset={};this.hidden=false;this.open=false;this.textContent='';}
  addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)}
  click(){for(const fn of this.listeners.click||[])fn({detail:0})}
  append(...children){this.children.push(...children)}
  replaceChildren(...children){this.children=children}
  setAttribute(){} getAttribute(){return ''} removeAttribute(){} focus(){} scrollIntoView(){}
  showModal(){this.open=true} close(){this.open=false}
  querySelector(selector){return get(selector)}
 }
 const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id)};
 let now=0;const timers=new Map();let timerId=0;
 const document={getElementById:get,querySelector:get,querySelectorAll:()=>[],createElement:()=>new Element(),createElementNS:()=>new Element(),body:new Element(),addEventListener(){}};
 const window={addEventListener(){},scrollTo(){}};
 const storage=new Map();
 const context=vm.createContext({document,window,console,performance:{now:()=>now},requestAnimationFrame(){},Image:class{},location:{protocol:'file:'},setTimeout(fn){timers.set(++timerId,fn);return timerId},clearTimeout(id){timers.delete(id)},setInterval(){},clearInterval(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 const load=(file,expose='')=>{let code=fs.readFileSync(path.join(root,file),'utf8');if(expose)code=code.replace(/\}\)\(\);\s*$/,expose+'\n})();');vm.runInContext(code,context)};
 return {get,load,context,timers,clock:n=>now=n,run:code=>vm.runInContext(code,context)};
}
test('games with pause have the graphical control, accessible modal and shared design',()=>{
 for(const folder of ['','decisiones','atrapar-comida','sueno']){
  const html=fs.readFileSync(path.join(root,folder,'index.html'),'utf8');
  for(const id of ['pause','pause-dialog','pause-time','pause-detail','resume','pause-restart'])assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,`${folder}: ${id}`);
  assert.match(html,/aria-label="Pausar juego"/);assert.match(html,/aria-labelledby="pause-title"/);assert.match(html,/pause\.css\?v=1/);
  assert.ok(html.indexOf('id="pause-dialog"')<html.indexOf('<script'));
 }
});
test('reaction pauses the clock and catches, resumes without lost time and offers restart',()=>{
 const h=harness();h.load('game-engine.js');h.load('reaction-foods.js');h.load('app.js','window.test={game,pause,resume};');
 h.run('window.test.game.start()');h.clock(2000);h.run('window.test.pause()');
 const frozen=h.run('window.test.game.remainingSeconds');assert.equal(h.get('pause-dialog').open,true);
 h.clock(62000);h.run('window.test.game.tick();window.test.game.catch(0)');assert.equal(h.run('window.test.game.remainingSeconds'),frozen);assert.equal(h.run('window.test.game.players[0].score'),0);
 h.get('resume').click();assert.equal(h.get('pause-dialog').open,false);h.clock(63000);h.run('window.test.game.tick()');assert.equal(h.run('window.test.game.remainingSeconds'),frozen-1);
 h.get('pause').click();h.get('pause-restart').click();assert.equal(h.get('pause-dialog').open,false);assert.equal(h.run('window.test.game.players[0].score'),0);assert.equal(h.run('window.test.game.phase'),'ready');
});
test('word search graphical restart clears words, selection, highlights and pending messages',()=>{
 const h=harness();h.load('sopa/puzzle-data.js');h.load('sopa/sopa-engine.js');h.load('sopa/sopa.js','window.test={game,choose};');
 h.run('var word=window.ITASO_WORD_SEARCH.words[0];window.test.choose(word.path[0],word.path.at(-1))');
 assert.equal(h.get('count').textContent,'1/9');assert.equal(h.timers.size,1);
 h.get('restart-game').click();assert.equal(h.get('count').textContent,'0/9');assert.equal(h.get('word-message').hidden,true);assert.equal(h.timers.size,0);assert.equal(h.get('found-lines').children.length,0);
 h.run('window.test.choose(word.path[0],word.path.at(-1))');assert.equal(h.get('count').textContent,'1/9');
 const html=fs.readFileSync(path.join(root,'sopa/index.html'),'utf8');assert.match(html,/aria-label="Reiniciar sopa de letras"/);assert.doesNotMatch(html,/id="pause-dialog"/);
});
test('decisions pause reflects points; restarting only clears the current day and persists it',()=>{
 const h=harness();h.load('decisiones/questions.js');h.load('decisiones/engine.js');h.load('decisiones/decisiones.js','window.test={getState:()=>state,setup(){state.days[0]=[0,1,2];day=1;period=1;state.days[1]=[0,null,null];renderPlay();}};');
 h.run('window.test.setup()');const before=h.run('JSON.stringify(window.test.getState())');h.get('pause').click();assert.equal(h.get('pause-time').textContent,'1/3');assert.match(h.get('pause-detail').textContent,/puntos/);h.get('resume').click();assert.equal(h.run('JSON.stringify(window.test.getState())'),before);
 h.get('pause').click();h.get('pause-restart').click();assert.equal(h.get('pause-dialog').open,false);assert.equal(h.run('JSON.stringify(window.test.getState().days[0])'),'[0,1,2]');assert.equal(h.run('JSON.stringify(window.test.getState().days[1])'),'[null,null,null]');assert.equal(h.run("window.DecisionEngine.score(window.test.getState(),1)"),0);assert.equal(h.run("localStorage.getItem('itaso-decisiones-v2')"),h.run('JSON.stringify(window.test.getState())'));
});
