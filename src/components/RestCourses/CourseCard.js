import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import '../../styles/CourseCard.css';

const CourseCard = props => {
  const { course } = props;
  return (
    <Card
      title={
        <h3>
          <strong>
            {course.coursename} {props.children}
          </strong>
        </h3>
      }
      className="course-card"
    >
      <h4>
        <strong>Course Code:</strong> {course.coursecode}
      </h4>
      <p>
        <strong>Description:</strong> {course.coursedescription}
      </p>
      {props.children}
    </Card>
  );
};

export default CourseCard;
