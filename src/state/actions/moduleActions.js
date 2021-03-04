export const ADD_MODULE = 'ADD_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';
export const SET_EDIT_MODULE = 'SET_EDIT_MODULE';
export const EDIT_MODULE = 'EDIT_MODULE';
export const SET_MODULE_LIST = 'SET_MODULE_LIST';
export const CLEAR_MODULES = 'CLEAR_MODULES';
export const CURRENT_MODULE = 'CURRENT_MODULE';

export const addModule = value => {
  return { type: ADD_MODULE, payload: value };
};

export const setEditModule = value => {
  return { type: SET_EDIT_MODULE, payload: value };
};

export const deleteModule = value => {
  return { type: DELETE_MODULE, payload: value };
};

export const editModuleAction = value => {
  return { type: EDIT_MODULE, payload: value };
};

export const setModuleList = value => {
  return { type: SET_MODULE_LIST, payload: value };
};

export const currentModule = value => {
  return { type: CURRENT_MODULE, payload: value };
};

export const clearCourses = () => {
  return { type: CLEAR_MODULES };
};
