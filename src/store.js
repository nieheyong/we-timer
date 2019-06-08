import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './common/enums'
import { sysInfo } from './common/utils'
import * as config from './common/config'
import { getSetting, setSetting, APP_SETTING } from './common/app-setting'
import { themeColors } from './common/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    themeColor: getSetting(APP_SETTING.CurrentTheme),
    fromScene: config.startScene,
    activeScene: config.startScene,
    isSliding: false,
    isMuted: getSetting(APP_SETTING.Muted),
    sysInfo: sysInfo
  },
  getters: {
    wxMenuPos() {
      const systemInfo = wx.getSystemInfoSync()
      const res = wx.getMenuButtonBoundingClientRect()
      res.marginSide = systemInfo.screenWidth - res.right
      return res
    }
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload
      wx.vibrateShort()
      setSetting(APP_SETTING.CurrentTheme, payload)
    },
    randomChangeTheme() {
      const index = Math.floor(Math.random() * themeColors.length)
      store.commit('setThemeColor', themeColors[index])
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
      setSetting(APP_SETTING.Muted, state.isMuted)
    }
  }
})

export default store
