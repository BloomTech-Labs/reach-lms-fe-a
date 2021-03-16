import React from 'react';
// id, firstname, lastname, role, email
export default function UserCard(user) {
  return (
    <div>
      {user.userid}, {user.username}, {user.firstname}, {user.lastname},{' '}
      {user.roles[0].role.name}
    </div>
  );
}
