import Enemy from './enemy'
import Player from './player'

let playerCount = [0,1,2]
let enemyCount = [0,1,2,3,4]

let xBuffer = 150
let yBuffer = 150
let enemyXBuffer = 145
let playerYBuffer = 80
let enemyYBuffer = 100

let waves = [
  [0,1,2],
  [0,0,1],
  [1,1,2],
  [2,2,0],
  [0,0,1,1],
  [1,1,2,2],
  [2,2,0,0],
  [0,0,1,1,2],
  [1,1,2,2,0],
  [2,2,0,0,1],
  [0,1,0,1,2],
  [2,1,1,2,0],
  [2,0,2,0,1],
]
let finalWaves = [
  [0,0,0,1,2],
  [1,1,1,2,0],
  [2,2,2,0,1],
  [0,0,0,0,0],
  [1,1,1,1,1],
  [2,2,2,2,2],
]

let entities, enemies, players

export default class EntityManager {
  constructor(game) {
    this.game = game
    this.turnIndex = -1
    this.game.entities = []
    this.game.turn = 'player'
    this.game.waveNum = 0
    this.group = game.add.group()

    playerCount.forEach((pos, index) => {
      let x = index === 1 ? xBuffer + 60 : xBuffer
      let y = index % 3 * playerYBuffer + yBuffer
      let player = new Player(game, x, y, index)
      this.game.entities.push(player)
      this.group.add(player.sprite)
    })

    enemyCount.forEach((pos, index) => {
      const x2 = game.width - enemyXBuffer
      let x = index < 3 ? x2 - enemyXBuffer * 1.35 : x2
      let y1 = index % 3 * enemyYBuffer + yBuffer
      let y = index < 3 ? y1 : y1 + enemyYBuffer/2
      let enemy = new Enemy(game, x, y, game.rnd.integerInRange(0,2))
      this.game.entities.push(enemy)
      this.group.add(enemy.sprite)
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
    this.game.ui.toggleActionMenu(false)
    switch (action) {
      case 'timing': {
        current.timingAttackTrigger()
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
      case 'boost': case 'heal': case 'protect': {
        current.pickPlayer(target, action, this._nextTurn)
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
    if (alivePlayers.length === 0) {
      this.game.ui.toggleActionMenu(false)
      this.game.textManager.display('Game over...')
      setTimeout(this.triggerGameOver.bind(this), 1500)
    }
    if (aliveEnemies.length === 0) {
      this.game.ui.toggleActionMenu(false)
      this.game.textManager.display('You win!')
      setTimeout(this.nextWave.bind(this), 1500)
    }
  }

  triggerGameOver() {
    this.game.state.start('gameover', true, false, { score: Math.round(this.game.score) })
  }

  nextWave() {
    this.game.ui.allowAction = true
    this.game.waveNum++
    this.game.textManager.updateWave(this.game.waveNum)
    let waveLayout
    if (this.game.waveNum <= waves.length) {
      waveLayout = waves[this.game.waveNum - 1]
    } else {
      waveLayout = finalWaves[this.game.rnd.integerInRange(0,finalWaves.length)]
    }

    let waveSize = waveLayout.length

    enemies.forEach((enemy, index) => {
      if (waveSize <= index) return
      enemy.job = waveLayout[index]
      enemy.spawn()
    })

    this.resetPlayers()
    setTimeout(() => {
      this.turnIndex = -1
      this.game.ui.allowAction = false
      this.game.ui.toggleActionMenu(true)
      this.game.textManager.clear
      this._nextTurn()
    }, 1500)
  }

  resetPlayers() {
    players.forEach((player) => {
      player.reset()
    })
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
    this.game.nextToMove = this._getUnitForNextTurn()

    if (this.checkWinLoseCondition()) {
      return
    }
    let lastTurn = this.game.turn
    this.game.turn = this.turnIndex > 2 ? 'enemy' : 'player'

    if (lastTurn === 'enemy' && this.game.turn === 'player') {
      this.resetPlayers()
    }
    if (lastTurn === 'player' && this.game.turn === 'enemy') {
      this.game.ui.allowAction = false
    }

    if (this.game.turn === 'player') {
      this._performPlayerMove(this.game.nextToMove)
    } else {
      this.game.ui.hideTarget()
      this.game.textManager.clear()
      setTimeout(this._performEnemyMove.bind(this, this.game.nextToMove), 500)
    }
  }

  _performPlayerMove(player) {
    this.game.ui.setActionMenuPosition(player)
    player.stopDefendingOrAssisting()
  }

  _performEnemyMove(enemy) {
    // TODO: enemy should target thing they are strong against or weak player
    enemy.attackBestTarget(players, this._nextTurn)
  }

}
