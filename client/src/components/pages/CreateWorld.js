import React, { Component } from 'react'

import '../../utilities.css'
import './CreateWorld.css'

import CreateWorldNewSection from '../modules/CreateWorldNewSection.js'
import CreateWorldNewInfoBoxSection from '../modules/CreateWorldNewInfoBoxSection.js'

class CreateWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {
      world: undefined
    }
  }

  componentDidMount () {
    document.title = 'Create World'
  }

  render () {
    return (
        <>
          <h1 className="CreateWorld-PageTitle">Creating New World...</h1>
          <form>
            <label>
              Page Name:
              <input type="text" name="pageName"/>
            </label>
            <label>
              Description:
              <input type="text" name="pageDescription"/>
            </label>
            <div className="CreateWorld-SectionsHeading">
              <div className="CreateWorld-SectionsTitle">Sections:</div>
              <button className="CreateWorld-NewSectionButton">New Section</button>
            </div>
            <div className="CreateWorld-Sections">
              {this.state.world
                ? this.state.world.sections.map((section) => (
                  <CreateWorldNewSection section={section}/>
                ))
                : null}
            </div>
            <div className="CreateWorld-InfoBoxHeading">
              <div className="CreateWorld-InfoBoxTitle">Info Box:</div>
              <button className="CreateWorld-NewInfoBoxSection">New Section</button>
            </div>
            <div className="CreateWorld-InfoBoxSections">
              {this.state.world
                ? this.state.world.sections.map((section) => (
                  <CreateWorldNewInfoBoxSection section={section}/>
                ))
                : null}
            </div>
            <input type="submit" value="Submit" />
          </form>
        </>
    )
  }
}

export default CreateWorld
