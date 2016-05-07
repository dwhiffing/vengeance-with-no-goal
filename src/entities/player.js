import Entity from './entity'

export default class Player extends Entity {
  constructor(game, x, y, job) {
    super(game, x, y, 'player', job, 0xffff00)
  }

  defend() {

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
