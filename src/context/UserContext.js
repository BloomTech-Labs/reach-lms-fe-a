import React from 'react';
import { useRestfulFetch } from '../hooks';

const UserContext = React.createContext({ user: {} });

function UserContextProvider(props) {
  const { data, links, error, status } = useRestfulFetch('users/getuserinfo');
  const value = React.useMemo(() => ({ data, links, error, status }), [
    data,
    links,
    error,
    status,
  ]);
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      `User context may not be rendered outside of the provider.`
    );
  }
  return context;
}

export default UserContextProvider;
