<script>
import { checkForUpdate } from './common/utils'
import store from './store'
import { getSetting, APP_SETTING } from './common/app-setting'

export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
    checkForUpdate()

    if (getSetting(APP_SETTING.ChangeThemeOnAppShow)) {
      store.commit('randomChangeTheme')
    }
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

