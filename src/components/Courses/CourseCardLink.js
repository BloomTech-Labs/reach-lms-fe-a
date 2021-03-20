import React from 'react';
import 'antd/dist/antd.css';
import { Card, Dropdown, Menu, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useRestfulFetch, useSubModal, useUserRole } from '../../hooks';
import { pathUtils } from '../../routes';
import { MenuItemLink } from '../_common';

// css
import '../../styles/CourseCard.css';

const CourseCardLink = props => {
  const { href, children } = props;
  const { data: course, links, error } = useRestfulFetch(href);
  const { userIsAdmin, userIsTeacher } = useUserRole();

  const handleMenuClick = () => {};

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
