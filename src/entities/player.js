import Entity from './entity'

export default class Player extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'player', job, 0xffff00)
  }
}
