import React, { Component } from 'react'
import { get } from '../../utilities'

import '../../utilities.css'
import './ComingSoon.css'

class ComingSoon extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    document.title = 'Page Coming Soon'
  }

  render () {
    return (
        <></>
    )
  }
}

export default ComingSoon
