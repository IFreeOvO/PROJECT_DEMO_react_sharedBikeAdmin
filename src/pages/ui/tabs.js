import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

class MyTabs extends React.Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    const panes = [
      {
        title: 'tab1',
        content: 'tab1',
        key: '1'
      },
      {
        title: 'tab2',
        content: 'tab2',
        key: '2'
      },
      {
        title: 'tab3',
        content: 'tab3',
        key: '3'
      }
    ]
    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }

  handleCallback = key => {
    message.info(`您选择了页签${key}`)
  }

  onChange = activeKey => {
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    console.log(targetKey, action)
    this[action](targetKey)
  }

  add = () => {
    const { panes } = this.state
    const activeKey = `newTab${this.newTabIndex++}`
    panes.push({
      title: activeKey,
      content: 'Content of new Tab',
      key: activeKey
    })
    this.setState({ panes, activeKey })
  }

  remove = targetKey => {
    let { activeKey } = this.state
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key
      } else {
        activeKey = panes[0].key
      }
    }
    this.setState({ panes, activeKey })
  }

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab 1" key="1">
              Content od Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              Content od Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content od Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>

        <Card title="Tab带图的Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  Tab1
                </span>
              }
              key="1"
            >
              Content od Tab Pane 1
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />
                  Tab1
                </span>
              }
              key="2"
            >
              Content od Tab Pane 2
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  Tab1
                </span>
              }
              key="3"
            >
              Content od Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>

        <Card title="Tab带图的Tab页签" className="card-wrap">
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.onChange}
            onEdit={this.onEdit}
            type="editable-card"
          >
            {this.state.panes.map(panel => {
              return (
                <TabPane tab={panel.title} key={panel.key}>
                  {panel.content}
                </TabPane>
              )
            })}
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default MyTabs
