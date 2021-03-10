export const ADD_MODULE = 'ADD_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';
export const SET_EDIT_MODULE = 'SET_EDIT_MODULE';
export const EDIT_MODULE = 'EDIT_MODULE';
export const SET_MODULE_LIST = 'SET_MODULE_LIST';
export const CLEAR_MODULES = 'CLEAR_MODULES';
export const CURRENT_MODULE = 'CURRENT_MODULE';

export const moduleActions = {
  addModule: value => {
    return { type: ADD_MODULE, payload: value };
  },
  setEditModule: value => {
    return { type: SET_EDIT_MODULE, payload: value };
  },
  deleteModule: value => {
    return { type: DELETE_MODULE, payload: value };
  },
  editModuleAction: value => {
    return { type: EDIT_MODULE, payload: value };
  },
  setModuleList: value => {
    return { type: SET_MODULE_LIST, payload: value };
  },
  currentModule: value => {
    return { type: CURRENT_MODULE, payload: value };
  },
  clearCourses: () => {
    return { type: CLEAR_MODULES };
  },
};

const initialState = {
  status: 'idle',
  error: null,
  modulesList: [],
  editModuleAction: {},
  currentModule: {},
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MODULE:
      if (state.modulesList === false) {
        return { ...state, modulesList: [action.payload] };
      } else {
        return {
          ...state,
          modulesList: [...state.modulesList, action.payload],
        };
      }
    case SET_EDIT_MODULE:
      return { ...state, editModuleAction: action.payload };
    case DELETE_MODULE:
      let newModuleList = [...state.modulesList].filter(item => {
        return item.moduleid !== action.payload;
      });
      return { ...state, modulesList: newModuleList };
    case EDIT_MODULE:
      let updatedModules = [...state.modulesList];
      let index2 = updatedModules.findIndex(
        el => el.moduleid === action.payload.moduleid
      );
      updatedModules.splice(index2, 1, action.payload);
      return { ...state, modulesList: updatedModules };
    case SET_MODULE_LIST:
      return { ...state, modulesList: action.payload };
    case CURRENT_MODULE:
      return { ...state, currentModule: action.payload };
    case CLEAR_MODULES:
      return initialState;
    default:
      return state;
  }
};

export default moduleReducer;
