import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProgramCard() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();

  function clickOnEdit(e) {
    e.preventDefault();
    push('/edit-profile');
  }

  return (
    <>
      <Card title={user.fname + ' ' + user.lname} style={{ width: 800 }}>
        <h2>{user.role}</h2>
        <p>{user.useremails}</p>
        <p>{user.phonenumber}</p>
        <Button type="primary" onClick={e => clickOnEdit(e)}>
          Edit Profile
        </Button>
      </Card>
    </>
  );
}
