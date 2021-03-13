import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';
import { Wrapper } from '../Wrapper';

//ant d
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import Avatar from 'antd/lib/avatar';
import Image from 'antd/lib/image';

// css
import '../../styles/Profile.css';

export default function UserProfile() {
  const { user } = useSelector(state => state.userReducer);
  const { push } = useHistory();
  const { authService } = useOktaAuth();

  function clickOnEdit(e) {
    e.preventDefault();
    push('/edit-profile');
  }

  return (
    <Wrapper>
      <Card
        title={user.firstname + ' ' + user.lastname}
        className="profile-card"
      >
        <h3>Role: {user.role}</h3>
        <p>Phone: {user.phonenumber}</p>
        <p>Email: {user.email}</p>
        <Button type="primary" onClick={e => clickOnEdit(e)}>
          Edit Profile
        </Button>
      </Card>
    </Wrapper>
  );
}
