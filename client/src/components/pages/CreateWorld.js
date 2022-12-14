import React, { Component } from 'react'
import { navigate } from '@reach/router'
import { get, post } from '../../utilities'

import './CreateWorld.css'

import CreateWorldNewSection from '../modules/CreateWorldNewSection.js'
import CreateWorldNewInfoBoxSection from '../modules/CreateWorldNewInfoBoxSection.js'

class CreateWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {
      worldId: '',
      worldName: '',
      worldDescription: '',
      worldSections: {},
      worldInfoSections: {}
    }
    get('/api/getOrCreateBlankWorld', {
      worldId: this.props.worldId,
      userId: this.props.userId
    }).then((world) => {
      this.setState({
        worldId: world.pageId,
        worldName: world.pageName,
        worldDescription: world.pageDescription,
        worldSections: Object.entries(world.sections),
        worldInfoSections: Object.entries(world.infoBox.infoSections)
      })
    })
  }

  componentDidMount () {
    document.title = 'Create World'
  }

  handleInputChange = (e) => {
    const target = e.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleNewSection = (e) => {
    e.preventDefault()
    post('/api/world/newSection', {
      worldId: this.state.worldId,
      sectionName: 'New Section',
      sectionContent: 'Talk about anything here!'
    }).then((w) => {
      this.setState({ worldSections: Object.entries(w.sections) })
    })
  }

  handleNewInfoSection = (e) => {
    e.preventDefault()
    post('/api/world/newInfoSection', {
      worldId: this.state.worldId,
      sectionName: 'New Section',
      sectionContent: 'Say something here!'
    }).then((w) => {
      this.setState({ worldInfoSections: Object.entries(w.infoBox.infoSections) })
    })
  }

  handleSubmit = () => {
    // We only update the name and description of the world here
    // Sections and info box sections are edited in CreateWorldNewSection and
    //    CreateWorldNewInfoBoxSection respectively
    post('/api/world/editName', {
      worldId: this.state.worldId,
      worldName: this.state.worldName
    })
    post('/api/world/editDescription', {
      worldId: this.state.worldId,
      worldDescription: this.state.worldDescription
    })

    post('/api/user/addWorld', {
      userId: this.props.userId,
      worldId: this.state.worldId
    })

    navigate(`/page/${this.state.worldId}`)
  }

  render () {
    return (
        <>
          <h1 className="CreateWorld-PageTitle">Creating New World...</h1>
          <form className="CreateWorld-WorldForm">
            <label className="CreateWorld-Input">
              <div className="CreateWorld-InputLabel">Page Name:</div>
              <input className="CreateWorld-InputText" type="text" name="worldName" onChange={this.handleInputChange}/>
            </label>
            <label className="CreateWorld-Input">
              <div className="CreateWorld-InputLabel">Description:</div>
              <textarea className="CreateWorld-InputText CreateWorld-LongText" name="worldDescription" onChange={this.handleInputChange}/>
            </label>
            <div className="CreateWorld-SectionsHeading">
              <div className="CreateWorld-SectionsTitle">Sections:</div>
              <button className="CreateWorld-NewSectionButton" onClick={this.handleNewSection}>New Section</button>
            </div>
            <div className="CreateWorld-Sections">
              {this.state.worldSections.length > 0
                ? this.state.worldSections.map((section) => (
                  <CreateWorldNewSection className="CreateWorld-Section" worldId={this.state.worldId} sectionName={section[0]} sectionValue={section[1]} key={section[0]}/>
                ))
                : null}
            </div>
            <div className="CreateWorld-InfoBoxHeading">
              <div className="CreateWorld-InfoBoxTitle">Info Box:</div>
              <button className="CreateWorld-NewInfoBoxSection" onClick={this.handleNewInfoSection}>New Section</button>
            </div>
            <div className="CreateWorld-InfoBoxSections">
              {this.state.worldInfoSections.length > 0
                ? this.state.worldInfoSections.map((section) => (
                  <CreateWorldNewInfoBoxSection className="CreateWorld-InfoSection" worldId={this.state.worldId} sectionName={section[0]} sectionValue={section[1]} key={section[0]}/>
                ))
                : null}
            </div>
            <input className="CreateWorld-Button" type="submit" value="Submit" onClick={this.handleSubmit}/>
          </form>
        </>
    )
  }
}

export default CreateWorld
