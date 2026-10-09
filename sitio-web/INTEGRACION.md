# ITASO · Guía de integración

Implementación en React y TypeScript de la página «Prototipado» de Figma, adaptada a computadora y celular. Las imágenes y los SVG están incluidos localmente; no depende de enlaces temporales de Figma.

## Ejecutar

Requiere Node.js 22.13 o superior y npm.

```
npm ci
npm run dev
```

Producción: `npm run build`.
Comprobación de tipos: `npx tsc --noEmit`.

## Integrar los juegos

Los seis botones de `app/game-links.ts` abren los juegos incluidos en `public/jugar/`. Los juegos conservan sus motores originales, recursos y navegación entre ellos; Inicio vuelve a `/` y el menú Juegos incluye el regreso a `/juegos`. `public/jugar/site-nav.js` consulta la cuenta del sitio, sin usar las cuentas de demostración anteriores. El selector de avatar funciona en el sitio; todavía no cambia los personajes dentro de las partidas.

La selección de avatar está en `app/sections.tsx`, componente `Games`. Los originales están en `public/avatars/`. Al abrir «Cambiar avatar» aparecen las seis opciones; la seleccionada tiene fondo gris y su SVG se muestra en escala de grises. El personaje principal conserva su color.

Con sesión, el avatar se guarda en el perfil activo. Sin sesión, se puede probar durante la visita y se informa que no se guarda al salir.

`GET /api/profile` devuelve `user` y `profiles`. Un juego puede leer `profiles.find(p => p.active)?.avatar`. Los identificadores son `flor_rosa`, `flor_2`, `flor`, `huevo`, `manzana` y `zana`. `flor_2` es azul y `flor` amarilla.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/aprende` | Tarjetas y detalles introductorios |
| `/juegos` | Seis botones y selector de avatar |
| `/nosotros` | Misión, visión, equipo desplazable y alcance |
| `/foro` | Categorías, preguntas, conversaciones y comentarios |
| `/noticias` | Textos e imágenes proporcionados en Figma |
| `/eventos` | Calendario navegable, detalles y guardado de eventos |
| `/perfil` | Hasta cuatro perfiles por cuenta, datos y avatar |
| `/cuenta` | Acceso de la plataforma |
| `/recompensas` | Catálogo para niños y adultos, puntos y logros |

## Cuentas y persistencia

Esta implementación usa el acceso de ChatGPT/Sites, no Google ni contraseñas propias. `app/chatgpt-auth.ts` concentra esa integración. Para ofrecer Google o correo/contraseña, hay que conectar el proveedor de identidad del alojamiento definitivo y adaptar `lib/server.ts`. El servidor comprueba la identidad antes de guardar.

Cloudflare D1 guarda perfiles, preguntas, comentarios y eventos guardados. El esquema está en `db/schema.ts` y la migración en `drizzle/`. `.openai/hosting.json` declara el recurso `DB`. Los datos no se sustituyen por almacenamiento del navegador.

Para inicializar la base local después de compilar:

```
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_productive_glorian.sql
```

Aplicar la migración una sola vez a una base nueva. El código de la API es específico de Cloudflare Workers; para otro servidor, hay que adaptar el acceso a la base y a la identidad.

## Límites y contenido pendiente

- Los seis juegos están conectados. Sus puntuaciones todavía no se acumulan en las recompensas. La web informa este límite; no se asignan puntos de prueba a las cuentas.
- Los botones «Aprende más» muestran el texto introductorio y acceso al foro. El prototipo no incluía destinos ni artículos completos para esos botones.
- El pie incluye los enlaces oficiales de Instagram, Facebook y TikTok proporcionados por ITASO.
- Guardar un evento no reserva un lugar ni envía mensajes.
- Las noticias y textos de salud conservan el contenido suministrado en Figma. No se verificaron editorialmente ni se actualizan automáticamente.
- El acceso y la persistencia se comprobaron con la identidad ficticia local Seedy. El inicio de sesión del alojamiento definitivo requiere verificarse allí.

## Verificaciones realizadas

Se revisaron las diez páginas, la carga de imágenes y la presentación móvil. Se probaron las seis opciones de avatar, la selección única gris y la actualización del personaje. Las escrituras sin sesión se rechazan con 401. La herramienta WebMCP `open_avatar_picker` se comprobó con entrada válida e inválida.

Se verificó con sesión ficticia local la creación del perfil y el guardado del avatar desde Perfil y Juegos, conservando la selección después de recargar.

Actualización: rosas #df0d3e, naranjas #f08223; la ruta /perfil redirige a /cuenta sin sesión y el enlace Mi perfil solo aparece con sesión.

Personajes: Appi (manzana), Zana (zanahoria), Eg (huevo), Dahli (flor rosa), Rita (amarilla) y Liri (azul). Dahli conserva #df177c. Eg usa huevo-selector.svg con contorno en ambos selectores. El avatar se guarda al seleccionarlo en Perfil y se consulta desde el mismo perfil activo en Juegos, al entrar o recuperar el foco.

## Recompensas y vista móvil (8 de octubre de 2026)
Los botones principales usan #e6007e; los títulos mantienen la paleta previa. Se retiró el formulario de nuevas preguntas y su API rechaza nuevas publicaciones; se conservan preguntas existentes y comentarios.

El catálogo está en `app/reward-catalog.ts`. Valores provisionales solicitados: stickers 100, libro 150, gorra 250, cupón 200 y bolsa 350. Los puntos son acumulativos: alcanzar el umbral desbloquea, sin descontar saldo ni simular un canje. El libro permanece pendiente hasta incorporar su PDF. Las imágenes y el PDF original están en `public/rewards`.

`GET /api/rewards` consulta la suma de `reward_points` del perfil activo autenticado. Los juegos deben registrar puntos desde su servidor, con un ID de evento único para evitar duplicados y validando que el perfil pertenece al jugador; no se expone una API para que el navegador se otorgue puntos. Ejemplo de integración: `INSERT INTO reward_points(id,profile,points,source,created) VALUES(?,?,?,?,?)`. Aplicar `drizzle/0001_puzzling_marauders.sql` una sola vez sobre la base existente. El catálogo puede cambiarse entre niños y adultos; no es un control de edad.

La descarga de stickers aparece cuando se desbloquea, pero el PDF es un recurso estático de catálogo, no un archivo privado. Para premios con valor comercial o acceso restringido, conectar una entrega autorizada desde el servidor junto con los juegos. Los premios físicos no gestionan envíos ni reservas.

La navegación móvil se despliega con Menú. Las tarjetas, calendarios, formularios y diálogos se adaptan a pantallas pequeñas.

Layouts móviles editables: https://www.figma.com/design/3LVBbtwSZFOQiYZ0YKTa3H?node-id=768-2 . En Figma se utilizaron Lilita One y Nunito Sans porque la conexión no dispone de Hansol/Avenir; la web mantiene sus fuentes originales.

Todos los encabezados móviles usan la fuente Hansol incluida en la web, hasta 760 px. La versión base se verificó con compilación y nueve rutas públicas a 390 px sin desbordamiento horizontal. Los seis botones ahora abren sus juegos correspondientes. El logo superior utiliza `public/logoo.svg`.

La integración del 9 de octubre se prepara en una publicación nueva de la cuenta actual, autorizada por la propietaria. La base nueva no contiene perfiles ni conversaciones del alojamiento anterior.

## Entrega para GitHub
Esta carpeta contiene el sitio completo, separado de los juegos de la raíz del repositorio. Subir el código no publica esta aplicación en GitHub Pages: requiere un servidor compatible con Cloudflare Workers/D1 para las cuentas y datos. No se modifica el flujo de publicación existente de los juegos.

## Integración de los juegos · 9 de octubre de 2026

Origen: repositorio ITASO, versión `68e0af9`, más los ajustes locales de color conservados.

| Juego | Ruta |
| --- | --- |
| Duelo de bocados | `/jugar/index.html` |
| Una noche tranquila | `/jugar/sueno/index.html` |
| Llena tu canasta | `/jugar/atrapar-comida/index.html` |
| Memoragua | `/jugar/memoragua/index.html` |
| Palabras para cuidar | `/jugar/sopa/index.html` |
| Un día de decisiones | `/jugar/decisiones/index.html` |

La copia de juegos aquí incluida excluye el registro y la cuenta de demostración. El historial opcional de Decisiones sigue siendo local al navegador; no es progreso sincronizado con el perfil.

La publicación de GitHub Pages se conserva durante esta transición. El sitio completo se publica mediante Sites con servidor y D1. No reemplazar el flujo de Pages por el servidor de esta aplicación.

Comprobaciones: `node tests/integration.cjs` verifica los seis accesos, el regreso, pausa, navegación y tamaños móviles contra la vista previa local. `node tests/accounts.cjs` verifica únicamente la base local y el acceso ficticio de desarrollo, nunca una cuenta real de producción. Necesitan Playwright y Chrome disponibles en el entorno de pruebas.
