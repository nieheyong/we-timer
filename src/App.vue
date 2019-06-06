<script>
import { checkForUpdate } from './common/utils'

export default {
  onLaunch: function() {
    console.log('App Launch')
    wx.setInnerAudioOption({ obeyMuteSwitch: false })
  },
  onShow: function() {
    console.log('App Show')
    //#ifdef  MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
    checkForUpdate()
    //#endif
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

