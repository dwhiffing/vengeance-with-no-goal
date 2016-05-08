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
    let opts = { x: this.x, y: this.y }
    if (this.isDefending || this.isAssisting) {

      this.isDefending = false
      this.isAssisting = false
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

  reset() {
    this.stopDefendingOrAssisting()
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
      this.isAssisting = true
      this.assistTarget = target
      this.sprite.animations.play('defend')
      this.sprite.z = 10

      defenseTween = this.game.add.tween(this.sprite)
        .to({
          y: target.sprite.y,
          x: target.sprite.x + 100
        }, 200)
        .start()
    } else if (action === 'protect') {
      this.isAssisting = true
      this.isDefending = true
      this.assistTarget = target
      this.sprite.animations.play('defend')
      this.sprite.z = 10

      defenseTween = this.game.add.tween(this.sprite)
        .to({
          y: target.sprite.y,
          x: target.sprite.x + 100
        }, 200)
        .start()
    }
    setTimeout(() => {
      this.game.entityManager.group.sort('z', Phaser.Group.SORT_ASCENDING)
    }, 20)
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
