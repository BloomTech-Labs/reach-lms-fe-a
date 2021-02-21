import { SAVE_USER, CLEAR_USER, EDIT_USER } from '../actions/userActions';

const initialState = {
  userid: 0,
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  role: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return action.payload;
    case CLEAR_USER:
      return initialState;
    case EDIT_USER:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        phonenumber: action.payload.phonenumber,
      };
    default:
      return state;
  }
};

export default userReducer;
