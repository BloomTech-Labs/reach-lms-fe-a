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
    axiosAuth().put(`/courses/${courseId}`, newCourse),
  patchCourse: (courseId, editedCourse) =>
    axiosAuth().patch(`/courses/${courseId}`, editedCourse),
  deleteCourse: courseId => axiosAuth().delete(`/courses/${courseId}`),
  // --------------- MODULE ---------------
  postModule: (courseId, newModule) =>
    axiosAuth().post(`/modules/${courseId}/module`, newModule),
  patchModule: (moduleId, editedModule) =>
    axiosAuth().patch(`/modules/${moduleId}`, editedModule),
  deleteModule: moduleId => axiosAuth().delete(`/modules/${moduleId}`),
  putMarkdown: (moduleId, text) =>
    axiosAuth().put(`/modules/markdown/${moduleId}`, text),
  // --------------- USER ---------------
  attachUserToCourse: (userId, courseId) =>
    axiosAuth().put(`/courses/course/${courseId}/user/${userId}`),
  removeUserFromCourse: (userId, courseId) =>
    axiosAuth().delete(`/courses/course/${courseId}/user/${userId}`),
  patchUser: (userId, editedUser) =>
    axiosAuth().patch(`/users/user/${userId}`, editedUser),
  patchUserNewRole: (userId, roleType) =>
    axiosAuth().patch(`/users/user/${userId}/${roleType}`),
  deleteUser: userId => axiosAuth().delete(`/users/user/${userId}`),
  getAllNotCourses: userId => axiosAuth().get(`/courses/anti-user/${userId}`),
  getCourseEnrollmentObject: userId =>
    axiosAuth().get(`/courses/mappify-by-user/${userId}`),
  postNewUser: newUser => axiosAuth().post('/users/create-user', newUser),
};
