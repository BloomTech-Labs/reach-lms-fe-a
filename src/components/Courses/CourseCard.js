import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button, Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {
  setEditCourse,
  currentCourse,
  deleteCourse,
} from '../../state/actions/courseActions';
import { setModuleList } from '../../state/actions/moduleActions';
// css
import '../../styles/CourseCard.css';

export default function CourseCard(props) {
  const { course } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector(state => state.userReducer);

  const handleMenuClick = e => {
    console.log(course);
    if (e.key === 'edit') {
      dispatch(setEditCourse(course));
      push('/edit-course');
    } else {
      axiosWithAuth()
        .delete(
          `https://reach-team-a-be.herokuapp.com/courses/${course.courseid}`
        )
        .then(res => {
          console.log(course.courseid);
          dispatch(deleteCourse(course.courseid));
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Course</Menu.Item>
      {user.role === 'ADMIN' && (
        <Menu.Item key="delete">Delete Course</Menu.Item>
      )}
    </Menu>
  );

  const viewCourseHandler = id => {
    axiosWithAuth()
      .get(`https://reach-team-a-be.herokuapp.com/modules/${id}`)
      .then(res => {
        console.log(res);
        console.log(course);
        dispatch(currentCourse(course));
        dispatch(setModuleList(res.data));
      })
      .then(err => {
        push('/modules');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Card
        title={course.coursename}
        extra={
          (user.role === 'ADMIN' || user.role === 'TEACHER') && (
            <Dropdown.Button overlay={menu}></Dropdown.Button>
          )
        }
        className="course-card"
      >
        <h3>Program: {course.program.programname}</h3>
        <h4>Course Code: {course.coursecode}</h4>
        <p>Description: {course.coursedescription}</p>
        <Button
          onClick={() => viewCourseHandler(course.courseid)}
          type="primary"
        >
          View Course
        </Button>
      </Card>
    </>
  );
}
