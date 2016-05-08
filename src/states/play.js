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
    this.game.music = this.game.add.audio('music', 0.5)
    this.game.music.play()

    this.game.selectSound = game.add.audio('select')
    this.game.confirmSound = game.add.audio('confirm', 0.5)
    this.game.cancelSound = game.add.audio('cancel')

    this.game.blockSound = game.add.audio('block')
    this.game.hitSound = game.add.audio('hit')
    this.game.critHitSound = game.add.audio('crit')

    this.game.healSound = game.add.audio('heal')
    this.game.deathSound = game.add.audio('death')
    this.game.killSound = game.add.audio('kill')

    this.game.reviveSound = game.add.audio('spawn')
    this.game.gameoverSound = game.add.audio('gameover')
    this.game.parrySound = game.add.audio('parry', 0.5)

    this.game.entityManager = new EntityManager(game)
    this.game.textManager = new TextManager(game)
    this.game.ui = new UserInterface(game)
    this.game.particleManager = new ParticleManager(game)

    this.game.entityManager.nextWave()
    this.game.ui.setTarget()
    this.game.ui.hideTarget()
    this.game.ui.allowAction = false

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
