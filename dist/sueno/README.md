# Una noche tranquila · Itaso

Juego web autónomo, en español, sin dependencias ni instalación. Abre `index.html` directamente o ejecuta `python3 -m http.server 8000` y visita http://localhost:8000.

## Integración

Copia `index.html`, `style.css`, `game.js` y la carpeta `assets` a una subcarpeta del sitio. También se puede incorporar mediante un iframe con título «Una noche tranquila» y un alto suficiente (780 px en escritorio, 760 px en móvil). La navegación incluida enlaza al inicio del propio juego y a sus recomendaciones; conecta las rutas del sitio anfitrión al integrarlo.

## Reglas

- 30 segundos de juego equivalen a 9 horas simuladas.
- Cada objeto activo consume 4.5 unidades de descanso por segundo. La nota musical consume 10 al acercarse durante más de 3 segundos.
- Las apariciones se aceleran y pueden coincidir; el primer objeto de una nueva partida cambia respecto a la anterior.
- Apagar una distracción da 10 puntos, más 5 si se apaga en menos de un segundo. Llegar al amanecer da 100 puntos adicionales.
- Teclas 1 a 6: lámpara, celular, televisión, bocina, ventana y nota musical. Escape pausa o continúa.
- Cambiar de pestaña pausa automáticamente. No se guardan datos personales ni puntuaciones.

## Archivos originales

Ilustración, objetos, logo y fuentes copiados de la carpeta ITASO-juegos. Los originales no fueron modificados. El elemento móvil es una nota musical tipográfica. La ventana usa una zona interactiva sobre la ilustración.

Recomendaciones de sueño: https://www.cdc.gov/sleep/about/

## Validación

Desde la raíz del repositorio: `node --test tests/sueno.cjs`

Cubre victoria a los 30 segundos, derrota inmediata, drenaje y puntuación, pausa y reinicio, detención del objeto móvil y variación de la primera distracción.
