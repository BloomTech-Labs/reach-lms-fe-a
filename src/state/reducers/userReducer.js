import { SKIP_ONBOARDING, ADD_USER, SAVE_USER, CLEAR_USER } from "../actions/userActions";

const initialState = {
id: 0,
fname: "",
lname: "",
email: "",
phone: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case SKIP_ONBOARDING: 
      return {...state, classes: []};
    case SAVE_USER:
      return action.payload;
    case CLEAR_USER:
      return initialState;
    default: return state;
  }
}

export default userReducer;