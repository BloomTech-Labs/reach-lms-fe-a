import ProgramList from '../components/Program/ProgramList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';
import userEvent from '@testing-library/user-event';

const mockPrograms = {
  programs: [
    {
      programId: 1,
      programname: 'name1',
      programtype: '1st',
      programDescription: 'description1',
    },
    {
      programId: 2,
      programname: 'name2',
      programtype: '2nd',
      programDescription: 'description2',
    },
    {
      programId: 3,
      programname: 'name3',
      programtype: '3rd',
      programDescription: 'description3',
    },
  ],
};

describe('<ProgramList /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  test('it handles a loading state', async () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockPrograms.programs);

    //render component
    const { getByText } = render(
      <Router>
        <ProgramList />
      </Router>
    );

    // await for mockThunk to dispatch and assert that expected data is
    // rendered to the page
    await waitFor(() => {
      let name = getByText(/name1/i);
      expect(name).toBeInTheDocument();
    });
  });

  test('Component renders properly, title showing', () => {
    const { getByText } = render(
      <Router>
        <ProgramList />
      </Router>
    );
    expect(getByText(/my programs/i).innerHTML).toBe('My Programs');
  });
});
