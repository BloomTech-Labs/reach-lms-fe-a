import { axiosAuth } from '../../utils/axiosWithAuth';
// import { createThunkActionTypes } from "../util";

/******************************************************
 * COURSE ACTION TYPES
 ******************************************************/
const ADD_COURSE = 'ADD_COURSE';

// const [
//   ADD_COURSE_START,
//   ADD_COURSE_SUCCESS,
//   ADD_COURSE_FAIL,
//   ADD_COURSE_RESOLVE
// ] = createThunkActionTypes("ADD_COURSE");

const ADD_COURSE_START = 'ADD_COURSE_START';
const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
const ADD_COURSE_FAIL = 'ADD_COURSE_FAIL';
const ADD_COURSE_RESOLVE = 'ADD_COURSE_RESOLVE';

const DELETE_COURSE = 'DELETE_COURSE';
const SET_EDIT_COURSE = 'SET_EDIT_COURSE';
const EDIT_COURSE = 'EDIT_COURSE';
const SET_COURSE_LIST = 'SET_COURSE_LIST';
const CLEAR_COURSES = 'CLEAR_COURSES';
const CURRENT_COURSE = 'CURRENT_COURSE';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ADD_TEACHER = 'ADD_TEACHER';
const DELETE_TEACHER = 'DELETE_TEACHER';

const COURSE_START = 'COURSE_START';
const COURSE_RESOLVE = 'COURSE_RESOLVE';
const addCourse = payload => ({ type: ADD_COURSE, payload });
const setEditCourse = payload => ({ type: SET_EDIT_COURSE, payload });
const deleteCourse = payload => ({ type: DELETE_COURSE, payload });
const editCourseAction = payload => ({ type: EDIT_COURSE, payload });
const setCourseList = payload => ({ type: SET_COURSE_LIST, payload });
const clearCourses = payload => ({ type: CLEAR_COURSES });
const currentCourse = payload => ({ type: CURRENT_COURSE, payload });
const addStudent = payload => ({ type: ADD_STUDENT, payload });
const deleteStudent = payload => ({ type: DELETE_STUDENT, payload });
const addTeacher = payload => ({ type: ADD_TEACHER, payload });
const deleteTeacher = payload => ({ type: DELETE_TEACHER, payload });

/******************************************************
 * COURSE ACTIONS
 ******************************************************/

/**
 * courseActions is an object where each property is an action creator or thunk
 * that relates to our courses slice of state
 */
export const courseActions = {
  // CREATE A NEW COURSE
  addCourseThunk: (programId, newCourse) => dispatch => {
    dispatch({ type: COURSE_START, payload: 'post' });
    axiosAuth()
      .post(`/courses/${programId}/course`, newCourse)
      // .then(res => dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data }))
      .then(res => dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: ADD_COURSE_FAIL, payload: err.message }))
      .finally(() => dispatch({ type: COURSE_RESOLVE }));
  },

  // EDIT AN EXISTING COURSE
};

const initialState = {
  status: 'idle',
  error: null,
  coursesList: [],
  editCourse: {},
  currentCourse: {},
};

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURSE_START:
      return {
        ...state,
        status: `${payload}/pending`,
      };
    case COURSE_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    case ADD_COURSE:
      const existingCourses = state.coursesList || [];
      return {
        ...state,
        coursesList: [...existingCourses, action.payload],
      };

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        status: 'post/success',
        coursesList: [...state.coursesList, action.payload],
      };

    case ADD_COURSE_FAIL:
      return {
        ...state,
        status: 'post/error',
        error: action.payload,
      };

    case SET_EDIT_COURSE:
      return {
        ...state,
        editCourse: action.payload,
      };

    case DELETE_COURSE:
      let newCourseList = [...state.coursesList].filter(item => {
        return item.courseid !== action.payload;
      });
      return { ...state, courses_list: newCourseList };

    case EDIT_COURSE:
      let updatedCourses = [...state.courses_list];
      let index2 = updatedCourses.findIndex(
        el => el.courseid === action.payload.courseid
      );
      updatedCourses.splice(index2, 1, action.payload);
      return {
        ...state,
        coursesList: updatedCourses,
      };

    case SET_COURSE_LIST:
      return { ...state, coursesList: action.payload };

    case CURRENT_COURSE:
      return { ...state, currentCourse: action.payload };

    case ADD_STUDENT:
      if (state.currentCourse.students === false) {
        return {
          ...state,
          currentCourse: { ...state.currentCourse, students: action.payload },
          // courses_list: { ...state }, still need to do this
        };
      } else {
        return {
          ...state,
          currentCourse: {
            ...state.currentCourse,
            students: [...state.currentCourse.students, action.payload],
          },
        };
      }

    case ADD_TEACHER:
      if (state.currentCourse.teachers === []) {
        return {
          ...state,
          currentCourse: { ...state.currentCourse, teachers: [action.payload] },
        };
      } else {
        return {
          ...state,
          currentCourse: {
            ...state.currentCourse,
            teachers: [...state.currentCourse.teachers, action.payload],
          },
        };
      }

    case DELETE_TEACHER:
      return {
        ...state,
        currentCourse: { ...state.currentCourse, teachers: action.payload },
      };

    case DELETE_STUDENT:
      return {
        ...state,
        currentCourse: { ...state.currentCourse, students: action.payload },
      };

    case CLEAR_COURSES:
      return initialState;

    default:
      return state;
  }
};

export default courseReducer;
