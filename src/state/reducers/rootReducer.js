import { combineReducers } from 'redux';

import programReducer from './programReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  programReducer,
  userReducer,
});

export default rootReducer;
