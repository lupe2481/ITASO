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

## Segundo juego: Palabras para cuidar

Abre `dist/sopa/index.html` o visita https://lupe2481.github.io/ITASO/sopa/.

- Arrastra desde la primera letra hasta la última, o pulsa/toca ambos extremos por separado. También acepta la selección al revés.
- Teclado: Tab lleva al tablero, las flechas recorren las letras y Enter o espacio seleccionan los extremos. Esc cancela la selección.
- Cada respuesta queda resaltada en amarillo y muestra un mensaje sobre su significado. Repetir una palabra no aumenta el contador.
- El botón del contador abre el listado de palabras encontradas con sus explicaciones.
- En pantallas pequeñas, «Ampliar tablero» permite ver las letras más grandes y recorrer el tablero horizontalmente.
- Al completar las nueve palabras, «Descubre más» muestra sus significados y «Volver a jugar» limpia las selecciones y el contador. Se mantiene el mismo tablero original de Figma.
- Respuestas: FRUTA, PORCIONES, RUTINA, DESCANSO, COLACIÓN, SACIEDAD, AGUA, LAVAR MANOS y APAGAR PANTALLAS.
- Las 259 letras conservan el SVG original; las zonas de selección están alineadas con sus posiciones. Los assets propios están en `dist/sopa/assets`; el logo y las tipografías se comparten con el primer juego.
- Para incrustarlo en otra página usa un iframe con `src="/ITASO/sopa/"` (ajusta la ruta a tu servidor), un título descriptivo y suficiente altura. El juego funciona sin cuentas ni conexión a servicios de recompensas.

### Pesos de lectura

Ambos juegos incluyen Avenir Next Ultra Light (275), Regular (400) y Bold (700). Las ayudas usan Ultra Light; las descripciones y explicaciones, Regular; la navegación, botones, etiquetas y puntuaciones en Avenir, Bold. Hansol se conserva en los títulos. Las fuentes se cargan desde archivos incluidos, sin depender de las instaladas en el dispositivo.

## Tercer juego: Un día de decisiones

Abre `dist/decisiones/index.html` en Safari u otro navegador, o visita https://lupe2481.github.io/ITASO/decisiones/.

- Una semana simulada de lunes a domingo, con 21 situaciones: una para Mañana, Tarde y Noche cada día.
- Cada situación ofrece tres opciones. La barra comienza en 0 cada día; cada elección suma 15, resta 5 o resta 15 puntos y muestra una explicación. El total diario va de −45 a +45 y el 0 está marcado en el centro: los puntos positivos suben y los negativos bajan. El historial incluye puntos por decisión, totales diarios y total semanal. Es una regla educativa, no una medición de salud real.
- Los botones de momento del día permiten explorar las preguntas. Cada una se responde una sola vez; después se puede consultar la elección. «Continuar» lleva al siguiente momento pendiente.
- Al completar los tres momentos se muestra el final del día, el resultado, cómo se sintió el personaje en la historia y las tres elecciones. El botón siguiente abre el próximo día.
- El historial semanal muestra solo decisiones reales. Los días pendientes aparecen sin decisiones y las explicaciones se pueden desplegar con «Por qué».
- Se guarda únicamente el progreso de este juego en localStorage, dentro de este navegador. Si el almacenamiento no está disponible, se avisa y el juego sigue funcionando durante esa visita. Los distintos dispositivos, navegadores y versiones local/publicada no comparten progreso.
- «Empezar otra semana» pide confirmación antes de borrar el progreso de este juego.
- Fondos e ilustraciones originales: carpeta `decisiones` proporcionada. Hansol y Avenir Next Ultra Light, Regular y Bold se comparten con los otros juegos.
- Las referencias educativas de OMS, CDC y ADA están en «Descubre más». No se envían las elecciones a ningún servidor.
- Pruebas del motor y persistencia: `node tests/decisiones.cjs`.

Para integrarlo, usa un iframe con `src="/ITASO/decisiones/"`, título «Un día de decisiones» y una altura suficiente (por ejemplo, 900px), ajustando la ruta al servidor.
