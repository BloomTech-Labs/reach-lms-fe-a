import React from 'react';
import { RestEntity } from '../_common';
import { Card } from 'antd';

const ModuleCard = props => {
  const { module } = props;
  return (
    <>
      <Card title={module.modulename}>
        <h3>Description: {module.moduledescription}</h3>
        {props.children}
      </Card>
    </>
  );
};

export const ModuleSingleton = props => {
  return (
    <RestEntity href={props.href}>
      <RestEntity.Singleton
        component={moduleData => (
          <ModuleCard module={moduleData}>{props.children}</ModuleCard>
        )}
      />
      <RestEntity.Error>
        <div>Whoops! You've hit an error</div>
      </RestEntity.Error>
      <RestEntity.Loading>
        <div>Loading module data...</div>
      </RestEntity.Loading>
    </RestEntity>
  );
};

export default ModuleSingleton;
