import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CourseCard from './CourseCard';
import SearchPage from '../Search/SearchPage';

//ant d
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Button } from 'antd';
import Navigation from '../Navigation';

// styled components
const StyledCourses = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
  @media (max-width: 450px) {
    flex-direction: column;
  }
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

const CourseList = props => {
  const { course } = props;
  const { push } = useHistory();
  const { Header, Footer, Content } = Layout;
  const courseList = useSelector(state => state.courseReducer.courses_list);
  const user = useSelector(state => state.userReducer);
  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <Layout>
        <Content>
          <StyledWrapper>
            <StyledContent>
              <div>
                {user.role === 'ADMIN' && (
                  <h1>Program: {currentProgram.programname}</h1>
                )}
              </div>
              <HeaderDiv>
                <h2>My Courses</h2>
                {user.role === 'ADMIN' && (
                  <Link to="/add-course">
                    <Button size="large" style={{ background: '#01fe87' }}>
                      Add Course
                    </Button>
                  </Link>
                )}
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
