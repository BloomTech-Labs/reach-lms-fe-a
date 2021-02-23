import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button, Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setEdit, deleteProgram } from '../../state/actions/programActions';
import { setCourseList } from '../../state/actions/courseActions';

export default function ProgramCard(props) {
  const { programToEdit } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const menu = (
    <Menu>
      <Menu.Item onClick={e => clickOnEdit(e, programToEdit.id)}>
        Edit Program
      </Menu.Item>
      <Menu.Item onClick={e => deletingProgram(e, programToEdit.programid)}>
        Delete Program
      </Menu.Item>
    </Menu>
  );

  function clickOnEdit() {
    dispatch(setEdit(programToEdit));
    push('/edit-program');
  }

  function deletingProgram(e, id) {
    axiosWithAuth()
      // will have to put in the proper API call here
      .delete(`https://reach-team-a-be.herokuapp.com/programs/program/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    dispatch(deleteProgram(id));
  }

  const viewProgram = id => {
    console.log(id);
    dispatch(setCourseList(id));
    push('/courses');
  };

  return (
    <>
      <Card
        title={programToEdit.programname}
        extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
        style={{ width: 800 }}
      >
        <h3>{programToEdit.programtype}</h3>
        <p>{programToEdit.programdescription}</p>
        <Button
          onClick={e => viewProgram(programToEdit.programid)}
          type="primary"
        >
          View Program
        </Button>
      </Card>
    </>
  );
}
