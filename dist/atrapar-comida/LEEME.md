# Llena tu canasta · Itaso

Abre `index.html` con Safari, Chrome, Firefox o Edge. No requiere instalación, servidor ni conexión, excepto para los enlaces al IMSS.

## Integrar en una página

Copia la carpeta completa a tu sitio y utiliza:

```html
<iframe src="/atrapar-comida/index.html" title="Llena tu canasta" style="width:100%;height:900px;border:0" loading="lazy"></iframe>
```

La navegación de esta entrega incluye Inicio, Aprende y Juegos. Las rutas de Nosotros, Comunidad y acceso de usuarios deben conectarse cuando exista la página anfitriona; no se implementó autenticación.

## Mecánica

- Partidas de 30 segundos reales. Cambiar de pestaña no añade tiempo.
- Flechas izquierda/derecha; arrastre o toque en móviles.
- 10 puntos por alimento; 5 extra la primera vez que aparece ese alimento en tu canasta. Agua: 5 puntos. Refresco: 0 puntos.
- Meta didáctica: 6 verduras/frutas (50% del avance), 3 cereales (25%), 2 leguminosas (15%), 1 alimento de origen animal (5%) y 1 grasa saludable (5%). Cada categoría tiene un máximo: repetir un grupo no llena los demás. Estos conteos y pesos son reglas del juego, no porciones recomendadas.
- Se muestran siete categorías de resultados, incluyendo agua y refrescos por separado. Las barras se comparan con la categoría más atrapada y siempre muestran conteos absolutos.
- Tres consejos de la mascota durante la partida. Resumen interactivo al terminar.

## Archivos

`styles.css`: diseño adaptable y tipografías locales. `game.js`: catálogo, puntuación, movimiento, colisiones y resultados. `assets/`: copias de los recursos proporcionados, sin modificar los originales.

Se revisaron visualmente las ilustraciones para asignarles nombres. Los archivos con identificación ambigua no se incluyeron en el catálogo. El maíz se clasifica en cereales, aunque su archivo se llame verdura-6.

Fuente educativa y destino de Descubre más: https://www.imss.gob.mx/node/84301 (Plato del Bien Comer Saludable y Sostenible, consultado el 24 de septiembre de 2026).

Validación: sintaxis JavaScript y pruebas de lógica sobre puntuación, colisiones, tiempo, resumen y reinicio. La revisión visual en navegador quedó pendiente por la restricción de apertura de archivos locales del navegador automatizado.

## Actualización

Corregido el selector de alimentos: cada ciclo de 13 apariciones incluye las siete categorías. La selección de una categoría ocurre antes de filtrar sus alimentos.

El panel naranja ajusta su altura al contenido. Al tocar de nuevo la barra activa, o pulsar «Ver resumen general», vuelve el mensaje inicial. «Descubre más» abre una pantalla informativa con fondo #F4F4F4 y un botón separado al sitio oficial del IMSS. Volver a resultados conserva la partida y la categoría seleccionada.

Las pruebas incluyen 20 ciclos completos de categorías y las transiciones entre detalle, resumen e información.
