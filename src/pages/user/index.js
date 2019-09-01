import React from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import axios from './../../axios'
import Utils from './../..//utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

class User extends React.Component {
  params = {
    page: 1
  }

  state = {
    isVisible: false
  }

  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名称',
      width: 140
    },
    {
      type: 'INPUT',
      label: '用户手机号',
      field: 'user_mobile',
      placeholder: '请输入手机号',
      width: 140
    },
    {
      type: 'DATE',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请输入日期'
    }
  ]

  componentDidMount() {
    this.requestList()
  }

  handleFilter = params => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  // 功能区操作
  handleOperate = (type) => {
    let item = this.state.selectedItem
    if(type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if(type === 'edit') {
      if(!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      } 
      // console.log('选择了', item)
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if(type === 'detail') {
      if(!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      } 
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else {
      if(!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      } 
      let _this = this
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选中的员工',
        onOk() {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then(res => {
            if(res.code === 0) {
              _this.setState({
                isVisible: false
              })
              _this.requestList()
            }
          })
        }
      })
    }
  }

  // 创建员工提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue()
    console.log('提交内容', data)
    axios.ajax({
      url: type=== 'create' ? '/user/add': '/user/edit',
      data: {
        params: data
      }
    }).then(res => {
      if(res.code === 0) {
        this.userForm.props.form.resetFields()
        this.setState({
          isVisible: false
        })
        this.requestList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
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
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]

    let footer = {}
    if(this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }

    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilter}
          ></BaseForm>
        </Card>

        <Card style={{ marginTop: 10 }} className="operate-wrap">
          <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>
            创建员工
          </Button>
          <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>
            编辑员工
          </Button>
          <Button type="primary" onClick={()=>this.handleOperate('detail')}>
            员工详情
          </Button>
          <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>
            删除员工
          </Button>
        </Card>

        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            pagination={this.state.pagination}
          ></ETable>
        </div>

        <Modal title={this.state.title} 
        visible={this.state.isVisible}
        onOk={this.handleSubmit}
        onCancel={()=>{
          this.userForm.props.form.resetFields()
          this.setState({
            isVisible: false,
            userInfo: {}
          })
        }}
        width={600}
        {...footer}>
          <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.userForm = inst}}></UserForm>
        </Modal>
      </div>
    )
  }
}

class UserForm extends React.Component {
  getState = (state) => {
    return {
      '1': '咸鱼',
      '2': '废青',
      '3': '大佬',
      '4': '大神',
      '5': '死宅'
    }[state]
  }

  render() {
    let { type, userInfo = {} } = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span:5},
      wrapperCol: {span:15}
    }
    return (
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {
            type === 'detail'?userInfo.username :
            getFieldDecorator('user_name', {
              initialValue: userInfo.username
            })(
              <Input type="text" placeholder="请输入用户名"></Input>
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            type === 'detail'? (userInfo.sex === 1? '男':'女') :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            type === 'detail'?(this.getState(userInfo.state)) :
            getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>咸鱼</Option>
                <Option value={2}>废青</Option>
                <Option value={3}>大佬</Option>
                <Option value={4}>大神</Option>
                <Option value={5}>死宅</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            type === 'detail'?userInfo.birthday :
            getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker></DatePicker>
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            type === 'detail'?userInfo.address :
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <TextArea rows={3} placeholder="请输入联系地址"></TextArea>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create({})(UserForm)

export default User
