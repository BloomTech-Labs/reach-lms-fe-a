import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const ADD_PROGRAM = 'ADD_PROGRAM';
export const DELETE_PROGRAM = 'DELETE_PROGRAM';
export const SEARCH_PROGRAM = 'SEARCH_PROGRAM';
export const SET_EDIT = 'SET_EDIT';
export const EDIT_PROGRAM = 'EDIT_PROGRAM';
export const SET_PROGRAM_LIST = 'SET_PROGRAM_LIST';
export const FILTER_STATE = 'FILTER_STATE';
export const CLEAR_PROGRAMS = 'CLEAR_PROGRAMS';

export const addProgram = value => {
  return { type: ADD_PROGRAM, payload: value };
};

export const searchProgram = value => dispatch => {
  return axiosWithAuth()
    .get(``)
    .then(res => {
      let payload = {
        results: res.data.data,
        search_input: value,
      };
      dispatch({ type: SEARCH_PROGRAM, payload: payload });
    })
    .catch(err => console.log(err));
};

export const setEdit = value => {
  return { type: SET_EDIT, payload: value };
};

export const deleteProgram = value => {
  return { type: DELETE_PROGRAM, payload: value };
};

export const editProgramAction = value => {
  return { type: EDIT_PROGRAM, payload: value };
};

export const setProgramList = value => {
  return { type: SET_PROGRAM_LIST, payload: value };
};

export const filterState = value => {
  return { type: FILTER_STATE, payload: value };
};

export const clearPrograms = () => {
  return { type: CLEAR_PROGRAMS };
};
