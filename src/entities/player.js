import Entity from './entity'

let defenseTween

export default class Player extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'player', job, 0xffff00)
  }

  defend(callback) {
    this.isDefending = true
    defenseTween = this.game.add.tween(this.sprite.scale)
      .to({
        y: 0.5,
      }, 200)
    defenseTween.start()
    callback()
  }

  stopDefending() {
    this.isDefending = false
    defenseTween = this.game.add.tween(this.sprite.scale)
      .to({ y: 1 }, 200)
    defenseTween.start()
  }

  relic() {
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
