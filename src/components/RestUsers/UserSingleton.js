import React from 'react';
import { RestEntity } from '../common';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

/**
 *
 * @param {{href: string, mappedChild: (data) => JSX.Element}} props
 * @returns An independent User Component able to fetch its own data and handle its own Success, Error, and Loading state
 */
const UserSingleton = props => {
  const defaultMapper = userEntity => (
    <UserCard key={userEntity.userid} user={userEntity}>
      {props.children}
    </UserCard>
  );
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
