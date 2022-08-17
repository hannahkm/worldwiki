import React, { Component } from 'react'
import NavBar from './modules/NavBar.js'
import { Router } from '@reach/router'
import About from './pages/About.js'
import ComingSoon from './pages/ComingSoon.js'
import CreateWorld from './pages/CreateWorld.js'
import EditProfile from './pages/EditProfile.js'
import Home from './pages/Home.js'
import NotFound from './pages/NotFound.js'
import Profile from './pages/Profile.js'
import WikiPage from './pages/WikiPage.js'

import { get, post } from '../utilities'

// to use styles, import the necessary CSS files
import '../utilities.css'
import './App.css'

const GOOGLE_CLIENT_ID = '1021537647679-mvm4cegnprshnc2voqkbcsba8la04ji7.apps.googleusercontent.com'

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor (props) {
    super(props)
    this.state = {
      userId: undefined
    }
  }

  componentDidMount () {
    get('/api/whoami').then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id })
      }
    })
  }

  handleLogin = (res) => {
    console.log(res)
    post('/api/login', { token: res.credential }).then((user) => {
      console.log(`Logged in as ${user.name}`)
      this.setState({ userId: user._id })
    })
  }

  handleLogout = () => {
    this.setState({ userId: undefined })
    post('/api/logout')
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render () {
    return (
      <>
        {this.state.userId
          ? <NavBar
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
            GOOGLE_CLIENT_ID={GOOGLE_CLIENT_ID}
          />
          : null
        }
        <div className="App-container">
          <Router>
            <Home path="/" userId={this.state.userId} handleLogin={this.handleLogin} GOOGLE_CLIENT_ID={GOOGLE_CLIENT_ID} />
            <About path="/about/" />
            <ComingSoon path="/comingSoon/" />
            <Profile path="/profile/:userId" />
            <EditProfile path="/editProfile/:userId"/>
            <CreateWorld path="/newWorld/" userId={this.state.userId} />
            <WikiPage path="/page/:pageName"/>
            <NotFound default />
          </Router>
        </div>
      </>
    )
  }
}

export default App
