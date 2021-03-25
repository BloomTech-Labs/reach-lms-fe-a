import React from 'react';
// import { Card } from 'antd';
import { Table } from 'antd';
import { useRestfulFetch } from '../../hooks';

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
          actions: [
            module._links.self.href && (
              <a href={module._links.self.href}>Link 2 Self</a>
            ),
          ],
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
    },
  ];

  if (!modulesWithKeys) {
    return null;
  }

  return <Table columns={columns} dataSource={modulesWithKeys} />;
};

export default ModulesTable;
