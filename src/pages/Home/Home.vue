<style lang="scss" scoped>
.home-page {
  display: block;
  overflow: hidden;
  .screen-container {
    width: 200vw;
    height: 200vh;
    overflow: hidden;
    display: flex;
    transform: translateX(0vw);
    transition: all 0.4s;
    &.active {
      transform: translateX(-100vw);
    }
  }
  .screen {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
}
</style>

<template>
  <div class="page home-page" :class="{'pink-theme':theme,'grey-theme':!theme}">
    <!-- <div class="screen-container" :class="{active:active}"></div> -->
    <SceneContainer>
      <SceneWrap>
        <InitView @setting="theme=!theme" @start="active=true"/>
      </SceneWrap>
      <SceneWrap>
        <FinishView v-if="active" @close="active=false"/>
      </SceneWrap>
    </SceneContainer>
  </div>
</template>

<script>
import FinishView from './Views/FinishView'
import InitView from './Views/InitView'
import SceneWrap from './Views/SceneWrap'
import SceneContainer from './Views/SceneContainer'

export default {
  components: {
    FinishView,
    InitView,
    SceneWrap,
    SceneContainer
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
    },
    viewScene(direction) {
      // let old={0,0},
      // new=[100vw,0]
      // done,
      // new =00
    }
  }
}
</script>
