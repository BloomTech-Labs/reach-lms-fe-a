import React from 'react';
import EditSelfForm from './EditSelfForm';
import { UserSingleton } from '../RestUsers';

// Styled & CSS
import 'antd/dist/antd.css';
import { Card, Button, Modal } from 'antd';
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
      <Modal
        visible={editSelf.visible}
        onOk={editSelf.hideModal}
        onCancel={editSelf.hideModal}
      >
        <EditSelfForm href="/users/getuserinfo" />
      </Modal>
    </>
  );
};

export default UserProfile;
