/* Demostración local: no autentica usuarios ante un servidor ni protege recursos. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ItasoDemo=api;})(globalThis,function(){
'use strict';
const PROFILE_KEY='itaso.demo.profiles.v1',SESSION_KEY='itaso.demo.session.v1';
const destinations={reaccion:'index.html',sopa:'sopa/index.html',decisiones:'decisiones/index.html',canasta:'atrapar-comida/index.html'};
function nextKey(value){return Object.hasOwn(destinations,value)?value:'reaccion';}
function destination(value,prefix='../'){return prefix+destinations[nextKey(value)];}
function createStore(storage,session,cryptoApi){
 const encode=new TextEncoder();
 function profiles(){try{const data=JSON.parse(storage.getItem(PROFILE_KEY)||'[]');return Array.isArray(data)?data:[];}catch{return [];}}
 function write(key,value,target){try{target.setItem(key,JSON.stringify(value));}catch{throw Error('No se pudo guardar la prueba en este navegador. Habilita el almacenamiento local e inténtalo de nuevo.');}}
 function emailOf(value){return String(value).trim().toLowerCase();}
 async function hash(password,salt){if(!cryptoApi?.subtle)throw Error('Abre esta prueba desde el sitio HTTPS de ITASO.');const key=await cryptoApi.subtle.importKey('raw',encode.encode(password),'PBKDF2',false,['deriveBits']);const bytes=await cryptoApi.subtle.deriveBits({name:'PBKDF2',salt:Uint8Array.from(salt),iterations:120000,hash:'SHA-256'},key,256);return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
 function open(profile){const data={name:profile.name,email:profile.email,provider:profile.provider||'local-demo'};write(SESSION_KEY,data,session);return data;}
 function current(){try{const data=JSON.parse(session.getItem(SESSION_KEY)||'null');return data&&typeof data.name==='string'&&typeof data.email==='string'&&['local-demo','google-demo'].includes(data.provider)?data:null;}catch{return null;}}
 async function register(name,email,password){name=String(name).trim();email=emailOf(email);if(name.length<2||name.length>60)throw Error('Escribe un nombre de entre 2 y 60 caracteres.');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)throw Error('Escribe un correo válido, por ejemplo prueba@example.com.');if(password.length<8||password.length>128)throw Error('Usa una contraseña de prueba de entre 8 y 128 caracteres.');if(profiles().some(p=>p.email===email))throw Error('Este correo ya tiene una cuenta de prueba aquí. Inicia sesión.');const salt=Array.from(cryptoApi.getRandomValues(new Uint8Array(16)));const digest=await hash(password,salt);const list=profiles();if(list.some(p=>p.email===email))throw Error('Este correo ya tiene una cuenta de prueba aquí. Inicia sesión.');const profile={name,email,salt,digest};list.push(profile);write(PROFILE_KEY,list,storage);return open(profile);}
 async function login(email,password){const profile=profiles().find(p=>p.email===emailOf(email));if(!profile||!Array.isArray(profile.salt)||await hash(password,profile.salt)!==profile.digest)throw Error('El correo o la contraseña no coinciden. Crea primero una cuenta de prueba en este navegador.');return open(profile);}
 function google(){return open({name:'Visitante de prueba',email:'demo@example.com',provider:'google-demo'});}
 function logout(){try{session.removeItem(SESSION_KEY);}catch{throw Error('No se pudo cerrar la sesión de prueba. Inténtalo de nuevo.');}}
 return {register,login,google,current,logout};
}
return {createStore,nextKey,destination};
});
