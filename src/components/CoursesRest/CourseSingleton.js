import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card } from 'antd';
import { RestEntity } from '../_common';
import { useToggleBool } from '../../hooks';
// css
import '../../styles/CourseCard.css';
import { UserList, UserSingleton } from '../UserRest';

const CourseCardPlain = props => {
  const { course } = props;
  const [showUsers, toggleShowUsers] = useToggleBool();

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
      <Button
        onClick={() => {
          toggleShowUsers();
          console.log(course);
        }}
      >
        Manage Users
      </Button>
      {showUsers && (
        <UserList
          href={course._links.enrolled.href}
          mappedChild={userEntity => (
            <UserSingleton
              key={userEntity._links.self.href}
              href={userEntity._links.self.href}
            />
          )}
        />
      )}
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
