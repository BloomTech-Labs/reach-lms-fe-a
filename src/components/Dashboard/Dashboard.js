import React from 'react';
import styled from 'styled-components';
import { useUserRole } from '../../hooks';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';

//ant d
import Layout from 'antd/lib/layout';
// css
import '../../styles/Dashboard.css';

//styled-components
const StyledWrapper = styled.div`
  display: flex;
  margin-left: 10%;
`;
// Ant Design Layout Structure
const { Header, Footer, Content } = Layout;

const Dashboard = props => {
  const { authService } = props;
  const { userIsAdmin } = useUserRole();

  return (
    <Layout>
      <Header>
        <Navigation authService={authService} />
      </Header>
      <Content>
        <StyledWrapper>
          <div>{userIsAdmin() ? <ProgramList /> : <CourseList />}</div>
        </StyledWrapper>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
