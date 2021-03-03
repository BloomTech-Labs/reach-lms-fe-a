import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Dashboard from './Dashboard';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { saveUser } from '../../state/actions/userActions';
import { useDispatch } from 'react-redux';
import { setProgramList } from '../../state/actions/programActions';
import {
  setCourseList,
  setTeacherCourseList,
} from '../../state/actions/courseActions';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          const user = {
            id: info.id,
            fname: info.fname,
            lname: info.lname,
            email: info.email,
            phone: info.phone,
          };
          setUserInfo(user);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });

    axiosWithAuth()
      .get('https://reach-team-a-be.herokuapp.com/users/getuserinfo')
      .then(res => {
        console.log('userinfo', res);
        let incoming_user = {
          userid: res.data.userid,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          phonenumber: res.data.phonenumber,
          role: res.data.roles[0].role.name,
          username: res.data.username,
        };
        setUserInfo(incoming_user);
        dispatch(saveUser(incoming_user));
        return incoming_user;
      })
      .then(incoming_user => {
        // add a ternary: if user is admin, get programs, if teacher/student get courses
        if (incoming_user.role === 'ADMIN') {
          axiosWithAuth()
            .get(
              `https://reach-team-a-be.herokuapp.com/programs/${incoming_user.userid}`
            )
            .then(res => {
              dispatch(setProgramList(res.data));
            });
        } else if (incoming_user.role === 'TEACHER') {
          axiosWithAuth()
            .get(
              `https://reach-team-a-be.herokuapp.com/teachers/${incoming_user.username}`
            )
            .then(res => {
              console.log(res);
              const courseList = [];
              for (let i = 0; i < res.data.courses.length; i++) {
                let newCourse = res.data.courses[i].course;
                courseList.push(newCourse);
              }
              dispatch(setCourseList(courseList));
            })
            .catch(err => {
              console.log('get courses by teacherid did not work', err);
            });
        } else {
          axiosWithAuth()
            .get(
              `https://reach-team-a-be.herokuapp.com/students/${incoming_user.username}`
            )
            .then(res => {
              console.log(res);
              const courseList = [];
              for (let i = 0; i < res.data.courses.length; i++) {
                let newCourse = res.data.courses[i].course;
                courseList.push(newCourse);
              }
              dispatch(setCourseList(courseList));
            })
            .catch(err => {
              console.log('get courses by studentid did not work', err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });

    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <>
          <Dashboard userInfo={userInfo} authService={authService} />
        </>
      )}
    </>
  );
}

export default HomeContainer;
