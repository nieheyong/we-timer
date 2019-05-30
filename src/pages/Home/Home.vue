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
  <div class="page home-page" :style="{background:themeColor}">
    <SceneContainer :grid="[3,3]" :active="activeScene.position" @transitionend="transitionend">
      <SceneWrap :sceneInfo="SCENE.Setting">
        <SettingView/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Start">
        <StartView/>
      </SceneWrap>
      <SceneWrap :sceneInfo="SCENE.Run">
        <RunView v-if="showRunView"/>
      </SceneWrap>
    </SceneContainer>
  </div>
</template>

<script>
import SceneWrap from '../../components/SceneWrap'
import SceneContainer from '../../components/SceneContainer'
import StartView from './Scene/StartView'
import SettingView from './Scene/SettingView'
import RunView from './Scene/RunView'
import { SCENE } from '../../common/enums'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    SceneContainer,
    SceneWrap,
    StartView,
    SettingView,
    RunView
  },
  data() {
    return {
      SCENE
    }
  },
  computed: {
    ...mapState(['themeColor', 'isSliding', 'fromScene', 'activeScene']),
    showRunView() {
      const name = SCENE.Run.name
      const isActive = this.activeScene.name === name
      const isFrom = this.fromScene.name === name && this.isSliding
      return isActive || isFrom
    }
  },
  methods: {
    transitionend() {
      this.$store.commit('setIsSliding', false)
    }
  }
}
</script>
