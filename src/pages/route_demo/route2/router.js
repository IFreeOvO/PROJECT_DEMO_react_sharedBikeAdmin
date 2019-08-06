import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Main from './Main'
import About from './../route1/about'
import Topic from './../route1/topic'
import Home from './Home'

class IRoute extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Route path="/main"  render={() => 
            <Main>
                <Route path="/main/a" component={About} />
            </Main>
          } />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topic} />
        </Home>
      </Router>
    )
  }
}

export default IRoute
