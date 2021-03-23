import React from 'react';
import { RestEntity } from '../common';

const UserList = props => {
  return (
    <>
      <RestEntity href={props.href ?? '/users'}>
        <RestEntity.List path={['userList']} component={props.mappedChild} />
        <RestEntity.Error>
          <div>An error has occurred...</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading...</div>
        </RestEntity.Loading>
      </RestEntity>
    </>
  );
};

export default UserList;
