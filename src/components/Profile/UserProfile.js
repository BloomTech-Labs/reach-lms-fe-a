import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//ant d
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';

// css
import '../../styles/Profile.css';

export default function UserProfile() {
  const { user } = useSelector(state => state.userReducer);
  const { push } = useHistory();

  function clickOnEdit(e) {
    e.preventDefault();
    push('/edit-profile');
  }

  return (
    <Card title={user.firstname + ' ' + user.lastname} className="profile-card">
      <h3>Role: {user.role}</h3>
      <p>Phone: {user.phonenumber}</p>
      <p>Email: {user.email}</p>
      <Button type="primary" onClick={e => clickOnEdit(e)}>
        Edit Profile
      </Button>
    </Card>
  );
}
