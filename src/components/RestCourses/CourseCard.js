import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import '../../styles/CourseCard.css';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: flex-end;
  width: 100%;
`;

const CourseCard = props => {
  const { course } = props;
  return (
    <Card
      title={
        <StyledHeader>
          <strong>{course.coursename}</strong>
          {props.children}
        </StyledHeader>
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
