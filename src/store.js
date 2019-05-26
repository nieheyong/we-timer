import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE, SCENE_POS } from './common/enums'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: 'pink',
    activeScene: SCENE_POS.Start
  },
  mutations: {
    setTheme(state, payload) {
      state.theme = payload
    },
    slideToScene(state, sceneName) {
      state.activeScene = SCENE_POS[sceneName]
    }
  }
})

export default store
