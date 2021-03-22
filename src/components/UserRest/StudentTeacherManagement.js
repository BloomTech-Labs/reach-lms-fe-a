import React from 'react';
import { UserList } from '../UserRest';
import { client } from '../../utils/api';
import { useRestfulFetch } from '../../hooks';

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
    <>
      <div>
        <div>
          <h2>Enrolled</h2>
          <UserList
            href={data._links.enrolled.href}
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
        <div>
          <h2>Un-Enrolled</h2>
          <UserList
            href={data._links.not_enrolled.href}
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
      </div>
    </>
  );
};

export default StudentTeacherManagement;
