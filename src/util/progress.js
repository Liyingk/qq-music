import player from '../util/player'
class Progress {
  constructor() {
    this.isMove = false
  }
  clickProgress(e, pros, lines, dots) {
    const pro = document.querySelector(pros)
    const line = document.querySelector(lines)
    const dot = document.querySelector(dots)
    let proLeft = pro.offsetLeft
    let eLeft = e.pageX
    line.style.width = eLeft - proLeft + 'px'
    dot.style.left = eLeft - proLeft + 'px'
    return (eLeft - proLeft) / pros.offsetWidth
  }
  mouseMoveProgress(e, pros, lines, dots) {
    const pro = document.querySelector(pros)
    const line = document.querySelector(lines)
    const dot = document.querySelector(dots)
    document.onmousemove = function(e) {
      this.isMove = true
      const proLeft = pro.offsetLeft
      const eLeft = e.clientX
      let changeLeft = ((eLeft - proLeft) / pro.offsetWidth) * 100
      if (changeLeft < 0) {
        changeLeft = 0
      } else if (changeLeft > 100) {
        changeLeft = 100
      }
      line.style.width = changeLeft + '%'
      dot.style.left = changeLeft + '%'
    }
    document.onmouseup = function(e) {
      player.musicSeekTo(
        document.querySelector('audio'),
        line.offsetWidth / pro.offsetWidth
      )
      document.onmousemove = null
      this.isMove = false
    }
  }
  setProgress(progressWidth, lines, dots) {
    const line = document.querySelector(lines)
    const dot = document.querySelector(dots)
    if (this.isMove) return
    if (progressWidth < 0 || progressWidth > 100) return
    line.style.width = progressWidth + '%'
    dot.style.left = progressWidth + '%'
  }
  getProgress(pros, lines) {
    const pro = document.querySelector(pros)
    const line = document.querySelector(lines)
    return line.offsetWidth / pro.offsetWidth
  }
}
export default new Progress()
