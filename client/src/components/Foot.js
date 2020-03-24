import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import ArrowBackIosTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";

class Foot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const history = require("browser-history");
    const { goPrev } = this.props;
    return (
      <div className="row">
        <div className="col-sm-4">
          {goPrev && (
            <ArrowBackIosTwoToneIcon
              style={{ fontSize: 100 }}
              onClick={() => history(-1)}
            />
          )}
        </div>
        <div className="col-sm-4 home">
          <Link to={"/"}>
            <HomeTwoToneIcon style={{ fontSize: 100 }} />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  goPrev: state.app.goPrev
});

export default connect(mapStateToProps)(Foot);
