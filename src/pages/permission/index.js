import React from 'react'
import { Button, Card, Modal, Form, Input, Select, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

class Permission extends React.Component {
  state = {}

  componentWillMount() {
    axios.requestList(this, '/role/list', {})
  }

  // 打开创建角色对话框
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 创建角色
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue()
    axios
      .ajax({
        url: 'role/create',
        data: {
          params: data
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            isRoleVisible: false
          })
          this.roleForm.props.form.resetFields()
          axios.requestList(this, '/role/list', {})
        }
      })
  }

  // 打开权限设置弹框
  handlePermission = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '提示',
        content: '请选择一个角色'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  // 设置权限
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo

    axios
      .ajax({
        url: 'permission/edit',
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            isPermVisible: false
          })
          axios.requestList(this, '/role/list', {})
        }
      })
  }

  // 打开用户授权
  handleUserAuth = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '提示',
        content: '请选择一个角色'
      })
      return
    }

    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id)
  }

  // 获取角色列表
  getRoleUserList = id => {
    axios
      .ajax({
        url: '/role/user_list',
        data: {
          params: {
            id
          }
        }
      })
      .then(res => {
        if (res) {
          this.getAuthUserList(res.result)
        }
      })
  }

  // 筛选目标用户
  getAuthUserList = dataSource => {
    const mockData = []
    const targetKeys = []
    if (dataSource && dataSource.length) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        // 状态是1就添加到目标用户里
        if (data.status === 1) {
          targetKeys.push(data.key)
        }
        mockData.push(data) // 左侧必须是全部数据
      }
      this.setState({
        mockData,
        targetKeys
      })
    }
  }

  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedItem.id

    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if(res) {
        this.setState({
          isUserVisible: false
        })
        axios.requestList(this, '/role/list', {})
      }
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatDate
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]

    return (
      <div>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.handleRole}
          >
            创建角色
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.handlePermission}
          >
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            columns={columns}
          ></ETable>
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible: false
            })
          }}
        >
          <RoleForm
            wrappedComponentRef={inst => (this.roleForm = inst)}
          ></RoleForm>
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PermEditForm
            wrappedComponentRef={inst => (this.permForm = inst)}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              })
            }}
          ></PermEditForm>
        </Modal>

        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={targetKeys => {
              this.setState({
                targetKeys
              })
            }}
          ></RoleAuthForm>
        </Modal>
      </div>
    )
  }
}

export default Permission

// 创建角色表单
class RoleForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form>
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator('role_name')(
            <Input type="text" placeholder="请输入角色名称"></Input>
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('state')(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm)

// 编辑权限表单
class PermEditForm extends React.Component {
  renderTreeNodes = data => {
    const tree = data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode title={item.title} key={item.key}></TreeNode>
      }
    })
    console.log('权限树', tree)
    return tree
  }

  onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    const detail_info = this.props.detailInfo
    const menuInfo = this.props.menuInfo
    console.log('权限', menuInfo)
    return (
      <Form>
        <FormItem label="角色名称" {...formItemLayout}>
          <Input
            type="text"
            placeholder={detail_info.role_name}
            disabled
          ></Input>
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: '1'
          })(
            <Select>
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => {
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
PermEditForm = Form.create({})(PermEditForm)

// 用户授权表单
class RoleAuthForm extends React.Component {
  onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys)
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys)
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    const detail_info = this.props.detailInfo
    return (
      <Form>
        <FormItem label="角色名称" {...formItemLayout}>
          <Input
            type="text"
            placeholder={detail_info.role_name}
            disabled
          ></Input>
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
          listStyle={{
            width: 200,
            height: 400
          }}
            dataSource={this.props.mockData}
            titles={['待选用户', '已选用户']}
            showSearch
            locale={{
              searchPlaceholder: '输入用户名'
            }}
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          ></Transfer>
        </FormItem>
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm)
