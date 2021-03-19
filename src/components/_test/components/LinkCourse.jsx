import React from 'react';

import { useRestfulFetch } from '../hooks';

const LinkCourse = ({ href }) => {
  const { data, links, error } = useRestfulFetch(href);

  return (
    <div>
      <h2>{data?.coursename}</h2>
      <h3>{data?.coursecode}</h3>
      <h3>{data?.coursedescription}</h3>
    </div>
  );
};

export default LinkCourse;
