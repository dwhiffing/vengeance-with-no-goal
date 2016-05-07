import Entity from './entity'

export default class Player extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0xffff00)
  }
}
