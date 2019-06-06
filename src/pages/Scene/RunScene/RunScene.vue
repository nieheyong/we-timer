<style lang="scss" scoped>
.run-view {
  height: 100vh;
  width: 100vw;
  position: relative;
}
</style>

<template>
  <div class="run-view">
    <FinishView v-if="finish"/>
    <template v-else>
      <CountDown @finish="finish=true"/>
      <div
        @click="toggleMuted"
        :style="{width:`${wxMenuPos.height}px`,height:`${wxMenuPos.height}px`,top:`${wxMenuPos.top}px`}"
        class="wx-menu-button wx-menu-button-center"
      >
        <i class="iconfont" :class="{'icon-un-mute':!isMuted,'icon-mute':isMuted}"></i>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import FinishView from './FinishView'
import CountDown from './CountDown'

export default {
  components: {
    FinishView,
    CountDown
  },
  data() {
    return {
      finish: false
    }
  },
  computed: {
    ...mapState(['isMuted']),
    ...mapGetters(['wxMenuPos'])
  },
  methods: {
    ...mapMutations(['toggleMuted'])
  }
}
</script>
