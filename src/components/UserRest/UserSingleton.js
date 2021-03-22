import React from 'react';
import { RestEntity } from '../_common';
import PropTypes from 'prop-types';

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

/**
 *
 * @param {{href: string, mappedChild: (data) => JSX.Element}} props
 * @returns An independent User Component able to fetch its own data and handle its own Success, Error, and Loading state
 */
const UserSingleton = props => {
  const defaultMapper = userEntity => (
    <UserComponent key={userEntity.userid} user={userEntity}>
      {props.children}
    </UserComponent>
  );
  console.log(props);

  return (
    <>
      <RestEntity href={props.href ?? '/users'}>
        <RestEntity.Singleton component={props.mappedChild ?? defaultMapper} />
      </RestEntity>
    </>
  );
};

UserSingleton.propType = PropTypes.shape({
  href: PropTypes.string,
  mappedChild: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
});

export default UserSingleton;
