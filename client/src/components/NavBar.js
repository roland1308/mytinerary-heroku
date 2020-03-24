import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoIosPower } from "react-icons/io";
import { FaPenNib } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import React, { Component } from "react";
import { connect } from "react-redux";

export class NavBar extends Component {
  render() {
    const { loggedIn, user } = this.props;
    return (
      <div className="flexNavbar">
        {loggedIn ? (
          <div className="dropdown">
            <Avatar
              alt={user.username}
              src={user.picture}
              data-toggle="dropdown"
            />
            <div className="dropdown-menu">
              <Link
                to={"/"}
                className="dropdown-item linkNoDecoration menuText"
              >
                Preferences <IoIosSettings />
              </Link>
              <Link
                to={"/releasetoken"}
                className="dropdown-item linkNoDecoration menuText"
              >
                Logout <IoIosPower />
              </Link>
            </div>
          </div>
        ) : (
            <div className="dropdown">
              <AccountCircleTwoToneIcon
                style={{ fontSize: 100 }}
                className="colorPrimary"
                data-toggle="dropdown"
              />
              <div className="dropdown-menu">
                <Link
                  to={"/login"}
                  className="dropdown-item linkNoDecoration menuText"
                >
                  Login <IoIosLogIn />
                </Link>
                <Link
                  to={"/createaccount"}
                  className="dropdown-item linkNoDecoration menuText"
                >
                  Register <FaPenNib />
                </Link>
              </div>
            </div>
          )}
        {loggedIn ? (
          <div className="avatarName">
            {user.username.charAt(0).toUpperCase() +
              user.username.substr(1).toLowerCase()}
          </div>
        ) : (
            <div className="accessName">Access to travel with us!</div>
          )}
        {loggedIn && (
          <div className="dropdown">
            <MenuRoundedIcon
              style={{ fontSize: 100 }}
              className="colorPrimary"
              data-toggle="dropdown"
            />
            <div className="dropdown-menu menu-left">
              <Link
                to={"/managefavorites"}
                className="dropdown-item linkNoDecoration menuText"
              >
                MYFavorites <MdFavorite />
              </Link>
              <Link
                to={"/manageComments"}
                className="dropdown-item linkNoDecoration menuText"
              >
                MYComments <FaRegComment />
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  user: state.users.user
});

export default connect(mapStateToProps)(NavBar);
