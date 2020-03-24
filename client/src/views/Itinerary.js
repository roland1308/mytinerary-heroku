import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import ActivityCarousel from "./ActivityCarousel";
import Loading from "../components/Loading";

import { fetchOneCityId } from "../store/actions/cityActions";
import { fetchItinerary } from "../store/actions/itineraryActions";
import { fetchActivities } from "../store/actions/activityActions";
import {
  homeOn,
  backOn,
  searchOff,
  setFavorite
} from "../store/actions/appActions";
import { checkToken } from "../store/actions/userActions";

import { connect } from "react-redux";

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: [],
      cityId: ""
    };
  }

  componentDidMount() {
    const token = window.localStorage.token;
    if (!this.props.loggedIn && token) {
      this.props.dispatch(checkToken(token));
    }
    let fetchId = this.props.match.params.idcitta;
    if (fetchId) {
      window.localStorage.setItem("idcitta", fetchId);
    } else if (window.localStorage.idcitta) {
      fetchId = window.localStorage.idcitta;
    } else {
      this.props.history.push("/");
    }
    this.props.dispatch(fetchOneCityId(fetchId));
    this.props.dispatch(fetchItinerary(fetchId));
    this.props.dispatch(homeOn());
    this.props.dispatch(backOn());
    this.props.dispatch(searchOff());
    this.setState({
      cityId: fetchId
    });
  }

  componentWillUnmount() {
    window.localStorage.removeItem("idcitta");
  }

  handleActivity = (itinerary, i) => {
    this.props.dispatch(fetchActivities(itinerary));
    let show = [];
    show[i] = true;
    this.setState({
      showAll: show
    });
    const { user } = this.props;
    let flag = null;
    if (user.favorites) {
      flag =
        user.favorites.includes(itinerary) ||
        user.favorites.some(favorite => favorite._id === itinerary);
    }
    this.props.dispatch(setFavorite(flag));
  };

  handleActivityClose = () => {
    this.setState({
      showAll: []
    });
  };

  render() {
    const { loadingItin, errorItin, itineraries, selectedCity } = this.props;
    const { errorAct, loadingAct } = this.props;
    const { errorCit } = this.props;
    if (errorItin || errorAct || errorCit) {
      return (
        <div>
          Error!
          {errorItin} , {errorAct} , {errorCit}
        </div>
      );
    }
    if (loadingItin) {
      return <Loading />;
    }
    return (
      <div className="itinerary">
        <div
          className="single"
          style={{ backgroundImage: "url(" + selectedCity.url + ")" }}
        >
          <p className="nomeCitta">{selectedCity.name}</p>
        </div>
        <h2 className="padding17">Available MYtineraries</h2>
        {itineraries.map((itinerary, i) => {
          return (
            <div key={i}>
              <div className="row">
                <div className="col-sm-4 avatar">
                  <Avatar alt={itinerary.username} src={itinerary.photo} />
                  <div>{itinerary.username}</div>
                </div>
                <div className="col-sm-8 avatar">
                  <div>{itinerary.name}</div>
                  <div className="row">
                    <div className="col-sm-4">Rate: {itinerary.rating}</div>
                    <div className="col-sm-4">Hours:{itinerary.duration}</div>
                    <div className="col-sm-4">Price: {itinerary.price}</div>
                  </div>
                  <div>{itinerary.hashtags}</div>
                </div>
              </div>
              <h3 className="padding17">Traveler's Comments</h3>
              {!loadingItin &&
                itinerary.comments.map((comment, i) => {
                  return (
                    <div key={i} className="row commentContainer" id={i}>
                      <h3 className="col-sm-10 comment">
                        "{comment.usercomment}"
                      </h3>
                      <div className="col-sm-2 avatarComment">
                        <Avatar alt={comment.username} src={comment.picture} />
                        <h4>{comment.username}</h4>
                      </div>
                    </div>
                  );
                })}
              {!this.state.showAll[i] && (
                <Button
                  className="openingButton"
                  variant="contained"
                  onClick={() => this.handleActivity(itinerary._id, i)}
                >
                  View all activities
                </Button>
              )}
              {this.state.showAll[i] && !loadingAct && (
                <div>
                  <ActivityCarousel />
                  <Button
                    className="closingButton"
                    variant="contained"
                    size="large"
                    onClick={this.handleActivityClose}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCity: state.cities.selectedCity,
  itineraries: state.itineraries.items,
  errorItin: state.itineraries.errorItin,
  loadingItin: state.itineraries.loadingItin,
  loadingAct: state.activities.loadingAct,
  errorAct: state.activities.errorAct,
  errorCit: state.cities.error,
  errorlogging: state.users.errorlogging,
  loggedIn: state.users.loggedIn,
  itinerary_id: state.activities.itinerary_id,
  user: state.users.user,
  commentId: state.comments.commentId
});

export default connect(mapStateToProps)(Itinerary);
