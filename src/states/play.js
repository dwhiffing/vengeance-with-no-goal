import LifeBar from '../entities/bar'
import Enemy from '../entities/enemy'
import Player from '../entities/player'
import UserInterface from '../entities/ui'

let playerPositions = [0,1,2]
let enemyPositions = [0,1,2,3,4]

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#333'

    let xBuffer = 250
    let enemyXBuffer = 100
    let yBuffer = 150
    let ySpacing = 110

    this.turnIndex = 0
    this.game.entities = []
    this.phase = 0

    playerPositions.forEach((pos, index) => {
      let x = xBuffer
      let y = index % 3 * ySpacing + yBuffer
      let player = new Player(game, x, y)
      this.game.entities.push(player)
    })

    enemyPositions.forEach((pos, index) => {
      const x2 = game.width - enemyXBuffer
      let x = index >= 2 ? x2 : x2 - enemyXBuffer * 1.5
      let y1 = index % 3 * ySpacing + yBuffer
      let y = index < 2 ? y1 + ySpacing/2 : y1
      let enemy = new Enemy(game, x, y)
      this.game.entities.push(enemy)
    })

    this.game.enemies = this.game.entities.filter((ent) => ent.type === 'enemy')
    this.game.players = this.game.entities.filter((ent) => ent.type === 'player')

    this.ui = new UserInterface(game)
    this.ui.setActionTarget(this.game.entities[0])

    this.game.doAction = this.doAction.bind(this)
  },
  update() {
    this.ui.update()
  },
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
  },
  nextTurn() {
    let newTarget

    do {
      this.turnIndex++
      if (this.turnIndex > this.game.entities.length - 1) {
        this.turnIndex = 0
      }
      newTarget = this.game.entities[this.turnIndex]
    } while (!newTarget.alive)

    this.phase = this.turnIndex > 2 ? 1 : 0

    if (this.phase === 0) {
      this.ui.setActionTarget(newTarget)
    } else {
      this.ui.performEnemyMove(newTarget)
      setTimeout(this.nextTurn.bind(this), 500)
    }
  }
}
