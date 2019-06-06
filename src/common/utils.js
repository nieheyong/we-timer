export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const checkForUpdate = () => {
  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(function(res) {
    console.log('app has update: ', res.hasUpdate)
  })

  updateManager.onUpdateReady(function() {
    wx.showModal({
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

export const isSceneInScreen = (scene, fromScene, activeScene, isSliding) => {
  const isActive = activeScene.name === scene.name
  const isLeaveing = fromScene.name === scene.name && isSliding
  return isActive || isLeaveing
}

export const playAudio = fileName => {
  const audio = wx.createInnerAudioContext()
  audio.src = '/static/audio/' + fileName
  audio.play()
  audio.onEnded(audio.destroy)
}

export const sysInfo = (() => {
  const systemInfo = wx.getSystemInfoSync()

  let model = systemInfo.model || ''
  model = model.toLowerCase()
  const isIphoneX = model.includes('iphone') && model.includes('x')

  let system = systemInfo.system || ''
  const isIos = system.toLowerCase().includes('ios')

  return {
    isIphoneX,
    isIos
  }
})()
