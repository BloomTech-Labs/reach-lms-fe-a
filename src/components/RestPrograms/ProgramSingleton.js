import React from 'react';
import { RestEntity } from '../common';
import ProgramCard from './ProgramCard';

const ProgramSingleton = props => {
  const defaultMapper = programData => (
    <ProgramCard program={programData}>{props.children}</ProgramCard>
  );

  return (
    <>
      <RestEntity href={props.href}>
        <RestEntity.Singleton component={props.mappedChild ?? defaultMapper} />
        <RestEntity.Error>
          <div>Error — Could not load program</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading program...</div>
        </RestEntity.Loading>
      </RestEntity>
    </>
  );
};

export default ProgramSingleton;
