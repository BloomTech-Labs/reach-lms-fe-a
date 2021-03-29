import React from 'react';
import { Table, Space } from 'antd';
import { useRestfulFetch } from '../../hooks';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';

const ModulesTable = props => {
  const { href } = props;
  const { data } = useRestfulFetch(href);

  const [modulesWithKeys, setModulesWithKeys] = React.useState(null);

  React.useEffect(() => {
    if (data && data.hasOwnProperty('moduleList')) {
      setModulesWithKeys(
        data.moduleList.map(module => ({
          ...module,
          key: module.moduleid,
        }))
      );
    }
  }, [data]);

  if (!data?.moduleList?.length > 0) {
    return null;
  }

  const columns = [
    {
      title: 'Module Name',
      dataIndex: 'modulename',
    },
    {
      title: 'Description',
      dataIndex: 'moduledescription',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <Space size="middle">
            {record._links.self.href && (
              <EditOutlined
                key="edit"
                onClick={e => {
                  e.preventDefault();
                  // props.setSelectedModule(record._links.self.href);
                }}
              />
            )}
            {record._links.self.href && (
              <DeleteOutline
                key="delete"
                onClick={e => {
                  e.preventDefault();
                  console.log('delete module', record._links.self.href);
                }}
              />
            )}
          </Space>
        );
      },
    },
  ];

  if (!modulesWithKeys) {
    return null;
  }

  return <Table columns={columns} dataSource={modulesWithKeys} />;
};

export default ModulesTable;
