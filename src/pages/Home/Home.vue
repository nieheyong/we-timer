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
    <SceneContainer :grid="[4,4]" :active="activeScenePos" @transitionend="transitionend">
      <SceneWrap :position="SCENE_POS.Setting">
        <SettingView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Start">
        <StartView/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Run">
        <RunView v-if="activeScenePos.toString()===SCENE_POS.Run.toString()"/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.Finish">
        <FinishView v-if="activeScenePos.toString()===SCENE_POS.Finish.toString()"/>
      </SceneWrap>
      <SceneWrap :position="SCENE_POS.SetTime">
        <SetTimeView/>
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
import SetTimeView from './Scene/SetTimeView'
import { SCENE_POS, SCENE } from '../../common/enums'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    SceneContainer,
    SceneWrap,
    FinishView,
    StartView,
    SettingView,
    RunView,
    SetTimeView
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
