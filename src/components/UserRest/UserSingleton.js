import React from 'react';
import { RestEntity } from '../_common';

const UserComponent = props => {
  const { user } = props;
  return (
    <>
      <p>
        Name: {user.firstname} {user.lastname}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
      {props.children}
    </>
  );
};

const UserSingleton = props => {
  const defaultMapper = userEntity => (
    <UserComponent key={userEntity._links.self.href}>
      {props.children}
    </UserComponent>
  );

  return (
    <>
      <RestEntity href={props.href ?? '/users'}>
        <RestEntity.Singleton component={props.mappedChild ?? defaultMapper} />
      </RestEntity>
    </>
  );
};

export default UserSingleton;
