import React from 'react';
import { RestEntity } from '../common';

const ProgramList = props => {
  return (
    <>
      <RestEntity href={props.href ?? '/programs'}>
        <RestEntity.List path={['programList']} component={props.mappedChild} />
        <RestEntity.Error>
          <div>Error: Could not fetch programs...</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading Programs...</div>
        </RestEntity.Loading>
      </RestEntity>
    </>
  );
};

export default ProgramList;
