import React from 'react';
import { axiosAuth } from '../utils';

const UserContext = React.createContext({ user: {} });

function UserContextProvider(props) {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axiosAuth()
      .get('/users/getuserinfo')
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  const value = React.useMemo(() => ({ data, error, loading }), [
    data,
    error,
    loading,
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
