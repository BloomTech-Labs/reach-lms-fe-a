import { combineReducers } from 'redux';

import programReducer from './programReducer';
import userReducer from './userReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  programReducer,
  userReducer,
  courseReducer,
});

export default rootReducer;
