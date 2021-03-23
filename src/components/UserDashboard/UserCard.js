import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../state/ducks';
import { useUserRole } from '../../hooks';
import { pathUtils } from '../../routes';
import { MenuItemLink } from '../_common';

//ant design stuff
import 'antd/dist/antd.css';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';

export default function UserCard(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const { userIsAdmin } = useUserRole();

  const handleMenuClick = e => {
    if (e.key === 'edit') {
      dispatch(userActions.setEdit(user.userid));
    } else {
      dispatch(userActions.deleteUserThunk(user.userid));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <MenuItemLink
        to={pathUtils.makeEditUserPath(user.userid)}
        key="edit"
        extra=""
      >
        Edit User
      </MenuItemLink>
      {userIsAdmin() && <Menu.Item key="delete">Delete User</Menu.Item>}
    </Menu>
  );

  return (
    <div className="user-card">
      {<Dropdown.Button overlay={menu}></Dropdown.Button>}
      {user.userid}, {user.username}, {user.firstname}, {user.role}
      <Link to={pathUtils.makeViewUserPath(user.userid)}>View User</Link>
    </div>
  );
}
