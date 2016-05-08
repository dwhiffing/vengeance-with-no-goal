import Enemy from './enemy'
import Player from './player'

let playerCount = [0,1,2]
let enemyCount = [0,1,2,3,4]

let xBuffer = 150
let yBuffer = 150
let enemyXBuffer = 130
let enemyYBuffer = 100

let entities, enemies, players

export default class EntityManager {
  constructor(game) {
    this.game = game
    this.turnIndex = -1
    this.game.entities = []
    this.game.turn = 'player'
    this.game.waveNum = 0

    playerCount.forEach((pos, index) => {
      let x = index === 1 ? xBuffer + 60 : xBuffer
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
    this._nextTurn = this._nextTurn.bind(this)
  }

  doAction(action, target) {
    let current = this.game.entities[this.turnIndex]
    if (!current) return
    switch (action) {
      case 'timing': {
        current.timingAttackTrigger && current.timingAttackTrigger()
        break
      }
      case 'attack': {
        current.attack(target, this._nextTurn)
        break
      }
      case 'defend': {
        current.defend(this._nextTurn)
        break
      }
      case 'relic': {
        break
      }
    }
  }

  checkWinLoseCondition() {
    let alivePlayers = players.filter(p => !!p.alive)
    let aliveEnemies = enemies.filter(p => !!p.alive)
    if (alivePlayers.length === 0 || aliveEnemies.length === 0) {
      return true
    }
  }
  triggerWinLoseCondition() {
    let alivePlayers = players.filter(p => !!p.alive)
    let aliveEnemies = enemies.filter(p => !!p.alive)
    this.game.ui.toggleActionMenu(false)
    if (alivePlayers.length === 0) {
      this.game.textManager.display('Game over...')
      setTimeout(this.triggerGameOver.bind(this), 1500)
    }
    if (aliveEnemies.length === 0) {
      this.game.textManager.display('You win!')
      setTimeout(this.nextWave.bind(this), 1500)
    }
  }

  triggerGameOver() {
    this.game.state.start('menu')
  }

  getWaveSize() {
    if (this.game.waveNum < 2) {
      return 2
    } else if (this.game.waveNum < 5) {
      return 3
    } else if (this.game.waveNum < 10) {
      return 4
    } else {
      return 5
    }
  }

  nextWave() {
    this.game.ui.allowAction = true
    this.game.waveNum++
    let waveSize = this.getWaveSize()

    enemies.forEach((enemy, index) => {
      if (waveSize <= index) return
      enemy.job = this.game.rnd.integerInRange(0,2)
      enemy.spawn()
    })
    players.forEach((player) => {
      player.heal()
    })

    setTimeout(() => {
      this.turnIndex = -1
      this.game.ui.allowAction = false
      this.game.ui.toggleActionMenu(true)
      this.game.textManager.clear
      this._nextTurn()
    }, 1500)
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

    if (this.checkWinLoseCondition()) {
      return
    }

    this.game.turn = this.turnIndex > 2 ? 'enemy' : 'player'

    if (this.game.turn === 'player') {
      this._performPlayerMove(nextToMove)
    } else {
      this.game.ui.hideTarget()
      this.game.textManager.clear()
      setTimeout(this._performEnemyMove.bind(this, nextToMove), 500)
    }
  }

  _performPlayerMove(player) {
    this.game.ui.setActionMenuPosition(player)
    player.stopDefending()
  }

  _performEnemyMove(enemy) {
    // TODO: enemy should target thing they are strong against or weak player
    enemy.attackBestTarget(players, this._nextTurn)
  }

}
