let emitter
export default class ParticleManager {
  constructor(game) {
    emitter = game.add.emitter(0, 0)
    emitter.makeParticles('bit')
    emitter.minParticleScale = 0.2
    emitter.maxParticleScale = 1
    emitter.setRotation(200, 600)
    emitter.setXSpeed(-300, 300)
    emitter.setYSpeed(-400, 100)
    emitter.gravity = 100
  }
  burst(x, y, tint) {
    emitter.x = x
    emitter.y = y
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
