import React from 'react';
import styled from 'styled-components';
import { useUserRole } from '../../hooks';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
import UserDashboard from '../UserDashboard/UserDashboard';

// css
import '../../styles/Dashboard.css';

//styled-components
const StyledWrapper = styled.div`
  display: flex;
  margin-left: 10%;
`;

const Dashboard = props => {
  const { userIsAdmin } = useUserRole();

  return (
    <>
      <StyledWrapper>
        <div>{userIsAdmin() ? <ProgramList /> : <CourseList />}</div>
      </StyledWrapper>
      <div>{userIsAdmin() ? <UserDashboard></UserDashboard> : null}</div>
    </>
  );
};

export default Dashboard;
