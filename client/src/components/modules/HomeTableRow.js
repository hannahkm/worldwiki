import React, { Component } from 'react'
import { Link } from '@reach/router'
import { get } from '../../utilities'

import './HomeTableRow.css'

class HomeTableRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
    console.log(this.props.worldId)
    get('/api/getOrCreateBlankWorld', { worldId: this.props.worldId }).then((world) => this.setState({ world }))
  }

  render () {
    if (!this.state.world) {
      return (<></>)
    }
    return (
      <Link to={`/page/${this.state.world.pageName}`} className="HomeTableRow-Link HomeTableRow-Container">
          <div className="HomeTableRow-WorldName">{this.state.world.pageName}</div>
          <div className="HomeTableRow-WorldInfo">{this.state.world.pageDescription}</div>
      </Link>
    )
  }
}

export default HomeTableRow
