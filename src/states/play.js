import UserInterface from '../entities/ui'
import EntityManager from '../entities/EntityManager'
import ParticleManager from '../entities/particles'
import TextManager from '../entities/textManager'

export default {

  create(game) {
    this.game = game
    game.stage.backgroundColor = '#333'
    this.game.bg = this.game.add.image(0, 0, 'bg')
    this.game.bg.scale.x = 0.5
    this.game.bg.scale.y = 0.5

    this.game.score = 0

    this.game.entityManager = new EntityManager(game)
    this.game.textManager = new TextManager(game)
    this.game.ui = new UserInterface(game)
    this.game.particleManager = new ParticleManager(game)

    this.game.entityManager.nextWave()
    this.game.ui.setAttackTarget()

    this.game.camera.bounds = null
    this._shakeWorldTime = 0
    this._shakeWorldMax = 20
    this.game.shake = (duration, strength) => {
      this._shakeWorldTime = duration || 20;
      this._shakeWorldMax = strength || 20;
    }
  },

  update() {
    this.game.particleManager.update()
    this.game.textManager.update()

    if(this._shakeWorldTime > 0) {
      var magnitude = (this._shakeWorldTime / this._shakeWorldMax) * this._shakeWorldMax;
      var x = this.game.rnd.integerInRange(-magnitude, magnitude);
      var y = this.game.rnd.integerInRange(-magnitude, magnitude);

      this.game.camera.x = x;
      this.game.camera.y = y;
      this._shakeWorldTime--;
    }
  },
}
