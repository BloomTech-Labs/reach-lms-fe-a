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
import AddModuleForm from './components/Modules/AddModuleForm';
import EditModuleForm from './components/Modules/EditModuleForm';

// redux
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import store from './state/store';
import HomeContainer from './components/Dashboard/HomeContainer';
import FooterApp from '../src/components/FooterApp';

// const persistor = persistStore(store);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
        {/* <PersistGate loading={null} persistor={persistor}>
        </PersistGate> */}
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
          <SecureRoute path="/add-module" component={AddModuleForm} />
          <SecureRoute path="/edit-module" component={EditModuleForm} />
          <SecureRoute path="/" component={HomeContainer} />
          <Route component={NotFoundPage} />
        </Switch>
        <FooterApp />
      </div>
    </Security>
  );
}
