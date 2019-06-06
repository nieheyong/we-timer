<script>
import { checkForUpdate } from './common/utils'
import { themeColors } from './common/config'
import store from './store'

const themeCount = themeColors.length
export default {
  onLaunch: function() {
    console.log('App Launch')
    wx.setInnerAudioOption({ obeyMuteSwitch: false })

    // 晃动手机换主题
    let last = Date.now()
    wx.onAccelerometerChange(function(e) {
      if (Math.abs(e.x) > 1.7) {
        if (Date.now() < last + 500) return
        last = Date.now()
        const index = Math.floor(Math.random() * themeCount)
        store.commit('setThemeColor', themeColors[index])
      }
    })
    wx.startAccelerometer()
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

