//  ## VIEW MODE 2 — <UserManagement />
// - [ ] Each USER_COMPONENT will have the following actions
//   - [ ] MANAGE — <ManageUser href={GET user by user id} />
//       - [ ] List of courses the user is attached to (with DELETE option to remove this user from course)
//       - [ ] Option to ADD new course to that user (once this action is hit, we should show a collection of courses we could attach to this user)

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
  const [selectedUserCourses, setSelectedUserCourses] = React.useState('');
  console.log(selectedUser);

  // const handleCloseModal = () => {
  //   setSelectedUser('');
  //   userAdd.hideModal();
  //   userEdit.hideModal();
  // };

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
                actions={
                  user._links.mappified_courses && [
                    <EditOutlined
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        setSelectedUser(user._links.self.href);
                        setSelectedUserCourses(
                          user._links.mappified_courses.href
                        );
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
                  ]
                }
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
                actions={
                  user._links.mappified_courses && [
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
                  ]
                }
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
                actions={
                  user._links.mappified_courses && [
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
                  ]
                }
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

      {/* <Modal
        title="Add User"
        width="90vw"
        visible={userAdd.visible}
        onCancel={handleCloseModal}
        onFinish={handleCloseModal}
      >
        <AddNewUserForm
          href={selectedUser && selectedUser !== '' ? selectedUser : ''}
          visible={userAdd.visible}
        /> */}
      {/* </Modal> */}
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
        // courses={selectedUserCourses}
        onSubmit={userEdit.hideModal}
      />
      {/* <Modal
        title="Edit User"
        width="90vw"
        visible={userEdit.visible}
        onCancel={handleCloseModal}
        onFinish={handleCloseModal}
      >
        <EditUserForm
          href={selectedUser && selectedUser !== '' ? selectedUser : ''}
          visible={userEdit.visible}
        />
      </Modal> */}
    </>
  );
};

export default UserManagement;
