<style lang="scss" scoped>
.setting-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top-box {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .logo-container {
      text-align: center;
      margin-bottom: 20px;
      img {
        display: inline-block;
        width: 70px;
        height: 70px;
        box-shadow: 0 0 4px rgba($color: #000, $alpha: 0.2);
        border-radius: 50%;
      }
      .app-name {
        font-size: 20px;
        margin-top: 5px;
        font-weight: bolder;
        color: #ddd;
      }
    }
    .setting-box {
      transition: all 0.3s;
      font-size: 32rpx;
      margin: 0 20px;
      padding: 6px 0;
      border-radius: 6px;
      background: rgba($color: #fff, $alpha: 0.1);
      .setting-line {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        &:last-of-type {
          border-bottom: none;
        }
        .text {
          flex: 1;
        }
        .iconfont {
          transition: transform 0.3s;
          transform: rotate(90deg);
          color: #eee;
        }
        &.hover {
          background: rgba($color: #fff, $alpha: 0.05);
        }
        &.unfold {
          .iconfont {
            transform: rotate(-90deg);
          }
        }
      }
      .divider {
        // width: 100%;
        height: 1px;
        margin: 0 20px;
        background: rgba($color: #fff, $alpha: 0.08);
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
    <div class="top-box" :style="{'padding-top':`${titleBarBtnTop+30}px`}">
      <div class="logo-container">
        <img src="/static/logo.png" alt>
        <div class="app-name">间隔计时</div>
      </div>
      <ul class="setting-box">
        <li
          @click="showThemes=!showThemes"
          :class="{unfold:showThemes}"
          hover-class="hover"
          class="setting-line"
        >
          <div class="text">主题设置</div>
          <i class="iconfont icon-arrow_right"></i>
        </li>
        <div v-if="showThemes" class="color-piece-container">
          <div
            @click="setThemeColor(color)"
            v-for="color in themeColors"
            :key="color"
            :style="{background:color}"
            class="color-piece"
          />
        </div>
        <div class="divider"/>
        <li
          @click="showChangeLog=!showChangeLog"
          :class="{unfold:showChangeLog}"
          hover-class="hover"
          class="setting-line"
        >
          <div class="text">更新记录</div>
          <i class="iconfont icon-arrow_right"></i>
        </li>
        <ChangeLog v-if="showChangeLog"/>
      </ul>
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
import ChangeLog from './ChangeLog.vue'
export default {
  components: {
    ChangeLog
  },
  data() {
    return {
      themeColors,
      showThemes: false,
      showChangeLog: false
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
