import React from 'react'
import { Card } from 'antd'
import echartTheme from './../themeLight'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

class Pie extends React.Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme)
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center' // 标题居中
      },
      legend: {
        orient: 'vertical', // legend靠右列排序
        right:10,
        top: 20,
        bottom: 20,
        data: ['周一','周二', '周三', '周四','周五','周六','周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)' // 显示比例
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            }, {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center' // 标题居中
      },
      legend: {
        orient: 'vertical', // legend靠右列排序
        right:10,
        top: 20,
        bottom: 20,
        data: ['周一','周二', '周三', '周四','周五','周六','周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)' // 显示比例
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'], // 内环和外环半径
          center: ['50%', '60%'], //图表的位置
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            }, {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center' // 标题居中
      },
      legend: {
        orient: 'vertical', // legend靠右列排序
        right:10,
        top: 20,
        bottom: 20,
        data: ['周一','周二', '周三', '周四','周五','周六','周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)' // 显示比例
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            }, {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ].sort((a ,b) => {
            return a.value - b.value
          }),
          roseType: 'radius', // 数据越大半径越大
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200
          }
        }
      ]
    }
    return option
  }

  render() {
    return (
      <div>
        <Card title="饼图之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            style={{ height: 500 }}
          ></ReactEcharts>
        </Card>

        <Card title="饼图之二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 500 }}
          ></ReactEcharts>
        </Card>

        <Card title="饼图之三">
          <ReactEcharts
            option={this.getOption3()}
            theme="Imooc"
            style={{ height: 500 }}
          ></ReactEcharts>
        </Card>
      </div>
    )
  }
}

export default Pie
