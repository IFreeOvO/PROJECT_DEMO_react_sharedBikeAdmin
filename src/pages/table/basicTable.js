import React from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

class basicTable extends React.Component {
  // 分页参数
  params = {
    page: 1
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      dataSource2: []
    }
  }
  componentWillMount() {
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海定区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海定区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Rose',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海定区奥林匹克公园',
        time: '09:00'
      }
    ]

    data.map((item, index) => {
      item.key = index
      return item
    })

    this.setState({
      dataSource: data
    })
    this.request()
  }

  // 动态获取mock数据
  request = () => {
    let _this = this
    axios
      .ajax({
        url: '/table/list',
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        console.log(res)
        res.result.page = this.params.page // 由于mock数据不会改变页码,这里人工处理一下
        res.result.list.map((item, index) => {
          item.key = index
          return item
        })
        if (res.code === 0) {
          this.setState({
            dataSource2: res.result.list,
            selectedRowKeys: [],
            multSelectedRowKeys: [],
            selectedRows: [],
            pagination: Utils.pagination(res, (current) => {
              _this.params.page = current
              _this.request()
            })
          })
        }
      })
  }

  // 单选行
  onRowClick = (record, index) => {
    console.log('单选', record, index)
    let selectKey = [index]
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}，用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      slectedItem: record
    })
  }

  // 多选执行删除
  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.map(item => {
      ids.push(item.id)
      return item
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }

  render() {
    const { selectedRowKeys, multSelectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys // 存储所选行的key
    }

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys: multSelectedRowKeys,
      onChange: (multSelectedRowKeys, selectedRows) => {
        console.log('多选', multSelectedRowKeys, selectedRows)
        this.setState({
          multSelectedRowKeys,
          selectedRows
        })
        // let ids = []
        // selectedRows.map((item) => {
        //   ids.push(item.id)
        // })
        // this.setState({
        //   selectedRowKeys,
        //   selectedIds: ids
        // })
      }
    }

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼',
            '2': '废青',
            '3': '大佬',
            '4': '大神',
            '5': '死宅'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '羽毛球',
            '2': '足球',
            '3': '排球',
            '4': '游泳',
            '5': '乒乓球',
            '6': '桌球',
            '7': '篮球',
            '8': '电竞'
          }
          return config[state]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    return (
      <div>
        <Card title="基础表格">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />
        </Card>

        <Card title="动态数据渲染表格-mock" style={{ margin: '10px 0' }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
          />
        </Card>

        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowSelection={rowSelection}
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                } // 点击行
              }
            }}
          />
        </Card>

        <Card title="Mock-复选框" style={{ margin: '10px 0' }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowSelection={rowCheckSelection}
            pagination={false}
          />
        </Card>

        <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}

export default basicTable
