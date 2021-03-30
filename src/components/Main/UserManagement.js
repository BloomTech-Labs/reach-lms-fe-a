import React from 'react';
import { Link } from 'react-router-dom';
import { useSubModal, useUserRole } from '../../hooks';
import { UserTable, AddNewUserForm, EditUserForm } from '../RestUsers';
import { client } from '../../utils/api';
import Styled from './UserManagement.styles';

//ant design + mui imports
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Popup } from 'semantic-ui-react';

const UserManagement = props => {
  const user = useUserRole();
  const userAdd = useSubModal();
  const userEdit = useSubModal();
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedUserCourses, setSelectedUserCourses] = React.useState('');

  return (
    <>
      <Styled.Content>
        <Styled.HeaderDiv>
          <h2>All Users</h2>
          <div className="options">
            {user.userIsAdmin() && (
              <Popup
                content="Add New User"
                trigger={
                  <AddIcon
                    style={{ fontSize: 35 }}
                    className="group1"
                    onClick={() => {
                      userAdd.showModal();
                    }}
                  />
                }
              />
            )}
            <Link to="/admin">
              <Button size="large">Manage All Programs</Button>
            </Link>
          </div>
        </Styled.HeaderDiv>
        <UserTable
          key={'https://reach-team-a-be.herokuapp.com/users'}
          href={'https://reach-team-a-be.herokuapp.com/users'}
          setSelectedUser={setSelectedUser}
          userEdit={userEdit}
        />

        {/* <Styled.Users>
          {/*ADMINS*/}
        {/* <UserList
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
        {/* <UserList
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
          />  */}

        {/*STUDENTS*/}
        {/* <UserList
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
              </Styled.Users> */}
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
        courses={selectedUserCourses}
        onSubmit={userEdit.hideModal}
      />
    </>
  );
};

export default UserManagement;
