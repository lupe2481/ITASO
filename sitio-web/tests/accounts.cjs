const assert=require('node:assert/strict');
const path=require('node:path');
let pw;try{pw=require('playwright')}catch{pw=require(path.join(require('node:os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))}
const origin='http://localhost:5173';
(async()=>{
 const browser=await pw.chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try {
 const page=await browser.newPage();const api=page.request;
 assert.equal((await api.put(origin+'/api/profile',{data:{name:'Prueba'}})).status(),401);
 assert.equal((await api.post(origin+'/api/events',{data:{event:'sueno'}})).status(),401);
 assert.equal((await api.post(origin+'/api/community',{data:{post:'faq-0',body:'Comentario local'}})).status(),401);
 await page.goto(origin+'/signin-with-chatgpt?return_to=/perfil');
 await page.waitForURL('**/perfil');
 let data=await (await api.get(origin+'/api/profile')).json();assert.ok(data.user);
 const previous=data.profiles.find(p=>p.name==='Prueba de integración');
 let saved=await api.put(origin+'/api/profile',{data:{id:previous?.id,name:'Prueba de integración',avatar:'flor_rosa',age:30}});assert.equal(saved.status(),200,await saved.text());
 await page.reload();
 data=await (await api.get(origin+'/api/profile')).json();assert.equal(data.profiles.find(p=>p.active).avatar,'flor_rosa');
 await page.goto(origin+'/juegos');await page.locator('.current-avatar[data-avatar="flor_rosa"]').waitFor();
 await page.getByRole('button',{name:'Cambiar avatar',exact:true}).click();
 const choice=page.locator('.avatar-choice').filter({has:page.locator('img[alt="Appi"]')});await choice.click();
 await page.waitForTimeout(300);
 data=await (await api.get(origin+'/api/profile')).json();assert.equal(data.profiles.find(p=>p.active).avatar,'manzana');
 assert.equal((await api.put(origin+'/api/profile',{data:{id:'not-owned',name:'Prueba',avatar:'zana'}})).status(),404);
 assert.equal((await api.put(origin+'/api/profile',{headers:{origin:'https://example.invalid'},data:{name:'Prueba'}})).status(),403);
 assert.equal((await api.post(origin+'/api/events',{data:{event:'sueno'}})).status(),200);
 assert.ok((await (await api.get(origin+'/api/events')).json()).events.includes('sueno'));
 assert.equal((await api.post(origin+'/api/events',{data:{event:'sueno',remove:true}})).status(),200);
 assert.deepEqual(await (await api.get(origin+'/api/rewards')).json(),{points:0,authenticated:true});
 assert.equal((await api.post(origin+'/api/rewards',{data:{points:999}})).status(),405);
 const comment=await api.post(origin+'/api/community',{data:{post:'faq-0',body:'Comentario de prueba local de integración'}});assert.equal(comment.status(),201);
 await page.goto(origin+'/signout-with-chatgpt?return_to=/');
 assert.equal((await (await api.get(origin+'/api/profile')).json()).user,null);
 console.log('PASS: anonymous rejection, local sign-in/out, profile persistence, shared avatar, ownership, origin protection, saved events, comments and zero unearned rewards.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
