/*------------------ NEW  ------------------*/
export const MOD_MARKDOWN = '/edit-module/:moduleId';
export const MAIN_DASH = '/main';
export const MAIN_DASH_BY_PROGRAM = '/main-by-program/:programId';
export const ADMIN_LANDING = '/admin';
export const USER_MANAGEMENT = '/users';
/*------------------ PROFILE ------------------*/
export const VIEW_PROFILE_PATH = '/profile';
/*------------------ PATH CREATORS ------------------*/
export const pathUtils = {
  makeMainByProgramIdPath: programId => `/main-by-program/${programId}`,
  makeModMarkdown: moduleId => `/edit-module/${moduleId}`,
};
