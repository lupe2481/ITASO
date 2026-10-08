const {test}=require('node:test');
const assert=require('node:assert/strict');
const {MemoryGame,DRINKS,GROUPS}=require('../dist/memoragua/engine.js');
const pair=(g,id)=>g.cards.map((v,i)=>v===id?i:-1).filter(i=>i>=0);
test('both levels have the same 15 selected pairs, shuffle, and start empty',()=>{
 const g=new MemoryGame(()=>0);g.start();assert.equal(g.remaining,90000);assert.equal(g.cards.length,30);assert.equal(g.matched.length,0);assert.deepEqual(GROUPS.map(x=>g.count(x.id)),[0,0,0,0,0,0]);
 for(const d of g.roundDrinks)assert.equal(pair(g,d.id).length,2);
 assert.notDeepEqual(g.cards,DRINKS.flatMap(d=>[d.id,d.id]));g.start(2);assert.equal(g.remaining,60000);assert.equal(g.cards.length,30);
});
test('same group is not a pair; third click and duplicate selection are blocked for one second',()=>{
 const g=new MemoryGame(()=>0.37);g.start();let a=pair(g,'vaso')[0],b=pair(g,'epura')[0],c=pair(g,'te')[0];
 assert.equal(g.flip(a),true);assert.equal(g.flip(a),false);g.flip(b);assert.equal(g.matched.length,0);assert.equal(g.score,-20);assert.equal(g.errors,1);assert.equal(g.flip(c),false);g.tick(999);assert.equal(g.open.length,2);g.tick(1);assert.equal(g.open.length,0);assert.equal(g.flip(c),true);
});
test('matched pairs stay counted, cannot score twice, and update their own group',()=>{
 const g=new MemoryGame(()=>0.37);g.start();const p=pair(g,'vaso');p.forEach(i=>g.flip(i));assert.equal(g.score,100);assert.equal(g.count(1),1);assert.equal(g.count(2),0);p.forEach(i=>assert.equal(g.flip(i),false));assert.equal(g.score,100);
});
test('pause freezes both countdown and in-progress mismatch; resume retains its remaining delay',()=>{
 const g=new MemoryGame(()=>0.37);g.start();g.flip(pair(g,'vaso')[0]);g.flip(pair(g,'te')[0]);g.tick(300);g.pause();g.tick(120000);assert.equal(g.remaining,89700);assert.equal(g.compareRemaining,700);assert.equal(g.flip(7),false);g.resume();g.tick(699);assert.equal(g.open.length,2);g.tick(1);assert.equal(g.open.length,0);
});
test('time expiration stops play even with comparison pending',()=>{
 const g=new MemoryGame(()=>0.37);g.start(2);g.tick(59990);g.flip(pair(g,'vaso')[0]);g.flip(pair(g,'te')[0]);g.tick(10);assert.equal(g.status,'lost');assert.equal(g.remaining,0);assert.equal(g.open.length,0);assert.equal(g.flip(5),false);g.tick(1000);assert.equal(g.remaining,0);
});
test('last pair wins immediately and stops time; restart clears all previous state',()=>{
 const g=new MemoryGame(()=>0.37);g.start();for(const d of g.roundDrinks)pair(g,d.id).forEach(i=>g.flip(i));assert.equal(g.status,'won');assert.equal(g.score,1500);assert.equal(g.matched.length,15);g.tick(90001);assert.equal(g.remaining,90000);g.start(2);assert.equal(g.status,'playing');assert.equal(g.remaining,60000);assert.equal(g.score,0);assert.equal(g.matched.length,0);assert.equal(g.errors,0);assert.equal(g.lastMatch,null);
});
test('scores combine pairs and mistakes and invalid actions are harmless',()=>{
 const g=new MemoryGame(()=>0.37);g.start();g.flip(pair(g,'vaso')[0]);g.flip(pair(g,'te')[0]);g.tick(1000);pair(g,'vaso').forEach(i=>g.flip(i));assert.equal(g.score,80);for(const i of [-1,30,1.2,NaN])assert.equal(g.flip(i),false);const left=g.remaining;g.tick(-1);g.tick(NaN);assert.equal(g.remaining,left);
});

test('round selection varies, covers the full catalog, and represents every group',()=>{
 let seed=391;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const g=new MemoryGame(random),seen=new Set(),sets=new Set();
 for(let round=0;round<100;round++){
  g.start(round%2+1);assert.equal(g.roundDrinks.length,15);assert.equal(g.cards.length,30);
  assert.equal(new Set(g.roundDrinks.map(d=>d.id)).size,15);
  for(const group of GROUPS)assert.ok(g.roundDrinks.some(d=>d.group===group.id));
  for(const d of g.roundDrinks){assert.equal(pair(g,d.id).length,2);seen.add(d.id);pair(g,d.id).forEach(i=>g.flip(i));}
  assert.equal(g.status,'won');assert.equal(g.score,1500);
  assert.equal(GROUPS.reduce((sum,group)=>sum+g.count(group.id),0),15);
  sets.add(g.roundDrinks.map(d=>d.id).sort().join(','));
 }
 assert.equal(seen.size,DRINKS.length);assert.ok(sets.size>1);assert.equal(DRINKS.length,19);
});
