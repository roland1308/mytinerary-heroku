import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";

import { IconContext } from "react-icons";
import { MdFavorite } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";

import { addComment } from "../store/actions/commentActions";
import {
  addCommentId,
  pushCommentToStore
} from "../store/actions/itineraryActions";
import { fetchOneCityId } from "../store/actions/cityActions";
import { pushFavorite, pullFavorite } from "../store/actions/userActions";
import { setFavorite } from "../store/actions/appActions";

class ActivityCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  handleComment = event => {
    this.setState({
      comment: event.target.value
    });
  };

  handleAddComment = () => {
    if (this.state.comment) {
      const { itinerary_id } = this.props;
      const token = window.localStorage.token;
      this.props.dispatch(
        addComment({
          token,
          usercomment: this.state.comment,
          itineraryid: itinerary_id
        })
      );
    }
  };

  handleFavorite = () => {
    // Toggle favoriteFlag and pushes/pulls the ID from favorites
    const { favoriteFlag, itinerary_id } = this.props;
    const token = window.localStorage.token;
    let user_itin = {
      itinerary_id,
      token
    };
    if (favoriteFlag) {
      this.props.dispatch(pullFavorite(user_itin));
    } else {
      this.props.dispatch(pushFavorite(user_itin));
    }
    this.props.dispatch(setFavorite(!favoriteFlag));
  };

  componentDidUpdate(prevProps) {
    const { errorComment, itinerary_id, commentId } = this.props;
    const { username, picture } = this.props.user;
    if (commentId !== prevProps.commentId) {
      if (!errorComment) {
        this.props.dispatch(addCommentId({ itinerary_id, commentId }));
        let commentToPush = {
          id: commentId,
          username: username,
          picture: picture,
          usercomment: this.state.comment
        };
        this.props.dispatch(
          pushCommentToStore({ itinerary_id, commentToPush })
        );
        this.setState({
          comment: ""
        });
        const fetchId = window.localStorage.idcitta;
        this.props.dispatch(fetchOneCityId(fetchId));
      }
    }
  }

  render() {
    const { activities, loggedIn } = this.props;
    const { favoriteFlag } = this.props;
    const settings = {
      dots: true,
      className: "center innerSlide",
      centerMode: false,
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 2,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 500
    };
    const divStyle = {
      height: loggedIn ? "450px" : "11vh"
    };

    const sendColor =
      this.state.comment === ""
        ? { color: "grey" }
        : { color: "rgb(46, 46, 202)" };

    const redColor = { color: "red" };
    const greyColor = { color: "grey" };
    return (
      <div style={divStyle}>
        <Slider {...settings}>
          {activities.map((activity, i) => {
            return (
              <div key={i}>
                <Link className="linkNoDecoration" to={"/activitycard"}>
                  <div
                    className="activity"
                    style={{ backgroundImage: "url(" + activity.photo + ")" }}
                  >
                    <p className="nomeActivity">{activity.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
        {loggedIn && (
          <div className="commentItinerary row">
            <div className="col-sm-10">
              <TextField
                multiline
                rowsMax="4"
                id="standard-comment"
                label="Comment this Itinerary"
                variant="outlined"
                value={this.state.comment}
                fullWidth
                onChange={this.handleComment}
              />
            </div>
            <div className="col-sm-2">
              <div className="row activityOpt">
                <IconContext.Provider value={{ className: "activityIcon" }}>
                  <MdSend style={sendColor} onClick={this.handleAddComment} />
                  {favoriteFlag && (
                    <MdFavorite
                      className="beatingHeartComment"
                      style={redColor}
                      onClick={this.handleFavorite}
                    />
                  )}
                  {!favoriteFlag && (
                    <MdFavorite
                      style={greyColor}
                      onClick={this.handleFavorite}
                    />
                  )}
                  <MdStarBorder />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities.items,
  itinerary_id: state.activities.itinerary_id,
  loggedIn: state.users.loggedIn,
  user: state.users.user,
  commentId: state.comments.commentId,
  errorComment: state.comments.errorComment,
  loading: state.comments.loading,
  errorMsg: state.comments.errorMsg,
  favoriteFlag: state.app.favoriteFlag
});

export default connect(mapStateToProps)(ActivityCarousel);
