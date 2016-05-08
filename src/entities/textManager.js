let textObj, floatText, scoreText, targetScore, waveText
let style = {
  font: "18px Arial",
  fill: "#fff",
  boundsAlignH: "center",
  boundsAlignV: "middle",
}

let messages = {
  attack: 'attack a targetted enemy',
  defend: 'enter defensive posture, swapping your strengths and weaknesses',
  heal: 'restore a targetted ally\'s health',
  boost: 'attack with an ally to boost their effectiveness',
  protect: 'protect a targetted ally from any attack',
}

let tween, tween2

export default class TextManager {
  constructor(game) {
    this.game = game
    let y = game.height - 40

    targetScore = 0

    scoreText = game.add.text(this.game.width - 130, 20, 'score: 0', style)
    waveText = game.add.text(this.game.width - 130, 50, 'wave: 0', style)
    floatText = game.add.text(0, y, '', style)
    floatText.setShadow(1, 1, 'rgba(0,0,0,1)', 1)

    textObj = game.add.text(0, y, '', style)
    // textObj.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
    textObj.setTextBounds(0, 10, game.width, 10)
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
  floatText(x, y, val, crit) {
    let fontSize = val
    if (fontSize < 20) fontSize = 20
    if (crit) {
      floatText.fontWeight = 'bold'
      fontSize*=1.5
    }
    Math.round(fontSize)

    floatText.fontSize = fontSize
    floatText.text = val
    floatText.alpha = 1
    floatText.x = x
    floatText.y = y
    tween = this.game.add.tween(floatText)
      .to({ y: y - 50, alpha: 0 }, 1000)
      .start()
  }
  clear() {
    this.display('')
  }
}
