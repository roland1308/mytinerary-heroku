import {
  FETCH_ITINERARY_BEGIN,
  FETCH_ITINERARY_SUCCESS,
  FETCH_ITINERARY_FAILURE,
  PUSH_COMMENT
} from "../actions/itineraryActions";

const initialState = {
  items: [],
  loadingItin: false,
  errorItin: null
};

export default function itineraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARY_BEGIN:
      // Mark the state as "loadingItin" so we can show a spinner or something
      // Also, reset any errorItins. We're starting fresh.
      return {
        ...state,
        loadingItin: true,
        errorItin: null
      };

    case FETCH_ITINERARY_SUCCESS:
      // All done: set loadingItin "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loadingItin: false,
        errorItin: false,
        items: action.payload.itinerary
      };

    case FETCH_ITINERARY_FAILURE:
      // The request failed. It's done. So set loadingItin to "false".
      // Save the errorItin, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loadingItin: false,
        errorItin: true,
        items: [{}]
      };

    case PUSH_COMMENT:
      let newitems = state.items;
      let index = newitems.findIndex(
        element => element._id === action.payload.itinerary_id
      );
      newitems[index].comments = [
        ...newitems[index].comments,
        action.payload.commentToPush
      ];
      return {
        ...state,
        items: newitems
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
