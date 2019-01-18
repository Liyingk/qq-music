<template>
  <div class="page">
    <div class="home-header">
      <h2 class="music-logo">
        <a href="#"></a>
      </h2>
      <ul class="home-register">
        <li>登录</li>
        <li>设置</li>
      </ul>
    </div>
    <div class="home-content">
      <div class="home-content-center">
        <div class="home-content-left">
          <div class="content-left-toolbar">
            <span v-for="toolbarLists in toolbarList" :key="toolbarLists.barId">
              <i :style="toolbarLists.iconPositon"></i>
              {{toolbarLists.barName}}
            </span>
          </div>

          <div class="content-left-list">
            <vue-scroll :ops="ops">
              <div class="music-list-tab">
                <div class="list-check">
                  <i></i>
                </div>
                <div class="list-number"></div>
                <div class="list-name">歌曲</div>
                <div class="list-singer">歌手</div>
                <div class="list-time">时长</div>
              </div>
              <div
                class="music-list"
                @mouseover="showMenu(index)"
                @mouseout="closeMenu(index)"
                v-for="(musicLists, index) in musicList"
                :key="index"
              >
                <div
                  class="list-check"
                  @click="toToggleClass($event,'list-check','list-check list-checked')"
                >
                  <i></i>
                </div>
                <div class="list-number">{{index+1}}</div>
                <div class="list-name">
                  {{musicLists.name}}
                  <div class="list-menu" v-show="!(musicLists.menuShow)">
                    <a
                      href="javascript:;"
                      class="list-menu-pause"
                      title="播放"
                      @click="clickListMenuPlay(index)"
                    ></a>
                    <a href="javascript:;" class="list-menu-add" title="添加"></a>
                    <a href="javascript:;" class="list-menu-onload" title="下载"></a>
                    <a href="javascript:;" class="list-menu-share" title="分享"></a>
                  </div>
                </div>
                <div class="list-singer">{{musicLists.singer}}</div>
                <div class="list-time">
                  <span v-show="musicLists.menuShow">{{musicLists.time}}</span>
                  <a
                    title="删除"
                    href="javascript:;"
                    v-show="!(musicLists.menuShow)"
                    @click="deleteMusicList(index)"
                  ></a>
                </div>
              </div>
            </vue-scroll>
          </div>
        </div>
        <div class="home-content-right">
          <div class="song-info">
            <a href="javascript:;" class="song-info-pic">
              <img :src="cover" alt>
            </a>
            <div class="song-info-name">
              歌曲名称：
              <a href="javascript:;">{{name}}</a>
            </div>
            <div class="song-info-singer">
              歌手名：
              <a href="javascript:;">{{singer}}</a>
            </div>
            <div class="song-info-name">
              专辑名：
              <a href="javascript:;">{{album}}</a>
            </div>
          </div>
          <div class="song-lyric">
            <div class="cur">第一条歌词</div>
            <div>第二条歌词</div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <div class="home-footer-center">
        <a href="javascript:;" class="music-previous" @click="clickPreviousOrNext(0)"></a>
        <a href="javascript:;" class="music-pause" @click="clickTotalPlay()"></a>
        <a href="javascript:;" class="music-next" @click="clickPreviousOrNext(1)"></a>
        <div class="music-progress-info">
          <div class="music-progress-text">
            <span class="music-text-name">{{name +' / '+ singer}}</span>
            <span class="music-text-time">00:00 / {{time}}</span>
          </div>
          <div
            class="music-progress-bar bar"
            @click="changeProgress($event,'.music-progress-bar','.music-progress-line','.music-progress-dot')"
          >
            <div class="music-progress-line line">
              <div class="music-progress-dot dot"></div>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="music-mode"></a>
        <a href="javascript:;" class="music-like"></a>
        <a href="javascript:;" class="music-down"></a>
        <a href="javascript:;" class="music-comment"></a>
        <a href="javascript:;" class="music-only"></a>
        <div class="music-voice-info">
          <a href="javascript:;" class="music-voice-icon"></a>
          <div
            class="music-voice-bar bar"
            @click="changeProgress($event,'.music-voice-bar','.music-voice-line','.music-voice-dot')"
          >
            <div class="music-voice-line line">
              <div class="music-voice-dot dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-bg" :style="{background: 'url('+ cover +') no-repeat'}"></div>
    <div class="mask"></div>
    <audio>
      <source :src="linkUrl" type="audio/mpeg">您的浏览器不支持audio元素
    </audio>
  </div>
</template>
<script>
import toolbarList from '../data/toolbarList.js'
import musicList from '../data/musicList.js'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
export default {
  data() {
    return {
      ops: {
        bar: {
          background: '#333'
        }
      },
      toolbarList,
      musicList,
      musicListIndex: -1,
      musicPauseStatus: 0,
      name: '告白气球',
      singer: '周杰伦',
      album: '周杰伦的床边故事',
      time: '03:35',
      linkUrl: '/static/source/ConfessionBalloon.mp3',
      cover: '/static/source/ConfessionBalloon.jpg',
      link_lrc: '/static/source/ConfessionBalloon.txt'
    }
  },
  methods: {
    showMenu(index) {
      this.$set(this.musicList[index], `menuShow`, false)
    },
    closeMenu(index) {
      this.$set(this.musicList[index], `menuShow`, true)
    },
    toToggleClass(e, checkClassName, className) {
      this.toggleClass(e.currentTarget, checkClassName, className)
    },
    toggleClass(e, checkClassName, className) {
      if (e.className === checkClassName) {
        e.className = className
      } else {
        e.className = checkClassName
      }
    },
    togglePlayClass(index) {
      const numberIcon = document.querySelectorAll('.list-number')[index + 1]
      this.toggleClass(numberIcon, 'list-number', 'list-number list-numbered')
      const textHightLight = document.querySelectorAll('.music-list')[index]
      this.toggleClass(
        textHightLight,
        'music-list',
        'music-list music-list-heightlight'
      )
      const ListPause = document.querySelectorAll('.list-menu-pause')[index]
      this.toggleClass(
        ListPause,
        'list-menu-pause',
        'list-menu-pause list-menu-play'
      )
    },
    exclusiveMusicList() {
      const musicListMenu = document.querySelectorAll('.list-menu-pause')
      musicListMenu.forEach(item => {
        item.className = 'list-menu-pause'
        item.parentElement.parentElement.parentElement.children[1].className =
          'list-number'
        item.parentElement.parentElement.parentElement.className = 'music-list'
      })
    },
    checkAllMenuStatus(index) {
      if (
        document.querySelectorAll('.list-menu-pause')[index].className ===
        'list-menu-pause list-menu-play'
      ) {
        const musicPause = document.querySelector('.music-pause')
        musicPause.className = 'music-pause music-play'
      } else {
        const musicPause = document.querySelector('.music-pause')
        musicPause.className = 'music-pause'
      }
    },
    playMusic() {
      const audioEle = document.querySelector('audio')
      if (audioEle.paused) {
        audioEle.play()
      } else {
        audioEle.pause()
      }
    },
    toggleMusic(index) {
      const audioEle = document.querySelector('audio')
      this.name = this.musicList[index].name
      this.singer = this.musicList[index].singer
      this.album = this.musicList[index].album
      this.time = this.musicList[index].time
      this.cover = this.musicList[index].cover
      this.linkUrl = this.musicList[index].link_url
      this.link_lrc = this.musicList[index].link_lrc
      audioEle.load()
      audioEle.play()
    },
    clickListMenuPlay(index) {
      if (this.musicListIndex === index) {
        this.playMusic()
      } else {
        this.exclusiveMusicList()
        this.toggleMusic(index)
      }
      this.togglePlayClass(index)
      this.checkAllMenuStatus(index)
      this.musicListIndex = index
    },
    clickTotalPlay(index) {
      if (this.musicListIndex === -1) this.musicListIndex = 0
      this.clickListMenuPlay(this.musicListIndex)
    },
    clickPreviousOrNext(value) {
      let index
      if (value === 0) {
        console.log(musicList[musicList.length - 1])
        if (this.musicListIndex === 0) {
          index = musicList.length - 1
        } else {
          index = this.musicListIndex - 1
        }
      } else {
        if (this.musicListIndex === musicList.length - 1) {
          index = 0
        } else {
          index = this.musicListIndex + 1
        }
      }
      this.exclusiveMusicList()
      this.clickListMenuPlay(index)
    },
    deleteMusicList(index) {
      this.musicList.splice(index, 1)
      if (this.musicListIndex === index) {
        if (index >= musicList.length) {
          index = 0
          this.clickListMenuPlay(index)
        }
        this.toggleMusic(index)
      } else if (this.musicListIndex > index) {
        let musicListIndexs = this.musicListIndex - 1
        this.exclusiveMusicList()
        this.togglePlayClass(musicListIndexs)
        this.musicListIndex = musicListIndexs
      }
    },
    changeProgress(e, pros, lines, dots) {
      alert('点击')
      const pro = document.querySelector(pros)
      const line = document.querySelector(lines)
      const dot = document.querySelector(dots)
      let proLeft = pro.offsetLeft
      let eLeft = e.pageX
      line.style.width = eLeft - proLeft + 'px'
      dot.style.left = eLeft - proLeft + 'px'
    }
  },
  components: {
    vuescroll
  }
}
</script>
