import Entity from './entity'

export default class Enemy extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'enemy', job)
  }

  attackBestTarget(players, callback) {
    let bestTarget = players.filter(p => p.alive && p.job === this.strongAgainst && !p.isAssisting)[0]
    bestTarget = bestTarget || players.filter(p => p.alive && p.job !== this.weakAgainst && !p.isAssisting)[0]
    bestTarget = bestTarget || players.filter(p => p.alive && p.job === this.weakAgainst && !p.isAssisting)[0]
    if (bestTarget) {
      this.attack(bestTarget, callback)
    }
  }
}
