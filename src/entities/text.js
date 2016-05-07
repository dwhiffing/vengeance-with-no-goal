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
  update(amount, hue) {
    this.amount = amount
    this.text.text = `${this.amount}/${this.fullAmount}`
    if (hue) {
      this.text.tint = hue
    }
  }
  kill() {
    this.text.alpha = 0
  }
  spawn() {
    this.text.alpha = 1
  }
}
