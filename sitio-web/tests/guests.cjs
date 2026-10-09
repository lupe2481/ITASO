const assert=require('node:assert/strict');const path=require('node:path');
let pw;try{pw=require('playwright')}catch{pw=require(path.join(require('node:os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))}
(async()=>{const b=await pw.chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});try{
 const p=await b.newPage();const base='http://localhost:5173';
 await p.goto(base+'/juegos');await p.locator('.guest-note').waitFor();assert.equal(await p.locator('a.game-button').count(),6);assert.equal(await p.getByRole('button',{name:'Cambiar avatar',exact:true}).count(),0);assert.equal(await p.locator('.avatar-choice:visible').count(),0);
 assert.equal((await (await p.request.get(base+'/api/profile')).json()).user,null);
 await p.goto(base+'/recompensas');await p.getByText('Las recompensas y los puntos del perfil requieren iniciar sesión.',{exact:false}).waitFor();assert.equal(await p.locator('.points-summary').count(),0);assert.equal(await p.locator('.reward-grid').count(),0);
 await p.getByRole('link',{name:'Seguir jugando sin cuenta'}).click();await p.locator('a.game-button').first().waitFor();
 await p.goto(base+'/cuenta');await p.getByRole('link',{name:'Continuar sin cuenta'}).click();await p.waitForURL('**/juegos');
 await p.goto(base+'/eventos');await p.getByRole('button',{name:'Ver más',exact:true}).first().click();await p.getByText('Puedes consultar los eventos sin cuenta.',{exact:false}).waitFor();assert.equal(await p.getByRole('button',{name:'Guardar evento',exact:true}).count(),0);
 await p.goto(base+'/jugar/decisiones/index.html');await p.locator('#start-game').click();await p.locator('#options button').first().click();assert.match(await p.locator('#today-score').textContent(),/puntos/);assert.equal(await p.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('itaso-decisiones')).length),0);await p.reload();await p.locator('#start-game').click();assert.equal(await p.locator('#options button:disabled').count(),0);
 assert.equal((await p.request.put(base+'/api/profile',{data:{name:'Invitado',avatar:'manzana'}})).status(),401);
 assert.equal((await p.request.post(base+'/api/rewards',{data:{points:100}})).status(),405);
 console.log('PASS: public games, no guest customization or rewards, optional sign-in, public event details, temporary game score and no guest score persistence.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
