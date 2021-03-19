import React from 'react';
import LinkProgram from './LinkProgram';
// custom hook
import { useRestfulFetch } from '../hooks';

const LinkPrograms = props => {
  const { data } = useRestfulFetch(
    'https://reach-team-a-be.herokuapp.com/programs'
  );

  return (
    <div>
      {data?.programList ? (
        data.programList.map(program => (
          <LinkProgram
            key={program._links.self.href}
            href={program._links.self.href}
          />
        ))
      ) : (
        <div>
          <h1>Loading Programs...</h1>
        </div>
      )}
    </div>
  );
};

export default LinkPrograms;
