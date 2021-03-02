import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';

//ant d
import { Layout } from 'antd';

// css
import '../../styles/Dashboard.css';

//styled components
const StyledWrapper = styled.div`
  display: flex;
  margin-left: 10%;
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
          <div>
            {user.role === 'ADMIN' ? <ProgramList /> : push('/courses')}
          </div>
        </StyledWrapper>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
