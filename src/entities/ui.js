
class Dot {
  constructor(game, group, x, y, key) {
    this.sprite = game.add.sprite(x, y, key)
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    if (group) {
      group.add(this.sprite)
    }
  }
}

let buffer = 60, uiMode
let entities, enemies, players, targetting
let actionGroup, actionDot, actionIndex, targetDot, targetIndex
let attack, defend, assistButton
let leftKey, rightKey, upKey, downKey, spaceKey

let actions = ['attack', 'defend']
let buttons
let assist = ['boost', 'protect', 'heal']

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

    attack = new Dot(game, actionGroup, -buffer, 40, 'attack-icon')
    defend = new Dot(game, actionGroup, 0, 20, 'counter-icon')
    assistButton = new Dot(game, actionGroup, buffer, 40, 'assist-icon')
    buttons = [attack, defend, assistButton]

    entities = this.game.entities
    enemies = this.game.enemies
    players = this.game.players
    targetting = enemies

    actionIndex = 0
    targetIndex = 0
    targetDot = new Dot(game, null, -buffer, 20, 'select')
    targetDot.sprite.anchor.setTo(0.5)
    let targetDotTween = this.game.add.tween(targetDot.sprite)
      .to({ angle: 360 }, 10000)
      .loop()
      .start()

    this.setActionMenuPosition()

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    leftKey.onDown.add(this.move.bind(this, -1))
    rightKey.onDown.add(this.move.bind(this, 1))
    upKey.onDown.add(this.move.bind(this, 1))
    downKey.onDown.add(this.move.bind(this, -1))
    spaceKey.onDown.add(this.hitSpace.bind(this))
  }

  hitSpace() {
    this.allowAction ?
      this.doSelectedAction() :
      this.game.doAction('timing')
  }

  move(amount) {
    uiMode === 'action' ?
      this.moveActionIndex(amount) :
      this.moveTargetIndex(amount)
  }

  moveActionIndex(amount) {
    actionIndex += amount
    actionIndex = loop(actionIndex, 0, 2)
    buttons.forEach(b => b.sprite.scale.setTo(1))
    buttons[actionIndex].sprite.scale.setTo(1.2)
    this.game.textManager.display(this.getActionName())
  }

  getActionName() {
    if (actionIndex === 2) {
      return assist[this.game.nextToMove.job]
    }
    return actions[actionIndex]
  }

  moveTargetIndex(amount) {
    let target
    do {
      targetIndex += amount
      targetIndex = loop(targetIndex, 0, targetting.length - 1)
      target = targetting[targetIndex]
      target = target === this.game.nextToMove && target.job !== 2 ? null : target
    } while (!target || !target.alive)

    targetDot.sprite.x = target.sprite.x
    targetDot.sprite.y = target.sprite.y

    this.game.textManager.display(`attack ${target.jobName} enemy`)
  }

  setActionMenuPosition(target) {
    if (!target) {
      actionIndex = 1
      this.moveActionIndex(-1)
      target = players[actionIndex]
    }
    actionGroup.alpha = 1
    actionGroup.x = target.x
    actionGroup.y = target.y - 120
    targetDot.sprite.alpha = 0
    this.allowAction = true
    this.game.textManager.display(this.getActionName())
  }

  setTarget() {
    targetIndex = 1
    this.moveTargetIndex(-1)
    let target = targetting[targetIndex]
    actionGroup.alpha = 0
    this.allowAction = true
    targetDot.sprite.x = target.sprite.x
    targetDot.sprite.y = target.sprite.y
    targetDot.sprite.alpha = 0.5
  }

  hideTarget() {
    targetDot.sprite.alpha = 0
  }

  toggleActionMenu(thing=0) {
    if (thing === 0) {
      actionGroup.alpha = actionGroup.alpha === 0 ? 1 : 0
    } else {
      actionGroup.alpha = thing ? 1 : 0
    }
  }

  toggleTargetMode(type='attack') {
    if (uiMode === 'action') {
      uiMode = 'target'
      // move attack target to first targettable enemy
      targetting = type === 'attack' ? enemies : players
      this.setTarget()
    } else {
      uiMode = 'action'
      this.hideTarget()
      this.game.doAction(type, targetting[targetIndex])
    }
  }

  doSelectedAction() {
    if (!this.allowAction || this.game.turn === 'enemy') return
    switch (actionIndex) {
      case 0:
        this.allowAction = false
        this.toggleTargetMode()
        break
      case 2:
        this.allowAction = false
        this.toggleTargetMode(this.getActionName())
        break
      default:
        this.game.doAction(this.getActionName())
        break
    }
  }
}
