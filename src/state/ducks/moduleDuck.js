import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

const ADD_MODULE = 'ADD_MODULE';
const DELETE_MODULE = 'DELETE_MODULE';
const SET_EDIT_MODULE = 'SET_EDIT_MODULE';
const EDIT_MODULE = 'EDIT_MODULE';
const SET_MODULE_LIST = 'SET_MODULE_LIST';
const CLEAR_MODULES = 'CLEAR_MODULES';
const CURRENT_MODULE = 'CURRENT_MODULE';

const GET_MODULES_BY_COURSE_ID_SUCCESS = 'GET_MODULES_BY_COURSE_ID_SUCCESS';
const EDIT_MODULE_SUCCESS = 'EDIT_MODULE_SUCCESS';
const DELETE_MODULE_SUCCESS = 'DELETE_MODULE_SUCCESS';
const CREATE_MODULE_SUCCESS = 'CREATE_MODULE_SUCCESS';

const moduleThunkUtils = asyncThunkUtils('MODULE');

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
  getModulesByCourseIdThunk: courseId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = moduleThunkUtils.getTriggersFromPrefix(
      dispatch,
      'get-modules-by-course-id'
    );

    thunkStart();

    axiosAuth()
      .get(`/modules/${courseId}`)
      .then(res =>
        dispatch({ type: GET_MODULES_BY_COURSE_ID_SUCCESS, payload: res.data })
      )
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  // EDIT MODULE
  editModuleThunk: (moduleId, editedModule) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = moduleThunkUtils.getTriggersFromPrefix(dispatch, 'edit');
    thunkStart();
    axiosAuth()
      .put(`/modules/${moduleId}`, editedModule)
      .then(res => dispatch({ type: EDIT_MODULE_SUCCESS, payload: res.data }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  deleteModuleThunk: moduleId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = moduleThunkUtils.getTriggersFromPrefix(dispatch, 'delete');

    thunkStart();

    axiosAuth()
      .delete(`/modules/${moduleId}`)
      .then(res => {
        dispatch({ status: DELETE_MODULE_SUCCESS, payload: moduleId });
      })
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
  // Create module
  createModuleThunk: newModule => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = moduleThunkUtils.getTriggersFromPrefix(dispatch, 'create');

    thunkStart();

    axiosAuth()
      .post('/modules', newModule)
      .then(res => {
        dispatch({ status: CREATE_MODULE_SUCCESS, payload: res.data });
        console.log(res.data);
      })
      .catch(err => {
        thunkFail(err.message);
      })
      .finally(() => thunkResolve());
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
  const { success, result } = moduleThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }
  switch (action.type) {
    case DELETE_MODULE_SUCCESS:
      return {
        ...state,
        modulesList: state.modulesList.filter(
          ({ moduleid }) => moduleid !== action.payload
        ),
      };

    // TODO: TEST THIS
    case GET_MODULES_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        status: 'get-modules-by-course-id/success',
        modulesList: action.payload,
      };

    // TODO: TEST THIS
    case EDIT_MODULE_SUCCESS:
      return {
        ...state,
        status: 'edit/success',
      };

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
