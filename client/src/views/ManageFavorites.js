import React from "react";
import { connect } from "react-redux";

import Loading from "../components/Loading";

import { MdFavorite } from "react-icons/md";

import { homeOn, backOn, searchOff } from "../store/actions/appActions";
import { getFavorite, pullFavorite, checkToken } from "../store/actions/userActions";

class ManageFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //In this case, favorite flag works opposite: FALSE = YES, FAVORITE
      NOTFavoritesFlag: [],
      refresh: false
    };
  }
  componentDidMount() {
    const token = window.localStorage.token;
    this.props.dispatch(checkToken(token));
    this.props.dispatch(homeOn());
    this.props.dispatch(backOn());
    this.props.dispatch(searchOff());
    this.props.dispatch(getFavorite(token));
  }

  handleFavorite = i => {
    // Toggle favoriteFlag and pushes/pulls the ID from favorites
    const { user } = this.props;
    const token = window.localStorage.token;
    let user_itin = {
      itinerary_id: user.favorites[i]._id,
      token
    };
    // if (!this.state.NOTFavoritesFlag[i]) {
    this.props.dispatch(pullFavorite(user_itin));
    // } else {
    //   this.props.dispatch(pushFavorite(user_itin));
    // }
    // let fav = this.state.NOTFavoritesFlag;
    // fav[i] = !fav[i];
    this.setState({
      //   NOTFavoritesFlag: fav,
      refresh: !this.state.refresh
    });
    this.props.dispatch(getFavorite(token));
  };

  render() {
    const { user, loading, loadingFav } = this.props;
    const redColor = { color: "red" };
    if (loading || loadingFav || !user) {
      return <Loading />;
    }
    return (
      <div className="itinerary">
        {user.favorites.map((itinerary, i) => {
          return (
            <div key={i} className="manageFavorites">
              <h2 className="padding17">{itinerary.city}</h2>
              <div className="row">
                <div className="col-sm-10 avatar">
                  <div>{itinerary.name}</div>
                  <div className="row">
                    <div className="col-sm-4">Rate: {itinerary.rating}</div>
                    <div className="col-sm-4">Hours:{itinerary.duration}</div>
                    <div className="col-sm-4">Price: {itinerary.price}</div>
                  </div>
                  <div>{itinerary.hashtags}</div>
                </div>
                <div className="col-sm-2 favoriteIcon">
                  <MdFavorite
                    className="beatingHeart"
                    style={redColor}
                    onClick={() => this.handleFavorite(i)}
                  />
                </div>
                {/* <div className="col-sm-2">
                  {!this.state.NOTFavoritesFlag[i] &&
                    this.state.refresh !== null ? (
                      <img
                        className="favoriteIcon"
                        src={require("../images/heart.png")}
                        alt="I LOVE"
                        onClick={() => this.handleFavorite(i)}
                      />
                    ) : (
                      <img
                        className="favoriteIcon"
                        src={require("../images/heart-broken.png")}
                        alt="I LOVE"
                        onClick={() => this.handleFavorite(i)}
                      />
                    )}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  loggedIn: state.users.loggedIn,
  loading: state.users.loading,
  loadingFav: state.users.loadingFav
});

export default connect(mapStateToProps)(ManageFavorites);
