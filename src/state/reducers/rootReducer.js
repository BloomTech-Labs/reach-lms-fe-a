import { combineReducers } from "redux";

import programReducer from "./classReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
  programReducer,
  userReducer
});

export default rootReducer