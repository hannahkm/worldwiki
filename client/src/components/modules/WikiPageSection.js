import React, { Component } from 'react'

import './WikiPageSection.css'

class WikiPageSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      section: undefined
    }
  }

  componentDidMount () {
  }

  render () {
    if (!this.state.section) {
      return (
        <></>
      )
    }
    return (
      <>
        <div className="WikiPageSection-Heading">
          <h1 className="WikiPageSection-SectionName">{this.state.section.sectionName}</h1>
          <div className="WikiPageSection-EditButton">[Edit]</div>
          <hr/>
        </div>
        <div className="WikiPageSection-Content">{this.state.section.sectionContent}</div>
      </>
    )
  }
}

export default WikiPageSection
