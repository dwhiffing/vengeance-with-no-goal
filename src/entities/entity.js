import LifeBar from '../entities/bar'
export default class Entity {
  constructor(game, x, y, type, tint='0xffff00') {
    this.sprite = game.add.sprite(x, y, 'ball')
    this.sprite.anchor.setTo(0.5)
    this.type = type
    this.sprite.tint = tint
    this.maxLife = 100
    this.power = type === 'player' ? 15 : 5
    this.life = this.maxLife
    this.lifeBarWidth = this.sprite.width
    this.lifeBar = new LifeBar(game, this.sprite.x, this.sprite.y - this.sprite.height, this.lifeBarWidth, this.life)
    this.updateLifeBar()
    this.alive = true

    this.game = game
  }
  attack(target) {
    if (!this.sprite.alive || !target.sprite.alive) return
    const damage = this.game.rnd.integerInRange(this.power, this.power * 2)
    target.damage(damage)
  }
  damage(amount=0) {
    this.life -= amount
    if (this.life < 0) {
      this.life = 0
    }
    this.updateLifeBar()
    if (this.life === 0) {
      this.kill()
    }
  }
  kill() {
    this.alive = false
    this.sprite.kill()
    this.lifeBar.kill()
  }
  updateLifeBar() {
    const hue = 0.3 - (this.maxLife - this.life) / 300
    const rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b)
    this.lifeBar.update(this.life, this.color)
  }
}
