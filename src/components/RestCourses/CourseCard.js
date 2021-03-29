import React from 'react';
import 'antd/dist/antd.css';
import { Card, Tag } from 'antd';
import '../../styles/CourseCard.css';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import Tags from './Tags';
const CourseCard = props => {
  const { course } = props;
  const [color, setColor] = useState('');
  const handleChangeComplete = color => {
    setColor(color.hex);
  };
  return (
    <Card
      actions={true}
      title={
        <div className="title">
          <h3>
            <strong>{course.coursename}</strong>
            <CirclePicker
              colors={['#673ab7', '#3f51b5', '#ffc107', '#ff9800', '#ff5722']}
              onChangeComplete={handleChangeComplete}
              circleSize={20}
            />
          </h3>
          <Tags color={color} />
          <Tag color={color}>Hello</Tag>
        </div>
      }
      className="course-card"
    >
      <h4>
        <strong>Course Code:</strong> {course.coursecode}
      </h4>
      <h4>
        <strong>Description:</strong> {course.coursedescription}
      </h4>
      <h4>Tags :</h4>

      {props.children}
      {/* <ModulesTable href={course._links.modules.href} /> */}
    </Card>
  );
};

export default CourseCard;
