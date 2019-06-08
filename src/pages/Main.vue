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
    <SceneContainer
      :grid="SCENE_GRID"
      :active="activeScene.position"
      @transitionend="transitionend"
    >
      <SceneWrap :sceneInfo="SCENE.Welcome">
        <Welcome v-if="showWelcomeView"/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Setting">
        <SettingScene v-if="showSettingView"/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Start">
        <StartScene v-if="showStartView"/>
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
import Welcome from './Scene/Welcome'
import SettingScene from './Scene/SettingScene/SettingScene'
import RunScene from './Scene/RunScene/RunScene'
import { SCENE, SCENE_GRID } from './scene'
import { isSceneInScreen } from '@/common/utils'

export default {
  components: {
    SceneContainer,
    SceneWrap,
    StartScene,
    SettingScene,
    RunScene,
    Welcome
  },
  data() {
    return {
      SCENE,
      SCENE_GRID
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
    },
    showWelcomeView() {
      return isSceneInScreen(
        SCENE.Welcome,
        this.fromScene,
        this.activeScene,
        this.isSliding
      )
    },
    showStartView() {
      return isSceneInScreen(
        SCENE.Start,
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
