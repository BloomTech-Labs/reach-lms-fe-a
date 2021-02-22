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
import EditProgram from '../src/components/Program/EditProgramForm(ant.design)';

// redux
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './state/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

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
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/profile" component={UserProfile} />
          <SecureRoute path="/edit-profile" component={EditUserForm} />
          <SecureRoute path="/create-program" component={CreateProgram} />
          <SecureRoute path="/edit-program" component={EditProgram} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Security>
  );
}
