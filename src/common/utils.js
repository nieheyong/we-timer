export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const checkForUpdate = () => {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate(function(res) {
    console.log('app has update: ', res.hasUpdate)
  })

  updateManager.onUpdateReady(function() {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed(function() {
    console.log('app update failed: ', res.hasUpdate)
  })
}
