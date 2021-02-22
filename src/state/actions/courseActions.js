import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const SEARCH_COURSE = 'SEARCH_COURSE';
export const SET_EDIT = 'SET_EDIT';
export const EDIT_COURSE = 'EDIT_COURSE';
export const SET_COURSE_LIST = 'SET_COURSE_LIST';
export const FILTER_STATE = 'FILTER_STATE';
export const CLEAR_COURSES = 'CLEAR_COURSES';

export const addCourse = value => {
  return { type: ADD_COURSE, payload: value };
};

export const searchCourse = value => dispatch => {
  return axiosWithAuth()
    .get(``)
    .then(res => {
      let payload = {
        results: res.data.data,
        search_input: value,
      };
      dispatch({ type: SEARCH_COURSE, payload: payload });
    })
    .catch(err => console.log(err));
};

export const setEditCourse = value => {
  return { type: SET_EDIT, payload: value };
};

export const deleteCOURSE = value => {
  return { type: DELETE_COURSE, payload: value };
};

export const editProgramAction = value => {
  return { type: EDIT_COURSE, payload: value };
};

export const setProgramList = value => {
  return { type: SET_COURSE_LIST, payload: value };
};

export const filterState = value => {
  return { type: FILTER_STATE, payload: value };
};

export const clearPrograms = () => {
  return { type: CLEAR_COURSES };
};
