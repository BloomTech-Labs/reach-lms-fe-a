export const createThunkActionTypes = prefix => {
  const START = `${prefix}_START`;
  const FAIL = `${prefix}_FAIL`;
  const SUCCESS = `${prefix}_SUCCESS`;
  const RESOLVE = `${prefix}_RESOLVE`;
  return [START, SUCCESS, FAIL, RESOLVE];
};
