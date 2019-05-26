import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE, SCENE_POS } from './common/enums'

Vue.use(Vuex)

let themeColor = wx.getStorageSync('ThemeColor')
if (!themeColor) {
  themeColor = 'linear-gradient(to bottom, #fa5539, #f93251)'
  wx.setStorage({ key: 'ThemeColor', data: themeColor })
}
const store = new Vuex.Store({
  state: {
    themeColor: themeColor,
    activeScene: SCENE.Start,
    isSliding: false,
    sysInfo: wx.getSystemInfoSync()
  },
  getters: {
    activeScenePos(state) {
      return SCENE_POS[state.activeScene]
    },
    titleBarBtnTop(state) {
      return state.sysInfo.statusBarHeight + 4
    }
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload
      wx.setStorage({ key: 'ThemeColor', data: payload })
    },
    slideToScene(state, sceneName) {
      state.activeScene = sceneName
      state.isSliding = true
    },
    setIsSliding(state, payload) {
      state.isSliding = payload
    }
  }
})

export default store
