import React from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'

class Message extends React.Component {
  constructor(props) {
    super(props)

    this.showMessage = this.showMessage.bind(this)
  }

  showMessage(type) {
    message[type]('恭喜您，晋级成功')
  }

  render(){
    return (
      <div>
        <Card title="全局提示框" className="card-wrap">
          <Button type="primary" onClick={() => this.showMessage('success')}>Success</Button>
          <Button type="primary" onClick={() => this.showMessage('info')}>Info</Button>
          <Button type="primary" onClick={() => this.showMessage('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.showMessage('error')}>Error</Button>
          <Button type="primary" onClick={() => this.showMessage('loading')}>Loading</Button>
        </Card>
      </div>
    )
  }
}

export default Message