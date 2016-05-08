import HealthText from '../entities/text'

let sprites = ['ball', 'square', 'triangle']
let jobNames = ['sword', 'axe', 'bow']
let jobColors = [0x22dd22, 0xdd0000, 0x4422dd]
let baseStats = [
  {
    hp: 120,
    power: 25,
    powerVariance: 5,
  }, {
    hp: 300,
    power: 30,
    powerVariance: 1,
  }, {
    hp: 80,
    power: 20,
    powerVariance: 10,
  },
]

let attackTween, backTween, jumpTween, damageTween, pulseTween
let ease

export default class Entity {

  constructor(game, x, y, type, job) {
    this.sprite = game.add.sprite(x, y, `${type}-${jobNames[job]}-idle`)
    this.sprite.anchor.setTo(0.5, 0.7)
    this.x = this.sprite.x
    this.y = this.sprite.y
    ease = Phaser.Easing

    this.game = game
    this.type = type
    this.job = job
    this.jobName = jobNames[job]

    this.setStats()

    this.facing = type === 'player' ? 1 : -1
    this.alive = true

    this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1
    this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1

    this.lifeBarWidth = this.sprite.width/4
    let lifeBarY = this.sprite.y
    let lifeBarX = this.sprite.x-this.facing*60 - (this.type === 'player' ? 70 : 0)

    if (this.type === 'player') {
      lifeBarX -= this.job === 1 ? 20 : 0
      lifeBarX -= this.job === 2 ? -40 : 0
    }

    this.lifeBar = new HealthText(game,
      lifeBarX, lifeBarY, this.life
    )
    this.updateLifeBar()
    this.revive()

    pulseTween = game.add.tween(this.sprite.scale)
      .to(
        { x: 1.03, y: 1.04},
        this.game.rnd.integerInRange(800,1500),
        Phaser.Easing.Quadratic.InOut
      )
      .yoyo(true)
      .loop(true)
      .start()

    if (this.type !== 'player') {
      this.alive = false
      this.sprite.alpha = 0
      this.lifeBar.kill()
    }

  }

  attack(target, callback=()=>{}) {
    if (!this.sprite.alive || !target.sprite.alive) return
    this.timingAttackTriggered = false
    this.alreadyTriggered = false
    this.inTimingWindow = false

    const timing = this.type === 'player' ? 1500 : 1000
    let jumpDist = 20

    let dist
    let angle = 1
    let damageDelay = 0
    if (this.job === 0) {
      dist = 80
    } else if (this.job === 1) {
      dist = 120
    } else {
      dist = -70
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
        }, timing/6, ease.Quadratic.Out)

      // prevent player from attacking before tweens end
      backTween.onComplete.add(callback)
      backTween.start()
    })
    attackTween.start()

    let damage = this.power + this.game.rnd.integerInRange(0, this.powerVariance)

    setTimeout(() => {
      this.inTimingWindow = true
      this.sprite.tint = 0xffff00
      setTimeout(() => {
        this.sprite.tint = 0xffffff
        this.inTimingWindow = false
      }, timing/3)
    }, timing/14)

    setTimeout(() => {
      if (target.isDefending && effectiveness !== 1) {
        effectiveness = effectiveness === 0.5 ? 2 : 0.5
      }
      target.getHit(damage, effectiveness, this.timingAttackTriggered)
    }, timing/6 + damageDelay)
  }

  defenseModes() {
    // various defense modes
    let meleePlayer = this.game.players.filter(p => p.job === 1)[0]
    if (this.type === 'enemy' && meleePlayer.alive && meleePlayer.isDefending && target !== meleePlayer) {
      let old = {x: meleePlayer.sprite.x, y: meleePlayer.sprite.y}
      meleePlayer.sprite.x = target.sprite.x
      meleePlayer.sprite.y = target.sprite.y
      setTimeout(() => {
        meleePlayer.sprite.x = old.x
        meleePlayer.sprite.y = old.y
      }, 500)

      target = meleePlayer
    }
    if (target.job === 2 && target.isDefending) {
      effectiveness = 0
    }
    if (target.job === 0 && target.isDefending) {
      effectiveness *= 0.5
      this.takeDamage(damage)
    }
  }

  takeDamage(damage=0, effectiveness=1, isCritHit=false) {
    this.game.textManager.floatText(this.x, this.y-20, damage, isCritHit)
    this.life -= damage
    if (this.life < 0) {
      this.alive = false
      this.life = 0
    }
    this.updateLifeBar(this.life)

    // launch particles
    let particleAmount = effectiveness
    if (effectiveness < 1) {
      this.game.particleManager.block(
        this.sprite.x, this.sprite.y, this.facing, particleAmount
      )
    } else {
      this.game.particleManager.burst(
        this.sprite.x, this.sprite.y, this.facing, particleAmount
      )
    }

    if (this.type === 'enemy') {
      this.game.textManager.addScore(damage)
    }
  }

  getHit(damage, effectiveness, timingAttackTriggered) {
    let critMulti = 1
    if (timingAttackTriggered) {
      critMulti = this.type === 'enemy' ? 2 : 0.3
    }
    effectiveness *= critMulti

    let damageAmount = Math.round(damage * effectiveness)
    let isCritHit = timingAttackTriggered && this.type === 'enemy'

    this.takeDamage(damageAmount, effectiveness, isCritHit)

    let timing = 250
    let dist, angle
    // vary the tween based on how effective the hit was
    if (effectiveness === 0.5) {
      dist = 10
      angle = 2
    } else if (effectiveness === 1) {
      dist = 30
      angle = 5
    } else {
      dist = 40
      angle = 20
    }

    // just defended
    if (this.type === 'player' && timingAttackTriggered) {
      dist = 5
      angle = 2
    }

    if (isCritHit) {
      this.game.shake(damageAmount/2, 100)
      dist *= 4
      angle *= 2
    }

    attackTween = this.game.add.tween(this.sprite)
      .to({
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
        this.sprite.x, this.sprite.y, 0, 1.5, 1500
      )
      this.game.entityManager.triggerWinLoseCondition()
    })

    attackTween.start()
  }

  setStats() {
    let modifier = 1
    if (this.type === 'enemy') {
      modifier = this.game.waveNum/10
      this.job = this.game.rnd.integerInRange(0, 2)
      this.sprite.loadTexture(`${this.type}-${jobNames[this.job]}-idle`)
    }
    this.maxLife = baseStats[this.job].hp * modifier
    this.life = this.maxLife
    this.power = baseStats[this.job].power * (modifier/2)
    this.powerVariance = baseStats[this.job].powerVariance
  }

  revive() {
    this.alive = true
    this.life = this.maxLife
    this.updateLifeBar()
    this.lifeBar.spawn()
  }

  spawn() {
    this.setStats()
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

    this.revive()
  }

  updateLifeBar() {
    const hue = 0.3334 - ((this.maxLife - this.life) / (3 * this.maxLife))
    const rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b)
    this.lifeBar.fullAmount = this.maxLife
    this.lifeBar.update(this.life, this.color)
  }

  timingAttackTrigger() {
    if (this.alreadyTriggered) return
    this.alreadyTriggered = true
    if (this.inTimingWindow) {
      this.timingAttackTriggered = true
    } else {
      this.timingAttackTriggered = false
    }
  }

}
