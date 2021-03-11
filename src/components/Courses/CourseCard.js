import React from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useUserRole } from '../../hooks';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { courseActions, moduleActions } from '../../state/ducks';

// css
import '../../styles/CourseCard.css';

export default function CourseCard(props) {
  const { course } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { userIsAdmin, userIsTeacher } = useUserRole();

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(courseActions.setEditCourse(course));
      push('/edit-course');
    } else {
      courseActions.deleteCourseThunk(course.courseid);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Course</Menu.Item>
      {userIsAdmin() && <Menu.Item key="delete">Delete Course</Menu.Item>}
    </Menu>
  );

  const viewCourseHandler = id => {
    // TODO: this should be refactored into a `moduleActions.getModulesByCourseId(courseId)` thunk
    dispatch(moduleActions.getModulesByCourseId(course.courseid));

    // axiosWithAuth()
    //   .get(`https://reach-team-a-be.herokuapp.com/modules/${id}`)
    //   .then(res => {
    //     dispatch(courseActions.setCurrentCourse(course));
    //     dispatch(moduleActions.setModuleList(res.data));
    //     push('/modules');
    //   })
    //   .catch(err => console.log(err));
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
