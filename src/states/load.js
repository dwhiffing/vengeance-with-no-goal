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
    this.load.image('bg', 'images/bg.png')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);

    this.load.spritesheet('player-axe-idle', 'images/player-melee-idle.png', 200, 200)
    this.load.spritesheet('player-sword-idle', 'images/player-sword-idle.png', 200, 200)
    this.load.spritesheet('player-bow-idle', 'images/player-bow-idle.png', 200, 200)
    this.load.spritesheet('enemy-axe-idle', 'images/enemy-melee-idle.png', 200, 200)
    this.load.spritesheet('enemy-sword-idle', 'images/enemy-sword-idle.png', 200, 200)
    this.load.spritesheet('enemy-bow-idle', 'images/enemy-bow-idle.png', 200, 200)
  },

  onLoadComplete() {
    this.game.state.start('play')
  }
}
