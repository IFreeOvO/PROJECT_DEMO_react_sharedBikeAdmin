import { type } from './../action'

// Reducer 数据处理

const initialState = {
  menuName: '首页'
}

export default (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      return {
        state
      }
  }
}
