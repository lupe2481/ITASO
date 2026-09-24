(function(root){
'use strict';
const data=typeof module!=='undefined'&&module.exports?require('./questions.js'):root.DecisionData;
const fresh=()=>({version:1,days:Array.from({length:7},()=>[null,null,null])});
function restore(raw){
 try{const state=JSON.parse(raw);if(state?.version!==1||!Array.isArray(state.days)||state.days.length!==7)return fresh();
 let incomplete=false;
 for(const day of state.days){if(!Array.isArray(day)||day.length!==3||day.some(n=>n!==null&&(!Number.isInteger(n)||n<0||n>2)))return fresh();if(incomplete&&day.some(n=>n!==null))return fresh();if(day.includes(null))incomplete=true;}
 return {version:1,days:state.days.map(d=>d.slice())};
 }catch{return fresh();}
}
const completed=(state,day)=>state.days[day].every(n=>n!==null);
const activeDay=state=>{const n=state.days.findIndex(d=>d.includes(null));return n<0?6:n;};
const score=(state,day)=>Math.max(0,Math.min(100,50+state.days[day].reduce((sum,n,p)=>sum+(n===null?0:data.questions[day][p].options[n].points),0)));
function choose(state,day,period,index){
 if(!Number.isInteger(day)||!Number.isInteger(period)||!Number.isInteger(index)||day<0||day>6||period<0||period>2||index<0||index>2||day!==activeDay(state)||state.days[day][period]!==null)return null;
 state.days[day][period]=index;return data.questions[day][period].options[index];
}
const feeling=value=>value>=75?{title:'¡Me siento con energía!',message:'Hoy elegiste varios hábitos que cuidan de mí. En esta historia termino el día con energía y listo para descansar.',face:'felicidad'}:value>=45?{title:'Un día con un poco de todo',message:'Algunas elecciones me ayudaron y otras dejaron hábitos pendientes. En esta historia termino el día algo cansado; mañana podemos probar algo distinto.',face:'felicidad'}:{title:'Hoy necesito recargar energía',message:'En esta historia termino el día cansado y con ganas de descansar. Podemos aprender de lo que elegimos y volver a intentarlo mañana.',face:'enojo'};
const api={fresh,restore,completed,activeDay,score,choose,feeling};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DecisionEngine=api;
})(typeof window!=='undefined'?window:globalThis);
