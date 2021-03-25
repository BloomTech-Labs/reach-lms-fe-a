import React from 'react';

const ModuleCard = props => {
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
