export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const SET_EDIT_COURSE = 'SET_EDIT_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';
export const SET_COURSE_LIST = 'SET_COURSE_LIST';
export const CLEAR_COURSES = 'CLEAR_COURSES';
export const CURRENT_COURSE = 'CURRENT_COURSE';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';

export const addCourse = value => {
  return { type: ADD_COURSE, payload: value };
};

export const setEditCourse = value => {
  return { type: SET_EDIT_COURSE, payload: value };
};

export const deleteCourse = value => {
  return { type: DELETE_COURSE, payload: value };
};

export const editCourseAction = value => {
  return { type: EDIT_COURSE, payload: value };
};

export const setCourseList = value => {
  return { type: SET_COURSE_LIST, payload: value };
};

export const clearCourses = () => {
  return { type: CLEAR_COURSES };
};

export const currentCourse = value => {
  return { type: CURRENT_COURSE, payload: value };
};

export const addStudent = value => {
  return { type: ADD_STUDENT, payload: value };
};

export const deleteStudent = value => {
  return { type: DELETE_STUDENT, payload: value };
};

export const addTeacher = value => {
  return { type: ADD_TEACHER, payload: value };
};

export const deleteTeacher = value => {
  return { type: DELETE_TEACHER, payload: value };
};
