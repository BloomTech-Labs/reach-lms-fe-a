import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

const userThunkUtils = asyncThunkUtils('USER');

const SAVE_USER = 'SAVE_USER';
const CLEAR_USER = 'CLEAR_USER';
const EDIT_USER = 'EDIT_USER';

const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export const userActions = {
  saveUser: value => {
    return { type: SAVE_USER, payload: value };
  },
  editUser: value => {
    return { type: EDIT_USER, payload: value };
  },
  clearUser: () => {
    return { type: CLEAR_USER };
  },
  getUserInfoThunk: () => dispatch => {
    dispatch(userThunkUtils.triggerThunkStart('get-user-info'));

    axiosAuth()
      .get('/users/getuserinfo')
      .then(res => dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data }))
      .catch(err =>
        dispatch(userThunkUtils.triggerThunkFail('get-user-info', err.message))
      )
      .finally(() => dispatch(userThunkUtils.triggerThunkResolve()));
  },
  editUserThunk: user => dispatch => {
    dispatch(userThunkUtils.triggerThunkStart('edit'));
    const { userid } = user;
    if (!userid) {
      throw new Error('No userid attached to user');
    }
    axiosAuth()
      .patch(`/users/user/${parseInt(userid)}`, user)
      .then(res => dispatch(userActions.editUser(res.data)))
      .catch(err =>
        dispatch(userThunkUtils.triggerThunkFail('edit', err.message))
      )
      .finally(() => userThunkUtils.triggerThunkResolve());
  },
};

const initialState = {
  status: 'idle',
  error: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  const { success, result } = userThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }

  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return initialState;
    case EDIT_USER:
      return {
        ...state,
        status: 'edit/success',
      };
    case GET_USER_INFO_SUCCESS:
      const {
        userid,
        firstname,
        lastname,
        email,
        phonenumber,
        username,
        roles,
      } = action.payload;
      return {
        ...state,
        status: 'get-user-info/success',
        user: {
          userid,
          firstname,
          lastname,
          email,
          phonenumber,
          username,
          role: roles[0].role.name,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
