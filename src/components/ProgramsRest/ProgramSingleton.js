import React from 'react';
import { RestEntity } from '../_common';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { pathUtils } from '../../routes';

const ProgramComponent = props => {
  const { program } = props;
  return (
    <>
      <Card title={program.programname}>
        <h3>{program.programtype}</h3>
        <p>{program.programdescription}</p>
        <Link to={pathUtils.makeCoursesByProgramId(program.programid)}>
          <Button primary={true}>View Program</Button>
        </Link>
        {props.children}
      </Card>
    </>
  );
};

const ProgramSingleton = props => {
  const defaultMapper = programData => (
    <ProgramComponent program={programData}>{props.children}</ProgramComponent>
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
