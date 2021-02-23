import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button, Menu, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setEditCourse, deleteCourse } from '../../state/actions/courseActions';

export default function CourseCard(props) {
  const { course } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleMenuClick = e => {
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
      <Menu.Item key="delete">Delete Course</Menu.Item>
    </Menu>
  );

  function clickOnEdit(e, id) {
    dispatch(setEditCourse(course));
    push('/edit-course');
  }

  function deletingCourse(id) {
    console.log(course);
    axiosWithAuth()
      // will have to put in the proper API call here
      .delete(``)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    dispatch(deleteCourse(id));
  }

  const viewCourseHandler = id => {
    axiosWithAuth()
      .get(`https://reach-team-a-be.herokuapp.com/courses/${id}`)
      .then(res => {
        console.log(res);
        console.log(id);
        // dispatch(setModuleList(res.data));
        // dispatch(viewProgram(id));
      })
      .catch(err => console.log(err));
    push('/courses');
  };

  return (
    <>
      <Card
        title={course.coursename}
        extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
        style={{ width: 800 }}
      >
        <h3>{course.coursecode}</h3>
        <p>{course.coursedescription}</p>
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
