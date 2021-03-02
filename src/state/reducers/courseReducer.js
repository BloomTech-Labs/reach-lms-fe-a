import {
  ADD_COURSE,
  SEARCH_COURSE,
  SET_EDIT_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
  SET_COURSE_LIST,
  FILTER_STATE,
  CLEAR_COURSES,
  CURRENT_COURSE,
  ADD_STUDENT,
  DELETE_STUDENT,
  ADD_TEACHER,
  DELETE_TEACHER,
  SET_TEACHER_COURSE_LIST,
} from '../actions/courseActions';

const initialState = {
  search_courses: [],
  courses_list: [],
  edit_course: {},
  filtered_course_list: [],
  currentCourse: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      console.log(action.payload);
      if (state.courses_list === false) {
        return { ...state, courses_list: [action.payload] };
      } else {
        return {
          ...state,
          courses_list: [...state.courses_list, action.payload],
        };
      }
    case SEARCH_COURSE:
      function filterResults() {
        const inputCopy = { ...action.payload.search_input };
        let results = action.payload.results;
        for (let i in inputCopy) {
          //deletes keys in fields that were left empty
          if (!inputCopy[i]) {
            delete inputCopy[i];
          }
        }
        let filteredResults = results.filter(el => {
          const keys = Object.keys(inputCopy);
          for (let i in keys) {
            if (el[keys[i]] !== inputCopy[keys[i]]) {
              return false;
            }
          }
          return true;
        });
        return filteredResults ? filteredResults : results;
      }
      let results = filterResults();
      return { ...state, search_courses: results };
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
    case SET_TEACHER_COURSE_LIST:
      console.log(action.payload);
      return { ...state, courses_list: action.payload };
    case FILTER_STATE:
      console.log('action.payload', action.payload);
      return { ...state, filtered_course_list: action.payload };
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
          currentCourse: { ...state.currentCourse, teachers: action.payload },
          // courses_list: { ...state }, still need to do this
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
      let newTeacherList = [...state.currentCourse.teachers];
      console.log(newTeacherList);
      console.log(action.payload.teacherid);
      let deleteTeacherIndex = newTeacherList.findIndex(
        el => el.teacherid === action.payload.teacherid
      );
      console.log(deleteTeacherIndex);
      if (deleteTeacherIndex === 0) {
        newTeacherList.shift();
      } else {
        newTeacherList.splice(deleteTeacherIndex, 1);
      }

      // update teachers array inside of course inside of courses list
      // pass in an object containing teacherid and courseid
      // action payload is teacher id
      let newCoursesList = [...state.courses_list];
      console.log(newCoursesList);
      console.log(action.payload);
      let courseIndex = newCoursesList.findIndex(
        el => el.courseid === action.payload.courseid
      );
      console.log(courseIndex);
      let teacherIndex = newCoursesList[courseIndex].teachers.findIndex(
        el => el.teacherid === action.payload.teacherid
      );
      if (teacherIndex === 0) {
        newCoursesList[courseIndex].teachers.shift();
      } else {
        newCoursesList[courseIndex].teachers.splice(teacherIndex, 1);
      }
      return {
        ...state,
        courses_list: newCoursesList,
        currentCourse: { ...state.currentCourse, teachers: newTeacherList },
      };

    case DELETE_STUDENT:
      let newStudentList = [...state.currentCourse.students];
      let studentIndex = newStudentList.findIndex(
        el => el.studentid === action.payload
      );
      newStudentList.splice(studentIndex, 1);
      return {
        ...state,
        currentCourse: { ...state.currentCourse, students: newStudentList },
      };
    case CLEAR_COURSES:
      return initialState;
    default:
      return state;
  }
};

export default courseReducer;
