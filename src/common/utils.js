export const sysInfo = (() => {
  const systemInfo = wx.getSystemInfoSync()

  let model = systemInfo.model || ''
  model = model.toLowerCase()
  const isIphoneX = model.includes('iphone') && model.includes('x')

  let system = (systemInfo.system || '').toLowerCase()
  const isIos = system.includes('ios')
  const isAndroid = system.includes('android')
  const isWindows = system.includes('windows')
  return {
    isIphoneX,
    isIos,
    isAndroid,
    isWindows,
  }
})()

export const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
    if (sysInfo.isAndroid) {
      // dont know why,but helps solved setTimeout invoke too later
      setTimeout(() => {}, ms)
    }
  })

export const checkForUpdate = () => {
  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    console.log('app has update: ', res.hasUpdate)
  })

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      },
    })
  })

  updateManager.onUpdateFailed(function () {
    console.log('app update failed: ', res.hasUpdate)
  })
}

export const toTimeStr = (min, sec) => {
  min = min.toString().padStart(2, '0')
  sec = sec.toString().padStart(2, '0')
  return min + ':' + sec
}

export const secToTimeStr = (sec) => {
  let min = Math.floor(sec / 60)
  return toTimeStr(min, sec % 60)
}

export const isSceneInScreen = (scene, fromScene, activeScene, isSliding) => {
  const isActive = activeScene.name === scene.name
  const isLeaveing = fromScene.name === scene.name && isSliding
  return isActive || isLeaveing
}

const audioFilePrefix = sysInfo.isWindows
  ? 'https://cdn.jsdelivr.net/gh/nieheyong/we-timer@master/src/static/audio/'
  : '/static/audio/'

class AudioPool {
  pool = new Map()
  constructor() {
    const fileNames = [
      'ding.mp3',
      'dong.mp3',
      'mute.mp3',
      'rest.mp3',
      'success.mp3',
    ]

    for (const fileName of fileNames) {
      this.pool.set(fileName, [this.createAudio(fileName)])
    }
  }

  createAudio(fileName) {
    const audio = wx.createInnerAudioContext()
    audio.src = audioFilePrefix + fileName
    return audio
  }

  getAudio(fileName) {
    const filePool = this.pool.get(fileName)
    console.log(fileName, filePool.length)
    let audio = filePool.length ? filePool.pop() : this.createAudio(fileName)
    audio.offEnded()
    audio.onEnded(() => filePool.push(audio))
    return audio
  }
}

const audioPool = new AudioPool()

export const initAudioPlay = () => {
  audioPool.getAudio('mute.mp3').play()
}

export const playAudio = (fileName) => {
  audioPool.getAudio(fileName).play()
}

export const getStorageSync = (key) => {
  let res = ''
  try {
    res = wx.getStorageSync(key)
  } catch (e) {}
  return res
}

export const setStorageSync = (key, data) => {
  try {
    wx.setStorageSync(key, data)
  } catch (e) {}
}

const PackageJson = require('../../package.json')
const currentVersion = PackageJson.version

const info = (() => {
  let info = {}
  const key = 'APP.Version'
  const version = getStorageSync(key)

  if (version === '') {
    info.isNewInstall = true
  } else if (version !== currentVersion) {
    info.isNewUpdate = true
  }
  setStorageSync(key, currentVersion)
  return info
})()

export const AppIntallInfo = {
  Version: currentVersion,
  isNewInstall: info.isNewInstall,
  isNewUpdate: info.isNewUpdate,
}
