import React from 'react';
import 'antd/dist/antd.css';
import { RestEntity } from '../common';
import CourseCard from './CourseCard';

export const CourseCardRest = props => {
  const defaultMapper = course => (
    <CourseCard course={course}>{props.children}</CourseCard>
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
