import {
    FETCH_CITIES_BEGIN,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE,
    FETCH_ONE_CITY_SUCCESS
  } from '../actions/cityActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedCity: {}
  };
  
  export default function citiesReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_CITIES_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_CITIES_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.cities
        };
        
        case FETCH_CITIES_FAILURE:
          // The request failed. It's done. So set loading to "false".
          // Save the error, so we can display it somewhere.
          // Since it failed, we don't have items to display anymore, so set `items` empty.
          return {
            ...state,
            loading: false,
            error: true,
            items: [{}]
          };
          
          case FETCH_ONE_CITY_SUCCESS:
            return {
              ...state,
              loading: false,
              selectedCity: action.payload.city
            };

            default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  