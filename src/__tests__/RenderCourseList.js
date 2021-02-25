import CourseList from '../components/Courses/CourseList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';
import Dashboard from '../components/Dashboard/Dashboard';

const mockCourses = {
  courses: [
    {
      courseid: 1,
      coursename: 'name1',
      coursecode: '1st',
      coursedescription: 'description1',
    },
    {
      courseid: 2,
      coursename: 'name2',
      coursecode: '2nd',
      coursedescription: 'description2',
    },
    {
      courseid: 3,
      coursename: 'name3',
      coursecode: '3rd',
      coursedescription: 'description3',
    },
  ],
};

describe('<courseList /> test suite', () => {
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
    useSelectorMock.mockReturnValue(mockCourses.courses);

    //render component
    const { getByText } = render(
      <Router>
        <CourseList />
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
    });
  });

  test('Component renders properly, title showing', () => {
    const { getByText } = render(
      <Router>
        <CourseList />
      </Router>
    );
    expect(getByText(/my courses/i).innerHTML).toBe('My Courses');
  });
});
