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
    this.x = x
    this.y = y

    ease = Phaser.Easing

    this.game = game
    this.type = type
    this.job = job
    this.jobName = jobNames[job]
    this.maxLife = 100
    this.power = type === 'player' ? 100 : 100
    this.facing = type === 'player' ? 1 : -1
    this.alive = true

    this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1
    this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1

    this.life = this.maxLife
    this.lifeBarWidth = this.sprite.width
    this.lifeBar = new LifeBar(game, this.sprite.x, this.sprite.y - this.sprite.height, this.lifeBarWidth, this.life)
    this.updateLifeBar()
  }

  attack(target, callback=()=>{}) {
    if (!this.sprite.alive || !target.sprite.alive) return
    let damageMultiplier = 1

    if (this.strongAgainst === target.job) {
      damageMultiplier = 1.5
    } else if (this.weakAgainst === target.job) {
      damageMultiplier = 0.5
    }

    const damage = this.power * damageMultiplier

    const timing = 400
    const dist = 100

    jumpTween = this.game.add.tween(this.sprite)
      .to({ y: this.sprite.y - dist/4}, timing/15)
      .yoyo(true)
      .start()

    attackTween = this.game.add.tween(this.sprite)
      .to({
        x: this.sprite.x + dist * this.facing,
        angle: 20 * this.facing,
      }, timing, ease.Elastic.Out)
    attackTween.onComplete.add(() => {
      backTween = this.game.add.tween(this.sprite)
        .to({
          x: this.sprite.x - dist * this.facing,
          angle: 0,
        }, timing/4, ease.Quadratic.Out)

      // prevent player from attacking before tweens end
      backTween.onComplete.add(callback)
      backTween.start()
    })
    attackTween.start()

    setTimeout(() => {
      target.damage(damage)

      // allow player to attack before tweens end
      // setTimeout(callback, 200)
    }, timing/8)
  }

  damage(amount=0) {
    this.life -= amount
    if (this.life < 0) {
      this.alive = false
      this.life = 0
    }
    this.updateLifeBar()

    this.game.particleManager.burst(
      this.sprite.x, this.sprite.y, this.sprite.tint, this.facing
    )

    const timing = 250
    const dist = 50

    attackTween = this.game.add.tween(this.sprite)
      .to({
        tint: 0xffffff,
        x: this.sprite.x - dist * this.facing,
        angle: -20 * this.facing,
      }, timing, ease.Bounce.Out)
      .yoyo(true, timing)
    attackTween.onComplete.add(() => {
      if (this.life === 0) {
        this.kill()
      }
    })
    attackTween.start()
  }

  kill() {
    this.alive = false
    attackTween = this.game.add.tween(this.sprite.scale)
      .to({
        x: 0.1,
        y: 0.1,
      }, 500, ease.Quadratic.In)

    this.game.entityManager.checkWinLoseCondition()

    attackTween.onComplete.add(() => {
      this.sprite.alpha = 0
      this.lifeBar.kill()
      this.game.particleManager.burst(
        this.sprite.x, this.sprite.y, this.sprite.tint, 0
      )
      this.game.entityManager.triggerWinLoseCondition()
    })

    attackTween.start()
  }

  heal() {
    this.alive = true
    this.life = this.maxLife
    this.updateLifeBar()
    this.lifeBar.spawn()
  }

  spawn() {
    attackTween = this.game.add.tween(this.sprite.scale)
      .to({
        x: 1,
        y: 1,
      }, 1000, ease.Quadratic.Out)
      .start()
    backTween = this.game.add.tween(this.sprite)
      .to({
        alpha: 1,
      }, 1000, ease.Quadratic.Out)
      .start()

    this.heal()
  }

  updateLifeBar() {
    const hue = 0.3 - (this.maxLife - this.life) / 300
    const rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b)
    this.lifeBar.update(this.life, this.color)
  }

}
