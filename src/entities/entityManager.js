import Enemy from './enemy'
import Player from './player'

let playerCount = [0,1,2]
let enemyCount = [0,1,2,3,4]

let xBuffer = 150
let yBuffer = 150
let enemyXBuffer = 100
let enemyYBuffer = 100

let entities, enemies, players

export default class EntityManager {
  constructor(game) {
    this.game = game
    this.turnIndex = 0
    this.game.entities = []
    this.game.turn = 'player'

    playerCount.forEach((pos, index) => {
      let x = xBuffer
      let y = index % 3 * enemyYBuffer + yBuffer
      let player = new Player(game, x, y, index)
      this.game.entities.push(player)
    })

    enemyCount.forEach((pos, index) => {
      const x2 = game.width - enemyXBuffer
      let x = index < 3 ? x2 - enemyXBuffer * 1.5 : x2
      let y1 = index % 3 * enemyYBuffer + yBuffer
      let y = index < 3 ? y1 : y1 + enemyYBuffer/2
      let enemy = new Enemy(game, x, y, game.rnd.integerInRange(0,2))
      this.game.entities.push(enemy)
    })

    this.game.enemies = this.game.entities
      .filter((ent) => ent.type === 'enemy')
      .sort((a, b) => a.sprite.y > b.sprite.y ? 1 : -1)

    this.game.players = this.game.entities
      .filter((ent) => ent.type === 'player')

    entities = this.game.entities
    enemies = this.game.enemies
    players = this.game.players

    this.game.doAction = this.doAction.bind(this)
  }

  doAction(action, target) {
    let current = this.game.entities[this.turnIndex]
    switch (action) {
      case 'attack': {
        current.attack(target)
        break
      }
      case 'defend': {
        break
      }
      case 'relic': {
        break
      }
    }
    this._nextTurn()
  }

  _getUnitForNextTurn() {
    let target
    do {
      this.turnIndex++
      if (this.turnIndex > this.game.entities.length - 1) {
        this.turnIndex = 0
      }
      target = this.game.entities[this.turnIndex]
    } while (!target.alive)

    return target
  }

  _nextTurn() {
    const nextToMove = this._getUnitForNextTurn()

    // TODO: determine whose turn it is in a better way
    this.game.turn = this.turnIndex > 2 ? 'enemy' : 'player'

    if (this.game.turn === 'player') {
      this._performPlayerMove(nextToMove)
    } else {
      setTimeout(this._performEnemyMove.bind(this, nextToMove), 500)
    }
  }

  _performPlayerMove(player) {
    this.game.ui.setActionMenuPosition(player)
  }

  _performEnemyMove(enemy) {
    // TODO: enemy should target thing they are strong against or weak player
    let target = players.filter(p => !!p.alive)[0]
    enemy.attack(target)
    this._nextTurn()
  }

}
