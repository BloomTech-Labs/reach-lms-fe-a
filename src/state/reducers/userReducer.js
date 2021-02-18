import { SAVE_USER, CLEAR_USER } from '../actions/userActions';

const initialState = {
  id: 0,
  fname: '',
  lname: '',
  email: '',
  phone: '',
  role: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return action.payload;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
