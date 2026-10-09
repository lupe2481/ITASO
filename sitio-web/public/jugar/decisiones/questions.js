(function(root){
'use strict';
const choice=(text,points,effect,suggestion)=>({text,points,effect,suggestion});
const q=(prompt,...options)=>({prompt,options});
const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const periods=['Mañana','Tarde','Noche'];
// Puntos de juego orientativos: no representan ni evalúan la salud de nadie.
const questions=[
[
q('La mañana va con prisa y hay que salir a clases. ¿Qué desayuno puedes resolver hoy?',
choice('Ofrezco algo que ya hay: por ejemplo, tortilla con frijoles o fruta',15,'Una opción disponible puede hacer más fácil incluir alimentos distintos sin preparar una receta especial.','Si el tiempo alcanza, deja a la vista dos opciones que ya tengan en casa y permite que el niño elija.'),
choice('Propongo un alimento conocido y guardo algo para el camino',5,'Un alimento familiar puede ayudar cuando hay poco tiempo o pocas ganas de probar algo nuevo.','Prueba preparar desde la noche una opción sencilla que se pueda llevar, si es adecuada para su edad.'),
choice('Salimos y vemos después si encontramos algo',-5,'Con la salida encima, quizá haya menos opciones a mano; pasa en mañanas apretadas.','Cuando se pueda, reserva una opción práctica para llevar, sin convertirlo en otra obligación.')),
q('Al volver de clases, el niño quiere jugar y tú tienes poco tiempo. ¿Qué plan es viable?',
choice('Propongo salir un rato a caminar o jugar cerca de casa',15,'Una actividad cercana y sencilla puede sumar movimiento y tiempo compartido.','Deja que el niño escoja entre dos juegos que no requieran pagar ni trasladarse.'),
choice('Acordamos una pausa activa breve antes de otras actividades',5,'Una pausa corta permite cambiar de actividad, aunque hoy no haya tiempo para una salida.','Prueben una canción para bailar o estirarse unos minutos en casa.'),
choice('Hoy priorizamos terminar pendientes y descansamos en casa',-5,'A veces las tareas y el cansancio ocupan la tarde; un día no define la rutina familiar.','Si les acomoda, acuerden una pausa para moverse mañana y elijan juntos cuándo.')),
q('Ya es hora de empezar la rutina de noche, pero el niño pide otro video. ¿Cómo lo acompañas?',
choice('Aviso con tiempo cuál será el último video y qué sigue después',15,'Anticipar el cambio puede ayudar a que la rutina sea más previsible para ambos.','Elijan juntos una señal de cierre —por ejemplo, guardar el dispositivo al terminar ese video— y manténganla flexible.'),
choice('Negociamos unos minutos más y definimos una hora para apagar',5,'Un acuerdo concreto puede funcionar mejor que discutir cuando todos están cansados.','Usa un temporizador compartido y ofrece una actividad tranquila después.'),
choice('Hoy dejamos que termine el capítulo porque la tarde fue complicada',-5,'En días difíciles, la rutina puede moverse; no es necesario compensarlo con una regla más estricta.','Mañana pueden retomar el horario habitual con un aviso previo.'))
],
[
q('El niño suele rechazar el desayuno y el presupuesto está ajustado. ¿Qué puedes ofrecer?',
choice('Algo económico que ya acepta, como frijoles o tortilla, y agua',15,'Partir de alimentos conocidos y disponibles facilita resolver el desayuno sin comprar algo especial.','Si el apetito varía, ofrece una porción pequeña y deja que pida más.'),
choice('Le pregunto si prefiere fruta o un alimento que sobró',5,'Elegir entre opciones disponibles puede dar espacio a sus preferencias.','Aprovecha sobras seguras y adecuadas para su edad antes de comprar otros productos.'),
choice('Le doy dinero para que compre algo en el camino',-5,'Puede ser una solución práctica ese día, aunque la oferta cercana quizá sea limitada.','Cuando hagan compras, acuerden una opción sencilla para llevar en otras mañanas.')),
q('Hay que acompañar tarea y actividad física; la tarde se llenó de pendientes. ¿Qué acuerdas?',
choice('Hacemos una pausa breve para caminar o movernos y luego seguimos',15,'Alternar la tarea con una pausa cambia el tiempo sentado sin necesitar una clase o equipo.','Pregúntale qué movimiento disfruta y acuerden una duración que sí quepa hoy.'),
choice('Terminamos una parte de la tarea y salimos si todavía hay tiempo',5,'Priorizar una parte concreta deja abierta la posibilidad de moverse sin sumar presión.','Definan de antemano un momento realista para la pausa, aunque sea breve.'),
choice('Resolvemos todo lo pendiente y dejamos el movimiento para otro día',-5,'Las obligaciones a veces desplazan otras actividades; no siempre se puede hacer todo.','Busquen juntos un momento sencillo mañana, como caminar un tramo cotidiano.')),
q('La rutina de sueño se retrasó. ¿Qué decisión te parece posible esta noche?',
choice('Cierro pantallas y hago con el niño los pasos esenciales para dormir',15,'Una secuencia corta y repetible puede ayudar a cerrar el día.','Elijan juntos dos pasos que sí puedan sostener, como higiene y preparar la ropa.'),
choice('Le permito terminar lo que está haciendo y movemos un poco la hora',5,'Ajustar el plan puede evitar una pelea cuando el día se alargó.','Acuerden qué actividad termina primero y cuándo será el cierre.'),
choice('Hoy no insistimos en el horario porque todos estamos cansados',-5,'La flexibilidad puede ser necesaria en una noche difícil; mañana se puede retomar la rutina.','Da un aviso amable al día siguiente para preparar el cierre con más tiempo.'))
],
[
q('Preparas el desayuno y el niño pide siempre lo mismo. ¿Cómo puedes ampliar opciones sin forzarlo?',
choice('Sirvo su alimento conocido y pongo una pequeña opción nueva aparte',15,'Mantener algo familiar y ofrecer variedad aparte respeta sus preferencias sin convertir la comida en una prueba.','Deja que decida si quiere explorar la opción nueva; no hace falta que la termine.'),
choice('Le pregunto qué fruta disponible quiere agregar, si le apetece',5,'Una elección pequeña puede hacer la comida más participativa.','Ofrece dos alternativas accesibles y acepta que hoy elija la conocida.'),
choice('Preparo lo de siempre porque vamos tarde',-5,'La prisa puede reducir las opciones que alcanzas a preparar.','Si te funciona, deja lavada o lista una alternativa sencilla cuando tengas tiempo.')),
q('El niño quiere una actividad que cuesta dinero y hoy no está en el presupuesto. ¿Qué propones?',
choice('Buscamos juntos una alternativa gratuita que también le interese',15,'Adaptar la actividad al presupuesto permite mantener el plan compartido.','Piensen en un parque, patio, baile en casa o juego que ya tengan.'),
choice('Le explico que hoy no se puede y acordamos cuándo revisar otra opción',5,'Hablar con claridad del límite ayuda a que el niño entienda el plan.','Propón una fecha para buscar una actividad gratuita o planear el gasto con calma.'),
choice('Resolvemos los pendientes de casa y dejamos la actividad para otro día',-5,'Las tareas del hogar también ocupan tiempo y energía; no siempre se puede salir.','Invítale a elegir un momento breve para moverse juntos en casa.')),
q('Al final del día, notas que el cepillado se está retrasando. ¿Cómo acompañas la rutina?',
choice('Le acompaño o superviso el cepillado según su edad y autonomía',15,'El acompañamiento puede ayudar a sostener la rutina de cuidado dental.','Sigue las indicaciones de su profesional dental sobre técnica y pasta según su edad.'),
choice('Le doy un aviso y preparo el cepillo para que lo haga con más autonomía',5,'Un recordatorio y tener lo necesario a mano pueden facilitar el paso.','Acuerden una señal fija para el cepillado de noche.'),
choice('Hoy lo dejamos porque ya es muy tarde y está cansado',-5,'El cansancio puede complicar la rutina; mañana se puede volver a intentar.','Si es posible, adelanta el cepillado a un momento menos apurado mañana.'))
],
[
q('No hubo tiempo de ir al súper y toca preparar el desayuno con lo que hay. ¿Qué haces?',
choice('Combino alimentos disponibles, por ejemplo huevo o frijoles con tortilla',15,'Aprovechar lo disponible permite armar una comida cotidiana sin depender de ingredientes especiales.','Revisa qué sobró de forma segura y úsalo como parte del desayuno.'),
choice('Ofrezco algo sencillo que el niño acepta y agua',5,'Resolver con algo conocido puede ser práctico en una mañana ocupada.','Anota una opción de bajo costo para reponer en la próxima compra.'),
choice('Le doy dinero para comprar algo cerca de la escuela',-5,'Puede resolver el momento, aunque no siempre sabes qué opciones encontrará.','Si cabe en la rutina, prepara una colación simple la noche anterior.')),
q('Al salir de clases, el niño quiere descansar con una pantalla. ¿Cómo organizas la tarde?',
choice('Acordamos un rato de pantalla y una pausa para moverse después',15,'Un acuerdo claro permite combinar descanso, pantallas y otras actividades.','Pregúntale qué prefiere hacer en la pausa: caminar, bailar o jugar.'),
choice('Le dejo descansar primero y revisamos después cómo va el tiempo',5,'Descansar al llegar puede ser importante, aunque después quede menos margen.','Pongan una alarma amable para revisar juntos el resto de la tarde.'),
choice('Hoy dejamos libre la tarde; el niño está cansado',-5,'Escuchar el cansancio también forma parte de acompañar; las actividades pueden variar por día.','Mañana pueden elegir una actividad breve según cómo se sienta.')),
q('Mañana hay que salir temprano. ¿Qué rutina puedes preparar sin alargar la noche?',
choice('Dejamos lista la mochila y acordamos hora de apagar pantallas',15,'Preparar lo necesario reduce pendientes de última hora y hace visible el cierre del día.','Elijan juntos qué dos cosas conviene dejar listas antes de acostarse.'),
choice('Preparamos solo lo imprescindible y mantenemos el resto para mañana',5,'Resolver lo esencial puede ser suficiente en una noche ocupada.','Pídele al niño que escoja una tarea sencilla que pueda preparar contigo.'),
choice('Resolvemos la mañana sobre la marcha porque hoy no alcanzó el tiempo',-5,'A veces el día no da para preparar todo; eso no invalida el esfuerzo familiar.','Si te ayuda, deja una nota con el pendiente más importante para la mañana.'))
],
[
q('Van a desayunar fuera de casa y el niño es selectivo con la comida. ¿Cómo decides?',
choice('Busco una opción conocida y, si se puede, agrego algo que acepte',15,'Una opción familiar puede hacer más llevadera una comida fuera de casa.','Pregunta antes qué alimentos suele aceptar y elige dentro del presupuesto disponible.'),
choice('Le dejo elegir entre las alternativas sencillas del lugar',5,'Incluir al niño en la elección puede considerar sus preferencias.','Acuerden un límite de gasto antes de llegar, si eso les sirve.'),
choice('Compro lo que es más rápido porque tenemos que seguir',-5,'En un día con prisa, elegir lo disponible es comprensible.','Para otra salida, pueden llevar una opción conocida si resulta práctico y seguro.')),
q('Hay tarea, mandados y el niño pide jugar. ¿Qué plan cabe hoy?',
choice('Integramos un juego activo corto en el trayecto o al terminar una tarea',15,'Una actividad cotidiana puede sumar movimiento sin requerir tiempo o gasto extra.','Invítale a elegir entre caminar juntos, bailar una canción o un juego en casa.'),
choice('Terminamos primero lo más urgente y luego revisamos si salimos',5,'Priorizar puede ser útil cuando hay varias responsabilidades al mismo tiempo.','Definan qué pendiente es urgente y dejen la actividad como opción concreta.'),
choice('Hoy no salimos porque el traslado no cabe en el día',-5,'El tiempo y el transporte pueden limitar las actividades fuera de casa.','Busquen una opción cercana o dentro de casa para otro momento.')),
q('El niño está emocionado por una serie y cuesta cerrar la noche. ¿Qué acuerdo pruebas?',
choice('Vemos juntos cuánto dura el episodio y definimos qué sigue al terminar',15,'Conocer la duración y anticipar el siguiente paso puede ayudar a cerrar la pantalla.','Activen un recordatorio y escojan una actividad tranquila que le guste.'),
choice('Le permito terminar el episodio y ajustamos el resto de la rutina',5,'Hacer un ajuste puntual puede ser viable cuando la noche cambió de plan.','Retomen mañana el horario habitual con un aviso antes del final.'),
choice('Hoy vemos la serie hasta que el niño quiera parar',-5,'Puede sentirse como una salida fácil cuando todos están cansados, pero el final queda indefinido.','Prueben acordar un episodio por adelantado en una noche más tranquila.'))
],
[
q('El fin de semana permite ir más despacio. ¿Qué desayuno puedes ofrecer?',
choice('Preparo algo con ingredientes de casa y dejo que elija una parte',15,'Combinar lo disponible con una elección del niño puede hacer el desayuno más agradable.','Pídele elegir entre dos frutas o acompañamientos que ya tengan.'),
choice('Repetimos el desayuno conocido para no comprar algo especial',5,'Repetir una opción aceptada también puede ser práctico y cuidar el presupuesto.','Si quieren variedad, pueden probar un cambio pequeño en otra ocasión.'),
choice('Cada quien resuelve el desayuno a su hora',-5,'Los horarios distintos pueden ser necesarios en casa; no siempre se comparte la mesa.','Si se puede, reserven otro momento breve para convivir hoy.')),
q('El niño quiere visitar un parque, pero hay poco tiempo y el clima no ayuda. ¿Qué alternativa eliges?',
choice('Buscamos un juego activo bajo techo que el niño disfrute',15,'Adaptar el plan al clima puede conservar un momento de movimiento y juego.','Prueben bailar, seguir un juego de imitación o hacer una búsqueda de objetos.'),
choice('Esperamos un rato y revisamos si mejora el clima',5,'Esperar puede funcionar si el horario y las condiciones lo permiten.','Acuerden una hora para decidir y una alternativa sencilla por si no mejora.'),
choice('Cancelamos la salida y descansamos en casa',-5,'Cambiar el plan por clima o cansancio es una decisión cotidiana.','Pueden retomar la idea otro día sin necesidad de compensar hoy.')),
q('Al acercarse la hora de dormir, el niño pide quedarse despierto un poco más. ¿Cómo acompañas?',
choice('Mantengo el horario acordado y le aviso qué pasos faltan',15,'Una secuencia conocida puede hacer más previsible el cierre de la noche.','Elijan juntos el orden de los pasos —por ejemplo, higiene y cuento— según la edad.'),
choice('Ajustamos un poco la hora porque mañana no hay clases',5,'El fin de semana puede cambiar el horario familiar.','Acuerden cuánto se mueve la rutina y cuándo retoman el horario habitual.'),
choice('Dejamos que decida a qué hora acostarse esta noche',-5,'Dar autonomía es valioso, aunque un horario sin acuerdo puede hacer más difícil anticipar el cierre.','Prueba ofrecer dos opciones de horario razonables en vez de dejarlo abierto.'))
],
[
q('Es domingo y conviene pensar en el desayuno de mañana. ¿Qué preparación puedes hacer?',
choice('Reviso lo que hay y dejo listo un ingrediente fácil de usar',15,'Una preparación pequeña puede ahorrar tiempo sin requerir una compra especial.','Lava una fruta o separa algo que ya esté disponible, según la rutina de casa.'),
choice('Le pregunto al niño qué opción conocida le gustaría mañana',5,'Consultar sus preferencias puede hacer más fácil planear con lo que hay.','Elijan una alternativa dentro del presupuesto y los alimentos disponibles.'),
choice('Lo decidimos mañana según el tiempo',-5,'A veces no se puede planear todo el fin de semana.','Si ayuda, deja una nota con una opción rápida para revisar al despertar.')),
q('Tienen un rato libre en familia, pero cada quien propone algo distinto. ¿Cómo eliges?',
choice('Buscamos una opción gratuita que tome en cuenta lo que disfruta el niño',15,'Elegir en conjunto puede ayudar a encontrar una actividad posible para todos.','Cada persona propone una idea breve y votan por una que quepa en el tiempo.'),
choice('Hacemos una actividad tranquila en casa y dejamos otra para después',5,'Un plan en casa puede ser la alternativa más realista hoy.','Prueben una actividad que permita moverse un poco, si al niño le apetece.'),
choice('Cada quien descansa a su manera porque la semana fue intensa',-5,'El descanso individual también puede ser necesario tras una semana ocupada.','Acuerden otro momento de convivencia cuando tengan más energía.')),
q('Antes de dormir, piensas en una rutina que les gustaría probar esta semana. ¿Cómo la planteas?',
choice('Elijo con el niño un cambio pequeño que sea posible repetir',15,'Un paso acotado y acordado puede ser más realista que cambiar toda la rutina de golpe.','Pregúntale qué le gustaría probar y revisen juntos si funciona para su horario.'),
choice('Propongo una idea y la probamos unos días para ver cómo nos va',5,'Probar y revisar deja espacio para ajustar según las necesidades de la familia.','Pongan una fecha para conversar si el cambio les resultó práctico.'),
choice('Dejamos que la semana empiece y decidimos sobre la marcha',-5,'No siempre hay tiempo para planear; se puede decidir cuando surja la necesidad.','Si aparece un momento tranquilo, elijan una sola cosa que quieran facilitar.'))
]
];
const data={days,periods,shortDays:['L','M','MI','J','V','S','D'],questions};
if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.DecisionData=data;
})(typeof window!=='undefined'?window:globalThis);
