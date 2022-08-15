import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./WikiPage.css";

class WikiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Wiki Page";
  }

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
        <></>
    );
  }
}

export default WikiPage;
