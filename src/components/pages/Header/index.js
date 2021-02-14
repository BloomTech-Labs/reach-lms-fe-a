import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
const Header = props => {
  const { userInfo, authService } = props;

  return (
    <div>
      <Link to="/profile/userInfo.id">
        <h2>Profile</h2>
      </Link>
      <Button handleClick={() => authService.logout()} buttonText="Logout" />
    </div>
  );
};

export default Header;
