import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import CreateProgramForm from '../components/Program/CreateProgramForm';
import * as reactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const userMock = {
  email: 'haldeno.52@gmail.com',
  firstname: 'Alden',
  lastname: 'Ho',
  phonenumber: '8086515839',
  role: 'ADMIN',
  userid: 4,
};

describe('<ProgramList /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

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

  test('user can fill out and submit form', async () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(userMock);

    expect(useDispatchMock).not.toHaveBeenCalled();
    //render component
    render(
      <Router>
        <CreateProgramForm />
      </Router>
    );

    const nameInput = screen.getByLabelText(/program name/i);
    const typeInput = screen.getByLabelText(/program type/i);
    const descriptionInput = screen.getByLabelText(/program description/i);

    /* fire events that update state */
    fireEvent.change(nameInput, {
      target: { value: 'math', name: 'programname' },
    });
    //   fireEvent.change(typeInput, {
    //     target: { value: '5', name: 'programtype' },
    //   });
    fireEvent.change(descriptionInput, {
      target: { value: 'good for everyone', name: 'programdescription' },
    });

    const button = screen.getByText('Submit');
    fireEvent.click(button);

    await waitFor(() => {
      expect(nameInput.value).toBe('math');
      // expect(typeInput.value).toBe('5')
      expect(descriptionInput.value).toBe('good for everyone');
      expect(useDispatchMock).toHaveBeenCalled();
    });
  });

  test('Component renders properly, title showing', () => {
    useDispatchMock.mockReturnValue(jest.fn());

    const { getByText } = render(
      <Router>
        <CreateProgramForm />
      </Router>
    );
    expect(getByText(/Create Program/i).innerHTML).toBe('Create Program');
  });
});
