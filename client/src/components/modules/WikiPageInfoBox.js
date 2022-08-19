import React, { Component } from 'react'
import { get } from '../../utilities'

import './WikiPageInfoBox.css'

class WikiPageInfoBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined,
      worldInfoSections: {}
    }
  }

  componentDidMount () {
    get('/api/getOrCreateBlankWorld', { worldId: this.props.page }).then((world) => {
      this.setState({
        world,
        worldInfoSections: Object.entries(world.infoBox.infoSections)
      })
    })
  }

  render () {
    if (!this.state.world || this.state.worldInfoSections.length === 0) {
      return (
        <></>
      )
    }
    return (
      <div className="WikiPageInfoBox-Container">
        <div className="WikiPageInfoBox-Heading">{this.state.world.pageName}</div>
        {this.state.worldInfoSections.map((section) => (
          <div className="WikiPageInfoBox-SectionRow" key={section[0]}>
            <div className="WikiPageInfoBox-SectionContentLabel">{section[0]}</div>
            <div className="WikiPageInfoBox-SectionContentValue">{section[1]}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default WikiPageInfoBox
