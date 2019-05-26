import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE, SCENE_POS } from './common/enums'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    themeColor: 'linear-gradient(to bottom, #fa5539, #f93251)',
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
