import React, { Component } from 'react'
import { get } from '../../utilities'

import './WikiPageToC.css'

class WikiPageToC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined,
      worldSections: {}
    }
  }

  componentDidMount () {
    get('/api/getOrCreateBlankWorld', { worldId: this.props.page }).then((world) => {
      this.setState({
        world,
        worldSections: Object.entries(world.sections)
      })
    })
  }

  render () {
    if (!this.state.world || this.state.worldSections.length === 0) {
      return (
        <></>
      )
    }
    return (
      <div className="WikiPageToC-Container">
        <div className="WikiPageToC-Heading">Contents</div>
        {this.state.worldSections.map((section, index) => (
          <div className="WikiPageToC-Section" key={section[0]}>{index + 1} {section[0]}</div>
        ))}
      </div>
    )
  }
}

export default WikiPageToC
