import ProgramList from '../components/Program/ProgramList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../state/reducers/rootReducer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const store = createStore(rootReducer);

jest.mock('../selectors', () => ({
  programSelector: jest.fn(() => Promise.resolve([])),
}));

describe('<ProgramList /> test suite', () => {
  test('Component renders properly, title showing', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <ProgramList />
        </Provider>
      </Router>
    );
    expect(getByText(/my programs/i).innerHTML).toBe('My Programs');
  });

  test('program list populating correctly', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <ProgramList />
        </Provider>
      </Router>
    );
    expect(getByText(/my programs/i).innerHTML).toBe('My Programs');
  });
});
