import React from 'react';
import styled from 'styled-components';

const SSplit = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  .left {
    background-color: white;
  }
  .right {
    background-color: white;
  }
`;

const SplitFrame = props => {
  return (
    <SSplit>
      <div className="left">{props.left}</div>
      <div className="right">{props.right}</div>
    </SSplit>
  );
};

export default SplitFrame;
