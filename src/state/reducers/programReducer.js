import {
  ADD_PROGRAM,
  SET_EDIT,
  DELETE_PROGRAM,
  EDIT_PROGRAM,
  SET_PROGRAM_LIST,
  CLEAR_PROGRAMS,
  CURRENT_PROGRAM,
} from '../actions/programActions';

const initialState = {
  programs_list: [],
  edit_program: {},
  currentProgram: {},
};

const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROGRAM:
      if (state.programs_list === false) {
        return { ...state, programs_list: [action.payload] };
      } else {
        return {
          ...state,
          programs_list: [...state.programs_list, action.payload],
        };
      }
    case SET_EDIT:
      return { ...state, edit_program: action.payload };
    case DELETE_PROGRAM:
      let newProgramList = [...state.programs_list].filter(item => {
        return item.programid !== action.payload;
      });
      return { ...state, programs_list: newProgramList };
    case EDIT_PROGRAM:
      let updatedPrograms = [...state.programs_list];
      let index2 = updatedPrograms.findIndex(
        el => el.programid === action.payload.programid
      );
      updatedPrograms.splice(index2, 1, action.payload);
      return { ...state, programs_list: updatedPrograms };
    case SET_PROGRAM_LIST:
      return { ...state, programs_list: action.payload };
    case CURRENT_PROGRAM:
      return { ...state, currentProgram: action.payload };
    case CLEAR_PROGRAMS:
      return initialState;
    default:
      return state;
  }
};

export default programReducer;
