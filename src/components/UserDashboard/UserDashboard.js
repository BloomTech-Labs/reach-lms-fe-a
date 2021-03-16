import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMountEffect } from '../../hooks';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
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
      {selected.allUsers == undefined && <div>Loading...</div>}
      {selected.allUsers != undefined &&
        selected.allUsers.map(item => <UserCard user={item}></UserCard>)}
    </div>
  );
};

export default UserDashboard;
