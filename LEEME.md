# Itaso · Reacción rápida

Abre `dist/index.html` en un navegador de escritorio. No necesita instalación ni conexión: todos los gráficos y fuentes están incluidos. También se puede alojar la carpeta `dist` en un servidor web estático.

- Jugador 1: **Tab**. Jugador 2: **Enter**.
- Pulsa «¡A jugar!» y espera la cuenta regresiva.
- La ronda dura **30 segundos de juego activo**. Cada alimento permanece 1,2 segundos y solo puede atraparse una vez.
- Saludables: **+10 puntos**. Ocasionales: **−5 puntos**. Se permiten puntuaciones negativas.
- No se premia mantener una tecla pulsada. Una pulsación sin alimento no cambia los puntos.
- Esc o «Pausar» detienen el tiempo; al cambiar de ventana se pausa automáticamente.
- Los botones Tab y Enter en pantalla también permiten jugar con controles táctiles.
- Al finalizar se muestran ganador o empate, puntos y el desglose de alimentos de ambos jugadores.
- «Descubre más» abre información educativa. «Volver a jugar» reinicia puntos y capturas.

## Integración en una página

Copia `dist` al sitio e incrústalo, por ejemplo:

```html
<iframe
  src="/juegos/reaccion-1/index.html"
  title="Itaso: juego de reacción rápida"
  style="width:100%;height:850px;border:0"
></iframe>
```

El teclado debe tener el foco dentro del juego. El botón de inicio lo coloca allí. Para quitar la barra de navegación dentro de otra página, añade `.site-header{display:none}:root{--nav-height:0px}` a la hoja de estilos.

Los nombres Inicio, Nosotros, Comunidad e Iniciar sesión se presentan como texto de la maqueta, sin inventar destinos ni autenticación. Para conectarlos a la página real, define `window.ITASO_CONFIG.navigation` antes de cargar `app.js`, con las claves `inicio`, `nosotros`, `comunidad` y `sesion` y las rutas reales de tu sitio. Aprende y Juegos ya funcionan dentro del juego.

En una integración del mismo origen, el juego envía `itaso:round-finished` al documento padre con `scores` y `winner` (1, 2 o null en empate). Valida `event.origin` y `event.source` al recibirlo. No envía información a servicios externos ni guarda datos personales.

## Archivos

- `dist/index.html`: pantallas y contenido.
- `dist/styles.css`: diseño adaptable y tipografías locales.
- `dist/app.js`: controles, alimentos, resultados y pausa.
- `dist/game-engine.js`: reglas del juego, cargadas por la página.
- `dist/game-engine.mjs`: versión importable del mismo motor para pruebas.
- `dist/assets`: originales proporcionados, fuentes y logo de Figma.

Se conservaron las clasificaciones de los archivos: diez ilustraciones `sano-*` y un refresco `chatarra-1`. El envase `sano-10` se muestra como «Leche». El sorteo incluye ocasiones de refresco y evita repetir el mismo alimento consecutivamente; solo existe una ilustración de alimento ocasional en la carpeta recibida.

El logotipo procede del diseño de Figma y el resto de ilustraciones de `reaccion-1`. La pantalla final sigue la referencia proporcionada y añade el listado real de capturas.
