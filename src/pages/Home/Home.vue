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
    <SceneContainer :grid="[3,3]" :active="activeScenePos" @transitionend="transitionend">
      <SceneWrap :position="SCENE_POS.Setting">
        <SettingView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Start">
        <StartView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Run">
        <RunView v-if="activeScenePos.toString()===SCENE_POS.Run.toString()"/>
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
import { SCENE_POS, SCENE } from '../../common/enums'
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
      SCENE,
      SCENE_POS
    }
  },
  computed: {
    ...mapState(['themeColor']),
    ...mapGetters(['activeScenePos'])
  },
  methods: {
    transitionend() {
      this.$store.commit('setIsSliding', false)
    }
  }
}
</script>
