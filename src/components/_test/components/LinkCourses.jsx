import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRestfulFetch } from '../hooks';
import LinkCourse from './LinkCourse';

const API_BASE_URL = 'https://reach-team-a-be.herokuapp.com';

const LinkCourses = ({ url }) => {
  const { pathname } = useLocation();
  if (!url) {
    url = API_BASE_URL + pathname.includes('/courses') ? pathname : '/courses';
  }

  const { data } = useRestfulFetch(url);

  return (
    <div>
      {data?.courseList ? (
        data.courseList.map(course => (
          <LinkCourse
            key={course._links.self.href}
            href={course._links.self.href}
          />
        ))
      ) : (
        <div>
          <h1>Loading Courses...</h1>
        </div>
      )}
    </div>
  );
};

export default LinkCourses;
