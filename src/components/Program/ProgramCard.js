import React from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {
  setEdit,
  deleteProgram,
  currentProgram,
} from '../../state/actions/programActions';
import { setCourseList } from '../../state/actions/courseActions';
// css
import '../../styles/ProgramCard.css';

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
          dispatch(deleteProgram(program.programid));
        })
        .catch(err => console.log(err));
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
    axiosWithAuth()
      .get(`https://reach-team-a-be.herokuapp.com/courses/${program.programid}`)
      .then(res => {
        dispatch(setCourseList(res.data));
        dispatch(currentProgram(program));
      })
      .catch(err => console.log(err));
    push('/courses');
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
