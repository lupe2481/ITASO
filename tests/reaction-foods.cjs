const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const foods=require('../dist/reaction-foods.js');
test('new catalog contains unique foods and nonempty local SVG assets',()=>{assert.equal(foods.length,73);assert.equal(new Set(foods.map(f=>f.id)).size,73);for(const food of foods){assert.ok(fs.statSync(path.join(__dirname,'../dist',food.image)).size>0);assert.equal(typeof food.healthy,'boolean');assert.ok(food.note.length>0);}});
test('juices, soda and sweets lose points; fruit and vegetable snacks gain points',()=>{
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../dist/game-engine.js'),'utf8'),ctx);
 for(const id of ['boing','jugo-de-naranja','sprite','refresco','coca-cola','coca-cola-light','sidral-light','chocolate','mazapan','paleta-de-caramelo','gomitas-enchiladas']){
  const food=foods.find(f=>f.id===id);assert.equal(food.healthy,false,id);assert.match(food.note,/poca frecuencia/);const game=new ctx.window.ReactionGame({foods:[food],now:()=>0});game.start();assert.equal(game.catch(0).points,-5,id);
 }
 for(const id of ['jicaleta','vaso-de-fruta','pepino-con-chile-tajin','chicharron-preparado','elote-preparado','esquites','torta']){
  const food=foods.find(f=>f.id===id);assert.equal(food.healthy,true,id);const game=new ctx.window.ReactionGame({foods:[food],now:()=>0});game.start();assert.equal(game.catch(0).points,10,id);assert.match(food.note,/fruta o verdura/);
 }
});
