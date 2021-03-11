import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useUserRole } from '../../hooks';
import { courseActions, moduleActions } from '../../state/ducks';

// css
import '../../styles/CourseCard.css';

export default function CourseCard(props) {
  const { course } = props;
  const { status, error } = useSelector(state => state.moduleReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { userIsAdmin, userIsTeacher } = useUserRole();

  useEffect(() => {
    if (status === 'get-modules-by-course-id/success') {
      push('/modules');
    }
    if (status === 'get-modules-by-course-id/error') {
      console.error(error);
    }
  }, [error, push, status]);

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(courseActions.setEditCourse(course));
      push('/edit-course');
    } else {
      dispatch(courseActions.deleteCourseThunk(course.courseid));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Course</Menu.Item>
      {userIsAdmin() && <Menu.Item key="delete">Delete Course</Menu.Item>}
    </Menu>
  );

  const viewCourseHandler = () => {
    dispatch(moduleActions.getModulesByCourseIdThunk(course.courseid));
  };

  return (
    <>
      <Card
        title={course.coursename}
        extra={
          (userIsAdmin() || userIsTeacher()) && (
            <Dropdown.Button overlay={menu}></Dropdown.Button>
          )
        }
        className="course-card"
      >
        <h3>Program: {course.program.programname}</h3>
        <h4>Course Code: {course.coursecode}</h4>
        <p>Description: {course.coursedescription}</p>
        <Button onClick={viewCourseHandler} type="primary">
          View Course
        </Button>
      </Card>
    </>
  );
}
