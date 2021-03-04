import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import EditProgramForm from '../components/Program/EditProgramForm';
import * as reactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import mockedAxios from '../__mocks__/put';

const programMock = {
  programname: 'program1',
  programtype: '1st',
  programdescription: 'program1 is good',
};

describe('<EditProgramForm /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  // removes window.matchMedia error
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  afterEach(cleanup);

  test('forms populate with current values', async () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(programMock);

    //render component
    render(
      <Router>
        <EditProgramForm />
      </Router>
    );

    // input values
    const nameInput = screen.getByLabelText(/program name/i);
    const descriptionInput = screen.getByLabelText(/program description/i);
    expect(nameInput.value).toBe('program1');
    expect(descriptionInput.value).toBe('program1 is good');
  });

  test('Component renders properly, title showing', () => {
    useDispatchMock.mockReturnValue(jest.fn());

    const { getByText } = render(
      <Router>
        <EditProgramForm />
      </Router>
    );
    expect(getByText(/edit program/i).innerHTML).toBe('Edit Program');
  });

  test('mocking axios put request', async () => {
    const data = { data: 'success' };
    mockedAxios.put.mockResolvedValueOnce(data);
    const { getByText } = render(
      <Router>
        <EditProgramForm />
      </Router>
    );
  });
});
