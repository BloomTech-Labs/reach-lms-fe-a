import React from 'react';
import { useRestfulFetch, useEffectAfterMount } from '../../../hooks';

const CollectionContext = React.createContext();

function Collection(props) {
  const { data, links, error, status } = useRestfulFetch(props.href);

  useEffectAfterMount(() => {
    // we can do anything with props.href here
  }, [props.href]);

  const value = React.useMemo(() => ({ data, links, error, status }), [
    data,
    error,
    links,
    status,
  ]);

  return (
    <CollectionContext.Provider value={value}>
      {props.children}
    </CollectionContext.Provider>
  );
}

function useCollectionContext() {
  const context = React.useContext(CollectionContext);
  if (!context) {
    throw new Error(
      `Collection compound components cannot be rendered outside the collection component`
    );
  }
  return context;
}

function List({
  children,
  path,
  component: Component,
  container: Container = React.Fragment,
}) {
  const { data } = useCollectionContext();
  return data && data[path] && data[path].length > 0 ? (
    <>
      <Container>
        {children}
        {data[path].map(dat => {
          if (Collection.Card) {
            return <Collection.Card {...dat} />;
          } else if (Component) {
            return <Component {...dat} />;
          } else {
            return <pre>dat</pre>;
          }
        })}
      </Container>
    </>
  ) : null;
}

function RestError({ children }) {
  const { error } = useCollectionContext();
  return error ? children : null;
}

function Loading({ children }) {
  const { status } = useCollectionContext();
  return status === 'pending' ? children : null;
}

Collection.List = List;
Collection.Error = RestError;
Collection.Loading = Loading;

export default Collection;
