import React from 'react';
import styled from 'styled-components';
import CopyrightIcon from '@material-ui/icons/Copyright';

//styled-components**
const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background: black;
  color: #01fe87;
`;

const StyledH4 = styled.h4`
  color: #01fe87;
  font-size: 1.15rem;
  margin-top: 0.5%;
  @media (max-width: 400px) {
    margin-top: 2%;
    font-size: 1rem;
  }
`;

function FooterApp() {
  return (
    <StyledFooter>
      <CopyrightIcon size="large"></CopyrightIcon>
      <StyledH4>Reach LMS 2021</StyledH4>
    </StyledFooter>
  );
}

export default FooterApp;
