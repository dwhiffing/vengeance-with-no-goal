let getStyle = (size, bold) => {
  return {
    font: `${bold ? 'bold ' : ''}${size}px Arial`,
    fill: "#fff"
  }
}

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    let x = this.game.world.centerX
    let y = this.game.world.centerY
    let titleText = game.add.text(x, 50, "Trust the Invaders", getStyle(42, true))
    let twins = game.add.text(x, 120, "Art", getStyle(28, true))
    let twins2 = game.add.text(x, 150, "Steph & Sam Braithwaite", getStyle(18))
    let daniel = game.add.text(x, 200, "Coding", getStyle(28, true))
    let daniel2 = game.add.text(x, 230, "Daniel Whiffing", getStyle(18))
    let john = game.add.text(x, 280, "Music", getStyle(28, true))
    let john2 = game.add.text(x, 310, "John Hagley", getStyle(18))
    let startText = game.add.text(x, this.game.height - 40, "Back to menu", getStyle(16))

    titleText.anchor.setTo(0.5)
    daniel.anchor.setTo(0.5)
    daniel2.anchor.setTo(0.5)
    twins.anchor.setTo(0.5)
    twins2.anchor.setTo(0.5)
    john.anchor.setTo(0.5)
    john2.anchor.setTo(0.5)
    startText.anchor.setTo(0.5)

    game.input.onDown.add(() => {
      game.state.start('menu', true, false)
    })
  },
}
