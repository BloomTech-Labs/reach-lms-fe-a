import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Space } from 'antd';
import { useRestfulFetch } from '../../hooks';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import PageviewIcon from '@material-ui/icons/Pageview';
import { Popup } from 'semantic-ui-react';
import { client } from '../../utils';
import { pathUtils } from '../../routes';

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
            <Popup
              content="View Module"
              trigger={
                <Link to={pathUtils.makeModMarkdown(record.moduleid)}>
                  <PageviewIcon key="view" />
                </Link>
              }
            />
            <Popup
              content="Edit Module"
              trigger={
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    props.setSelectedModule(record._links.self.href);
                    props.moduleEdit.showModal();
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
                    client.deleteModule(record.moduleid);
                  }}
                />
              }
            />
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
