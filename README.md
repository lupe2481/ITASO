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

### Acceso y cuenta de prueba

- [Iniciar sesión](https://lupe2481.github.io/ITASO/acceso/?mode=login)
- [Crear una cuenta](https://lupe2481.github.io/ITASO/acceso/?mode=register)

Demostración local, sin backend: usa nombre, correo y contraseña ficticios. Los perfiles se guardan en localStorage; las contraseñas se guardan como derivados PBKDF2 con sal aleatoria, nunca como texto. La sesión se conserva en sessionStorage de esta pestaña. No existe autenticación de servidor ni protección de recursos. Google es una simulación explícita con un perfil ficticio, sin conexión ni permisos de Google. No se envían correos de verificación o recuperación.

Tras entrar se abre Mi cuenta. Continuar jugando vuelve al juego que originó el acceso; solo se permiten los cuatro destinos internos. Cerrar sesión regresa al formulario de acceso. Para eliminar los perfiles de prueba, borra los datos del sitio en el navegador. Pruebas: `node tests/auth-demo.cjs`.

Para cuentas reales se deberá sustituir el módulo `dist/auth-demo.js` por un servicio de autenticación y configurar sus flujos de verificación y recuperación.
