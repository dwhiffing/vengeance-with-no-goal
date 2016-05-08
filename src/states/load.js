export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.audio('hit1', 'audio/hit.mp3')
    this.load.audio('hit2', 'audio/hit2.mp3')
    this.load.audio('hit3', 'audio/hit3.mp3')
    this.load.audio('comboend', 'audio/comboend.mp3')
    this.load.audio('hitball', 'audio/hitball.mp3')
    this.load.audio('dead', 'audio/dead.mp3')

    this.load.image('bit', 'images/bit.png')
    this.load.image('ball', 'images/ball.png')
    this.load.image('select', 'images/select.png')
    this.load.image('attack-icon', 'images/attack-icon.png')
    this.load.image('counter-icon', 'images/counter-icon.png')
    this.load.image('assist-icon', 'images/assist-icon.png')
    this.load.image('bg', 'images/bg.jpg')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);

    this.load.spritesheet('player-melee', 'images/player-melee.png', 200, 200)
    this.load.spritesheet('player-sword', 'images/player-sword.png', 200, 200)
    this.load.spritesheet('player-bow', 'images/player-bow.png', 200, 200)
    this.load.spritesheet('enemy-melee', 'images/enemy-melee.png', 200, 200)
    this.load.spritesheet('enemy-sword', 'images/enemy-sword.png', 200, 200)
    this.load.spritesheet('enemy-bow', 'images/enemy-bow.png', 200, 200)
  },

  onLoadComplete() {
    this.game.state.start('play')
  }
}
