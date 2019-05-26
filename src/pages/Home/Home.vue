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
  <div class="page home-page" :class="[`${theme}-theme`]">
    <SceneContainer :grid="[4,4]" :active="activeScenePos">
      <SceneWrap :position="SCENE_POS.Setting">
        <SettingView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Start">
        <StartView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Run">
        <RunView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Finish">
        <FinishView v-if="activeScenePos.toString()===SCENE_POS.Finish.toString()"/>
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
import { SCENE_POS, SCENE } from '../../common/enums'
import { mapState, mapMutations, mapGetters } from 'vuex'

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
      SCENE_POS
    }
  },
  computed: {
    ...mapState(['theme']),
    ...mapGetters(['activeScenePos'])
  }
}
</script>
