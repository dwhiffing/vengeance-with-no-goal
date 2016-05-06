import LifeBar from '../entities/bar'
export default class Entity {
  constructor(game, x, y, tint='0xffff00') {
    this.sprite = game.add.sprite(x, y, 'ball')
    this.sprite.anchor.setTo(0.5)
    this.sprite.tint = tint
    this.maxLife = 100
    this.power = 5
    this.life = this.maxLife
    this.lifeBarWidth = this.sprite.width
    this.lifeBar = new LifeBar(game, this.sprite.x, this.sprite.y - this.sprite.height, this.lifeBarWidth, this.life)
    this.updateLifeBar()
    this.game = game
    this.tweenToward = game.add.tween(this.sprite)
    this.tweenBack = game.add.tween(this.sprite)
  }
  attack(target) {
    const damage = this.game.rnd.integerInRange(this.power, this.power * 2)
    const direction = this.sprite.tint === '0xffff00' ? 50 : -50
    this.tweenToward.to({ x: this.sprite.x + direction}, 100, 'Quart.easeOut')
    this.tweenBack.to({ x: this.sprite.x}, 100, 'Quart.easeOut')
    this.tweenToward.chain(this.tweenBack)
    this.tweenToward.onComplete.add(() => {
      target.damage(damage)
    })
    this.tweenToward.start()
  }
  damage(amount=0) {
    this.life -= amount
    if (this.life < 0) {
      this.life === 0
    }
    this.updateLifeBar()
    if (this.life === 0) {
      this.kill()
    }
  }
  kill() {
    this.sprite.kill()
    this.lifeBar.kill()
  }
  updateLifeBar() {
    const hue = 0.3 - (this.maxLife - this.life) / 300
    const rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b)
    this.lifeBar.update(this.life, this.color)
    // this.hue = Phaser.Color.RGBtoString(hue.r, hue.g, hue.b, 255, '#')
  }
}
