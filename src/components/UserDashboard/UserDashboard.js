import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMountEffect } from '../../hooks';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserCard from './UserCard';

import { userActions } from '../../state/ducks';
import { ContactSupportOutlined } from '@material-ui/icons';

const UserDashboard = () => {
  const selected = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(userActions.getAllUsersThunk());
  });

  return (
    <div>
      <h2>ID, Username, First Name, Last Name, Role </h2>
      {selected.allUsers == undefined && <div>Loading...</div>}
      {selected.allUsers != undefined &&
        selected.allUsers.map(item => (
          <UserCard key={item.userid} user={item}></UserCard>
        ))}
    </div>
  );
};

export default UserDashboard;
