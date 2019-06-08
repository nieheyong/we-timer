import Vue from 'vue'
import App from './App'

import store from './store'
import './styles/app.scss'
import './styles/iconfont.css'
import './common/extend-vue'

import { themeColors } from './common/config'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
const app = new Vue({
  store,
  ...App
})

app.$mount()

wx.setInnerAudioOption({ obeyMuteSwitch: false })

// 晃动手机换主题
const themeCount = themeColors.length
let lastChange = Date.now()
wx.onAccelerometerChange(function(e) {
  if (Math.abs(e.x) > 1.7 || Math.abs(e.y) > 1.7) {
    if (Date.now() < lastChange + 300) return
    lastChange = Date.now()
    const index = Math.floor(Math.random() * themeCount)
    store.commit('setThemeColor', themeColors[index])
  }
})
wx.startAccelerometer()
