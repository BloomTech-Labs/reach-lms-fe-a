import React from 'react';
export default function UserCard({ user }) {
  return (
    <div>
      {user.userid}, {user.username}, {user.firstname},{' '}
      {user.roles[0].role.name}
    </div>
  );
}
