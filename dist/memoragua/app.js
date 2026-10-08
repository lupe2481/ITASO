(() => {
  'use strict';
  const { MemoryGame, DRINKS, GROUPS, PAIRS_PER_GAME } = Memoragua;
  const game = new MemoryGame();
  const $ = id => document.getElementById(id);
  const modal = $('modal'), content = $('modal-content');
  const completed = new Set();
  let selectedLevel = 1, view = 'intro', returnView = 'intro', lastTime = performance.now(), rendered = '', lastFeedback = '', announcedLow = false;
  const time = ms => `${String(Math.floor(Math.ceil(ms / 1000) / 60)).padStart(2, '0')}:${String(Math.ceil(ms / 1000) % 60).padStart(2, '0')}`;
  const total = group => game.roundDrinks.filter(d => d.group === group).length;
  const drink = id => DRINKS.find(d => d.id === id);
  const group = id => GROUPS.find(g => g.id === id);
  const button = (action, label, secondary = false) => `<button class="button${secondary ? ' secondary' : ''}" data-action="${action}">${label}</button>`;
  // Each original colored band is revealed independently as its group's pairs are found.
  // Coordinates are percentages of the original jar illustration, not drink quantities.
  const bands = { 1: [65, 100], 2: [50.5, 65], 3: [31.5, 50.5], 4: [17, 31.5], 5: [9.4, 17], 6: [0, 9.4] };
  function jug(full = false) {
    return `<div class="jug" role="img" aria-label="${full ? 'Los seis grupos de la Jarra del Buen Beber' : `Avance: ${game.matched.length} de ${PAIRS_PER_GAME} pares`}"><img src="assets/jarra-vacia.svg" alt="">${GROUPS.map(g => {
      const [top, bottom] = bands[g.id], fraction = full ? 1 : game.count(g.id) / total(g.id);
      return `<img class="jug-fill" src="assets/jarra_llena.svg" alt="" style="clip-path:inset(${bottom - (bottom - top) * fraction}% 0 ${100 - bottom}% 0)">`;
    }).join('')}</div>`;
  }
  function legend() {
    return `<div class="jug-legend">${[...GROUPS].reverse().map(g => `<div class="legend-row"><span class="dot" style="--group:${g.color}"></span><span>Grupo ${g.id}</span><b>${game.count(g.id)}/${total(g.id)}</b></div>`).join('')}</div>`;
  }
  function groupBars(withCounts = false) {
    return `<div class="group-results">${GROUPS.map(g => `<button type="button" class="group-result" style="--group:${g.color}" data-dark="${g.id === 3 || g.id === 5}" data-action="group" data-group="${g.id}" aria-expanded="false" aria-controls="education-panel"><span>Grupo ${g.id}${withCounts ? '' : ` · ${g.name}`}</span><span>${withCounts ? `${game.count(g.id)}/${total(g.id)}` : '+'}</span></button>`).join('')}</div>`;
  }
  function education() {
    return '<section id="education-panel" class="education" aria-labelledby="education-title" aria-live="polite" hidden></section>';
  }
  function showGroup(id) {
    const g = group(id), panel = $('education-panel');
    if (!g || !panel) return;
    const close = panel.dataset.group === String(id) && !panel.hidden;
    content.querySelectorAll('[data-action="group"]').forEach(el => el.setAttribute('aria-expanded', String(!close && Number(el.dataset.group) === id)));
    panel.hidden = close;
    panel.dataset.group = close ? '' : String(id);
    panel.innerHTML = close ? '' : `<h3 id="education-title">Grupo ${g.id} · ${g.name}</h3><p class="quantity">${g.quantity}</p><p>${g.tip} ${g.detail}</p><div class="drink-list">${DRINKS.filter(d => d.group === g.id).map(d => `<div class="drink-mini"><img src="assets/${d.asset}" alt=""><span>${d.name}</span></div>`).join('')}</div>${DRINKS.filter(d => d.group === g.id).map(d => `<p><strong>${d.name}:</strong> ${d.description}</p>`).join('')}<p class="sources">Las cantidades de la guía general no se suman ni son metas para cada grupo. Para NNA se ajustan a su edad y necesidades. Fuentes: <a href="https://www.gob.mx/profeco/articulos/la-jarra-del-buen-beber?idiom=es" target="_blank" rel="noopener noreferrer">Jarra del Buen Beber · PROFECO</a> y <a href="https://www.healthychildren.org/Spanish/healthy-living/nutrition/Paginas/Choose-Water-for-Healthy-Hydration.aspx" target="_blank" rel="noopener noreferrer">hidratación infantil · Academia Americana de Pediatría</a>.</p>`;
  }
  function openModal(html, wide = false) {
    content.innerHTML = html;
    modal.classList.toggle('wide', wide);
    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    const first = content.querySelector('[autofocus]') || content.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  }
  function intro() {
    view = 'intro';
    if (game.status === 'playing') game.pause();
    render();
    openModal(`<div class="modal-body"><h2 id="modal-title">Memoragua</h2><p class="modal-intro">Encuentra los pares de bebidas y explora la Jarra del Buen Beber.</p><div class="instructions"><strong>¿Cómo jugar?</strong>Toca dos tarjetas. Si muestran la misma bebida, ¡encontraste un par!<br>Cada par llena tu jarra y suma puntos.</div><p><strong>${PAIRS_PER_GAME} pares. Dos retos. ¡Tú eliges!</strong></p><div class="difficulty-options"><button class="difficulty-option" data-action="easy" aria-pressed="${selectedLevel === 1}">Nivel 1 · Fácil<small>90 segundos</small></button><button class="difficulty-option" data-action="hard" aria-pressed="${selectedLevel === 2}">Nivel 2 · Difícil<small>60 segundos</small></button></div><p class="rule-score">+100 puntos por par · −20 por error</p><div class="actions">${button('start', '¡A jugar!')}${button('explore', 'Explorar la jarra', true)}</div></div>`);
  }
  function start(level = selectedLevel, fresh = false) {
    if (fresh) completed.clear();
    selectedLevel = level;
    game.start(level);lastTime = performance.now();lastFeedback = '';announcedLow = false;rendered = '';
    view = 'game';modal.close();render();$('board').querySelector('button').focus({ preventScroll: true });
  }
  function sync() {
    const now = performance.now();game.tick(now - lastTime);lastTime = now;
  }
  function pause() {
    if (game.status !== 'playing') return;
    sync();
    if (game.status === 'lost') return finish();
    game.pause();render();showPause();
  }
  function showPause() {
    view = 'pause';
    openModal(`<div class="modal-body"><h2 id="modal-title">¡Una pequeña pausa!</h2><p class="pause-copy"><strong>El juego está en pausa.</strong>Continúa cuando estés listo.</p><p>Tiempo restante</p><p class="pause-time">${time(game.remaining)}</p><div class="actions">${button('resume', 'Continuar')}${button('restart', 'Reiniciar', true)}</div><button class="text-button" data-action="explore">Explorar la jarra</button></div>`);
  }
  function resume() {
    modal.close();game.resume();view = 'game';lastTime = performance.now();render();$('pause').focus({ preventScroll: true });
  }
  function finish() {
    if (game.status === 'won') completed.add(game.level);
    view = 'results';render();
    const won = game.status === 'won', all = completed.has(1) && completed.has(2);
    openModal(`<div class="modal-body"><h2 id="modal-title">${won ? '¡Completaste los pares!' : '¡Se acabó el tiempo!'}</h2><p class="result-subtitle">Encontraste ${game.matched.length} de ${PAIRS_PER_GAME} pares</p>${all ? '<p class="completed">¡Terminaste todos los niveles!</p>' : ''}<div class="result-badges"><span>Tiempo restante <b>${time(game.remaining)}</b></span><span>Puntos <b>${game.score}</b></span><span>Errores <b>${game.errors}</b></span></div><div class="result-layout"><div>${jug()}<p class="progress-note">Esta jarra representa tu avance en el juego, no cantidades que debas beber.</p></div><div><h3>Pares por grupo</h3><p class="group-hint">Toca un grupo para saber más.</p>${groupBars(true)}</div></div><div class="actions">${won && game.level === 1 ? button('next', 'Nivel 2 · 60 segundos') : won && !completed.has(1) ? button('first', 'Jugar nivel 1') : button('again', won ? 'Volver a jugar' : 'Intentar de nuevo')}${button('explore', 'Explorar la jarra', true)}</div>${education()}<div class="actions">${button('home', 'Volver al inicio', true)}</div></div>`, true);
  }
  function explore() {
    if (game.status === 'playing') {pause();if(game.status==='lost')return;}
    returnView = view;view = 'explore';
    openModal(`<div class="modal-body"><h2 id="modal-title">Explorar la jarra</h2><p class="explore-intro">Seis grupos para reconocer lo que bebemos.<br>El agua simple es la primera opción.</p><div class="explore-note">Aquí puedes leer a tu ritmo. En el juego, llenar la jarra significa encontrar pares; no significa tomar estas bebidas.</div><div style="max-width:190px;margin:auto">${jug(true)}</div><p class="group-hint">Toca una barra de color para conocer ese grupo.</p>${groupBars()}${education()}<div class="actions">${button('back', returnView === 'pause' ? 'Volver a la pausa' : returnView === 'results' ? 'Volver a resultados' : 'Volver al inicio')}</div></div>`, true);
  }
  function help() {
    if (game.status === 'playing') pause();
    returnView = view;view = 'help';
    openModal(`<div class="modal-body"><h2 id="modal-title">¿Cómo jugar?</h2><div class="instructions">Encuentra <strong>${PAIRS_PER_GAME} pares de bebidas idénticas.</strong><br>Toca una tarjeta y luego otra. Si son diferentes, se ocultan después de un segundo. El color indica el grupo, pero no basta para formar un par.<br><br>Ganas 100 puntos por par y pierdes 20 por error. Puedes pausar cuando quieras.</div><div class="actions">${button('back', 'Entendido')}</div></div>`);
  }
  function render() {
    const visible = game.status === 'playing' || game.status === 'won' || game.status === 'lost';
    const key = [visible, game.status, game.open.join(','), game.matched.join(','), game.cards.join(',')].join('|');
    if (key !== rendered) {
      const board = $('board');
      if (board.children.length !== game.cards.length) board.innerHTML = game.cards.map((_,i) => `<button type="button" class="card" data-index="${i}"><span class="card-inner"><span class="card-face card-back" aria-hidden="true"></span><span class="card-face card-front" aria-hidden="true"></span></span></button>`).join('');
      [...board.children].forEach((el, i) => {
        const d = drink(game.cards[i]), matched = game.matched.includes(d.id), open = visible && (matched || game.open.includes(i));
        el.classList.toggle('is-open', open);el.classList.toggle('matched', visible && matched);
        el.style.setProperty('--group', group(d.group).color);
        el.disabled = game.status !== 'playing' || matched || game.open.includes(i) || game.open.length === 2;
        el.setAttribute('aria-label', open ? `${d.name}, grupo ${d.group}${matched ? ', par encontrado' : ''}` : `Tarjeta ${i + 1}, boca abajo`);
        el.setAttribute('aria-pressed', String(open));
        const front = el.querySelector('.card-front');
        front.innerHTML = open ? `<img src="assets/${d.asset}" alt=""><span class="card-name">${d.name}</span>` : '';
      });rendered = key;
    }
    $('timer').textContent = time(game.remaining);$('timer').parentElement.classList.toggle('urgent', game.remaining <= 10000);
    $('score').textContent = game.score;$('pair-count').textContent = game.matched.length;$('pair-total').textContent = PAIRS_PER_GAME;$('progress').textContent = `${Math.round(game.matched.length / PAIRS_PER_GAME * 100)} %`;
    $('errors').textContent = `${game.errors} ${game.errors === 1 ? 'error' : 'errores'}`;
    $('level').textContent = `Nivel ${game.level} · ${game.level === 1 ? 'Fácil' : 'Difícil'}`;$('level').classList.toggle('hard', game.level === 2);
    $('pause').disabled = game.status !== 'playing';
    const feedbackKey = `${game.lastMatch}|${game.errors}|${game.status}`;
    if (feedbackKey !== lastFeedback) {
      if (game.open.length === 2) $('feedback').innerHTML = '<strong>Son diferentes. ¡Sigue intentando!</strong><span>−20 puntos · Busca dos bebidas idénticas.</span>';
      else if (game.lastMatch) {const d = drink(game.lastMatch);$('feedback').innerHTML = `<strong>¡Par encontrado! +100</strong><span>${d.name} · Grupo ${d.group}. ${group(d.group).tip}</span>`;}
      else $('feedback').innerHTML = '<strong>¡Vamos por el primer par!</strong><span>Toca dos tarjetas para descubrirlas.</span>';
      lastFeedback = feedbackKey;
      $('jug-panel').innerHTML = jug() + legend();
    }
    if (game.status === 'playing' && game.remaining <= 10000 && !announcedLow) {$('announcement').textContent = 'Quedan 10 segundos.';announcedLow = true;}
  }
  $('board').addEventListener('click', e => {
    const card = e.target.closest('[data-index]');if (!card) return;
    sync();if (game.status === 'lost') {finish();return;}
    game.flip(Number(card.dataset.index));render();if (game.status === 'won') finish();
  });
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');if (!el) return;
    switch (el.dataset.action) {
      case 'group': showGroup(Number(el.dataset.group));break;
      case 'easy': selectedLevel = 1;intro();break;
      case 'hard': selectedLevel = 2;intro();break;
      case 'start': start(selectedLevel, true);break;
      case 'pause': pause();break;
      case 'resume': resume();break;
      case 'restart': start(game.level);break;
      case 'next': start(2);break;
      case 'first': start(1);break;
      case 'again': start(game.status === 'won' ? 1 : game.level, game.status === 'won');break;
      case 'home': intro();break;
      case 'explore': explore();break;
      case 'help': help();break;
      case 'back': if (returnView === 'pause') showPause();else if (returnView === 'results') finish();else intro();break;
    }
  });
  modal.addEventListener('cancel', e => {e.preventDefault();if(view==='pause')resume();else if(view==='explore'||view==='help'){if(returnView==='pause')showPause();else if(returnView==='results')finish();else intro();}});
  document.addEventListener('keydown', e => {if (e.key === 'Escape' && !modal.open && game.status === 'playing') {e.preventDefault();pause();}});
  document.addEventListener('visibilitychange', () => {if(document.hidden && game.status==='playing')pause();});
  window.addEventListener('pagehide', () => {if(game.status==='playing')pause();});
  function frame(){sync();if(view==='game'){if(game.status==='lost'||game.status==='won')finish();else render();}requestAnimationFrame(frame);}
  game.start(1);game.status = 'idle';render();intro();requestAnimationFrame(frame);
  // Warm the local images before the player reveals a card.
  DRINKS.forEach(d => {const img=new Image();img.src=`assets/${d.asset}`;});
})();
