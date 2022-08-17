import React, { Component } from 'react'
import { Link } from '@reach/router'

import './HomeTableRow.css'

class HomeTableRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
    console.log(this.props.world)
    this.setState({ world: this.props.world })
    // get(`/api/world`, {}).then((world) => this.setState({world: world}));
  }

  render () {
    if (!this.state.world) {
      return (<></>)
    }
    return (
      <Link to={`/page/${this.state.world.name}`} class="HomeTableRow-Link HomeTableRow-Container">
          <div className="HomeTableRow-WorldName">{this.state.world.name}</div>
          <div className="HomeTableRow-WorldInfo">{this.state.world.description}</div>
      </Link>
    )
  }
}

export default HomeTableRow
