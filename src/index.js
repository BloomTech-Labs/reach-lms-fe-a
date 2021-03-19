import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

// Styling
import 'antd/dist/antd.less';
import './styles/App.css';

// COMPONENTS & PAGES
import { config } from './utils/oktaConfig';

import {
  NotFoundPage,
  LoginPage,
  UserProfile,
  EditUserForm,
  LoadingComponent,
  CreateProgramForm,
  EditProgramForm,
  CourseList,
  AddCourseForm,
  EditCourseForm,
  ModuleList,
  ModuleText,
  AddModuleForm,
  EditModuleForm,
  HomeContainer,
  Wrapper,
} from './components';

import { Programs, Courses } from './components/_test/components';

import {
  VIEW_PROFILE_PATH,
  EDIT_PROFILE_PATH,
  CREATE_PROGRAM_PATH,
  EDIT_PROGRAM_PATH,
  // VIEW_PROGRAM_PATH,
  CREATE_COURSE_PATH,
  VIEW_ALL_COURSES_PATH,
  EDIT_COURSE_PATH,
  CREATE_MODULE_PATH,
  EDIT_MODULE_PATH,
  VIEW_ALL_MODULES_PATH,
  VIEW_MODULE_TEXT_PATH,
} from './routes';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
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
            component={() => (
              <Wrapper>
                <HomeContainer LoadingComponent={LoadingComponent} />
              </Wrapper>
            )}
          />
          {/* test routes */}
          <SecureRoute path="/link-programs" component={Programs} />
          <SecureRoute path="/courses/:programid" component={Courses} />
          <SecureRoute path="/all-courses" component={Courses} />

          <SecureRoute
            path={VIEW_PROFILE_PATH}
            component={() => (
              <Wrapper>
                <UserProfile />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={EDIT_PROFILE_PATH}
            component={() => (
              <Wrapper>
                <EditUserForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={CREATE_PROGRAM_PATH}
            component={() => (
              <Wrapper>
                <CreateProgramForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={EDIT_PROGRAM_PATH}
            component={() => (
              <Wrapper>
                <EditProgramForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={VIEW_ALL_COURSES_PATH}
            component={() => (
              <Wrapper>
                <CourseList />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={CREATE_COURSE_PATH}
            component={() => (
              <Wrapper>
                <AddCourseForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={EDIT_COURSE_PATH}
            component={() => (
              <Wrapper>
                <EditCourseForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={VIEW_ALL_MODULES_PATH}
            component={() => (
              <Wrapper>
                <ModuleList />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={VIEW_MODULE_TEXT_PATH}
            component={() => (
              <Wrapper>
                <ModuleText />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={CREATE_MODULE_PATH}
            component={() => (
              <Wrapper>
                <AddModuleForm />
              </Wrapper>
            )}
          />
          <SecureRoute
            path={EDIT_MODULE_PATH}
            component={() => (
              <Wrapper>
                <EditModuleForm />
              </Wrapper>
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Security>
  );
}
