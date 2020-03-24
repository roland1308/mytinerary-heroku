import React from "react";
import TextField from "@material-ui/core/TextField";

import { setCampoCerca } from "../store/actions/appActions";

import { connect } from "react-redux";

class SearchBar extends React.Component {
  componentDidMount() {
    this.props.dispatch(setCampoCerca(""));
  }

  handleSearch = e => {
    this.props.dispatch(setCampoCerca(e.target.value.toLowerCase()));
  };

  render() {
    return (
      <div className="searchCity">
        <TextField
          id="standard-search"
          label="Choose a City or FIND one"
          type="search"
          variant="outlined"
          fullWidth
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cities.items,
  loading: state.cities.loading,
  error: state.cities.error,
  homeLink: state.app.homeLink
});

export default connect(mapStateToProps)(SearchBar);
