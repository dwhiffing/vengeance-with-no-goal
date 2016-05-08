import Entity from './entity'

let defenseTween

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
    let opts = {}
    if (this.isDefending) {
      this.isDefending = false
      opts = { y: 1}
    } else if (this.isAssisting) {
      opts = { x: 1}
      this.isAssisting = false
    }
    defenseTween = this.game.add.tween(this.sprite.scale)
      .to(opts, 200)
      .start()
  }

  pickPlayer(target, action, callback) {

    if (action === 'heal') {
      // needs animation for healing
      defenseTween = this.game.add.tween(this.sprite.scale)
        .to({ x: 0.85 }, 200)
        .yoyo(true)
      defenseTween.onComplete.add(() => {
        target.heal(this.game.rnd.integerInRange(20, 30))
      })
      defenseTween.start()
    } else if (action === 'boost') {
      this.assisting = true
      this.sprite.animations.play('defend')
      // defenseTween = this.game.add.tween(this.sprite.scale)
      //   .to({ x: 0.85 }, 200)
      //   .start()
    } else if (action === 'protect') {
      this.isAssisting = true
      this.sprite.animations.play('defend')
      // defenseTween = this.game.add.tween(this.sprite.scale)
      //   .to({ x: 0.85 }, 200)
      //   .start()
    }
    callback()
  }

  heal(value) {
    this.life += this.maxLife * (value/100)
    if (this.life > this.maxLife) {
      this.life = this.maxLife
    }
    this.updateLifeBar()
    defenseTween = this.game.add.tween(this.sprite.scale)
      .to({ x: 0.5 }, 200)
      .yoyo(true)
    defenseTween.start()
  }
}
