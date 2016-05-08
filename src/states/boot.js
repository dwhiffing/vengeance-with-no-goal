export default {
  create(game) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.scale.forceOrientation(true)
    this.game.state.start('load', true, false)
  }
}
