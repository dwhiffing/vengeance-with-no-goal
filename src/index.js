import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'


(function() {
  let game = new Phaser.Game(773, 435, Phaser.AUTO, 'app')

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()