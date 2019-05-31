import Vue from 'vue'
import App from './App'

import store from './store'
import './styles/app.scss'
import './styles/iconfont.css'
import './common/extend-vue'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
const app = new Vue({
  store,
  ...App
})

app.$mount()
