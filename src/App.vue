<script>
import { checkForUpdate } from './common/utils'

export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
    checkForUpdate()
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

