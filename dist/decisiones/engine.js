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
const score=(state,day)=>state.days[day].reduce((sum,n,p)=>sum+(n===null?0:data.questions[day][p].options[n].points),0);
function choose(state,day,period,index){
 if(!Number.isInteger(day)||!Number.isInteger(period)||!Number.isInteger(index)||day<0||day>6||period<0||period>2||index<0||index>2||day!==activeDay(state)||state.days[day][period]!==null||state.days[day].slice(0,period).some(n=>n===null))return null;
 state.days[day][period]=index;return data.questions[day][period].options[index];
}
const api={fresh,restore,completed,activeDay,score,choose};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DecisionEngine=api;
})(typeof window!=='undefined'?window:globalThis);
