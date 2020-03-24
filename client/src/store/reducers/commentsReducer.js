import { ADD_COMMENT_BEGIN } from "../actions/commentActions";
import { ADD_COMMENT_SUCCESS } from "../actions/commentActions";
import { ADD_COMMENT_FAILURE } from "../actions/commentActions";

import { LIST_COMMENT_BEGIN } from "../actions/commentActions";
import { LIST_COMMENT_SUCCESS } from "../actions/commentActions";
import { LIST_COMMENT_FAILURE } from "../actions/commentActions";
import { COMMENT_PULL_SUCCESS } from "../actions/commentActions";

const initialState = {
  errorComment: false,
  loading: true,
  errorMsg: "",
  commentId: "",
  comments: []
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_BEGIN:
    case LIST_COMMENT_BEGIN:
      return {
        ...state,
        errorComment: false,
        loading: true,
        errorMsg: ""
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        errorComment: false,
        loading: false,
        errorMsg: "",
        commentId: action.payload
      };
    case ADD_COMMENT_FAILURE:
    case LIST_COMMENT_FAILURE:
      return {
        ...state,
        errorComment: true,
        loading: false,
        errorMsg: action.payload
      };

    case LIST_COMMENT_SUCCESS:
      return {
        ...state,
        errorComment: false,
        loading: false,
        errorMsg: "",
        comments: action.payload
      };

    case COMMENT_PULL_SUCCESS:
      let newComments = state.comments.filter(
        com => com._id !== action.payload
      );
      return {
        ...state,
        comments: newComments
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
