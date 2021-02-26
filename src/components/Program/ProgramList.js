import React from 'react';
import { useSelector } from 'react-redux';
import ProgramCard from './ProgramCard';
import styled from 'styled-components';

//styled components
const StyledPrograms = styled.div``;

const ProgramList = () => {
  const programs = useSelector(state => state.programReducer.programs_list);

  return (
    <div>
      <div>
        <h2>My Programs</h2>
      </div>
      <StyledPrograms>
        {programs.map(program => {
          return <ProgramCard key={program.programid} program={program} />;
        })}
      </StyledPrograms>
    </div>
  );
};

export default ProgramList;
