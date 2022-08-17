import React, { Component } from 'react'

import '../../utilities.css'
import './WikiPage.css'
import WikiPageSection from '../modules/WikiPageSection.js'
import WikiPageInfoBox from '../modules/WikiPageInfoBox.js'
import WikiPageToC from '../modules/WikiPageToC.js'

class WikiPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
    document.title = 'Wiki Page'
  }

  render () {
    if (!this.state.world) {
      return (
        <>Loading...</>
      )
    }
    return (
        <>
          <div className="WikiPage-Heading">
            <h1 className="WikiPage-PageName">{this.state.world.name}</h1>
            <div className="WikiPage-EditButton">[Edit]</div>
            <hr/>
            <p className="WikiPage-Author">From WikiWorld, by {this.state.world.author}</p>
          </div>
          <div className="WikiPage-IntroContent">
            <div className="WikiPage-IntroContentLeft">
              <div className="WikiPage-IntroDescription"></div>
              <WikiPageToC page={this.state.world} class="WikiPage-ToC"/>
            </div>
            <WikiPageInfoBox page={this.state.world} class="WikiPage-InfoBox"/>
          </div>
          <div className="WikiPage-Content">
            {this.state.world.sections.map((section) => (
              <WikiPageSection section={section} id={section.name}/>
            ))}
          </div>
        </>
    )
  }
}

export default WikiPage
