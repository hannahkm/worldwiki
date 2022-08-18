import React, { Component } from 'react'
import { Link } from '@reach/router'

import '../../utilities.css'
import './NavBar.css'

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">WorldWiki</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          <Link to="/about/" className="NavBar-link">
            About
          </Link>
          <Link to="/comingSoon/" className="NavBar-link">
            Explore
          </Link>
          <div className="NavBar-link">
            Logout
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
