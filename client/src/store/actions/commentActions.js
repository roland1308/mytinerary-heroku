export const ADD_COMMENT_BEGIN = "ADD_COMMENT_BEGIN";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LIST_COMMENT_BEGIN = "LIST_COMMENT_BEGIN";
export const LIST_COMMENT_SUCCESS = "LIST_COMMENT_SUCCESS";
export const LIST_COMMENT_FAILURE = "LIST_COMMENT_FAILURE";
export const COMMENT_PULL_SUCCESS = "COMMENT_PULL_SUCCESS";

const axios = require("axios");

export const addComment = comment => {
  return async dispatch => {
    try {
      dispatch(addCommentBegin());
      const response = await axios.post("/comments/add", comment, {
        headers: {
          authorization: `bearer ${comment.token}`
        }
      });
      if (response.data.name === "MongoError") {
        dispatch(addCommentFailure(response.data.errmsg));
      } else {
        dispatch(addCommentSuccess(response.data));
      }
    } catch (error) {
      dispatch(addCommentFailure(error.message));
    }
    return "done";
  };
};

export const addCommentBegin = () => ({
  type: ADD_COMMENT_BEGIN
});
export const addCommentSuccess = commentId => ({
  type: ADD_COMMENT_SUCCESS,
  payload: commentId
});
export const addCommentFailure = error => ({
  type: ADD_COMMENT_FAILURE,
  payload: {
    error
  }
});

export const pullComment = payload => {
  return async dispatch => {
    try {
      const response = await axios.put("/comments/pullcomment", payload, {
        headers: {
          authorization: `bearer ${payload.token}`
        }
      });
      if (response.data.name === "MongoError") {
        dispatch(listCommentFailure(response.data.errmsg));
      } else {
        dispatch(commentPullSuccess(payload.comment_id));
      }
    } catch (error) {
      dispatch(listCommentFailure(error.message));
      console.log(error.message);
    }
    return "done";
  };
};

export const commentPullSuccess = comment => ({
  type: COMMENT_PULL_SUCCESS,
  payload: comment
});

export const listComment = token => {
  return async dispatch => {
    try {
      dispatch(listCommentBegin());
      const response = await axios.get(`/comments/userall/` + token, {
        headers: {
          authorization: `bearer ${token}`
        }
      });
      if (response.data.name === "MongoError") {
        dispatch(listCommentFailure(response.data.errmsg));
      } else {
        dispatch(listCommentSuccess(response.data));
      }
    } catch (error) {
      dispatch(addCommentFailure(error.message));
    }
    return "done";
  };
};

export const listCommentBegin = () => ({
  type: LIST_COMMENT_BEGIN
});
export const listCommentSuccess = user => ({
  type: LIST_COMMENT_SUCCESS,
  payload: user
});
export const listCommentFailure = error => ({
  type: LIST_COMMENT_FAILURE,
  payload: {
    error
  }
});