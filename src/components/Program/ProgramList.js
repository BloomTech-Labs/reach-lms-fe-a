import React from 'react';
import { useSelector } from 'react-redux';
import ProgramCard from './ProgramCard';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

//styled components
const StyledPrograms = styled.div``;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 10%;
`;

const ProgramList = () => {
  const programs = useSelector(state => state.programReducer.programs_list);

  return (
    <div>
      <StyledTitle>
        <Link to="/create-program">
          <Button>Create Program</Button>
        </Link>
      </StyledTitle>
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
