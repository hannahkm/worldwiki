import React, { Component } from 'react'

import './WikiPageToC.css'

class WikiPageToC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
  }

  render () {
    if (!this.state.world || this.state.world.sections.length == 0) {
      return (
        <></>
      )
    }
    return (
      <>
        <div className="WikiPageToC-Heading">Contents</div>
        {this.state.world.sections.map((section, index) => (
          <div className="WikiPageToC-Section">${index + 1} {section.sectionName}</div>
        ))}
      </>
    )
  }
}

export default WikiPageToC
