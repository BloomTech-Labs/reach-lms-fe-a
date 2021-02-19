import {
  ADD_PROGRAM,
  SEARCH_PROGRAM,
  SET_EDIT,
  DELETE_PROGRAM,
  EDIT_PROGRAM,
  SET_PROGRAM_LIST,
  FILTER_STATE,
  CLEAR_PROGRAMS,
} from '../actions/programActions';

const initialState = {
  search_programs: [],
  programs_list: [],
  edit_program: {},
  filtered_program_list: [],
};

const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROGRAM:
      console.log(action.payload);
      if (state.programs_list === false) {
        return { ...state, programs_list: [action.payload] };
      } else {
        return {
          ...state,
          programs_list: [...state.programs_list, action.payload],
        };
      }
    case SEARCH_PROGRAM:
      function filterResults() {
        const inputCopy = { ...action.payload.search_input };
        let results = action.payload.results;
        for (let i in inputCopy) {
          //deletes keys in fields that were left empty
          if (!inputCopy[i]) {
            delete inputCopy[i];
          }
        }
        let filteredResults = results.filter(el => {
          const keys = Object.keys(inputCopy);
          for (let i in keys) {
            if (el[keys[i]] !== inputCopy[keys[i]]) {
              return false;
            }
          }
          return true;
        });
        return filteredResults ? filteredResults : results;
      }
      let results = filterResults();
      return { ...state, search_programs: results };
    case SET_EDIT:
      return { ...state, edit_program: action.payload };
    case DELETE_PROGRAM:
      let newProgramList = [...state.program_list];
      console.log('program list', newProgramList);
      let index = newProgramList.findIndex(el => el.id === action.payload);
      console.log('index of program to delete', index);
      newProgramList.splice(index, 1);
      return { ...state, program_list: newProgramList };
    case EDIT_PROGRAM:
      let updatedPrograms = [...state.program_list];
      let index2 = updatedPrograms.findIndex(el => el.id === action.payload.id);
      updatedPrograms.splice(index2, 1, action.payload);
      return { ...state, program_list: updatedPrograms };
    case SET_PROGRAM_LIST:
      return { ...state, program_list: action.payload };
    case FILTER_STATE:
      console.log('action.payload', action.payload);
      return { ...state, filtered_program_list: action.payload };
    case CLEAR_PROGRAMS:
      return initialState;
    default:
      return state;
  }
};

export default programReducer;
