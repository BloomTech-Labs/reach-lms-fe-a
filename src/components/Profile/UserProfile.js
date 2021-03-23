import React from 'react';
import EditSelfForm from './EditSelfForm';
import { UserSingleton } from '../RestUsers';

// Styled & CSS
import 'antd/dist/antd.css';
import { Card, Button } from 'antd';
import { useSubModal } from '../../hooks';

const UserProfile = props => {
  const editSelf = useSubModal();
  return (
    <>
      <UserSingleton
        href="/users/getuserinfo"
        mappedChild={user => (
          <Card
            title={user.firstname + ' ' + user.lastname}
            className="profile-card"
          >
            <h3>Role: {user.role}</h3>
            <p>Phone: {user.phonenumber}</p>
            <p>Email: {user.email}</p>
            <Button type="primary" onClick={editSelf.showModal}>
              Edit Profile
            </Button>
          </Card>
        )}
      />
      <EditSelfForm
        isWrapped={true}
        visible={editSelf.visible}
        hideModal={editSelf.hideModal}
        onSubmit={editSelf.hideModal}
      />
    </>
  );
};

export default UserProfile;
