import React from 'react';
import { Card, Checkbox } from 'antd';
import styled from 'styled-components';
import { client } from '../../utils';

const StyledP = styled.p`
&&& {
  margin: 0;
  line-height: inherit;
}
`

const CourseEnrollmentCheckbox = props => {
  const [checked, setChecked] = React.useState(props.value);

  const onChange = e => {
    setChecked(!checked);
    // if (checked) {
    //   // props.setCourseSet(...props.courseSet, props.course.courseid);
    // }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '300px',
      }}
    >
      <Checkbox
        type="checkbox"
        checked={checked}
        name={props.course.courseid}
        onChange={onChange}
      />
      <StyledP>{props.course.coursecode}</StyledP>
      <StyledP>{props.course.coursename}</StyledP>
    </div>
  );
};

export default CourseEnrollmentCheckbox;
