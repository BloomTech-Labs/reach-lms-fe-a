import React from 'react';
// id, firstname, lastname, role, email
export default function UserCard({ user }) {
  // console.log(user)
  return (
    <div>
      {user.userid}, {user.username}, {user.firstname},{' '}
      {user.roles[0].role.name}
    </div>
  );
}
