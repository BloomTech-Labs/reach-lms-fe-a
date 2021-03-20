import React from 'react';
import { useRestfulFetch, useEffectAfterMount } from '../../../hooks';

const CollectionContext = React.createContext();

function Collection(props) {
  const { data, links, error, status } = useRestfulFetch(props.href);

  useEffectAfterMount(() => {
    console.log(props.href);
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
  console.log(path);
  return data && data[path] && data[path].length > 0 ? (
    <>
      <Container>
        {children}
        {data[path].map(dat => {
          if (Collection.Card) {
            return <Collection.Card />;
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

// function Card({ data, children, path }) {
//   console.log({ data, atPath: data[path], children });
//   try {
//     return data && data[path] ? children : null;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }

// function RestError({ children }) {
//   const { error, status } = useCollectionContext();
//   return error && status === "error" ? children : null;
// }

Collection.List = List;
// Collection.Card = Card;
// Collection.RestError = RestError;

export default Collection;
