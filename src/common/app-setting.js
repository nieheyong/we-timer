import { getStorageSync, setStorageSync } from './utils'

export const APP_SETTING = {
  CurrentTheme: 'Setting.CurrentTheme',
  CountParams: 'Setting.CountParams',
  Muted: 'Setting.Muted',
  ChangeThemeOnshake: 'Setting.ChangeThemeOnshake',
  ChangeThemeOnAppShow: 'Setting.ChangeThemeOnAppShow'
}

const DEFAULT_SETTINGS = {
  [APP_SETTING.CurrentTheme]:
    'linear-gradient(to top, rgb(0, 153, 247), rgb(241, 23, 18))',
  [APP_SETTING.CountParams]: [8, 20, 10],
  [APP_SETTING.Muted]: false,
  [APP_SETTING.ChangeThemeOnshake]: true,
  [APP_SETTING.ChangeThemeOnAppShow]: false
}

const settingTwin = {}
export const getSetting = key => {
  if (settingTwin[key] === undefined) {
    settingTwin[key] = getStorageSync(key)
    if (settingTwin[key] === '') {
      //数据未初始化
      const defaultValue = DEFAULT_SETTINGS[key]
      setStorageSync(key, defaultValue)
      settingTwin[key] = defaultValue
    }
  }
  return settingTwin[key]
}

export const setSetting = (key, data, isSync = false) => {
  settingTwin[key] = data
  if (!isSync) {
    wx.setStorage({ key, data })
  } else {
    setStorageSync(key, data)
  }
}
