import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./EditProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Edit Profile";
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

export default EditProfile;
