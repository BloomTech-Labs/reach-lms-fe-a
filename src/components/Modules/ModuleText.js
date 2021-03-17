import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { moduleActions } from '../../state/ducks';
import styled from 'styled-components';
import { pathUtils } from '../../routes';

//ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';

//styled components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  margin-left: 10%;
`;

export default function ModuleText() {
  const { currentModule, status } = useSelector(
    state => state.moduleReducer.currentModule
  );
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { courseId, moduleId } = useParams();

  useEffect(() => {
    if (status === 'delete/success') {
      // TODO needs support for new modules path
      // import {pathUtils} from "../../routes";
      // use pathUtils.makeViewAllModulesPath function
      // grab course id from use params hook
      dispatch(moduleActions.deleteModuleThunk(module.moduleid));
      push(pathUtils.makeViewAllModulesPath(courseId));
    }
  }, [push, status]);

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(moduleActions.getModuleByModuleIdThunk(module.moduleid));
      // TODO needs support for new edit-module path — import {pathUtils} from "../../routes";
      // use pathUtils.makeEditModulePath(moduleId)
      push(pathUtils.makeEditModulePath(moduleId));
    } else {
      dispatch(moduleActions.deleteModuleThunk(module.moduleid));
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
    <StyledContainer>
      <Card
        title={currentModule.modulename}
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
        <h3>{currentModule.moduledescription}</h3>
        <p>{currentModule.modulecontent}</p>
        <Button onClick={goBack} type="secondary" className="button">
          Return to Modules List
        </Button>
      </Card>
    </StyledContainer>
  );
}
