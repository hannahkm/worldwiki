import React, { Component } from 'react'

import '../../utilities.css'
import './EditProfile.css'

class EditProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  componentDidMount () {
    document.title = 'Edit Profile'
  }

  render () {
    if (!this.state.user) {
      return <div> Loading! </div>
    }
    return (
        <form>
          <div className="EditProfile-Heading">
            <label className="EditProfile-UserName">
              Name:
              <input type="text" name="name" />
            </label>
            <hr/>
          </div>
          <div className="EditProfile-IntroContent">
            <div className="EditProfile-IntroContentLeft">
              <label className="EditProfile-IntroDescription">
                Bio:
                <input type="text" name="bio" />
              </label>
            </div>
          </div>
          <div className="EditProfile-Content"></div>
          <input type="submit" value="Submit" />
        </form>
    )
  }
}

export default EditProfile
