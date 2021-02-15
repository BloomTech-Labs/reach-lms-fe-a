export const ADD_USER = "ADD_USER";
export const SKIP_ONBOARDING = "SKIP_ONBOARDING";
export const SAVE_USER = "SAVE_USER";
export const CLEAR_USER = "CLEAR_USER"

export const addUser = (value) => {
  return {type: ADD_USER, payload: value};
};

export const skipOnboarding = () => {
  return {type: SKIP_ONBOARDING};
}

export const saveUser = (value) => {
  return {type: SAVE_USER, payload: value}
}

export const clearUser = () => {
  return {type: CLEAR_USER}
}