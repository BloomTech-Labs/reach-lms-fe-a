import React from 'react';

import { useRestfulFetch } from '../hooks';

const LinkCourse = ({ href }) => {
  const { data } = useRestfulFetch(href);
  return (
    <div>
      {data ? (
        <>
          <h2>{data?.coursename}</h2>
          <h3>{data?.coursecode}</h3>
          <h3>{data?.coursedescription}</h3>
        </>
      ) : (
        <div>
          <h1>Loading Course...</h1>
        </div>
      )}
    </div>
  );
};

export default LinkCourse;
