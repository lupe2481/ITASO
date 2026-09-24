/** Round rules, independent from the page and artwork. Times are milliseconds. */
export class ReactionGame {
  constructor({ foods, now = () => performance.now(), random = Math.random }) {
    if (!foods?.length || foods.some(food => !food.id || !food.name || typeof food.healthy !== 'boolean')) {
      throw new Error('Each food needs an id, name and healthy classification.');
    }
    this.foods = foods;
    this.now = now;
    this.random = random;
    this.reset();
  }

  reset() {
    this.phase = 'ready';
    this.players = [{ score: 0, catches: [] }, { score: 0, catches: [] }];
    this.current = null;
    this.lastFoodId = null;
    this.deadline = null;
    this.nextAt = null;
    this.feedback = null;
  }

  start() {
    this.reset();
    const time = this.now();
    this.phase = 'playing';
    this.deadline = time + 30000;
    this.nextAt = time;
    this.tick(time);
  }

  tick(time = this.now()) {
    if (this.phase !== 'playing') return;
    if (time >= this.deadline) {
      this.phase = 'finished';
      this.current = null;
      return;
    }
    if (this.current && time >= this.current.expiresAt) {
      this.current = null;
      this.nextAt = time + 220;
    }
    if (!this.current && time >= this.nextAt) {
      const pool = this.foods.filter(food => food.id !== this.lastFoodId);
      const available = pool.length ? pool : this.foods;
      const healthy = this.random() >= 0.35;
      const selected = available.filter(food => food.healthy === healthy);
      const choices = selected.length ? selected : available;
      const food = choices[Math.min(choices.length - 1, Math.floor(this.random() * choices.length))];
      this.current = { food, expiresAt: time + 1200 };
      this.lastFoodId = food.id;
      this.feedback = null;
    }
  }

  catch(playerIndex, { repeat = false } = {}) {
    const time = this.now();
    // Expired items cannot be caught, and a keypress cannot spawn a fresh item.
    if (this.phase !== 'playing' || repeat || ![0, 1].includes(playerIndex)) return null;
    if (time >= this.deadline) { this.tick(time); return null; }
    if (!this.current || time >= this.current.expiresAt) return null;
    const food = this.current.food;
    const points = food.healthy ? 10 : -5;
    this.players[playerIndex].score += points;
    this.players[playerIndex].catches.push({ ...food, points });
    this.current = null;
    this.nextAt = time + 350;
    this.feedback = { playerIndex, food, points };
    return this.feedback;
  }

  pause() {
    if (this.phase !== 'playing') return;
    this.tick();
    if (this.phase !== 'playing') return;
    this.pausedAt = this.now();
    this.phase = 'paused';
  }

  resume() {
    if (this.phase !== 'paused') return;
    const elapsed = this.now() - this.pausedAt;
    this.deadline += elapsed;
    this.nextAt += elapsed;
    if (this.current) this.current.expiresAt += elapsed;
    this.phase = 'playing';
  }

  get remainingSeconds() {
    if (this.phase === 'ready') return 30;
    return Math.max(0, Math.ceil((this.deadline - (this.phase === 'paused' ? this.pausedAt : this.now())) / 1000));
  }

  get result() {
    if (this.phase !== 'finished') return null;
    const difference = this.players[0].score - this.players[1].score;
    return {
      winner: difference === 0 ? null : difference > 0 ? 0 : 1,
      players: this.players.map(player => ({
        ...player,
        healthy: player.catches.filter(food => food.healthy),
        occasional: player.catches.filter(food => !food.healthy),
      })),
    };
  }
}
