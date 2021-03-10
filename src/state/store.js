import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
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

// const persistConfig = {
//   key: 'coursesList',
//   storage,
// };

// redux-persist used to keep state from wiping after refreshes
// const persistedCourseReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

// export const store = createStoreWithMiddleware(
//   persistedCourseReducer,
//   // Download this Chrome Extension: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export const store = createStoreWithMiddleware(
  rootReducer,
  // Download this Chrome Extension: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
