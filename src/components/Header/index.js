import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: '匿名用户',
      sysTime: Util.formatDate(new Date().getTime()),
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/night/duoyun.png', // 防止api挂掉给的默认值
      weather: '阴转多云' // 防止api挂掉给的默认值
    })

    this.timer = setInterval(() => {
      const sysTime = Util.formatDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)

    this.getWeatherAPIData()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getWeatherAPIData() {
    const city = '南京'
    axios
      .jsonp({
        url:
          'http://api.map.baidu.com/telematics/v3/weather?location=' +
          encodeURIComponent(city) +
          '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
      })
      .then(res => {
        if (res.status === 'success') {
          let data = res.results[0].weather_data[0]
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
          })
        }
      })
  }

  render() {
    // console.log(this.props)
    const menuType = this.props.menuType
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType? 
            <Col span={6} className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>IMooc 通用管理系统</span>
            </Col> : ''
          }
          <Col span={menuType? 18 : 24}>
            <span>欢迎， {this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        {
          menuType? '' : <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            {this.props.menuName}
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-img">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">
              {this.state.weather}
            </span>
          </Col>
        </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)
