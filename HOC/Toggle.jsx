import React, { Component } from "react";
import withToggle from "./withToggle";

class Toggle extends Component {
  render() {
    const { isToggled, toggle } = this.props;
    return (
      <div>
        <button onClick={toggle}>Toggle</button>
        {isToggled && <p>The content is now visible!</p>}
      </div>
    );
  }
}

export default withToggle(Toggle);
