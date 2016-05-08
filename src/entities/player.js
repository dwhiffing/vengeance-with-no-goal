import Entity from './entity'

let defenseTween, tintTween

export default class Player extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'player', job)
  }

  defend(callback) {
    this.isDefending = true
    this.sprite.animations.play('defend')
    callback()
  }

  stopDefendingOrAssisting() {
    let opts = { x: this.x, y: this.y }
    if (this.isDefending || this.isAssisting || this.isAssisted) {

      this.isDefending = false
      this.isAssisting = false
      this.isAssisted = false
      this.sprite.tint = 0xffffff
      this.sprite.animations.play('idle')
      this.game.players[0].sprite.z = 0
      this.game.players[1].sprite.z = 1
      this.game.players[2].sprite.z = 2
      this.game.entityManager.group.sort('z', Phaser.Group.SORT_ASCENDING)
      defenseTween = this.game.add.tween(this.sprite)
        .to(opts, 200)
        .start()
    }
  }

  reset(revive) {
    this.stopDefendingOrAssisting()
    if (revive && !this.alive) {
      this.revive(0.25)
    }
  }

  revive(amount) {
    super.revive(amount)
    this.idle()
  }

  pickPlayer(target, action, callback) {
    if (action === 'heal') {
      // needs animation for healing
      defenseTween = this.game.add.tween(this.sprite.scale)
        .to({ x: 0.85, y: 1.5 }, 250)
        .yoyo(true)
      this.sprite.tint = 0x9999ff
      setTimeout(() => this.sprite.tint = 0xffffff, 500)
      defenseTween.onComplete.add(() => {
        target.heal(0.5)
        callback()
      })
      defenseTween.start()
    } else if (action === 'boost') {
      this.isAssisting = true
      this.assistTarget = target
      this.sprite.animations.play('defend')
      this.sprite.z = 10
      this.sprite.tint = 0x9999ff

      defenseTween = this.game.add.tween(this.sprite)
        .to({
          y: target.sprite.y,
          x: target.sprite.x + 100
        }, 200)
        defenseTween.onComplete.add(callback)
        defenseTween.start()
    } else if (action === 'protect') {
      this.isAssisting = true
      this.isDefending = true
      target.isAssisted = true
      this.assistTarget = target
      this.sprite.animations.play('defend')
      this.sprite.z = 10
      this.sprite.tint = 0x9999ff

      defenseTween = this.game.add.tween(this.sprite)
        .to({
          y: target.sprite.y,
          x: target.sprite.x + 100
        }, 200)
      defenseTween.onComplete.add(callback)
      defenseTween.start()
    }
    setTimeout(() => {
      this.game.entityManager.group.sort('z', Phaser.Group.SORT_ASCENDING)
    }, 20)
  }

  heal(value=0.25, animate=true) {
    if (this.life === this.maxLife || !this.alive) return
    let amount = this.maxLife * value
    this.life += amount
    if (this.life > this.maxLife) {
      this.life = this.maxLife
    }
    this.updateLifeBar(true)

    this.game.textManager.floatText(this.sprite.x-((50+this.lifebarSpacing)*this.facing), this.y-50, amount, false, '#0f0')

    let lastTint = this.sprite.tint
    this.game.healSound.play()
    if (animate) {
      defenseTween = this.game.add.tween(this.sprite.scale)
      .to({ x: 0.5, y: 1.5 }, 250)
      .yoyo(true)
      defenseTween.start()
    }
    this.sprite.tint = 0x00ff00
    setTimeout(() => this.sprite.tint = lastTint, 500)
  }
}
