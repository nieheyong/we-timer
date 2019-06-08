import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './pages/scene'
import { sysInfo } from './common/utils'
import { getSetting, setSetting, APP_SETTING } from './common/app-setting'
import { THEME_COLORS } from './common/enums'

Vue.use(Vuex)

const FirstScene = SCENE.Start

const store = new Vuex.Store({
  state: {
    themeColor: getSetting(APP_SETTING.CurrentTheme),
    fromScene: FirstScene,
    activeScene: FirstScene,
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
  },
  actions: {
    randomChangeTheme(context) {
      const index = Math.floor(Math.random() * THEME_COLORS.length)
      context.commit('setThemeColor', THEME_COLORS[index])
    }
  }
})

export default store
