import { axiosAuth } from '../../utils/axiosWithAuth';

/******************************************************
 * COURSE ACTION TYPES
 ******************************************************/
const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS';
const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';

const SET_EDIT_COURSE = 'SET_EDIT_COURSE';
const SET_COURSE_LIST = 'SET_COURSE_LIST';
const CLEAR_COURSES = 'CLEAR_COURSES';
const CURRENT_COURSE = 'CURRENT_COURSE';

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const ADD_TEACHER = 'ADD_TEACHER';
const DELETE_TEACHER = 'DELETE_TEACHER';

const ASYNC_THUNK_START = 'COURSE_START';
const ASYNC_THUNK_RESOLVE = 'COURSE_RESOLVE';
const ASYNC_THUNK_FAIL = 'COURSE_FAIL';

const triggerThunkStart = prefix => ({
  type: ASYNC_THUNK_START,
  payload: { prefix },
});

const triggerThunkFail = (prefix, message) => ({
  type: ASYNC_THUNK_FAIL,
  payload: { prefix, message },
});

const triggerThunkResolve = () => ({ type: ASYNC_THUNK_RESOLVE });

/******************************************************
 * COURSE ACTIONS
 ******************************************************
 *
 * courseActions is an object where each property is
 * an action creator or thunk that relates to our courses slice of state
 */
export const courseActions = {
  // CREATE A NEW COURSE
  addCourseThunk: (programId, newCourse) => dispatch => {
    dispatch(triggerThunkStart('add'));
    axiosAuth()
      .post(`/courses/${programId}/course`, newCourse)
      .then(res => dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data }))
      .catch(err => dispatch(triggerThunkFail('add', err.message)))
      .finally(() => dispatch(triggerThunkResolve()));
  },

  // EDIT AN EXISTING COURSE
  editCourseThunk: (courseId, editedCourse) => dispatch => {
    dispatch(triggerThunkStart('edit'));
    axiosAuth()
      .patch(`courses/${courseId}`, editedCourse)
      .then(res =>
        dispatch({
          type: EDIT_COURSE_SUCCESS,
          payload: { courseId, editedCourse, data: res.data },
        })
      )
      .catch(err => dispatch(triggerThunkFail('edit', err.message)))
      .finally(() => dispatch(triggerThunkResolve()));
  },

  // DELETE AN EXISTING COURSE
  deleteCourseThunk: courseId => dispatch => {
    dispatch(triggerThunkStart('delete'));
    axiosAuth()
      .delete(`/courses/${courseId}`)
      .then(res => dispatch({ type: DELETE_COURSE_SUCCESS, payload: courseId }))
      .catch(err => dispatch(triggerThunkFail('delete', err.message)))
      .finally(() => dispatch(triggerThunkResolve()));
  },
};

const initialState = {
  status: 'idle',
  error: null,
  coursesList: [],
  editCourse: {},
  currentCourse: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    /*------- GENERAL ASYNC THUNK HANDLERS -------*/

    // should run every time we start a thunk
    case ASYNC_THUNK_START:
      return {
        ...state,
        status: `${action.payload.prefix}/pending`,
      };

    // should run any time we hit a  `.catch()` clause in a thunk
    case ASYNC_THUNK_FAIL:
      return {
        ...state,
        status: `${action.payload.prefix}/error`,
        error: action.payload.message,
      };

    // should run any time we hit a `.finally()` clause in a thunk
    case ASYNC_THUNK_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    /*------- ADD/POST NEW COURSE -------*/
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        status: 'post/success',
        coursesList: [...state.coursesList, action.payload],
      };

    /*------- EDIT/PATCH EXISTING COURSE -------*/
    case EDIT_COURSE_SUCCESS:
      const matchedIndex = state.coursesList.findIndex(
        ({ courseid }) => courseid === action.payload.courseId
      );
      // if findIndex returns -1, it means no match was found
      if (matchedIndex < 0) {
        // so we don't want to change the coursesList
        // we may consider throwing an error here instead of just returning state
        return state;
      }
      // otherwise, we did find a match and we need to update our courseList!
      return {
        ...state,
        status: 'edit/success',
        coursesList: [...state.coursesList].splice(
          matchedIndex,
          1,
          action.payload
        ),
      };

    /*------- DELETE EXISTING COURSE -------*/
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        status: 'delete/success',
        coursesList: [...state.coursesList].filter(
          ({ courseid }) => courseid !== action.payload
        ),
      };

    /*------- BASIC NON-ASYNC ACTIONS -------*/
    case SET_EDIT_COURSE:
      return {
        ...state,
        editCourse: action.payload,
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
