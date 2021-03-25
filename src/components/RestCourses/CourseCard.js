import React from 'react';
import 'antd/dist/antd.css';
// import { Card } from 'antd';
import { Collapse } from 'antd';
import '../../styles/CourseCard.css';

const CourseCard = props => {
  const { course } = props;
  const { Panel } = Collapse;
  return (
    <Collapse accordian className="course-card">
      <Panel header={course.coursename}>
        <h4>
          <strong>Course Code:</strong> {course.coursecode}
        </h4>
        <p>
          <strong>Description:</strong> {course.coursedescription}
        </p>
        {props.children}
      </Panel>
    </Collapse>
  );
};

export default CourseCard;
