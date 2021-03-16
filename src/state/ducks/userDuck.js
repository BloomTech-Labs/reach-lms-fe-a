import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

const userThunkUtils = asyncThunkUtils('USER');

const SAVE_USER = 'SAVE_USER';
const CLEAR_USER = 'CLEAR_USER';
const EDIT_USER = 'EDIT_USER';

const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';

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
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = userThunkUtils.getTriggersFromPrefix(dispatch, 'get-user-info');

    thunkStart();

    axiosAuth()
      .get('/users/getuserinfo')
      .then(res => {
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
      })
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  editUserThunk: user => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = userThunkUtils.getTriggersFromPrefix(dispatch, 'edit');

    thunkStart();

    const { userid } = user;

    axiosAuth()
      .patch(`/users/user/${parseInt(userid)}`, user)
      .then(res => dispatch(userActions.editUser(res.data)))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  getAllUsersThunk: () => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = userThunkUtils.getTriggersFromPrefix(dispatch, 'get-all-users');

    thunkStart();

    axiosAuth()
      .get('/users/users')
      .then(res => {
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
      })
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
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

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        status: 'get-all-users/success',
        allUsers: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
