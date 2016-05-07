import Entity from './entity'

export default class Enemy extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'enemy', job, 0xff0000)
  }
}
