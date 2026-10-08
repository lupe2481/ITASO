const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
let playwright;try{playwright=require('playwright');}catch{playwright=require(path.join(require('node:os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const {MemoryGame,DRINKS}=require('../dist/memoragua/engine.js');
(async()=>{
 const browser=await playwright.chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Math.random=()=>0.37;});
 await page.goto(pathToFileURL(path.resolve(__dirname,'../dist/memoragua/index.html')).href);await page.evaluate(()=>document.fonts.ready);
 const clockStart = Date.now();await page.clock.install({time:clockStart});await page.clock.pauseAt(clockStart + 1000);
 const ref=new MemoryGame(()=>0.37);ref.start();
 const indices=id=>ref.cards.map((x,i)=>x===id?i:-1).filter(i=>i>=0);
 const click=i=>page.locator(`[data-index="${i}"]`).click();
 const action=x=>page.locator(`[data-action="${x}"]`).last().click();
 await page.screenshot({path:'/tmp/memoragua-inicio.png',fullPage:true,animations:'disabled'});
 await action('start');assert.equal(await page.locator('.card').count(),30);assert.equal(await page.locator('.card.is-open').count(),0);assert.equal(await page.locator('#timer').textContent(),'01:30');
 await click(indices('vaso')[0]);await click(indices('epura')[0]);assert.equal(await page.locator('.card.is-open').count(),2);assert.equal(await page.locator('#score').textContent(),'-20');assert.equal(await page.locator('.card:not(:disabled)').count(),0);
 await action('pause');assert.equal(await page.locator('.card.is-open').count(),0);const paused=await page.locator('#timer').textContent();await page.clock.runFor(10000);assert.equal(await page.locator('#timer').textContent(),paused);await page.screenshot({path:'/tmp/memoragua-pausa.png',fullPage:true,animations:'disabled'});
 await action('resume');await page.clock.runFor(1030);assert.equal(await page.locator('.card.is-open').count(),0);
 for(const i of indices('vaso'))await click(i);assert.equal(await page.locator('#pair-count').textContent(),'1');assert.equal(await page.locator('#score').textContent(),'80');
 await page.clock.runFor(350);await page.screenshot({path:'/tmp/memoragua-juego.png',fullPage:true,animations:'disabled'});
 // Both completed levels, stopped results timer, education navigation.
 for(const d of ref.roundDrinks.filter(d=>d.id!=='vaso')){for(const i of indices(d.id))await click(i);if(d.id==='jugo'){await page.clock.runFor(350);await page.screenshot({path:'/tmp/memoragua-tarjetas.png',fullPage:true,animations:'disabled'});}}
 assert.equal(await page.locator('#modal-title').textContent(),'¡Completaste los pares!');assert.equal(await page.locator('#education-panel').isVisible(),false);await page.locator('button[data-group="3"]').click();assert.match(await page.locator('#education-panel').textContent(),/Grupo 3/);await page.locator('button[data-group="3"]').click();await page.screenshot({path:'/tmp/memoragua-resultados.png',fullPage:true,animations:'disabled'});
 await action('next');assert.equal(await page.locator('#timer').textContent(),'01:00');for(const d of ref.roundDrinks)for(const i of indices(d.id))await click(i);
 assert.equal(await page.locator('.completed').textContent(),'¡Terminaste todos los niveles!');const wonTime=await page.locator('#timer').textContent();await page.clock.fastForward(90050);assert.equal(await page.locator('#timer').textContent(),wonTime);
 await action('explore');assert.equal(await page.locator('#education-panel').isVisible(),false);await page.locator('button[data-group="1"]').click();assert.match(await page.locator('#education-panel').textContent(),/6–8/);await page.locator('button[data-group="2"]').click();assert.match(await page.locator('#education-panel').textContent(),/Grupo 2/);assert.doesNotMatch(await page.locator('#education-panel').textContent(),/6–8/);await page.locator('button[data-group="2"]').click();assert.equal(await page.locator('#education-panel').isVisible(),false);let catalogCount=0;for(let group=1;group<=6;group++){await page.locator(`button[data-group="${group}"]`).click();catalogCount+=await page.locator('#education-panel .drink-mini').count();}assert.equal(catalogCount,19);await action('back');assert.equal(await page.locator('#modal-title').textContent(),'¡Completaste los pares!');
 await action('again');await page.clock.fastForward(90050);assert.equal(await page.locator('#modal-title').textContent(),'¡Se acabó el tiempo!');assert.equal(await page.locator('#timer').textContent(),'00:00');await action('again');assert.equal(await page.locator('#score').textContent(),'0');
 // Responsive geometry, touch targets, local images and keyboard pause.
 for(const [width,height] of [[1440,900],[390,844],[320,667],[844,390]]){
  await page.setViewportSize({width,height});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width}`);
  const boxes=await page.locator('.card').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
  assert.ok(boxes.every(b=>b.w>=44&&b.h>=44));if(width===1440)assert.ok(boxes.every(b=>b.w>=75),'desktop card size');
  await page.screenshot({path:`/tmp/memoragua-${width}.png`,fullPage:true,animations:'disabled'});
 }
 await page.keyboard.press('Escape');assert.equal(await page.locator('#modal-title').textContent(),'¡Una pequeña pausa!');await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
 // Reveal every original image, then verify no missing assets including accent-normalized names.
 for(const d of ref.roundDrinks)for(const i of indices(d.id))await click(i);
 const images=await page.locator('img').evaluateAll(es=>es.filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.src));assert.deepEqual(images,[]);assert.deepEqual(errors,[]);
 await browser.close();console.log('Browser checks passed: desktop/mobile layouts, matching, pause, both victories, timeout, reset, education, keyboard, images.');
})().catch(e=>{console.error(e);process.exit(1)});
