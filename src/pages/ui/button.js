import React from 'react'
import {Card, Button, Icon, Radio } from 'antd'
import './ui.less'

class Buttons extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      size: 'default'
    }

    this.handleCloseLoading = this.handleCloseLoading.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCloseLoading() {
    this.setState({
      loading: false
    })
  }

  handleChange(e) {
    this.setState({
      size: e.target.value
    })
  }

  render(){
    return (
      <div>
        <Card title={'基础按钮'} className="card-wrap">
          <Button type="primary">primary</Button>
          <Button >default</Button>
          <Button type="dashed">dashed</Button>
          <Button type="danger">danger</Button>
          <Button disabled>disabled</Button>
        </Card>

        <Card title={'图形按钮'} className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>

        <Card title={'Loading按钮'} className="card-wrap">
        <Button type="primary" loading={this.state.loading}>确定</Button>
        <Button type="primary" shape="circle" loading={this.state.loading}></Button>
        <Button loading={this.state.loading}>点击加载</Button>
        <Button shape="circle"  loading={this.state.loading}></Button>
        <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
      </Card>

        <Card title="按钮组" style={{marginBottom: 10}}>
          <Button.Group>
            <Button icon="left" type="primary" >返回</Button>
            <Button  type="primary">前进<Icon type="right" /></Button>
          </Button.Group>
        </Card>

        <Card title={'按钮尺寸'} className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>

          <Button type="primary" size={this.state.size}>primary</Button>
          <Button size={this.state.size}>default</Button>
          <Button type="dashed" size={this.state.size}>dashed</Button>
          <Button type="danger" size={this.state.size}>danger</Button>
        </Card>
      </div>
    )
  }
}

export default Buttons