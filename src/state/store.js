import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  userReducer,
  courseReducer,
  moduleReducer,
  programReducer,
} from './ducks';

const rootReducer = combineReducers({
  programReducer,
  userReducer,
  courseReducer,
  moduleReducer,
});

const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export const store = createStoreWithMiddleware(
  rootReducer,
  // Download this Chrome Extension:
  // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
