// Clasificación de esta dinámica: +10 saludables, −5 ocasionales.
(function(root){
'use strict';
const foods=[
  {
    "id": "arroz",
    "name": "Arroz",
    "healthy": true,
    "image": "assets/alimentos/nuevo-arroz.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "barritas",
    "name": "Barritas dulces",
    "healthy": false,
    "image": "assets/alimentos/nuevo-barritas.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "boing",
    "name": "Boing",
    "healthy": false,
    "image": "assets/alimentos/nuevo-boing.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "bonafont",
    "name": "Bonafont",
    "healthy": true,
    "image": "assets/alimentos/nuevo-bonafont.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "bonice",
    "name": "Bonice",
    "healthy": false,
    "image": "assets/alimentos/nuevo-bonice.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "cereal",
    "name": "Cereal dulce",
    "healthy": false,
    "image": "assets/alimentos/nuevo-cereal.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "chicharron-preparado",
    "name": "Chicharrón Preparado",
    "healthy": true,
    "image": "assets/alimentos/nuevo-chicharron-preparado.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "chocolate",
    "name": "Chocolate",
    "healthy": false,
    "image": "assets/alimentos/nuevo-chocolate.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "ciel",
    "name": "Ciel",
    "healthy": true,
    "image": "assets/alimentos/nuevo-ciel.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "coca-cola-light",
    "name": "Coca Cola Light",
    "healthy": false,
    "image": "assets/alimentos/nuevo-coca-cola-light.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "coca-cola",
    "name": "Coca Cola",
    "healthy": false,
    "image": "assets/alimentos/nuevo-coca-cola.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "comida-corrida-maruchan",
    "name": "Sopa instantánea con verduras",
    "healthy": true,
    "image": "assets/alimentos/nuevo-comida-corrida-maruchan.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "congeladas",
    "name": "Congeladas",
    "healthy": false,
    "image": "assets/alimentos/nuevo-congeladas.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "elote-preparado",
    "name": "Elote Preparado",
    "healthy": true,
    "image": "assets/alimentos/nuevo-elote-preparado.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "epura",
    "name": "Epura",
    "healthy": true,
    "image": "assets/alimentos/nuevo-epura.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "esquites",
    "name": "Esquites",
    "healthy": true,
    "image": "assets/alimentos/nuevo-esquites.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "galletas",
    "name": "Galletas",
    "healthy": false,
    "image": "assets/alimentos/nuevo-galletas.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "gatorade",
    "name": "Gatorade",
    "healthy": false,
    "image": "assets/alimentos/nuevo-gatorade.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "gelatina",
    "name": "Gelatina",
    "healthy": false,
    "image": "assets/alimentos/nuevo-gelatina.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "gomitas-enchiladas",
    "name": "Gomitas Enchiladas",
    "healthy": false,
    "image": "assets/alimentos/nuevo-gomitas-enchiladas.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "jicaleta",
    "name": "Jicaleta",
    "healthy": true,
    "image": "assets/alimentos/nuevo-jicaleta.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "jugo-de-naranja",
    "name": "Jugo de Naranja",
    "healthy": false,
    "image": "assets/alimentos/nuevo-jugo-de-naranja.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "lala",
    "name": "Leche entera",
    "healthy": true,
    "image": "assets/alimentos/nuevo-lala.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "leche-semidescremada",
    "name": "Leche Semidescremada",
    "healthy": true,
    "image": "assets/alimentos/nuevo-leche-semidescremada.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "licuado-de-fresa",
    "name": "Licuado de fresa",
    "healthy": true,
    "image": "assets/alimentos/nuevo-licuado-de-fresa.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "mazapan",
    "name": "Mazapán",
    "healthy": false,
    "image": "assets/alimentos/nuevo-mazapan.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "nescafe",
    "name": "Café soluble",
    "healthy": true,
    "image": "assets/alimentos/nuevo-nescafe.svg",
    "note": "Los puntos son parte del juego. Modera la cantidad y la frecuencia; esta opción no sustituye al agua simple."
  },
  {
    "id": "paleta-de-caramelo",
    "name": "Paleta de Caramelo",
    "healthy": false,
    "image": "assets/alimentos/nuevo-paleta-de-caramelo.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "pan-dulce",
    "name": "Pan Dulce",
    "healthy": false,
    "image": "assets/alimentos/nuevo-pan-dulce.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "pasta",
    "name": "Pasta",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pasta.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pepino-con-chile-tajin",
    "name": "Pepino con chile (tajín)",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pepino-con-chile-tajin.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "penafiel",
    "name": "Agua mineral",
    "healthy": true,
    "image": "assets/alimentos/nuevo-penafiel.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "quesadillas",
    "name": "Quesadillas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-quesadillas.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "sidral-light",
    "name": "Sidral Light",
    "healthy": false,
    "image": "assets/alimentos/nuevo-sidral-light.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "sprite",
    "name": "Sprite",
    "healthy": false,
    "image": "assets/alimentos/nuevo-sprite.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "tacos-de-canasta",
    "name": "Tacos de Canasta",
    "healthy": true,
    "image": "assets/alimentos/nuevo-tacos-de-canasta.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "tamales",
    "name": "Tamales",
    "healthy": true,
    "image": "assets/alimentos/nuevo-tamales.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "taza-de-cafe",
    "name": "Taza de Café",
    "healthy": true,
    "image": "assets/alimentos/nuevo-taza-de-cafe.svg",
    "note": "Los puntos son parte del juego. Modera la cantidad y la frecuencia; esta opción no sustituye al agua simple."
  },
  {
    "id": "taza-de-te",
    "name": "Taza de té",
    "healthy": true,
    "image": "assets/alimentos/nuevo-taza-de-te.svg",
    "note": "Los puntos son parte del juego. Modera la cantidad y la frecuencia; esta opción no sustituye al agua simple."
  },
  {
    "id": "torta",
    "name": "Torta con verduras",
    "healthy": true,
    "image": "assets/alimentos/nuevo-torta.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "vaso-con-agua",
    "name": "Agua simple",
    "healthy": true,
    "image": "assets/alimentos/nuevo-vaso-con-agua.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "vaso-de-fruta",
    "name": "Vaso de fruta",
    "healthy": true,
    "image": "assets/alimentos/nuevo-vaso-de-fruta.svg",
    "note": "Suma en este juego porque incluye fruta o verdura. Modera las porciones y las coberturas; si lleva frituras, mucha sal o azúcar, consúmelo con poca frecuencia."
  },
  {
    "id": "agua-sabor",
    "name": "Agua de sabor embotellada",
    "healthy": false,
    "image": "assets/alimentos/nuevo-agua-sabor.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "aguacate",
    "name": "Aguacate",
    "healthy": true,
    "image": "assets/alimentos/nuevo-aguacate.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "betabel",
    "name": "Betabel",
    "healthy": true,
    "image": "assets/alimentos/nuevo-betabel.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "bolillo",
    "name": "Bolillo",
    "healthy": true,
    "image": "assets/alimentos/nuevo-bolillo.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "brocoli",
    "name": "Brócoli",
    "healthy": true,
    "image": "assets/alimentos/nuevo-brocoli.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "carne-res",
    "name": "Carne de res",
    "healthy": true,
    "image": "assets/alimentos/nuevo-carne-res.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "carne",
    "name": "Carne",
    "healthy": true,
    "image": "assets/alimentos/nuevo-carne.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "chayote",
    "name": "Chayote",
    "healthy": true,
    "image": "assets/alimentos/nuevo-chayote.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "elote",
    "name": "Elote",
    "healthy": true,
    "image": "assets/alimentos/nuevo-elote.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "filete-de-pescado",
    "name": "Filete de pescado",
    "healthy": true,
    "image": "assets/alimentos/nuevo-filete-de-pescado.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "garbanzos",
    "name": "Garbanzos",
    "healthy": true,
    "image": "assets/alimentos/nuevo-garbanzos.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "habas",
    "name": "Habas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-habas.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "huevo-2",
    "name": "Huevo cocido",
    "healthy": true,
    "image": "assets/alimentos/nuevo-huevo-2.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "huevo",
    "name": "Huevo frito",
    "healthy": true,
    "image": "assets/alimentos/nuevo-huevo.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "jitomate",
    "name": "Jitomate",
    "healthy": true,
    "image": "assets/alimentos/nuevo-jitomate.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "leche-soya",
    "name": "Bebida de soya",
    "healthy": true,
    "image": "assets/alimentos/nuevo-leche-soya.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "lentejas",
    "name": "Lentejas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-lentejas.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "limon",
    "name": "Limón",
    "healthy": true,
    "image": "assets/alimentos/nuevo-limon.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "nopal",
    "name": "Nopal",
    "healthy": true,
    "image": "assets/alimentos/nuevo-nopal.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pepino",
    "name": "Pepino",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pepino.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pepitas",
    "name": "Pepitas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pepitas.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pera",
    "name": "Pera",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pera.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pimiento",
    "name": "Pimiento",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pimiento.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "platanos",
    "name": "Plátanos",
    "healthy": true,
    "image": "assets/alimentos/nuevo-platanos.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "pollo",
    "name": "Pollo",
    "healthy": true,
    "image": "assets/alimentos/nuevo-pollo.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "refresco",
    "name": "Refresco",
    "healthy": false,
    "image": "assets/alimentos/nuevo-refresco.svg",
    "note": "Para consumir en pequeñas cantidades y con poca frecuencia. Prefiere agua simple y fruta entera más seguido."
  },
  {
    "id": "sandia",
    "name": "Sandía",
    "healthy": true,
    "image": "assets/alimentos/nuevo-sandia.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "soya",
    "name": "Salsa de soya",
    "healthy": true,
    "image": "assets/alimentos/nuevo-soya.svg",
    "note": "Los puntos son parte del juego. Modera la cantidad y la frecuencia; esta opción no sustituye al agua simple."
  },
  {
    "id": "tortillas",
    "name": "Tortillas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-tortillas.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "uva",
    "name": "Uvas",
    "healthy": true,
    "image": "assets/alimentos/nuevo-uva.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  },
  {
    "id": "zanahoria",
    "name": "Zanahoria",
    "healthy": true,
    "image": "assets/alimentos/nuevo-zanahoria.svg",
    "note": "Varía tus alimentos y consume porciones adecuadas; no hace falta comer mucho de un solo alimento."
  }
];
if(typeof module!=='undefined'&&module.exports)module.exports=foods;else root.ITASO_REACTION_FOODS=foods;
})(typeof window!=='undefined'?window:globalThis);
