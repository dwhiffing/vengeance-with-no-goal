import LifeBar from '../entities/bar'
import Entity from '../entities/entity'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000'
    this.player = new Entity(game, game.width/2-50, game.height/2)
    this.enemy = new Entity(game, game.width/2+50, game.height/2, 0xff0000)
    setTimeout(() => {
      setInterval(() => {
        this.enemy.attack(this.player)
      }, 1000)
    }, 500)
    setInterval(() => {
      this.player.attack(this.enemy)
    }, 1000)
  }
}
