import React from 'react';
import { useRestfulFetch } from '../hooks';
import routeToLink from '../utils';
import { StyledLink } from '../../_common/MenuItemLink';
import { Link } from 'react-router-dom';

const LinkProgram = ({ href }) => {
  const { data, links, error } = useRestfulFetch(href);

  React.useEffect(() => {
    if (links.courses) {
      const splitUrl = routeToLink(links.courses.href);
      console.log(splitUrl);
      routeToLink(links.courses.href);
    }
  }, [links]);

  return (
    <div>
      <h2>{data?.programname}</h2>
      <h3>{data?.programtype}</h3>
      <h4>{data?.description}</h4>
      {links?.courses?.href && (
        <Link to={routeToLink(links.courses.href)}>View Course</Link>
      )}
    </div>
  );
};

export default LinkProgram;
