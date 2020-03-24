import React from "react";

import { connect } from "react-redux";

import { homeOn, backOn, searchOff } from "../store/actions/appActions";
import {
  // addMomAvatar,
  addUser,
  resetError,
  resetPopup
} from "../store/actions/userActions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// const axios = require("axios");

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capitalize: "",
      username: "",
      email: "",
      picture: "/",
      momAvatar: "/",
      pw: "",
      favorites: [],
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
      case "selectedFile":
        this.setState({
          picture: e.target.files[0],
          momAvatar: URL.createObjectURL(e.target.files[0])
          // momAvatar: "/uploads/mom" + e.target.files[0].name
        });
        // let formPicture = new FormData();
        // formPicture.append("picture", e.target.files[0]);
        // this.props.dispatch(addMomAvatar(formPicture));
        break;
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

  handleSubmit = e => {
    /* REMOVE all MOM AVATARS */
    // axios.delete("/users/removemom");
    /* */
    e.preventDefault();
    let formResult = new FormData();
    formResult.append("username", this.state.username);
    formResult.append("email", this.state.email);
    formResult.append("picture", this.state.picture);
    formResult.append("pw", this.state.pw);
    formResult.append("favorites", this.state.favorites);
    this.props.dispatch(addUser(formResult));
  };

  closeError = () => {
    this.props.dispatch(resetError());
  };

  closeAdded = () => {
    this.props.dispatch(resetPopup());
    this.props.history.push("/");
  };

  render() {
    const { errorMsg, popup } = this.props;
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
        <h1>Create New Account</h1>
        <div className="accountAvatar">
          <Avatar
            className="big"
            alt={this.state.username}
            src={this.state.momAvatar}
          />
        </div>
        <div className="spaceBetween"></div>
        <form
          id="myForm"
          className="accountForm"
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <label>
            Username*:
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
            E-Mail Address*:
            <input
              type="email"
              value={this.state.email}
              required="required"
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              name="selectedFile"
              // value={this.state.picture}
              // required="required"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password* (at least 5 characters):
            <input
              type="password"
              value={this.state.pw}
              required="required"
              minLength="5"
              name="pw"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Register" />
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
        {errorMsg && (
          <div className="backgroundGrey">
            <div className="popupInput">
              {errorMsg.includes("username") && (
                <h1>Sorry: this username already exists!</h1>
              )}
              {errorMsg.includes("email") && (
                <h1>Sorry: this e-mail address already exists!</h1>
              )}
              <Button
                onClick={this.closeError}
                size="large"
                variant="contained"
              >
                close
              </Button>
            </div>
          </div>
        )}
        {popup && errorMsg === "" && (
          <div className="backgroundGrey">
            <div className="popupInput">
              <h1>GREAT! New user added</h1>

              <Button
                size="large"
                variant="contained"
                onClick={this.closeAdded}
              >
                home
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMsg: state.users.errorMsg,
  popup: state.users.popup
});

export default connect(mapStateToProps)(CreateAccount);
