import React from 'react';
import { Redirect } from 'react-router';
import { useUserRole } from '../../hooks';

const Dashboard = props => {
  const { userIsAdmin, status } = useUserRole();
  if (status !== 'success') {
    return <div>Loading...</div>;
  } else {
    return userIsAdmin() ? <Redirect to="/admin" /> : <Redirect to="/main" />;
  }
};

export default Dashboard;
