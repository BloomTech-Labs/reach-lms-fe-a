import React from 'react';
// import { Card } from 'antd';
import { Table } from 'antd';

const ModuleCard = props => {
  const { module } = props;

  const dataSource = [
    {
      modulename: module.modulename,
      description: module.moduledescription,
    },
  ];
  const columns = [
    {
      title: 'Module Name',
      dataIndex: 'modulename',
      key: 'modulename',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  return (
    <>
      {/* <Card title={module.modulename}>
        <h3>Description: {module.moduledescription}</h3> */}
      {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
      {/* {props.children}
      </Card> */}
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ModuleCard;
