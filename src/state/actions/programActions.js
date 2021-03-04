export const ADD_PROGRAM = 'ADD_PROGRAM';
export const DELETE_PROGRAM = 'DELETE_PROGRAM';
export const SET_EDIT = 'SET_EDIT';
export const EDIT_PROGRAM = 'EDIT_PROGRAM';
export const SET_PROGRAM_LIST = 'SET_PROGRAM_LIST';
export const CLEAR_PROGRAMS = 'CLEAR_PROGRAMS';
export const CURRENT_PROGRAM = 'CURRENT_PROGRAM';

export const addProgram = value => {
  return { type: ADD_PROGRAM, payload: value };
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

export const currentProgram = value => {
  return { type: CURRENT_PROGRAM, payload: value };
};

export const clearPrograms = () => {
  return { type: CLEAR_PROGRAMS };
};
