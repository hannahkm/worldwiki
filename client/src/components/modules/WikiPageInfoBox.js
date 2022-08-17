import React, { Component } from 'react'

import './WikiPageInfoBox.css'

class WikiPageInfoBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
  }

  render () {
    if (!this.state.world || this.state.world.infoBox.length == 0) {
      return (
        <></>
      )
    }
    return (
      <>
        {this.state.world.infoBox.infoSections.map((section) => (
          <div>
            <h1 className="WikiPageInfoBox-SectionHeader">{section.sectionName}</h1>
            <div className="WikiPageInfoBox-SectionContent">
              {section.sectionContent.map((_content) => (
                <div className="WikiPageInfoBox-SectionContentRow">
                  <div className="WikiPageInfoBox-SectionContentLabel">label here</div>
                  <div className="WikiPageInfoBox-SectionContentValue">value here</div>
                </div>
              ))}
            </div>
          </div>
        ))

        }
      </>
    )
  }
}

export default WikiPageInfoBox
