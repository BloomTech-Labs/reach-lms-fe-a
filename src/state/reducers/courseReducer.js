import {
  ADD_COURSE,
  SET_EDIT_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
  SET_COURSE_LIST,
  CLEAR_COURSES,
  CURRENT_COURSE,
  ADD_STUDENT,
  DELETE_STUDENT,
  ADD_TEACHER,
  DELETE_TEACHER,
} from '../actions/courseActions';

const initialState = {
  courses_list: [],
  edit_course: {},
  currentCourse: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      if (state.courses_list === false) {
        return { ...state, courses_list: [action.payload] };
      } else {
        return {
          ...state,
          courses_list: [...state.courses_list, action.payload],
        };
      }
    case SET_EDIT_COURSE:
      return { ...state, edit_course: action.payload };
    case DELETE_COURSE:
      let newCourseList = [...state.courses_list].filter(item => {
        return item.courseid !== action.payload;
      });
      return { ...state, courses_list: newCourseList };
    case EDIT_COURSE:
      let updatedCourses = [...state.courses_list];
      let index2 = updatedCourses.findIndex(
        el => el.courseid === action.payload.courseid
      );
      updatedCourses.splice(index2, 1, action.payload);
      return { ...state, courses_list: updatedCourses };
    case SET_COURSE_LIST:
      return { ...state, courses_list: action.payload };
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
