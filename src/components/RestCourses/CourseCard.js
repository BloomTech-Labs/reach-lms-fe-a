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
    console.log(color);
  };
  return (
    <Card
      style={{
        backgroundColor: color,
      }}
      title={
        <h3 color={color}>
          <strong>{course.coursename}</strong>
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
      <CirclePicker
        colors={['#673ab7', '#3f51b5', '#ffc107', '#ff9800', '#ff5722']}
        onChangeComplete={handleChangeComplete}
        circleSize={36}
      />
      {props.children}
    </Card>
  );
};

export default CourseCard;
