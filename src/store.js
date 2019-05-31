import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from './common/enums'
import * as config from './common/config'
Vue.use(Vuex)

let themeColor = wx.getStorageSync('ThemeColor')
if (!themeColor) {
  themeColor = config.defaultTheme
  wx.setStorage({ key: 'ThemeColor', data: themeColor })
}
const store = new Vuex.Store({
  state: {
    themeColor: themeColor,
    fromScene: config.startScene,
    activeScene: config.startScene,
    isSliding: false,
    sysInfo: wx.getSystemInfoSync(),
    countDownParams: null
  },
  getters: {
    titleBarBtnTop(state) {
      let { model, system } = state.sysInfo
      model = model ? model.toLowerCase() : ''
      system = system ? system.toLowerCase() : ''
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
