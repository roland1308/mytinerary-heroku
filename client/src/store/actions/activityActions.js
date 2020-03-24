// Action types
export const FETCH_ACTIVITY_BEGIN = "FETCH_ACTIVITY_BEGIN";
export const FETCH_ACTIVITY_SUCCESS = "FETCH_ACTIVITY_SUCCESS";
export const FETCH_ACTIVITY_FAILURE = "FETCH_ACTIVITY_FAILURE";
export const STORE_ITINERARY_ID = "STORE_ITINERARY_ID";

const axios = require("axios");

export function fetchActivities(itinerary_id) {
  return async dispatch => {
    dispatch(storeItineraryId(itinerary_id));
    dispatch(fetchActivityBegin());
    let url = "/itineraries/populate/" + itinerary_id;
    try {
      const res = await axios.get(url);
      dispatch(fetchActivitySuccess(res.data.activities));
    } catch (error) {
      dispatch(fetchActivityFailure(error));
    }
    return "done";
  };
}

// return fetch(url)
//   .then(handleErrors)
//   .then(res => res.json())
//   .then(json => {
//     dispatch(fetchActivitySuccess(json.activities));
//     return json;
//   })
//   .catch(error => dispatch(fetchActivityFailure(error)));

// Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }

export const fetchActivityBegin = () => ({
  type: FETCH_ACTIVITY_BEGIN
});
export const fetchActivitySuccess = activity => ({
  type: FETCH_ACTIVITY_SUCCESS,
  payload: { activity }
});
export const fetchActivityFailure = error => ({
  type: FETCH_ACTIVITY_FAILURE,
  payload: { error }
});

export const storeItineraryId = itineraryId => ({
  type: STORE_ITINERARY_ID,
  payload: itineraryId
});
