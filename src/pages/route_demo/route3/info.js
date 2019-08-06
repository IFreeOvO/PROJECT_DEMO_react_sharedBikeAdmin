import React from 'react'

class Info extends React.Component {
  render(){
    return (
      <div>
      这里是测试动态路由功能
        {this.props.match.params.mainid}
      </div>
    )
  }
}

export default Info