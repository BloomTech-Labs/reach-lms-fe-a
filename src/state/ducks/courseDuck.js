import { axiosAuth } from '../../utils/axiosWithAuth';
import { asyncThunkUtils } from '../util';

/** Object full of helper functions to deal with status updates and async thunks */
const courseThunkUtils = asyncThunkUtils('COURSE');

/******************************************************
 * COURSE ACTION TYPES
 ******************************************************/
const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
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

const GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS';
const GET_TEACHERS_SUCCESS = 'GET_TEACHERS_SUCCESS';

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

  getCourseThunk: courseId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'get');

    thunkStart();

    axiosAuth()
      .get(`/courses/course/${courseId}`)
      .then(res => dispatch({ type: GET_COURSE_SUCCESS, payload: res.data }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  mapifyStudentTeachersPowerThunk: courseId => dispatch => {
    const getStudentsUtil = courseThunkUtils.getTriggersFromPrefix(
      dispatch,
      'get-students'
    );
    getStudentsUtil.thunkStart();
    axiosAuth()
      .get('/students')
      .then(res => {
        const studentMap = {
          enrolled: {},
          available: {},
        };
        for (const student of res.data) {
          const { studentid, studentname, courses } = student;
          // eslint-disable-next-line eqeqeq
          if (courses.some(course => course.course.courseid == courseId)) {
            studentMap.enrolled[studentid] = { studentid, studentname };
          } else {
            studentMap.available[studentid] = { studentid, studentname };
          }
        }

        dispatch({ type: GET_STUDENTS_SUCCESS, payload: studentMap });
      })
      .catch(err => getStudentsUtil.thunkFail())
      .finally(() => getStudentsUtil.thunkResolve());

    const getTeachersUtil = courseThunkUtils.getTriggersFromPrefix(
      dispatch,
      'get-teachers'
    );
    getTeachersUtil.thunkStart();
    axiosAuth()
      .get('/teachers')
      .then(res => {
        const teacherMap = {
          enrolled: {},
          available: {},
        };
        for (const teacher of res.data) {
          const { teacherid, teachername, courses } = teacher;
          // eslint-disable-next-line eqeqeq
          if (courses.some(course => course.course.courseid == courseId)) {
            teacherMap.enrolled[teacherid] = { teacherid, teachername };
          } else {
            teacherMap.available[teacherid] = { teacherid, teachername };
          }
        }
        dispatch({ type: GET_TEACHERS_SUCCESS, payload: teacherMap });
      })
      .catch(err => getTeachersUtil.thunkFail(err.message))
      .finally(() => getTeachersUtil.thunkResolve());
  },

  // GET ALL COURSES ASSOCIATED WITH THE GIVEN PROGRAMID
  getCoursesByProgramId: programId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'get-by-program-id');
    thunkStart();
    axiosAuth()
      .get(`/courses/${programId}`)
      .then(res =>
        dispatch({
          type: GET_COURSES_BY_PROGRAM_ID_SUCCESS,
          payload: res.data._embedded.courseList,
        })
      )
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  // CREATE A NEW COURSE
  addCourseThunk: (programId, newCourse) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'add');
    thunkStart();
    axiosAuth()
      .post(`/courses/${programId}/course`, newCourse)
      .then(res => dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  // EDIT AN EXISTING COURSE
  editCourseThunk: (courseId, editedCourse) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'edit');
    thunkStart();
    axiosAuth()
      .patch(`courses/${courseId}`, editedCourse)
      .then(res =>
        dispatch({
          type: EDIT_COURSE_SUCCESS,
          payload: { courseId, editedCourse, data: res.data },
        })
      )
      .catch(err => thunkFail(err.mesage))
      .finally(() => thunkResolve());
  },
  // DELETE AN EXISTING COURSE
  deleteCourseThunk: courseId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'edit');
    thunkStart();
    axiosAuth()
      .delete(`/courses/${courseId}`)
      .then(res => dispatch({ type: DELETE_COURSE_SUCCESS, payload: courseId }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  // DELETE an existing teacher from an existing course that they are currently attached to
  deleteTeacherFromCourseThunk: (courseId, teacherId) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'delete-teacher');

    thunkStart();

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
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  deleteStudentFromCourseThunk: (courseId, studentId) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'delete-student');
    thunkStart();
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
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  addStudentToCourseThunk: (courseId, newStudent) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'add-student');
    thunkStart();
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
      .catch(err => thunkFail(err.message))
      .finally(thunkResolve());
  },

  addTeacherToCourseThunk: (courseId, newTeacher) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = courseThunkUtils.getTriggersFromPrefix(dispatch, 'add-student');

    thunkStart();

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
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
};

const initialState = {
  status: 'idle',
  error: null,
  coursesList: [],
  editCourse: {},
  currentCourse: {},
  teacherMap: {},
  studentMap: {},
};

const courseReducer = (state = initialState, action) => {
  const { success, result } = courseThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }

  switch (action.type) {
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        status: 'get-students/success',
        studentsMap: action.payload,
      };

    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        status: 'get-teachers/success',
        teachersMap: action.payload,
      };

    case GET_COURSE_SUCCESS:
      return {
        ...state,
        status: 'get/success',
        currentCourse: action.payload,
      };

    case ADD_TEACHER_TO_COURSE_SUCCESS:
      return {
        ...state,
        status: 'add-enrolled/success',
      };

    case ADD_STUDENT_TO_COURSE_SUCCESS:
      return {
        ...state,
        status: 'add-enrolled/success',
      };

    case DELETE_STUDENT_FROM_COURSE_SUCCESS:
      return {
        ...state,
        status: 'remove-enrolled/success',
      };

    case DELETE_TEACHER_FROM_COURSE_SUCCESS:
      return {
        ...state,
        status: 'remove-enrolled/success',
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
