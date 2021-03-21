import React from 'react';
import { RestEntity } from '../_common';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const ModuleCard = props => {
  const { module } = props;
  return (
    <>
      <Card title={module.modulename}>
        <h3>Description: {module.moduledescription}</h3>
        {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
        {props.children}
      </Card>
    </>
  );
};

// This Module Singleton creates a new instance of the
// component <RestEntity /> component.
//
// This ModuleSingleton will consume a `href` from `props.href` that represents
// an endpoint to get a single Module entity.
// get the data
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

ModuleCard.propTypes = {
  module: PropTypes.shape({
    modulename: PropTypes.string.isRequired,
    moduledescription: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ModuleSingleton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ModuleSingleton;
