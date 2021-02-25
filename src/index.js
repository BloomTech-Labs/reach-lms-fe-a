import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

// Styling
import 'antd/dist/antd.less';
import './styles/App.css';

import { NotFoundPage } from './components/NotFound';
import { LoginPage } from './components/Login';
import { HomePage } from './components/Dashboard/';
import { config } from './utils/oktaConfig';
import LoadingComponent from './components/LoadingComponent';
import UserProfile from '../src/components/Profile/UserProfile';
import EditUserForm from '../src/components/Profile/EditUserForm';
import CreateProgram from '../src/components/Program/CreateProgramForm';
import EditProgram from '../src/components/Program/EditProgramForm';
import CourseList from './components/Courses/CourseList';
import AddCourseForm from './components/Courses/AddCourseForm';
import EditCourseForm from './components/Courses/EditCourseForm';
import ModuleList from './components/Modules/ModuleList';
import ModuleText from './components/Modules/ModuleText';

// redux
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './state/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Dashboard from './components/Dashboard/Dashboard';
import HomeContainer from './components/Dashboard/HomeContainer';

const persistConfig = {
  key: 'courses_list',
  storage,
};

const persistedCourseReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedCourseReducer,
  applyMiddleware(thunk, logger)
);
let persistor = persistStore(store);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/profile" component={UserProfile} />
          <SecureRoute path="/edit-profile" component={EditUserForm} />
          <SecureRoute path="/create-program" component={CreateProgram} />
          <SecureRoute path="/edit-program" component={EditProgram} />
          <SecureRoute path="/courses" component={CourseList} />
          <SecureRoute path="/add-course" component={AddCourseForm} />
          <SecureRoute path="/edit-course" component={EditCourseForm} />
          <SecureRoute path="/modules" component={ModuleList} />
          <SecureRoute path="/module-text" component={ModuleText} />
          <SecureRoute path="/" component={HomeContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Security>
  );
}
