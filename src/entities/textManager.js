let textObj, scoreText, targetScore, waveText
let style = {
  font: "18px Arial",
  fill: "#fff",
  boundsAlignH: "center",
  boundsAlignV: "middle",
}

let messages = {
  attack: 'Pick a target enemy to attack, hit again on impact for critical',
  defend: 'Enter defense mode, swapping your strengths and weaknesses',
  heal: 'Restore a target ally\'s health',
  boost: 'Counter for target ally if they are attacked this round',
  protect: 'Protect a target ally from any attack this round',
}

let tween, tween2

export default class TextManager {
  constructor(game) {
    this.game = game
    let y = game.height - 30

    targetScore = 0

    scoreText = game.add.text(this.game.width - 160, 5, 'score: 0', style)
    waveText = game.add.text(this.game.width - 160, 30, 'wave: 0', style)

    textObj = game.add.text(0, y, '', style)
    textObj.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
    textObj.setTextBounds(0, 10, game.width, 10)

    game.fullscreenButton = game.add.button(game.width-40, 10, 'full', () => {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen()
      } else {
        game.scale.startFullScreen(false)
      }
    })
    game.fullscreenButton.width = 30
    game.fullscreenButton.height = 32
  }

  addScore(score) {
    targetScore += score
  }

  updateWave(amount) {
    waveText.text = `wave: ${amount}`
  }

  update() {
    if (this.game.score < targetScore) {
      this.game.score++
    }
    scoreText.text = `score: ${this.game.score}`
  }

  display(val) {
    tween = this.game.add.tween(textObj)
      .to({ alpha: 0 }, 100)
    tween.onComplete.add(() => {
      tween2 = this.game.add.tween(textObj)
        .to({ alpha: 1 }, 100)
        .start()
      if (val in messages) {
        val = messages[val]
      }
      textObj.text = val
    })
    tween.start()
  }
  floatText(x, y, val, crit, color='#fff') {
    let fontSize = val
    if (fontSize < 15) fontSize = 15
    if (fontSize > 40) fontSize = 40
    let bold = ''
    if (crit) {
      bold = 'bold '
      fontSize*=1.5
    }
    fontSize = Math.round(fontSize)

    let floatText = this.game.add.text(x, y, val, {
      font: bold+fontSize+'px Arial',
      fill: color,
      boundsAlignH: "center",
      boundsAlignV: "middle"
    })
    floatText.setShadow(1, 1, 'rgba(0,0,0,1)', 0)

    tween = this.game.add.tween(floatText)
      .to({ y: y - 100, alpha: 0 }, 2000)
    tween.onComplete.add(() => {
      floatText.kill()
    })
    tween.start()
  }
  clear() {
    this.display('')
  }
}
