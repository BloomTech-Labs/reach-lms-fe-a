import React from 'react';
import UserList from './UserList';
import { client } from '../../utils/api';
import { useRestfulFetch } from '../../hooks';
import { SplitFrame, UserEnrollmentCheckbox } from '../common';

const Teachers = ({ data }) => {
  return (
    <>
      <h2>Teachers</h2>
      <div>
        <h3>Assigned</h3>
        <UserList
          href={data._links.enrolled_teachers.href}
          mappedChild={userEntity => (
            <UserEnrollmentCheckbox
              value={true}
              attach={client.attachUserToCourse}
              detach={client.removeUserFromCourse}
              username={userEntity.username}
              userid={userEntity.userid}
              courseid={data.courseid}
            />
          )}
        />
        <br />
        <h3>Not Assigned</h3>
        <UserList
          href={data._links.available_teachers.href}
          mappedChild={userEntity => (
            <UserEnrollmentCheckbox
              value={false}
              attach={client.attachUserToCourse}
              detach={client.removeUserFromCourse}
              username={userEntity.username}
              userid={userEntity.userid}
              courseid={data.courseid}
            />
          )}
        />
      </div>
    </>
  );
};

const Students = ({ data }) => {
  return (
    <>
      <h2>Students</h2>
      <div>
        <h3>Enrolled</h3>
        <UserList
          href={data._links.enrolled_students.href}
          mappedChild={userEntity => (
            <UserEnrollmentCheckbox
              value={true}
              attach={client.attachUserToCourse}
              detach={client.removeUserFromCourse}
              username={userEntity.username}
              userid={userEntity.userid}
              courseid={data.courseid}
            />
          )}
        />
      </div>
      <br />
      <div>
        <h3>Un-Enrolled</h3>
        <UserList
          href={data._links.available_students.href}
          mappedChild={userEntity => (
            <UserEnrollmentCheckbox
              value={false}
              attach={client.attachUserToCourse}
              detach={client.removeUserFromCourse}
              username={userEntity.username}
              userid={userEntity.userid}
              courseid={data.courseid}
            />
          )}
        />
      </div>
    </>
  );
};

const StudentTeacherManagement = props => {
  const { data } = useRestfulFetch(props.href);

  const onChange = evt => {
    const { name, checked } = evt.target;
    if (checked) {
      client.attachUserToCourse(name, data.courseid);
    } else {
      client.removeUserFromCourse(name, data.courseid);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <SplitFrame
      left={<Teachers data={data} onChange={onChange} />}
      right={<Students data={data} onChange={onChange} />}
    />
  );
};

export default StudentTeacherManagement;
