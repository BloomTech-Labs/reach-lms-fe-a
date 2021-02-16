import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setProgramList } from '../../state/actions/programActions';
import Header from '../Header';
import { addProgram } from '../../state/actions/programActions';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
// ant Design

const Dashboard = props => {
  const { userInfo, authService } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    async function fetchData(role) {
      if (role === 'admin') {
        let doneLoading = await axiosWithAuth()
          .get(``)
          .then(res => {
            dispatch(setProgramList(res.data.data));
            return false;
          })
          .catch(err => console.log(err));
      } else {
        let doneLoading = await axiosWithAuth()
          .get(``)
          .then(res => {
            dispatch(setProgramList(res.data.data));
            return false;
          })
          .catch(err => console.log(err));
      }
    }

    if (isMounted) {
      fetchData(user.role);
    }

    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <Header userInfo={userInfo} authService={authService} />
      <div>
        <h1>Hi {userInfo.name} Welcome to Reach!</h1>
        <div>
          {props.userInfo.role === 'admin' ? <ProgramList /> : <CourseList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
