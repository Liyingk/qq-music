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
                      @click="clickListMenuPlay($event,index)"
                    ></a>
                    <a href="javascript:;" class="list-menu-add" title="添加"></a>
                    <a href="javascript:;" class="list-menu-onload" title="下载"></a>
                    <a href="javascript:;" class="list-menu-share" title="分享"></a>
                  </div>
                </div>
                <div class="list-singer">{{musicLists.singer}}</div>
                <div class="list-time">
                  <span v-show="musicLists.menuShow">{{musicLists.time}}</span>
                  <a title="删除" href="javascript:;" v-show="!(musicLists.menuShow)"></a>
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
              <a href="javascript:;">忆江南</a>
            </div>
            <div class="song-info-singer">
              歌手名：
              <a href="javascript:;">李江南</a>
            </div>
            <div class="song-info-name">
              专辑名：
              <a href="javascript:;">江南系列</a>
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
        <a href="javascript:;" class="music-previous"></a>
        <a href="javascript:;" class="music-pause" @click="clickTotalPlay()"></a>
        <a href="javascript:;" class="music-next"></a>
        <div class="music-progress-info">
          <div class="music-progress-text">
            <span class="music-text-name">某某某 / 某某某</span>
            <span class="music-text-time">02:20 / 03:30</span>
          </div>
          <div class="music-progress-bar bar">
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
          <div class="music-voice-bar bar">
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
      linkUrl: '/static/source/ConfessionBalloon.mp3',
      cover: '/static/source/ConfessionBalloon.jpg'
    }
  },
  methods: {
    showMenu(index) {
      this.$set(this.musicList[index], `menuShow`, false)
    },
    closeMenu(index) {
      this.$set(this.musicList[index], `menuShow`, true)
    },
    toggleClass(e, checkClassName, className) {
      if (e.className === checkClassName) {
        e.className = className
      } else {
        e.className = checkClassName
      }
    },
    toToggleClass(e, checkClassName, className) {
      this.toggleClass(e.currentTarget, checkClassName, className)
    },
    toggleNumberClass(e) {
      const numberIcon =
        e.currentTarget.parentElement.parentElement.parentElement.children[1]
      this.toggleClass(numberIcon, 'list-number', 'list-number list-numbered')
    },
    toggleHightLightClass(e) {
      const textHightLight =
        e.currentTarget.parentElement.parentElement.parentElement
      this.toggleClass(
        textHightLight,
        'music-list',
        'music-list music-list-heightlight'
      )
    },
    toggleMusicPauseClass() {
      const musicPause = document.querySelector('.music-pause')
      this.toggleClass(musicPause, 'music-pause', 'music-pause music-play')
      if (this.musicPauseStatus === 0) {
        this.musicPauseStatus = 1
      } else {
        this.musicPauseStatus = 0
      }
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
    checkAllMenuStatus(e) {
      if (e.currentTarget.className === 'list-menu-pause list-menu-play') {
        const musicPause = document.querySelector('.music-pause')
        musicPause.className = 'music-pause music-play'
      } else {
        const musicPause = document.querySelector('.music-pause')
        musicPause.className = 'music-pause'
      }
    },
    clickListMenuPlay(e, index) {
      this.cover = musicList[index].cover
      this.linkUrl = musicList[index].link_url
      const audioEle = document.querySelector('audio')

      if (this.musicListIndex === index) {
        this.toToggleClass(
          e,
          'list-menu-pause',
          'list-menu-pause list-menu-play'
        )
        this.toggleNumberClass(e)
        this.checkAllMenuStatus(e)
        if (audioEle.paused) {
          audioEle.play()
        } else {
          audioEle.pause()
        }
      } else {
        this.exclusiveMusicList()
        this.toToggleClass(
          e,
          'list-menu-pause',
          'list-menu-pause list-menu-play'
        )
        this.toggleNumberClass(e)
        this.toggleHightLightClass(e)
        this.checkAllMenuStatus(e)
        audioEle.load()
        audioEle.play()
      }
      this.musicListIndex = index
    },
    clickTotalPlay(index) {
      if (this.musicListIndex === -1) {
        this.musicListIndex = 0
        this.toggleMusicPauseClass()
        this.toggleClass()
      } else {
        if (this.musicPauseStatus === 0) {
          this.toggleMusicPauseClass()
        } else {
          this.toggleMusicPauseClass()
        }
      }
    }
  },
  components: {
    vuescroll
  }
}
</script>
