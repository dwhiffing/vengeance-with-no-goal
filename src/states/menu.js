export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    this.titleText = game.add.text(this.game.world.centerX, this.game.world.centerY-50, "Vengeance Without a Goal", { font: "bold 42px Arial", fill: "#fff" })
    this.titleText.anchor.setTo(0.5)
    this.startText = game.add.text(this.game.world.centerX, this.game.world.centerY+50, "Start", { font: "bold 28px Arial", fill: "#fff" })
    this.startText.anchor.setTo(0.5)

    game.input.onDown.add(this.goFull.bind(this))
  },
  goFull() {
    if (!this.game.device.desktop) {
      this.game.scale.startFullScreen()
    }
    this.game.state.start('play', true, false)
  }
}
