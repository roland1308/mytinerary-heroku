import React from "react";
import { connect } from "react-redux";
import { resetPopup } from "../store/actions/userActions";
// import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closePopup = () => {
    this.props.dispatch(resetPopup());
  };

  render() {
    return (
      <div className="backgroundGrey">
        <div className="popupInput">
          <h1>{this.props.h1}</h1>

          <Button size="large" variant="contained" onClick={this.closePopup}>
            {this.props.button}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ popup: state.users.popup });

export default connect(mapStateToProps)(PopUp);
