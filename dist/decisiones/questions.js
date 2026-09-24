(function(root){
'use strict';
const choice=(text,points,message)=>({text,points,message});
const q=(prompt,...options)=>({prompt,options});
const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const periods=['Mañana','Tarde','Noche'];
const questions=[
[
q('¡Empieza la semana! Antes de salir a clases, tienes tiempo para desayunar. ¿Qué eliges?',
choice('Desayuno avena, fruta y yogur natural',15,'Combinar distintos alimentos aporta variedad. La fruta y la avena suman fibra al desayuno.'),
choice('Solo tomo un refresco',-15,'El refresco aporta azúcares libres y no sustituye un desayuno variado. Puedes elegir agua y acompañarla con alimentos.'),
choice('Como unas galletas y salgo con prisa',-5,'Unas galletas pueden formar parte de una ocasión, pero aquí faltó variedad. Añadir fruta u otros alimentos ayuda a completar el desayuno.')),
q('Terminaron las clases y llevas mucho tiempo sentado. ¿Qué hacemos esta tarde?',
choice('Me quedo viendo videos toda la tarde',-15,'Pasar toda la tarde sentado deja menos espacio para moverte. Una pausa activa es una oportunidad para cambiar de actividad.'),
choice('Salgo a jugar y llevo agua',15,'Jugar y moverte forma parte de una rutina activa. Llevar agua ayuda a tenerla disponible cuando la necesites.'),
choice('Veo la tele y dejo el paseo para después',-5,'Hoy el paseo se quedó pendiente. Reservar un momento concreto para moverte puede ayudarte a cumplirlo.')),
q('Mañana tienes clases y te tienes que levantar temprano. Ya son las 9 de la noche, ¿qué vamos a hacer?',
choice('Apago todo y me voy a dormir',15,'Apagar las pantallas y respetar tu hora de dormir ayuda a dejar tiempo para descansar antes de levantarte.'),
choice('Veo un capítulo más de mi serie',-5,'Otro capítulo retrasa la hora de dormir. Puedes guardarlo para mañana y mantener tu rutina de descanso.'),
choice('Me acuesto, pero sigo viendo el celular',-15,'Seguir usando el celular puede alargar el tiempo despierto. Dejarlo a un lado ayuda a preparar el momento de dormir.'))
],
[
q('Ya desayunaste y es hora de cuidar tu sonrisa. ¿Qué decides?',
choice('Me cepillo con pasta con flúor durante dos minutos',15,'Cepillarte dos veces al día, durante dos minutos y con pasta con flúor, ayuda a cuidar tus dientes.'),
choice('Me cepillo unos segundos porque tengo prisa',-5,'Un cepillado tan rápido puede dejar zonas sin limpiar. Reserva dos minutos y recorre todas las superficies.'),
choice('No me cepillo hoy',-15,'Saltarte el cepillado deja pasar una oportunidad de limpiar los dientes. Retoma tu rutina en el siguiente momento.')),
q('Vienes de jugar y tienes sed. ¿Qué bebida vas a elegir?',
choice('Elijo un refresco grande',-15,'El refresco contiene azúcares libres. El agua simple es una opción para quitar la sed sin añadirlos.'),
choice('Elijo una bebida azucarada pequeña',-5,'Aunque la porción sea pequeña, sigue aportando azúcares libres. Puedes elegir agua con más frecuencia.'),
choice('Tomo agua simple',15,'El agua ayuda a reponer líquidos sin añadir azúcar. Tenerla a mano facilita elegirla.')),
q('Ya tienes sueño, pero quieres terminar un videojuego. ¿Qué hacemos?',
choice('Juego hasta muy tarde para terminarlo',-15,'Continuar hasta muy tarde reduce el tiempo disponible para dormir. La partida puede esperar.'),
choice('Guardo la partida y preparo mi descanso',15,'Cerrar el juego a tiempo ayuda a sostener una rutina de sueño. Mañana puedes retomar la partida.'),
choice('Juego otra ronda, aunque ya sea mi hora de dormir',-5,'Una ronda más puede retrasar el descanso. Un horario para apagar la pantalla te ayuda a cerrar el día.'))
],
[
q('Preparas tu colación para el recreo. ¿Qué llevas hoy?',
choice('Una fruta entera y agua',15,'La fruta entera aporta fibra. Llevarla preparada y acompañarla con agua ofrece una opción práctica.'),
choice('Solo una bolsa grande de dulces',-15,'Los dulces aportan azúcares libres. Para una colación habitual puedes probar fruta u otros alimentos variados.'),
choice('Una bolsa de papas, sin otra opción',-5,'Las papas de bolsa suelen aportar bastante sal. Alternar y sumar opciones como fruta ayuda a variar tu colación.')),
q('Hay verduras junto a tu comida. ¿Qué decides poner en el plato?',
choice('Las aparto todas sin probarlas',-5,'Hoy faltó una oportunidad de sumar variedad. Puedes probar una preparación distinta o una pequeña porción otro día.'),
choice('Solo como el postre en lugar de la comida',-15,'Sustituir toda la comida por el postre deja fuera otros grupos de alimentos. La variedad importa.'),
choice('Añado verduras junto con el resto de mi comida',15,'Las verduras aportan fibra y otros nutrientes. Combinarlas con distintos alimentos ayuda a variar tu alimentación.')),
q('Antes de acostarte recuerdas que falta el cepillado. ¿Qué vas a hacer?',
choice('Lo dejo para mañana',-15,'El cepillado de la noche forma parte de la rutina diaria. Reservar ese momento ayuda a cuidar tus dientes.'),
choice('Me cepillo durante dos minutos con pasta con flúor',15,'Dedicar tiempo al cepillado antes de acostarte ayuda a limpiar tus dientes. Recuerda hacerlo también en otro momento del día.'),
choice('Solo me enjuago con agua',-5,'Un enjuague no sustituye el cepillado con pasta con flúor. El cepillo ayuda a limpiar las superficies de los dientes.'))
],
[
q('Falta poco para salir. ¿Cómo organizas la mañana?',
choice('Me quedo viendo videos y salgo sin desayunar',-15,'Los videos ocuparon el tiempo que habías reservado para prepararte y comer. Puedes dejarlos para otro momento.'),
choice('Me preparo con tiempo y desayuno con calma',15,'Organizar la mañana deja espacio para desayunar y prepararte sin tanta prisa. Una rutina puede facilitarlo.'),
choice('Salgo con prisa y como lo primero que encuentro',-5,'La prisa puede hacer más difícil elegir una comida variada. Preparar algunas cosas desde la noche ayuda.')),
q('Llevas un buen rato haciendo tarea sentado. ¿Qué haces en el descanso?',
choice('Cambio de la tarea al celular sin levantarme',-5,'Cambiar de pantalla no cambia el tiempo sentado. Puedes incluir una pausa para levantarte y moverte.'),
choice('Sigo sentado toda la tarde sin descansar',-15,'Hacer pausas ayuda a alternar la tarea con movimiento. Reservar unos minutos puede facilitar una rutina más activa.'),
choice('Me levanto, camino un poco y luego continúo',15,'Interrumpir el tiempo sentado con una pausa de movimiento suma actividad a tu día. Después puedes volver a la tarea.')),
q('Mañana quieres empezar el día con calma. ¿Qué decides esta noche?',
choice('Preparo mi mochila y mantengo mi hora de dormir',15,'Preparar lo necesario reduce las tareas de última hora. Mantener un horario de sueño ayuda a construir una rutina.'),
choice('Dejo todo pendiente y sigo viendo videos',-15,'Las pantallas y los pendientes pueden retrasar el descanso. Puedes preparar lo básico y apagar a tiempo.'),
choice('Preparo todo, pero me quedo despierto un rato más',-5,'Organizarte fue útil, pero retrasar el sueño resta tiempo para descansar. Intenta conservar tu horario.'))
],
[
q('Vas a desayunar y puedes elegir la bebida. ¿Qué prefieres?',
choice('Un refresco',-15,'Tomar refresco suma azúcares libres. El agua simple es una alternativa para acompañar tus alimentos.'),
choice('Agua simple junto con mi desayuno',15,'El agua puede acompañar una comida variada sin añadir azúcar. Es una opción cotidiana para beber.'),
choice('Un jugo en vez de comer la fruta entera',-5,'El jugo aporta azúcares libres y suele tener menos fibra que la fruta entera. Puedes preferir la fruta y tomar agua.')),
q('Tus amigos proponen jugar en el parque. Es un lugar seguro y puedes ir acompañado. ¿Qué decides?',
choice('Voy a jugar con ellos',15,'El juego activo es una forma de moverte y compartir tiempo. Elige actividades que disfrutes y puedas realizar.'),
choice('Me quedo sentado con el celular toda la tarde',-15,'Esta vez el celular ocupó todo el tiempo de juego. Buscar otro momento para moverte ayuda a equilibrar las actividades.'),
choice('Lo dejo para después y al final no salgo',-5,'El movimiento quedó pendiente. Planear cuándo y con quién jugar puede ayudarte a hacerlo realidad.')),
q('Es viernes y mañana no hay clases. ¿Qué pasa con tu hora de dormir?',
choice('Me quedo despierto hasta la madrugada',-15,'Acostarte mucho más tarde cambia tu rutina de sueño. Procurar horarios parecidos también en fin de semana puede ayudar.'),
choice('Veo otro episodio y me acuesto más tarde',-5,'Ese episodio retrasa el descanso. Puedes disfrutarlo en otro momento y sostener tu horario.'),
choice('Mantengo una hora de dormir parecida',15,'Los horarios regulares, incluidos los fines de semana, ayudan a mantener una rutina de descanso.'))
],
[
q('Tienes la mañana libre. ¿Cómo quieres empezarla?',
choice('Paso toda la mañana sentado viendo videos',-15,'Quedarte sentado toda la mañana deja menos espacio para otras actividades. Puedes alternar pantallas y movimiento.'),
choice('Desayuno y salgo a caminar acompañado',15,'Combinar una comida con una actividad que disfrutes da espacio a distintos hábitos. Caminar suma movimiento.'),
choice('Me quedo con el celular y dejo el desayuno para mucho después',-5,'El celular desplazó la rutina que tenías planeada. Reservar momentos para comer y moverte ayuda a organizar el día.')),
q('Tienes hambre entre comidas y hay varias opciones. ¿Qué eliges?',
choice('Yogur natural con fruta',15,'Esta combinación ofrece variedad. Elegir yogur natural permite acompañarlo con el sabor de la fruta sin añadir azúcar.'),
choice('Una bolsa grande de caramelos',-15,'Los caramelos concentran azúcares libres. Puedes elegir otras opciones para una colación habitual.'),
choice('Solo unas galletas muy dulces',-5,'Las galletas dulces pueden ser ocasionales. Variar con fruta u otros alimentos ayuda a ampliar tus opciones.')),
q('Ya es momento de bajar el ritmo. ¿Cómo te preparas para dormir?',
choice('Dejo la televisión encendida y sigo mirándola',-15,'La televisión puede mantenerte despierto más tiempo. Apagar las pantallas ayuda a separar el entretenimiento del descanso.'),
choice('Me llevo el celular a la cama para un último video',-5,'Ese último video puede convertirse en varios. Dejar el celular fuera del momento de dormir facilita cerrar el día.'),
choice('Apago las pantallas y leo un rato con calma',15,'Una actividad tranquila sin pantallas puede formar parte de tu rutina antes de acostarte.'))
],
[
q('Es domingo y vas a desayunar en familia. ¿Qué decides?',
choice('Elijo solo dulces y una bebida azucarada',-15,'Esta elección deja fuera otros alimentos y suma azúcares libres. Puedes buscar un desayuno con más variedad.'),
choice('Desayuno con fruta, frijoles y tortilla',15,'Combinar fruta, leguminosas y cereales suma variedad al desayuno. Puedes adaptar las combinaciones a tus gustos.'),
choice('No dejo el celular y apenas pruebo el desayuno',-5,'Las pantallas pueden distraerte del momento de comer. Hacer una pausa ayuda a prestar atención a la comida.')),
q('Antes de que termine el fin de semana, ¿cómo quieres pasar la tarde?',
choice('Salgo a caminar o a jugar con mi familia',15,'Moverte en compañía puede hacer la actividad más agradable. Lo importante es encontrar opciones que puedas disfrutar.'),
choice('Veo series durante toda la tarde sin levantarme',-15,'Pasar toda la tarde sentado deja poco espacio para moverte. Puedes intercalar una pausa activa.'),
choice('Planeo moverme, pero sigo posponiéndolo',-5,'El plan se quedó pendiente. Elegir una actividad sencilla y un momento concreto puede ayudarte a empezar.')),
q('Mañana empieza una nueva semana. ¿Cómo cierras el domingo?',
choice('Me quedo viendo videos hasta muy tarde',-15,'Seguir con videos reduce el tiempo disponible para dormir. Cerrar las pantallas a tiempo ayuda a preparar el lunes.'),
choice('Preparo mis cosas, me cepillo y me acuesto a tiempo',15,'Organizar tus cosas, cuidar tus dientes y respetar tu descanso reúne hábitos que puedes repetir durante la semana.'),
choice('Me preparo, pero sigo con el celular en la cama',-5,'Preparar tus cosas ayuda, pero el celular puede retrasar el sueño. Déjalo a un lado para completar tu rutina.'))
]
];
const data={days,periods,shortDays:['L','M','MI','J','V','S','D'],questions};
if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.DecisionData=data;
})(typeof window!=='undefined'?window:globalThis);
