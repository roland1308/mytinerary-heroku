import {
  HOME_ON,
  HOME_OFF,
  SEARCH_ON,
  SEARCH_OFF,
  SET_CERCA,
  BACK_ON,
  BACK_OFF,
  APP_LOGOUT,
  SET_FAVORITE
} from "../actions/appActions";

const initialState = {
  homeLink: false,
  searchDiv: false,
  campoCerca: "",
  goPrev: true,
  error: false,
  favoriteFlag: false
};

export default function popularsReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_ON:
      return {
        ...state,
        homeLink: true
      };
    case HOME_OFF:
      return {
        ...state,
        homeLink: false
      };

    case BACK_ON:
      return {
        ...state,
        goPrev: true
      };
    case BACK_OFF:
      return {
        ...state,
        goPrev: false
      };

    case SEARCH_ON:
      return {
        ...state,
        searchDiv: true
      };
    case SEARCH_OFF:
      return {
        ...state,
        searchDiv: false
      };
    case SET_CERCA:
      return {
        ...state,
        campoCerca: action.payload.campoCerca
      };

    case SET_FAVORITE:
      return {
        ...state,
        favoriteFlag: action.payload
      };

    case APP_LOGOUT:
      return {
        ...state,
        homeLink: false,
        searchDiv: false,
        campoCerca: "",
        goPrev: true,
        error: false
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
