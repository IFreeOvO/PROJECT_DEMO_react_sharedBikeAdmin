import React from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'

const FormItem = Form.Item

class FormLogin extends React.Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue() // 获取表单值
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName} 登录成功`)
      }
    }) // 校验字段
    console.log(userInfo)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>

            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>

            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="水平表单" style={{ marginTop: 10 }}>
          <Form style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  },
                  {
                    min: 5,
                    max: 10,
                    message: '长度在5-10个字'
                  },
                  {
                    pattern: new RegExp('^\\w+$', 'g'),
                    message: '必须是字母或数字'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('userPwd', {
                initialValue: '',
                rules: []
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  placeholder="请输入密码"
                  type="password"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
                rules: []
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a href="#1" style={{float: 'right'}}>忘记密码</a>
            </FormItem>

            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(FormLogin)
export default WrappedNormalLoginForm
