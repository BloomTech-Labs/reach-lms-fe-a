import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMountEffect } from '../../hooks';
import UserCard from './UserCard';
import { userActions } from '../../state/ducks';

const UserDashboard = () => {
  const selected = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(userActions.getAllUsersThunk());
  });

  return (
    <div>
      <h2>ID, Username, First Name, Last Name, Role </h2>
      {selected.allUsers ? (
        selected.allUsers.map(item => (
          <UserCard key={item.userid} user={item}></UserCard>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserDashboard;
