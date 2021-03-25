import React from 'react';
import { Link } from 'react-router-dom';
import { useSubModal } from '../../hooks';
import { UserList, AddNewUserForm, EditUserForm } from '../RestUsers';
import { client } from '../../utils/api';
import Styled from './UserManagement.styles';

//ant design + mui imports
import Meta from 'antd/lib/card/Meta';
import { Button } from 'antd';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';

const UserManagement = props => {
  const userAdd = useSubModal();
  const userEdit = useSubModal();
  const [selectedUser, setSelectedUser] = React.useState('');

  return (
    <>
      <Styled.Content>
        <Styled.HeaderDiv>
          <h2>All Users</h2>
          <div className="options">
            <Button size="large" onClick={userAdd.showModal}>
              Add New User
            </Button>
            <Link to="/admin">
              <Button size="large">Manage All Programs</Button>
            </Link>
          </div>
        </Styled.HeaderDiv>

        <Styled.Users>
          {/*ADMINS*/}

          <UserList
            href="/users/admins"
            mappedChild={user => (
              <Styled.Card
                style={{ width: 500, height: 100, margin: 20 }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={e => {
                      e.preventDefault();
                      setSelectedUser(user._links.self.href);
                      userEdit.showModal();
                    }}
                  />,
                  <DeleteOutline
                    key="delete"
                    onClick={e => {
                      e.preventDefault();
                      client.deleteUser(user.userid);
                    }}
                  />,
                ]}
              >
                <Meta
                  title={`${user.firstname} ${user.lastname} : ${user.username} ${user.role}`}
                  description={`${user.email}, ${user.phonenumber}`}
                />
              </Styled.Card>
            )}
          />

          {/*TEACHERS*/}

          <UserList
            href="/users/teachers"
            mappedChild={user => (
              <Styled.Card
                style={{ width: 500, height: 100, margin: 20 }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={e => {
                      e.preventDefault();
                      setSelectedUser(user._links.self.href);
                      userEdit.showModal();
                    }}
                  />,
                  <DeleteOutline
                    key="delete"
                    onClick={e => {
                      e.preventDefault();
                      client.deleteUser(user.userid);
                    }}
                  />,
                ]}
              >
                <Meta
                  title={`${user.firstname} ${user.lastname} : ${user.username} ${user.role}`}
                  description={`${user.email}, ${user.phonenumber}`}
                />
              </Styled.Card>
            )}
          />

          {/*STUDENTS*/}

          <UserList
            href="/users/students"
            mappedChild={user => (
              <Styled.Card
                style={{ width: 500, height: 100, margin: 20 }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={e => {
                      e.preventDefault();
                      setSelectedUser(user._links.self.href);
                      userEdit.showModal();
                    }}
                  />,
                  <DeleteOutline
                    key="delete"
                    onClick={e => {
                      e.preventDefault();
                      client.deleteUser(user.userid);
                    }}
                  />,
                ]}
              >
                <Meta
                  title={`${user.firstname} ${user.lastname} : ${user.username} ${user.role}`}
                  description={`${user.email}, ${user.phonenumber}`}
                />
              </Styled.Card>
            )}
          />
        </Styled.Users>
      </Styled.Content>

      {/*MODAL FORMS MGMT*/}

      <AddNewUserForm
        isWrapped={true}
        visible={userAdd.visible}
        hideModal={userAdd.hideModal}
        href={selectedUser}
        onSubmit={userAdd.hideModal}
      />
      <EditUserForm
        isWrapped={true}
        visible={userEdit.visible}
        hideModal={userEdit.hideModal}
        href={selectedUser}
        onSubmit={userEdit.hideModal}
      />
    </>
  );
};

export default UserManagement;
