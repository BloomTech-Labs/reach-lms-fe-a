import React from 'react';
import { useRestfulFetch, useEffectAfterMount } from '../../../hooks';

const RestContext = React.createContext();

function RestEntity(props) {
  const { data, links, error, status } = useRestfulFetch(props.href);

  useEffectAfterMount(() => {
    // we can do anything with props.href here if desired
  }, [props.href]);

  const value = React.useMemo(() => ({ data, links, error, status }), [
    data,
    error,
    links,
    status,
  ]);

  return (
    <RestContext.Provider value={value}>{props.children}</RestContext.Provider>
  );
}

function useRestContext() {
  const context = React.useContext(RestContext);
  if (!context) {
    throw new Error(
      `Collection compound components cannot be rendered outside the collection component`
    );
  }
  return context;
}

function Singleton({
  children,
  component: Component,
  container: Container = React.Fragment,
}) {
  const { data } = useRestContext();
  return data ? (
    <>
      <Container>
        {children}
        <Component {...data} />
      </Container>
    </>
  ) : null;
}

function List({
  children,
  path,
  component: Component,
  container: Container = React.Fragment,
}) {
  const { data } = useRestContext();
  return data && data[path] && data[path].length > 0 ? (
    <>
      <Container>
        {children}
        {data[path].map(dat => {
          if (RestEntity.Card) {
            return <RestEntity.Card {...dat} />;
          } else if (Component) {
            return <Component {...dat} />;
          } else {
            return <pre>dat</pre>;
          }
        })}
      </Container>
    </>
  ) : (
    <p>No such data!</p>
  );
}

function RestError({ children }) {
  const { error } = useRestContext();
  return error ? children : null;
}

function Loading({ children }) {
  const { status } = useRestContext();
  return status === 'pending' ? children : null;
}

RestEntity.Singleton = Singleton;
RestEntity.List = List;
RestEntity.Error = RestError;
RestEntity.Loading = Loading;

export default RestEntity;
