import Enemy from './enemy'
import Player from './player'

let playerPositions = [0,1,2]
let enemyPositions = [0,1,2,3,4]

let xBuffer = 150
let enemyXBuffer = 100
let yBuffer = 150
let ySpacing = 110

let entities, enemies, players

export default class EntityManager {
  constructor(game) {
    this.game = game
    this.turnIndex = 0
    this.game.entities = []
    this.game.turn = 'player'

    playerPositions.forEach((pos, index) => {
      let x = xBuffer
      let y = index % 3 * ySpacing + yBuffer
      let player = new Player(game, x, y, index)
      this.game.entities.push(player)
    })

    enemyPositions.forEach((pos, index) => {
      const x2 = game.width - enemyXBuffer
      let x = index < 3 ? x2 - enemyXBuffer * 1.5 : x2
      let y1 = index % 3 * ySpacing + yBuffer
      let y = index < 3 ? y1 : y1 + ySpacing/2
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
    this.nextTurn()
  }

  nextTurn() {
    let newTarget

    do {
      this.turnIndex++
      if (this.turnIndex > this.game.entities.length - 1) {
        this.turnIndex = 0
      }
      newTarget = this.game.entities[this.turnIndex]
    } while (!newTarget.alive)

    this.game.turn = this.turnIndex > 2 ? 'enemy' : 'player'

    if (this.game.turn === 'player') {
      this.game.ui.setActionTarget(newTarget)
    } else {
      this.performEnemyMove(newTarget)
      setTimeout(this.nextTurn.bind(this), 500)
    }
  }

  performEnemyMove(target) {
    this.game.ui.setAttackTarget(target, 0xffff00)
    // TODO: enemy should target thing they are strong against or weak player
    target.attack(players.filter(p => !!p.alive)[0])
  }

}
