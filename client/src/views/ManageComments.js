import React from "react";
import { connect } from "react-redux";

import { FaTrashAlt } from "react-icons/fa";

import Loading from "../components/Loading";

import { checkToken } from "../store/actions/userActions";
import { listComment, pullComment } from "../store/actions/commentActions";
import { homeOn, backOn, searchOff } from "../store/actions/appActions";
import { pullCommentId } from "../store/actions/itineraryActions";

class ManageComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trashClass: []
        };
    }
    componentDidMount() {
        const token = window.localStorage.token;
        this.props.dispatch(checkToken(token));
        this.props.dispatch(listComment(token))
        this.props.dispatch(homeOn());
        this.props.dispatch(backOn());
        this.props.dispatch(searchOff());
    }

    handleComment(comment_id, i) {
        let newClass = this.state.trashClass;
        newClass[i] = "rubberBand";
        this.setState({
            trashClass: newClass
        });
        const payload = {
            token: window.localStorage.token,
            comment_id
        };
        this.props.dispatch(pullComment(payload));
        this.props.dispatch(pullCommentId(payload));
    }

    render() {
        const { comments, loading } = this.props;
        if (loading) {
            return <Loading />;
        }
        return (
            <div className="itinerary">
                <h2 className="padding17">These are your Comments</h2>
                {comments.map((comment, i) => {
                    return (
                        <div key={i} className="row" id={i}>
                            <div className="col-sm-11 commentContainerNoMargin">
                                <h3 className="col-sm-12 comment">"{comment.usercomment}"</h3>
                            </div>
                            <div className="col-sm-1 trashIcon">
                                <FaTrashAlt className={this.state.trashClass[i]}
                                    onClick={() => this.handleComment(comment._id, i)}
                                />
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
    comments: state.comments.comments,
    loading: state.comments.loading,
    itinerary_id: state.activities.itinerary_id
});

export default connect(mapStateToProps)(ManageComments);
