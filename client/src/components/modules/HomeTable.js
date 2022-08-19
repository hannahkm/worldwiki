import React, { Component } from 'react'
import { Link } from '@reach/router'
import { get } from '../../utilities'

import './HomeTable.css'

import HomeTableRow from './HomeTableRow.js'

class HomeTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined,
      userWorlds: []
    }
  }

  componentDidMount () {
    get('/api/whoami').then((u) => {
      this.setState({ user: u, userWorlds: u.ownedWorlds })
    })
  }

  render () {
    return (
      <>
        <div className="HomeTable-Header">
          <h1 className="HomeTable-Heading">Your Worlds</h1>
          <Link to="/newWorld">
            <button className="HomeTable-NewWorld">New World</button>
          </Link>
        </div>
        <div className="HomeTable-TableContainer">
          {this.state.userWorlds.map((worldId) => (
            <HomeTableRow worldId={worldId} key={worldId}/>
          ))}
        </div>
      </>
    )
  }
}

export default HomeTable
