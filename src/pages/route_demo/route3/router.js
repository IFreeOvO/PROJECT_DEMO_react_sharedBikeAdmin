import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import About from './../route1/about'
import Topic from './../route1/topic'
import Home from './Home'
import Info from './info'
import NoMatch from './NoMatch'

class IRoute extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route
              path="/main"
              render={() => (
                <Main>
                  <Route path="/main/:mainid" component={Info} />
                </Main>
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topic} />
            <Route component={NoMatch} />
          </Switch>
        </Home>
      </Router>
    )
  }
}

export default IRoute
