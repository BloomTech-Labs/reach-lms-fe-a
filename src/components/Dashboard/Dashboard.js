import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
//ant d
import { Layout } from 'antd';

//styled components
const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 27vh;
  font-size: 2vw;
  color: black;
  background: none;
  margin-top: 0%;
`;
const StyledWrapper = styled.div`
  display: flex;
`;
const StyledCreate = styled.div`
  margin-top: 0.5%;
  margin-left: 36%;
`;

// ant Design
const { Header, Footer, Content } = Layout;

const Dashboard = props => {
  const { userInfo, authService } = props;
  const user = useSelector(state => state.userReducer);

  return (
    <Layout>
      <Header>
        <Navigation authService={authService} />
      </Header>
      <Content>
        <StyledTitle>
          <StyledWrapper>
            <h1>Hi {userInfo.name} Welcome to Reach!</h1>
            <StyledCreate>
              <Link to="/create-program">
                <button>Create Program</button>
              </Link>
            </StyledCreate>
          </StyledWrapper>
        </StyledTitle>
        <div className="programs">
          <div>{user.role === 'ADMIN' ? <ProgramList /> : <CourseList />}</div>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
