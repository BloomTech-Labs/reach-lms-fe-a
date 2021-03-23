import React from 'react';
import { Redirect } from 'react-router';
import { useUserRole } from '../../hooks';

const Dashboard = props => {
  const { userIsAdmin, loading } = useUserRole();
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : userIsAdmin() ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/main" />
      )}
    </>
  );
};

export default Dashboard;
