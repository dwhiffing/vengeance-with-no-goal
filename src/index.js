import BootState from './states/boot'
import LoadState from './states/load'
import MenuState from './states/menu'
import GameOverState from './states/gameover'
import CreditsState from './states/credits'
import PlayState from './states/play'


(function() {
  let game = new Phaser.Game(773, 435, Phaser.AUTO, 'app')

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('play', PlayState)
  game.state.add('menu', MenuState)
  game.state.add('gameover', GameOverState)
  game.state.add('credits', CreditsState)
  game.state.start('boot')
})()
