import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Dashboard } from './';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

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

    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <Dashboard authService={authService} />
      )}
    </>
  );
}

export default HomeContainer;
