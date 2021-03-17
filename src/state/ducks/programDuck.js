import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

const ADD_PROGRAM = 'ADD_PROGRAM';
const DELETE_PROGRAM = 'DELETE_PROGRAM_SUCCESS';
const SET_EDIT = 'SET_EDIT';
const EDIT_PROGRAM = 'EDIT_PROGRAM';
const SET_PROGRAM_LIST = 'SET_PROGRAM_LIST';
const CLEAR_PROGRAMS = 'CLEAR_PROGRAMS';
const CURRENT_PROGRAM = 'CURRENT_PROGRAM';

const GET_PROGRAMS_BY_USER_ID_SUCCESS = 'GET_PROGRAMS_BY_USER_ID_SUCCESS';
const GET_PROGRAM_SUCCESS = 'GET_PROGRAM_SUCCESS';
const ADD_PROGRAM_SUCCESS = 'ADD_PROGRAM_SUCCESS';
const EDIT_PROGRAM_SUCCESS = 'EDIT_PROGRAM_SUCCESS';

const programThunkUtils = asyncThunkUtils('PROGRAM');

export const programActions = {
  addProgram: payload => {
    return { type: ADD_PROGRAM, payload };
  },
  setEdit: payload => {
    return { type: SET_EDIT, payload };
  },
  deleteProgram: payload => {
    return { type: DELETE_PROGRAM, payload };
  },
  editProgramAction: payload => {
    return { type: EDIT_PROGRAM, payload };
  },
  setProgramList: payload => {
    return { type: SET_PROGRAM_LIST, payload };
  },
  currentProgram: payload => {
    return { type: CURRENT_PROGRAM, payload };
  },
  clearPrograms: () => {
    return { type: CLEAR_PROGRAMS };
  },

  /*--------- GET PROGRAM BY PROGRAM ID ---------*/

  getProgramByProgramIdThunk: programId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = programThunkUtils.getTriggersFromPrefix(dispatch, 'get-program');

    thunkStart();

    axiosAuth()
      .get(`/programs/program/${programId}`)
      .then(res => dispatch({ type: GET_PROGRAM_SUCCESS, payload: res.data }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  /*--------- GET PROGRAMS BY USER ID ---------*/
  getProgramsByUserIdThunk: userId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = programThunkUtils.getTriggersFromPrefix(dispatch, 'get-programs');

    thunkStart();

    axiosAuth()
      .get(`/programs/${userId}`)
      .then(res =>
        dispatch({
          type: GET_PROGRAMS_BY_USER_ID_SUCCESS,
          payload: res.data._embedded.programList,
        })
      )
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  /*--------- ADD NEW PROGRAM ---------*/
  addProgramThunk: (userId, newProgram) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = programThunkUtils.getTriggersFromPrefix(dispatch, 'add');
    thunkStart();
    axiosAuth()
      .post(`/programs/${userId}/program`, newProgram)
      .then(res => dispatch({ type: ADD_PROGRAM_SUCCESS, payload: res.data }))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  /*--------- EDIT EXISTING PROGRAM ---------*/
  editProgramThunk: (programId, editedProgram) => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = programThunkUtils.getTriggersFromPrefix(dispatch, 'edit');
    thunkStart();
    axiosAuth()
      .put(`/programs/program/${programId}`, editedProgram)
      .then(res => {
        dispatch({ type: EDIT_PROGRAM_SUCCESS });
      })
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },

  /*--------- DELETE PROGRAM (BY PROGRAM ID) ---------*/
  deleteProgramThunk: programId => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve,
    } = programThunkUtils.getTriggersFromPrefix(dispatch, 'delete');
    thunkStart();
    axiosAuth()
      .delete(`programs/program/${programId}`)
      .then(res => dispatch(programActions.deleteProgram(programId)))
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
};

const initialState = {
  status: 'idle',
  error: null,
  programsList: [],
  editProgram: {},
  currentProgram: {},
};

const programReducer = (state = initialState, action) => {
  const { success, result } = programThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }

  switch (action.type) {
    case ADD_PROGRAM_SUCCESS:
      return {
        ...state,
        status: 'add/success',
      };

    case EDIT_PROGRAM_SUCCESS:
      return {
        ...state,
        status: 'edit/success',
        editProgram: {},
      };

    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        status: 'get-program/success',
        currentProgram: action.payload,
      };

    case GET_PROGRAMS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        status: 'get-programs/success',
        programsList: action.payload,
      };

    case ADD_PROGRAM:
      return {
        ...state,
        status: 'add/success',
        programsList: state.programsList
          ? [...state.programsList, action.payload]
          : [action.payload],
      };

    case DELETE_PROGRAM:
      return {
        ...state,
        status: 'delete/success',
        programsList: [...state.programsList].filter(
          ({ programid }) => programid !== action.payload
        ),
      };

    case EDIT_PROGRAM:
      const matchedIndex = state.programsList.findIndex(
        ({ programid }) => programid === action.payload.programid
      );
      return {
        ...state,
        status: 'edit/success',
        programsList: [...state.programsList].splice(
          matchedIndex,
          1,
          action.payload
        ),
      };

    case SET_EDIT:
      return { ...state, editProgram: action.payload };

    case SET_PROGRAM_LIST:
      return { ...state, programsList: action.payload };

    case CURRENT_PROGRAM:
      return { ...state, currentProgram: action.payload };

    case CLEAR_PROGRAMS:
      return initialState;

    default:
      return state;
  }
};

export default programReducer;
