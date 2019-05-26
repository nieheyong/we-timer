<style lang="scss" scoped>
.home-page {
  display: block;
  overflow: hidden;
}
.scene-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
}
</style>

<template>
  <div class="page home-page" :class="{'pink-theme':theme,'grey-theme':!theme}">
    <SceneContainer :grid="[3,3]" :active="activeScene">
      <SceneWrap :position="[0,0]">[0,0]</SceneWrap>
      <SceneWrap :position="[0,1]">[0,1]</SceneWrap>
      <SceneWrap :position="[0,2]">[0,2]</SceneWrap>
      <SceneWrap :position="[1,0]">[1,0]</SceneWrap>
      <SceneWrap :position="[1,2]">[1,2]</SceneWrap>
      <SceneWrap :position="[2,0]">[2,0]</SceneWrap>
      <SceneWrap :position="[2,2]">[2,2]</SceneWrap>

      <SceneWrap :position="[1,1]">
        <InitView @setting="activeScene=[0,1]" @start="activeScene=[2,1]"/>
      </SceneWrap>
      <SceneWrap :position="[2,1]">
        <FinishView v-if="activeScene.toString()==='2,1'" @close="activeScene=[1,1]"/>
      </SceneWrap>
    </SceneContainer>
  </div>
</template>

<script>
import FinishView from './Views/FinishView'
import InitView from './Views/InitView'
import SceneWrap from './Views/SceneWrap'
import SceneContainer from './Views/SceneContainer'

const SCENE = {
  init: 'InitView',
  finish: 'FinishView'
}

export default {
  components: {
    FinishView,
    InitView,
    SceneWrap,
    SceneContainer
  },
  data() {
    return {
      SCENE,
      activeScene: [1, 1],
      slideTo: 'bottom',
      sceneFrom: 'InitView',
      sceneTo: 'FinishView',
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
    viewScene() {
      // let old={0,0},
      // new=[100vw,0]
      // done,
      // new =00
    }
  }
}
</script>
