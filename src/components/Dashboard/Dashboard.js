import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setProgramList } from '../../state/actions/programActions';
import Navigation from '../Navigation';
import { addProgram } from '../../state/actions/programActions';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
// ant Design
import { saveUser } from '../../state/actions/userActions';
import { Link } from 'react-router-dom';
const Dashboard = props => {
  const { userInfo, authService } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://reach-team-a-be.herokuapp.com/programs/${user.userid}`)
      .then(res => {
        console.log(res);
        dispatch(setProgramList(res.data));
      })
      .catch(err => {
        console.log(err);
      });

    // axiosWithAuth()
    //   .get(``)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // async function fetchData() {
    //   if (userRole === 'ADMIN') {
    //     let doneLoading = await axiosWithAuth()
    //       .get(`https://reach-team-a-be.herokuapp.com/${user.id}`)
    //       .then(res => {
    //         console.log(res)
    //         return false;
    //       })
    //       .catch(err => console.log(err));
    //   } else {
    //     let doneLoading = await axiosWithAuth()
    //       .get(``)
    //       .then(res => {
    //         dispatch(setProgramList(res.data.data));
    //         return false;
    //       })
    //       .catch(err => console.log(err));
    //   }
    // }

    // if (isMounted) {
    //   fetchData(userInfo);
    // }

    // return () => (isMounted = false);
  }, []);

  return (
    <div>
      <Navigation authService={authService} />
      <div>
        <h1>Hi {userInfo.name} Welcome to Reach!</h1>
        <Link to="/create-program">
          <button>Create Program</button>
        </Link>
        <div>{user.role === 'ADMIN' ? <ProgramList /> : <CourseList />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
