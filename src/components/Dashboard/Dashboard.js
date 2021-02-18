import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setProgramList } from '../../state/actions/programActions';
import Navigation from '../Navigation';
import { addProgram } from '../../state/actions/programActions';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
// ant Design
import { saveUser } from '../../state/actions/userActions';

const Dashboard = props => {
  const { userInfo, authService } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    axiosWithAuth()
      .get('https://reach-team-a-be.herokuapp.com/users/getuserinfo')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    async function fetchData(role) {
      console.log(role);
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
      fetchData(userInfo);
    }

    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <Navigation authService={authService} />
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
