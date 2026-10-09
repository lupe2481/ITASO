export type Audience='children'|'adults';
export const rewardCatalog=[
 {id:'stickers',name:'Stickers',audience:'children' as Audience,points:100,image:'/rewards/stickers.png',file:'/rewards/stickers.pdf',description:'Tus personajes de ITASO para imprimir.',ready:true},
 {id:'gorra',name:'Gorra',audience:'children' as Audience,points:250,image:'/rewards/gorra.png',file:null,description:'Lleva a Appi contigo.',ready:true},
 {id:'libro',name:'Libro para colorear',audience:'children' as Audience,points:150,image:null,file:null,description:'Un espacio para darle color a tus personajes.',ready:false},
 {id:'cupon',name:'Cupón de descuento',audience:'adults' as Audience,points:200,image:null,file:null,description:'Un beneficio para seguir cuidándote.',ready:true},
 {id:'bolsa',name:'Bolsa de tela',audience:'adults' as Audience,points:350,image:'/rewards/tote.png',file:null,description:'ITASO te acompaña todos los días.',ready:true},
];
