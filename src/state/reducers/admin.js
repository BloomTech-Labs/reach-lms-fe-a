import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from '../actions';

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
