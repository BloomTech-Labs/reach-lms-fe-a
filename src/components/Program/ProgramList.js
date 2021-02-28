import React from 'react';
import { useSelector } from 'react-redux';
import ProgramCard from './ProgramCard';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

//styled components
const StyledPrograms = styled.div``;
const StyledContent = styled.div``;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 10%;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgramList = () => {
  const programs = useSelector(state => state.programReducer.programs_list);

  return (
    <StyledContent>
      <HeaderDiv>
        <h2>My Programs</h2>
        <StyledTitle>
          <Link to="/create-program">
            <Button>Create Program</Button>
          </Link>
        </StyledTitle>
      </HeaderDiv>
      <StyledPrograms>
        {programs.map(program => {
          return <ProgramCard key={program.programid} program={program} />;
        })}
      </StyledPrograms>
    </StyledContent>
  );
};

export default ProgramList;
