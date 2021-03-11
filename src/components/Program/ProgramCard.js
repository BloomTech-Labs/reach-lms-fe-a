import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { programActions, courseActions } from '../../state/ducks';
// css
import '../../styles/ProgramCard.css';

export default function ProgramCard(props) {
  const { program } = props;
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.courseReducer);
  const { push } = useHistory();

  useEffect(() => {
    if (status === 'get-by-program-id/success') {
      push('/courses');
    }
    if (status === 'get-by-program-id/error') {
      // we'll probably want to display an error to our user instead of sending it to console
      console.error(error);
    }
  }, [status, push, error]);

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(programActions.setEdit(program));
      push('/edit-program');
    } else {
      dispatch(programActions.deleteProgramThunk(program.programid));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" extra="">
        Edit Program
      </Menu.Item>
      <Menu.Item key="delete">Delete Program</Menu.Item>
    </Menu>
  );

  const viewProgramHandler = program => {
    // this should be refactored into a `courseActions.getCoursesByProgramId` thunk
    dispatch(courseActions.getCoursesByProgramId(program.programid));
    dispatch(programActions.currentProgram(program));
  };

  return (
    <div className="program-card-container">
      <Card
        title={program.programname}
        extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
        className="program-card"
      >
        <h3>{program.programtype}</h3>
        <p>{program.programdescription}</p>
        <Button onClick={() => viewProgramHandler(program)} type="primary">
          View Program
        </Button>
      </Card>
    </div>
  );
}
