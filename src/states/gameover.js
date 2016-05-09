let getStyle = (size, bold) => {
  return {
    font: `${bold ? 'bold ' : ''}${size}px Arial`,
    fill: "#fff"
  }
}
let score = 0
let spaceKey

export default {
  init(args={}) {
    score = args.score || 0
  },
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'

    let x = this.game.world.centerX
    let y = this.game.world.centerY
    let titleText = game.add.text(x, 80, "Game Over", getStyle(48, true))
    let scoreText = game.add.text(x, 200, "Final Score:", getStyle(34, true))
    let scoreText2 = game.add.text(x, 250, score.toString(), getStyle(28))
    let startText = game.add.text(x, this.game.height - 80, "Try again", getStyle(32))

    titleText.anchor.setTo(0.5)
    scoreText.anchor.setTo(0.5)
    scoreText2.anchor.setTo(0.5)
    startText.anchor.setTo(0.5)

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    let start = () => {
      game.state.start('menu', true, false)
    }
    spaceKey.onDown.add(start)
    game.input.onDown.add(start)
  },
}
