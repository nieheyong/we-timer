import Vue from 'vue'
import App from './App'

import './styles/app.scss'
import './styles/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()