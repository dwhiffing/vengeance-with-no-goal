import LifeBar from '../entities/bar'

let sprites = ['ball', 'square', 'triangle']

export default class Entity {

  constructor(game, x, y, type, job, tint='0xffff00') {
    this.game = game
    this.sprite = game.add.sprite(x, y, sprites[job])
    this.sprite.anchor.setTo(0.5)
    this.type = type
    this.job = job
    this.sprite.tint = tint
    this.maxLife = 100
    this.power = type === 'player' ? 30 : 10
    this.life = this.maxLife
    this.lifeBarWidth = this.sprite.width
    this.lifeBar = new LifeBar(game, this.sprite.x, this.sprite.y - this.sprite.height, this.lifeBarWidth, this.life)
    this.updateLifeBar()
    this.alive = true
  }

  attack(target) {
    if (!this.sprite.alive || !target.sprite.alive) return
    let damageMultiplier = 1
    let nextJob = this.job + 1 > 2 ? 0 : this.job + 1
    let prevJob = this.job - 1 < 0 ? 2 : this.job - 1
    if (nextJob === target.job) {
      damageMultiplier = 1.5
    } else if (prevJob === target.job) {
      damageMultiplier = 0.5
    }
    const damage = this.power * damageMultiplier
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
