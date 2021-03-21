import React from 'react';
import Styled from './ModuleListLink.styles';
import { RestEntity } from '../_common';

const ModuleList = props => {
  return (
    <Styled.Container>
      <Styled.HeaderDiv>
        <RestEntity href={props.href ?? '/modules'}>
          <RestEntity.List
            path={['moduleList']}
            component={props.mappedChild}
          />
          <RestEntity.Error>
            <div>An error has occurred...</div>
          </RestEntity.Error>
          <RestEntity.Loading>
            <div>Loading...</div>
          </RestEntity.Loading>
          <RestEntity.Empty>
            <div>No modules yet!</div>
          </RestEntity.Empty>
        </RestEntity>
      </Styled.HeaderDiv>
    </Styled.Container>
  );
};

export default ModuleList;
