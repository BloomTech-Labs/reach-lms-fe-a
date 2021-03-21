import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SLink = ({ children, ...rest }) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

export default SLink;
