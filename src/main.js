import 'core-js/es/string/pad-start'

import Vue from 'vue'
import App from './App'

import store from './common/store'
import './styles/app.scss'
import './styles/iconfont.css'
import './common/extend-vue'

import { getSetting, APP_SETTING } from './common/app-setting'
import { initAudioPlay } from './common/utils'

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
let lastChange = Date.now()
wx.onAccelerometerChange(function(e) {
  if (!getSetting(APP_SETTING.ChangeThemeOnshake)) return
  if (Math.abs(e.x) > 1.7 || Math.abs(e.y) > 1.7) {
    if (Date.now() < lastChange + 300) return
    lastChange = Date.now()
    store.dispatch('randomChangeTheme')
  }
})
wx.startAccelerometer()

initAudioPlay()
