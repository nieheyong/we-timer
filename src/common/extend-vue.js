import Vue from 'vue'
import { secToTimeStr } from './utils'

Vue.filter('secToTimeStr', secToTimeStr)

Vue.filter('padStart', (value, length, padStr) => {
  return value.toString().padStart(length, padStr)
})
