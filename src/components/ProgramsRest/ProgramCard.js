import React from 'react';
import { Card } from 'antd';

const ProgramCard = props => {
  const { program } = props;
  return (
    <>
      <Card title={program.programname}>
        <h3>{program.programtype}</h3>
        <p>{program.programdescription}</p>
        {props.children}
      </Card>
    </>
  );
};

export default ProgramCard;
