import React from 'react';
import { useLocation } from 'react-router-dom';

import { useRestfulFetch } from '../hooks';
import LinkCourse from './LinkCourse';

const LinkCourses = ({ url }) => {
  const { pathname } = useLocation();

  if (!url) {
    url = `https://reach-team-a-be.herokuapp.com${
      pathname.includes('/courses') ? pathname : '/courses'
    }`;
  }

  const { data, links, error } = useRestfulFetch(url);

  return (
    <div>
      {data.courseList &&
        data.courseList.map(course => {
          return (
            <LinkCourse
              key={course._links.self.href}
              href={course._links.self.href}
            />
          );
        })}
    </div>
  );
};

export default LinkCourses;
