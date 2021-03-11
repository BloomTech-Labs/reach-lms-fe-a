# Redux Ducks: The Right Way to Redux

## What is a Redux Duck?

According to the [Ducks Proposal](https://github.com/erikras/ducks-modular-redux):

Requirements for a Redux Duck:

- MUST `export default` a function called `reducer()`
- MUST `export` its action creators as functions
- MUST have action types in the form of `npm-module-or-app/reducer/ACTION_TYPE`
- MAY export its action types as `UPPER_SNAKE_CASE`, if an external reducer needs to listen for them (or if it is a published reusable library)

Okay... so what's the point? To __modularize__ redux. The clunky folder structure that most Lambda students are familiar with involves splitting action creators and reducers into two `/state/actions/` and `/state/reducers/` folders. This requires exporting in and out a million-bajillion `ACTION_TYPES` from one to the next and before you know it your JS is looking a bit too much like SQL. Ducks strive to amend that by tightening up code, removing boilerplate, and improving readability and scalability.

<!-- 
Each file inside of `src/state/ducks` is responsible for an over-arching slice of state in the Redux store. In each file, we're going to have our A

What this means is if we have the following four files: 

- `courseDuck.js`
- `moduleDuck.js`
- `programDuck.js`
- `userDuck.js`
--->

The people who *MADE* Redux liked the pattern so much they released a whole new version of Redux based upon it!: [Redux Toolkit](https://redux-toolkit.js.org/). RTK is "the official, opinionated, batteries-included toolset for efficient Redux Development." Anyone who wants to write Redux how the creators prefer should check it out.

I won't give you the whole history behind ducks and why they're worth using, but I will link to some additional resources for anyone who wants to explore more on their own.

## How Reach LMS utilizes Redux Ducks

Anyone looking at our `src/state/` folder who isn't familiar with Ducks (or maybe even those who ARE familiar with ducks) might be overwhelmed at first sight. That's fair enough, but I promise it's not as overwhelming as it looks. Well... for the most part.

Here's the breakdown...

First, let's compare it to something you know. If I were splitting my `actions` and `reducers` into two separate files, it might look something like this.

### state/actions/index.js

```javascript
// state/actions/index.js

import { axiosAuth } from "../../utils";

export const SIMPLE_ACTION_ONE = "SIMPLE_ACTION_ONE";
export const SIMPLE_ACTION_TWO = "SIMPLE_ACTION_TWO";

export const FETCH_CURRENT_USER_START = "FETCH_CURRENT_USER_START";
export const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";
export const FETCH_CURRENT_USER_FAILURE = "FETCH_CURRENT_USER_FAILURE";
export const FETCH_CURRENT_USER_RESOLVE = "FETCH_CURRENT_USER_RESOLVE";


const triggerActionOne = value => {
  return { type: ACTION_ONE, payload: value };
};

const triggerActionTwo = value => {
  return { type: ACTION_TWO, payload: value };
};

// an asynchronous thunk that interacts with an 
// endpoint and dispatches actions accordingly
export const fetchCurrentUserThunk = () => {
  return dispatch => {
    
    dispatch({ type: FETCH_CURRENT_USER_START });

    axiosAuth()
      .get("/users/current")
      .then(res => {
        dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_CURRENT_USER_FAILURE, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: FETCH_CURRENT_USER_RESOLVE });
      })
  };
};
```

### state/reducers/index.js

```javascript
// state/reducers/index.js

// Importing all the action types declared in `state/actions/index.js`
import {
  SIMPLE_ACTION_ONE,
  SIMPLE_ACTION_TWO,
  FETCH_CURRENT_USER_START,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_RESOLVE,
} from "./actions";

// The initial state of our store
const initialState = {
  isLoading: false, // PLEASE never use booleans like this 
  isLoggedIn: true, //  ^ esp. for isLoggedIn!!
  data: [],
  user: {},
  error: ''
};

const vanillaReducer = (state=initialState, action ) => {
  switch (action.type) {
    
    case SIMPLE_ACTION_ONE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case SIMPLE_ACTION_TWO:
      return {
        ...state,
        data: state.data.filter(el => el !== action.payload),
      }

    case FETCH_CURRENT_USER_START:
      return {
        ...state, 
        isLoading: true,
      };

    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }

    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    
    case FETCH_CURRENT_USER_RESOLVE:
      return {
        ...state,
        isLoading: false
      }
  }
};

export default vanillaReducer;

```

Now, ducks just takes those two files and SMASHES them together. If we made the above example into Duck, it would look like so:

### state/ducks/exampleDuck.js

```javascript
// import dependencies
import { axiosAuth } from "../../utils";

// declare action types
const SIMPLE_ACTION_ONE = "SIMPLE_ACTION_ONE";
const SIMPLE_ACTION_TWO = "SIMPLE_ACTION_TWO";

const FETCH_CURRENT_USER_START = "FETCH_CURRENT_USER_START";
const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";
const FETCH_CURRENT_USER_FAILURE = "FETCH_CURRENT_USER_FAILURE";
const FETCH_CURRENT_USER_RESOLVE = "FETCH_CURRENT_USER_RESOLVE";

// declare action creators 
export const triggerActionOne = value => {
  return { type: ACTION_ONE, payload: value };
};

export const triggerActionTwo = value => {
  return { type: ACTION_TWO, payload: value };
};

// an asynchronous thunk that interacts with an 
// endpoint and dispatches actions accordingly
export const fetchCurrentUserThunk = () => {
  return dispatch => {
    
    dispatch({ type: FETCH_CURRENT_USER_START });

    axiosAuth()
      .get("/users/current")
      .then(res => {
        dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_CURRENT_USER_FAILURE, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: FETCH_CURRENT_USER_RESOLVE });
      })
  };
};

// The initial state of our store
const initialState = {
  isLoading: false, // PLEASE never use booleans like this 
  isLoggedIn: true, //  ^ esp. for isLoggedIn!!
  data: [],
  user: {},
  error: ''
};

const vanillaReducer = (state=initialState, action ) => {
  switch (action.type) {
    
    case SIMPLE_ACTION_ONE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case SIMPLE_ACTION_TWO:
      return {
        ...state,
        data: state.data.filter(el => el !== action.payload),
      }

    case FETCH_CURRENT_USER_START:
      return {
        ...state, 
        isLoading: true,
      };

    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }

    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    
    case FETCH_CURRENT_USER_RESOLVE:
      return {
        ...state,
        isLoading: false
      }
  }
};

export default vanillaReducer;
```

Not a whole lot has changed, but at least we're not exporting and importing each action type! The Reach LMS team has actually modified the Ducks pattern in several ways for ease of use and scalability... let's look at what the above example would look like using our tools.

### state/ducks/reachExampleDuck.js

```javascript
// src/state/ducks/reachExampleDuck.js
// An example of how the Reach LMS team uses Ducks

import { axiosAuth } from '../../utils'; // src/utils

// !!!! This is one rather unique part of our Redux files. 
import { asyncThunkUtils } from '../util'; // src/state/util 

// We invoke asyncThunkUtils and pass in the PREFIX for our duck or slice of state. 
// This returns an object full of thunk utilities that help out with asynchronous 
// updates to our `state.status`
const reachExampleThunkUtils = asyncThunkUtils("REACH_EXAMPLE");

// declare action types
const SIMPLE_ACTION_ONE = "SIMPLE_ACTION_ONE";
const SIMPLE_ACTION_TWO = "SIMPLE_ACTION_TWO";

// Notice we slimmed down our Action Types b/c the START/FAIL/RESOLVE
// action types are EXACTLY what the `asyncThunkUtils` are here for!
const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";

// declare action creators... but this time we'll WRAP all the action creators 
// in one big object for ease of imports, editor hints, and overall reference

export const reachExampleActions = {
  
  // this is a callable function inside an object!!
  triggerActionOne: value => {
    return { type: ACTION_ONE, payload: value };
  },

  triggerActionTwo: value => {
    return { type: ACTION_TWO, payload: value };
  },

  fetchCurrentUserThunk: () => dispatch => {
    // so this is where our app will look especially strange 
    // but it's all in the name of consistency
    // 
    // remember when we imported `asyncThunkUtils` and then INVOKED it? It returned an object. 
    // That object has two properties that we're especially interested in.
    // We called the object returned `reactExampleThunkUtils`.
    // 
    // One of its properties is this little function here that returns yet another
    // object full of helper functions (which we de-structure)
    const {
      thunkStart, // dispatches an action with type REACH_EXAMPLE_START...
      thunkFail, // dispatches an action with type REACH_EXAMPLE_FAIL...
      thunkResolve // dispatches an action with type REACH_EXAMPLE_RESOLVE...
      // all these properties are de-structured from what gets returned from the line below.
      // the `getTriggersFromPrefix` function takes in `dispatch` and a ACTION PREFIX. 
      // 
      // If you do not pass in `dispatch`, things will break.
      //
      // What's happening under the hood is we're using closures from all these prefixes
      // and dispatching for START, FAIL, RESOLVE in a reusable manner. 
      // You may think this clutters up the code, but I promise you you'd feel differently
      // after creating 15+ async thunks that all use a START/FAIL/SUCCESS/RESOLVE
    } = reachExampleThunkUtils.getTriggersFromPrefix(dispatch, "get-user-info");


    /*
      when we're inside of our thunk, first thing we want to do is fire the `thunkStart()`
      under the hook, thunkStart is doing this:
      -------------------------------------------------------------------------
      dispatch({ type: REACH_EXAMPLE_START })
      ...
      case REACH_EXAMPLE_START:
        return {
          ...state,
          status: "get-user-info/pending",
        };
      -------------------------------------------------------------------------
    */
    thunkStart(); 

    // then we can make our async axios call
    axiosAuth()
      .get('/users/getuserinfo') // to whatever endpoint we want
      .then(res => {
        // if we're in the `.then()` statement, we know we succeeded so we're going to
        // dispatch the GET_USER_INFO_SUCCESS action that we defined ourselves.
        // 
        // The reason I left the _SUCCESS case to you guys is b/c it's the most
        // dynamic and frequently changing case for async thunks
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
      })
      /*
        if we hit a .catch(), we're going to take in `err` and fire `thunkFail(err.message)`
        thunkFail wants `err.message`, but if you wanted to customize an 
        error message, you could certainly pass in your own string
        
        under the hood, thunkFail does this dispatches an action 
        AND handles it in a reducer.
        So our `reachLmsThunkUtils` are smart enough to update state like so:
        -------------------------------------------------------------------------
        dispatch({ type: REACH_LMS_FAIL, payload: err.message })
        ...
        case REACH_EXAMPLE_FAIL:
          return {
            ...state,
            status: "get-user-info/fail",
            error: action.payload
          };
        -------------------------------------------------------------------------
      */
      .catch(err => thunkFail(err.message))
      /*
        the `.finally()` clause will run whether we FAIL or SUCCEED. 
        So we fire our `thunkResolve()`function 

        Under the hood, this function does like so:
        -------------------------------------------------------------------------
        dispatch({ type: REACH_LMS_RESOLVE });
        ...
        case REACH_EXAMPLE_RESOLVE:
          return {
            ...state,
            status: "idle"
          };
        -------------------------------------------------------------------------
      */
      .finally(() => thunkResolve());
  },
};

// The initial state of our store
const initialState = {
  // note the flexible status string instead of booleans!!
  // this gives us wicked granularity over `useEffect` calls in components
  status: "", 
  error: "",
  data: [],
  user: {},
};

const vanillaReducer = (state=initialState, action ) => {
  // THIS is what's allowing our special thunk functions to actually
  // do something with the dispatches. It just abstracts out all of our
  // START/FAIL/RESOLVE reducer cases as to not clog up the system here.
  // But we still get the benefit of the flexible status property and error!
  const { success, result } = reachExampleThunkUtils.thunkReducer(state, action);
  /*
  the thunkReducer will take in state and action just like any reducer but it 
  will wrap the state updates in another object and add a boolean success property
  
  -------------------------------------------------------------------------
  case REACH_EXAMPLE_START:
    return {
      success: true,
      result: {
        ...state, 
        status: "get-user-info/start"
      }
    }
  -------------------------------------------------------------------------
  */
  if (success) {
    return result;
  }

  switch (action.type) {
    
    case SIMPLE_ACTION_ONE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case SIMPLE_ACTION_TWO:
      return {
        ...state,
        data: state.data.filter(el => el !== action.payload),
      }
    // 
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        status: "get-user-info/success",
        user: action.payload,
      }
};

export default vanillaReducer;

```

### And here's the same example but without comments

```javascript

// src/state/ducks/reachExampleDuck.js
//
// An example of how the Reach LMS team uses Ducks

import { axiosAuth } from '../../utils';
import { asyncThunkUtils } from '../util';

// INITIALIZE DUCK-SPECIFIC UTILS
const reachExampleThunkUtils = asyncThunkUtils("REACH_EXAMPLE");

// ACTION TYPES
const SIMPLE_ACTION_ONE = "SIMPLE_ACTION_ONE";
const SIMPLE_ACTION_TWO = "SIMPLE_ACTION_TWO";

const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";

// ACTION OBJECT (full of action creators and thunks)
export const reachExampleActions = {
  triggerActionOne: value => {
    return { type: ACTION_ONE, payload: value };
  },

  triggerActionTwo: value => {
    return { type: ACTION_TWO, payload: value };
  },

  fetchCurrentUserThunk: () => dispatch => {
    const {
      thunkStart,
      thunkFail,
      thunkResolve
    } = reachExampleThunkUtils.getTriggersFromPrefix(dispatch, "get-user-info");

    thunkStart(); 

    axiosAuth()
      .get('/users/getuserinfo')
      .then(res => {
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
      })
      .catch(err => thunkFail(err.message))
      .finally(() => thunkResolve());
  },
};

// INITIAL STATE
const initialState = {
  status: "", 
  error: "",
  data: [],
  user: {},
};

// REDUCER
const reachExampleReducer = (state=initialState, action ) => {
  const { success, result } = reachExampleThunkUtils.thunkReducer(state, action);
  if (success) {
    return result;
  }

  switch (action.type) {
    case SIMPLE_ACTION_ONE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case SIMPLE_ACTION_TWO:
      return {
        ...state,
        data: state.data.filter(el => el !== action.payload),
      }
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        status: "get-user-info/success",
        user: action.payload,
      }
};

export default reachExampleReducer;

```
