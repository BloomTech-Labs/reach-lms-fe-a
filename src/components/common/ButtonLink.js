import React from 'react';
import { Button } from 'react';
import GhostLink from './GhostLink';

const SLink = ({ to, children, ...rest }) => {
  return (
    <GhostLink to={to}>
      <Button {...rest}>{children}</Button>
    </GhostLink>
  );
};

export default SLink;
