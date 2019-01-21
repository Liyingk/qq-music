export default {
  formatDate(updateTime, duration) {
    let endMin = parseInt(duration / 60)
    let endSec = parseInt(duration % 60)
    let startMin = parseInt(updateTime / 60)
    let startSec = parseInt(updateTime % 60)
    return (
      (startMin < 10 ? '0' + startMin : startMin) +
      ':' +
      (startSec < 10 ? '0' + startSec : startSec) +
      '/' +
      (endMin < 10 ? '0' + endMin : endMin) +
      ':' +
      (endSec < 10 ? '0' + endSec : endSec)
    )
  }
}
