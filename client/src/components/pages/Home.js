import React, { Component } from 'react'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

import HomeTable from '../modules/HomeTable.js'

import './Home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  componentDidMount () {
    document.title = 'Home'
    // get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render () {
    if (!this.props.userId) {
      return (
        <GoogleOAuthProvider clientId={this.props.GOOGLE_CLIENT_ID}>
          <div className="Login-WelcomeScreen">
              <div className="Login-WelcomeMessage">Welcome to WorldWiki. Login to start creating pages.</div>
              {this.props.userId
                ? (
                  <></>
                  )
                : (
                  <div className="Login-GoogleLogin">
                    <GoogleLogin
                        onSuccess={this.props.handleLogin}
                        onError={(err) => console.log(err)}
                    />
                  </div>
                  )}
          </div>
        </GoogleOAuthProvider>
      )
    }
    return (
      <>
        <div className="Home-UserWorlds">
          <HomeTable user={this.state.user}/>
        </div>
      </>
    )
  }
}

export default Home
