import Dashboard from '../components/Dashboard/Dashboard';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../state/reducers/rootReducer';

const store = createStore(rootReducer);

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state, renders properly', () => {
    const authService = {
      logout: jest.fn(),
    };
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Dashboard userInfo={{ name: 'Sara' }} authService={authService} />
        </Provider>
      </Router>
    );
    const button = getByText(/logout/i);
    userEvent.click(button);
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(getByText(/hi sara welcome to reach!/i).innerHTML).toBe(
      'Hi Sara Welcome to Reach!'
    );
    expect(getByText(/create program/i).innerHTML).toBe('Create Program');
  });
});
