// Action types
export const FETCH_POPULARS_BEGIN   = 'FETCH_POPULARS_BEGIN';
export const FETCH_POPULARS_SUCCESS = 'FETCH_POPULARS_SUCCESS';
export const FETCH_POPULARS_FAILURE = 'FETCH_POPULARS_FAILURE';

export function fetchPopulars() {
    return dispatch => {
      dispatch(fetchPopularsBegin());
      return fetch("/cities/carousel")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchPopularsSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchPopularsFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

export const fetchPopularsBegin = () => ({
  type: FETCH_POPULARS_BEGIN
});
export const fetchPopularsSuccess = populars => ({
  type: FETCH_POPULARS_SUCCESS,
  payload: { populars }
});
export const fetchPopularsFailure = error => ({
  type: FETCH_POPULARS_FAILURE,
  payload: { error }
});