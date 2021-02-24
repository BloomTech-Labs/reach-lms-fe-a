import React from 'react';
import { useSelector } from 'react-redux';
import ModuleCard from './ModuleCard';

const ModuleList = props => {
  const modules = useSelector(state => state.moduleReducer.modules_list);

  return (
    <div>
      <div>
        <h2>My Modules</h2>
      </div>
      <div>
        {modules.map(module => {
          return <ModuleCard key={module.moduleid} module={module} />;
        })}
      </div>
    </div>
  );
};

export default ModuleList;
