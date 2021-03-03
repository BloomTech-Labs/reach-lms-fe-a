import Dashboard from '../components/Dashboard/Dashboard';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';

const mockPrograms = {
  programs: [
    {
      programid: 1,
      programname: 'name1',
      programtype: '1st',
      programdescription: 'description1',
    },
    {
      programid: 2,
      programname: 'name2',
      programtype: '2nd',
      programdescription: 'description2',
    },
    {
      programid: 3,
      programname: 'name3',
      programtype: '3rd',
      programdescription: 'description3',
    },
  ],
};
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
}));

describe('Render <Dashboard /> test suite', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  test('it handles a loading state, renders properly', async () => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockPrograms.programs);

    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );

    await waitFor(() => {
      expect(getByText(/my programs/i).innerHTML).toBe('My Programs');
      expect(getByText(/create program/i).innerHTML).toBe('Create Program');
    });
  });
});
