const assert=require('node:assert/strict');
const E=require('../dist/decisiones/engine.js'),D=require('../dist/decisiones/questions.js');
assert.equal(D.questions.length,7);assert.equal(new Set(D.questions.flat().map(q=>q.prompt)).size,21);
for(const row of D.questions){assert.equal(row.length,3);for(const q of row){assert.equal(q.options.length,3);assert.deepEqual(q.options.map(o=>o.points).sort((a,b)=>a-b),[-15,-5,15]);assert.ok(q.options.every(o=>o.text&&o.message));}}
for(const mode of ['best','worst','mixed']){
 let state=E.fresh();
 for(let d=0;d<7;d++){
  assert.equal(E.activeDay(state),d);assert.equal(E.score(state,d),50);
  assert.equal(E.choose(state,d+1,0,0),null);
  for(const p of [2,0,1]){
   const choices=D.questions[d][p].options;const i=mode==='mixed'?p:choices.findIndex(o=>o.points===(mode==='best'?15:-15));
   assert.ok(E.choose(state,d,p,i));const before=JSON.stringify(state);assert.equal(E.choose(state,d,p,(i+1)%3),null);assert.equal(JSON.stringify(state),before);
   assert.deepEqual(E.restore(JSON.stringify(state)),state);state=E.restore(JSON.stringify(state));
  }
  assert.equal(E.completed(state,d),true);if(mode==='best')assert.equal(E.score(state,d),95);if(mode==='worst')assert.equal(E.score(state,d),5);
 }
 assert.ok(state.days.every((_,d)=>E.completed(state,d)));
 assert.equal(E.choose(state,6,2,0),null);
}
for(const raw of ['{','null','{}',JSON.stringify({version:2,days:[]}),JSON.stringify({version:1,days:Array(7).fill([9,null,null])})])assert.deepEqual(E.restore(raw),E.fresh());
const future=E.fresh();future.days[1][0]=1;assert.deepEqual(E.restore(JSON.stringify(future)),E.fresh());
assert.equal(E.choose(E.fresh(),0,0,NaN),null);
console.log('PASS: 21 questions, 3 full-week paths, out-of-order periods, duplicate protection, scores and persistence validation.');
