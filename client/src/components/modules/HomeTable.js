import React, { Component } from 'react'
import { get } from '../../utilities'

import './HomeTable.css'

import HomeTableRow from './HomeTableRow.js'

class HomeTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined,
      userWorlds: [{
        id: 'testing',
        name: 'world name',
        description: 'hello world'
      }]
    }
  }

  componentDidMount () {
    this.setState({ user: this.props.user })
    get('/api/user/worlds', {}).then((worlds) => this.setState({ userWorlds: worlds }))
  }

  render () {
    if (this.state.userWorlds.length === 0) {
      return (
        <>
          You have not created any pages!
        </>
      )
    }
    return (
      <>
        <div className="HomeTable-Header">
          <h1 className="HomeTable-Heading">Your Worlds</h1>
          <button className="HomeTable-NewWorld">New World</button>
        </div>
        <div className="HomeTable-TableContainer">
          {this.state.userWorlds.map((world) => (
            <HomeTableRow world={world}/>
          ))}
        </div>
      </>
    )
  }
}

export default HomeTable
