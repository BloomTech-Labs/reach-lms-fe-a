import React from 'react';
import styled from 'styled-components';
import CopyrightIcon from '@material-ui/icons/Copyright';

//styled-components**
const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 88%;
`;

function FooterApp() {
  return (
    <StyledFooter>
      <CopyrightIcon></CopyrightIcon>
      <h4>Reach LMS 2021</h4>
    </StyledFooter>
  );
}

export default FooterApp;
