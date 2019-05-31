<style lang="scss" scoped>
.setting-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .color-piece {
    box-sizing: border-box;
    border: solid 1px rgba($color: #fff, $alpha: 0.8);
    height: 16vw;
    width: 16vw;
    margin: 4px;
    border-radius: 6px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    & > div {
      min-height: 300%;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .bottom-box {
    display: flex;
    position: absolute;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding-bottom: 20px;
    width: 100%;
  }
}
</style>
<template>
  <div class="setting-view">
    <div class="color-piece-container">
      <div
        v-for="color in themeColors"
        @click="setThemeColor(color)"
        class="color-piece"
        :key="color"
      >
        <div :style="{background:color}"></div>
      </div>
    </div>

    <div class="bottom-box">
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

export default {
  data() {
    return {
      themeColors
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
