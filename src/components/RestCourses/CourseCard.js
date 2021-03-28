import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import '../../styles/CourseCard.css';

const CourseCard = props => {
  const { course } = props;
  return (
    <Card header={course.coursename}>
      <h4>
        <strong>Course Code:</strong> {course.coursecode}
      </h4>
      <p>
        <strong>Description:</strong> {course.coursedescription}
      </p>
      {props.children}
      {/* <ModulesTable href={course._links.modules.href} /> */}
    </Card>
  );
};

export default CourseCard;
