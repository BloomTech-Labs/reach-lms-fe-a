import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setEditModule,
  deleteModule,
} from '../../___reference___/moduleActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Navigation from '../Navigation';
import styled from 'styled-components';

// css
import 'antd/dist/antd.css';

//ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Layout from 'antd/lib/layout';
const { Header, Footer, Content } = Layout;

//styled components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  margin-left: 10%;
`;

export default function ModuleText() {
  const module = useSelector(state => state.moduleReducer.currentModule);
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(setEditModule(module));
      push('/edit-module');
    } else {
      axiosWithAuth()
        .delete(
          `https://reach-team-a-be.herokuapp.com/modules/${module.moduleid}`
        )
        .then(res => {
          dispatch(deleteModule(module.moduleid));
          push('/modules');
        })
        .catch(err => console.log(err));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit Module</Menu.Item>
      <Menu.Item key="delete">Delete Module</Menu.Item>
    </Menu>
  );

  const goBack = () => {
    push('/modules');
  };

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
          <Card
            title={module.modulename}
            extra={
              user.role === 'ADMIN' ? (
                <Dropdown.Button overlay={menu}></Dropdown.Button>
              ) : user.role === 'TEACHER' ? (
                <Dropdown.Button overlay={menu}></Dropdown.Button>
              ) : (
                <div></div>
              )
            }
            style={{ width: 800 }}
          >
            <h3>{module.moduledescription}</h3>
            <p>{module.modulecontent}</p>
            <Button onClick={goBack} type="secondary" className="button">
              Return to Modules
            </Button>
          </Card>
        </Content>
      </StyledContainer>
      <Footer></Footer>
    </Layout>
  );
}
