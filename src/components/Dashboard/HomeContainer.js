import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Dashboard from './Dashboard';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { saveUser } from '../../state/actions/userActions';
import { useDispatch } from 'react-redux';

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
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });

    axiosWithAuth()
      .get('https://reach-team-a-be.herokuapp.com/users/getuserinfo')
      .then(res => {
        let incoming_user = {
          id: res.data.userid,
          fname: res.data.firstname,
          lname: res.data.lastname,
          email: res.data.useremails,
          phone: res.data.phonenumber,
          role: res.data.roles[0].role.name,
        };
        dispatch(saveUser(incoming_user));
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
        <Dashboard userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

export default HomeContainer;
