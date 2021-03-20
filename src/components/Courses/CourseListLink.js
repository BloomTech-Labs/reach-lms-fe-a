import React from 'react';
import Styled from './CourseListLink.styles';

const CourseListLink = props => {
  const { children } = props;
  return (
    <Styled.StyledWrapper>
      <Styled.StyledContent>{children}</Styled.StyledContent>
    </Styled.StyledWrapper>
  );
};

export default CourseListLink;
