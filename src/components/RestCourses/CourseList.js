import React from 'react';
import { RestEntity } from '../common';
import Styled from './CourseList.styles';

export const CourseListRest = props => {
  return (
    <>
      <Styled.StyledContent>
        <RestEntity href={props.href ?? '/courses'}>
          <RestEntity.List
            path={['courseList']}
            component={props.mappedChild}
          />
          <RestEntity.Error>
            <div>There's been a problem!</div>
          </RestEntity.Error>
          <RestEntity.Loading>
            <div>Loading Courses...</div>
          </RestEntity.Loading>
        </RestEntity>
      </Styled.StyledContent>
    </>
  );
};

export default CourseListRest;
