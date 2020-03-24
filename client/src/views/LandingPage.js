import React from "react";

import start from "../images/circled-right-2.png";
import Carousel from "../views/Carousel";
import Logo from "../components/Logo";
import Loading from "../components/Loading";

import { Link } from "react-router-dom";

import { homeOff, searchOff } from "../store/actions/appActions";
import { checkToken } from "../store/actions/userActions";

import { connect } from "react-redux";

class LandingPage extends React.Component {
  componentDidMount = () => {
    if (!this.props.loggedIn && window.localStorage.token) {
      const token = window.localStorage.token;
      this.props.dispatch(checkToken(token));
    }
    this.props.dispatch(homeOff());
    this.props.dispatch(searchOff());
  };

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="landing">
        <Logo />
        <div>
          <h2>
            Find your perfect trip, designed by insiders who know and love their
            cities.
          </h2>
        </div>
        <Link to="./cities" className="linkNoDecoration">
          <div>
            <h1 className="linkNoDecoration">Start Browsing</h1>
          </div>
          <div>
            <img className="button" src={start} alt="Start Browsing" />
          </div>
        </Link>
        <Carousel />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorlogging: state.users.errorlogging,
  loading: state.users.loading,
  loggedIn: state.users.loggedIn
});

export default connect(mapStateToProps)(LandingPage);
