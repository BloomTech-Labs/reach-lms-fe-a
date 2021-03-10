import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useUserRole } from '../../hooks';
import styled from 'styled-components';
import CourseCard from './CourseCard';

//ant d
import 'antd/dist/antd.css';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Navigation from '../Navigation';

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

const { Header, Footer, Content } = Layout;

const CourseList = () => {
  const { authService } = useOktaAuth();
  const courseList = useSelector(state => state.courseReducer.coursesList);
  const { userIsAdmin } = useUserRole();
  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  return (
    <Layout>
      {userIsAdmin() && (
        <Header>
          <Navigation authService={authService} />
        </Header>
      )}
      <Layout>
        <Content>
          <StyledWrapper>
            <StyledContent>
              <div>
                {userIsAdmin() && (
                  <h1>Program: {currentProgram.programname}</h1>
                )}
              </div>
              <HeaderDiv>
                <StyledH2>My Courses</StyledH2>
                <StyledTitle>
                  {userIsAdmin() && (
                    <Link to="/add-course">
                      <Button size="large" style={{ background: '#01fe87' }}>
                        Add Course
                      </Button>
                    </Link>
                  )}
                </StyledTitle>
              </HeaderDiv>
              <StyledCourses>
                {courseList.map(course => {
                  return <CourseCard key={course.id} course={course} />;
                })}
              </StyledCourses>
            </StyledContent>
          </StyledWrapper>
        </Content>
        {/* <Sider>
          {(user.role === 'ADMIN' || user.role === 'TEACHER') && <SearchPage />}
        </Sider> */}
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default CourseList;
