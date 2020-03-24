import React from "react";
import { homeOn, backOn, searchOff } from "../store/actions/appActions";
import { loginUser, logInUserOff } from "../store/actions/userActions";

import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PopUp from "../components/PopUp";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pw: "",
      fixedHeight: 200
    };
  }
  componentDidMount() {
    this.setState({
      fixedHeight: window.innerHeight * 0.86
    });
    this.props.dispatch(homeOn());
    this.props.dispatch(backOn());
    this.props.dispatch(searchOff());
  }

  handleChange = e => {
    switch (e.target.name) {
      case "username":
        const capitalize = e.target.value.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        this.setState({ username: capitalize });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state));
  };

  closeError = () => {
    this.props.dispatch(logInUserOff());
  };

  render() {
    const { loggedIn, popup } = this.props;
    const accountDivStyle = {
      height: this.state.fixedHeight.toString() + "px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "flex-start",
      fontSize: "3rem"
    };
    return (
      <div style={accountDivStyle}>
        <h1>Login</h1>
        <form className="accountForm" onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              autoFocus={true}
              type="text"
              value={this.state.username}
              required="required"
              name="username"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={this.state.pw}
              required="required"
              name="pw"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
        <h1>or you can use:</h1>
        <div className="row">
          <div className="col-sm">
            <a
              className="linkNoDecoration"
              href="https://agile-retreat-64885.herokuapp.com/users/google"
            >
              <img
                className="login_Logo"
                src={require("../images/googlelogo.jpg")}
                alt="GOOGLE SIGN UP"
              />
            </a>
          </div>
          <div className="col-sm">
            <a
              className="linkNoDecoration"
              href="https://agile-retreat-64885.herokuapp.com/users/github"
            >
              <img
                className="login_Logo"
                src={require("../images/githublogo.jpg")}
                alt="GOOGLE SIGN UP"
              />
            </a>
          </div>
        </div>

        {popup && (
          <PopUp
            h1="Sorry: unknown credentials!"
            newPage="/login"
            button="close"
          />
          // <div className="backgroundGrey">
          //   <div className="popupInput">
          //     <h1>Sorry: unknown credentials!</h1>
          //     <Button
          //       onClick={this.closeError}
          //       size="large"
          //       variant="contained"
          //     >
          //       close
          //     </Button>
          //   </div>
          // </div>
        )}
        {loggedIn && (
          <div className="backgroundGrey">
            <div className="popupInput">
              <h1>GREAT! You are logged in!</h1>
              <Link to="/">
                <Button size="large" variant="contained">
                  home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMsg: state.users.errorMsg,
  popup: state.users.popup,
  loggedIn: state.users.loggedIn,
  token: state.users.token
});

export default connect(mapStateToProps)(LogIn);
