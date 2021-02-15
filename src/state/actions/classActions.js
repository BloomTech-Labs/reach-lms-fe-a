import { axiosWithAuth } from '../utils/axiosWithAuth';

export const ADD_CLASS = 'ADD_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const SEARCH_CLASS = 'SEARCH_CLASS';
export const SET_EDIT = 'SET_EDIT';
export const EDIT_CLASS = 'EDIT_CLASS';
export const SET_CLASS_LIST = 'SET_CLASS_LIST';
export const FILTER_STATE = 'FILTER_STATE';
export const CLEAR_CLASSES = 'CLEAR_CLASSES';

export const addClass = value => {
  return { type: ADD_CLASS, payload: value };
};
///DUMMY API
export const searchClass = value => dispatch => {
  return axiosWithAuth()
    .get(`https://bw-back-end.herokuapp.com/api/auth/users/classes`)
    .then(res => {
      let payload = {
        results: res.data.data,
        search_input: value,
      };
      dispatch({ type: SEARCH_CLASS, payload: payload });
    })
    .catch(err => console.log(err));
};

export const setEdit = value => {
  return { type: SET_EDIT, payload: value };
};

export const deleteClass = value => {
  return { type: DELETE_CLASS, payload: value };
};

export const editClassAction = value => {
  return { type: EDIT_CLASS, payload: value };
};

export const setClassList = value => {
  return { type: SET_CLASS_LIST, payload: value };
};

export const filterState = value => {
  return { type: FILTER_STATE, payload: value };
};

export const clearClasses = () => {
  return { type: CLEAR_CLASSES };
};
