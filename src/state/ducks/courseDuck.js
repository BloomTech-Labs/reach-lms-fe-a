import { axiosAuth } from '../../utils/axiosWithAuth';
import { asyncThunkUtils } from '../util';

/** Object full of helper functions to deal with status updates and async thunks */
const courseThunkUtils = asyncThunkUtils('COURSE');

/******************************************************
 * COURSE ACTION TYPES
 ******************************************************/
const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS';
const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
const GET_COURSES_BY_PROGRAM_ID_SUCCESS = 'GET_COURSES_BY_PROGRAM_ID_SUCCESS';
const DELETE_TEACHER_FROM_COURSE_SUCCESS = 'DELETE_TEACHER_FROM_COURSE_SUCCESS';
const DELETE_STUDENT_FROM_COURSE_SUCCESS = 'DELETE_STUDENT_FROM_COURSE_SUCCESS';
const ADD_STUDENT_TO_COURSE_SUCCESS = 'ADD_STUDENT_TO_COURSE_SUCCESS';
const ADD_TEACHER_TO_COURSE_SUCCESS = 'ADD_TEACHER_TO_COURSE_SUCCESS';

const SET_EDIT_COURSE = 'SET_EDIT_COURSE';
const SET_COURSE_LIST = 'SET_COURSE_LIST';
const CLEAR_COURSES = 'CLEAR_COURSES';
const CURRENT_COURSE = 'CURRENT_COURSE';

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const ADD_TEACHER = 'ADD_TEACHER';
const DELETE_TEACHER = 'DELETE_TEACHER';

/******************************************************
 * COURSE ACTIONS
 ******************************************************
 *
 * courseActions is an object where each property is
 * an action creator or thunk that relates to our courses slice of state
 */
export const courseActions = {
  setCurrentCourse: course => ({ type: CURRENT_COURSE, payload: course }),
  setEditCourse: course => ({ type: SET_EDIT_COURSE, payload: course }),

  // GET ALL COURSES ASSOCIATED WITH THE GIVEN PROGRAMID
  getCoursesByProgramId: programId => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('get-by-program-id'));

    axiosAuth()
      .get(`/courses/${programId}`)
      .then(res =>
        dispatch({ type: GET_COURSES_BY_PROGRAM_ID_SUCCESS, payload: res.data })
      )
      .catch(err =>
        dispatch(
          courseThunkUtils.triggerThunkFail('get-by-program-id', err.message)
        )
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },
  // CREATE A NEW COURSE
  addCourseThunk: (programId, newCourse) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('add'));
    axiosAuth()
      .post(`/courses/${programId}/course`, newCourse)
      .then(res => dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data }))
      .catch(err =>
        dispatch(courseThunkUtils.triggerThunkFail('add', err.message))
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  // EDIT AN EXISTING COURSE
  editCourseThunk: (courseId, editedCourse) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('edit'));
    axiosAuth()
      .patch(`courses/${courseId}`, editedCourse)
      .then(res =>
        dispatch({
          type: EDIT_COURSE_SUCCESS,
          payload: { courseId, editedCourse, data: res.data },
        })
      )
      .catch(err =>
        dispatch(courseThunkUtils.triggerThunkFail('edit', err.message))
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  // DELETE AN EXISTING COURSE
  deleteCourseThunk: courseId => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('delete'));
    axiosAuth()
      .delete(`/courses/${courseId}`)
      .then(res => dispatch({ type: DELETE_COURSE_SUCCESS, payload: courseId }))
      .catch(err =>
        dispatch(courseThunkUtils.triggerThunkFail('delete', err.message))
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  // DELETE an existing teacher from an existing course that they are currently attached to
  deleteTeacherFromCourseThunk: (courseId, teacherId) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('delete-teacher'));
    axiosAuth()
      .delete(`/teachers/${courseId}/${teacherId}`)
      .then(res => {
        const newTeachers = res.data.map(teacher => {
          const { teacherid, teachername } = teacher;
          return { teacher: { teacherid, teachername } };
        });

        dispatch({
          type: DELETE_TEACHER_FROM_COURSE_SUCCESS,
          payload: newTeachers,
        });
      })
      .catch(err =>
        dispatch(
          courseThunkUtils.triggerThunkFail('delete-teacher', err.message)
        )
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  deleteStudentFromCourseThunk: (courseId, studentId) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('delete-student'));
    axiosAuth()
      .delete(`/students/${courseId}/${studentId}`)
      .then(res => {
        const newStudents = res.data.map(student => {
          const { studentid, studentname } = student;
          return { student: { studentid, studentname } };
        });

        dispatch({
          type: DELETE_STUDENT_FROM_COURSE_SUCCESS,
          payload: newStudents,
        });
      })
      .catch(err =>
        dispatch(
          courseThunkUtils.triggerThunkFail('delete-student', err.message)
        )
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  addStudentToCourseThunk: (courseId, newStudent) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('add-student'));

    axiosAuth()
      .post(`/students/${courseId}`, newStudent)
      .then(res => {
        const { studentid, studentname } = res.data;

        const addedStudent = { student: { studentid, studentname } };

        dispatch({
          type: ADD_STUDENT_TO_COURSE_SUCCESS,
          payload: addedStudent,
        });
      })
      .catch(err =>
        dispatch(courseThunkUtils.triggerThunkFail('add-student', err.message))
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
  },

  addTeacherToCourseThunk: (courseId, newTeacher) => dispatch => {
    dispatch(courseThunkUtils.triggerThunkStart('add-teacher'));

    axiosAuth()
      .post(`/teachers/${courseId}`, newTeacher)
      .then(res => {
        const { teacherid, teachername } = res.data;
        const addedTeacher = { teacher: { teacherid, teachername } };
        dispatch({
          type: ADD_TEACHER_TO_COURSE_SUCCESS,
          payload: addedTeacher,
        });
      })
      .catch(err =>
        dispatch(courseThunkUtils.triggerThunkFail('add-teacher', err.message))
      )
      .finally(() => dispatch(courseThunkUtils.triggerThunkResolve()));
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
  const { success, result } = courseThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }

  switch (action.type) {
    case ADD_TEACHER_TO_COURSE_SUCCESS:
      // TODO — IMPLEMENT
      return state;

    case ADD_STUDENT_TO_COURSE_SUCCESS:
      // TODO — IMPLEMENT
      return state;

    case DELETE_STUDENT_FROM_COURSE_SUCCESS:
      // TODO — DOES THIS WORK?
      return {
        ...state,
        status: 'delete-student/success',
        currentCourse: { ...state.currentCourse, students: action.payload },
      };

    case DELETE_TEACHER_FROM_COURSE_SUCCESS:
      // TODO — DOES THIS WORK?
      return {
        ...state,
        status: 'delete-teacher/success',
        currentCourse: { ...state.currentCourse, teachers: action.payload },
      };

    /*------- GET COURSES BY PROGRAM ID -------*/
    case GET_COURSES_BY_PROGRAM_ID_SUCCESS:
      return {
        ...state,
        status: 'get-by-program-id/success',
        coursesList: action.payload,
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
