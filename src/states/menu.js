let spaceKey, leftKey, rightKey, downKey, upKey

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    this.titleText = game.add.text(this.game.world.centerX, this.game.world.centerY-50, "Vengeance With no Goal", { font: "bold 42px Arial", fill: "#fff" })
    this.titleText.anchor.setTo(0.5)
    this.startText = game.add.text(this.game.world.centerX, this.game.world.centerY+50, "Start", { font: "bold 32px Arial", fill: "#fff" })
    this.startText.anchor.setTo(0.5)
    this.creditsText = game.add.text(this.game.world.centerX, this.game.world.centerY+100, "Credits", { font: "28px Arial", fill: "#fff" })
    this.creditsText.anchor.setTo(0.5)
    this.index = 0

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    leftKey.onDown.add(this.move.bind(this, -1))
    rightKey.onDown.add(this.move.bind(this, 1))
    upKey.onDown.add(this.move.bind(this, 1))
    downKey.onDown.add(this.move.bind(this, -1))
    spaceKey.onDown.add(this.start.bind(this))
    game.input.onDown.add(this.start.bind(this))
  },
  move(dir) {
    this.index = this.index === 0 ? 1 : 0
    if (this.index === 0) {
      this.startText.setStyle({ font: "bold 32px Arial", fill: "#fff" })
      this.creditsText.setStyle({ font: "28px Arial", fill: "#fff" })
    } else {
      this.startText.setStyle({ font: "28px Arial", fill: "#fff" })
      this.creditsText.setStyle({ font: "bold 32px Arial", fill: "#fff" })
    }
  },
  start() {
    if (this.index === 0) {
      this.game.state.start('play', true, false)
    } else {
      this.game.state.start('credits', true, false)
    }
  }
}
