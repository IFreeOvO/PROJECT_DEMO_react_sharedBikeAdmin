import JsonP from 'jsonp'

// 对jsonp插件进行封装
export default class Axios {
  static jsonp(option) {
    return new Promise((resolve, reject) => {
      JsonP(option.url, {
        param: 'callback'
      }, function(err, response) {
        if(response && response.status === 'success') {
          resolve(response)
        } else {
          reject(response && response.message)
        }
      })
    })
  }
}