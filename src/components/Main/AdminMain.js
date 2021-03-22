import React from 'react';
import Main from './Main';
import { useParams } from 'react-router-dom';

const AdminMain = props => {
  const { programId } = useParams();
  return <Main href={`/courses/${programId}`} programId={programId} />;
};

export default AdminMain;
