import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/utils'

export default class Axios {
  // 对列表请求进行封装
  static requestList(_this, url ,params) {
    var data = {
      params
    }

    this.ajax({
      url,
      data
    }).then(data => {
      if (data && data.result) {
        data.result.page = params.page // 由于mock数据不会改变页码,这里人工处理一下
        let list = data.result.item_list.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          list,
          pagination: Utils.pagination(data, current => {
            _this.params.page = current
            _this.requestList()
          })
        })
      }
    })
  }

  // 对jsonp插件进行封装
  static jsonp(option) {
    return new Promise((resolve, reject) => {
      JsonP(
        option.url,
        {
          param: 'callback'
        },
        function(err, response) {
          if (response && response.status === 'success') {
            resolve(response)
          } else {
            reject(response && response.message)
          }
        }
      )
    })
  }

  // 对数据请求的封装
  static ajax(options) {
    let loading
    // 不传isShowLoading,默认开启加载中提示
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }

    const baseApi =
      'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    return new Promise((resovle, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status === 200) {
          const res = response.data
          // eslint-disable-next-line
          if (res.code == 0) {
            resovle(res)
          } else {
            Modal.info({
              title: '提示',
              content: `请求出错---${res.msg}`
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}
