import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
        <div>
          <ul>
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/topics">topics</Link>
            </li>
            <li>
            <Link to="/imooc">imooc</Link>
          </li>
          </ul>
          <hr />

          {this.props.children}
        </div>
    )
  }
}

export default Home
