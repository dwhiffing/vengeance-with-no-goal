
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
let attack, defend, assistButton, allowAssist
let leftKey, rightKey, upKey, downKey, spaceKey, escKey

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

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC)

    leftKey.onDown.add(this.move.bind(this, -1))
    rightKey.onDown.add(this.move.bind(this, 1))
    upKey.onDown.add(this.move.bind(this, 1))
    downKey.onDown.add(this.move.bind(this, -1))
    spaceKey.onDown.add(this.hitSpace.bind(this))
    escKey.onDown.add(this.hitEsc.bind(this))

    if (!this.game.device.desktop) {
      let leftArrow = game.add.button(10, game.height-55, 'arrow', this.move.bind(this, -1))
      let rightArrow = game.add.button(75, game.height-55, 'rightarrow', this.move.bind(this, 1))
      let confirm = game.add.button(game.width-60, game.height-60, 'confirm', this.hitSpace.bind(this))
      let cancel = game.add.button(game.width-110, game.height-40, 'cancel', this.hitEsc.bind(this))
      confirm.width = 50
      confirm.height = 50
      leftArrow.width = 50
      leftArrow.height = 50
      rightArrow.scale.x = -1
      rightArrow.width = 50
      rightArrow.height = 50
      cancel.width = 30
      cancel.height = 30
    }
  }

  hitSpace() {
    this.allowAction ?
      this.doSelectedAction() :
      this.game.doAction('timing')
  }

  hitEsc() {
    if (uiMode === 'target') {
      uiMode = 'action'
      actionGroup.alpha = 1
      this.hideTarget()
    }
  }

  move(amount) {
    this.game.selectSound.play()
    uiMode === 'action' ?
      this.moveActionIndex(amount) :
      this.moveTargetIndex(amount)
  }

  moveActionIndex(amount) {
    actionIndex += amount
    actionIndex = loop(actionIndex, 0, 2)
    buttons.forEach(b =>{
      b.sprite.scale.setTo(1)
      b.sprite.tint = 0x555555
    })
    buttons[actionIndex].sprite.scale.setTo(1.2)
    buttons[actionIndex].sprite.tint = 0xffffff
    this.game.textManager.display(this.getActionName())
  }

  getActionName() {
    if (actionIndex === 2) {
      if (allowAssist) {
        return assist[this.game.nextToMove.job]
      } else {
        return 'No free target to assist'
      }
    }
    return actions[actionIndex]
  }

  moveTargetIndex(amount) {
    let target
    let nextToMove = this.game.nextToMove || this.game.players[0]
    do {
      targetIndex += amount
      targetIndex = loop(targetIndex, 0, targetting.length - 1)
      target = targetting[targetIndex]
      if (
        (target === nextToMove && target.job !== 2) ||
        (nextToMove.job !== 2 && target.isAssisting)  ||
        (nextToMove.job !== 2 && target.isAssisted)
      ) {
        target = null
      }
    } while (!target || !target.alive)

    targetDot.sprite.x = target.sprite.x
    targetDot.sprite.y = target.sprite.y

    let verb = targetting === this.game.players ? 'Assist' : 'Attack'

    this.game.textManager.display(`${verb} ${target.jobName}`)
  }

  setActionMenuPosition(target) {
    if (!target) {
      actionIndex = 1
      this.moveActionIndex(-1)
      target = players[actionIndex]
    }
    actionIndex = 0
    this.moveActionIndex(1)
    this.moveActionIndex(-1)

    actionGroup.alpha = 1
    actionGroup.x = target.x
    actionGroup.y = target.y - 120
    targetDot.sprite.alpha = 0

    let melee = this.game.players[0]
    let sword = this.game.players[1]
    let bow = this.game.players[2]

    allowAssist = true
    if (
      (this.game.nextToMove === melee && sword.isAssisting) ||
      (this.game.nextToMove === sword && melee.isAssisting) ||
      (this.game.nextToMove === sword && !bow.alive && !melee.alive) ||
      (this.game.nextToMove === melee && !bow.alive && !sword.alive)
    ) {
      allowAssist = false
    }
    assistButton.sprite.tint = allowAssist ? 0xffffff : 0x222222
    this.allowAction = true

    buttons.forEach(b =>{
      b.sprite.scale.setTo(1)
      b.sprite.tint = 0x555555
    })
    buttons[0].sprite.tint = 0xffffff

    this.game.players.forEach(p => p.sprite.tint = 0x666666)
    target.sprite.tint = 0xffffff
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

  toggleTargetMode(type='attack', undo) {
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
    if (!this.allowAction || this.game.turn === 'enemy') {
      if (this.game.turn !== 'enemy') {
        this.game.cancelSound.play()
      }
      return
    }
    this.game.confirmSound.play()
    switch (actionIndex) {
      case 0: {
        this.allowAction = false
        this.toggleTargetMode()
        break
      }
      case 2: {
        if (allowAssist) {
          this.allowAction = false
          this.toggleTargetMode(this.getActionName())
        }
        break
      }
      default: {
        this.game.doAction(this.getActionName())
        break
      }
    }
  }
}
