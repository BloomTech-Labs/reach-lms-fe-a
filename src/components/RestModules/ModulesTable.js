import React from 'react';
// import { Card } from 'antd';
import { Table } from 'antd';
import { useRestfulFetch } from '../../hooks';

const ModulesTable = props => {
  const { href } = props;
  const { data } = useRestfulFetch(href);

  const [modulesWithKeys, setModulesWithKeys] = React.useState(null);

  React.useEffect(() => {
    console.log(data);
    if (data && data.hasOwnProperty('moduleList')) {
      setModulesWithKeys(
        data.moduleList.map(module => ({ ...module, key: module.moduleid }))
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
      // key: 'modulename',
    },
    {
      title: 'Description',
      dataIndex: 'moduledescription',
      // key: 'description',
    },
  ];

  if (!modulesWithKeys) {
    return null;
  }

  return (
    <>
      {/* <Card title={module.modulename}>
       <h3>Description: {module.moduledescription}</h3> */}
      {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
      {/* {props.children}
       </Card> */}
      <Table columns={columns} dataSource={modulesWithKeys} />
    </>
  );
};

export default ModulesTable;
