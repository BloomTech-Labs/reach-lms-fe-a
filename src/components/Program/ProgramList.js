import React from 'react';
import { useSelector } from 'react-redux';
import ProgramCard from './ProgramCard';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

//styled components
const StyledPrograms = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 10%;
  @media (max-width: 450px) {
    display: flex;
    justify-content: center;
    margin-left: 0%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const StyledH2 = styled.h2`
  font-size: 1.75rem;
`;

const ProgramList = () => {
  const programs = useSelector(state => state.programReducer.programs_list);

  return (
    <StyledContent>
      <HeaderDiv>
        <StyledH2>My Programs</StyledH2>
        <StyledTitle>
          <Link to="/create-program">
            <Button size="large" style={{ background: '#01fe87' }}>
              Create Program
            </Button>
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
