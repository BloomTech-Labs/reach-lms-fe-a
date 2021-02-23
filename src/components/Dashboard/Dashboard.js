import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setProgramList } from '../../state/actions/programActions';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
// ant Design
import { Link } from 'react-router-dom';
const Dashboard = props => {
  const { userInfo, authService, programList } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <Navigation authService={authService} />
      <div>
        <h1>Hi {userInfo.name} Welcome to Reach!</h1>
        <Link to="/create-program">
          <button>Create Program</button>
        </Link>
        <div>
          {user.role === 'ADMIN' ? (
            <ProgramList programList={programList} />
          ) : (
            <CourseList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
