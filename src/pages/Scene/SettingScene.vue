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
  .confirm-btn {
    margin: 0 auto;
    width: 20%;
    border-radius: 30px;
    background: #fff;
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    color: #333;
    margin: 10px auto;
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
    <div @click="backToHome" class="confirm-btn">返回</div>
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
