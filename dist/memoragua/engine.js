(function (root) {
  'use strict';
  const GROUPS = [
    {id:1, name:'Agua simple', color:'#28abe0', quantity:'6–8 vasos al día en la guía general.', tip:'El agua simple es la primera opción para hidratarte.', detail:'Las necesidades de niñas, niños y adolescentes cambian con la edad, la actividad y el clima. Esta cifra no es una meta universal para ellos.'},
    {id:2, name:'Leche y soya sin azúcar', color:'#04ce34', quantity:'0–2 vasos al día en la guía general.', tip:'Elige leche baja en grasa o bebida de soya sin azúcar.', detail:'Este grupo incluye leche descremada o semidescremada. «Deslactosada» no significa baja en grasa: revisa la etiqueta. La leche entera se clasifica en el grupo 5. El tipo y la cantidad para NNA dependen de su edad y alimentación.'},
    {id:3, name:'Café y té sin azúcar', color:'#f30083', quantity:'0–4 tazas en la guía general para adultos; no es una recomendación para NNA.', tip:'En niñas, niños y adolescentes es mejor evitar la cafeína.', detail:'El café y algunos tés contienen cafeína. Reconocer estas bebidas no significa que debas tomarlas. Sin azúcar añadida pertenecen a este grupo.'},
    {id:4, name:'Bebidas con edulcorantes', color:'#f66d14', quantity:'0–2 vasos en la guía general para adultos.', tip:'Para niñas, niños y adolescentes, es mejor evitarlas.', detail:'Los refrescos de dieta o sin azúcar pueden llevar edulcorantes. Que no tengan azúcar no los convierte en la mejor bebida para hidratarse.'},
    {id:5, name:'Jugos y bebidas calóricas', color:'#eb001d', quantity:'0–½ vaso al día en la guía general.', tip:'Prefiere la fruta entera al jugo.', detail:'Aquí se clasifican el jugo 100 % de fruta, la leche entera y las bebidas deportivas. La cantidad de jugo para NNA depende de la edad. Los néctares y bebidas de fruta con azúcar añadida pertenecen al grupo 6.'},
    {id:6, name:'Bebidas azucaradas', color:'#ffe100', quantity:'0 vasos: evita su consumo.', tip:'Elige agua simple en lugar de refrescos.', detail:'Incluye refrescos y aguas de sabor con azúcar añadida. No hacen falta para una buena hidratación.'}
  ];
  const DRINKS = [
    ["vaso", "Agua en vaso", 1, "vaso-agua.svg", "Agua potable sin azúcar."],
    ["epura", "Agua · botella azul", 1, "epura.svg", "Agua simple embotellada."],
    ["litro", "Agua · un litro", 1, "litro.svg", "Agua simple en botella de un litro."],
    ["medio", "Agua · medio litro", 1, "medio.svg", "Agua simple en botella de medio litro."],
    ["mineral", "Agua mineral", 1, "agua-mineral.svg", "Agua mineral sin azúcar ni edulcorantes."],
    ["leche", "Leche semidescremada", 2, "semidescremada.svg", "Leche semidescremada sin azúcar añadida."],
    ["soya", "Soya sin azúcar", 2, "soya.svg", "Bebida de soya sin azúcar añadida."],
    ["cafe", "Café de olla sin azúcar", 3, "cafe-olla.svg", "Café de olla sin azúcar ni piloncillo añadidos."],
    ["instantaneo", "Café soluble", 3, "cafe-soluble.svg", "Café soluble preparado sin azúcar."],
    ["te", "Té sin azúcar", 3, "te.svg", "Té preparado sin azúcar añadida."],
    ["dieta-cola", "Refresco zero", 4, "refresco-zero.svg", "Refresco sin azúcar, con edulcorantes."],
    ["dieta-lima", "Refresco sin azúcar", 4, "refresco-no-azucar.svg", "Refresco sin azúcar, con edulcorantes."],
    ["agua-sabor", "Agua de sabor sin azúcar", 4, "agua-sabor.svg", "Bebida de sabor sin azúcar, con edulcorantes."],
    ["jugo", "Jugo 100 % de fruta", 5, "jugo.svg", "Jugo sin azúcar añadida; conserva menos fibra que la fruta entera."],
    ["deportiva", "Bebida deportiva", 5, "deportiva.svg", "Bebida deportiva, clasificada en el grupo de bebidas con aporte calórico."],
    ["entera", "Leche entera", 5, "leche-entera.svg", "Leche entera, clasificada en el grupo 5 de la Jarra del Buen Beber."],
    ["refresco", "Refresco con azúcar", 6, "refreco.svg", "Bebida gaseosa con azúcar añadida."],
    ["cola", "Refresco de cola", 6, "coca.svg", "Refresco de cola con azúcar."],
    ["boing", "Bebida de fruta azucarada", 6, "boing.svg", "Bebida de fruta con azúcar añadida; no equivale a jugo 100 % de fruta."]
  ].map(([id,name,group,asset,description])=>({id,name,group,asset,description}));
  const PAIRS_PER_GAME = 15;
  class MemoryGame {
    constructor(random=Math.random) { this.random=random; this.status='idle'; this.level=1; this.remaining=90000; this.cards=[]; this.roundDrinks=[]; this.open=[]; this.matched=[]; this.errors=0; this.score=0; this.compareRemaining=0; this.lastMatch=null; }
    start(level=1) {
      this.level=level===2?2:1; this.remaining=this.level===1?90000:60000; this.status='playing';
      // Keep the complete catalog for learning; select a fresh, group-inclusive round.
      const pool = [...DRINKS];
      for(let i=pool.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
      const selected = GROUPS.map(g=>pool.find(d=>d.group===g.id));
      const remaining = pool.filter(d=>!selected.includes(d));
      this.roundDrinks = [...selected,...remaining.slice(0,PAIRS_PER_GAME-selected.length)];
      this.cards=this.roundDrinks.flatMap(d=>[d.id,d.id]);
      for(let i=this.cards.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[this.cards[i],this.cards[j]]=[this.cards[j],this.cards[i]];}
      this.open=[];this.matched=[];this.errors=0;this.score=0;this.compareRemaining=0;this.lastMatch=null;
    }
    flip(index) {
      if(this.status!=='playing'||!Number.isInteger(index)||index<0||index>=this.cards.length||this.open.length===2||this.open.includes(index)||this.matched.includes(this.cards[index]))return false;
      this.open.push(index);
      if(this.open.length===2){
        const a=this.cards[this.open[0]],b=this.cards[this.open[1]];
        if(a===b){this.matched.push(a);this.lastMatch=a;this.score+=100;this.open=[];if(this.matched.length===this.roundDrinks.length)this.status='won';}
        else{this.errors++;this.score-=20;this.compareRemaining=1000;}
      }
      return true;
    }
    tick(ms){
      if(this.status!=='playing'||!Number.isFinite(ms)||ms<=0)return;
      this.remaining=Math.max(0,this.remaining-ms);
      if(this.remaining===0){this.status='lost';this.open=[];this.compareRemaining=0;return;}
      if(this.compareRemaining>0){this.compareRemaining=Math.max(0,this.compareRemaining-ms);if(this.compareRemaining===0)this.open=[];}
    }
    pause(){if(this.status==='playing')this.status='paused';}
    resume(){if(this.status==='paused')this.status='playing';}
    count(group){return this.matched.filter(id=>DRINKS.find(d=>d.id===id).group===group).length;}
  }
  const api={MemoryGame,DRINKS,GROUPS,PAIRS_PER_GAME}; if(typeof module!=='undefined')module.exports=api; else root.Memoragua=api;
})(typeof globalThis!=='undefined'?globalThis:this);
