import {
  ADD_PROGRAM,
  SEARCH_PROGRAM,
  SET_EDIT,
  DELETE_PROGRAM,
  EDIT_PROGRAM,
  SET_PROGRAM_LIST,
  FILTER_STATE,
  CLEAR_PROGRAMS,
  VIEW_PROGRAM,
  SET_PROGRAM_ID,
} from '../actions/programActions';

const initialState = {
  search_programs: [],
  programs_list: [],
  edit_program: {},
  filtered_program_list: [],
  viewProgramId: 0,
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
      // let newProgramList = [...state.programs_list];
      // console.log('programs list', newProgramList);
      // let index = newProgramList.findIndex(el => el.id === action.payload);
      // console.log('index of program to delete', index);
      // newProgramList.splice(index, 1);
      // return { ...state, programs_list: newProgramList };
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
    case SET_PROGRAM_ID:
      return { ...state, viewProgramId: action.payload };
    case FILTER_STATE:
      console.log('action.payload', action.payload);
      return { ...state, filtered_program_list: action.payload };
    case VIEW_PROGRAM:
      return { ...state, viewProgramId: action.payload };
    case CLEAR_PROGRAMS:
      return initialState;
    default:
      return state;
  }
};

export default programReducer;
