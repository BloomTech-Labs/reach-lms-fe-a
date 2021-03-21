import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { RestEntity } from '../_common';
// css
import '../../styles/CourseCard.css';

const CourseCardPlain = props => {
  const { course } = props;
  return (
    <Card
      title={
        <h3>
          <strong>Course</strong> {course.coursename}
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

export const CourseCardRest = props => {
  const defaultMapper = course => (
    <CourseCardPlain course={course}>{props.children}</CourseCardPlain>
  );

  return (
    <RestEntity href={props.href}>
      <RestEntity.Singleton component={props.mappedChild ?? defaultMapper} />
      <RestEntity.Error>
        <div>This error would happen for this component always!</div>
      </RestEntity.Error>
      <RestEntity.Loading>
        <div>Loading course...</div>
      </RestEntity.Loading>
    </RestEntity>
  );
};

export default CourseCardRest;
