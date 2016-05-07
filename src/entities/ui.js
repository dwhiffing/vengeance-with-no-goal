
class Button {
  constructor(game, group, x, y, tint) {
    this.sprite = game.add.sprite(x, y, 'ball')
    this.sprite.tint = tint
    this.sprite.anchor.x = 0.5
    if (group) {
      group.add(this.sprite)
    }
  }
}

let buffer = 50
let entities, enemies, players

export default class UserInterface {

  constructor(game) {
    this.game = game

    this.actionGroup = game.add.group()
    this.mode = 0

    this.attack = new Button(game, this.actionGroup, -buffer, 20, 0xff0000)
    this.defend = new Button(game, this.actionGroup, 0, 20, 0x0000ff)
    this.relic = new Button(game, this.actionGroup, buffer, 20, 0x00ff00)

    entities = this.game.entities
    enemies = this.game.enemies
    players = this.game.players

    this.actionIndex = 0
    this.actionIndicator = new Button(game, this.actionGroup, -buffer, 20, 0xffffff)
    this.actionIndicator.sprite.alpha = 0.5

    this.attackIndex = 0
    this.attackIndicator = new Button(game, null, -buffer, 20, 0xffffff)
    this.setAttackTarget()

    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update() {
    if (this.leftKey.isDown) {
      this.move(-1)
    }
    if (this.rightKey.isDown) {
      this.move(1)
    }
    if (this.spaceKey.isDown) {
      this.doSelectedAction()
    }
  }

  move(amount) {
    if (this.justMoved) return

    this.mode === 0 ? this.moveActionIndex(amount) : this.moveAttackIndex(amount)

    this.justMoved = true
    setTimeout(() => {
      this.justMoved = false
    }, 150)
  }

  moveActionIndex(amount) {
    this.actionIndex += amount

    if (this.actionIndex < 0) {
      this.actionIndex = 0
    }
    if (this.actionIndex > 2) {
      this.actionIndex = 2
    }
    this.actionIndicator.sprite.x = this.actionIndex * buffer - buffer
  }

  moveAttackIndex(amount) {
    let target
    do {
      this.attackIndex += amount
      if (this.attackIndex < 0) {
        this.attackIndex = enemies.length - 1
      }
      if (this.attackIndex > enemies.length - 1) {
        this.attackIndex = 0
      }
      target = enemies[this.attackIndex]
    } while (!target.alive)

    this.attackIndicator.sprite.x = target.sprite.x
    this.attackIndicator.sprite.y = target.sprite.y
  }

  setActionTarget(target) {
    this.actionGroup.alpha = 1
    this.actionGroup.x = target.sprite.x
    this.actionGroup.y = target.sprite.y - 100
    this.attackIndicator.sprite.alpha = 0
  }

  setAttackTarget(target) {
    if (!target) {
      this.attackIndex = 1
      this.moveAttackIndex(-1)
      target = enemies[this.attackIndex]
    }
    this.attackIndicator.sprite.alpha = 0.5
    this.attackIndicator.sprite.tint = 0xffffff
    this.attackIndicator.sprite.x = target.sprite.x
    this.attackIndicator.sprite.y = target.sprite.y
  }

  togglePlayerEnemyMode() {
    if (this.mode === 0) {
      this.mode = 1
      this.actionGroup.alpha = 0
      this.setAttackTarget()
    } else {
      this.mode = 0
      this.actionGroup.alpha = 1
      this.attackIndicator.sprite.alpha = 0
      this.attackIndicator.sprite.tint = 0xffff00
      let target = enemies[this.attackIndex]
      this.game.doAction('attack', target)
    }
  }

  performEnemyMove(target) {
    this.actionGroup.alpha = 0
    this.attackIndicator.sprite.alpha = 0.5
    this.attackIndicator.sprite.x = target.sprite.x
    this.attackIndicator.sprite.y = target.sprite.y
    target.attack(players.filter(p => !!p.alive)[0])
  }

  doSelectedAction() {
    if (this.justDidAction || this.game.phase === 1) return
    this.justDidAction = true
    setTimeout(() => {
      this.justDidAction = false
    }, 150)
    switch (this.actionIndex) {
      case 0:
        this.togglePlayerEnemyMode()
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
