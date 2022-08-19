import React, { Component } from 'react'
import { get } from '../../utilities'

import '../../utilities.css'
import './WikiPage.css'
import WikiPageSection from '../modules/WikiPageSection.js'
import WikiPageInfoBox from '../modules/WikiPageInfoBox.js'
import WikiPageToC from '../modules/WikiPageToC.js'

class WikiPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined,
      worldId: '',
      worldName: 'Loading page...',
      worldSections: {},
      worldInfoSections: {},
      authorName: 'Unknown'
    }
  }

  componentDidMount () {
    get('/api/getOrCreateBlankWorld', { worldId: this.props.pageId }).then((world) => {
      this.setState({
        world,
        worldId: world.pageId,
        worldName: world.pageName,
        worldSections: Object.entries(world.sections),
        worldInfoSections: Object.entries(world.infoBox.infoSections)
      })
      document.title = this.state.worldName + ' | WorldWiki'

      get('/api/user', { userid: this.state.world.pageAuthor }).then((author) => {
        this.setState({ authorName: author.name })
      })
    })
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
            <h1 className="WikiPage-PageName">{this.state.world.pageName}</h1>
            <div className="WikiPage-EditButton">[Edit]</div>
          </div>
          <hr/>
          <div className="WikiPage-Author">From WikiWorld, by {this.state.authorName}</div>
          <div className="WikiPage-IntroContent">
            <div className="WikiPage-IntroContentLeft">
              <div className="WikiPage-IntroDescription">{this.state.world.pageDescription}</div>
              <WikiPageToC page={this.state.worldId} className="WikiPage-ToC"/>
            </div>
            <WikiPageInfoBox page={this.state.worldId} className="WikiPage-InfoBox"/>
          </div>
          <div className="WikiPage-Content">
            {this.state.worldSections.map((section) => (
                <WikiPageSection sectionName={section[0]} sectionContent={section[1]} key={section[0]}/>
            ))}
          </div>
        </>
    )
  }
}

export default WikiPage
