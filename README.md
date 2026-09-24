# Itaso · Juegos para cuidar

Juegos web construidos con HTML, CSS y JavaScript. Incluyen sus ilustraciones y tipografías locales, sin dependencias de instalación.

## Jugar en el navegador

- [Reacción rápida](https://lupe2481.github.io/ITASO/): dos jugadores, rondas de **30 segundos**, Tab y Enter para atrapar alimentos. Saludables: +10; ocasionales: −5.
- [Palabras para cuidar](https://lupe2481.github.io/ITASO/sopa/): sopa de letras con nueve palabras, pistas, selección con mouse, pantalla táctil o teclado, mensajes educativos y reinicio.

El menú **Juegos** permite cambiar entre los juegos. También puedes abrir `dist/index.html` o `dist/sopa/index.html` directamente en tu navegador.

## Publicación

GitHub Actions publica el contenido de `dist` en GitHub Pages al actualizar `main`.

Consulta [las instrucciones completas](LEEME.md) para controles e integración en otra página.

Los gráficos y fuentes se incluyen para este proyecto; este repositorio no concede una licencia adicional de redistribución de esos recursos.

### Un día de decisiones

https://lupe2481.github.io/ITASO/decisiones/

Tercer juego: 21 preguntas para una semana, barra de bienestar, cierre diario e historial guardado en el navegador. Abre `dist/decisiones/index.html` para jugar localmente. Pruebas: `node tests/decisiones.cjs`.

### Llena tu canasta

https://lupe2481.github.io/ITASO/atrapar-comida/

Juego de 30 segundos para atrapar alimentos con flechas o controles táctiles. Incluye siete categorías, consejos, resumen interactivo y pantalla educativa con enlace al IMSS. Abre `dist/atrapar-comida/index.html` para jugar localmente. Pruebas: `node tests/atrapar-comida.cjs`.
