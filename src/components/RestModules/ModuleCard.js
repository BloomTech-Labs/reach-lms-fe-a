import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const ModuleCard = props => {
  const { module } = props;
  return (
    <>
      <Card
        title={
          <StyledHeader>
            <strong>{module.modulename}</strong>
            {props.children}
          </StyledHeader>
        }
      >
        <h3>Description: {module.moduledescription}</h3>
        {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
      </Card>
    </>
  );
};

export default ModuleCard;
