import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { checkToken } from "../store/actions/userActions";

import { connect } from "react-redux";

class ActivityCard extends React.Component {
  render() {
    if (!this.props.loggedIn && window.localStorage.token) {
      const token = window.localStorage.token;
      this.props.dispatch(checkToken(token));
    }
    const { activities } = this.props;
    return (
      <div className="itinerary">
        {activities.map((activity, i) => {
          return (
            <div key={i} className="activityCard">
              <Card className="activityCard">
                <CardMedia
                  component="img"
                  alt={activity.name}
                  height="200"
                  image={activity.photo}
                  title={activity.name}
                />
                <CardContent>
                  <h1>{activity.name}</h1>
                  <h2>"{activity.comments}"</h2>
                  <h3>Address: {activity.address}</h3>
                  <h3>Duration (hrs): {activity.time}</h3>
                  <h3>Approximate cost: {activity.cost}</h3>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities.items,
  loggedIn: state.users.loggedIn
});

export default connect(mapStateToProps)(ActivityCard);
