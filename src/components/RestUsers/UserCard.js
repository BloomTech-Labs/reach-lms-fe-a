import React from 'react';

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

export default UserComponent;
