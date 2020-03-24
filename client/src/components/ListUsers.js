import React from 'react'
import { fetchUsers } from '../store/actions/userActions';
import { connect } from "react-redux";
import Loading from "../components/Loading";


class ListUsers extends React.Component {

componentDidMount() {
    this.props.dispatch(fetchUsers());
}

    render() {
    const { error, loading, items } = this.props;
    if (error) {
        return <div>Error! {error.message}</div>;
      }
      if (loading) {
        return <Loading />;
      }
    return (
        <div>
            <ol>
                {items.map((user, i) => {
                return (
                    <li key={i}>{user.username}</li>
                )}
                 ) }
            </ol>
        </div>
    )
}
}

const mapStateToProps = state => ({
    items: state.users.items,
    error: state.users.error,
    loading: state.users.loading
  });
  
  export default connect(mapStateToProps)(ListUsers);
  