import {
  ADD_MODULE,
  SEARCH_MODULE,
  SET_EDIT_MODULE,
  DELETE_MODULE,
  EDIT_MODULE,
  SET_MODULE_LIST,
  FILTER_STATE,
  CLEAR_MODULES,
  CURRENT_MODULE,
} from '../actions/moduleActions';

const initialState = {
  search_modules: [],
  modules_list: [],
  edit_module: {},
  filtered_module_list: [],
  currentModule: {},
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MODULE:
      if (state.modules_list === false) {
        return { ...state, modules_list: [action.payload] };
      } else {
        return {
          ...state,
          modules_list: [...state.modules_list, action.payload],
        };
      }
    case SEARCH_MODULE:
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
      return { ...state, search_modules: results };
    case SET_EDIT_MODULE:
      return { ...state, edit_module: action.payload };
    case DELETE_MODULE:
      let newModuleList = [...state.modules_list].filter(item => {
        return item.moduleid !== action.payload;
      });
      return { ...state, modules_list: newModuleList };
    case EDIT_MODULE:
      let updatedModules = [...state.modules_list];
      let index2 = updatedModules.findIndex(
        el => el.moduleid === action.payload.moduleid
      );
      updatedModules.splice(index2, 1, action.payload);
      return { ...state, modules_list: updatedModules };
    case SET_MODULE_LIST:
      return { ...state, modules_list: action.payload };
    case CURRENT_MODULE:
      return { ...state, currentModule: action.payload };
    case FILTER_STATE:
      return { ...state, filtered_module_list: action.payload };
    case CLEAR_MODULES:
      return initialState;
    default:
      return state;
  }
};

export default moduleReducer;
