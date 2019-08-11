import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'

class Loadings extends React.Component {
  render() {
    const icon = <Icon type="plus" style={{ fontSize: 24 }} />
    const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" />
          <Spin style={{ margin: '0 10px' }} />
          <Spin size="large" />
          <Spin indicator={icon} style={{ marginLeft: 10 }} />
          <Spin indicator={iconLoading} style={{ marginLeft: 10 }} />
        </Card>

        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="欢迎来电React高级实战课程"
            type="info"
          />

          <Spin>
            <Alert
              message="React"
              description="欢迎来电React高级实战课程"
              type="warning"
            />
          </Spin>

          <Spin tip="加载中..." >
            <Alert
              message="React"
              description="欢迎来电React高级实战课程"
              type="warning"
            />
          </Spin>

          <Spin tip="加载中..." indicator={iconLoading}>
            <Alert
              message="React"
              description="欢迎来电React高级实战课程"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}

export default Loadings
