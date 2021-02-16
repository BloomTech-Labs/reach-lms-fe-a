import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  const { userInfo, authService } = props;

  return (
    <div>
      <Link to="/profile/userInfo.id">
        <h2>Profile</h2>
      </Link>
      <button onClick={() => authService.logout()}>Logout</button>
    </div>
  );
};

export default Header;
