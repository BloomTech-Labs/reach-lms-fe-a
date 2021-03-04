import ModuleList from '../components/Modules/ModuleList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor, cleanup } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { act } from 'react-dom/test-utils';
import expect from 'expect';
import * as axios from 'axios';
import mockedAxios from '../__mocks__/get';
import CourseList from '../components/Courses/CourseList';

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

jest.mock('axios');

describe('<moduleList /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  afterEach(cleanup);

  // test('it handles a loading state', async () => {
  //   // when spyOn detects dispatch/selector call, mock dispatch and selector
  //   // return values
  //   useDispatchMock.mockReturnValue(jest.fn());
  //   useSelectorMock.mockReturnValue(mockModulesList.modules);
  //   //render component
  //   const { getByText } = render(
  //     <Router>
  //       <ModuleList />
  //     </Router>
  //   );

  //   // await for mockThunk to dispatch and assert that expected data is
  //   // rendered to the page
  //   await waitFor(() => {
  //     let name = getByText(/name1/i);
  //     expect(name).toBeInTheDocument();
  //     let type = getByText(/1st/i);
  //     expect(type).toBeInTheDocument();
  //     let description = getByText(/description1/i);
  //     expect(description).toBeInTheDocument();
  //     expect(getByText('name1'));
  //   });
  // });

  test('Component renders properly, title showing', async () => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockModulesList.modules);
    act(async () => {
      await axios.get.mockImplementationOnce(() =>
        Promise.resolve(mockModulesList.modules)
      );
    });

    const { getByText } = render(
      <Router>
        <ModuleList />
      </Router>
    );
    // rendered to the page
    let name = getByText(/name1/i);
    expect(name).toBeInTheDocument();
  });
});
