import React, { Component } from 'react'

import './WikiPageSection.css'

class WikiPageSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sectionName: undefined,
      sectionContent: undefined
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className="WikiPageSection-Container">
        <div className="WikiPageSection-Heading">
          <h1 className="WikiPageSection-SectionName">{this.props.sectionName}</h1>
          <div className="WikiPageSection-EditButton">[Edit]</div>
        </div>
        <hr/>
        <div className="WikiPageSection-Content">{this.props.sectionContent}</div>
      </div>
    )
  }
}

export default WikiPageSection
