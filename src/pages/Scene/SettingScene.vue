<style lang="scss" scoped>
.setting-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .color-piece-container {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    padding: 15px 15px;
    .color-piece {
      box-sizing: border-box;
      border: solid 1px rgba($color: #fff, $alpha: 0.8);
      padding-top: 100%;
      width: 100%;
      // margin: 4px;
      border-radius: 6px;
      display: inline-block;
      overflow: hidden;
      position: relative;
      & > div {
        min-height: 300%;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .bottom-box {
    display: flex;
    // position: absolute;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
  }
}
</style>
<template>
  <div class="setting-view">
    <div class="color-piece-container" :style="{'padding-top':`${titleBarBtnTop+40}px`}">
      <div
        v-for="color in themeColors"
        @click="setThemeColor(color)"
        class="color-piece"
        :key="color"
      >
        <div :style="{background:color}"></div>
      </div>
    </div>

    <div class="bottom-box" :class="{'pd-bt-40':isIphoneX}">
      <div
        @click="backToHome"
        hover-class="hover"
        :hover-start-time="0"
        :hover-delay-time="100"
        class="circle-button"
      >
        <i class="iconfont icon-tick"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '@/common/enums'
import { themeColors } from '@/common/config'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      themeColors
    }
  },
  computed: {
    ...mapGetters(['titleBarBtnTop']),
    isIphoneX() {
      return this.$store.state.sysInfo.isIphoneX
    }
  },
  methods: {
    backToHome() {
      this.$store.commit('slideToScene', SCENE.Start)
    },
    setThemeColor(color) {
      this.$store.commit('setThemeColor', color)
    }
  }
}
</script>
