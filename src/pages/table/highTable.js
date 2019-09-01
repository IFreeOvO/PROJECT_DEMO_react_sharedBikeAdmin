import React from 'react'
import { Card, Table, Modal, message, Button, Badge } from 'antd'
import axios from './../../axios/index'

class HighTable extends React.Component {
  state = {
    dataSource: []
  }
  // 分页参数
  params = {
    page: 1
  }

  componentWillMount() {
    this.request()
  }

  // 动态获取mock数据
  request = () => {
    axios
      .ajax({
        url: '/table/high/list',
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
            dataSource: res.result.list
          })
        }
      })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('排序', sorter)
    this.setState({
      sortOrder: sorter.order
    })
  }

  // 删除操作
  handleDelete = (item) => {
    Modal.confirm({
      title: '确认',
      content: '您确认删除数据吗？',
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
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
        width: 80,
        render(state) {
          let config = {
            '1': '羽毛球',
            '2': '足球',
            '3': '排球',
            '4': '游泳',
            '5': '乒乓球',
            '6': '桌球',
            '7': '篮球'
          }
          return config[state]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80
      }
    ]

    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
        fixed: 'left' // 固定该列
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80,
        fixed: 'left' // 固定该列
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
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
        width: 80,
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
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday1',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday2',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday3',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday4',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
        fixed: 'right' // 固定该列
      }
    ]
    // 横向滚动需要一个大于列表的宽度

    const columns3 = [
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
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder // 指定升序降序
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
            '7': '篮球'
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

    const columns4 = [
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
        title: '年龄',
        dataIndex: 'age'
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
            '1': <Badge status="success" text="成功"></Badge>,
            '2': <Badge status="error" text="报错"></Badge>,
            '3': <Badge status="default" text="正常"></Badge>,
            '4': <Badge status="processing" text="进行中"></Badge>,
            '5': <Badge status="warning" text="警告"></Badge>,
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
      },
      {
        title: '操作',
        dataIndex: 'do',
        render: (text, item) => {
          return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
        }
      }
    ]

    return (
      <div>
        <Card title="头部固定">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Card>

        <Card title="左侧固定" style={{ margin: '10px 0' }}>
          <Table
            columns={columns2}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            scroll={{ x: 1220 }}
          />
        </Card>

        <Card title="表格排序" style={{ margin: '10px 0' }}>
          <Table
            columns={columns3}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>

        <Card title="操作按钮" style={{ margin: '10px 0' }}>
          <Table
            columns={columns4}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}

export default HighTable
