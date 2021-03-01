import styled from 'styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
import { useHistory } from 'react-router-dom';

//ant d
import { Layout } from 'antd';

//styled components
const StyledWrapper = styled.div`
  display: flex;
  margin-left: 10%;
`;
const StyledCreate = styled.div`
  margin-top: 1.5%;
  margin-left: 65%;
`;

// ant Design
const { Header, Footer, Content } = Layout;

const Dashboard = props => {
  const { userInfo, authService } = props;
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();

  return (
    <Layout>
      <Header>
        <Navigation authService={authService} />
      </Header>
      <Content>
        <StyledWrapper>
          <div>{user.role === 'ADMIN' ? <ProgramList /> : <CourseList />}</div>
        </StyledWrapper>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
