import { axiosAuth } from './axiosWithAuth';
export const client = {
  // --------------- PROGRAM ---------------
  postProgram: (userid, newProgram) => {
    newProgram = { ...newProgram, user: { userid } };
    axiosAuth().post(`/programs/${userid}/program`, newProgram);
  },
  putProgram: (programId, newProgram) =>
    axiosAuth().put(`/programs/program/${programId}`, newProgram),
  patchProgram: (programId, editedProgram) =>
    axiosAuth().patch(`/programs/program/${programId}`, editedProgram),
  deleteProgram: programId =>
    axiosAuth().delete(`/programs/program/${programId}`),
  // --------------- COURSE ---------------
  postCourse: (programId, newCourse) =>
    axiosAuth().post(`/courses/${programId}/course`, newCourse),
  putCourse: (courseId, newCourse) =>
    axiosAuth().put(`/courses/course/${courseId}`, newCourse),
  patchCourse: (courseId, editedCourse) =>
    axiosAuth().patch(`/courses/${courseId}`, editedCourse),
  deleteCourse: courseId => axiosAuth().delete(`/courses/course/${courseId}`),
  // --------------- MODULE ---------------
  postModule: (courseId, newModule) =>
    axiosAuth().post(`/modules/${courseId}/module`, newModule),
  patchModule: (moduleId, editedModule) =>
    axiosAuth().patch(`/modules/${moduleId}`, editedModule),
  deleteModule: moduleId => axiosAuth().delete(`/modules/module/${moduleId}`),
  // --------------- USER ---------------
  attachUserToCourse: (userId, courseId) =>
    axiosAuth().put(`/courses/course/${courseId}/user/${userId}`),
  removeUserFromCourse: (userId, courseId) =>
    axiosAuth().delete(`/courses/course/${courseId}/user/${userId}`),
  patchUser: (userId, editedUser) =>
    axiosAuth().patch(`/users/user/${userId}`, editedUser),
  deleteUser: userId => axiosAuth().delete(`/users/user/${userId}`),
  getAllNotCourses: userId => axiosAuth().get(`/courses/anti-user/${userId}`),
  getCourseEnrollmentObject: userId =>
    axiosAuth().get(`/courses/mappify-by-user/${userId}`),
  postNewUser: newUser => axiosAuth().post('/users/create-user', newUser),
};
