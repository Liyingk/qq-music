export default {
  playMusic(audioEle) {
    if (audioEle.paused) {
      audioEle.play()
    } else {
      audioEle.pause()
    }
  },
  toggleMusic(audioEle) {
    audioEle.load()
    audioEle.play()
  },
  musicSeekTo(audioEle, value) {
    audioEle.currentTime = audioEle.duration * value
  }
}
