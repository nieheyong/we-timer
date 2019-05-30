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
    <div @click="slideTo(SCENE.Start)" class="confirm-btn">返回</div>
  </div>
</template>

<script>
const themeColors = [
  'linear-gradient(to bottom, #fa5539, #f93251)',
  'linear-gradient(to bottom, #fd746c, #2c3e50)',
  'linear-gradient(to bottom, #904e95, #e96443)',
  'linear-gradient(to top, rgb(11, 72, 107), rgb(245, 98, 2))',
  'linear-gradient(to top, rgb(33, 150, 243), rgb(244, 67, 54))',
  'linear-gradient(to top, rgb(255, 95, 109), rgb(255, 195, 113))',
  'linear-gradient(to top, rgb(29, 67, 80), rgb(164, 57, 49))',
  'linear-gradient(to top, rgb(0, 0, 0), rgb(67, 67, 67))',
  'linear-gradient(to top, rgb(0, 153, 247), rgb(241, 23, 18))',
  'linear-gradient(to top, rgb(41, 128, 185), rgb(44, 62, 80))',
  'linear-gradient(to top, rgb(17, 67, 87), rgb(242, 148, 146))',
  'linear-gradient(to top, rgb(64, 58, 62), rgb(190, 88, 105))',
  'linear-gradient(to top, rgb(229, 57, 53), rgb(227, 93, 91))',
  'linear-gradient(to bottom, #243b55, #141e30)',
  'linear-gradient(to bottom, #734b6d, #42275a)',
  'linear-gradient(to bottom, #535562, #343641)',
  'linear-gradient(to top, rgb(44, 62, 80), rgb(52, 152, 219))'
]
import { SCENE } from '../../../common/enums'
export default {
  data() {
    return {
      SCENE,
      themeColors
    }
  },
  methods: {
    slideTo(scene) {
      this.$store.commit('slideToScene', scene)
    },
    setThemeColor(color) {
      this.$store.commit('setThemeColor', color)
    }
  }
}
</script>
