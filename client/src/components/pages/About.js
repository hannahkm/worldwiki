import React, { Component } from 'react'

import '../../utilities.css'
import './About.css'

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    document.title = 'About WorldWiki'
  }

  render () {
    return (
        <></>
    )
  }
}

export default About
