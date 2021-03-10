import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

const ADD_PROGRAM = 'ADD_PROGRAM';
const DELETE_PROGRAM = 'DELETE_PROGRAM';
const SET_EDIT = 'SET_EDIT';
const EDIT_PROGRAM = 'EDIT_PROGRAM';
const SET_PROGRAM_LIST = 'SET_PROGRAM_LIST';
const CLEAR_PROGRAMS = 'CLEAR_PROGRAMS';
const CURRENT_PROGRAM = 'CURRENT_PROGRAM';

const GET_PROGRAMS_BY_USER_ID_SUCCESS = 'GET_PROGRAMS_BY_USER_ID_SUCCESS';

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
  getProgramsByUserIdThunk: userId => dispatch => {
    programThunkUtils.triggerThunkStart('get-programs');

    axiosAuth()
      .get(`/programs/${userId}`)
      .then(res =>
        dispatch({ type: GET_PROGRAMS_BY_USER_ID_SUCCESS, payload: res.data })
      )
      .catch(err =>
        dispatch(
          programThunkUtils.triggerThunkFail('get-programs', err.message)
        )
      )
      .finally(() => dispatch(programThunkUtils.triggerThunkResolve()));
  },
  deleteProgramByProgramId: programId => dispatch => {
    programThunkUtils.triggerThunkStart('delete');
    axiosAuth()
      .delete(`programs/program/${programId}`)
      .then(res => dispatch(programActions.deleteProgram(programId)))
      .catch(err =>
        dispatch(programThunkUtils.triggerThunkFail('delete', err.message))
      )
      .finally(() => dispatch(programThunkUtils.triggerThunkResolve()));
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
