import React from 'react';
import Styled from './ModuleListLink.styles';
import ModuleCardLink from './ModuleCardLink';
import { RestEntity } from '../_common';

const ModuleList = props => {
  return (
    <Styled.Container>
      <Styled.HeaderDiv>
        <RestEntity href={props.href ?? '/modules'}>
          <RestEntity.List
            path={['moduleList']}
            component={subEntity => (
              <ModuleCardLink
                key={subEntity._links.self.href}
                href={subEntity._links.self.href}
              />
            )}
          />
          <RestEntity.Error>
            <div>An error has occurred...</div>
          </RestEntity.Error>
          <RestEntity.Loading>
            <div>Loading...</div>
          </RestEntity.Loading>
        </RestEntity>
      </Styled.HeaderDiv>
    </Styled.Container>
  );
};

export default ModuleList;
