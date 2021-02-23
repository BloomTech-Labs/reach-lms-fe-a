import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setEditCourse, deleteCourse } from '../../state/actions/courseActions';

export default function CourseCard(props) {
  const { info } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    dispatch(setEditCourse(info));
    push('/edit-course');
  }

  function deletingCourse(e, id) {
    console.log(info);
    axiosWithAuth()
      // will have to put in the proper API call here
      .delete(``)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    dispatch(deleteCourse(id));
  }

  return (
    <>
      <Card title={info.coursename} style={{ width: 300 }}>
        <h3>{info.coursecode}</h3>
        <p>{info.coursedescription}</p>
        <Button type="primary" onClick={e => clickOnEdit(e, info.id)}>
          Edit Course
        </Button>
        <Button type="primary" onClick={e => deletingCourse(e, info.courseid)}>
          Delete Program
        </Button>
      </Card>
    </>
  );
}
