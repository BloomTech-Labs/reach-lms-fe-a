/*------------------ NEW  ------------------*/
export const MAIN_DASH = '/main';
export const MAIN_DASH_BY_PROGRAM = '/main-by-program/:programId';
export const ADMIN_LANDING = '/admin';
/*------------------ PROFILE ------------------*/
export const VIEW_PROFILE_PATH = '/profile';
export const EDIT_PROFILE_PATH = '/edit-profile';
/*------------------ PROGRAM ------------------*/
export const CREATE_PROGRAM_PATH = '/create/program';
export const EDIT_PROGRAM_PATH = '/edit/program/:programId';
export const VIEW_PROGRAM_PATH = '/view/program/:programId';
/*------------------ COURSE ------------------*/
export const CREATE_COURSE_PATH = '/create/course/program/:programId';
export const VIEW_ALL_COURSES_PATH = '/view/program/:programId/courses';
export const EDIT_COURSE_PATH = '/edit/program/:programId/course/:courseId';
/*------------------ MODULE ------------------*/
export const CREATE_MODULE_PATH = '/create/module/course/:courseId';
export const EDIT_MODULE_PATH =
  '/edit/program/:programId/course/:courseId/module/:moduleId';
export const VIEW_ALL_MODULES_PATH = '/all-modules/courseid/:courseId';
export const VIEW_MODULE_TEXT_PATH = '/module-text';
/*------------------ USER ------------------*/
// TO COME
/*------------------ PATH CREATORS ------------------*/
export const pathUtils = {
  makeViewProgramPath: programId => `/view/program/${programId}`,
  makeEditProgramPath: programId => `/edit/program/${programId}`,
  makeCreateCoursePath: programId => `/create/course/program/${programId}`,
  makeViewAllCoursesPath: programId => `/view/program/${programId}/courses`,
  makeEditCoursePath: (programId, courseId) =>
    `/edit/program/${programId}/course/${courseId}`,
  makeEditModulePath: (programId, courseId, moduleId) =>
    `/edit/program/${programId}/course/${courseId}/module/${moduleId}`,
  makeCreateModulePath: courseId => `/create/module/course/${courseId}`,
  makeViewAllModulesPath: courseId => `/all-modules/courseid/${courseId}`,
  makeCoursesByProgramId: programId => `/main-by-program/${programId}`,
};
