<style lang="scss" scoped>
.main-page {
  display: block;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div class="page main-page" :style="{background:themeColor}">
    <SceneContainer :grid="[3,1]" :active="activeScene.position" @transitionend="transitionend">
      <SceneWrap :sceneInfo="SCENE.Setting">
        <SettingScene v-if="showSettingView"/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Start">
        <StartScene/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Run">
        <RunScene v-if="showRunView"/>
      </SceneWrap>
    </SceneContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SceneWrap from '@/components/SceneWrap'
import SceneContainer from '@/components/SceneContainer'
import StartScene from './Scene/StartScene'
import SettingScene from './Scene/SettingScene/SettingScene'
import RunScene from './Scene/RunScene/RunScene'
import { SCENE } from '@/common/enums'
import { isSceneInScreen } from '@/common/utils'

export default {
  components: {
    SceneContainer,
    SceneWrap,
    StartScene,
    SettingScene,
    RunScene
  },
  data() {
    return {
      SCENE
    }
  },
  computed: {
    ...mapState(['themeColor', 'isSliding', 'fromScene', 'activeScene']),
    showRunView() {
      return isSceneInScreen(
        SCENE.Run,
        this.fromScene,
        this.activeScene,
        this.isSliding
      )
    },
    showSettingView() {
      return isSceneInScreen(
        SCENE.Setting,
        this.fromScene,
        this.activeScene,
        this.isSliding
      )
    }
  },
  methods: {
    transitionend() {
      this.$store.commit('setIsSliding', false)
    }
  }
}
</script>
