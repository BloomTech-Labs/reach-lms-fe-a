import React from 'react';

import LinkProgram from './LinkProgram';
import { StyledLink } from '../../_common/MenuItemLink';

// custom fetch hook
import { useRestfulFetch } from '../hooks';

const LinkPrograms = props => {
  const { data, links, error } = useRestfulFetch(
    'https://reach-team-a-be.herokuapp.com/programs'
  );

  // React.useEffect(() => {}, []);

  return (
    <div>
      {data.programList &&
        data.programList.map(program => {
          return (
            <LinkProgram
              key={program._links.self.href}
              href={program._links.self.href}
            />
          );
        })}
    </div>
  );
};

export default LinkPrograms;
