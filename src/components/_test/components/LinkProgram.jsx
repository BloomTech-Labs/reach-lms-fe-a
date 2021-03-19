import React from 'react';
import { useRestfulFetch } from '../hooks';
import routeToLink from '../utils';
import { Link } from 'react-router-dom';

const LinkProgram = ({ href }) => {
  const { data, links } = useRestfulFetch(href);
  return (
    <div>
      {data ? (
        <>
          <h2>{data.programname}</h2>
          <h3>{data.programtype}</h3>
          <h4>{data.description}</h4>
          {links?.courses?.href && (
            <Link to={routeToLink(links.courses.href)}>View Course</Link>
          )}
        </>
      ) : (
        <>
          <div>
            <h1>Loading Program...</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default LinkProgram;
