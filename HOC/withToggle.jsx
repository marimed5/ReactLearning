import React from "react";

const withToggle = (WrappedComponent) => {
  class WithToggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggled: false,
      };
    }

    toggle = () => {
      this.setState((prevState) => ({ isToggled: !prevState.isToggled }));
      console.log("toggled through HOC");
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isToggled={this.state.isToggled}
          toggle={this.toggle}
        />
      );
    }
  }
  return WithToggle;
};

export default withToggle;
