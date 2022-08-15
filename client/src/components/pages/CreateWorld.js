import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./CreateWorld.css";

class CreateWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    document.title = "Create World";
  }

  render() {
    return (
        <></>
    );
  }
}

export default CreateWorld;
