let style = {
  font: "bold 16px Arial",
  fill: "#fff",
}

export default class HealthText {
  constructor(game, x, y, amount=1) {
  	this.game = game
    this.fullAmount = amount
    this.amount = amount
  	this.text = this.game.add.text(x, y, '', style)
    this.text.setShadow(1, 1, 'rgba(0,0,0,0.8)', 1)
    this.text.anchor.setTo(0, 0.5)

    this.update(amount)
  }
  update(amount, hue, animate) {
    this.amount = amount
    this.text.text = `${this.amount}/${this.fullAmount}`
    if (hue) {
      this.text.tint = hue
    }
    if (animate) {
      let tween = this.game.add.tween(this.text.scale)
      .to({ x: 1.7, y: 1.7 }, 250, Phaser.Easing.Bounce.Out)
      .yoyo(true)
      .start()
    }
  }
  kill() {
    this.text.alpha = 0
  }
  spawn() {
    this.text.alpha = 1
  }
}
