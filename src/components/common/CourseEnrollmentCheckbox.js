import React from 'react';
import { Card, Checkbox } from 'antd';
import { client } from '../../utils';

const CourseEnrollmentCheckbox = props => {
  const [checked, setChecked] = React.useState(props.value);

  const onChange = e => {
    setChecked(!checked);
    // if (checked) {
    //   // props.setCourseSet(...props.courseSet, props.course.courseid);
    // }
  };

  return (
    <Card
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
      <p>{props.course.coursecode}</p>
      <p>{props.course.couresname}</p>
    </Card>
  );
};

export default CourseEnrollmentCheckbox;
