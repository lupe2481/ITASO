const assert = require('node:assert/strict');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(require('node:os').homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const origin = process.env.ITASO_TEST_URL || 'http://localhost:5173';
const games = [
 ['sueno/index.html', '[data-action="start"]'],
 ['index.html', '#start'],
 ['atrapar-comida/index.html', '#start'],
 ['memoragua/index.html', '[data-action="start"]'],
 ['sopa/index.html', null],
 ['decisiones/index.html', '#start-game'],
];
(async () => {
 const browser = await playwright.chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try {
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[]; const failed=[];
 page.on('pageerror', e=>errors.push(e.message));
 page.on('response', r=>{if(r.status()>=400 && r.url().startsWith(origin))failed.push(`${r.status()} ${r.url()}`)});
 await page.goto(origin+'/juegos');
 await page.locator('.game-button').first().waitFor();
 assert.equal(await page.locator('a.game-button').count(),6);
 for(const [file,start] of games) {
   await page.locator(`a.game-button[href="/jugar/${file}"]`).click();
   await page.waitForURL('**/jugar/'+file);
   await page.evaluate(()=>document.fonts.ready);
   if(start) {
     await page.locator(start).last().click();
     await page.locator('#pause').waitFor({state:'visible'});
     if(file==='index.html') await page.waitForTimeout(3500);
     await page.locator('#pause').click();
     await page.locator('dialog[open]').waitFor();
     const resume = file.startsWith('memoragua') ? '[data-action="resume"]' : '#resume';
     await page.locator(resume).click();
     assert.equal(await page.locator('dialog[open]').count(),0);
   } else {
     assert.ok(await page.locator('#letter-buttons button').count()>50);
     await page.locator('#restart-game').click();
   }
   await page.reload();
   if(file.startsWith('memoragua')) await page.locator('[data-action="start"]').last().click();
   for(const [width,height] of [[1440,1000],[390,844],[320,667]]) {
     await page.setViewportSize({width,height});
     await page.evaluate(()=>document.fonts.ready);
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
     if(overflow) console.log(await page.locator('body *').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,60),right:e.getBoundingClientRect().right}))));
     assert.ok(!overflow,`${file} overflow at ${width}`);
     await page.locator('.games-menu summary').click();
     await page.locator('.games-menu a[href="/juegos"]').waitFor({state:'visible'});
     const box=await page.locator('.games-menu > div').boundingBox();
     assert.ok(box.x>=-1 && box.x+box.width<=width+1,`${file} menu outside viewport at ${width}`);
     await page.locator('.games-menu summary').click();
   }
   const broken=await page.locator('img').evaluateAll(es=>es.filter(e=>e.getAttribute("src") && e.complete && !e.naturalWidth).map(e=>e.src));
   assert.deepEqual(broken,[]);
   await page.locator('.games-menu summary').click();
   await page.locator('.games-menu a[href="/juegos"]').click();
   await page.locator('a.game-button').first().waitFor();
   console.log('PASS game:',file);
 }
 for(const route of ['/','/aprende','/juegos','/nosotros','/foro','/noticias','/eventos','/cuenta','/recompensas']) {
   await page.goto(origin+route);
   await page.evaluate(()=>document.fonts.ready);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'site overflow: '+route);
 }
 await page.goto(origin+'/juegos');
 await page.screenshot({path:'/tmp/itaso-juegos-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'/tmp/itaso-juegos-desktop.png',fullPage:true});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS: six launch/return flows, game interactions, desktop/mobile navigation, nine public routes, no missing resources or JS errors.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
