import React from 'react';
import { RestEntity } from '../common';
import PropTypes from 'prop-types';
import ModuleCard from './ModuleCard';

// This Module Singleton creates a new instance of the
// component <RestEntity /> component.
//
// This ModuleSingleton will consume a `href` from `props.href` that represents
// an endpoint to get a single Module entity.
export const ModuleSingleton = props => {
  const defaultMapper = moduleData => (
    <ModuleCard key={moduleData._links.self.href} module={moduleData}>
      {props.children}
    </ModuleCard>
  );
  return (
    <RestEntity href={props.href}>
      <RestEntity.Singleton component={props.mappedChild ?? defaultMapper} />
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
