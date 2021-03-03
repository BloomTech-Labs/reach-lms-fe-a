import ModuleList from '../components/Modules/ModuleList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor, cleanup } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';
import mockedAxios from 'axios';
import axios from '../__mocks__/axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const mockModulesList = {
  modules: [
    {
      moduleid: 1,
      modulename: 'name1',
      modulecode: '1st',
      moduledescription: 'description1',
      modulecontent: 'content1',
    },
    {
      moduleid: 2,
      modulename: 'name2',
      modulecode: '2nd',
      moduledescription: 'description2',
      modulecontent: 'content2',
    },
    {
      moduleid: 3,
      modulename: 'name3',
      modulecode: '3rd',
      moduledescription: 'description3',
      modulecontent: 'content3',
    },
  ],
};

// data for get request
const studentsMock = {
  students: [
    {
      studentsid: 1,
      studentname: 'name1',
    },
    {
      studentsid: 2,
      studentname: 'name2',
    },
    {
      studentsid: 3,
      studentname: 'name3',
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

describe('<moduleList /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const axiosWithAuthMock = jest.spyOn(axiosWithAuth(), 'axiosWithAuth');
  const axiosWithAuth = jest.fn(axiosWithAuth);
  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  afterEach(cleanup);

  test('it handles a loading state', async () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockModulesList.modules);
    axiosWithAuthMock.mockReturnValue(studentsMock.students);

    //render component
    const { getByText } = render(
      <Router>
        <ModuleList />
      </Router>
    );

    // await for mockThunk to dispatch and assert that expected data is
    // rendered to the page
    await waitFor(() => {
      let name = getByText(/name1/i);
      expect(name).toBeInTheDocument();
      let type = getByText(/1st/i);
      expect(type).toBeInTheDocument();
      let description = getByText(/description1/i);
      expect(description).toBeInTheDocument();
      expect(getByText('name1'));
    });
  });

  test('Component renders properly, title showing', () => {
    const { getByText } = render(
      <Router>
        <ModuleList />
      </Router>
    );
    expect(getByText(/my modules/i).innerHTML).toBe('My Courses');
  });
});
