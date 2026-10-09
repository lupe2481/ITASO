(function(root){
'use strict';
class WordSearch {
  constructor(data){
    this.data=data;this.cells=new Map(data.cells.map(cell=>[cell.id,cell]));this.found=new Set();
    for(const word of data.words){
      const actual=word.path.map(id=>this.cells.get(id)?.letter??'').join('');
      const expected=word.label.normalize('NFD').replace(/[\u0300-\u036f\s]/g,'');
      if(actual!==expected)throw new Error('La respuesta no coincide con el tablero: '+word.id);
    }
  }
  select(first,last){
    if(!this.cells.has(first)||!this.cells.has(last))return {status:'invalid'};
    const word=this.data.words.find(word=>{
      const a=word.path[0],b=word.path[word.path.length-1];
      return (first===a&&last===b)||(first===b&&last===a);
    });
    if(!word)return {status:'invalid'};
    if(this.found.has(word.id))return {status:'duplicate',word};
    this.found.add(word.id);
    return {status:'found',word,complete:this.complete,count:this.found.size};
  }
  reset(){this.found.clear();}
  get complete(){return this.found.size===this.data.words.length;}
}
root.ItasoWordSearch=WordSearch;
})(typeof window==='undefined'?globalThis:window);
