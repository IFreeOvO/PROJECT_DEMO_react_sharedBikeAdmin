import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import './index.less'
const { SubMenu } = Menu

class Navleft extends React.Component {
  state = {
    currentKey: ''
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    // console.log('当前路由', currentKey)

    this.setState({
      currentKey,
      menuTreeNode
    })
  }

  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }

  handleClick = (item) => {
    // console.log(item)
    const title = item.item.props.children.props.children
    // console.log('菜单名称-> ', title)
    const { dispatch } = this.props
    dispatch(switchMenu(title))
    this.setState({
      currentKey: item.key
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Imooc MS</h1>
        </div>

        <Menu onClick={this.handleClick} selectedKeys={[this.state.currentKey]} theme="dark">{this.state.menuTreeNode}</Menu>
      </div>
    )
  }
}

export default connect()(Navleft)
