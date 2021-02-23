import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button, Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setEdit, deleteProgram } from '../../state/actions/programActions';
import { setCourseList } from '../../state/actions/courseActions';

export default function ProgramCard(props) {
  const { program } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(setEdit(program));
      push('/edit-program');
    } else {
      axiosWithAuth()
        .delete(
          `https://reach-team-a-be.herokuapp.com/programs/program/${program.programid}`
        )
        .then(res => {
          console.log(program.programid);
          dispatch(deleteProgram(program.programid));
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Program</Menu.Item>
      <Menu.Item key="delete">Delete Program</Menu.Item>
    </Menu>
  );

  function clickOnEdit() {}

  function deletingProgram(id) {
    axiosWithAuth()
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
      {console.log('ProgramToEdit: ' + program)}
      <Card
        title={program.programname}
        extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
        style={{ width: 800 }}
      >
        <h3>{program.programtype}</h3>
        <p>{program.programdescription}</p>
        <Button onClick={e => viewProgram(program.programid)} type="primary">
          View Program
        </Button>
      </Card>
    </>
  );
}
