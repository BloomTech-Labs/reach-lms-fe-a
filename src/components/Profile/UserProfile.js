import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function UserProfile() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();

  function clickOnEdit(e) {
    e.preventDefault();
    push('/edit-profile');
  }

  function returnHome(e) {
    e.preventDefault();
    push('/');
  }

  return (
    <>
      <h1>Profile</h1>
      <Button type="primary" onClick={e => returnHome(e)}>
        Home
      </Button>
      <Card title={user.firstname + ' ' + user.lastname} style={{ width: 800 }}>
        <h3>Role: {user.role}</h3>
        <p>Phone: {user.phonenumber}</p>
        <p>Email: {user.email}</p>
        <Button type="primary" onClick={e => clickOnEdit(e)}>
          Edit Profile
        </Button>
      </Card>
    </>
  );
}
