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
    height: 10vw;
    width: 10vw;
    margin: 2px;
    border-radius: 6px;
    display: inline-block;
  }
}
</style>
<template>
  <div class="setting-view">
    <div class="color-piece-container">
      <div
        v-for="color in themeColors"
        :style="{background:color}"
        @click="setThemeColor(color)"
        class="color-piece"
        :key="color"
      ></div>
    </div>
    <div @click="changeTheme" class="piece">修改主题</div>
    <div @click="slideTo(SCENE.Start)" class="piece">返回</div>
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
