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

export const toTimeStr = (min, sec) => {
  min = min.toString().padStart(2, '0')
  sec = sec.toString().padStart(2, '0')
  return min + ':' + sec
}

export const secToTimeStr = sec => {
  let min = Math.floor(sec / 60)
  return toTimeStr(min, sec % 60)
}

export const timeStrToSec = timeStr => {
  const [min, sec] = toMinSec(timeStr)
  return min * 60 + sec
}

export const toMinSec = timeStr => {
  const [min, sec] = timeStr.split(':')
  return [Number.parseInt(min), Number.parseInt(sec)]
}
