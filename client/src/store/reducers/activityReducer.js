import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,
  STORE_ITINERARY_ID
} from "../actions/activityActions";

const initialState = {
  items: [],
  itinerary_id: "",
  loadingAct: false,
  errorAct: null
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITY_BEGIN:
      return {
        ...state,
        loadingAct: true,
        errorAct: null
      };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        loadingAct: false,
        items: action.payload.activity
      };
    case FETCH_ACTIVITY_FAILURE:
      return {
        ...state,
        loadingAct: false,
        errorAct: true,
        items: [{}]
      };

    case STORE_ITINERARY_ID:
      return {
        ...state,
        itinerary_id: action.payload
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
