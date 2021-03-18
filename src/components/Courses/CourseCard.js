import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useUserRole } from '../../hooks';
import { courseActions } from '../../state/ducks';
import { pathUtils } from '../../routes';
import { MenuItemLink } from '../_common';

// css
import '../../styles/CourseCard.css';

export default function CourseCard(props) {
  const { course, programId, push } = props;
  const { status, error } = useSelector(state => state.moduleReducer);
  const dispatch = useDispatch();

  const { userIsAdmin, userIsTeacher } = useUserRole();

  const VIEW_MODULES = pathUtils.makeViewAllModulesPath(course.courseid);

  useEffect(() => {
    if (status === 'get-modules-by-course-id/error') {
      console.error(error);
    }
  }, [error, status]);

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(courseActions.setEditCourse(course));
      push(pathUtils.makeEditCoursePath(programId, course.courseid));
    } else {
      dispatch(courseActions.deleteCourseThunk(course.courseid));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <MenuItemLink
        to={pathUtils.makeEditCoursePath(course.courseid)}
        key="edit"
        extra=""
      >
        Edit Module
      </MenuItemLink>
      {userIsAdmin() && <Menu.Item key="delete">Delete Course</Menu.Item>}
    </Menu>
  );

  const viewCourseHandler = () => {
    push(VIEW_MODULES);
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
        <h4>Course Code: {course.coursecode}</h4>
        <p>Description: {course.coursedescription}</p>
        <Button onClick={viewCourseHandler} type="primary">
          View Course
        </Button>
      </Card>
    </>
  );
}
