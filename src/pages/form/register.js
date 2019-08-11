import React from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Icon,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

class FormRegister extends React.Component {
  state = {
    loading: false,
    userImg: ''
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg: imageUrl,
          loading: false
        })
      )
    }
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue() // 获取表单值
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName} 注册成功`)
      }
    }) // 校验字段
    console.log(userInfo)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }

    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }

    const rowObject = {
      minRows: 4,
      maxRows: 6
    }

    return (
      <div>
        <Card title="注册表单">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  }
                ]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>

            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('userPwd', {
                initialValue: ''
              })(<Input placeholder="请输入密码" type="password" />)}
            </FormItem>

            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: '24'
              })(<InputNumber />)}
            </FormItem>

            <FormItem label="当前状态" {...formItemLayout}>
              {getFieldDecorator('state', {
                initialValue: '2'
              })(
                <Select>
                  <Option value="1">咸鱼</Option>
                  <Option value="2">大佬</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="爱好" {...formItemLayout}>
              {getFieldDecorator('interest', {
                initialValue: ['1', '2']
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">打游戏</Option>
                  <Option value="3">看电影</Option>
                  <Option value="4">旅游</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator('isMarried', {
                valuePropName: 'checked',
                initialValue: true
              })(<Switch />)}
            </FormItem>

            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: moment('2019-01-15 12:00:34') // 需要安装moment插件
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>

            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: '中国北京市海定区'
              })(<TextArea autosize={rowObject} />)}
            </FormItem>

            <FormItem label="早起时间" {...formItemLayout}>
              {getFieldDecorator('time', {
                initialValue: moment('02:00:34', 'HH:mm:ss')
              })(<TimePicker />)}
            </FormItem>

            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator('userImg', {})(
                <Upload
                  listType="picture-card"
                  onChange={this.handleChange}
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  {this.state.userImg ? (
                    <img src={this.state.userImg} alt="" />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>
              )}
            </FormItem>

            <FormItem {...offsetLayout}>
              {getFieldDecorator('protrol', {})(
                <Checkbox>
                  我已阅读过<a src="#">慕课协议</a>
                </Checkbox>
              )}
            </FormItem>

            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

const WrappedNormalRegisterForm = Form.create()(FormRegister)
export default WrappedNormalRegisterForm
