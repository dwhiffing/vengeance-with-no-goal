import UserInterface from '../entities/ui'
import EntityManager from '../entities/EntityManager'

export default {

  create(game) {
    this.game = game
    game.stage.backgroundColor = '#333'

    this.game.entityManager = new EntityManager(game)
    this.game.ui = new UserInterface(game)
  },

  update() {
    this.game.ui.update()
  },
}
