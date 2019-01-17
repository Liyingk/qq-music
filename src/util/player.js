import musicList from '../data/musicList'
class Player {
  constructor(index, audio) {
    this.index = index
    this.musicList = musicList
    this.audio = audio
  }
  playMusic() {}
  pauseMusic() {}
  toggleMusic() {}
}
export default new Player()
