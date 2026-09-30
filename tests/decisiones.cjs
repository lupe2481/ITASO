const assert=require('node:assert/strict');
const fs=require('node:fs');
const E=require('../dist/decisiones/engine.js'),D=require('../dist/decisiones/questions.js');
const html=fs.readFileSync(require.resolve('../dist/decisiones/index.html'),'utf8');
const app=fs.readFileSync(require.resolve('../dist/decisiones/decisiones.js'),'utf8');
assert.match(html,/id="intro-view"/);assert.match(html,/id="start-game"[^>]*>Empezar</);
assert.match(html,/tres momentos cotidianos de cuidado/i);assert.doesNotMatch(html,/upgrade-note|Actualizamos las situaciones y respuestas/);
assert.match(app,/localStorage\.removeItem\('itaso-decisiones-v1'\)/);assert.match(app,/\$\('start-game'\)\.addEventListener\('click'/);assert.match(app,/show\('intro'\);\s*\}\)\(\);/);
assert.equal(D.questions.length,7);assert.equal(new Set(D.questions.flat().map(q=>q.prompt)).size,21);
for(const row of D.questions){
 assert.equal(row.length,3);
 for(const q of row){
  assert.equal(q.options.length,3);
  assert.deepEqual(q.options.map(o=>o.points).sort((a,b)=>a-b),[-5,5,15]);
  assert.ok(q.options.every(o=>o.text&&o.effect&&o.suggestion));
  assert.ok(!/^(yo|me|mi|tengo|voy|elijo|como|salgo|hago)\b/i.test(q.prompt),'La situación debe hablar desde el rol cuidador');
 }
}
const oneDay=E.fresh();
assert.equal(E.activeDay(oneDay),0);assert.equal(E.score(oneDay,0),0);
assert.equal(E.choose(oneDay,0,1,0),null,'No se puede saltar mañana');
for(let p=0;p<3;p++){
 const options=D.questions[0][p].options;
 assert.ok(E.choose(oneDay,0,p,0));
 const before=JSON.stringify(oneDay);assert.equal(E.choose(oneDay,0,p,1),null,'No se puede responder dos veces');assert.equal(JSON.stringify(oneDay),before);
 assert.deepEqual(E.restore(JSON.stringify(oneDay)),oneDay);
}
assert.equal(E.completed(oneDay,0),true);assert.equal(E.completed(oneDay,1),false);assert.equal(E.activeDay(oneDay),1);
assert.ok(E.choose(oneDay,1,0,0),'El resultado diario no exige completar la semana');
for(const mode of ['best','worst','mixed']){
 let state=E.fresh();
 for(let d=0;d<7;d++){
  assert.equal(E.activeDay(state),d);assert.equal(E.score(state,d),0);
  assert.equal(E.choose(state,d+1,0,0),null);
  for(let p=0;p<3;p++){
   const choices=D.questions[d][p].options;const i=mode==='mixed'?p:choices.findIndex(o=>o.points===(mode==='best'?15:-5));
   assert.ok(E.choose(state,d,p,i));const before=JSON.stringify(state);assert.equal(E.choose(state,d,p,(i+1)%3),null);assert.equal(JSON.stringify(state),before);
   state=E.restore(JSON.stringify(state));
  }
  assert.equal(E.completed(state,d),true);if(mode==='best')assert.equal(E.score(state,d),45);if(mode==='worst')assert.equal(E.score(state,d),-15);
 }
 assert.ok(state.days.every((_,d)=>E.completed(state,d)));
 assert.equal(E.choose(state,6,2,0),null);
}
for(const raw of ['{','null','{}',JSON.stringify({version:2,days:[]}),JSON.stringify({version:1,days:Array(7).fill([9,null,null])})])assert.deepEqual(E.restore(raw),E.fresh());
const future=E.fresh();future.days[1][0]=1;assert.deepEqual(E.restore(JSON.stringify(future)),E.fresh());
assert.equal(E.choose(E.fresh(),0,0,NaN),null);
console.log('PASS: 21 caregiver situations, full day result, optional week progression, ordered choices, duplicate protection, game scoring and persistence validation.');
