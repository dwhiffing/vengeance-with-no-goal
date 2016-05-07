import Entity from './entity'

export default class Enemy extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 'enemy', 0xff0000)
  }
}
