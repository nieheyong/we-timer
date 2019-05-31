import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './common/enums'
import { sysInfo } from './common/utils'
import * as config from './common/config'
Vue.use(Vuex)

let themeColor = uni.getStorageSync('ThemeColor')
if (!themeColor) {
  themeColor = config.defaultTheme
  uni.setStorage({ key: 'ThemeColor', data: themeColor })
}

const store = new Vuex.Store({
  state: {
    themeColor: themeColor,
    fromScene: config.startScene,
    activeScene: config.startScene,
    isSliding: false,
    sysInfo: sysInfo
  },
  getters: {
    titleBarBtnTop(state) {
      if (sysInfo.isIphoneX) {
        return 50
      }
      if (sysInfo.isIos) {
        return 26
      } else {
        return 28
      }
    }
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload
      uni.setStorage({ key: 'ThemeColor', data: payload })
    },
    slideToScene(state, scene) {
      state.fromScene = state.activeScene
      state.activeScene = scene
      state.isSliding = true
    },
    setIsSliding(state, payload) {
      state.isSliding = payload
    }
  }
})

export default store
