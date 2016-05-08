export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.audio('block', 'audio/block.mp3')
    this.load.audio('cancel', 'audio/cancel.mp3')
    this.load.audio('confirm', 'audio/confirm.mp3')
    this.load.audio('crit', 'audio/crit.mp3')
    this.load.audio('gameover', 'audio/gameover.mp3')
    this.load.audio('heal', 'audio/heal.mp3')
    this.load.audio('hit', 'audio/hit.mp3')
    this.load.audio('parry', 'audio/parry.mp3')
    this.load.audio('select', 'audio/select.mp3')
    this.load.audio('spawn', 'audio/spawn.mp3')
    this.load.audio('death', 'audio/zerohealth.mp3')
    this.load.audio('kill', 'audio/zerohealthexplode.mp3')
    this.load.image('full', 'images/fullscreen.png')

    this.load.audio('music', 'audio/battle-music.ogg')

    this.load.image('bit', 'images/bit.png')
    this.load.image('ball', 'images/ball.png')
    this.load.image('select', 'images/select.png')
    this.load.image('attack-icon', 'images/attack-icon.png')
    this.load.image('counter-icon', 'images/counter-icon.png')
    this.load.image('assist-icon', 'images/assist-icon.png')
    this.load.image('bg', 'images/bg.png')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);

    this.load.spritesheet('player-melee', 'images/player-melee.png', 200, 200)
    this.load.spritesheet('player-sword', 'images/player-sword.png', 200, 200)
    this.load.spritesheet('player-bow', 'images/player-bow.png', 200, 200)
    this.load.spritesheet('enemy-melee', 'images/enemy-melee.png', 200, 200)
    this.load.spritesheet('enemy-sword', 'images/enemy-sword.png', 200, 200)
    this.load.spritesheet('enemy-bow', 'images/enemy-bow.png', 200, 200)
  },

  onLoadComplete() {
    // TODO: make me menu
    this.game.state.start('menu', true, false, { score: 5000})
  }
}
