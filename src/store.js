import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './common/enums'
import { sysInfo } from './common/utils'
import * as config from './common/config'
Vue.use(Vuex)

let themeColor = wx.getStorageSync('ThemeColor')
if (!themeColor) {
  themeColor = config.defaultTheme
  wx.setStorage({ key: 'ThemeColor', data: themeColor })
}

let isMuted = wx.getStorageSync('isMuted')
if (isMuted === '') {
  isMuted = false
  wx.setStorage({ key: 'isMuted', data: isMuted })
}

const store = new Vuex.Store({
  state: {
    themeColor,
    fromScene: config.startScene,
    activeScene: config.startScene,
    isSliding: false,
    isMuted,
    sysInfo: sysInfo
  },
  getters: {
    titleBarBtnTop(state) {
      if (sysInfo.isIphoneX) {
        return 48
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
      wx.vibrateShort()
      wx.setStorage({ key: 'ThemeColor', data: payload })
    },
    slideToScene(state, scene) {
      wx.vibrateShort()
      state.fromScene = state.activeScene
      state.activeScene = scene
      state.isSliding = true
    },
    setIsSliding(state, payload) {
      state.isSliding = payload
    },
    toggleMuted(state) {
      state.isMuted = !state.isMuted
      wx.vibrateShort()
      wx.setStorage({ key: 'isMuted', data: state.isMuted })
    }
  }
})

export default store
