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
    this.tint = tint
    this.x = x
    this.y = y

    ease = Phaser.Easing

    this.game = game
    this.type = type
    this.job = job
    this.jobName = jobNames[job]
    this.maxLife = 100
    this.power = type === 'player' ? 10 : 5
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
    this.timingAttackTriggered = false
    this.alreadyTriggered = false
    this.inTimingWindow = false

    const timing = this.type === 'player' ? 1500 : 500
    let jumpDist = 20

    let dist
    let angle = 1
    let damageDelay = 0
    if (this.job === 0) {
      dist = 50
    } else if (this.job === 1) {
      dist = 100
    } else {
      dist = -50
      angle = -1
      damageDelay = 500
    }

    let effectiveness = 1
    if (this.strongAgainst === target.job) {
      effectiveness = 2
    } else if (this.weakAgainst === target.job) {
      effectiveness = 0.5
    }

    jumpTween = this.game.add.tween(this.sprite)
      .to({ y: this.sprite.y - jumpDist}, timing/15)
      .yoyo(true)
      .start()

    attackTween = this.game.add.tween(this.sprite)
      .to({
        x: this.sprite.x + dist * this.facing,
        angle: 20 * this.facing * angle,
      }, timing, ease.Elastic.Out)
    attackTween.onComplete.add(() => {
      backTween = this.game.add.tween(this.sprite)
        .to({
          x: this.sprite.x - dist * this.facing,
          angle: 0,
        }, timing/10, ease.Quadratic.Out)

      // prevent player from attacking before tweens end
      backTween.onComplete.add(callback)
      backTween.start()
    })
    attackTween.start()

    if (this.type === 'player') {
      setTimeout(() => {
        this.inTimingWindow = true
        this.sprite.tint = 0xffffff
        this.sprite.scale.setTo(1.3)
        setTimeout(() => {
          this.sprite.tint = this.tint
          this.sprite.scale.setTo(1)
          this.inTimingWindow = false
        }, timing/8)
      }, timing/8)
    }

    setTimeout(() => {
      target.damage(effectiveness, this.timingAttackTriggered)
    }, timing/6 + damageDelay)
  }

  damage(effectiveness, critical) {
    let damageAmount = critical ? this.power * 2 : this.power
    damageAmount *= effectiveness

    this.life -= damageAmount
    if (this.life < 0) {
      this.alive = false
      this.life = 0
    }
    this.updateLifeBar()

    let particleAmount = effectiveness

    if (effectiveness > 0.5) {
      this.game.particleManager.burst(
        this.sprite.x, this.sprite.y, this.sprite.tint, this.facing, particleAmount
      )
    } else {
      this.game.particleManager.block(
        this.sprite.x, this.sprite.y, this.sprite.tint, this.facing, particleAmount
      )
    }

    let timing = 250
    let dist, angle
    if (effectiveness === 0.5) {
      dist = 10
      angle = 5
    } else if (effectiveness === 1) {
      dist = 20
      angle = 10
    } else {
      dist = 40
      angle = 30
    }

    if (critical) {
      this.game.shake(damageAmount/2, 100)
      dist *= 4
      angle *= 2
    }

    const tint = critical ? 0xffffff : this.tint

    attackTween = this.game.add.tween(this.sprite)
      .to({
        tint: tint,
        x: this.sprite.x - dist * this.facing,
        angle: -angle * this.facing,
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
