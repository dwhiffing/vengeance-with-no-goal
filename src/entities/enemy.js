import Entity from './entity'

export default class Enemy extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'enemy', job, 0xff0000)
  }

  attackBestTarget(players, callback) {
    let bestTarget = players.filter(p => !!p.alive && p.job === this.strongAgainst)[0]
    bestTarget = bestTarget || players.filter(p => !!p.alive && p.job !== this.weakAgainst)[0]
    bestTarget = bestTarget || players.filter(p => !!p.alive && p.job === this.weakAgainst)[0]
    this.attack(bestTarget, callback)
  }
}
