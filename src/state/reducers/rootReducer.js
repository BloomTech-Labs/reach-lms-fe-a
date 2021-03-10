import { combineReducers } from 'redux';

import programReducer from './programReducer';
import { userReducer, courseReducer } from '../ducks';
import moduleReducer from './moduleReducer';

const rootReducer = combineReducers({
  programReducer,
  userReducer,
  courseReducer,
  moduleReducer,
});

export default rootReducer;
