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
    <SceneContainer :grid="[4,4]" :active="activeScene">
      <SceneWrap :position="SCENE_POS.Setting">
        <SettingView @slideTo="slideTo" @changeTheme="theme=!theme"/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Start">
        <StartView @slideTo="slideTo"/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Run">
        <RunView @slideTo="slideTo"/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Finish">
        <FinishView @slideTo="slideTo" v-if="activeScene.toString()===SCENE_POS.Finish.toString()"/>
      </SceneWrap>
    </SceneContainer>
  </div>
</template>

<script>
import SceneWrap from '../../components/SceneWrap'
import SceneContainer from '../../components/SceneContainer'
import FinishView from './Scene/FinishView'
import StartView from './Scene/StartView'
import SettingView from './Scene/SettingView'
import RunView from './Scene/RunView'

import { SCENE_POS, SCENE } from './enums'

export default {
  components: {
    SceneContainer,
    SceneWrap,
    FinishView,
    StartView,
    SettingView,
    RunView
  },
  data() {
    return {
      SCENE,
      SCENE_POS,
      activeScene: SCENE_POS[SCENE.Start],
      theme: false
    }
  },
  methods: {
    slideTo(scene) {
      this.activeScene = SCENE_POS[scene]
    }
  }
}
</script>
