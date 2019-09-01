import React from 'react'
import { Table } from 'antd'

class ETable extends React.Component {
  onRowClick = (record, index) => {
    let { rowSelection } = this.props
    // 判断单选还是复选
    if (rowSelection === 'checkbox') {
      let { selectedRowKeys, selectedItem, selectedIds } = this.props
      // 刚开始selectedIds没有值,需要初始化selectedRowKeys, selectedItem, selectedIds
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id)
        // 从未选中的加入数组,重复的选中则取反
        if (i === -1) {
          selectedIds.push(record.id)
          selectedRowKeys.push(index)
          selectedItem.push(record)
        } else {
          selectedIds.splice(i, 1)
          selectedRowKeys.splice(i, 1)
          selectedItem.splice(i, 1)
        }
      } else {
        selectedIds = [record.id]
        selectedRowKeys = [index]
        selectedItem = [record]
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
    } else {
      let selectedRowKeys = [index]
      let selectedItem = record
      this.props.updateSelectedItem(selectedRowKeys, selectedItem)
    }
  }

  tableInit = () => {
    let row_selection = this.props.rowSelection
    let { selectedRowKeys } = this.props
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    if (row_selection === false || row_selection === null) {
      // 不需要单选和复选
      row_selection = false
    } else if (row_selection === 'checkbox') {
      // 需要复选
      rowSelection.type = 'checkbox'
    } else {
      // 需要单选
      row_selection = 'radio'
    }

    return (
      <Table
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (!row_selection) {
                return
              }
              this.onRowClick(record, index)
            }
          }
        }}
      />
    )
  }

  render() {
    return <div>{this.tableInit()}</div>
  }
}

export default ETable
