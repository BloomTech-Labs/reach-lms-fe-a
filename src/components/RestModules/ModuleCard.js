import React from 'react';
import { Card } from 'antd';
import { Table } from 'antd';

const ModuleCard = props => {
  const { module } = props;
  return (
    <>
      {/* <Card title={module.modulename}>
        <h3>Description: {module.moduledescription}</h3> */}
      {/* PLEASE DO NOT REMOVE THE FOLLOWING LINE */}
      {props.children}
      {/* </Card> */}
      {/* <Table columns={columns} dataSource={dataSource} /> */}
    </>
  );
};

export default ModuleCard;
