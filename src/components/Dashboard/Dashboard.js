import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setProgramList } from '../../state/actions/programActions';
import Navigation from '../Navigation';
import ProgramList from '../Program/ProgramList';
import CourseList from '../Courses/CourseList';
//ant d
import { Layout } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
const StyledAvatar = styled.div`
  width: 15vw;
  margin-right: 5%;
  margin-left: 5%;
  margin-top: 1%;
`;
const StyledCreate = styled.div`
  margin-top: 0.5%;
  margin-left: 36%;
`;

// ant Design
const { Header, Footer, Content } = Layout;
//

const Dashboard = props => {
  const { userInfo, authService, programList } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

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
          <StyledAvatar>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              src={
                <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              size={100}
            />
          </StyledAvatar>
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
