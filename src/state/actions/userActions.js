export const SAVE_USER = 'SAVE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const EDIT_USER = 'EDIT_USER';

export const saveUser = value => {
  return { type: SAVE_USER, payload: value };
};
export const editUser = value => {
  return { type: EDIT_USER, payload: value };
};

export const clearUser = () => {
  return { type: CLEAR_USER };
};
