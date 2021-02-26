import { combineReducers } from 'redux';

import programReducer from './programReducer';
import userReducer from './userReducer';
import courseReducer from './courseReducer';
import moduleReducer from './moduleReducer';

const rootReducer = combineReducers({
  programReducer,
  userReducer,
  courseReducer,
  moduleReducer,
});

export default rootReducer;
