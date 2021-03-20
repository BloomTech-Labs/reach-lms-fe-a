import React from 'react';
import { useRestfulFetch } from '../../hooks';
import CourseCard from './CourseCardLink';
import Styled from './CourseListLink.styles';

const CourseListLink = props => {
  const { children } = props;
  return (
    <Styled.StyledWrapper>
      <Styled.StyledContent>{children}</Styled.StyledContent>
    </Styled.StyledWrapper>
  );
};

// {/* {userIsAdmin() && (
//           <div>
//             <h1>Program: {currentProgram.programname}</h1>
//           </div>
//         )} */}
// <Styled.HeaderDiv>
//   <Styled.StyledH2>My Courses</Styled.StyledH2>
//   <Styled.StyledTitle>
//     {/* {userIsAdmin() && (
//       <Link to={pathUtils.makeCreateCoursePath(programId)}>
//         <Button size="large" style={{ background: '#01fe87' }}>
//           Add Course
//         </Button>
//       </Link>
//     )} */}
//   </Styled.StyledTitle>
// </Styled.HeaderDiv>
// <Styled.StyledCourses>
//   {data?.courseList?.length > 0 ?
//     data?.courseList?.map(course => {
//       return (
//         <CourseCard
//           key={course._links.self.href}
//           href={course._links.self.href}
//         />
//       );
//     })
//     : <h2>Loading Courses...</h2>
//   }

export default CourseListLink;
