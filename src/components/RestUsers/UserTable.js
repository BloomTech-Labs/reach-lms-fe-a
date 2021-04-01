import React from 'react';
import { Table, Space } from 'antd';
import { useRestfulFetch } from '../../hooks';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import { Popup } from 'semantic-ui-react';
import { client } from '../../utils';

const UserTable = props => {
  const { href } = props;
  const { data } = useRestfulFetch(href);

  const [usersWithKeys, setUsersWithKeys] = React.useState(null);

  React.useEffect(() => {
    if (data && data.hasOwnProperty('userList')) {
      setUsersWithKeys(
        data.userList.map(user => ({
          ...user,
          key: user.userid,
        }))
      );
    }
  }, [data]);

  if (!data?.userList?.length > 0) {
    return null;
  }

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Popup
              content="Edit User"
              trigger={
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    props.setSelectedUser(record._links.self.href);
                    props.setSelectedUserCourses(record.userid);
                    props.userEdit.showModal();
                  }}
                />
              }
            />
            <Popup
              content="Delete Module"
              trigger={
                <DeleteOutline
                  key="delete"
                  onClick={e => {
                    e.preventDefault();
                    client.deleteUser(record.userid);
                  }}
                />
              }
            />
          </Space>
        );
      },
    },
  ];

  if (!usersWithKeys) {
    return null;
  }

  return <Table columns={columns} dataSource={usersWithKeys} />;
};

export default UserTable;
