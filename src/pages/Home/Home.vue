<style lang="scss" scoped>
.home-page {
  display: block;
  .screen-container {
    width: 200vw;
    height: 100%;
    display: flex;
    transform: translateX(0vw);
    transition: all 0.4s;
    &.active {
      transform: translateX(-100vw);
    }
    .screen {
      display: inline-block;
      width: 100vw;
      height: 100%;
      position: relative;

      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="page home-page" :class="{'pink-theme':theme,'grey-theme':!theme}">
    <div class="screen-container" :class="{active:active}">
      <div class="screen">
        <InitView @setting="theme=!theme" @start="active=true"/>
      </div>
      <div class="screen">
        <FinishView v-if="active" @close="active=false"/>
      </div>
    </div>
  </div>
</template>

<script>
import FinishView from './FinishView'
import InitView from './InitView'

export default {
  components: {
    FinishView,
    InitView
  },
  data() {
    return {
      Scene: {
        init: 'Init',
        finish: 'FinishView'
      },
      active: false,
      theme: false
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一起来运动',
      path: '/pages/Home/Home?id=123'
    }
  },
  methods: {
    test() {
      const audio = uni.createInnerAudioContext()
      audio.src = '/static/audio/success.mp3'
      audio.play()
      audio.onEnded(audio.destroy)

      wx.showShareMenu()
    },
    enterScreen() {
      enterScreenCb()
    }
  }
}
</script>
