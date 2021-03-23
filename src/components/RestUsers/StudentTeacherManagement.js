import React from 'react';
import UserList from './UserList';
import { client } from '../../utils/api';
import { useRestfulFetch } from '../../hooks';
import styled from 'styled-components';

const SSplit = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  .left {
    background-color: white;
  }
  .right {
    background-color: white;
  }
`;

const SplitFrame = props => {
  return (
    <SSplit>
      <div className="left">{props.left}</div>
      <div className="right">{props.right}</div>
    </SSplit>
  );
};

const Teachers = ({ data, onChange }) => {
  return (
    <>
      <h2>Teachers</h2>
      <div>
        <h3>Assigned</h3>
        <UserList
          href={data._links.enrolled_teachers.href}
          mappedChild={userEntity => (
            <>
              <br />
              <input
                type="checkbox"
                name={userEntity.userid}
                onChange={onChange}
              />
              <div>{userEntity.username}</div>
            </>
          )}
        />
        <br />
        <h3>Not Assigned</h3>
        <UserList
          href={data._links.available_teachers.href}
          mappedChild={userEntity => (
            <>
              <br />
              <input
                type="checkbox"
                name={userEntity.userid}
                onChange={onChange}
              />
              <div>{userEntity.username}</div>
            </>
          )}
        />
      </div>
    </>
  );
};

const Students = ({ data, onChange }) => {
  return (
    <>
      <h2>Students</h2>
      <div>
        <h3>Enrolled</h3>
        <UserList
          href={data._links.enrolled_students.href}
          mappedChild={userEntity => (
            <>
              <br />
              <input
                type="checkbox"
                checked={true}
                name={userEntity.userid}
                onChange={onChange}
              />
              <div>{userEntity.username}</div>
            </>
          )}
        />
      </div>
      <br />
      <div>
        <h3>Un-Enrolled</h3>
        <UserList
          href={data._links.available_students.href}
          mappedChild={userEntity => (
            <>
              <br />
              <input
                type="checkbox"
                checked={false}
                name={userEntity.userid}
                onChange={onChange}
              />
              <div>{userEntity.username}</div>
            </>
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
