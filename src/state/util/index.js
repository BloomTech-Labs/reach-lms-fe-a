const makeAsyncThunk_START = slice => `${slice}_START`;
const makeAsyncThunk_RESOLVE = slice => `${slice}_RESOLVE`;
const makeAsyncThunk_FAIL = slice => `${slice}`;

export const asyncThunkUtils = slicePrefix => {
  const ASYNC_THUNK_START = makeAsyncThunk_START(slicePrefix);
  const ASYNC_THUNK_RESOLVE = makeAsyncThunk_RESOLVE(slicePrefix);
  const ASYNC_THUNK_FAIL = makeAsyncThunk_FAIL(slicePrefix);

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
            error: action.payload.message,
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
    triggerThunkStart,
    triggerThunkFail,
    triggerThunkResolve,
    thunkReducer,
  };
};
