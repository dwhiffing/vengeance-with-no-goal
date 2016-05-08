import HealthText from '../entities/text'

let sprites = ['ball', 'square', 'triangle']
let spriteNames = ['sword', 'melee', 'bow']
let jobNames = ['Papier', 'Rok', 'Sizzorix']
let jobNamesEnemy = ['P-Wing', 'Rit-Rat', 'Slippy']
let jobColors = [0x22dd22, 0xdd0000, 0x4422dd]
let baseStats = [
  {
    hp: 100,
    power: 25,
  }, {
    hp: 200,
    power: 25,
  }, {
    hp: 80,
    power: 25,
  },
]

let attackTween, backTween, jumpTween, damageTween, pulseTween
let ease
let idleAnim, attackAnim, hitAnim, deadAnim, defendAnim

export default class Entity {

  constructor(game, x, y, type, job) {
    this.sprite = game.add.sprite(x, y, `${type}-${spriteNames[job]}`)
    this.sprite.anchor.setTo(0.5, 0.7)
    this.x = this.sprite.x
    this.y = this.sprite.y
    ease = Phaser.Easing

    this.game = game
    this.type = type
    this.job = job

    this.setStats()

    this.facing = type === 'player' ? 1 : -1
    this.alive = true

    this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1
    this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1

    idleAnim = this.sprite.animations.add('idle', [0, 1])
    attackAnim = this.sprite.animations.add('attack', [2, 3])
    hitAnim = this.sprite.animations.add('hit', [4])
    deadAnim = this.sprite.animations.add('dead', [5])
    defendAnim = this.sprite.animations.add('defend', [6])

    this.lifeBarWidth = this.sprite.width/4
    let lifeBarY = this.sprite.y

    this.lifebarSpacing = 0
    if (this.type === 'player') {
      this.lifebarSpacing = 60
      this.lifebarSpacing += this.job === 1 ? 20 : 0
      this.lifebarSpacing += this.job === 2 ? -40 : 0
    }
    let lifeBarX = this.sprite.x-this.facing*70 - this.lifebarSpacing

    this.lifeBar = new HealthText(game,
      lifeBarX, lifeBarY, this.life
    )
    this.updateLifeBar()
    this.revive()

    if (this.type !== 'player') {
      this.alive = false
      this.sprite.alpha = 0
      this.lifeBar.kill()
    }

    this.idle()
  }

  idle(delay=1000) {
    setTimeout(() => {
      this.sprite.animations.play('idle', 1, true)
      pulseTween = this.game.add.tween(this.sprite.scale)
        .to(
          { x: 1.03, y: 1.04},
          1000,
          Phaser.Easing.Quadratic.InOut
        )
        .yoyo(true)
        .loop(true)
        .start()
    }, this.game.rnd.integerInRange(0, delay))
  }

  attack(target, callback=()=>{}, effectiveness) {
    if (!this.sprite.alive || !target.sprite.alive) return
    this.timingAttackTriggered = false
    this.alreadyTriggered = false
    this.inTimingWindow = false

    const timing = this.type === 'player' ? 1500 : 800
    let jumpDist = 20

    let dist
    let angle = 1
    let damageDelay = 0
    if (this.job < 2) {
      dist = 70
    } else {
      dist = -50
      angle = -1
      damageDelay = 500
    }

    this.sprite.animations.play('attack', 2)

    if (!effectiveness) {
      effectiveness = 1
      if (this.strongAgainst === target.job) {
        effectiveness = 2
      } else if (this.weakAgainst === target.job) {
        effectiveness = 0.2
      }
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
      backTween.onComplete.add(() => {
        this.sprite.animations.play('idle', 1, true)
        callback()
      })
      backTween.start()
    })
    attackTween.start()

    let damage = this.type === 'enemy' ? this.power * (this.life/this.maxLife) : this.power

    setTimeout(() => {
      this.inTimingWindow = true
      this.sprite.tint = 0xffff00
      setTimeout(() => {
        this.sprite.tint = 0xffffff
        this.inTimingWindow = false
      }, timing/3)
    }, timing/14)

    setTimeout(() => {
      // if defending, reverse effectiveness
      if (target.isDefending && effectiveness !== 1) {
        effectiveness *= effectiveness < 1 ? 2 : 0.5
      }
      let sword = this.game.players[0]
      let melee = this.game.players[1]
      if (sword.isAssisting && sword.assistTarget === target && this.type === 'enemy') {
        // this should respect effectiveness rules for sword instead
        // GAAAH STUPID BUG
        // sword.attack(this, () => {}, 2)
        this.takeDamage(sword.power)
        sword.getHit(damage, 0.2, this.timingAttackTriggered)
      } else if (melee.isAssisting && melee.assistTarget === target && this.type === 'enemy') {
        // this should respect effectiveness rules for melee insetad
        melee.getHit(damage, 0.5, this.timingAttackTriggered)
      } else {
        target.getHit(damage, effectiveness, this.timingAttackTriggered)
      }
    }, timing/6 + damageDelay)
  }

  takeDamage(damage=0, effectiveness=1, isCritHit=false) {
    let spacing = this.type === 'player' ? 60 : 80
    this.game.textManager.floatText(this.sprite.x-((spacing+this.lifebarSpacing)*this.facing), this.y-50, damage, isCritHit)
    this.life -= Math.round(damage)
    if (this.life < 0) {
      this.game.deathSound.play()
      this.alive = false
      this.life = 0
    }
    this.updateLifeBar(true)

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
      critMulti = this.type === 'enemy' ? 2 : 0.2
    }
    effectiveness *= critMulti

    let damageAmount = Math.round(damage * effectiveness)
    let isCritHit = timingAttackTriggered && this.type === 'enemy'

    this.takeDamage(damageAmount, effectiveness, isCritHit)

    let timing = 250
    let dist, angle
    // vary the tween based on how effective the hit was
    if (effectiveness === 0.2) {
      dist = 3
      angle = 2
    } else if (effectiveness === 1) {
      dist = 7
      angle = 5
    } else {
      dist = 10
      angle = 15
    }

    // just defended
    if (this.type === 'player' && timingAttackTriggered) {
      dist = 5
      angle = 2
    } else if (!this.isDefending && effectiveness >= 1){
      this.sprite.animations.play('hit')
      setTimeout(() => {
        this.sprite.animations.play('idle', 1, true)
      }, 500)
    }

    if (isCritHit) {
      let shakeAmount = damageAmount/2
      if (shakeAmount > 40) shakeAmount = 40
      this.game.shake(shakeAmount, 100)
      dist *= 4
      angle *= 2
      this.game.critHitSound.play()
    } else if (effectiveness > 0.2) {
      this.game.hitSound.play()
    } else {
      this.game.blockSound.play()
    }

    attackTween = this.game.add.tween(this.sprite)
      .to({
        x: this.sprite.x - dist * this.facing,
        angle: -angle * this.facing,
      }, timing, ease.Bounce.Out)
      .yoyo(true, timing)

    setTimeout(() => {
      if (this.life === 0) {
        this.kill()
      } else if (!this.isDefending || this.type === 'enemy'){
        this.sprite.animations.play('idle', 1, true)
      }
    }, 500)

    attackTween.start()
  }

  kill() {
    let alpha = this.type === 'enemy' ? 0.2 : 1
    attackTween = this.game.add.tween(this.sprite)
      .to({ alpha }, 800, Phaser.Easing.Quadratic.Out)
    this.stopDefendingOrAssisting && this.stopDefendingOrAssisting()

    this.sprite.animations.play('dead')
    this.alive = false

    this.game.entityManager.checkWinLoseCondition()
    attackTween.onComplete.add(() => {
      if (this.type === 'enemy') {
        this.sprite.alpha = 0
        this.lifeBar.kill()
        this.sprite.animations.play('idle', 1, true)
        this.game.killSound.play()
        this.game.particleManager.burst(
          this.sprite.x, this.sprite.y, 0, 1.5, 1500
        )
      } else {
        pulseTween.stop()
      }
      this.game.entityManager.triggerWinLoseCondition()
    })
    attackTween.start()
  }

  setStats() {
    let modifier = 1
    this.maxLife = baseStats[this.job].hp
    this.power = baseStats[this.job].power
    modifier += (this.game.waveNum-1)/10
    if (this.type === 'enemy') {
      this.maxLife = Math.round(100 * modifier)
      this.power *= modifier
      this.power = Math.round(this.power)
      this.sprite.loadTexture(`${this.type}-${spriteNames[this.job]}`)
      this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1
      this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1
    }
    this.jobName = this.type === 'enemy' ? jobNamesEnemy[this.job] : jobNames[this.job]
    this.life = this.maxLife
  }

  revive(amount = 1) {
    this.alive = true
    this.life = this.maxLife * amount
    this.updateLifeBar()
    this.lifeBar.spawn()
    this.game.reviveSound.play()
  }

  spawn() {
    this.setStats()
    this.sprite.animations.play('idle', 1, true)
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

  updateLifeBar(animate) {
    const hue = 0.3334 - ((this.maxLife - this.life) / (3 * this.maxLife))
    const rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b)
    this.lifeBar.fullAmount = this.maxLife
    this.lifeBar.update(this.life, this.color, animate)
  }

  timingAttackTrigger() {
    if (this.alreadyTriggered) return
    this.alreadyTriggered = true
    if (this.inTimingWindow) {
      this.game.parrySound.play()
      this.timingAttackTriggered = true
    } else {
      this.timingAttackTriggered = false
    }
  }

}
