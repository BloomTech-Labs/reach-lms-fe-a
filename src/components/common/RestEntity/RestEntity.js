import React from 'react';
import { useRestfulFetch } from '../../../hooks';

const RestContext = React.createContext();

function RestEntity(props) {
  const { data, links, error, status } = useRestfulFetch(props.href);

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
      `RestEntity sub-components cannot be rendered outside the RestEntity component`
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
    <Container>
      {children}
      <Component {...data} />
    </Container>
  ) : null;
}

function List({
  children,
  path,
  component: Component,
  container: Container = React.Fragment,
}) {
  const { data } = useRestContext();
  return data?.[path]?.length > 0 ? (
    <Container>
      {children}
      {data[path].map(dat =>
        Component ? <Component key={dat._links.self.href} {...dat} /> : null
      )}
    </Container>
  ) : (
    <div>No data</div>
  );
}

function RestError({ children }) {
  const { error, status } = useRestContext();
  return status === 'error' && error ? children : null;
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
