import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils'
const FormItem = Form.Item

class FilterForm extends React.Component {
  // 提交表单
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }

  // 重置表单 
  reset = () => {
    this.props.form.resetFields()
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if(formList && formList.length) {
      formList.forEach((item, i) => {
        let { label, field, initialValue = '', placeholder, width} = item
        if(item.type === '时间查询') {
          const begin_time = <FormItem label="订单时间" key={'begin_time'}>
            {
              getFieldDecorator('begin_time')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
              )
            }
          </FormItem>
          formItemList.push(begin_time)

          // colon 去掉冒号用的
          const end_time = <FormItem label="~" colon={false} key={'end_time'}>
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
              )
            }
          </FormItem>
          formItemList.push(end_time)
        } else if(item.type === 'INPUT') {
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue
              })(
                <Input type="text" placeholder={placeholder}></Input>
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if(item.type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue
              })(
                <Select style={{ width }} placeholder={placeholder}>
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        } else if(item.type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                valuesPropName: 'checked',
                initialValue
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        }
      })
    }
    return formItemList
  }

  render(){
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

FilterForm = Form.create({})(FilterForm)
export default FilterForm