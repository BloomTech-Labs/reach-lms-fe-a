import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moduleActions } from '../../state/ducks';
import styled from 'styled-components';
import { pathUtils } from '../../routes';
import { useUserRole } from '../../hooks';
import { MenuItemLink } from '../_common';

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

export default function ModuleText(props) {
  const { status, error } = useSelector(state => state.moduleReducer);
  const { course, courseId, module, push } = props;
  const dispatch = useDispatch();

  const { userIsAdmin, userIsTeacher } = useUserRole();

  const VIEW_MODULES = pathUtils.makeViewAllModulesPath(course.courseid);

  useEffect(() => {
    if (status === 'get-module-by-module-id/error') {
      console.error(error);
    }
  }, [error, status]);

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(moduleActions.setEditModule(module));
      push(pathUtils.makeEditModulePath(courseId, module.moduleid));
    } else {
      dispatch(moduleActions.deleteModuleThunk(module.moduleid));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <MenuItemLink
        to={pathUtils.makeEditModulePath(module.moduleid)}
        key="edit"
        extra=""
      >
        Edit Module
      </MenuItemLink>
      {userIsAdmin() && <Menu.Item key="delete">Delete Module</Menu.Item>}
    </Menu>
  );

  const viewCourseHandler = () => {
    push(VIEW_MODULES);
  };

  return (
    <StyledContainer>
      <Card
        title={module.modulename}
        extra={
          (userIsAdmin() || userIsTeacher()) && (
            <Dropdown.Button overlay={menu}></Dropdown.Button>
          )
        }
        className="module-text"
        style={{ width: 800 }}
      >
        <h3>Module Description: {module.moduledescription}</h3>
        <p>Description: {module.modulecontent}</p>
        <Button onClick={viewCourseHandler} type="primary">
          Return
        </Button>
      </Card>
    </StyledContainer>
  );
}
