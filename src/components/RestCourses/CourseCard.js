import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import '../../styles/CourseCard.css';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
const CourseCard = props => {
  const { course } = props;
  const [color, setColor] = useState('');
  const handleChangeComplete = color => {
    setColor(color.hex);
  };
  return (
    <Card
      actions={true}
      style={{
        backgroundColor: color,
      }}
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
        </div>
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
