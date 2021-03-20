import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useMountEffect, useUserRole } from '../../hooks';
import styled from 'styled-components';
import CourseCard from './CourseCard';

//ant d
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import { courseActions, programActions } from '../../state/ducks';
import { pathUtils } from '../../routes';

// styled components
const StyledCourses = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  margin-left: 10%;
  width: 50%;
`;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 10%;
  @media (max-width: 450px) {
    margin: 5% 0;
    display: flex;
    justify-content: center;
    margin-left: 0%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
  @media (max-width: 885px) {
    width: 600px;
  }
  @media (max-width: 665px) {
    width: 400px;
  }
  @media (max-width: 450px) {
    width: 325px;
    flex-direction: column;
  }
  @media (max-width: 350px) {
    width: 275px;
  }
`;

const StyledH2 = styled.h2`
  font-size: 1.75rem;
`;

const CourseList = props => {
  const { programId } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.courseReducer.coursesList);
  const { userIsAdmin } = useUserRole();

  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  useMountEffect(() => {
    dispatch(courseActions.getCoursesByProgramId(programId));
    dispatch(programActions.getProgramByProgramIdThunk(programId));
    // no dep array
  });

  return (
    <StyledWrapper>
      <StyledContent>
        {userIsAdmin() && (
          <div>
            <h1>Program: {currentProgram.programname}</h1>
          </div>
        )}
        <HeaderDiv>
          <StyledH2>My Courses</StyledH2>
          <StyledTitle>
            {userIsAdmin() && (
              <Link to={pathUtils.makeCreateCoursePath(programId)}>
                <Button size="large" style={{ background: '#01fe87' }}>
                  Add Course
                </Button>
              </Link>
            )}
          </StyledTitle>
        </HeaderDiv>
        <StyledCourses>
          {courseList.map(course => {
            return (
              <CourseCard
                key={course.courseid}
                course={course}
                programId={programId}
                push={push}
              />
            );
          })}
        </StyledCourses>
      </StyledContent>
    </StyledWrapper>
  );
};

export default CourseList;
