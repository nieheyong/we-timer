import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './common/enums'

Vue.use(Vuex)

let themeColor = wx.getStorageSync('ThemeColor')
if (!themeColor) {
  themeColor = 'linear-gradient(to bottom, #fa5539, #f93251)'
  wx.setStorage({ key: 'ThemeColor', data: themeColor })
}
const store = new Vuex.Store({
  state: {
    themeColor: themeColor,
    fromScene: SCENE.Start,
    activeScene: SCENE.Start,
    isSliding: false,
    sysInfo: wx.getSystemInfoSync(),
    countDownParams: null
  },
  getters: {
    titleBarBtnTop(state) {
      const model = state.sysInfo.model.toLowerCase()
      const system = state.sysInfo.system.toLowerCase()
      if (model.includes('iphone') && model.includes('x')) {
        return 50
      }
      if (system.includes('ios')) {
        return 26
      } else {
        return 28
      }
    }
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload
      wx.setStorage({ key: 'ThemeColor', data: payload })
    },
    slideToScene(state, scene) {
      state.fromScene = state.activeScene
      state.activeScene = scene
      state.isSliding = true
    },
    setIsSliding(state, payload) {
      state.isSliding = payload
    },
    setCountDownParams(state, payload) {
      state.countDownParams = payload
    }
  }
})

export default store
