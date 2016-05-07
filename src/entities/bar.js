export default class AmountBar {
  constructor(game, x, y, size=100, amount=1) {
    this.x = x
    this.y = y
  	this.game = game
    this.amount = amount
    this.fullAmount = amount
  	this.bar = this.game.add.sprite(x, y, 'bar', 1)
  	this.sprite = this.game.add.sprite(x, y, 'bar', 0)
    this.bar.anchor.setTo(0, 0.5)
    this.sprite.anchor.setTo(0, 0.5)

    this.bar.width = size
    this.sprite.width = this.amount * this.bar.width
    this.bar.x = this.x - this.bar.width/2
    this.sprite.x = this.x - this.bar.width/2

    this.update(amount)
  }
  update(amount, hue) {
    this.amount = amount
    this.isFull = false
    if (this.amount >= this.fullAmount) {
      this.isFull = true
      this.amount = this.fullAmount
    }
    if (hue) {
      this.sprite.tint = hue
    }
    this.sprite.width = this.amount/this.fullAmount * this.bar.width
  }
  kill() {
    this.sprite.alpha = 0
    this.bar.alpha = 0
  }
  spawn() {
    this.sprite.alpha = 1
    this.bar.alpha = 1
  }
}
