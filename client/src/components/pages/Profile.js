import React, { Component } from 'react'
import { get } from '../../utilities'

import '../../utilities.css'
import './Profile.css'
import ProfileInfoBox from '../modules/ProfileInfoBox.js'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  componentDidMount () {
    document.title = 'Profile Page'
    get('/api/user', { userid: this.props.userId }).then((user) => this.setState({ user }))
  }

  render () {
    if (!this.state.user) {
      return <div> Loading... </div>
    }
    return (
      <>
        <div className="Profile-Heading">
          <h1 className="Profile-UserName">{this.state.user.name}</h1>
          <div className="Profile-EditButton">[Edit]</div>
            <hr/>
          </div>
          <div className="Profile-IntroContent">
            <div className="Profile-IntroContentLeft">
              <div className="Profile-IntroDescription"></div>
            </div>
            <ProfileInfoBox user={this.state.user} class="Profile-InfoBox"/>
          </div>
        <div className="Profile-Content"></div>
      </>
    )
  }
}

export default Profile
