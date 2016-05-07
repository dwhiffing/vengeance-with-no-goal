let emitter
export default class ParticleManager {
  constructor(game) {
    emitter = game.add.emitter(0, 0)
    emitter.makeParticles('bit')
    emitter.minParticleScale = 0.2
    emitter.maxParticleScale = 0.7
    emitter.setRotation(200, 600)
    emitter.setYSpeed(-300, -100)
    emitter.gravity = 500
  }
  burst(x, y, tint, direction=1) {
    emitter.x = x
    emitter.y = y
    if (direction === 0) {
      emitter.setXSpeed(-200, 200)
    } else {
      emitter.setXSpeed(-100 * direction, -400 * direction)
    }
    emitter.forEach(particle => {
      particle.tint = tint
    })

    emitter.start(true, 800, null, 15)
  }
  update() {
    emitter.forEachAlive((p) => {
      p.alpha = p.lifespan / emitter.lifespan
    })
  }
}
