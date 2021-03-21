import { axiosAuth } from './axiosWithAuth';
export const client = {
  postProgram: (userid, newProgram) => {
    newProgram = { ...newProgram, user: { userid } };
    axiosAuth().post('/programs/program', newProgram);
  },
  putProgram: (programId, newProgram) =>
    axiosAuth().put(`/programs/program/${programId}`, newProgram),
  patchProgram: (programId, editedProgram) =>
    axiosAuth().patch(`/programs/program/${programId}`, editedProgram),
  deleteProgram: programId =>
    axiosAuth().delete(`/programs/program/${programId}`),
  postCourse: (programId, newCourse) =>
    axiosAuth().post(`/courses/${programId}/course`, newCourse),
  putCourse: (courseId, newCourse) =>
    axiosAuth().put(`/courses/course/${courseId}`, newCourse),
  patchCourse: (courseId, editedCourse) =>
    axiosAuth().patch(`/courses/${courseId}`, editedCourse),
  deleteCourse: courseId => axiosAuth().delete(`/courses/course/${courseId}`),
  postModule: (courseId, newModule) =>
    axiosAuth().post(`/modules/${courseId}/module`, newModule),
  patchModule: (moduleId, editedModule) =>
    axiosAuth().patch(`/modules/${moduleId}`, editedModule),
};
