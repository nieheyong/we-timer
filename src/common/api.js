const BASE_URL = 'http://test.com/api'

function requestError() {
  uni.showModal({
    content: '请求出错，请稍后重试',
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#3CC51F'
  })
}

const request = (url, method = 'GET', data = null, header = {}) =>
  new Promise((resolve, reject) => {
    uni.request({
      url: url.includes('http') ? url : BASE_URL + url,
      method,
      data,
      header,
      success(res) {
        const status = res.statusCode
        if (status >= 200 && status < 300) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(e) {
        requestError()
        reject(e)
      }
    })
  })

export const http = {
  get(url) {
    return request(url)
  },
  post(url, ...rest) {
    return request(url, 'POST', ...rest)
  }
}
