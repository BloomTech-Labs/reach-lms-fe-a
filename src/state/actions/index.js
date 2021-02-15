// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';

// admin actions
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchPrograms = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });

    axios
      .get('insert endpoint here')
      .then(res => {
        console.log(res);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_DATA_FAILURE, payload: err.message });
      });
  };
};
