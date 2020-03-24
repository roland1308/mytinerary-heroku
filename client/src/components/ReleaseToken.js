import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

import { logInAppOff } from "../store/actions/appActions";
import { logInUserOff } from "../store/actions/userActions";

const history = require("browser-history");

class ReleaseToken extends Component {
  logOut = () => {
    this.props.dispatch(logInUserOff());
    this.props.dispatch(logInAppOff());
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("idcitta", "");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="emptyWindow">
        <div className="backgroundGrey">
          <div className="popupInput">
            <h1>
              Are you sure to
              <br />
              LOG OUT?
            </h1>
            <Button
              startIcon={<ThumbUpAltIcon className="yesButton" />}
              onClick={this.logOut}
              size="large"
              variant="contained"
            >
              Yes please.
            </Button>
            <Button
              startIcon={<ThumbDownAltIcon className="noButton" />}
              onClick={() => history(-1)}
              size="large"
              variant="contained"
            >
              NO thanx!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ReleaseToken);
