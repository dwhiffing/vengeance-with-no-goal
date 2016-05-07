import UserInterface from '../entities/ui'
import EntityManager from '../entities/EntityManager'
import ParticleManager from '../entities/particles'
import TextManager from '../entities/textManager'

export default {

  create(game) {
    this.game = game
    game.stage.backgroundColor = '#333'

    this.game.entityManager = new EntityManager(game)
    this.game.textManager = new TextManager(game)
    this.game.ui = new UserInterface(game)
    this.game.particleManager = new ParticleManager(game)
  },

  update() {
    this.game.ui.update()
    this.game.particleManager.update()
  },
}
