import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserCard from './UserCard';

const UserDashboard = () => {
  return (
    <div>
      User Dashboard goes here
      <UserCard></UserCard>
    </div>
  );
};

export default UserDashboard;
