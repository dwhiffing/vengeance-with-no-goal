let burstEmitter, blockEmitter
export default class ParticleManager {
  constructor(game) {
    this.game = game

    burstEmitter = game.add.emitter(0, 0)
    burstEmitter.makeParticles('bit')
    burstEmitter.setRotation(200, 600)
    burstEmitter.gravity = 350
    burstEmitter.forEach(particle => {
      particle.tint = 0xff0000
    })

    blockEmitter = game.add.emitter(0, 0)
    blockEmitter.makeParticles('bit')
    blockEmitter.setRotation(200, 600)
    blockEmitter.gravity = 350
    blockEmitter.forEach(particle => {
      particle.tint = 0x999999
    })
  }
  burst(x, y, direction=1, amount, lifespan, addScore) {
    this.doBurst(burstEmitter, x, y, direction, amount, lifespan, addScore)
  }
  block(x, y, direction=1, amount, lifespan, addScore) {
    this.doBurst(blockEmitter, x, y, direction, amount, lifespan, addScore)
  }
  doBurst(emitter, x, y, direction, amount, lifespan=700, addScore) {
    emitter.x = x
    emitter.y = y

    emitter.minParticleScale = 0.1 * amount
    emitter.maxParticleScale = 0.4 * amount

    if (emitter.minParticleScale < 0.2) {
      emitter.minParticleScale = 0.2
    }
    if (emitter.maxParticleScale > 0.5) {
      emitter.maxParticleScale = 0.5
    }

    let num = Math.floor(10 * amount)
    let speed = 180 * amount

    if (direction === 0) {
      emitter.setXSpeed(-speed, speed)
    } else {
      emitter.setXSpeed((-speed/2) * direction, (-speed*2) * direction)
    }

    emitter.setYSpeed(-speed*0.5, -speed*1.3)
    emitter.start(true, lifespan, null, num)

    if (addScore) {
      setTimeout(() => {
        this.game.textManager.addScore(num)
      }, lifespan)
    }
  }
  update() {
    burstEmitter.forEachAlive((p) => {
      p.alpha = p.lifespan / burstEmitter.lifespan
    })
    blockEmitter.forEachAlive((p) => {
      p.alpha = p.lifespan / blockEmitter.lifespan
    })
  }
}
