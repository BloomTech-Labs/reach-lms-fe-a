/**
 * A multi-faceted closure that returns a collection of utility functions to be used in asynchronous thunks
 * @param {string} slicePrefix The prefix of the duck or slice of state. (i.e., userDuck would pass in USER as a slicePrefix)
 * @returns An object full of utility functions.
 */
export const asyncThunkUtils = slicePrefix => {
  // Dynamic action types for reusability
  const ASYNC_THUNK_START = `${slicePrefix}_START`;
  const ASYNC_THUNK_FAIL = `${slicePrefix}_FAIL`;
  const ASYNC_THUNK_RESOLVE = `${slicePrefix}_RESOLVE`;

  /**
   *
   * @param {dispatch} dispatch The dispatch object that one would use inside of an async thunk
   * @param {*} prefix The ACTION TYPE prefix you'd like to use for status updates. (i.e., GET_USER_INFO could pass in "get" or "get-user")
   * @returns An object of callable functions where each function will dispatch according to the slicePrefix & actionTypePrefix you've set.
   */
  const getTriggersFromPrefix = (dispatch, prefix) => {
    return {
      thunkStart: () => {
        dispatch({
          type: ASYNC_THUNK_START,
          payload: { prefix },
        });
      },
      thunkFail: errorMessage => {
        dispatch({
          type: ASYNC_THUNK_FAIL,
          payload: { prefix, message: errorMessage },
        });
      },
      thunkResolve: () => {
        dispatch({
          type: ASYNC_THUNK_RESOLVE,
        });
      },
    };
  };

  const triggerThunkStart = prefix => ({
    type: ASYNC_THUNK_START,
    payload: { prefix },
  });

  const triggerThunkFail = (prefix, message) => ({
    type: ASYNC_THUNK_FAIL,
    payload: { prefix, message },
  });

  const triggerThunkResolve = () => ({ type: ASYNC_THUNK_RESOLVE });

  const thunkReducer = (state, action) => {
    switch (action.type) {
      /*------- GENERAL ASYNC THUNK HANDLERS -------*/

      // should run every time we start a thunk
      case ASYNC_THUNK_START:
        return {
          success: true,
          result: {
            ...state,
            status: `${action.payload.prefix}/pending`,
          },
        };

      // should run any time we hit a  `.catch()` clause in a thunk
      case ASYNC_THUNK_FAIL:
        return {
          success: true,
          result: {
            ...state,
            status: `${action.payload.prefix}/error`,
            error: action.payload,
          },
        };

      // should run any time we hit a `.finally()` clause in a thunk
      case ASYNC_THUNK_RESOLVE:
        return {
          success: true,
          result: {
            ...state,
            status: 'idle',
          },
        };

      default:
        return { success: false };
    }
  };

  return {
    getTriggersFromPrefix,
    triggerThunkStart,
    triggerThunkFail,
    triggerThunkResolve,
    thunkReducer,
  };
};
