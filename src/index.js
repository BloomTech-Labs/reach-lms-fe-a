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

// COMPONENTS & PAGES
import { config } from './utils/oktaConfig';
import { UserProfile } from './components/Profile';
import { LoginPage } from './components/Login';
import { NotFoundPage } from './components/NotFound';
import { LoadingComponent } from './components/LoadingComponent';
import { HomePage } from './components/Dashboard';
import { Wrapper } from './components/Wrapper';
import { Main, AdminMain, AdminLanding } from './components/Main';
import UserContextProvider from './context/UserContext';

import {
  MAIN_DASH_BY_PROGRAM,
  VIEW_PROFILE_PATH,
  ADMIN_LANDING,
  MAIN_DASH,
} from './routes';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
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
      <UserContextProvider>
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
                  <HomePage LoadingComponent={LoadingComponent} />
                </Wrapper>
              )}
            />
            <SecureRoute
              path={MAIN_DASH}
              component={() => (
                <Wrapper>
                  <Main />
                </Wrapper>
              )}
            />
            <SecureRoute
              path={MAIN_DASH_BY_PROGRAM}
              component={() => (
                <Wrapper>
                  <AdminMain />
                </Wrapper>
              )}
            />
            <SecureRoute
              path={ADMIN_LANDING}
              component={() => (
                <Wrapper>
                  <AdminLanding />
                </Wrapper>
              )}
            />
            <SecureRoute
              path={VIEW_PROFILE_PATH}
              component={() => (
                <Wrapper>
                  <UserProfile />
                </Wrapper>
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </UserContextProvider>
    </Security>
  );
}
