import React from 'react';
import { Link } from 'react-router-dom';
import { useSubModal, useUserRole } from '../../hooks';
import { UserTable, AddNewUserForm, EditUserForm } from '../RestUsers';
import { FileUploader } from '../FileUploader';
import Styled from './UserManagement.styles';

//ant design + mui imports
import 'semantic-ui-css/semantic.min.css';
import { Input, Button } from 'antd';
import AddIcon from '@material-ui/icons/Add';
import { Popup } from 'semantic-ui-react';

const UserManagement = props => {
  const { href } = props;
  const user = useUserRole();
  const userAdd = useSubModal();
  const userEdit = useSubModal();
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedUserCourses, setSelectedUserCourses] = React.useState('');

  //form values
  const [searchedTerm, setSearchedTerm] = React.useState(undefined);
  const [searchValue, setSearchValue] = React.useState('');

  const searchBar = (
    <>
      <Input
        value={searchValue}
        onChange={evt => setSearchValue(evt.target.value)}
      />
      <Button onClick={() => setSearchedTerm(searchValue)}> Search!</Button>
    </>
  );

  return (
    <>
      <Styled.Content>
        <Styled.HeaderDiv>
          <h2>All Users</h2>
          <Styled.SearchContainer>{searchBar}</Styled.SearchContainer>
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
        <FileUploader url="https://reach-team-a-be.herokuapp.com/upload/csv/student-roster" />
        <UserTable
          href={
            href ?? `/users/${searchedTerm ? `?query=${searchedTerm}` : ''}`
          }
          setSelectedUser={setSelectedUser}
          setSelectedUserCourses={setSelectedUserCourses}
          userEdit={userEdit}
        />
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
