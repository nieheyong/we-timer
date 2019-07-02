<style lang="scss" >
.theme-config {
  .top-box {
    padding: 0 20px;
    .config-line {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: solid 1px rgba($color: #fff, $alpha: 0.1);
      &:last-child {
        border: none;
      }
      .text {
        flex: 1;
      }
    }
  }
  .color-piece-container {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 10px 20px;
    // margin: 0 -20px;
    .color-piece {
      box-sizing: border-box;
      border: solid 1px rgba($color: #fff, $alpha: 1);
      padding-top: 100%;
      width: 100%;
      border-radius: 6px;
      display: inline-block;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="theme-config">
    <div class="top-box">
      <label class="config-line">
        <div class="text">启动时随机更换主题</div>
        <switch
          :checked="changeThemeOnAppShow"
          color="#EA5B46"
          @change="configChange('randomShow',$event)"
        />
      </label>
      <label class="config-line">
        <div class="text">摇一摇换主题</div>
        <switch
          :checked="changeThemeOnshake"
          color="#EA5B46"
          @change="configChange('shake',$event)"
        />
      </label>
    </div>
    <div class="color-piece-container">
      <div
        @click="setThemeColor(color)"
        v-for="color in allThemeColors"
        :key="color"
        :style="{background:color}"
        class="color-piece"
      />
    </div>
  </div>
</template>

<script>
import { THEME_COLORS } from '@/common/constant'
import {
  getSetting,
  setSetting,
  APP_SETTING
} from '../../../common/app-setting'

export default {
  data() {
    return {
      allThemeColors: THEME_COLORS,
      changeThemeOnAppShow: getSetting(APP_SETTING.ChangeThemeOnAppShow),
      changeThemeOnshake: getSetting(APP_SETTING.ChangeThemeOnshake)
    }
  },
  methods: {
    setThemeColor(color) {
      this.$store.commit('setThemeColor', color)
    },
    configChange(name, e) {
      const value = e.detail.value
      if (name === 'randomShow') {
        this.changeThemeOnAppShow = value
        setSetting(APP_SETTING.ChangeThemeOnAppShow, value)
      }
      if (name === 'shake') {
        this.changeThemeOnshake = value
        setSetting(APP_SETTING.ChangeThemeOnshake, value)
      }
    }
  }
}
</script>
