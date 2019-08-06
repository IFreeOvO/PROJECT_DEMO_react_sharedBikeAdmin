import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import Buttons from './pages/ui/button'
import NoMatch from './pages/nomatch'

class IRouter extends React.Component {
  render(){
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" render={() => 
            <Admin>
              <Route path="/admin/ui/buttons" component={Buttons}></Route>
              <Route component={NoMatch}></Route>
            </Admin>
          }></Route>
          <Route path="/order/detail" component={Admin}></Route>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter