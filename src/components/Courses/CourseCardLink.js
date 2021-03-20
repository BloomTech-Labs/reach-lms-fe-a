import React from 'react';
import 'antd/dist/antd.css';
import { Card, Dropdown, Menu } from 'antd';
import { useRestfulFetch, useUserRole } from '../../hooks';

// css
import '../../styles/CourseCard.css';

const CourseCardLink = props => {
  const { href, children } = props;
  const { data: course } = useRestfulFetch(href);
  const { userIsAdmin, userIsTeacher } = useUserRole();

  const handleMenuClick = menuItem => {};

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Module</Menu.Item>
      {userIsAdmin() && <Menu.Item key="delete">Delete Course</Menu.Item>}
    </Menu>
  );

  return (
    <div>
      {course ? (
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
          {children}
        </Card>
      ) : (
        <h2>Loading course...</h2>
      )}
    </div>
  );
};

export default CourseCardLink;
