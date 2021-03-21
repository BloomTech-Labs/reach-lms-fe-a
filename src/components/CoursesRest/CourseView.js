import React from 'react';
import ModuleList from '../Modules/ModuleListLink';
import { RestEntity } from '../_common';

const CourseView = props => {
  return (
    <>
      <RestEntity href={props.href}>
        <RestEntity.Singleton
          component={course => (
            <>
              <h2>Course Name: {course.coursename}</h2>
              <p>Description: {course.coursedescription}</p>
              <p>CourseCode: {course.coursecode}</p>
            </>
          )}
        />
        <RestEntity.Error>
          <div>A problem has occurred!</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading course...</div>
        </RestEntity.Loading>
      </RestEntity>
      <div>
        <h3>Modules: </h3>
        <ModuleList />
      </div>
    </>
  );
};

export default CourseView;
