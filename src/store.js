import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE, SCENE_POS } from './common/enums'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: 'pink',
    activeScene: SCENE.Start
  },
  getters: {
    activeScenePos(state) {
      return SCENE_POS[state.activeScene]
    }
  },
  mutations: {
    setTheme(state, payload) {
      state.theme = payload
    },
    slideToScene(state, sceneName) {
      state.activeScene = sceneName
    }
  }
})

export default store
