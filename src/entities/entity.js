import LifeBar from '../entities/bar'

let sprites = ['ball', 'square', 'triangle']
let jobNames = ['sword', 'axe', 'bow']

let attackTween, backTween, jumpTween, damageTween
let ease

export default class Entity {

  constructor(game, x, y, type, job, tint='0xffff00') {
    this.sprite = game.add.sprite(x, y, sprites[job])
    this.sprite.anchor.setTo(0.5)
    this.sprite.tint = tint

    ease = Phaser.Easing

    this.game = game
    this.type = type
    this.job = job
    this.jobName = jobNames[job]
    this.maxLife = 100
    this.power = type === 'player' ? 30 : 10
    this.facing = type === 'player' ? 1 : -1
    this.alive = true

    this.life = this.maxLife
    this.lifeBarWidth = this.sprite.width
    this.lifeBar = new LifeBar(game, this.sprite.x, this.sprite.y - this.sprite.height, this.lifeBarWidth, this.life)
    this.updateLifeBar()
  }

  attack(target, callback=()=>{}) {
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

    const timing = 900
    const dist = 120

    jumpTween = this.game.add.tween(this.sprite)
      .to({ y: this.sprite.y - dist/4}, timing/15)
      .yoyo(true)
      .start()

    attackTween = this.game.add.tween(this.sprite)
      .to({ x: this.sprite.x + dist * this.facing}, timing, ease.Elastic.Out)
    attackTween.onComplete.add(() => {
      backTween = this.game.add.tween(this.sprite)
        .to({ x: this.sprite.x - dist * this.facing }, timing/2, ease.Quadratic.Out)
        .start()
    })
    attackTween.start()

    setTimeout(() => {
      target.damage(damage)
      callback()
    }, timing/4)
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

    const timing = 250
    const dist = 20

    this.game.particleManager.burst(this.sprite.x, this.sprite.y, this.sprite.tint)

    // jumpTween = this.game.add.tween(this.sprite)
    //   .to({ y: this.sprite.y - dist}, timing, ease.Bounce.InOut)
    //   .yoyo(true)
    //   .start()

    attackTween = this.game.add.tween(this.sprite)
      .to({ tint: 0xffffff, x: this.sprite.x - dist * this.facing}, timing, ease.Bounce.Out)
      .yoyo(true, timing)
    attackTween.start()
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
