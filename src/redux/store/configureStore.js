// 引入createStore 创建源数据

import { createStore, applyMiddleware  } from 'redux'
import reducer from './../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default () => createStore(reducer, composeWithDevTools(
  applyMiddleware()
))