import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgramCard from './ProgramCard';

const ProgramList = () => {
  const programs = useSelector(state => state.programReducer.programs_list);

  return (
    <div>
      <div>
        <h2>My Programs</h2>
      </div>
      <div>
        {programs.map(program => {
          return <ProgramCard key={program.id} programToEdit={program} />;
        })}
      </div>
    </div>
  );
};

export default ProgramList;
