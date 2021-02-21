import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editUser } from '../../state/actions/userActions';

export default function ProgramCard() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();
  const dispatch = useDispatch();

  function clickOnEdit(e) {
    e.preventDefault();
    dispatch(editUser(user));
    push('/edit-profile');
  }

  return (
    <>
      <h1>Profile</h1>
      <Card title={user.fname + ' ' + user.lname} style={{ width: 800 }}>
        <h3>Role: {user.role}</h3>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email[0].useremail}</p>
        <Button type="primary" onClick={e => clickOnEdit(e)}>
          Edit Profile
        </Button>
      </Card>
    </>
  );
}
