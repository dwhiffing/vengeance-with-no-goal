
class Dot {
  constructor(game, group, x, y, tint) {
    this.sprite = game.add.sprite(x, y, 'ball')
    this.sprite.tint = tint
    this.sprite.anchor.x = 0.5
    if (group) {
      group.add(this.sprite)
    }
  }
}

let actions = ['attack', 'defend', 'relic']
let buffer = 50, uiMode
let entities, enemies, players
let actionGroup, actionDot, actionIndex, attackDot, attackIndex
let attack, defend, relic
let leftKey, rightKey, upKey, downKey, spaceKey

const loop = (val, min, max) => {
  if (val < min) {
    return max
  } else if (val > max) {
    return min
  }
  return val
}

export default class UserInterface {

  constructor(game) {
    this.game = game

    actionGroup = game.add.group()
    uiMode = 'action'

    attack = new Dot(game, actionGroup, -buffer, 20, 0xff0000)
    defend = new Dot(game, actionGroup, 0, 20, 0x0000ff)
    relic = new Dot(game, actionGroup, buffer, 20, 0x00ff00)

    entities = this.game.entities
    enemies = this.game.enemies
    players = this.game.players

    actionIndex = 0
    actionDot = new Dot(game, actionGroup, -buffer, 20, 0xffffff)
    actionDot.sprite.alpha = 0.5

    attackIndex = 0
    attackDot = new Dot(game, null, -buffer, 20, 0xffffff)
    attackDot.sprite.scale.setTo(1.5)
    attackDot.sprite.anchor.setTo(0.5)

    this.setAttackTarget()
    this.setActionMenuPosition()

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    leftKey.onDown.add(this.move.bind(this, -1))
    rightKey.onDown.add(this.move.bind(this, 1))
    spaceKey.onDown.add(this.doSelectedAction.bind(this))
  }

  update() {
    // if (leftKey.isDown) {
    //   this.move(-1)
    // }
    // if (rightKey.isDown) {
    //   this.move(1)
    // }
    // if (spaceKey.isDown) {
    //   this.doSelectedAction()
    // }
  }

  move(amount) {
    uiMode === 'action' ?
      this.moveActionIndex(amount) :
      this.moveAttackIndex(amount)
  }

  moveActionIndex(amount) {
    actionIndex += amount
    actionIndex = loop(actionIndex, 0, 2)
    actionDot.sprite.x = actionIndex * buffer - buffer
    this.game.textManager.display(actions[actionIndex])
  }

  moveAttackIndex(amount) {
    let target
    do {
      attackIndex += amount
      attackIndex = loop(attackIndex, 0, enemies.length - 1)
      target = enemies[attackIndex]
    } while (!target.alive)

    attackDot.sprite.x = target.sprite.x
    attackDot.sprite.y = target.sprite.y

    this.game.textManager.display(`attack ${target.jobName} enemy`)
  }

  setActionMenuPosition(target) {
    if (!target) {
      actionIndex = 1
      this.moveActionIndex(-1)
      target = players[actionIndex]
    }
    actionGroup.alpha = 1
    actionGroup.x = target.sprite.x
    actionGroup.y = target.sprite.y - 100
    attackDot.sprite.alpha = 0
    this.allowInput = true
    this.game.textManager.display(actions[actionIndex])
  }

  setAttackTarget(target, tint=0xffffff) {
    if (!target) {
      attackIndex = 1
      this.moveAttackIndex(-1)
      target = enemies[attackIndex]
    }
    actionGroup.alpha = 0
    this.allowInput = true
    this.setSprite(attackDot, target.sprite.x, target.sprite.y, tint, 0.3)
  }

  setSprite(thing, x, y, tint, alpha) {
    thing.sprite.x = x
    thing.sprite.y = y
    thing.sprite.tint = tint
    thing.sprite.alpha = alpha
  }

  hideTarget() {
    attackDot.sprite.alpha = 0
  }

  toggleAttackMode() {
    if (uiMode === 'action') {
      uiMode = 'target'
      // move attack target to first targettable enemy
      this.setAttackTarget()
    } else {
      uiMode = 'action'
      this.game.doAction('attack', enemies[attackIndex])
    }
  }

  doSelectedAction() {
    if (!this.allowInput || this.game.turn === 'enemy') return
    this.allowInput = false
    switch (actionIndex) {
      case 0:
        this.toggleAttackMode()
        break
      case 1:
        this.game.doAction('defend')
        break
      case 2:
        this.game.doAction('relic')
        break
    }
  }
}
