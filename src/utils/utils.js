import React from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default {
  formatDate(time) {
    if(!time) {
      return ''
    }
    const date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },

  // 分页配置
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`
      },
      showQuickJumper: true
    }
  },

  // 获取下拉菜单选项
  getOptionList(data) {
    if(!data) {
      return []
    }
    let options = [] // <Option value="0" key="all_key">全部</Option>
    data.map((item) => (
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    ))
    return options
  },

  updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
    console.log('选中', selectedItem, selectedRowKeys, selectedIds)
    // 判断是单选还是多选,selectedIds有值是多选
    if(selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedItem,
        selectedIds
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem
      })
    }
    
  }
}